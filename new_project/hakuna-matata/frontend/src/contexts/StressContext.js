import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAuth } from './AuthContext';

const StressContext = createContext(null);

export const StressProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [sessionHistory, setSessionHistory] = useState([]);
  const [currentStress, setCurrentStress] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [stats, setStats] = useState({
    todayAvg: 0,
    weekAvg: 0,
    monthAvg: 0,
    trend: 'stable',
    totalSessions: 0
  });

  // Load historical data from backend when user logs in
  useEffect(() => {
    const loadHistoricalData = async () => {
      if (!currentUser) {
        setHistoricalData([]);
        setStats({
          todayAvg: 0,
          weekAvg: 0,
          monthAvg: 0,
          trend: 'stable',
          totalSessions: 0
        });
        return;
      }

      try {
        const userId = currentUser.id || currentUser.email || 'guest';
        const response = await fetch(`http://localhost:5000/api/stress-data/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setHistoricalData(data);
          console.log('Loaded historical stress data:', data.length, 'sessions');
        }
      } catch (error) {
        console.warn('Failed to load historical data:', error);
      }

      // Load stats
      try {
        const userId = currentUser.id || currentUser.email || 'guest';
        const response = await fetch(`http://localhost:5000/api/stress-data/${userId}/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
          console.log('Loaded stress statistics:', data);
        }
      } catch (error) {
        console.warn('Failed to load statistics:', error);
      }
    };

    loadHistoricalData();
  }, [currentUser]);

  // Also load from localStorage for backward compatibility
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('stressSessions') || '[]');
      if (Array.isArray(saved)) {
        let filtered = saved;
        if (currentUser) {
          filtered = saved.filter(s => !s.userId || String(s.userId) === String(currentUser.id));
        } else {
          filtered = saved.filter(s => !s.userId);
        }
        setSessionHistory(filtered.slice(0, 50));
      }
    } catch (e) {
      console.warn('StressContext: failed to load sessions', e);
    }
  }, [currentUser]);

  // persist whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem('stressSessions', JSON.stringify(sessionHistory));
    } catch (e) {
      console.warn('StressContext: failed to persist sessions', e);
    }
  }, [sessionHistory]);

  const computeAnalytics = (hist) => {
    const h = hist || [];
    const vals = h.map(s => Number(s.stressLevel)).filter(v => !isNaN(v));
    if (!vals.length) return null;
    const count = vals.length;
    const avg = Math.round(vals.reduce((a,b) => a + b, 0) / count);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const last = vals[0];
    const prev = vals[1] || last;
    const trend = Math.round(last - prev);
    const spark = vals.slice(0, 10).map(v => Math.round(v));

    const now = Date.now();
    const DAY = 24 * 3600 * 1000;
    const dayBuckets = new Array(7).fill(0).map(()=>({sum:0,count:0}));
    h.forEach(s => {
      const ts = Number(s.id) || Date.parse(s.timestamp) || now;
      const daysAgo = Math.floor((now - ts) / DAY);
      if (daysAgo >=0 && daysAgo < 7) {
        const idx = daysAgo;
        const val = Number(s.stressLevel);
        if (!isNaN(val)) { dayBuckets[idx].sum += val; dayBuckets[idx].count += 1; }
      }
    });
    const dailyAvgs = dayBuckets.map(b => b.count ? Math.round(b.sum / b.count) : null);
    const todayAvg = dailyAvgs[0] || null;
    const prevVals = dailyAvgs.slice(1,7).filter(v => v !== null);
    const prevWeekAvg = prevVals.length ? Math.round(prevVals.reduce((a,b)=>a+b,0)/prevVals.length) : null;
    let weeklyProgress = null;
    if (todayAvg !== null && prevWeekAvg !== null && prevWeekAvg !== 0) {
      weeklyProgress = Math.round(((prevWeekAvg - todayAvg) / prevWeekAvg) * 100);
    }

    let relaxationMinutes = 0;
    h.forEach(s => {
      try {
        const val = Number(s.stressLevel);
        if (!isNaN(val) && val < 30) {
          let minutes = 0;
          if (typeof s.duration === 'number') minutes = s.duration / 60;
          else if (typeof s.duration === 'string') {
            const m = s.duration.match(/(\d+(?:\.\d+)?)\s*min/i);
            if (m) minutes = Number(m[1]);
            else {
              const mm = s.duration.match(/(\d+)\s*minute/i);
              if (mm) minutes = Number(mm[1]);
            }
          }
          if (!minutes) minutes = 2;
          relaxationMinutes += minutes;
        }
      } catch (e) { }
    });

    return { count, avg, min, max, last, prev, trend, spark, dailyAvgs, todayAvg, prevWeekAvg, weeklyProgress, relaxationMinutes };
  };

  const analytics = useMemo(() => computeAnalytics(sessionHistory), [sessionHistory]);

  const addSession = async (session) => {
    const s = Object.assign({}, session || {});
    if (currentUser) {
      s.userId = currentUser.id;
      s.userEmail = currentUser.email;
    }

    setSessionHistory(prev => {
      const exists = s && s.id ? prev.findIndex(x => String(x.id) === String(s.id)) : -1;
      let next;
      if (exists >= 0) {
        next = prev.slice();
        next[exists] = s;
        next = [s, ...next.filter((_,i)=>i!==exists)].slice(0,200);
      } else {
        next = [s, ...prev].slice(0, 200);
      }
      return next;
    });
    if (s && typeof s.stressLevel !== 'undefined') setCurrentStress(Number(s.stressLevel));
    
    // Save to backend
    try {
      const payload = JSON.stringify({ session: s });
      const urls = ['/api/sessions', 'http://localhost:5000/api/sessions'];
      let sent = false;
      for (const u of urls) {
        try {
          const res = await fetch(u, { method: 'POST', headers: {'Content-Type':'application/json'}, body: payload });
          if (res && (res.ok || res.status === 200 || res.status === 201)) { sent = true; break; }
        } catch (inner) { }
      }
      if (!sent) console.warn('StressContext: failed to sync to backend');
    } catch (e) { console.warn('StressContext: failed to sync', e); }
  };

  const saveProgress = async (session) => {
    try {
      const s = Object.assign({}, session || {});
      if (!s.id) s.id = Date.now();
      s.status = 'in_progress';
      if (!s.timestamp) s.timestamp = new Date().toLocaleString();
      if (currentUser) { s.userId = currentUser.id; s.userEmail = currentUser.email; }

      try {
        const mapTxt = localStorage.getItem('stressInProgress') || '{}';
        const map = JSON.parse(mapTxt || '{}');
        map[s.id] = s;
        localStorage.setItem('stressInProgress', JSON.stringify(map));
      } catch (e) { console.warn('Failed to persist in-progress session locally', e); }

      setSessionHistory(prev => {
        const idx = prev.findIndex(p => String(p.id) === String(s.id));
        if (idx >= 0) {
          const copy = prev.slice(); copy[idx] = s; return copy;
        }
        return [s, ...prev].slice(0,200);
      });

      const payload = JSON.stringify({ session: s });
      const urls = ['/api/sessions', 'http://localhost:5000/api/sessions'];
      for (const u of urls) {
        try {
          const res = await fetch(u, { method: 'POST', headers: {'Content-Type':'application/json'}, body: payload });
          if (res && (res.ok || res.status === 200 || res.status === 201)) { break; }
        } catch (inner) { }
      }
      return s.id;
    } catch (e) {
      console.warn('saveProgress failed', e);
      return session && session.id ? session.id : Date.now();
    }
  };

  const finalizeSession = async (session) => {
    try {
      const s = Object.assign({}, session || {});
      if (!s.id) s.id = Date.now();
      s.status = 'completed';
      if (!s.timestamp) s.timestamp = new Date().toLocaleString();
      if (currentUser) { s.userId = currentUser.id; s.userEmail = currentUser.email; }

      try {
        const mapTxt = localStorage.getItem('stressInProgress') || '{}';
        const map = JSON.parse(mapTxt || '{}');
        if (map[s.id]) { delete map[s.id]; localStorage.setItem('stressInProgress', JSON.stringify(map)); }
      } catch (e) { }

      await addSession(s);
      return s.id;
    } catch (e) {
      console.warn('finalizeSession failed', e);
      return null;
    }
  };

  const clearSessions = async () => {
    try {
      const saved = JSON.parse(localStorage.getItem('stressSessions') || '[]');
      let remaining = saved;
      if (currentUser) {
        remaining = saved.filter(s => String(s.userId) !== String(currentUser.id));
      } else {
        remaining = saved.filter(s => s.userId);
      }
      localStorage.setItem('stressSessions', JSON.stringify(remaining));
      setSessionHistory(remaining.slice(0,50));
      setCurrentStress(null);

      const urls = ['/api/sessions', 'http://localhost:5000/api/sessions'];
      for (const u of urls) {
        try {
          const url = currentUser ? `${u}?userId=${encodeURIComponent(currentUser.id)}` : `${u}?public=1`;
          await fetch(url, { method: 'DELETE' });
          break;
        } catch (e) { }
      }
    } catch (e) {
      console.warn('clearSessions failed', e);
    }
  };

  // Add missing addToHistory function for stress detection
  const addToHistory = async (stressLevel) => {
    try {
      const session = {
        id: Date.now(),
        stressLevel: Number(stressLevel),
        timestamp: new Date().toISOString(),
        type: 'stress_detection',
        duration: '2 min',
        status: 'completed'
      };
      await addSession(session);
    } catch (e) {
      console.warn('addToHistory failed', e);
    }
  };

  return (
    <StressContext.Provider value={{ 
      sessionHistory, 
      currentStress, 
      setCurrentStress, 
      addSession, 
      addToHistory,
      clearSessions, 
      analytics, 
      saveProgress, 
      finalizeSession,
      historicalData,
      stats
    }}>
      {children}
    </StressContext.Provider>
  );
};

export const useStress = () => {
  const ctx = useContext(StressContext);
  if (!ctx) throw new Error('useStress must be used within StressProvider');
  return ctx;
};

export default StressContext;
