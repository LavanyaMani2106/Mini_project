import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, CloudRain, Trees, Waves, Wind, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOUNDS = [
  { id: 'rain', label: 'Rain', icon: CloudRain, color: 'bg-blue-500' },
  { id: 'forest', label: 'Forest', icon: Trees, color: 'bg-emerald-500' },
  { id: 'ocean', label: 'Ocean', icon: Waves, color: 'bg-cyan-500' },
  { id: 'wind', label: 'Wind', icon: Wind, color: 'bg-slate-500' },
];

const NatureSounds = () => {
  const navigate = useNavigate();
  const [activeSounds, setActiveSounds] = useState({});
  const audioContextRef = useRef(null);
  const soundNodesRef = useRef({});

  useEffect(() => {
    // Initialize audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();

    return () => {
      // Cleanup all sounds on unmount
      Object.keys(soundNodesRef.current).forEach(id => stopSound(id));
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createRainSound = (audioContext, volume) => {
    const bufferSize = 4096;
    const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    
    whiteNoise.onaudioprocess = function(e) {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };

    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    return { nodes: [whiteNoise], gainNode };
  };

  const createForestSound = (audioContext, volume) => {
    const oscillators = [];
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    // Create bird chirps
    for (let i = 0; i < 3; i++) {
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = 800 + Math.random() * 1200;
      oscGain.gain.value = 0;
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      
      // Random chirps
      const chirp = () => {
        const now = audioContext.currentTime;
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.1, now + 0.05);
        oscGain.gain.linearRampToValueAtTime(0, now + 0.2);
        osc.frequency.setValueAtTime(800 + Math.random() * 1200, now);
        
        setTimeout(chirp, 2000 + Math.random() * 4000);
      };
      chirp();
      
      oscillators.push(osc);
    }

    gainNode.connect(audioContext.destination);
    return { nodes: oscillators, gainNode };
  };

  const createOceanSound = (audioContext, volume) => {
    const bufferSize = 4096;
    const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    
    let phase = 0;
    whiteNoise.onaudioprocess = function(e) {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Create wave-like pattern
        const wave = Math.sin(phase) * 0.5;
        output[i] = (Math.random() * 2 - 1) * (0.3 + wave);
        phase += 0.0001;
      }
    };

    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    return { nodes: [whiteNoise], gainNode };
  };

  const createWindSound = (audioContext, volume) => {
    const bufferSize = 4096;
    const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    
    whiteNoise.onaudioprocess = function(e) {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };

    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 500;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    return { nodes: [whiteNoise], gainNode };
  };

  const startSound = (id, volume = 0.5) => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    // Resume audio context if suspended
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    let soundData;
    switch (id) {
      case 'rain':
        soundData = createRainSound(audioContext, volume);
        break;
      case 'forest':
        soundData = createForestSound(audioContext, volume);
        break;
      case 'ocean':
        soundData = createOceanSound(audioContext, volume);
        break;
      case 'wind':
        soundData = createWindSound(audioContext, volume);
        break;
      default:
        return;
    }

    soundNodesRef.current[id] = soundData;
  };

  const stopSound = (id) => {
    const soundData = soundNodesRef.current[id];
    if (!soundData) return;

    soundData.nodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // Ignore errors
      }
    });

    if (soundData.gainNode) {
      soundData.gainNode.disconnect();
    }

    delete soundNodesRef.current[id];
  };

  const toggleSound = (id) => {
    const isActive = activeSounds[id] !== undefined;

    if (isActive) {
      stopSound(id);
      const newActive = { ...activeSounds };
      delete newActive[id];
      setActiveSounds(newActive);
    } else {
      startSound(id, 0.5);
      setActiveSounds({ ...activeSounds, [id]: 0.5 });
    }
  };

  const handleVolumeChange = (id, val) => {
    const volume = parseFloat(val);
    const soundData = soundNodesRef.current[id];
    
    if (soundData && soundData.gainNode) {
      soundData.gainNode.gain.value = volume;
      setActiveSounds({ ...activeSounds, [id]: volume });
    }
  };

  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000" 
          alt="Nature" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 to-emerald-950/90" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 z-20">
        <button 
          onClick={() => navigate('/activities')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">Nature Mixer</h1>
          <p className="text-emerald-200 text-lg">Create your perfect sanctuary. Mix and match sounds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOUNDS.map((sound) => {
            const Icon = sound.icon;
            const isActive = activeSounds[sound.id] !== undefined;
            const volume = activeSounds[sound.id] || 0.5;

            return (
              <div 
                key={sound.id}
                className={`
                  bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300
                  ${isActive ? 'border-emerald-400/50 bg-white/20' : 'border-white/5 hover:bg-white/15'}
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${sound.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{sound.label}</h3>
                  </div>
                  <button 
                    onClick={() => toggleSound(sound.id)}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all
                      ${isActive ? 'bg-white text-emerald-900' : 'bg-white/10 text-white hover:bg-white/20'}
                    `}
                  >
                    {isActive ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>

                <div className={`transition-all duration-300 ${isActive ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(sound.id, e.target.value)}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NatureSounds;

