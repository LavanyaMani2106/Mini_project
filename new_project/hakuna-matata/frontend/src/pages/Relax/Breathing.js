import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Breathing = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Ready'); // Ready, Inhale, Hold, Exhale
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [instruction, setInstruction] = useState('Press Play to Start');

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase('Complete');
      setInstruction('Session Complete');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (!isActive) return;

    const cycleDuration = 19000; // 4s inhale, 7s hold, 8s exhale
    const startTime = Date.now();

    const breathingCycle = () => {
      const now = Date.now();
      const elapsed = (now - startTime) % cycleDuration;

      if (elapsed < 4000) {
        setPhase('Inhale');
        setInstruction('Breathe In...');
      } else if (elapsed < 11000) {
        setPhase('Hold');
        setInstruction('Hold...');
      } else {
        setPhase('Exhale');
        setInstruction('Breathe Out...');
      }
    };

    const breathInterval = setInterval(breathingCycle, 100);
    return () => clearInterval(breathInterval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSession = () => setIsActive(!isActive);
  const resetSession = () => {
    setIsActive(false);
    setTimeLeft(300);
    setPhase('Ready');
    setInstruction('Press Play to Start');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-50" />
      <div className={`absolute inset-0 transition-opacity duration-[4000ms] ${phase === 'Inhale' ? 'opacity-30' : 'opacity-10'} bg-blue-500 blur-[100px]`} />

      {/* Back Button */}
      <button 
        onClick={() => navigate('/activities')}
        className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
        Back to Activities
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif text-white mb-2 tracking-wide">Deep Breathing</h1>
          <p className="text-blue-200/80">4-7-8 Technique for Relaxation</p>
        </div>

        {/* Breathing Circle */}
        <div className="relative w-80 h-80 flex items-center justify-center mb-12">
          {/* Outer Glow Ring */}
          <div 
            className={`absolute inset-0 rounded-full border-4 border-blue-400/30 transition-all duration-[4000ms] ease-in-out
              ${phase === 'Inhale' ? 'scale-110 opacity-100' : phase === 'Exhale' ? 'scale-90 opacity-50' : 'scale-100 opacity-80'}
            `}
          />
          
          {/* Inner Circle */}
          <div 
            className={`w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-[4000ms] ease-in-out
              ${phase === 'Inhale' ? 'scale-110' : phase === 'Exhale' ? 'scale-75' : 'scale-100'}
            `}
          >
            <div className="text-center text-white">
              <Wind className={`w-12 h-12 mx-auto mb-4 ${isActive ? 'animate-pulse' : ''}`} />
              <h2 className="text-3xl font-bold mb-2 transition-all duration-500">{instruction}</h2>
              <p className="text-blue-100 font-mono text-xl">{formatTime(timeLeft)}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-6">
          <button 
            onClick={toggleSession}
            className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-blue-50 transition-all hover:scale-110 shadow-lg"
          >
            {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button 
            onClick={resetSession}
            className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 backdrop-blur-md"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breathing;