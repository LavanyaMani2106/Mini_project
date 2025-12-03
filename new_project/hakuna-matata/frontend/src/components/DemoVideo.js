import React from 'react';
import { Activity, Brain, Target } from 'lucide-react';

const DemoVideo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See Hakuna Matata in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch how our AI-powered platform helps you monitor stress, practice mindfulness, and achieve mental wellness in just minutes.
            </p>
          </div>

          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 group cursor-pointer">
            {/* Video Placeholder/Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Play Button */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium">Watch Demo Video</p>
                  <p className="text-white/70 text-sm mt-1">2:30 minutes</p>
                </div>
              </div>

              {/* Actual Video Element (uncomment and add your video source) */}
              {/* 
              <video 
                className="w-full h-full object-cover"
                controls
                poster="/path-to-thumbnail.jpg"
              >
                <source src="/path-to-demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              */}
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex flex-wrap items-center gap-3 text-white text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="font-medium">Live Demo</span>
                </div>
                <div className="opacity-75">•</div>
                <div className="opacity-75">Real-time Stress Detection</div>
                <div className="opacity-75 hidden sm:block">•</div>
                <div className="opacity-75 hidden sm:block">AI-Powered Analytics</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Real-Time Monitoring */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Monitoring</h3>
              <p className="text-sm text-gray-600">
                Track your stress levels instantly with AI-powered facial analysis
              </p>
            </div>

            {/* Smart Insights */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Insights</h3>
              <p className="text-sm text-gray-600">
                Get personalized recommendations based on your stress patterns
              </p>
            </div>

            {/* Proven Techniques */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proven Techniques</h3>
              <p className="text-sm text-gray-600">
                Access guided meditation, breathing exercises, and relaxation tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
