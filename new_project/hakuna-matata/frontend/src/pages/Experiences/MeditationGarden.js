import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Wind, Sun, Music, Volume2, VolumeX, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeditationGarden = () => {
  const navigate = useNavigate();
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Web Audio API
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopAmbientSound();
    };
  }, []);

  const createAmbientSound = () => {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create multiple oscillators for layered ambient sound
      const oscillators = [];
      const gainNodes = [];

      // Wind sound (low frequency noise)
      const windGain = audioContext.createGain();
      windGain.gain.value = 0.03;
      
      const bufferSize = 4096;
      const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
      whiteNoise.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      };
      
      const windFilter = audioContext.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.value = 400;
      
      whiteNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(audioContext.destination);
      
      oscillators.push(whiteNoise);
      gainNodes.push(windGain);

      // Bird chirps simulation (higher frequency tones)
      for (let i = 0; i < 3; i++) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = 800 + Math.random() * 1200;
        gain.gain.value = 0;
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        
        // Random chirps
        setInterval(() => {
          if (isPlaying) {
            const now = audioContext.currentTime;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.02, now + 0.05);
            gain.gain.linearRampToValueAtTime(0, now + 0.2);
            osc.frequency.setValueAtTime(800 + Math.random() * 1200, now);
          }
        }, 2000 + Math.random() * 3000);
        
        oscillators.push(osc);
        gainNodes.push(gain);
      }

      // Gentle drone (meditation tone)
      const drone = audioContext.createOscillator();
      const droneGain = audioContext.createGain();
      drone.type = 'sine';
      drone.frequency.value = 110; // A2 note
      droneGain.gain.value = 0.015;
      
      drone.connect(droneGain);
      droneGain.connect(audioContext.destination);
      drone.start();
      
      oscillators.push(drone);
      gainNodes.push(droneGain);

      oscillatorsRef.current = oscillators;
      
      console.log('Ambient sound created successfully');
      return true;
    } catch (err) {
      console.error('Error creating ambient sound:', err);
      return false;
    }
  };

  const stopAmbientSound = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        if (osc.stop) {
          osc.stop();
        }
        if (osc.disconnect) {
          osc.disconnect();
        }
      } catch (e) {
        // Ignore errors when stopping
      }
    });
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    oscillatorsRef.current = [];
  };

  const toggleAudio = async () => {
    try {
      if (isPlaying) {
        stopAmbientSound();
        setIsPlaying(false);
        console.log('Audio stopped');
      } else {
        const success = createAmbientSound();
        if (success) {
          setIsPlaying(true);
          console.log('Audio playing');
        }
      }
    } catch (err) {
      console.error('Playback error:', err);
      alert('Unable to play audio. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sun-rays-in-a-forest-1228-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/90" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center">
        <button 
          onClick={() => navigate('/activities')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        
        {/* Audio Control */}
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full ${
            isPlaying ? 'text-emerald-400 hover:text-emerald-300' : 'text-white/80 hover:text-white'
          }`}
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <span className="text-sm font-medium">{isPlaying ? 'Sound On' : 'Click for Sound'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white font-serif mb-6 tracking-wide drop-shadow-lg">
            Zen Garden
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
            Immerse yourself in the tranquility of nature. Listen to the gentle rustle of leaves and find your inner peace.
          </p>

          {/* Play Button Prompt */}
          {!isPlaying && (
            <button
              onClick={toggleAudio}
              className="mb-8 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-lg shadow-xl shadow-emerald-500/30 flex items-center gap-3 mx-auto transition-all hover:scale-105"
            >
              <Play className="w-6 h-6 fill-current" />
              Enable Ambient Sounds
            </button>
          )}

          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-40 hover:bg-white/20 transition-colors">
              <Wind className="w-8 h-8 text-emerald-300 mx-auto mb-3" />
              <h3 className="text-white font-bold">Breathe</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-40 hover:bg-white/20 transition-colors">
              <Sun className="w-8 h-8 text-amber-300 mx-auto mb-3" />
              <h3 className="text-white font-bold">Visualize</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-40 hover:bg-white/20 transition-colors">
              <Music className="w-8 h-8 text-blue-300 mx-auto mb-3" />
              <h3 className="text-white font-bold">Listen</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationGarden;

