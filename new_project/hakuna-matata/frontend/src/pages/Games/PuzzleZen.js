import React, { useState, useEffect } from 'react';
import { ChevronLeft, RefreshCw, Trophy, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ICONS = ['🌸', '🌊', '🍂', '🏔️', '🌙', '⭐', '🔥', '🍀'];

const PuzzleZen = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, isFlipped: false }));
    
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setWon(false);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || solved.includes(id) || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].icon === cards[secondId].icon) {
        setSolved(prev => [...prev, firstId, secondId]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) {
          setTimeout(() => setWon(true), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <button onClick={() => navigate('/activities')} className="flex items-center gap-2 text-slate-600 font-medium">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-xl font-bold text-emerald-900 font-serif">Puzzle Zen</h1>
        <button onClick={initializeGame} className="p-2 hover:bg-emerald-100 rounded-full text-emerald-600 transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-8 flex gap-8">
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-slate-600 font-medium">
            Moves: <span className="text-emerald-600 font-bold text-lg ml-2">{moves}</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-slate-600 font-medium">
            Pairs: <span className="text-emerald-600 font-bold text-lg ml-2">{solved.length / 2} / 8</span>
          </div>
        </div>

        {won ? (
          <div className="text-center animate-bounce-in">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Harmony Restored!</h2>
            <p className="text-slate-600 mb-8">You completed the puzzle in {moves} moves.</p>
            <button 
              onClick={initializeGame}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-w-md w-full">
            {cards.map((card) => {
              const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`
                    aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-500 transform perspective-1000
                    ${isFlipped 
                      ? 'bg-white shadow-md rotate-y-180' 
                      : 'bg-emerald-200 hover:bg-emerald-300 shadow-inner'}
                  `}
                  disabled={isFlipped}
                >
                  <span className={`transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                    {card.icon}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleZen;
