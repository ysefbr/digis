'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the 18-month activation link work?',
      a: 'After completing your order, we send you an official Google activation link. You simply open the link while logged in to your Google Account (Gmail) and click "Accept / Activate". The 18-month Google AI Pro subscription (Gemini Advanced with 4x limits, 5TB Google One cloud storage, Deep Research, Google Vids, and 1,000 Google Flow credits) attaches directly to your personal account.',
    },
    {
      q: 'Do I need to give you my Google password or login info?',
      a: 'Never! Your privacy and security are 100% protected. We only provide the official Google activation link. You never share passwords, recovery codes, or sensitive credentials.',
    },
    {
      q: 'What is included in the Google AI Pro plan?',
      a: 'The Google AI Pro plan gives you access to Gemini Advanced with 4x higher usage limits, Deep Research autonomous analysis, 5TB of cloud storage (Drive, Gmail, Photos), Gemini inside Google Docs, Gmail, Sheets, Slides, Google Vids for automated AI video generation, 1,000 monthly Google Flow creative credits, and 5x Audio Overviews in NotebookLM.',
    },
    {
      q: 'Which payment methods are accepted?',
      a: 'We support the most popular Tunisian payment methods for your convenience: D17 (Poste Tunisienne), Sobflous, RunPay, Flouci, and Direct Bank Transfer (RIB). You can arrange payment immediately with our admin on WhatsApp.',
    },
    {
      q: 'How long does delivery take after payment?',
      a: 'Delivery is typically completed in 5 to 30 minutes during working hours (9 AM – 11 PM). Once verified, you will receive the activation link directly on WhatsApp and can also view it anytime via the "Track Order" portal on this website.',
    },
    {
      q: 'What if I already have active Google Drive storage or a subscription?',
      a: 'The activation link works best on personal Google accounts without an active conflicting Google One subscription. If you have an active storage plan, you can either activate it on another Gmail or wait until your current cycle ends.',
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="title-gradient-faq drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">Everything You</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-md">Need to Know</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-medium">
            Have questions before ordering? Here are clear answers to the most common inquiries.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-blue-500/40 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-white text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-pink-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
