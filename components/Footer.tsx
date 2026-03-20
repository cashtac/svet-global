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

        {/* Account */}
        <div className="footer__account">
          <Link href="/login" className="footer__signin">
            Sign in
          </Link>
          <span className="footer__account-desc">One account. All of SVET.</span>
        </div>

        <p className="footer__copy">© {year} SVET. All rights reserved.</p>
      </div>
    </footer>
  );
}
