import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Link } from 'react-router-dom';
import LearnMoreModal from '../../components/UI/LearnMoreModal';
import { useState } from 'react';
import { Target, BarChart2, User, Camera, Info, Leaf, Beaker, Lock, Rocket, Star } from 'lucide-react';

const Features = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-green-50">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 w-72 h-72 bg-gradient-to-tr from-pink-200 to-pink-50 rounded-full opacity-40 blur-3xl transform rotate-12"></div>
      <div className="pointer-events-none absolute -right-24 bottom-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-green-50 rounded-full opacity-30 blur-2xl"></div>

      <Header />

      <main className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">
            Features <Star className="inline-block h-6 w-6 text-primary ml-2" />
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Hakuna Matata helps you detect, track and reduce stress using a friendly, privacy-first
            approach — AI-powered insights with human-centered relaxation tools. <Leaf className="inline-block h-5 w-5 text-green-600 ml-1" />
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link to="/stress-detection" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full shadow-md hover:shadow-lg transition">
              <Camera className="h-5 w-5" />
              <span>Try Stress Detection</span>
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-3 rounded-full bg-white/60 hover:bg-white transition">
              <User className="h-5 w-5" />
              <span>Create Account</span>
            </Link>
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 text-primary px-4 py-3 rounded-full bg-white/50 hover:bg-white transition">
              <Info className="h-5 w-5" />
              <span>Learn More</span>
            </button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-10">
          <Card icon={<Target className="h-6 w-6 text-white" />} title="Detect Stress">
            Live analysis using a lightweight browser model (TF.js) or server model to infer stress
            levels from facial cues.
          </Card>

          <Card icon={<BarChart2 className="h-6 w-6 text-white" />} title="Track Progress">
            Comprehensive analytics and gentle nudges to help you reduce stress patterns over time.
          </Card>

          <Card icon={<User className="h-6 w-6 text-white" />} title="Relax & Recover">
            Guided breathing, ambient soundscapes, and short practices to bring your stress down fast.
          </Card>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-3">How the Stress Detector Works</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Camera captures short video or still frames in the browser.</li>
            <li>Frames are preprocessed and evaluated by a TensorFlow.js model.</li>
            <li>The model outputs a probability distribution across stress classes.</li>
            <li>We smooth predictions over time and surface the current stress score and advice.</li>
          </ol>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Learn More</h2>
          <p className="text-gray-700 mb-3">
            Want details about the model, data, or privacy? Here are quick links and notes.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Model:</strong> We train a lightweight CNN and optionally a MobileNet-based
              transfer model on public FER-style datasets, then convert to TF.js for in-browser
              inference. <Beaker className="inline-block h-4 w-4 ml-1 text-gray-600" />
            </li>
            <li>
              <strong>Data:</strong> Models are trained on public facial expression datasets (FER
              variants). This is research-grade and may not generalize to every user; use with care.
            </li>
            <li>
              <strong>Privacy:</strong> Video frames are processed locally in the browser when using
              the TF.js model — we never upload camera frames unless you explicitly opt into a
              cloud analysis feature. <Lock className="inline-block h-4 w-4 ml-1 text-gray-600" />
            </li>
          </ul>

          <div className="mt-4">
            <Link to="/stress-detection" className="inline-block bg-primary text-white px-4 py-2 rounded-lg shadow">
              <Rocket className="h-4 w-4 inline-block mr-2" /> Open Stress Detection
            </Link>
          </div>
        </section>

        {/* Modal instance - reusable and can be opened from other pages if needed */}
        <LearnMoreModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <section className="mb-16 text-sm text-gray-700">
          <h3 className="font-semibold mb-2">Developer / Research Notes</h3>
          <p>
            If you're experimenting with the models, see the project docs in the repo for
            training scripts, conversion notes, and tips to run the TF.js converter in an
            isolated environment. The app includes a demo TF.js model in <code>/public/tfjs_model</code>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Card = ({ icon, title, children }) => (
  <div className="p-6 bg-white/90 rounded-2xl shadow-md hover:shadow-lg transition">
    <div className="flex items-center gap-4 mb-3">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-gradient-to-br from-primary/80 to-secondary/60 text-white">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <p className="text-gray-700 text-sm">{children}</p>
  </div>
);

export default Features;
