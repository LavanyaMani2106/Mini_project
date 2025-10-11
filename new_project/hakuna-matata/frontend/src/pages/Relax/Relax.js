import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

const Relax = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  const modules = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Guided breathing techniques to calm your mind',
      icon: '🌬️',
      color: 'bg-blue-500',
      exercises: [
        { name: '4-7-8 Breathing', duration: '5 min', description: 'Inhale for 4, hold for 7, exhale for 8' },
        { name: 'Box Breathing', duration: '4 min', description: 'Equal duration inhale, hold, exhale, hold' },
        { name: 'Deep Breathing', duration: '3 min', description: 'Slow, deep abdominal breathing' }
      ]
    },
    {
      id: 'music',
      title: 'Music Therapy',
      description: 'Calming sounds and music for relaxation',
      icon: '🎵',
      color: 'bg-purple-500',
      exercises: [
        { name: 'Nature Sounds', duration: '10 min', description: 'Forest and water sounds' },
        { name: 'Meditation Music', duration: '15 min', description: 'Soothing instrumental music' },
        { name: 'Binaural Beats', duration: '20 min', description: 'Brainwave entrainment' }
      ]
    },
    {
      id: 'meditation',
      title: 'Meditation',
      description: 'Guided meditation sessions',
      icon: '🧘',
      color: 'bg-green-500',
      exercises: [
        { name: 'Mindfulness', duration: '10 min', description: 'Present moment awareness' },
        { name: 'Body Scan', duration: '15 min', description: 'Progressive relaxation' },
        { name: 'Loving Kindness', duration: '12 min', description: 'Compassion meditation' }
      ]
    },
    {
      id: 'games',
      title: 'Relaxation Games',
      description: 'Calming games to reduce stress',
      icon: '🎮',
      color: 'bg-pink-500',
      exercises: [
        { name: 'Memory Game', duration: '5-10 min', description: 'Match pairs to relax your mind' },
        { name: 'Color Breathing', duration: '3-5 min', description: 'Watch colors change with your breath' },
        { name: 'Zen Garden', duration: 'Unlimited', description: 'Draw peaceful patterns' },
        { name: 'Bubble Pop', duration: '5 min', description: 'Pop bubbles to release tension' },
        { name: 'Simple Puzzle', duration: '5-10 min', description: 'Slide tiles to complete the picture' }
      ]
    }
  ];

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setBreathingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsBreathingActive(false);
        setBreathingProgress(0);
      }
    }, 100);
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathingProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relaxation Hub</h1>
        <p className="text-gray-600 mb-8">Choose your preferred relaxation technique</p>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {modules.map(module => (
            <div
              key={module.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveModule(module)}
            >
              <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                {module.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
            </div>
          ))}
        </div>

        {/* Active Module Content */}
        {activeModule && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{activeModule.title}</h2>
              <button
                onClick={() => setActiveModule(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            {activeModule.id === 'breathing' && (
              <div className="text-center">
                <div className="max-w-md mx-auto">
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                    <div 
                      className="absolute inset-8 bg-blue-500 rounded-full transition-all duration-1000 ease-in-out"
                      style={{
                        transform: `scale(${0.5 + (breathingProgress / 200)})`,
                        opacity: 0.7 + (breathingProgress / 400)
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-700">
                        {isBreathingActive ? 'Breathe...' : 'Ready'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-100"
                        style={{ width: `${breathingProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Progress: {breathingProgress}%
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {!isBreathingActive ? (
                      <button
                        onClick={startBreathingExercise}
                        className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                      >
                        <Play className="h-5 w-5" />
                        <span>Start Breathing</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopBreathingExercise}
                        className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
                      >
                        <Square className="h-5 w-5" />
                        <span>Stop</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeModule.id !== 'breathing' && activeModule.id !== 'games' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeModule.exercises.map((exercise, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Volume2 className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{exercise.name}</h4>
                        <span className="text-sm text-gray-500">{exercise.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeModule.id === 'games' && !selectedGame && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeModule.exercises.map((exercise, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-pink-500 transition-colors cursor-pointer" onClick={() => setSelectedGame(exercise.name)}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        🎮
                      </div>
                      <div>
                        <h4 className="font-semibold">{exercise.name}</h4>
                        <span className="text-sm text-gray-500">{exercise.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                  </div>
                ))}
              </div>
            )}

            {selectedGame && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">{selectedGame}</h3>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Back to Games
                  </button>
                </div>
                {selectedGame === 'Memory Game' && <MemoryGame />}
                {selectedGame === 'Color Breathing' && <ColorBreathing />}
                {selectedGame === 'Zen Garden' && <ZenGarden />}
                {selectedGame === 'Bubble Pop' && <BubblePop />}
                {selectedGame === 'Simple Puzzle' && <SimplePuzzle />}
              </div>
            )}
          </div>
        )}

        {/* Quick Relaxation Tips */}
        {!activeModule && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Relaxation Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">💆</div>
                <h4 className="font-semibold mb-1">Deep Breathing</h4>
                <p className="text-sm text-gray-600">Take 5 deep breaths to instantly calm yourself</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">🚶</div>
                <h4 className="font-semibold mb-1">Short Walk</h4>
                <p className="text-sm text-gray-600">A 5-minute walk can clear your mind</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">💧</div>
                <h4 className="font-semibold mb-1">Drink Water</h4>
                <p className="text-sm text-gray-600">Hydration helps reduce stress</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="font-semibold mb-1">Quick Journal</h4>
                <p className="text-sm text-gray-600">Write down what's bothering you</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Game Components
const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const emojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀'];
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((emoji, index) => ({ id: index, emoji, flipped: false })));
  }, []);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <p className="mb-4">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {cards.map(card => (
          <div
            key={card.id}
            className="w-16 h-16 bg-pink-200 rounded-lg flex items-center justify-center cursor-pointer text-2xl"
            onClick={() => handleCardClick(card.id)}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : '?'}
          </div>
        ))}
      </div>
      {matched.length === cards.length && <p className="mt-4 text-green-600">Congratulations! You won in {moves} moves.</p>}
    </div>
  );
};

const ColorBreathing = () => {
  const [color, setColor] = useState('#ff9999');

  useEffect(() => {
    const interval = setInterval(() => {
      const hue = Math.random() * 360;
      setColor(`hsl(${hue}, 70%, 80%)`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div
        className="w-64 h-64 rounded-full mx-auto mb-4 transition-colors duration-2000"
        style={{ backgroundColor: color }}
      ></div>
      <p>Focus on the changing colors and breathe deeply.</p>
    </div>
  );
};

const ZenGarden = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const startDrawing = (e) => {
    setDrawing(true);
    draw(e);
  };

  const stopDrawing = () => setDrawing(false);

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="text-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border border-gray-300 mx-auto mb-4 cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      ></canvas>
      <button onClick={clearCanvas} className="bg-purple-500 text-white px-4 py-2 rounded">Clear</button>
      <p>Draw peaceful patterns to relax your mind.</p>
    </div>
  );
};

const BubblePop = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bubbles.length < 5) {
        const newBubble = {
          id: Date.now(),
          x: Math.random() * 300,
          y: 300,
          size: Math.random() * 50 + 20
        };
        setBubbles(prev => [...prev, newBubble]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [bubbles]);

  const popBubble = (id) => {
    setBubbles(bubbles.filter(b => b.id !== id));
  };

  return (
    <div className="relative w-full h-96 bg-blue-100 overflow-hidden">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute bg-white border-2 border-blue-300 rounded-full cursor-pointer animate-bounce"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size
          }}
          onClick={() => popBubble(bubble.id)}
        ></div>
      ))}
      <p className="absolute bottom-4 left-4">Click the bubbles to pop them and release tension.</p>
    </div>
  );
};

const SimplePuzzle = () => {
  const [tiles, setTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, null]);

  const shuffle = () => {
    const shuffled = [...tiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  };

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const diff = Math.abs(index - emptyIndex);
    if (diff === 1 || diff === 3) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const isSolved = tiles.slice(0, 8).every((tile, i) => tile === i + 1);

  return (
    <div className="text-center">
      <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto mb-4">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`w-16 h-16 border border-gray-300 flex items-center justify-center cursor-pointer ${tile ? 'bg-green-200' : 'bg-gray-200'}`}
            onClick={() => moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <button onClick={shuffle} className="bg-green-500 text-white px-4 py-2 rounded mb-2">Shuffle</button>
      {isSolved && <p className="text-green-600">Puzzle solved!</p>}
      <p>Slide the tiles to arrange numbers 1-8.</p>
    </div>
  );
};

export default Relax;
