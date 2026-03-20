import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community — SVET',
  description: 'Join the SVET community. Earn Connection Tokens, share your story, and connect with people who believe we are all one.',
};

export default function CommunityPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero__bg-grid" />
        <div className="hero__content">
          <span className="hero__badge">☀ CONNECTION TOKENS</span>
          <h1 className="hero__title" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>JOIN THE LIGHT</h1>
          <p className="hero__tagline">
            SVET is more than clothing. It&apos;s a community of people who believe we are all connected.
            Earn ☀ Connection Tokens and be part of something bigger.
          </p>
          <a
            href="https://discord.gg/YOUR_INVITE"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__cta"
            style={{ background: '#5865F2' }}
          >
            Join Discord
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
        </div>
      </section>

      {/* What are Connection Tokens */}
      <section className="section">
        <div className="section__container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 20 }}>
            WHAT ARE ☀ CONNECTION TOKENS?
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 2, fontWeight: 300, marginBottom: 32 }}>
            Connection Tokens are how we recognize the people who light up this community.
            They&apos;re not currency — they&apos;re proof that you showed up, shared something real,
            and believed in connection over isolation.
          </p>
        </div>
      </section>

      {/* How to Earn */}
      <section className="features">
        <div className="features__container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="feature">
            <div className="feature__icon" style={{ fontSize: 28 }}>🛒</div>
            <h3 className="feature__title">Buy</h3>
            <p className="feature__desc">
              Earn 1 ☀ for every $1 you spend. Every purchase fuels the mission.
            </p>
          </div>
          <div className="feature">
            <div className="feature__icon" style={{ fontSize: 28 }}>📸</div>
            <h3 className="feature__title">Share</h3>
            <p className="feature__desc">
              Post yourself wearing SVET and tag us. Share the light, earn the tokens.
            </p>
          </div>
          <div className="feature">
            <div className="feature__icon" style={{ fontSize: 28 }}>👋</div>
            <h3 className="feature__title">Refer</h3>
            <p className="feature__desc">
              Bring someone into the community. You both earn ☀ for connecting.
            </p>
          </div>
          <div className="feature">
            <div className="feature__icon" style={{ fontSize: 28 }}>💬</div>
            <h3 className="feature__title">Engage</h3>
            <p className="feature__desc">
              Be active on Discord. Help others. Start conversations. That&apos;s what connection is.
            </p>
          </div>
        </div>
      </section>

      {/* What Can You Redeem */}
      <section className="section">
        <div className="section__container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, marginBottom: 20 }}>
            WHAT ☀ UNLOCKS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 40 }}>
            <div className="community-perk">
              <div className="community-perk__icon">🎁</div>
              <h3 className="community-perk__title">Exclusive Drops</h3>
              <p className="community-perk__desc">First access to limited pieces before anyone else.</p>
            </div>
            <div className="community-perk">
              <div className="community-perk__icon">💰</div>
              <h3 className="community-perk__title">Discounts</h3>
              <p className="community-perk__desc">Redeem ☀ for real discounts on any order.</p>
            </div>
            <div className="community-perk">
              <div className="community-perk__icon">🏆</div>
              <h3 className="community-perk__title">Leaderboard</h3>
              <p className="community-perk__desc">Top connectors get featured and recognized.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="philosophy">
        <div className="philosophy__container">
          <div>
            <h2 className="philosophy__title">OUR VALUES</h2>
            <p className="philosophy__desc">
              <strong>Connection over competition.</strong> We don&apos;t rank people — we celebrate them.
              Every member of this community is equal under the same sun.
            </p>
            <p className="philosophy__desc">
              <strong>Purpose over profit.</strong> We exist to remind people that we&apos;re connected.
              Everything else — the clothing, the tokens, the community — serves that purpose.
            </p>
            <p className="philosophy__desc">
              <strong>Action over talk.</strong> Wear it. Share it. Live it.
              SVET isn&apos;t something you believe in from a distance — it&apos;s something you do.
            </p>
          </div>
          <div className="philosophy__visual">🤝</div>
        </div>
      </section>

      {/* CTA */}
      <section className="ecosystem-banner">
        <div className="ecosystem-banner__container">
          <div className="ecosystem-banner__label">THE COMMUNITY IS GROWING</div>
          <h2 className="ecosystem-banner__title">READY TO CONNECT?</h2>
          <p className="ecosystem-banner__desc">
            Join our Discord, start earning ☀, and become part of a community
            that believes what connects us is greater than what divides us.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://discord.gg/YOUR_INVITE"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta"
              style={{ background: '#5865F2', marginTop: 0 }}
            >
              Join Discord
            </a>
            <Link href="/shop" className="hero__cta" style={{ marginTop: 0 }}>
              Shop SVET
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
