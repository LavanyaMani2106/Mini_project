import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Keyboard, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', '#1abc9c', '#f1c40f', '#e84393'];

// Musical notes mapped to keys (pentatonic scale for pleasant sounds)
const KEY_FREQUENCIES = {
  'A': 261.63, 'B': 293.66, 'C': 329.63, 'D': 349.23, 'E': 392.00,
  'F': 440.00, 'G': 493.88, 'H': 523.25, 'I': 587.33, 'J': 659.25,
  'K': 698.46, 'L': 783.99, 'M': 880.00, 'N': 987.77, 'O': 1046.50,
  'P': 1174.66, 'Q': 1318.51, 'R': 1396.91, 'S': 1567.98, 'T': 1760.00,
  'U': 1975.53, 'V': 2093.00, 'W': 2349.32, 'X': 2637.02, 'Y': 2793.83, 'Z': 3135.96
};

const Patatap = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const [lastKey, setLastKey] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (frequency) => {
    if (!soundEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  };

  const enableSound = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setSoundEnabled(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let circles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Circle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 0;
        this.maxRadius = Math.max(canvas.width, canvas.height) / 2;
        this.opacity = 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        this.radius += 15;
        this.opacity -= 0.02;
        this.draw();
      }
    }

    const animate = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle, index) => {
        if (circle.opacity <= 0) {
          circles.splice(index, 1);
        } else {
          circle.update();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      
      // Only handle A-Z keys
      if (!/^[A-Z]$/.test(key)) return;
      
      setLastKey(key);
      
      // Create visual
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      circles.push(new Circle(x, y, color));

      // Play sound
      const frequency = KEY_FREQUENCIES[key];
      if (frequency) {
        playSound(frequency);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, [soundEnabled]);

  return (
    <div className="fixed inset-0 bg-slate-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Overlay UI */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none">
        <button 
          onClick={() => navigate('/activities')}
          className="pointer-events-auto flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
          Exit
        </button>

        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-white/90 font-serif tracking-wider mb-2">Soundscapes</h1>
          <p className="text-white/50 flex items-center justify-center gap-2">
            <Keyboard className="w-4 h-4" />
            Press any key A-Z
          </p>
        </div>

        <button
          onClick={enableSound}
          className={`pointer-events-auto flex items-center gap-2 transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full ${
            soundEnabled ? 'text-emerald-400' : 'text-white/70 hover:text-white'
          }`}
        >
          <Volume2 className="w-5 h-5" />
          <span className="text-sm">{soundEnabled ? 'Sound On' : 'Enable Sound'}</span>
        </button>
      </div>

      {/* Sound Prompt */}
      {!soundEnabled && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={enableSound}
            className="pointer-events-auto px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold text-lg shadow-xl shadow-purple-500/30 flex items-center gap-3 transition-all hover:scale-105"
          >
            <Volume2 className="w-6 h-6" />
            Click to Enable Sound
          </button>
        </div>
      )}

      {/* Key Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {lastKey && (
          <span className="text-[20rem] font-bold text-white/5 animate-ping-slow font-serif">
            {lastKey}
          </span>
        )}
      </div>
    </div>
  );
};

export default Patatap;
