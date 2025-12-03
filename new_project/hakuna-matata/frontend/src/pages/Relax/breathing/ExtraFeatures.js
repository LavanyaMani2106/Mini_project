import React from 'react';
import { useStress } from '../../../contexts/StressContext';

// Small extra features panel for the Breathing page.
export default function ExtraFeatures({ onRepeat }) {
  const { sessionHistory } = useStress();

  const lastBreathing = (sessionHistory || []).find(s => Array.isArray(s.emotions) && s.emotions.includes('Calm'));

  const exportBreathing = () => {
    try {
      const breathing = (sessionHistory || []).filter(s => Array.isArray(s.emotions) && s.emotions.includes('Calm'));
      const blob = new Blob([JSON.stringify(breathing, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'breathing_sessions.json'; a.click(); URL.revokeObjectURL(url);
    } catch (e) { console.error('Export failed', e); alert('Export failed: ' + String(e)); }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <h4 className="font-semibold mb-2">Breathing Extras</h4>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Repeat last</div>
            <div className="font-medium">{lastBreathing ? lastBreathing.duration || '—' : 'No recent session'}</div>
          </div>
          <div>
            <button
              onClick={() => { if (onRepeat && lastBreathing) onRepeat(lastBreathing); }}
              className="px-3 py-1 rounded bg-primary text-white text-sm"
              disabled={!lastBreathing}
            >
              Repeat
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Export</div>
            <div className="font-medium">Download breathing sessions</div>
          </div>
          <div>
            <button onClick={exportBreathing} className="px-3 py-1 rounded border text-sm">Export</button>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Tips</div>
          <ul className="list-disc ml-4 text-sm text-gray-600">
            <li>Find a quiet place and sit upright.</li>
            <li>Breathe slowly through the nose and relax your shoulders.</li>
            <li>Try daily short sessions for cumulative benefits.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
