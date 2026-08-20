'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { adminLoginAction } from '@/actions/admin';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await adminLoginAction(password);
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(res.error || 'Invalid credentials');
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050714] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0f26] border border-blue-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow orb */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 mx-auto mb-4 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#070b1e] rounded-[14px] flex items-center justify-center p-2">
              <Image
                src="/logo.png"
                alt="DigiSmida Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Gemini Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Secure dashboard for order fulfillment</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Admin Access Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Default password is <code className="text-slate-400">admin_gemini_2026</code> (changeable in settings)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gemini-btn-primary py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
            ← Back to Customer Sales Page
          </Link>
        </div>

      </div>
    </div>
  );
}
