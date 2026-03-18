import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand */}
        <div className="footer__brand">SVET</div>
        <p className="footer__tagline">One Sun · One Energy · One Planet · For Everyone</p>

        {/* Store links */}
        <div className="footer__links">
          <Link href="/shop" className="footer__link">Shop</Link>
          <Link href="/about" className="footer__link">Philosophy</Link>
          <Link href="/cart" className="footer__link">Cart</Link>
        </div>

        {/* Ecosystem section */}
        <div className="footer__ecosystem">
          <div className="footer__ecosystem-label">SVETRIX ECOSYSTEM</div>
          <div className="footer__ecosystem-links">
            <a href="https://svetrix.com" target="_blank" rel="noopener noreferrer" className="footer__ecosystem-link">
              <span className="footer__ecosystem-icon">⚡</span>
              <span>Svetrix OS</span>
            </a>
            <a href="https://svetrix.com/maestro" target="_blank" rel="noopener noreferrer" className="footer__ecosystem-link">
              <span className="footer__ecosystem-icon">🧠</span>
              <span>Svetrix AI</span>
            </a>
            <span className="footer__ecosystem-link footer__ecosystem-link--active">
              <span className="footer__ecosystem-icon">☀</span>
              <span>SVET</span>
            </span>
          </div>
        </div>

        {/* Account */}
        <div className="footer__account">
          <a href="https://svetrix.com" target="_blank" rel="noopener noreferrer" className="footer__signin">
            Sign in with Svetrix
          </a>
          <span className="footer__account-desc">One account. Every Svetrix product.</span>
        </div>

        <p className="footer__copy">© {year} Svetrix LLC · Made by Daniil Osipov</p>
      </div>
    </footer>
  );
}
