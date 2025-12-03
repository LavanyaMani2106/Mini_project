import React from 'react';
import { ChevronLeft, Moon, Star, Coffee, Wind, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EveningRelaxation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-950 text-white">
      {/* Header */}
      <div className="bg-indigo-900/50 shadow-sm sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/activities')}
            className="flex items-center gap-2 text-indigo-200 hover:text-white font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-white font-serif">Evening Wind Down</h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Video Player */}
        <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/50 mb-8 relative group">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/1ZYbU82GVz4?si=example" 
            title="Evening Relaxation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4 font-serif">Prepare for Deep Sleep</h2>
            <p className="text-indigo-200 leading-relaxed mb-6">
              A gentle routine to release the tension of the day. Combine slow stretches with calming breathwork 
              to signal your body that it's time to rest.
            </p>
            
            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-indigo-300 rounded-full font-medium text-sm border border-indigo-700">
                <Moon className="w-4 h-4" />
                Night Routine
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-900 text-purple-300 rounded-full font-medium text-sm border border-purple-700">
                <Star className="w-4 h-4" />
                Better Sleep
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">Tips for Better Sleep</h3>
            <ul className="space-y-3 text-indigo-200">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <p>Dim the lights 1 hour before bed to boost melatonin.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <p>Avoid screens or use a blue light filter.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <p>Keep your room cool (around 65°F / 18°C).</p>
              </li>
            </ul>
          </div>

          {/* Sidebar / Related */}
          <div className="bg-indigo-900/30 p-6 rounded-3xl border border-indigo-800 h-fit">
            <h3 className="font-bold text-white mb-4">Relaxation Tools</h3>
            <div className="space-y-4">
              <button onClick={() => navigate('/breathing')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                <div className="w-10 h-10 rounded-lg bg-indigo-800 flex items-center justify-center text-indigo-300 group-hover:text-white transition-colors">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">4-7-8 Breathing</h4>
                  <p className="text-xs text-indigo-400">5 min • Anxiety Relief</p>
                </div>
              </button>
              <button onClick={() => navigate('/music/calming-piano')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                <div className="w-10 h-10 rounded-lg bg-indigo-800 flex items-center justify-center text-indigo-300 group-hover:text-white transition-colors">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Sleep Music</h4>
                  <p className="text-xs text-indigo-400">Playlist • Deep Rest</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EveningRelaxation;
