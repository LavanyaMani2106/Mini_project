import React, { useState, useRef, useEffect } from 'react';
import { useStress } from '../contexts/StressContext';
import Breathing from '../pages/Relax/Breathing';
import LungsIcon from './Icons';

export default function QuickBreathingCard() {
  const { addSession } = useStress();
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(60);
  const [timeLeft, setTimeLeft] = useState(secs);
  const timerRef = useRef(null);

  useEffect(() => { setTimeLeft(secs); }, [secs]);
  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const start = (durationSecs = secs) => {
    setSecs(durationSecs);
    setTimeLeft(durationSecs);
    setRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(true); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const stop = () => {
    setRunning(false);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const finish = (completed = false) => {
    setRunning(false);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (completed) {
      const minutes = Math.max(1, Math.round(secs / 60));
      const session = {
        id: Date.now(),
        stressLevel: 20,
        timestamp: new Date().toLocaleString(),
        emotions: ['Calm'],
        duration: `${minutes} minutes`
      };
      try { addSession(session); } catch (e) { console.warn('QuickBreathingCard save failed', e); }
    }
  };

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const [openModal, setOpenModal] = useState(false);
  const [modalDuration, setModalDuration] = useState(null);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const openBreathingModal = (durSecs) => {
    setModalDuration(Math.max(1, Math.round(durSecs / 60)));
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalDuration(null);
  };

  // Accessibility: focus trap + restore focus and escape to close
  useEffect(() => {
    if (!openModal) return;
    previousActiveElement.current = document.activeElement;
    // prevent background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const modalNode = modalRef.current;
    // focus modal container
    const focusablesSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
    const focusableElements = modalNode ? Array.from(modalNode.querySelectorAll(focusablesSelector)).filter(el => el.offsetParent !== null) : [];
    const firstFocusable = focusableElements[0] || modalNode;
    firstFocusable && firstFocusable.focus && firstFocusable.focus();

    function handleKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        if (!focusableElements.length) {
          e.preventDefault();
          return;
        }
        const idx = focusableElements.indexOf(document.activeElement);
        if (e.shiftKey) {
          // backwards
          if (idx === 0 || document.activeElement === modalNode) {
            e.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
          }
        } else {
          if (idx === focusableElements.length - 1) {
            e.preventDefault();
            focusableElements[0].focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
      // restore focus
      try { previousActiveElement.current && previousActiveElement.current.focus && previousActiveElement.current.focus(); } catch (e) {}
    };
  }, [openModal]);

  return (
    <div className="card text-center transition-colors active:scale-95">
      <div className="text-xl sm:text-2xl mb-2"><LungsIcon size={36} className="text-primary" aria-hidden /></div>
      <div className="font-medium text-primary text-xs sm:text-sm mb-2">Breathing</div>
      {!running ? (
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <button onClick={() => openBreathingModal(60)} className="px-2 py-1 btn-ghost text-sm">1m</button>
            <button onClick={() => openBreathingModal(180)} className="px-2 py-1 btn-ghost text-sm">3m</button>
            <button onClick={() => openBreathingModal(300)} className="px-2 py-1 btn-ghost text-sm">5m</button>
          </div>
          <button onClick={() => openBreathingModal(secs)} className="mt-2 btn-primary text-sm">Start</button>
        </div>
      ) : (
        <div>
          <div className="text-sm text-gray-700 mb-2">{fmt(timeLeft)}</div>
          <div className="flex items-center justify-center space-x-2">
            <button onClick={stop} className="px-3 py-1 btn-ghost rounded text-sm">Pause</button>
            <button onClick={() => finish(true)} className="px-3 py-1 btn-primary text-sm">Finish</button>
          </div>
        </div>
      )}

      {/* Modal overlay for full breathing experience */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} role="dialog" aria-modal="true" aria-label="Breathing exercise modal" tabIndex={-1} className="bg-white rounded-lg max-w-3xl w-full mx-4 p-4 relative">
            <button onClick={closeModal} aria-label="Close breathing modal" className="absolute top-3 right-3 btn-ghost">✕</button>
            <Breathing autoStart={true} initialDuration={modalDuration} />
          </div>
        </div>
      )}
    </div>
  );
}
