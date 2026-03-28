'use client';

import { useEffect, useState } from 'react';

/* ════════════════════════════════════════════════
   SVET Loading Screen — Cinematic Brand Intro
   Shows on first page load, then fades away.
   ════════════════════════════════════════════════ */

export function LoadingScreen() {
  const [phase, setPhase] = useState<'active' | 'fading' | 'done'>('active');

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('svet-loaded')) {
      setPhase('done');
      return;
    }

    // Phase timing
    const fadeTimer = setTimeout(() => setPhase('fading'), 2400);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('svet-loaded', '1');
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`loading-screen ${phase === 'fading' ? 'loading-screen--fading' : ''}`}>
      {/* Particle field */}
      <div className="loading-screen__particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="loading-screen__particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* Central ring */}
      <div className="loading-screen__ring" />
      <div className="loading-screen__ring loading-screen__ring--2" />

      {/* Logo */}
      <div className="loading-screen__content">
        <div className="loading-screen__sun">☀</div>
        <h1 className="loading-screen__logo">SVET</h1>
        <div className="loading-screen__line" />
        <p className="loading-screen__tagline">One Sun. One Energy. One Planet.</p>
      </div>
    </div>
  );
}
