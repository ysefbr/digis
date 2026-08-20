'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  Phone,
  CreditCard,
} from 'lucide-react';
import { getOrderByNumber, getStoreSettings } from '@/actions/orders';
import { GeminiOrder, StoreSettings } from '@/lib/types';

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

export default function OrderSuccessPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const orderNumber = resolvedParams.orderNumber;

  const [order, setOrder] = useState<GeminiOrder | null>(null);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [orderData, storeData] = await Promise.all([
          getOrderByNumber(orderNumber),
          getStoreSettings(),
        ]);
        setOrder(orderData);
        setSettings(storeData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orderNumber]);

  const handleCopy = (text: string, type: 'order' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'order') {
      setCopiedOrder(true);
      setTimeout(() => setCopiedOrder(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const cleanWaNumber = (settings?.whatsapp_number || '+21656000000').replace(/[^0-9]/g, '');
  const waMessage = `Hello! I have placed order #${orderNumber} for Google Gemini Pro (18 Months Plan). My name is ${order?.customer_name || ''}. I would like to arrange payment and receive my activation link.`;
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-screen bg-[#050714] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-10">
      <div className="max-w-3xl mx-auto w-full space-y-8 my-auto py-8">
        
        {/* Top Back Link & Brand */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Page</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 to-purple-600">
              <div className="w-full h-full bg-[#070b1e] rounded-[6px] flex items-center justify-center p-0.5">
                <Image
                  src="/logo.png"
                  alt="DigiSmida Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            </div>
            <span className="font-bold text-xs text-slate-300">Gemini Pro 18M</span>
          </div>
        </div>

        {/* Success Card Header */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
            Order Submitted Successfully
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Thank You, {order?.customer_name || 'Valued Customer'}!
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
            Your 18-month Gemini Advanced order has been registered. Follow the step below to complete payment and receive your official activation link.
          </p>

          {/* Order Details Grid */}
          <div className="mt-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Order Number</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-blue-400 text-sm">
                <span>{orderNumber}</span>
                <button
                  onClick={() => handleCopy(orderNumber, 'order')}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy Order #"
                >
                  {copiedOrder ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Total Amount</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                {order?.total_price || settings?.price_tnd || 129} {order?.currency || 'TND'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Product</span>
              <span className="font-semibold text-white">Google AI Pro (18M + 5TB)</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Status</span>
              <span
                className={`font-bold uppercase px-2 py-0.5 rounded text-[10px] inline-block border ${
                  order?.status === 'DELIVERED'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : order?.status === 'PAID'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {order?.status || 'PENDING'}
              </span>
            </div>
          </div>

          {/* DELIVERED STATE: Reveal Activation Link if delivered */}
          {order?.status === 'DELIVERED' && order.activation_link && (
            <div className="mt-6 p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-left space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>🎉 Your 18-Month Activation Link is Ready!</span>
              </div>
              <div className="p-3 bg-black/70 rounded-xl border border-emerald-500/30 font-mono text-xs text-emerald-200 break-all select-all flex items-center justify-between gap-3">
                <span>{order.activation_link}</span>
                <button
                  onClick={() => handleCopy(order.activation_link!, 'link')}
                  className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 shrink-0 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={order.activation_link.startsWith('http') ? order.activation_link : `https://${order.activation_link}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm transition-colors"
              >
                <span>Click Here to Activate on Google</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {order.activation_instructions && (
                <p className="text-xs text-slate-300 mt-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <strong className="text-white block mb-1">Activation Guide:</strong>
                  {order.activation_instructions}
                </p>
              )}
            </div>
          )}

          {/* NEXT STEP: WhatsApp Dispatch Button */}
          <div className="mt-8 space-y-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 fill-current text-black" />
              <span>Confirm & Pay via WhatsApp ({settings?.whatsapp_number || '+216 56 000 000'})</span>
            </a>

            <p className="text-xs text-slate-400">
              Clicking the button will open WhatsApp with your pre-filled Order ID for fast processing.
            </p>
          </div>

        </div>

        {/* Payment Methods Guide */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-3">
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span>Accepted Payment Methods</span>
          </div>
          <p className="leading-relaxed">
            You can finalize your payment via <strong>D17</strong>, <strong>Sobflous</strong>, <strong>RunPay</strong>, <strong>Flouci</strong>, or <strong>Direct Bank RIB</strong>. Contact our WhatsApp operator above to get the account/phone number for your preferred method.
          </p>
          <div className="pt-2 flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Delivery is done in ~5 to 15 minutes once payment proof is received.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
