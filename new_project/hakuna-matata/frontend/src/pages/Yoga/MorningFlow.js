import React from 'react';
import { ChevronLeft, Play, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MorningFlow = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/activities')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-slate-900 font-serif">Morning Yoga Flow</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Video Player */}
        <div className="aspect-video w-full bg-slate-900 rounded-3xl overflow-hidden shadow-xl mb-8 relative group">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/sTANio_2E0Q?si=example" 
            title="Morning Yoga Flow"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">Energizing Morning Flow</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Start your day with intention and energy. This 20-minute sequence focuses on waking up the spine, 
              opening the hips, and connecting breath with movement. Perfect for all levels.
            </p>
            
            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium text-sm">
                <Clock className="w-4 h-4" />
                20 Minutes
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full font-medium text-sm">
                <Heart className="w-4 h-4" />
                Beginner Friendly
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">Key Poses</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Cat-Cow Stretch
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Downward Facing Dog
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Warrior I & II
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Child's Pose
              </li>
            </ul>
          </div>

          {/* Sidebar / Related */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit">
            <h3 className="font-bold text-slate-900 mb-4">Up Next</h3>
            <div className="space-y-4">
              <div className="flex gap-3 group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="w-20 h-16 bg-slate-200 rounded-lg overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1544367563-12123d8975bd?q=80&w=200" alt="Yoga" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-sm group-hover:text-orange-600">Sun Salutations</h4>
                  <p className="text-xs text-slate-500">10 min • Intermediate</p>
                </div>
              </div>
              <div className="flex gap-3 group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="w-20 h-16 bg-slate-200 rounded-lg overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1599447421405-0e5a10c54e72?q=80&w=200" alt="Yoga" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-sm group-hover:text-orange-600">Hip Openers</h4>
                  <p className="text-xs text-slate-500">15 min • All Levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorningFlow;
