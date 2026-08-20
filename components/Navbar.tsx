'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Search, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenCheckout: () => void;
  onOpenLookup: () => void;
  price: number;
  announcementText?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCheckout,
  onOpenLookup,
  price,
  announcementText = '⚡ Exclusive 18-Month Activation Codes • 88% OFF • Instant Delivery',
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 opacity-90">
      {/* Top Scarcity / Promo Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 py-1.5 px-4 text-center text-xs md:text-sm font-medium text-white shadow-md flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
        <span>{announcementText}</span>
        <span className="hidden sm:inline-block bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Limited Time
        </span>
      </div>

      {/* Main Navigation Bar - Adaptable Background & Text Colors */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'border-b border-blue-900/40 bg-[#050714]/90 backdrop-blur-xl shadow-2xl'
            : 'border-b border-slate-300/40 bg-white/70 backdrop-blur-xl shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <div className="w-full h-full bg-[#070b1e]/90 rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="DigiSmida Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 ${
                    isScrolled ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Google AI Pro
                </span>
                <span
                  className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded border transition-colors duration-300 ${
                    isScrolled
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-blue-100 text-blue-700 border-blue-300'
                  }`}
                >
                  18M
                </span>
              </div>
              <span
                className={`text-[11px] hidden sm:block transition-colors duration-300 ${
                  isScrolled ? 'text-slate-400' : 'text-slate-600 font-medium'
                }`}
              >
                Official Google One Activation
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden md:flex items-center gap-7 text-sm font-medium transition-colors duration-300 ${
              isScrolled ? 'text-slate-300' : 'text-slate-800 font-semibold'
            }`}
          >
            <a
              href="#features"
              className={`transition-colors ${
                isScrolled ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              Features
            </a>
            <a
              href="#comparison"
              className={`transition-colors ${
                isScrolled ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              Comparison
            </a>
            <a
              href="#how-it-works"
              className={`transition-colors ${
                isScrolled ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              How It Works
            </a>
            <a
              href="#faq"
              className={`transition-colors ${
                isScrolled ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              FAQ
            </a>
            <button
              onClick={onOpenLookup}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-purple-400 hover:text-purple-300'
                  : 'text-purple-700 hover:text-purple-900 font-bold'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLookup}
              className={`md:hidden p-2 rounded-lg border transition-colors ${
                isScrolled
                  ? 'bg-slate-800/80 border-slate-700 text-purple-400'
                  : 'bg-white/90 border-slate-300 text-purple-700 shadow-sm'
              }`}
              title="Track Order"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCheckout}
              className="gemini-btn-primary flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-yellow-300" />
              <span>Buy Now</span>
              <span className="hidden sm:inline">({price} TND)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
