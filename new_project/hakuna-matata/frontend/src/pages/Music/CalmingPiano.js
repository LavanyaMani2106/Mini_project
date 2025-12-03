import React from 'react';
import { ChevronLeft, Music, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CalmingPiano = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-transparent absolute top-0 left-0 right-0 z-20 p-6">
        <button 
          onClick={() => navigate('/activities')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Visual Side */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative">
          <img 
            src="https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=1200" 
            alt="Piano" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent md:bg-gradient-to-r" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-4">Calming Piano</h1>
            <p className="text-xl text-white/80 max-w-md leading-relaxed">
              Let the gentle melodies wash away your stress. A curated collection of minimal, soothing piano compositions.
            </p>
          </div>
        </div>

        {/* Player Side */}
        <div className="w-full md:w-1/2 bg-slate-900 p-8 md:p-12 flex flex-col justify-center">
          <div className="bg-slate-800/50 rounded-3xl p-6 border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Peaceful Piano</h3>
                  <p className="text-slate-400 text-sm">Spotify Playlist</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Spotify Embed */}
            <div className="rounded-xl overflow-hidden shadow-lg bg-black">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Player"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm">
                "Music acts like a magic key, to which the most tightly closed heart opens."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalmingPiano;
