import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Calendar, Lock, BookOpen, Smile, Frown, Meh } from 'lucide-react';

const Diary = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: []
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState('all');

  const moods = [
    { value: 'happy', label: 'Happy', icon: <Smile className="h-5 w-5" />, color: 'text-green-600', emoji: '😊' },
    { value: 'neutral', label: 'Neutral', icon: <Meh className="h-5 w-5" />, color: 'text-yellow-600', emoji: '😐' },
    { value: 'sad', label: 'Sad', icon: <Frown className="h-5 w-5" />, color: 'text-red-600', emoji: '😢' },
    { value: 'angry', label: 'Angry', icon: '😠', color: 'text-orange-600', emoji: '😠' },
    { value: 'anxious', label: 'Anxious', icon: '😰', color: 'text-purple-600', emoji: '😰' },
    { value: 'excited', label: 'Excited', icon: '😄', color: 'text-blue-600', emoji: '😄' },
    { value: 'tired', label: 'Tired', icon: '😴', color: 'text-indigo-600', emoji: '😴' }
  ];

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) return;

    const newEntry = {
      id: Date.now(),
      ...currentEntry,
      date: new Date().toISOString().split('T')[0],
      encrypted: false,
      wordCount: currentEntry.content.trim().split(/\s+/).filter(word => word.length > 0).length,
      createdAt: new Date().toISOString()
    };
    
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setShowEditor(false);
    setCurrentEntry({ title: '', content: '', mood: 'neutral', tags: [] });
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
      if (selectedEntry && selectedEntry.id === id) {
        setSelectedEntry(null);
      }
    }
  };

  const getMoodIcon = (mood) => {
    return moods.find(m => m.value === mood)?.icon;
  };

  const getMoodColor = (mood) => {
    return moods.find(m => m.value === mood)?.color;
  };

  const getMoodEmoji = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.emoji : '😐';
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = moodFilter === 'all' || entry.mood === moodFilter;
    return matchesSearch && matchesMood;
  });

  const wordCount = currentEntry.content.trim().split(/\s+/).filter(word => word.length > 0).length;

  // Statistics
  const totalEntries = entries.length;
  const totalWords = entries.reduce((total, entry) => total + (entry.wordCount || 0), 0);
  const avgWords = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;
  const activeDays = new Set(entries.map(entry => new Date(entry.date).toDateString())).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Diary</h1>
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Entry</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Mood Filter */}
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <h3 className="font-semibold mb-4">Filter by Mood</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setMoodFilter('all')}
                  className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors ${
                    moodFilter === 'all' ? 'bg-primary bg-opacity-10 border border-primary' : 'hover:bg-gray-50'
                  }`}
                >
                  <span>All Moods</span>
                </button>
                {moods.map(mood => (
                  <button
                    key={mood.value}
                    onClick={() => setMoodFilter(mood.value)}
                    className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors ${
                      moodFilter === mood.value ? 'bg-primary bg-opacity-10 border border-primary' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={mood.color}>{mood.icon}</span>
                    <span>{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold">Calendar</h3>
              </div>
              <div className="text-center text-gray-500">
                Calendar view coming soon...
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Your privacy is protected</p>
                  <p className="text-xs text-blue-600 mt-1">
                    All diary entries are stored locally on your device. No data is sent to any servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {showEditor ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">New Diary Entry</h2>
                
                <input
                  type="text"
                  placeholder="Entry title..."
                  value={currentEntry.title}
                  onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-lg font-semibold"
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling?</label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map(mood => (
                      <button
                        key={mood.value}
                        onClick={() => setCurrentEntry({...currentEntry, mood: mood.value})}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          currentEntry.mood === mood.value 
                            ? 'border-primary bg-primary bg-opacity-10 transform scale-105' 
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        <span className={mood.color}>{mood.icon}</span>
                        <span>{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Write about your day, your feelings, or anything on your mind..."
                  value={currentEntry.content}
                  onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                  rows="10"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />

                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    {wordCount} words • {currentEntry.content.length} characters
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowEditor(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEntry}
                    disabled={!currentEntry.title.trim() || !currentEntry.content.trim()}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Entries List */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Your Entries <span className="text-gray-500 text-sm">({filteredEntries.length})</span>
                  </h2>
                  
                  {filteredEntries.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No entries yet</h3>
                      <p className="text-gray-600 mb-6">Start writing to record your thoughts and feelings.</p>
                      <button
                        onClick={() => setShowEditor(true)}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Write First Entry
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredEntries.map(entry => (
                        <div 
                          key={entry.id} 
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedEntry?.id === entry.id
                              ? 'border-primary bg-primary/10 transform scale-105'
                              : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedEntry(entry)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-500">{entry.date}</span>
                                <div className="flex items-center space-x-1">
                                  <span className={getMoodColor(entry.mood)}>
                                    {getMoodIcon(entry.mood)}
                                  </span>
                                  <span className="text-sm text-gray-600 capitalize">{entry.mood}</span>
                                </div>
                                {entry.encrypted && (
                                  <div className="flex items-center space-x-1">
                                    <Lock className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-400">Encrypted</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEntry(entry.id);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2"
                              title="Delete entry"
                            >
                              🗑️
                            </button>
                          </div>
                          
                          <p className="text-gray-700 mb-4 line-clamp-2">{entry.content}</p>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              {entry.tags && entry.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              {entry.wordCount || 0} words
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Entry Preview */}
                {selectedEntry && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Entry Preview</h3>
                      <button
                        onClick={() => setSelectedEntry(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center mb-4 space-x-3">
                      <span className="text-3xl">{getMoodEmoji(selectedEntry.mood)}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{selectedEntry.title}</h4>
                        <p className="text-sm text-gray-500">{formatDate(selectedEntry.createdAt || selectedEntry.date)}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedEntry.content}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <span>{selectedEntry.wordCount || 0} words</span>
                      <span>{selectedEntry.content.length} characters</span>
                    </div>
                  </div>
                )}

                {/* Statistics */}
                {entries.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Diary Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{totalEntries}</div>
                        <div className="text-sm text-blue-600">Total Entries</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{totalWords}</div>
                        <div className="text-sm text-green-600">Total Words</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{avgWords}</div>
                        <div className="text-sm text-purple-600">Avg Words/Entry</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{activeDays}</div>
                        <div className="text-sm text-orange-600">Active Days</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Back Button */}
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  ← Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;