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
  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Scarcity / Promo Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 py-1.5 px-4 text-center text-xs md:text-sm font-medium text-white shadow-md flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
        <span>{announcementText}</span>
        <span className="hidden sm:inline-block bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Limited Time
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b border-blue-900/40 bg-[#050714]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#070b1e] rounded-[10px] flex items-center justify-center p-1.5">
                <Image
                  src="/logo.png"
                  alt="DigiSmida Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg md:text-xl text-white tracking-tight">Google AI Pro</span>
                <span className="bg-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-blue-500/30">18M</span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block">Official Google One Activation</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#comparison" className="hover:text-blue-400 transition-colors">Comparison</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
            <button
              onClick={onOpenLookup}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLookup}
              className="md:hidden p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-purple-400 hover:text-purple-300"
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

            <Link
              href="/admin"
              className="text-xs text-slate-500 hover:text-slate-400 hidden lg:flex items-center gap-1 p-2 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
