import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, Wind, Music, Gamepad2, Activity, Heart, Smile, Coffee, Sun, Moon, LayoutGrid, Waves, Keyboard, Puzzle, Trees } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Activities', icon: LayoutGrid },
  { id: 'breathing', label: 'Breathing', icon: Wind },
  { id: 'yoga', label: 'Yoga & Meditation', icon: Heart },
  { id: '3d', label: '3D Experiences', icon: Sun },
  { id: 'dance', label: 'Dance', icon: Activity },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'music', label: 'Music', icon: Music },
];

const ACTIVITIES = [
  {
    id: 1,
    title: "Deep Breathing Exercise",
    description: "Guided breathing to reduce stress in 5 minutes",
    duration: "5 min",
    rating: 4.9,
    category: "breathing",
    icon: Wind,
    color: "from-blue-400 to-cyan-300",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "3D Meditation Garden",
    description: "Immersive 3D environment with calming nature sounds",
    duration: "15 min",
    rating: 5.0,
    category: "3d",
    icon: Trees,
    color: "from-green-400 to-emerald-300",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    description: "13 essential yoga mudras for stress relief",
    duration: "20 min",
    rating: 4.8,
    category: "yoga",
    icon: Sun,
    color: "from-orange-400 to-amber-300",
    image: "https://images.unsplash.com/photo-1544367563-12123d8975bd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Dance Therapy",
    description: "Move your body to uplifting music",
    duration: "10 min",
    rating: 4.7,
    category: "dance",
    icon: Activity,
    color: "from-pink-500 to-rose-400",
    image: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Typing Challenge",
    description: "Improve focus while having fun",
    duration: "8 min",
    rating: 4.6,
    category: "games",
    icon: Keyboard,
    color: "from-indigo-400 to-purple-300",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Patatap Interactive",
    description: "Create music and visuals with your keyboard",
    duration: "10 min",
    rating: 4.9,
    category: "music",
    icon: Gamepad2,
    color: "from-fuchsia-400 to-pink-300",
    image: "https://images.unsplash.com/photo-1519683109079-d5f539e1c429?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Calming Piano",
    description: "Peaceful piano melodies from Spotify",
    duration: "30 min",
    rating: 4.8,
    category: "music",
    icon: Music,
    color: "from-violet-400 to-indigo-300",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Nature Sounds",
    description: "Rain, ocean waves, and forest ambience",
    duration: "60 min",
    rating: 4.9,
    category: "music",
    icon: Waves,
    color: "from-teal-400 to-emerald-300",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Virtual Beach Sunset",
    description: "360° relaxing beach experience with guided meditation",
    duration: "20 min",
    rating: 5.0,
    category: "3d",
    icon: Sun,
    color: "from-orange-400 to-red-300",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Puzzle Zen",
    description: "Relaxing puzzle game for mindfulness",
    duration: "15 min",
    rating: 4.7,
    category: "games",
    icon: Puzzle,
    color: "from-yellow-400 to-amber-300",
    image: "https://images.unsplash.com/photo-1598620617377-3bfb505b4384?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 11,
    title: "Evening Relaxation",
    description: "Gentle stretches and breathing before bed",
    duration: "15 min",
    rating: 4.8,
    category: "yoga",
    icon: Moon,
    color: "from-indigo-500 to-blue-400",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 12,
    title: "Body Scan Meditation",
    description: "Progressive relaxation with voice guidance",
    duration: "25 min",
    rating: 4.9,
    category: "breathing",
    icon: Activity,
    color: "from-cyan-400 to-blue-300",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a33801524?q=80&w=800&auto=format&fit=crop"
  }
];

const Activities = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('activity_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fid => fid !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('activity_favorites', JSON.stringify(newFavorites));
  };

  const handleStartActivity = (id) => {
    const routes = {
      1: '/breathing',
      2: '/experiences/meditation-garden',
      3: '/yoga/morning-flow',
      4: '/dance/therapy',
      5: '/games/typing-challenge',
      6: '/music/patatap',
      7: '/music/calming-piano',
      8: '/sounds/nature',
      9: '/experiences/virtual-beach',
      10: '/games/puzzle-zen',
      11: '/relax/evening',
      12: '/relax/body-scan'
    };
    
    if (routes[id]) {
      navigate(routes[id]);
    }
  };

  const filteredActivities = activeCategory === 'all'
    ? ACTIVITIES
    : ACTIVITIES.filter(act => act.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif tracking-tight">
            Wellness Activities
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose an activity to reduce stress, improve your well-being, and find your balance.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-lg scale-105' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'}
                `}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActivities.map(activity => {
            const isFavorite = favorites.includes(activity.id);
            const Icon = activity.icon;
            
            return (
              <div 
                key={activity.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
              >
                {/* Card Image Area */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Floating Icon */}
                  <div className={`absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => toggleFavorite(activity.id, e)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white transition-colors group/btn"
                  >
                    <Star className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white group-hover/btn:text-yellow-400'}`} />
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {activity.duration}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md">
                      {CATEGORIES.find(c => c.id === activity.category)?.label || 'Activity'}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {activity.rating}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {activity.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 h-10">
                    {activity.description}
                  </p>

                  <button 
                    onClick={() => handleStartActivity(activity.id)}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 group/play shadow-lg shadow-slate-200 hover:shadow-emerald-200"
                  >
                    <Play className="w-4 h-4 fill-current group-hover/play:scale-110 transition-transform" />
                    Start Activity
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activities;
