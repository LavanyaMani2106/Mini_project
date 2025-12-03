import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Sun, Waves, Cloud, Volume2, VolumeX, Play, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VirtualBeach = () => {
  const navigate = useNavigate();
  const audioContextRef = useRef(null);
  const soundNodesRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);

  // Initialize Web Audio API
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopOceanSound();
    };
  }, []);

  const createOceanSound = () => {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const bufferSize = 4096;
      const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
      
      let phase = 0;
      let wavePhase = 0;
      
      whiteNoise.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          // Create wave-like pattern with varying intensity
          const wave = Math.sin(wavePhase) * 0.6;
          const secondaryWave = Math.sin(wavePhase * 0.5) * 0.3;
          const noise = (Math.random() * 2 - 1) * (0.2 + wave + secondaryWave);
          
          output[i] = noise;
          phase += 0.0001;
          wavePhase += 0.00008;
        }
      };

      // Create filters for realistic ocean sound
      const lowpass = audioContext.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 1200;
      lowpass.Q.value = 0.5;

      const highpass = audioContext.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 100;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.4;

      // Connect the nodes
      whiteNoise.connect(highpass);
      highpass.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(audioContext.destination);

      soundNodesRef.current = {
        whiteNoise,
        highpass,
        lowpass,
        gainNode
      };

      console.log('Ocean sound created successfully');
      return true;
    } catch (err) {
      console.error('Error creating ocean sound:', err);
      return false;
    }
  };

  const stopOceanSound = () => {
    if (soundNodesRef.current) {
      try {
        const { whiteNoise, highpass, lowpass, gainNode } = soundNodesRef.current;
        
        if (whiteNoise && whiteNoise.disconnect) whiteNoise.disconnect();
        if (highpass && highpass.disconnect) highpass.disconnect();
        if (lowpass && lowpass.disconnect) lowpass.disconnect();
        if (gainNode && gainNode.disconnect) gainNode.disconnect();
      } catch (e) {
        // Ignore errors when stopping
      }
      
      soundNodesRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const toggleAudio = async () => {
    try {
      if (isPlaying) {
        stopOceanSound();
        setIsPlaying(false);
        console.log('Ocean sound stopped');
      } else {
        const success = createOceanSound();
        if (success) {
          setIsPlaying(true);
          console.log('Ocean sound playing');
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
          className="w-full h-full object-cover opacity-70"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/80" />
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
        
        <div className="flex gap-3">
          {/* Music Toggle Button */}
          <button
            onClick={() => setShowSpotify(!showSpotify)}
            className={`flex items-center gap-2 transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full ${
              showSpotify ? 'text-orange-400 hover:text-orange-300' : 'text-white/80 hover:text-white'
            }`}
          >
            <Music className="w-5 h-5" />
            <span className="text-sm font-medium">{showSpotify ? 'Hide Music' : 'Show Music'}</span>
          </button>

          {/* Audio Control */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full ${
              isPlaying ? 'text-cyan-400 hover:text-cyan-300' : 'text-white/80 hover:text-white'
            }`}
          >
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-sm font-medium">{isPlaying ? 'Waves On' : 'Waves Off'}</span>
          </button>
        </div>
      </div>

      {/* Spotify Player Overlay */}
      {showSpotify && (
        <div className="absolute bottom-8 right-8 z-30 w-full max-w-md px-4 md:px-0">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Beach Vibes</h3>
                  <p className="text-slate-400 text-xs">Chill & Relax</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSpotify(false)}
                className="text-slate-400 hover:text-white transition-colors text-xl"
              >
                ×
              </button>
            </div>
            
            {/* Spotify Embed */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8mBRYewE6or?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Beach Vibes Spotify Player"
              />
            </div>
            
            <p className="text-slate-400 text-xs text-center mt-3">
              Combine with ocean sounds for the ultimate beach experience 🌊
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white font-serif mb-6 tracking-wide drop-shadow-lg">
            Sunset Beach
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
            Watch the waves roll in as the sun sets. Let the rhythm of the ocean calm your mind.
          </p>

          {/* Play Button Prompt */}
          {!isPlaying && (
            <button
              onClick={toggleAudio}
              className="mb-8 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-bold text-lg shadow-xl shadow-cyan-500/30 flex items-center gap-3 mx-auto transition-all hover:scale-105"
            >
              <Play className="w-6 h-6 fill-current" />
              Enable Ocean Sounds
            </button>
          )}

          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-40 hover:bg-white/20 transition-colors">
              <Waves className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
              <h3 className="text-white font-bold">Ocean</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-40 hover:bg-white/20 transition-colors">
              <Sun className="w-8 h-8 text-orange-300 mx-auto mb-3" />
              <h3 className="text-white font-bold">Warmth</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-40 hover:bg-white/20 transition-colors">
              <Cloud className="w-8 h-8 text-white/80 mx-auto mb-3" />
              <h3 className="text-white font-bold">Breeze</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualBeach;
