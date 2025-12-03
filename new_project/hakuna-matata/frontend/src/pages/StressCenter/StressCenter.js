import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useStress } from '../../contexts/StressContext';

const getQuickTip = (s) => {
  if (s == null) return 'No recent reading. Start a live stress check to get real-time guidance.';
  if (s < 35) return 'You look calm. Keep your routine — short breaks and light movement help maintain balance.';
  if (s < 70) return 'Moderate stress — try a 3–5 minute breathing exercise or a short walk.';
  return 'High stress detected. Consider stepping away, doing paced breathing, or reaching out to someone you trust.';
};

const StressCenter = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { currentStress, analytics, sessionHistory } = useStress();

  const startDetection = () => {
    // Protected route will enforce login; navigate there directly.
    if (!currentUser) {
      navigate('/login', { state: { from: '/stress-center' } });
      return;
    }
    navigate('/stress-detection');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Real-time Stress Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Current Status</div>
            <div className="text-3xl font-semibold mt-2">{typeof currentStress === 'number' ? `${currentStress}/100` : '—'}</div>
            <div className="text-xs text-gray-400 mt-1">Last reading</div>
          </div>

          <div className="bg-white p-4 rounded shadow md:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500">Quick Tip</div>
                <div className="text-lg font-medium mt-2">{getQuickTip(currentStress)}</div>
              </div>
              <div>
                <button onClick={startDetection} className="bg-primary text-white px-4 py-2 rounded-lg">Start Real-time Detection</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Session Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Sessions Recorded</div>
              <div className="text-xl font-medium">{(sessionHistory || []).length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Average Stress</div>
              <div className="text-xl font-medium">{analytics?.avg ?? '—'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Relaxation Minutes</div>
              <div className="text-xl font-medium">{analytics?.relaxationMinutes ?? 0} min</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Weekly Progress</div>
              <div className="text-xl font-medium">{analytics?.weeklyProgress != null ? `${analytics.weeklyProgress}%` : '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressCenter;
