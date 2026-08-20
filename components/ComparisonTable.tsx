'use client';

import React from 'react';
import { Check, X, Sparkles, Zap } from 'lucide-react';

interface ComparisonTableProps {
  price: number;
  onOpenCheckout: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ price, onOpenCheckout }) => {
  return (
    <section id="comparison" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Clear Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Does This Offer Compare?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            See why thousands of developers, researchers, and creators choose our 18-Month Activation link over standard monthly subscriptions.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-3 text-xs text-blue-400 font-semibold bg-blue-500/10 py-1.5 px-3 rounded-full border border-blue-500/20 w-fit mx-auto animate-pulse">
          <span>👉 Swipe horizontally to view full comparison</span>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-blue-900/40 glass-panel shadow-2xl w-full max-w-full">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70">
                <th className="p-5 sm:p-6 text-sm font-bold uppercase text-slate-400">Google AI Pro Specification</th>
                <th className="p-5 sm:p-6 text-base font-extrabold text-blue-400 bg-blue-500/10 border-x border-blue-500/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Our 18M Activation</span>
                  </div>
                  <div className="text-xs font-normal text-slate-300 mt-1">Official Google AI Pro Link</div>
                </th>
                <th className="p-5 sm:p-6 text-sm font-semibold text-slate-300">
                  <div>Google Store (AI Pro)</div>
                  <div className="text-xs text-slate-500">$29.99/mo (~1,700 TND total)</div>
                </th>
                <th className="p-5 sm:p-6 text-sm font-semibold text-slate-300">
                  <div>ChatGPT Plus</div>
                  <div className="text-xs text-slate-500">$20.00/mo (~1,120 TND total)</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              <tr>
                <td className="p-5 font-semibold text-white">18-Month Total Cost</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-extrabold text-emerald-400 text-lg">
                  {price} TND <span className="text-xs text-slate-300 font-normal">(One-time)</span>
                </td>
                <td className="p-5 text-slate-300">~1,700 TND ($540)</td>
                <td className="p-5 text-slate-300">~1,120 TND ($360)</td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-white">Gemini Advanced Rate Limits</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-bold text-emerald-400">
                  4x Higher Limits <span className="text-[11px] text-blue-300 block font-normal">(Pro Tier Priority)</span>
                </td>
                <td className="p-5 text-slate-300">4x Higher Limits</td>
                <td className="p-5 text-slate-400">Standard Limits</td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-white">Autonomous Deep Research</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Full Access</span>
                </td>
                <td className="p-5 text-slate-300"><Check className="w-4 h-4 text-emerald-400 inline mr-1" /> Full Access</td>
                <td className="p-5 text-slate-400">Limited Search</td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-white">5TB Google One Cloud Storage</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 5,000 GB Included</span>
                </td>
                <td className="p-5 text-slate-300">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 5,000 GB Included</span>
                </td>
                <td className="p-5 text-slate-500">
                  <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-red-400" /> No Cloud Storage</span>
                </td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-white">Google Flow Creative Credits</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 1,000 Credits/mo</span>
                </td>
                <td className="p-5 text-slate-300">1,000 Credits/mo</td>
                <td className="p-5 text-slate-500"><X className="w-4 h-4 text-red-400 inline mr-1" /> Not Available</td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-white">Google Vids & Workspace AI</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Docs, Gmail, Vids</span>
                </td>
                <td className="p-5 text-slate-300"><Check className="w-4 h-4 text-emerald-400 inline mr-1" /> Included</td>
                <td className="p-5 text-slate-500"><X className="w-4 h-4 text-red-400 inline mr-1" /> Not Available</td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-white">Enhanced NotebookLM (5x Audio)</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 5x Audio Overviews</span>
                </td>
                <td className="p-5 text-slate-300">5x Audio Overviews</td>
                <td className="p-5 text-slate-500"><X className="w-4 h-4 text-red-400 inline mr-1" /> Not Available</td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-white">Tunisian Local Payment Methods</td>
                <td className="p-5 bg-blue-500/10 border-x border-blue-500/30 font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> D17, Sobflous, RunPay, Flouci, Bank</span>
                </td>
                <td className="p-5 text-slate-500">
                  <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-red-400" /> International Card Only</span>
                </td>
                <td className="p-5 text-slate-500">
                  <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-red-400" /> International Card Only</span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Table Bottom CTA */}
          <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-300">
              <strong className="text-white">Bottom line:</strong> Get the complete official Google AI Pro Plan with 5TB storage for 18 full months at 95% off.
            </div>
            <button
              onClick={onOpenCheckout}
              className="gemini-btn-primary px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Zap className="w-4 h-4 fill-current text-yellow-300" />
              <span>Get 18 Months for {price} TND</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
