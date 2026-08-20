'use client';

import React from 'react';
import { Star, ShieldCheck, UserCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Yassine M.',
      role: 'Full-Stack Developer (Tunis)',
      text: 'Activated on my main Google account in less than 10 minutes. The 2M token context is crazy for analyzing our Next.js + PostgreSQL codebase all at once.',
      date: '2 days ago',
      rating: 5,
    },
    {
      name: 'Sami K.',
      role: 'Data Science Researcher (Sousse)',
      text: 'I was paying $20 every single month for ChatGPT. Getting 18 full months of Gemini Advanced with 5TB storage for 129 TND is hands down the best deal in Tunisia.',
      date: '1 week ago',
      rating: 5,
    },
    {
      name: 'Amira B.',
      role: 'Content Creator & Freelancer (Sfax)',
      text: 'Direct activation via the link worked seamlessly. The 5TB Google Drive storage alone is worth triple the price. Very responsive support on WhatsApp!',
      date: '3 weeks ago',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-current" />
            Verified Customer Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trusted by 500+ Tunisian AI Professionals & Students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic mb-4 leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1">
                      {r.name}
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-slate-400 text-[11px]">{r.role}</div>
                  </div>
                </div>
                <span className="text-slate-500">{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white text-base">18-Month Activation & Performance Guarantee</h4>
              <p className="text-xs text-slate-300">If you experience any activation difficulty, our support team on WhatsApp replaces or assists you in minutes.</p>
            </div>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/40 whitespace-nowrap">
            100% Guaranteed
          </span>
        </div>

      </div>
    </section>
  );
};
