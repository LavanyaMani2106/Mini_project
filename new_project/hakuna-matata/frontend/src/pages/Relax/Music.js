import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Mock music library - simulation only
  const tracks = [
    { 
      name: "Calming Waves", 
      emoji: "🌊", 
      duration: "3:45",
      description: "Gentle ocean waves for deep relaxation"
    },
    { 
      name: "Forest Meditation", 
      emoji: "🌲", 
      duration: "4:20",
      description: "Soothing forest sounds with bird melodies"
    },
    { 
      name: "Peaceful Piano", 
      emoji: "🎹", 
      duration: "5:15",
      description: "Soft piano melodies for stress relief"
    },
    { 
      name: "Zen Garden", 
      emoji: "🎋", 
      duration: "6:30",
      description: "Japanese garden ambiance with water features"
    },
    { 
      name: "Mountain Stream", 
      emoji: "⛰️", 
      duration: "4:50",
      description: "Flowing water and mountain echoes"
    }
  ];

  // Progress simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Auto-next track when progress completes
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000); // Update every second
    } else {
      setProgress(0); // Reset progress when paused
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
    // Keep playing state if it was playing
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
    // Keep playing state if it was playing
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getCurrentTime = () => {
    const totalSeconds = (tracks[currentTrack].duration.split(':')[0] * 60) + parseInt(tracks[currentTrack].duration.split(':')[1]);
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    return formatTime(currentSeconds);
  };

  const getTotalTime = () => {
    return tracks[currentTrack].duration;
  };

  const handleTrackSelect = (index) => {
    setCurrentTrack(index);
    setProgress(0);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const newProgress = (clickPosition / progressBarWidth) * 100;
    setProgress(Math.max(0, Math.min(100, newProgress)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Relaxing Music</h1>
          <p className="text-gray-600">Soothing sounds to reduce stress and anxiety</p>
          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🎵 <strong>Simulation Mode:</strong> Visual music player experience
            </p>
          </div>
        </div>

        {/* Music Player */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Current Track */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{tracks[currentTrack].emoji}</div>
            <h2 className="text-xl font-semibold text-gray-900">{tracks[currentTrack].name}</h2>
            <p className="text-gray-500 mt-1">{tracks[currentTrack].description}</p>
            <div className="flex justify-center items-center mt-2 space-x-4 text-sm text-gray-600">
              <span>{getCurrentTime()}</span>
              <span>/</span>
              <span>{getTotalTime()}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6" onClick={handleProgressClick}>
            <div className="w-full bg-gray-200 rounded-full h-3 cursor-pointer">
              <div 
                className="h-3 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center space-x-8">
            <button 
              onClick={prevTrack}
              className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-2xl disabled:opacity-50"
              title="Previous Track"
            >
              ⏮️
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-6 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-2xl shadow-lg"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <button 
              onClick={nextTrack}
              className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-2xl disabled:opacity-50"
              title="Next Track"
            >
              ⏭️
            </button>
          </div>

          {/* Status */}
          <div className="text-center mt-4">
            <p className={`text-sm font-medium ${isPlaying ? 'text-green-600' : 'text-gray-500'}`}>
              {isPlaying ? '🎵 Now Playing - Relax and Breathe' : '⏸️ Paused - Click play to continue'}
            </p>
          </div>
        </div>

        {/* Track List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Relaxation Playlist</h3>
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <div 
                key={index}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                  index === currentTrack 
                    ? 'bg-primary/10 border-2 border-primary transform scale-105' 
                    : 'hover:bg-gray-50 hover:scale-105'
                }`}
                onClick={() => handleTrackSelect(index)}
              >
                <div className="text-3xl mr-4">{track.emoji}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{track.name}</div>
                  <div className="text-sm text-gray-500">{track.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{track.duration}</div>
                </div>
                {index === currentTrack && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isPlaying ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isPlaying ? '▶️ Playing' : '⏸️ Selected'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Breathing Exercise */}
        {isPlaying && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">🧘 Guided Breathing</h3>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                  <span className="text-2xl">🌬️</span>
                </div>
                <p className="text-sm text-green-700">Breathe In</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">⏱️</span>
                </div>
                <p className="text-sm text-green-700">Hold</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                  <span className="text-2xl">💨</span>
                </div>
                <p className="text-sm text-green-700">Breathe Out</p>
              </div>
            </div>
            <p className="text-center text-sm text-green-600 mt-3">
              Follow the rhythm: 4 seconds in, 4 seconds hold, 6 seconds out
            </p>
          </div>
        )}

        {/* Relaxation Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-800 mb-3 text-lg">💡 Maximize Your Relaxation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">🔇</span>
              <span className="text-sm text-blue-700">Find a quiet space without distractions</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">💺</span>
              <span className="text-sm text-blue-700">Sit comfortably or lie down</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">👁️</span>
              <span className="text-sm text-blue-700">Close your eyes and focus on breathing</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">⏰</span>
              <span className="text-sm text-blue-700">Practice for 10-15 minutes daily</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full mt-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          ← Back to Dashboard
        </button>

      </div>
    </div>
  );
};

export default Music;