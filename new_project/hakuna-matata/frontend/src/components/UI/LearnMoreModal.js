import React from 'react';
import { X } from 'lucide-react';

const LearnMoreModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 p-6 z-10">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">Learn More about Stress Detection</h3>
          <button onClick={onClose} aria-label="close" className="btn-ghost" title="Close">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="mt-4 text-gray-700 space-y-3 text-sm">
          <p>
            The browser-based detector uses a compact TF.js model to analyze facial expressions
            locally. It outputs a probability distribution across stress-related classes and a
            smoothed score over time.
          </p>

          <p>
            Privacy: frames are processed locally. No video data is uploaded unless you opt into
            cloud analysis. For research or production use check the repository docs for training
            and conversion instructions.
          </p>

          <p className="text-xs text-gray-500">Model performance varies by camera, lighting, and subjects.</p>
        </div>

          <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-primary">Got it</button>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
