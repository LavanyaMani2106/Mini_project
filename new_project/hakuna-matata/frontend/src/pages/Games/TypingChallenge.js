import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, RefreshCw, Trophy, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WORDS = [
  "breathe", "calm", "peace", "relax", "focus", "serenity", "balance", "harmony",
  "mindful", "present", "nature", "ocean", "forest", "gentle", "kindness",
  "gratitude", "joy", "smile", "laugh", "love", "hope", "dream", "create",
  "inspire", "believe", "achieve", "grow", "learn", "explore", "discover"
];

const TypingChallenge = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('typing_highscore')) || 0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('typing_highscore', score);
      }
    }
  }, [isActive, timeLeft, score, highScore]);

  useEffect(() => {
    if (isActive && !currentWord) {
      generateWord();
    }
  }, [isActive, currentWord]);

  const generateWord = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsActive(true);
    setInput('');
    generateWord();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);

    if (val === currentWord) {
      setScore(s => s + 1);
      setInput('');
      generateWord();
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <button onClick={() => navigate('/activities')} className="flex items-center gap-2 text-slate-600 font-medium">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-xl font-bold text-indigo-900 font-serif">Zen Typing</h1>
        <div className="w-20" />
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
            <div 
              className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center mb-12 mt-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Timer className="w-5 h-5" />
              <span className="text-2xl font-mono font-bold text-slate-900">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">High Score: {highScore}</span>
            </div>
          </div>

          {!isActive && timeLeft === 0 ? (
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Time's Up!</h2>
              <p className="text-slate-600 mb-6">You typed <span className="font-bold text-indigo-600 text-xl">{score}</span> words correctly.</p>
              <button 
                onClick={startGame}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" /> Play Again
              </button>
            </div>
          ) : !isActive ? (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Focus?</h2>
              <p className="text-slate-600 mb-8">Type the words as they appear. Focus on accuracy and rhythm.</p>
              <button 
                onClick={startGame}
                className="px-12 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-200"
              >
                Start Challenge
              </button>
            </div>
          ) : (
            <div className="mb-8">
              <div className="text-6xl font-bold text-slate-800 mb-8 font-serif tracking-wide h-20 flex items-center justify-center">
                {currentWord.split('').map((char, i) => (
                  <span key={i} className={i < input.length ? (input[i] === char ? 'text-emerald-500' : 'text-rose-500') : 'text-slate-300'}>
                    {char}
                  </span>
                ))}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInput}
                className="w-full max-w-md px-6 py-4 text-center text-2xl border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all bg-slate-50"
                placeholder="Type here..."
                autoFocus
              />
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-slate-400 text-sm">Current Score: <span className="text-slate-900 font-bold text-lg ml-1">{score}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingChallenge;
