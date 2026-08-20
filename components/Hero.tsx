'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Clock,
  HardDrive,
  Cpu,
  Flame,
  ArrowRight,
  Gift
} from 'lucide-react';

interface HeroProps {
  onOpenCheckout: () => void;
  price: number;
  originalPrice: number;
  stockRemaining: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCheckout,
  price,
  originalPrice,
  stockRemaining,
}) => {
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

            {/* Scarcity / Trust Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {/*<span>Official Google One: Google AI Pro (18 Months Plan)</span>*/}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Get <span className="gemini-gradient-text">Google AI Pro</span> For 18 Months on Your Own Account
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Activate the official <strong className="text-white">Google AI Pro</strong> plan directly on your personal Google email with a single official link. Includes <strong className="text-white">Gemini Advanced (4x higher limits)</strong>, <strong className="text-white">Deep Research & Agentic AI</strong>, <strong className="text-white">5TB Google One Cloud Storage</strong>, <strong className="text-white">Google Vids & Workspace AI</strong>, and <strong className="text-white">Creative Studio Flow credits</strong>.
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-sm text-slate-200">
              <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Gemini Advanced (4x Higher Limits)</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <HardDrive className="w-5 h-5 text-blue-400 shrink-0" />
                <span>5TB Google One Storage + Backup</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <Cpu className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Deep Research & 2M Context</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-pink-400 shrink-0" />
                <span>Google Vids & Workspace Integration</span>
              </div>
            </div>

            {/* Price Box & CTA Area */}
            <div className="w-full max-w-xl p-5 rounded-2xl glass-panel border border-purple-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">One-Time Activation Fee</div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">{price} <span className="text-lg text-blue-400 font-bold">TND</span></span>
                    <span className="text-base text-slate-500 line-through font-medium">{originalPrice} TND</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Save {discountPercent}%
                    </span>
                  </div>
                  <div className="text-[12px] text-slate-400 mt-1">
                    Only <span className="text-yellow-400 font-semibold">{(price / 18).toFixed(1)} TND / month</span> (billed once for 1.5 years)
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-xl text-xs font-semibold">
                  <Flame className="w-4 h-4 fill-current animate-pulse text-red-400" />
                  <span>Only {stockRemaining} Left in Stock</span>
                </div>
              </div>

              {/* Instant CTA Button */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenCheckout}
                  className="gemini-btn-primary flex-1 py-4 px-6 rounded-xl font-extrabold text-base text-white shadow-xl flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Zap className="w-5 h-5 fill-current text-yellow-300 group-hover:rotate-12 transition-transform" />
                  <span>Get Google AI Pro 18-Month Link</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Reassurance footer */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Fast WhatsApp Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-pink-400 shrink-0" /> Personal Account Link
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Zero Risk • 18M Warranty
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Holographic Animated GIF Showcase */}
          <div className="lg:col-span-5 relative w-full max-w-full">

            {/* Futuristic glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl transform -rotate-1 scale-95 opacity-70"></div>

            {/* Glass Container */}
            <div className="relative glass-panel rounded-3xl p-3 sm:p-4 border border-blue-500/40 shadow-2xl overflow-hidden">

              {/* Header HUD Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 rounded-xl mb-3 border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">gemini-advanced-18m.live</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  Active Link
                </span>
              </div>

              {/* The GIF Preview */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-purple-500/30 group">
                <Image
                  src="/gemini-preview.gif"
                  alt="Google Gemini Pro 18-Month Activation Showcase"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  priority
                  unoptimized
                />

                {/* Floating HUD Chip Overlays */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-500/40 text-xs font-semibold text-white flex items-center gap-2 shadow-lg">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>Gemini 1.5 Pro & 2.0</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-purple-500/40 text-xs text-white shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">2,000,000 Token Window</div>
                      <div className="text-[10px] text-slate-400">+ 5TB Google Drive Storage</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/30">
                    18 Months
                  </span>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-300">
                <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                  ⚡ 4x Higher Limits
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                  🎬 Google Vids & Docs
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                  🔍 Deep Research
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
