import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, Pause, Volume2, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BodyScan = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Mock audio duration for demo (would be dynamic in real app)
  const duration = 1500; // 25 minutes in seconds

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${mins}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
        <button onClick={() => navigate('/activities')} className="flex items-center gap-2 text-slate-600 font-medium">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-xl font-bold text-slate-900 font-serif">Body Scan Meditation</h1>
        <div className="w-20" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 border border-white/50">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-200">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Full Body Scan</h2>
            <p className="text-slate-500">Guided by Dr. Kabat-Zinn</p>
          </div>

          {/* Audio Controls */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
              <span>25:00</span>
            </div>

            <div className="flex items-center justify-center gap-8">
              <button className="p-4 rounded-full text-slate-400 hover:bg-slate-50 transition-colors">
                <Volume2 className="w-6 h-6" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl shadow-slate-200"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>

              <button className="p-4 rounded-full text-slate-400 hover:bg-slate-50 transition-colors">
                <Activity className="w-6 h-6" />
              </button>
            </div>
          </div>

          <audio 
            ref={audioRef}
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder audio
            loop
          />
        </div>

        <div className="mt-12 text-center max-w-md">
          <h3 className="font-bold text-slate-900 mb-2">How to Practice</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Lie down in a comfortable position. Close your eyes. Bring your attention to your breath, 
            then slowly move your focus through different parts of your body, noticing any sensations without judgment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BodyScan;
