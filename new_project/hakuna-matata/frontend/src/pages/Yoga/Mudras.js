import React, { useState } from 'react';
import { ChevronLeft, Hand, Heart, Brain, Zap, Wind, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MUDRAS = [
  {
    id: 1,
    name: 'Gyan Mudra',
    sanskrit: 'ज्ञान मुद्रा',
    icon: Brain,
    color: 'from-purple-500 to-indigo-400',
    description: 'The Mudra of Knowledge',
    benefits: ['Enhances concentration', 'Improves memory', 'Stimulates wisdom', 'Calms the mind'],
    howTo: 'Touch the tip of your thumb to the tip of your index finger, keeping the other three fingers straight.',
    duration: '5-15 minutes',
    bestFor: 'Meditation and study'
  },
  {
    id: 2,
    name: 'Prana Mudra',
    sanskrit: 'प्राण मुद्रा',
    icon: Zap,
    color: 'from-green-500 to-emerald-400',
    description: 'The Mudra of Life Force',
    benefits: ['Boosts vitality', 'Improves immunity', 'Reduces fatigue', 'Energizes the body'],
    howTo: 'Touch the tips of your thumb, ring finger, and little finger together, keeping the other two fingers straight.',
    duration: '5-30 minutes',
    bestFor: 'Energy and vitality'
  },
  {
    id: 3,
    name: 'Dhyana Mudra',
    sanskrit: 'ध्यान मुद्रा',
    icon: Sun,
    color: 'from-orange-500 to-amber-400',
    description: 'The Mudra of Meditation',
    benefits: ['Deepens meditation', 'Promotes inner peace', 'Enhances concentration', 'Balances energy'],
    howTo: 'Place both hands on your lap, right hand on top of left, palms facing up, thumbs touching.',
    duration: '10-30 minutes',
    bestFor: 'Deep meditation'
  },
  {
    id: 4,
    name: 'Vayu Mudra',
    sanskrit: 'वायु मुद्रा',
    icon: Wind,
    color: 'from-cyan-500 to-blue-400',
    description: 'The Mudra of Air',
    benefits: ['Relieves anxiety', 'Reduces restlessness', 'Calms nervousness', 'Balances air element'],
    howTo: 'Fold your index finger to touch the base of your thumb, then press gently with the thumb.',
    duration: '10-15 minutes',
    bestFor: 'Anxiety and stress relief'
  },
  {
    id: 5,
    name: 'Anjali Mudra',
    sanskrit: 'अञ्जलि मुद्रा',
    icon: Heart,
    color: 'from-pink-500 to-rose-400',
    description: 'The Mudra of Prayer',
    benefits: ['Centers the mind', 'Promotes gratitude', 'Balances left and right brain', 'Reduces stress'],
    howTo: 'Press your palms together in front of your heart center, fingers pointing upward.',
    duration: '3-10 minutes',
    bestFor: 'Gratitude and centering'
  },
  {
    id: 6,
    name: 'Apana Mudra',
    sanskrit: 'अपान मुद्रा',
    icon: Hand,
    color: 'from-teal-500 to-cyan-400',
    description: 'The Mudra of Digestion',
    benefits: ['Aids digestion', 'Detoxifies body', 'Eliminates waste', 'Promotes patience'],
    howTo: 'Touch the tips of thumb, middle finger, and ring finger together, keeping other fingers straight.',
    duration: '5-45 minutes',
    bestFor: 'Detoxification and digestion'
  },
  {
    id: 7,
    name: 'Surya Mudra',
    sanskrit: 'सूर्य मुद्रा',
    icon: Sun,
    color: 'from-yellow-500 to-orange-400',
    description: 'The Mudra of the Sun',
    benefits: ['Boosts metabolism', 'Improves digestion', 'Reduces weight', 'Increases body heat'],
    howTo: 'Bend your ring finger to touch the base of your thumb, then press gently with the thumb.',
    duration: '5-15 minutes',
    bestFor: 'Metabolism and warmth'
  },
  {
    id: 8,
    name: 'Shunya Mudra',
    sanskrit: 'शून्य मुद्रा',
    icon: Brain,
    color: 'from-indigo-500 to-purple-400',
    description: 'The Mudra of Emptiness',
    benefits: ['Relieves ear problems', 'Improves hearing', 'Reduces vertigo', 'Calms emotions'],
    howTo: 'Bend your middle finger to touch the base of your thumb, then press gently with the thumb.',
    duration: '10-15 minutes',
    bestFor: 'Ear health and balance'
  },
  {
    id: 9,
    name: 'Prithvi Mudra',
    sanskrit: 'पृथ्वी मुद्रा',
    icon: Heart,
    color: 'from-amber-500 to-yellow-400',
    description: 'The Mudra of Earth',
    benefits: ['Grounds energy', 'Strengthens body', 'Improves skin health', 'Boosts confidence'],
    howTo: 'Touch the tips of your thumb and ring finger together, keeping other fingers straight.',
    duration: '5-30 minutes',
    bestFor: 'Grounding and stability'
  },
  {
    id: 10,
    name: 'Varuna Mudra',
    sanskrit: 'वरुण मुद्रा',
    icon: Wind,
    color: 'from-blue-500 to-cyan-400',
    description: 'The Mudra of Water',
    benefits: ['Balances water element', 'Improves skin', 'Prevents dehydration', 'Enhances fluid circulation'],
    howTo: 'Touch the tips of your thumb and little finger together, keeping other fingers straight.',
    duration: '5-15 minutes',
    bestFor: 'Hydration and skin health'
  },
  {
    id: 11,
    name: 'Linga Mudra',
    sanskrit: 'लिङ्ग मुद्रा',
    icon: Zap,
    color: 'from-red-500 to-orange-400',
    description: 'The Mudra of Heat',
    benefits: ['Generates body heat', 'Boosts immunity', 'Helps with cold and cough', 'Increases energy'],
    howTo: 'Interlock your fingers with left thumb pointing up, encircle it with right thumb and index finger.',
    duration: '5-10 minutes',
    bestFor: 'Immunity and warmth'
  },
  {
    id: 12,
    name: 'Hakini Mudra',
    sanskrit: 'हाकिनी मुद्रा',
    icon: Brain,
    color: 'from-violet-500 to-purple-400',
    description: 'The Mudra of Power',
    benefits: ['Enhances memory', 'Improves concentration', 'Balances brain hemispheres', 'Boosts thinking'],
    howTo: 'Touch all five fingertips of both hands together, forming a temple shape.',
    duration: '5-10 minutes',
    bestFor: 'Memory and focus'
  },
  {
    id: 13,
    name: 'Rudra Mudra',
    sanskrit: 'रुद्र मुद्रा',
    icon: Heart,
    color: 'from-rose-500 to-pink-400',
    description: 'The Mudra of Shiva',
    benefits: ['Improves clarity', 'Boosts energy', 'Strengthens heart', 'Enhances vitality'],
    howTo: 'Touch the tips of thumb, index finger, and ring finger together, keeping other fingers straight.',
    duration: '5-10 minutes',
    bestFor: 'Clarity and vitality'
  }
];

const Mudras = () => {
  const navigate = useNavigate();
  const [selectedMudra, setSelectedMudra] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/activities')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-slate-900 font-serif">Yoga Mudras</h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium text-sm mb-4">
            <Hand className="w-4 h-4" />
            13 Essential Mudras
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
            Healing Hand Gestures
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Mudras are sacred hand gestures used in yoga and meditation to channel energy flow. 
            Practice these ancient techniques to enhance your well-being and inner peace.
          </p>
        </div>

        {/* Mudras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MUDRAS.map((mudra) => {
            const Icon = mudra.icon;
            return (
              <div
                key={mudra.id}
                onClick={() => setSelectedMudra(mudra)}
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mudra.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {mudra.sanskrit}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {mudra.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{mudra.description}</p>
                
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {mudra.duration}
                </div>
              </div>
            );
          })}
        </div>

        {/* General Tips */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Practice Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Find a Quiet Space</h4>
                <p className="text-slate-600 text-sm">Practice in a peaceful environment where you won't be disturbed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Sit Comfortably</h4>
                <p className="text-slate-600 text-sm">Maintain a comfortable seated position with spine straight.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Breathe Naturally</h4>
                <p className="text-slate-600 text-sm">Focus on your breath while holding the mudra position.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Be Consistent</h4>
                <p className="text-slate-600 text-sm">Practice regularly for best results, ideally daily.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Selected Mudra */}
      {selectedMudra && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMudra(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">{selectedMudra.name}</h2>
                <p className="text-2xl text-slate-400">{selectedMudra.sanskrit}</p>
              </div>
              <button 
                onClick={() => setSelectedMudra(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${selectedMudra.color} mb-6 flex items-center justify-center`}>
              {React.createElement(selectedMudra.icon, { className: "w-24 h-24 text-white" })}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Hand className="w-5 h-5 text-orange-500" />
                  How to Perform
                </h3>
                <p className="text-slate-600 leading-relaxed">{selectedMudra.howTo}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {selectedMudra.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="font-bold text-slate-900">{selectedMudra.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Best For</p>
                  <p className="font-bold text-slate-900">{selectedMudra.bestFor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mudras;
