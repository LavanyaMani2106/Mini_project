import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [playlist, setPlaylist] = useState('calm');
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const playlists = {
    calm: {
      name: 'Calm Focus',
      tracks: [
        { name: 'Gentle Waves', duration: '5:00', type: 'Nature' },
        { name: 'Forest Dawn', duration: '7:30', type: 'Nature' },
        { name: 'Mountain Stream', duration: '6:15', type: 'Nature' }
      ]
    },
    meditation: {
      name: 'Meditation',
      tracks: [
        { name: 'Zen Garden', duration: '10:00', type: 'Ambient' },
        { name: 'Deep Space', duration: '8:45', type: 'Ambient' },
        { name: 'Crystal Singing', duration: '12:00', type: 'Healing' }
      ]
    },
    sleep: {
      name: 'Sleep Aid',
      tracks: [
        { name: 'Ocean Dreams', duration: '15:00', type: 'Nature' },
        { name: 'Starlight Lullaby', duration: '20:00', type: 'Ambient' },
        { name: 'Rainy Night', duration: '18:30', type: 'Nature' }
      ]
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlists[playlist].tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlists[playlist].tracks.length) % playlists[playlist].tracks.length);
    setProgress(0);
  };

  // Simulate audio progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTrackInfo = playlists[playlist].tracks[currentTrack];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Music Therapy</h1>
            <p className="text-gray-600">Soothing sounds for relaxation and focus</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Music Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              
              {/* Album Art */}
              <div className="flex justify-center mb-8">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🎵</div>
                    <div className="text-sm">{playlists[playlist].name}</div>
                  </div>
                </div>
              </div>

              {/* Track Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentTrackInfo.name}
                </h2>
                <p className="text-gray-600">
                  {currentTrackInfo.type} • {currentTrackInfo.duration}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{formatTime(Math.floor(progress * 3))}</span>
                  <span>{currentTrackInfo.duration}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-6 mb-6">
                <button 
                  onClick={prevTrack}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="text-xl">⏮</span>
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <span className="text-2xl">
                    {isPlaying ? '⏸' : '▶'}
                  </span>
                </button>
                
                <button 
                  onClick={nextTrack}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="text-xl">⏭</span>
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">🔈</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-600">🔊</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-purple-800 mb-3">Therapeutic Benefits</h3>
              <p className="text-purple-700 text-sm">
                Music therapy can reduce cortisol levels, lower blood pressure, and promote relaxation. 
                The right sounds can help calm your nervous system and improve mental focus.
              </p>
            </div>
          </div>

          {/* Playlist & Info */}
          <div className="space-y-6">
            
            {/* Playlist Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Playlists</h3>
              <div className="space-y-3">
                {Object.entries(playlists).map(([key, playlistData]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setPlaylist(key);
                      setCurrentTrack(0);
                      setProgress(0);
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      playlist === key
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{playlistData.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {playlistData.tracks.length} tracks • {playlistData.tracks[0].type}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Playlist */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Current Playlist</h3>
              <div className="space-y-3">
                {playlists[playlist].tracks.map((track, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentTrack
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setCurrentTrack(index);
                      setProgress(0);
                    }}
                  >
                    <div className="font-medium">{track.name}</div>
                    <div className={`text-sm ${
                      index === currentTrack ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {track.duration} • {track.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Timer */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Session Timer</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatTime(Math.floor(progress * 3))}
                </div>
                <p className="text-gray-600 text-sm">Current track progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Optimal Listening</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Use headphones for best experience
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Adjust volume to comfortable level
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Combine with breathing exercises
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Listen during work or before sleep
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Music;