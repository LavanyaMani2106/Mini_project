import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ChevronLeft, ChevronRight, Save, Trash2, Calendar as CalendarIcon, Plus, X, Tag, Smile, Frown, Meh, AlertCircle, Search, Download, Quote } from 'lucide-react';

const QUOTES = [
  "Every day is a fresh beginning.",
  "Believe you can and you're halfway there.",
  "Positive anything is better than negative nothing.",
  "Happiness depends upon ourselves.",
  "Turn your wounds into wisdom.",
  "The only way to do great work is to love what you do.",
  "It always seems impossible until it's done.",
  "Keep your face always toward the sunshine—and shadows will fall behind you."
];

const PrivacyDiary = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState(localStorage.getItem('diary_pin'));
  const [error, setError] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'editor'
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // New Features State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMood, setFilterMood] = useState('all');
  const [dailyQuote, setDailyQuote] = useState('');

  // Editor State
  const [editorData, setEditorData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    stressLevel: 50,
    tags: [],
    date: new Date().toISOString().split('T')[0]
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setDailyQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  // --- PIN Logic ---
  const handlePinSubmit = () => {
    if (!storedPin) {
      if (pin.length === 4) {
        localStorage.setItem('diary_pin', pin);
        setStoredPin(pin);
        setIsLocked(false);
        setPin('');
      } else {
        setError('PIN must be 4 digits');
      }
    } else {
      if (pin === storedPin) {
        setIsLocked(false);
        setPin('');
        setError('');
        fetchEntries();
      } else {
        setError('Incorrect PIN');
        setPin('');
      }
    }
  };

  const handlePinChange = (digit) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
      setError('');
    }
  };

  // --- API Logic ---
  const userId = localStorage.getItem('userId') || 'guest';

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/diary/${userId}`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Error fetching diary:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          ...editorData
        })
      });
      if (res.ok) {
        fetchEntries();
        setView('list');
        resetEditor();
      }
    } catch (err) {
      console.error('Error saving entry:', err);
    }
  };

  const deleteEntry = async (dateStr) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/diary/${userId}/${dateStr}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchEntries();
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diary_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetEditor = () => {
    setEditorData({
      title: '',
      content: '',
      mood: 'neutral',
      stressLevel: 50,
      tags: [],
      date: new Date().toISOString().split('T')[0]
    });
    setNewTag('');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editorData.tags.includes(newTag.trim())) {
      setEditorData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setEditorData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  // --- Calendar Logic ---
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const changeMonth = (delta) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, 1));
  };

  // --- Render Helpers ---
  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy': return <Smile className="w-5 h-5 text-green-500" />;
      case 'sad': return <Frown className="w-5 h-5 text-blue-500" />;
      case 'stressed': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default: return <Meh className="w-5 h-5 text-slate-500" />;
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'text-green-600 bg-green-50 border-green-200';
      case 'sad': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'stressed': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = (entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           entry.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           entry.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesMood = filterMood === 'all' || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  // --- Main Render ---
  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/20 animate-in fade-in zoom-in duration-500">
          <div className="mb-8 flex justify-center">
            <div className="p-5 bg-white/20 rounded-full shadow-inner ring-1 ring-white/30">
              <Lock className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">{storedPin ? 'Welcome Back' : 'Secure Your Thoughts'}</h2>
          <p className="text-slate-200 mb-8 font-light">{storedPin ? 'Enter your PIN to access your diary' : 'Create a 4-digit PIN for privacy'}</p>
          
          <div className="flex justify-center gap-6 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full transition-all duration-300 ${i < pin.length ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button key={num} onClick={() => handlePinChange(num.toString())} className="h-16 rounded-2xl bg-white/5 hover:bg-white/20 active:scale-95 transition-all text-2xl font-light text-white border border-white/10">{num}</button>
            ))}
            <div />
            <button onClick={() => handlePinChange('0')} className="h-16 rounded-2xl bg-white/5 hover:bg-white/20 active:scale-95 transition-all text-2xl font-light text-white border border-white/10">0</button>
            <button onClick={() => setPin(prev => prev.slice(0, -1))} className="h-16 rounded-2xl bg-white/5 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white/80 hover:text-red-400 border border-white/10"><Trash2 className="w-6 h-6" /></button>
          </div>

          {error && <p className="text-red-300 mb-6 bg-red-500/20 py-2 rounded-lg animate-pulse">{error}</p>}
          
          <button onClick={handlePinSubmit} className="w-full py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">{storedPin ? 'Unlock Journal' : 'Set PIN Code'}</button>
        </div>
      </div>
    );
  }

  const { days, firstDay } = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-12 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">My Private Diary</h1>
            <div className="flex items-center gap-2 text-slate-500">
              <Lock className="w-4 h-4" />
              <span>Your thoughts are private and encrypted</span>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {view === 'list' && (
              <>
                <button onClick={exportData} className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl font-medium transition-all">
                  <Download className="w-5 h-5" /> <span className="hidden sm:inline">Export</span>
                </button>
                <button 
                  onClick={() => { resetEditor(); setView('editor'); }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95"
                >
                  <Plus className="w-5 h-5" /> New Entry
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {view === 'editor' ? (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Write Your Thoughts</h2>
                  <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Entry Title</label>
                    <input
                      type="text"
                      value={editorData.title}
                      onChange={(e) => setEditorData({ ...editorData, title: e.target.value })}
                      placeholder="How are you feeling today?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Mood</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['happy', 'neutral', 'stressed', 'sad'].map(m => (
                        <button
                          key={m}
                          onClick={() => setEditorData({ ...editorData, mood: m })}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${editorData.mood === m ? getMoodColor(m) + ' ring-2 ring-offset-1' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          {getMoodIcon(m)}
                          <span className="capitalize font-medium">{m}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Stress Level: {editorData.stressLevel}%</label>
                      <span className="text-xs text-slate-400">{editorData.stressLevel < 30 ? 'Calm' : editorData.stressLevel > 70 ? 'High Stress' : 'Moderate'}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editorData.stressLevel}
                      onChange={(e) => setEditorData({ ...editorData, stressLevel: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between mt-1 text-xs text-slate-400">
                      <span>Calm</span>
                      <span>High Stress</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Thoughts</label>
                    <textarea
                      value={editorData.content}
                      onChange={(e) => setEditorData({ ...editorData, content: e.target.value })}
                      placeholder="Write about your day, feelings, or anything on your mind..."
                      className="w-full h-64 px-4 py-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all resize-none text-slate-700 leading-relaxed font-serif text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tags</label>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {editorData.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Add a tag (e.g., work, family, exercise)"
                        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                      />
                      <button onClick={handleAddTag} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium transition-colors">Add Tag</button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button onClick={saveEntry} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95 flex justify-center items-center gap-2">
                      <Save className="w-5 h-5" /> Save Entry
                    </button>
                    <button onClick={() => setView('list')} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Search and Filter Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search entries..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <select 
                    value={filterMood} 
                    onChange={(e) => setFilterMood(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all text-slate-600"
                  >
                    <option value="all">All Moods</option>
                    <option value="happy">Happy</option>
                    <option value="neutral">Neutral</option>
                    <option value="stressed">Stressed</option>
                    <option value="sad">Sad</option>
                  </select>
                </div>

                {filteredEntries.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No Entries Found</h3>
                    <p className="text-slate-400 mb-6">Try adjusting your search or create a new entry.</p>
                    <button onClick={() => setView('editor')} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all">
                      Create Entry
                    </button>
                  </div>
                ) : (
                  filteredEntries.map(entry => (
                    <div key={entry.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 mb-1">{entry.title || 'Untitled Entry'}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {new Date(entry.date).toLocaleDateString()}
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getMoodColor(entry.mood)}`}>
                              {getMoodIcon(entry.mood)}
                              <span className="capitalize">{entry.mood}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${entry.stressLevel < 40 ? 'bg-emerald-500' : entry.stressLevel < 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${entry.stressLevel}%` }} />
                              </div>
                              <span className="text-xs font-medium">{entry.stressLevel}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditorData(entry); setView('editor'); }} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteEntry(entry.date)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3 font-serif text-lg">{entry.content}</p>
                      
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {entry.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-medium border border-slate-100">
                              <Tag className="w-3 h-3" /> {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Daily Inspiration Card */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 border border-amber-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Quote className="w-24 h-24 text-amber-600" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                  <Quote className="w-4 h-4" /> Daily Inspiration
                </h3>
                <p className="text-amber-900 font-serif italic text-lg leading-relaxed">
                  "{dailyQuote}"
                </p>
              </div>
            </div>

            {/* Calendar Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <h3 className="font-bold text-slate-700 text-lg">{monthName}</h3>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-4 uppercase tracking-wider">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                {[...Array(days)].map((_, i) => {
                  const day = i + 1;
                  const currentDayStr = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString().split('T')[0];
                  const entryForDay = entries.find(e => e.date === currentDayStr);
                  const isToday = new Date().getDate() === day && new Date().getMonth() === selectedDate.getMonth();

                  return (
                    <div
                      key={day}
                      className={`
                        aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all duration-300
                        ${isToday ? 'bg-emerald-50 text-emerald-600 font-bold ring-1 ring-emerald-200' : 'text-slate-600 hover:bg-slate-50'}
                      `}
                    >
                      {day}
                      {entryForDay && (
                        <div className="absolute bottom-1">
                          {entryForDay.mood === 'happy' ? '😊' : entryForDay.mood === 'sad' ? '😔' : entryForDay.mood === 'stressed' ? '😫' : '😐'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
              <h3 className="font-bold text-lg mb-4">Monthly Insights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-3xl font-bold mb-1">{entries.length}</div>
                  <div className="text-indigo-100 text-sm">Entries this month</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-3xl font-bold mb-1">
                    {entries.length > 0 ? Math.round(entries.reduce((acc, curr) => acc + (curr.stressLevel || 50), 0) / entries.length) : 0}%
                  </div>
                  <div className="text-indigo-100 text-sm">Avg Stress Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDiary;
