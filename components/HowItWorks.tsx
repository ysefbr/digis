'use client';

import React from 'react';
import { ShoppingCart, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
      title: '1. Place Your Order in 30s',
      description: 'Fill in your name, email, and WhatsApp number. No password creation or account registration needed.',
    },
    {
      step: '02',
      icon: <Send className="w-6 h-6 text-purple-400" />,
      title: '2. Confirm on WhatsApp & Pay',
      description: 'Pay smoothly with your preferred local method (D17, Sobflous, RunPay, Flouci, or Bank transfer) and share the screenshot.',
    },
    {
      step: '03',
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      title: '3. Receive Official 18M Link',
      description: 'Click the unique activation link while logged in to your Google Account. Your 18-month subscription & 5TB storage activate instantly!',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Simple & Fast
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How The 18-Month Activation Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Zero complicated setups. You don&apos;t need to share your Google password or create proxy accounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-2xl border border-slate-800 relative flex flex-col justify-between group hover:border-purple-500/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-slate-700 group-hover:text-purple-400 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Step {idx + 1} of 3
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
