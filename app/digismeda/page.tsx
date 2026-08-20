'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  LogOut,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Trash2,
  Save,
  DollarSign,
  TrendingUp,
  Package,
  Layers,
  Settings,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Download,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  getAdminDashboardData,
  adminLogoutAction,
  updateOrderStatusAction,
  fulfillOrderAction,
  updateStoreSettingsAction,
  deleteOrderAction,
  checkIsAdmin,
} from '@/actions/admin';
import { GeminiOrder, OrderStatus, StoreSettings, AdminMetrics } from '@/lib/types';

export default function DigismedaDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [orders, setOrders] = useState<GeminiOrder[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fulfillment Modal State
  const [fulfillmentModalOrder, setFulfillmentModalOrder] = useState<GeminiOrder | null>(null);
  const [activationUrl, setActivationUrl] = useState('');
  const [activationInstructions, setActivationInstructions] = useState(
    'Please click the link above while logged into your Google account to activate your 18-month Google AI Pro + 5TB Google One plan.'
  );
  const [isFulfilling, setIsFulfilling] = useState(false);

  // Settings Edit State
  const [settingsForm, setSettingsForm] = useState({
    product_title: '',
    price_tnd: 129,
    original_price_tnd: 1120,
    whatsapp_number: '',
    stock_remaining: 9,
    announcement_text: '',
    new_password: '',
  });
  const [settingsSaveMsg, setSettingsSaveMsg] = useState('');

  // Copy helper
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load Data
  const loadDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const isAuth = await checkIsAdmin();
      if (!isAuth) {
        router.push('/digismeda/login');
        return;
      }

      const data = await getAdminDashboardData({
        status: statusFilter,
        search: searchQuery,
      });

      if (!data) {
        router.push('/digismeda/login');
        return;
      }

      setMetrics(data.metrics);
      setOrders(data.orders);
      setSettings(data.settings);
      setSettingsForm({
        product_title: data.settings.product_title,
        price_tnd: data.settings.price_tnd,
        original_price_tnd: data.settings.original_price_tnd,
        whatsapp_number: data.settings.whatsapp_number,
        stock_remaining: data.settings.stock_remaining,
        announcement_text: data.settings.announcement_text,
        new_password: '',
      });
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadDashboardData();
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    router.push('/digismeda/login');
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatusAction(orderId, newStatus);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to permanently delete this order?')) return;
    try {
      await deleteOrderAction(orderId);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenFulfillment = (order: GeminiOrder) => {
    setFulfillmentModalOrder(order);
    setActivationUrl(order.activation_link || '');
    if (order.activation_instructions) {
      setActivationInstructions(order.activation_instructions);
    }
  };

  const handleFulfillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fulfillmentModalOrder || !activationUrl.trim()) return;

    setIsFulfilling(true);
    try {
      await fulfillOrderAction(
        fulfillmentModalOrder.id,
        activationUrl.trim(),
        activationInstructions.trim()
      );
      setFulfillmentModalOrder(null);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsFulfilling(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaveMsg('');
    try {
      await updateStoreSettingsAction(
        {
          product_title: settingsForm.product_title,
          price_tnd: Number(settingsForm.price_tnd),
          original_price_tnd: Number(settingsForm.original_price_tnd),
          whatsapp_number: settingsForm.whatsapp_number,
          stock_remaining: Number(settingsForm.stock_remaining),
          announcement_text: settingsForm.announcement_text,
        },
        settingsForm.new_password || undefined
      );
      setSettingsSaveMsg('✅ Store settings updated successfully!');
      setTimeout(() => setSettingsSaveMsg(''), 4000);
      await loadDashboardData();
    } catch (err: any) {
      setSettingsSaveMsg(`❌ Error: ${err.message}`);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      'Order Number',
      'Date',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Quantity',
      'Total Price (TND)',
      'Payment Method',
      'Status',
      'Activation Link',
    ];
    const rows = orders.map((o) => [
      o.order_number,
      new Date(o.created_at).toISOString(),
      `"${o.customer_name.replace(/"/g, '""')}"`,
      o.customer_email,
      o.customer_phone,
      o.quantity,
      o.total_price,
      `"${o.payment_method}"`,
      o.status,
      `"${(o.activation_link || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `gemini_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050714] text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
          <span>Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050714] text-slate-100 flex flex-col">
      
      {/* Admin Topbar */}
      <header className="border-b border-blue-900/40 bg-[#070b1e]/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
                <div className="w-full h-full bg-[#070b1e] rounded-[10px] flex items-center justify-center p-1">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base">DigiSmida Portal</span>
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-purple-500/40">
                    Live
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Order Management & Fulfillment</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadDashboardData()}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full space-y-8">
        
        {/* KPI Summary Cards */}
        {metrics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Revenue */}
            <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {metrics.totalRevenue} <span className="text-sm font-semibold text-slate-300">TND</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">From all recorded orders</div>
            </div>

            {/* Total Orders */}
            <div className="p-5 rounded-2xl glass-panel border border-blue-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {metrics.totalOrders}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Total orders created</div>
            </div>

            {/* Pending Deliveries */}
            <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Actions</span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {metrics.pendingOrders}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Waiting for payment/delivery</div>
            </div>

            {/* Delivered Activations */}
            <div className="p-5 rounded-2xl glass-panel border border-purple-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fulfilled (18M)</span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-300">
                {metrics.deliveredOrders}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Successfully activated</div>
            </div>

          </div>
        )}

        {/* Tab Selection */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Orders Management ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Pricing & Settings</span>
            </button>
          </div>

          {activeTab === 'orders' && (
            <button
              onClick={exportToCSV}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              
              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by order #, name, email, phone..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                >
                  Filter
                </button>
              </form>

              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['ALL', 'PENDING', 'PAID', 'DELIVERED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      statusFilter === st
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel shadow-xl">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-bold uppercase text-slate-400">
                    <th className="p-4">Order # & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Activation Link</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-500">
                        <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p>No orders found matching the filter criteria.</p>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => {
                      const cleanPhone = order.customer_phone.replace(/[^0-9]/g, '');
                      const fulfillWaMsg = `Hello ${order.customer_name}! Your Google AI Pro (18 Months Plan) activation link for order #${order.order_number} is ready:%0A%0A${order.activation_link || ''}%0A%0AEnjoy 18 Months of Google AI Pro (Gemini Advanced 4x limits), Deep Research, Google Vids, and 5TB Google One storage!`;
                      const waLink = `https://wa.me/${cleanPhone}?text=${fulfillWaMsg}`;

                      return (
                        <tr key={order.id} className="hover:bg-slate-900/50 transition-colors">
                          {/* Order Number & Date */}
                          <td className="p-4">
                            <div className="font-mono font-bold text-white flex items-center gap-1.5">
                              <span>{order.order_number}</span>
                              <button
                                onClick={() => handleCopy(order.order_number, order.id + '_code')}
                                className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-white"
                                title="Copy Order Code"
                              >
                                {copiedId === order.id + '_code' ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {new Date(order.created_at).toLocaleString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>

                          {/* Customer Details */}
                          <td className="p-4">
                            <div className="font-semibold text-white">{order.customer_name}</div>
                            <div className="text-slate-400 text-[11px]">{order.customer_email}</div>
                            <div className="text-blue-400 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                              <span>{order.customer_phone}</span>
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 ml-1"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="p-4">
                            <div className="font-extrabold text-emerald-400 text-sm">
                              {order.total_price} {order.currency}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Qty: {order.quantity} (18M)
                            </div>
                          </td>

                          {/* Payment Method */}
                          <td className="p-4 text-slate-300">
                            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[11px]">
                              {order.payment_method}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="p-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value as OrderStatus)
                              }
                              className={`text-[11px] font-bold uppercase rounded-lg px-2.5 py-1 border bg-slate-950 focus:outline-none cursor-pointer ${
                                order.status === 'DELIVERED'
                                  ? 'text-emerald-300 border-emerald-500/40'
                                  : order.status === 'PAID'
                                  ? 'text-blue-300 border-blue-500/40'
                                  : order.status === 'CANCELLED'
                                  ? 'text-red-300 border-red-500/40'
                                  : 'text-amber-300 border-amber-500/40'
                              }`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="PAID">PAID</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>

                          {/* Activation Link */}
                          <td className="p-4 max-w-[200px]">
                            {order.activation_link ? (
                              <div className="flex items-center gap-1.5">
                                <span className="truncate font-mono text-[11px] text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/30">
                                  {order.activation_link}
                                </span>
                                <button
                                  onClick={() =>
                                    handleCopy(order.activation_link!, order.id + '_link')
                                  }
                                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white shrink-0"
                                  title="Copy Link"
                                >
                                  {copiedId === order.id + '_link' ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-500 italic">Not delivered yet</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Fulfill Button */}
                              <button
                                onClick={() => handleOpenFulfillment(order)}
                                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                <span>{order.activation_link ? 'Edit Link' : 'Fulfill'}</span>
                              </button>

                              {/* WhatsApp Dispatch */}
                              {order.activation_link && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                                  title="Send Activation on WhatsApp"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {/* Delete Order */}
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: STORE SETTINGS & PRICING */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-white">Store & Product Configuration</h3>
              <p className="text-xs text-slate-400 mt-1">
                Customize pricing, remaining stock, WhatsApp support number, and access credentials.
              </p>
            </div>

            {settingsSaveMsg && (
              <div className="p-3.5 rounded-xl bg-blue-500/15 border border-blue-500/40 text-blue-200 text-xs font-semibold">
                {settingsSaveMsg}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              
              {/* Product Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Product Headline
                </label>
                <input
                  type="text"
                  value={settingsForm.product_title}
                  onChange={(e) => setSettingsForm({ ...settingsForm, product_title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Selling Price (TND) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={settingsForm.price_tnd}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, price_tnd: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-extrabold text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Anchor Strikethrough Price (TND)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={settingsForm.original_price_tnd}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, original_price_tnd: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-400 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* WhatsApp Support Number & Stock Remaining */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Support WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp_number}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })
                    }
                    placeholder="+216..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Remaining Stock Indicator
                  </label>
                  <input
                    type="number"
                    value={settingsForm.stock_remaining}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, stock_remaining: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Announcement Banner */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Top Announcement Bar Text
                </label>
                <input
                  type="text"
                  value={settingsForm.announcement_text}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, announcement_text: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Change Admin Password */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
                  Change Access Password (Optional)
                </label>
                <input
                  type="password"
                  value={settingsForm.new_password}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, new_password: e.target.value })
                  }
                  placeholder="Enter new password (min 6 characters)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Leave empty to keep existing password.</p>
              </div>

              <button
                type="submit"
                className="gemini-btn-primary w-full py-3 px-6 rounded-xl font-bold text-sm text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                <Save className="w-4 h-4" />
                <span>Save Store Changes</span>
              </button>

            </form>
          </div>
        )}

      </div>

      {/* FULFILLMENT MODAL */}
      {fulfillmentModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0a0f26] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8">
            
            <button
              onClick={() => setFulfillmentModalOrder(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
                Fulfillment Tool
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Deliver 18-Month Activation
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Order #{fulfillmentModalOrder.order_number} • {fulfillmentModalOrder.customer_name} ({fulfillmentModalOrder.customer_email})
              </p>
            </div>

            <form onSubmit={handleFulfillSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  18-Month Google Activation URL / Redeem Link *
                </label>
                <input
                  type="text"
                  value={activationUrl}
                  onChange={(e) => setActivationUrl(e.target.value)}
                  placeholder="https://one.google.com/promo/..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Instructions / Notes for Customer
                </label>
                <textarea
                  rows={3}
                  value={activationInstructions}
                  onChange={(e) => setActivationInstructions(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentModalOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isFulfilling}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isFulfilling ? 'Saving...' : 'Mark as DELIVERED & Save'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
