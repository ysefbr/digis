'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  Zap,
  ShieldCheck,
  Phone,
  Mail,
  User,
  CreditCard,
  AlertCircle,
  Loader2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { createOrder } from '@/actions/orders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  stockRemaining: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  price,
  stockRemaining,
}) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod] = useState('WhatsApp / Direct');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const totalPrice = price * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMessage('Please enter a valid WhatsApp or phone number.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await createOrder({
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        quantity,
        payment_method: paymentMethod,
        customer_notes: notes,
      });

      if (!res.success || !res.order) {
        setErrorMessage(res.error || 'Failed to submit order. Please try again.');
        setIsLoading(false);
        return;
      }

      // Successfully placed order -> navigate to success page
      router.push(`/success/${res.order.order_number}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0a0f26] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-500/20 text-white my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Order Form
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Google AI Pro 18-Month Activation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            No signup needed. Enter your details to generate your order and get your official Google AI Pro link via WhatsApp.
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mohamed Ben Salem"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Your Google Email (Where you want Gemini activated) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. yourname@gmail.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* WhatsApp / Phone Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              WhatsApp / Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +216 55 123 456 or 55123456"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quantity & Summary */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Quantity:</span>
              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-white bg-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-slate-400">Total (18 Months Plan)</div>
              <div className="text-xl font-extrabold text-emerald-400">
                {totalPrice} <span className="text-xs text-slate-300">TND</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full gemini-btn-primary py-3.5 px-6 rounded-xl font-extrabold text-sm text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Your Order...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-current text-yellow-300" />
                <span>Complete Order & Get Activation Link</span>
              </>
            )}
          </button>

          {/* Security Guarantee Note */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Zero risk • Official Google Activation • 18 Months Warranty</span>
          </div>

        </form>

      </div>
    </div>
  );
};
