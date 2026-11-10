'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Icon } from './visuals';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-card">
        <div className="footer-main-grid">
          {/* Left Column: Headline, Newsletter, Apps */}
          <div className="footer-col-left">
            <h2 className="footer-headline">
              All crunch. No spam.<br />
              Get the newsletter here.
            </h2>

            {subscribed ? (
              <div className="footer-subscribed-badge" role="status">
                <span><Icon name="check" /> You’re on the VIP snack list!</span>
              </div>
            ) : (
              <form className="footer-newsletter-pill" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="footer-submit-btn" aria-label="Subscribe to newsletter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}

            <p className="footer-tagline">
              Snack on, guilt off. 100% roasted makhana made for big flavour cravings.
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="footer-vertical-line" aria-hidden="true" />

          {/* Right Column: Multi-column Nav & Bottom Bar */}
          <div className="footer-col-right">
            <div className="footer-links-grid">
              {/* Order/Shop */}
              <div className="footer-link-group">
                <h3 className="footer-nav-title">ORDER</h3>
                <ul className="footer-nav-list">
                  <li><Link href="/catalog">Catalog (All Flavours)</Link></li>
                  <li><Link href="/corporate">Corporate &amp; Bulk Orders</Link></li>
                  <li><Link href="/#build">Build a Pack</Link></li>
                  <li><Link href="/#flavour-masala">Desi AF Masala</Link></li>
                  <li><Link href="/#flavour-cheese">Sigma Chad Cheese</Link></li>
                  <li><Link href="/#flavour-peri">Goated Peri Peri</Link></li>
                  <li><Link href="/#flavour-onion">Cream N’ Onion</Link></li>
                </ul>
              </div>

              {/* Read/About */}
              <div className="footer-link-group">
                <h3 className="footer-nav-title">READ</h3>
                <ul className="footer-nav-list">
                  <li><Link href="/faq">FAQ &amp; Help Center</Link></li>
                  <li><Link href="/#story">Our Story</Link></li>
                  <li><Link href="/corporate">Corporate Gifting Guide</Link></li>
                  <li><Link href="/#main">Why Makhana?</Link></li>
                  <li><Link href="/#main">Zero Palm Oil</Link></li>
                  <li><Link href="/#cravings">Shop by Craving</Link></li>
                  <li><Link href="/#story">Media Room</Link></li>
                </ul>
              </div>

              {/* Follow */}
              <div className="footer-link-group">
                <h3 className="footer-nav-title">FOLLOW</h3>
                <ul className="footer-nav-list">
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                  <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
                  <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noreferrer">X (Twitter)</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Row inside Right Col */}
            <div className="footer-right-footer-row">
              <div className="footer-certified" aria-label="Certified Saatvik Quality">
                <span className="certified-top">Certified</span>
                <span className="certified-circle">
                  <span className="certified-letter">B</span>
                </span>
                <span className="certified-bottom">Corporation</span>
              </div>

              <div className="footer-legal-nav">
                <Link href="/catalog">Catalog</Link>
                <Link href="/corporate">Corporate Orders</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/#privacy">Privacy</Link>
                <Link href="/checkout">Contact</Link>
              </div>

              <div className="footer-copy-text">
                © 2026 Saatvik International
              </div>
            </div>
          </div>
        </div>

        {/* Big Giant Brand Banner */}
        <div className="footer-brand-stage" aria-hidden="true">
          <svg
            className="footer-brand-svg"
            viewBox="0 0 1200 135"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="110"
              textAnchor="middle"
              className="footer-brand-text"
              textLength="1160"
              lengthAdjust="spacingAndGlyphs"
            >
              SNACK MUNCH
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
