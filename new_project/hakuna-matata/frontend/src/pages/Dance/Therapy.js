import React from 'react';
import { ChevronLeft, Play, Music, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DanceTherapy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pink-50">
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
          <h1 className="text-xl font-bold text-slate-900 font-serif">Dance Therapy</h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Video Player */}
        <div className="aspect-video w-full bg-slate-900 rounded-3xl overflow-hidden shadow-xl mb-8 relative group">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/gC_L9qAHVJ8" 
            title="Dance Therapy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">Mood Boosting Dance Cardio</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Release stress and boost your endorphins with this fun, high-energy dance workout. 
              No dance experience required—just move to the beat and let go!
            </p>
            
            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-medium text-sm">
                <Music className="w-4 h-4" />
                Pop & Latin
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium text-sm">
                <Zap className="w-4 h-4" />
                High Energy
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">Benefits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-1">Stress Relief</h4>
                <p className="text-sm text-slate-500">Lowers cortisol levels through rhythmic movement.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-pink-100">
                <h4 className="font-bold text-pink-600 mb-1">Mood Boost</h4>
                <p className="text-sm text-slate-500">Increases dopamine and serotonin production.</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Playlist */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit">
            <h3 className="font-bold text-slate-900 mb-4">More Sessions</h3>
            <div className="space-y-4">
              <div className="flex gap-3 group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="w-20 h-16 bg-slate-200 rounded-lg overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=200" alt="Dance" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-sm group-hover:text-pink-600">Salsa Basics</h4>
                  <p className="text-xs text-slate-500">15 min • Fun</p>
                </div>
              </div>
              <div className="flex gap-3 group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="w-20 h-16 bg-slate-200 rounded-lg overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=200" alt="Dance" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-sm group-hover:text-pink-600">Hip Hop Flow</h4>
                  <p className="text-xs text-slate-500">20 min • Cardio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DanceTherapy;
