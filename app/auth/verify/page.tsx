'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

/* ════════════════════════════════════════════════
   /auth/verify — Magic Link Landing
   ════════════════════════════════════════════════ */

function VerifyContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMsg, setErrorMsg] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg('No token provided');
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (data.ok) {
          setStatus('success');

          // Save profile to localStorage
          localStorage.setItem('svet_profile', JSON.stringify({
            id: data.user.id,
            contact: data.user.contact,
            name: data.user.contact.split('@')[0] || 'SVET User',
            level: 1,
            symbols: [0], // Precision earned
            tokens: 0,
            createdAt: Date.now(),
          }));

          // Trigger registration animation for new users
          if (data.user.isNewUser) {
            setShowAnimation(true);
            setTimeout(() => {
              router.push('/profile?welcome=true');
            }, 7000); // After animation completes
          } else {
            setTimeout(() => {
              router.push(data.redirect || '/profile');
            }, 1500);
          }
        } else {
          setStatus('error');
          setErrorMsg(data.error || 'Verification failed');
        }
      } catch {
        setStatus('error');
        setErrorMsg('Network error. Please try again.');
      }
    }

    verify();
  }, [token, router]);

  // Registration animation
  if (showAnimation) {
    return (
      <>
        <div className="reg-animation-overlay">
          <div className="reg-light-point" />
        </div>
        <div className="reg-welcome-text">
          <h2>Welcome to SVET</h2>
          <p>Your chain begins now. 🪲</p>
          <p style={{ marginTop: 8, fontSize: 12, opacity: 0.5 }}>🪲 PRECISION symbol earned!</p>
        </div>
      </>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        {status === 'verifying' && (
          <div className="magic-verify">
            <div className="magic-verify__spinner" />
            <h2 className="magic-verify__title">Verifying your link...</h2>
            <p className="magic-verify__desc">One moment while we confirm your identity.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="magic-verify">
            <div className="magic-verify__check">✓</div>
            <h2 className="magic-verify__title">You&apos;re in!</h2>
            <p className="magic-verify__desc">Redirecting to your profile...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="magic-verify">
            <div className="magic-verify__error">✕</div>
            <h2 className="magic-verify__title">Link Invalid</h2>
            <p className="magic-verify__desc">{errorMsg}</p>
            <a href="/register" className="magic-verify__retry">
              Request a new link →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <section className="auth-page">
        <div className="auth-page__container">
          <div className="magic-verify">
            <div className="magic-verify__spinner" />
            <p style={{ color: '#555' }}>Loading...</p>
          </div>
        </div>
      </section>
    }>
      <VerifyContent />
    </Suspense>
  );
}
