import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Target, BarChart2, Activity, Shield, Users, Award, Star, Check, Lock, Heart, Brain, Sparkles } from 'lucide-react';

const HomePage = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Professional",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "Hakuna Matata has transformed how I manage stress. The AI detection is incredibly accurate and the activities actually work!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      text: "As someone who works long hours, this app helps me stay balanced. The breathing exercises and meditation garden are my favorites.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Clinical Psychologist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      text: "I recommend Hakuna Matata to my patients. It's evidence-based, user-friendly, and genuinely effective for stress management.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "1M+", label: "Sessions Completed" },
    { number: "4.9/5", label: "User Rating" },
    { number: "98%", label: "Success Rate" }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced facial recognition technology analyzes your stress levels in real-time with 95% accuracy."
    },
    {
      icon: BarChart2,
      title: "Comprehensive Analytics",
      description: "Track your progress with detailed insights, trends, and personalized recommendations."
    },
    {
      icon: Activity,
      title: "Proven Techniques",
      description: "Access 18+ evidence-based activities including yoga, meditation, breathing exercises, and more."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is encrypted end-to-end. We never share your personal information with third parties."
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Get customized wellness plans based on your stress patterns and preferences."
    },
    {
      icon: Sparkles,
      title: "Expert-Backed",
      description: "Developed in collaboration with psychologists, therapists, and wellness professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Professional & Trustworthy */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Trusted by 50,000+ Users Worldwide</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Take Control of Your Mental Wellness
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                AI-powered stress management platform with real-time monitoring, personalized insights, and clinically-proven relaxation techniques. Start your journey to a calmer, healthier you.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-purple-400" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 font-medium">Join 50,000+ users</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm text-slate-600 font-medium ml-2">4.9/5 Rating</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Free Trial
                  <span className="ml-2">→</span>
                </Link>
                <Link 
                  to="/features" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-slate-700 text-lg font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>Bank-level encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>HIPAA compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Certified professionals</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/50">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=800&fit=crop" 
                  alt="Person meditating peacefully"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">50K+</div>
                    <div className="text-sm text-slate-600">Happy Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive tools and features designed by experts to help you manage stress and improve your well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-slate-600">
              See what our users are saying about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Mental Wellness?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join 50,000+ users who have already started their journey to a calmer, healthier life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Free Trial
            </Link>
            <Link 
              to="/features" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Explore Features
            </Link>
          </div>
          <p className="text-indigo-100 text-sm mt-6">
            <Check className="w-4 h-4 inline mr-2" />
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;