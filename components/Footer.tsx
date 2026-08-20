'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenLookup: () => void;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLookup, onOpenCheckout }) => {
  return (
    <footer className="border-t border-slate-900 bg-[#040611] pt-14 pb-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
                <div className="w-full h-full bg-[#070b1e] rounded-[10px] flex items-center justify-center p-1">
                  <Image
                    src="/logo.png"
                    alt="DigiSmida Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="font-bold text-lg text-white">Google AI Pro 18M</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Specialized sales portal for Google One: Google AI Pro 18-Month official activation links, Gemini Advanced (4x limits), and 5TB Google One cloud storage in Tunisia.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Google Activation • 100% Privacy Protected</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features & 2M Context</a></li>
              <li><a href="#comparison" className="hover:text-white transition-colors">Pricing Comparison</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Customer Vault */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Customer Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenLookup} className="hover:text-blue-400 transition-colors text-left">
                  🔍 Track Order / Retrieve Link
                </button>
              </li>
              <li>
                <button onClick={onOpenCheckout} className="hover:text-pink-400 transition-colors text-left font-bold text-blue-400">
                  ⚡ Buy 18-Month Activation
                </button>
              </li>
              <li>
                <Link href="/admin" className="hover:text-slate-200 transition-colors">
                  🛡️ Admin Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Gemini Pro Tunisia. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-slate-300">Google Gemini 1.5 Pro</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
