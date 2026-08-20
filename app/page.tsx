'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { ComparisonTable } from '@/components/ComparisonTable';
import { HowItWorks } from '@/components/HowItWorks';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CheckoutModal } from '@/components/CheckoutModal';
import { OrderLookupModal } from '@/components/OrderLookupModal';
import { getStoreSettings } from '@/actions/orders';
import { StoreSettings } from '@/lib/types';
import { Zap, Flame } from 'lucide-react';

export default function HomePage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [settings, setSettings] = useState<StoreSettings>({
    id: 'default',
    product_title: 'Google Gemini Advanced (18 Months Plan)',
    price_tnd: 80,
    original_price_tnd: 1120,
    whatsapp_number: '+21656000000',
    stock_remaining: 9,
    is_active: true,
    announcement_text: '⚡ Limited Stock: 18-Month Activation Codes at 88% OFF!',
  });

  useEffect(() => {
    getStoreSettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Header / Navigation */}
      <Navbar
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
        price={settings.price_tnd}
        announcementText={settings.announcement_text}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          onOpenCheckout={() => setIsCheckoutOpen(true)}
          price={settings.price_tnd}
          originalPrice={settings.original_price_tnd}
          stockRemaining={settings.stock_remaining}
        />

        <FeaturesGrid />

        <ComparisonTable
          price={settings.price_tnd}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />

        <HowItWorks />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppButton phoneNumber={settings.whatsapp_number} />

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
            <Flame className="w-3 h-3 text-red-400" />
            <span>18M Activation Plan</span>
          </div>
          <div className="text-lg font-extrabold text-white">
            {settings.price_tnd} <span className="text-xs text-blue-400 font-bold">TND</span>
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="gemini-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-sm text-white shadow-lg cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current text-yellow-300" />
          <span>Claim Offer</span>
        </button>
      </div>

      {/* Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        price={settings.price_tnd}
        stockRemaining={settings.stock_remaining}
      />

      <OrderLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
}
