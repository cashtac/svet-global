import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Philosophy — SVET',
  description: 'We are all connected. One Sun. One Energy. One Planet. For Everyone. SVET means light.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero__bg-grid" />
        <div className="hero__content">
          <span className="hero__badge">OUR PHILOSOPHY</span>
          <h1 className="hero__title" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>WE ARE ALL CONNECTED</h1>
          <p className="hero__tagline">
            SVET means light. Not a brand built on hype — a belief that everything is interconnected.
          </p>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <span className="marquee__item">ONE SUN ☀</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">ONE ENERGY</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">ONE PLANET 🌍</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">FOR EVERYONE</span>
              <span className="marquee__item" style={{ margin: '0 20px', color: 'var(--accent)' }}>●</span>
            </span>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <section className="section" style={{ paddingTop: 80 }}>
        <div className="section__container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 32 }}>
            THE MEANING OF SVET
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 2, marginBottom: 24, fontWeight: 300 }}>
            In many Slavic languages, SVET means <em>light</em> — and also <em>world</em>.
            It's not a coincidence. The same word for light is used to describe the entire world
            because they are the same thing. Light illuminates, connects, and sustains.
          </p>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 2, marginBottom: 24, fontWeight: 300 }}>
            We started SVET because we believe that what connects us is greater than what divides us.
            We share one sun, breathe the same air, walk the same earth.
            Our clothing isn't about standing out — it's about standing together.
          </p>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 2, fontWeight: 300 }}>
            Every piece is a reminder. When you wear SVET, you carry a message:
            we are all one. Not a trend — a truth.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="features">
        <div className="features__container">
          <div className="feature">
            <div className="feature__icon" style={{ fontSize: 32 }}>☀</div>
            <h3 className="feature__title">One Sun</h3>
            <p className="feature__desc">
              The same sun rises for everyone. It doesn't choose who to warm.
              Our designs reflect that universal truth — light is for all.
            </p>
          </div>
          <div className="feature">
            <div className="feature__icon" style={{ fontSize: 32 }}>⚡</div>
            <h3 className="feature__title">One Energy</h3>
            <p className="feature__desc">
              Everything is energy. The thread in your shirt, the breath you take,
              the planet spinning. We are all the same energy, expressing differently.
            </p>
          </div>
          <div className="feature">
            <div className="feature__icon" style={{ fontSize: 32 }}>🌍</div>
            <h3 className="feature__title">One Planet</h3>
            <p className="feature__desc">
              We have one home. No borders when seen from space. SVET is for
              every person, every culture, every corner of this shared world.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="section">
        <div className="section__container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, marginBottom: 16 }}>
            FOR EVERYONE
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 2, fontWeight: 300, marginBottom: 32 }}>
            SVET isn't exclusive. It's not limited edition to be limited.
            It's for everyone who feels the same truth: that we're all connected
            by the same light, energy, and planet. Wear it if you believe it.
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--accent)', letterSpacing: '0.1em' }}>
            ☀ SVET ☀
          </p>
        </div>
      </section>
    </>
  );
}
