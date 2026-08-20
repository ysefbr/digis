'use client';

import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { lookupOrders } from '@/actions/orders';
import { GeminiOrder } from '@/lib/types';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose }) => {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState<GeminiOrder[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const orders = await lookupOrders(queryText);
      setResults(orders);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#0a0f26] border border-blue-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl text-white my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold text-white">
            Find Your Activation Link
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Enter your Order Number (e.g. <span className="text-blue-400 font-mono">GEM-123456</span>), Phone Number, or Email.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="GEM-XXXXXX or +216..."
            required
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Search</span>
          </button>
        </form>

        {/* Search Results */}
        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
          {hasSearched && results && results.length === 0 && !isLoading && (
            <div className="p-6 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-sm">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p>No orders found matching &ldquo;{queryText}&rdquo;.</p>
              <p className="text-xs mt-1">Please verify your order code or contact support on WhatsApp.</p>
            </div>
          )}

          {results && results.map((order) => (
            <div
              key={order.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-white text-sm">
                    {order.order_number}
                  </span>
                  <div className="text-[11px] text-slate-400">
                    {new Date(order.created_at).toLocaleDateString()} • {order.total_price} {order.currency}
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : order.status === 'PAID'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : order.status === 'CANCELLED'
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Delivered Activation Link Vault */}
              {order.status === 'DELIVERED' && order.activation_link ? (
                <div className="mt-2 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Your 18-Month Activation Link is Ready:</span>
                  </div>
                  
                  <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-500/30 text-xs font-mono text-emerald-200 break-all select-all flex items-center justify-between gap-2">
                    <span className="truncate">{order.activation_link}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(order.activation_link!, order.id)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 shrink-0 cursor-pointer"
                      title="Copy Link"
                    >
                      {copiedId === order.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <a
                    href={order.activation_link.startsWith('http') ? order.activation_link : `https://${order.activation_link}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
                  >
                    <span>Click here to activate on Google</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {order.activation_instructions && (
                    <div className="text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800 mt-2">
                      <strong className="text-white block mb-0.5">Instructions:</strong>
                      {order.activation_instructions}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {order.status === 'PAID'
                      ? 'Payment received! Admin is generating your 18-month link.'
                      : 'Pending payment confirmation. Contact support on WhatsApp to accelerate delivery.'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
