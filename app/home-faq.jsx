'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from './visuals';

const minimalFaqItems = [
  {
    id: 'faq-roasted',
    question: 'Are Snack Munch makhanas truly 100% roasted with zero palm oil?',
    answer: 'Yes, 100%! We slow air-roast jumbo Grade-A Bihar fox nuts in small artisanal batches. We never deep-fry our makhana, and we strictly use zero palm oil, zero trans fats, and zero cholesterol.',
  },
  {
    id: 'faq-freshness',
    question: 'How long do the jars stay fresh and crunchy?',
    answer: 'Every jar is nitrogen-flushed and hermetically induction-sealed to completely lock out humidity. As long as the seal is unbroken, the makhana stays perfectly crisp and fresh for 9 months from the date of manufacture.',
  },
  {
    id: 'faq-pack-mix',
    question: 'Can I build a customized mix of flavours in one order?',
    answer: 'Absolutely. You can use our "Build a Pack" builder on the homepage to mix and match any three flavours of your choice, or visit our Catalog to order individual jars in any quantity.',
  },
  {
    id: 'faq-shipping',
    question: 'What are the delivery timelines and shipping fees across India?',
    answer: 'Orders are dispatched within 24 hours from our facility. Metro deliveries take 2–3 business days; rest of India takes 3–5 business days with live SMS tracking. We offer free shipping on all orders above ₹499.',
  },
  {
    id: 'faq-bulk',
    question: 'Do you offer corporate gifting hampers and office pantry bulk packs?',
    answer: 'Yes! We support employee gifting, festive hampers, and office pantries with 15%–35% tiered bulk savings, bespoke co-branded sleeves, and pan-India doorstep drops. Check our Corporate Gifting page for instant quotes.',
  },
];

export function HomeFaq() {
  const [openId, setOpenId] = useState('faq-roasted');

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="home-faq-minimal shell" id="faq" aria-labelledby="home-faq-title">
      <div className="home-faq-container">
        {/* Minimal Header */}
        <header className="home-faq-header">
          <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2 id="home-faq-title">
            Got Questions?<br />Crunch Answers.
          </h2>
          <p className="home-faq-subtitle">
            Quick facts about our roasting process, zero palm oil guarantee, delivery speeds, and custom packs.
          </p>
        </header>

        {/* Minimal Accordion List */}
        <div className="minimal-faq-accordion" role="region" aria-label="Quick questions and answers">
          {minimalFaqItems.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <article
                key={item.id}
                className={`minimal-faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="minimal-faq-trigger"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="minimal-faq-num">0{idx + 1}</span>
                  <span className="minimal-faq-q-text">{item.question}</span>
                  <span className="minimal-faq-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="minimal-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Minimal Bottom Help Desk Bar */}
        <div className="home-faq-bottom-bar">
          <div className="bottom-bar-copy">
            <strong>Looking for returns, ingredient lab tests, or bulk inquiries?</strong>
            <span>Our complete knowledge base has answers to 20+ common questions.</span>
          </div>

          <div className="bottom-bar-actions">
            <Link href="/faq" className="button yellow minimal-faq-btn">
              Full FAQ Knowledge Base <Icon name="arrow" />
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi%20Saatvik%20International,%20I%20have%20a%20question%20about%20your%20snacks!"
              target="_blank"
              rel="noreferrer"
              className="text-link whatsapp-faq-link"
            >
              <Icon name="chat" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

