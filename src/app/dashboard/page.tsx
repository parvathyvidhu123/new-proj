"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Clock, 
  Trash2, 
  Check, 
  RotateCcw, 
  ExternalLink,
  Loader2,
  AlertTriangle,
  RefreshCw,
  FileText
} from "lucide-react";

type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  style: string;
  placement: string;
  size: string;
  date: string;
  time: string;
  notes: string;
  status: string;
  createdAt: string;
};

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

type WhatsappLog = {
  id: string;
  recipient: string;
  message: string;
  status: string;
  error: string | null;
  createdAt: string;
};

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsappLog[]>([]);
  
  const [activeTab, setActiveTab] = useState<"bookings" | "inquiries" | "logs">("bookings");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stats
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalInquiries: 0,
    pendingBookings: 0,
    pendingInquiries: 0,
  });

  const fetchData = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const [bookingsRes, inquiriesRes, logsRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/inquiries"),
        fetch("/api/whatsapp-logs")
      ]);

      if (!bookingsRes.ok || !inquiriesRes.ok || !logsRes.ok) {
        throw new Error("Failed to load dashboard data. Ensure backend route is active.");
      }

      const bookingsData = await bookingsRes.json();
      const inquiriesData = await inquiriesRes.json();
      const logsData = await logsRes.json();

      setBookings(bookingsData);
      setInquiries(inquiriesData);
      setWhatsappLogs(logsData);

      setStats({
        totalBookings: bookingsData.length,
        totalInquiries: inquiriesData.length,
        pendingBookings: bookingsData.filter((b: Booking) => b.status === "Pending").length,
        pendingInquiries: inquiriesData.filter((i: Inquiry) => i.status === "Pending").length,
      });

    } catch (err) {
      const errorObj = err as Error;
      console.error(errorObj);
      setError(errorObj.message || "An error occurred while fetching dashboard entries.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 0);
  }, []);

  const handleUpdateStatus = async (type: "booking" | "inquiry", id: string, newStatus: string) => {
    try {
      const endpoint = type === "booking" ? "/api/bookings" : "/api/inquiries";
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status.");

      if (type === "booking") {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        setStats(prev => {
          const updatedBookings = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
          return {
            ...prev,
            pendingBookings: updatedBookings.filter(b => b.status === "Pending").length
          };
        });
      } else {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
        setStats(prev => {
          const updatedInquiries = inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i);
          return {
            ...prev,
            pendingInquiries: updatedInquiries.filter(i => i.status === "Pending").length
          };
        });
      }
    } catch (err) {
      alert((err as Error).message || "Failed to update status.");
    }
  };

  const handleDelete = async (type: "booking" | "inquiry", id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const endpoint = type === "booking" ? `/api/bookings?id=${id}` : `/api/inquiries?id=${id}`;
      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete record.");

      if (type === "booking") {
        setBookings(prev => prev.filter(b => b.id !== id));
        setStats(prev => ({
          ...prev,
          totalBookings: prev.totalBookings - 1,
          pendingBookings: bookings.filter(b => b.id !== id && b.status === "Pending").length
        }));
      } else {
        setInquiries(prev => prev.filter(i => i.id !== id));
        setStats(prev => ({
          ...prev,
          totalInquiries: prev.totalInquiries - 1,
          pendingInquiries: inquiries.filter(i => i.id !== id && i.status === "Pending").length
        }));
      }
    } catch (err) {
      alert((err as Error).message || "Deletion failed.");
    }
  };

  const handleClearLogs = async () => {
    if (!confirm("Clear all WhatsApp notification logs?")) return;
    try {
      const response = await fetch("/api/whatsapp-logs", { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to clear logs.");
      setWhatsappLogs([]);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const getWhatsAppLink = (phone: string, name: string, type: "booking" | "inquiry") => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const greeting = `Hi ${name}, this is Blackhole Tattoos. Thank you for your ${
      type === "booking" ? "consultation request" : "inquiry"
    }! We saw your details and would love to discuss this further.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
  };

  return (
    <div className="w-full min-h-screen bg-matte-black text-zinc-100 font-sans pb-20 selection:bg-crimson selection:text-white">
      
      {/* Top Header */}
      <header className="border-b border-zinc-900 bg-charcoal/80 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center font-display text-white font-black text-lg shadow-[0_0_15px_rgba(191,10,10,0.5)]">
            BH
          </div>
          <div>
            <h1 className="font-display font-black text-sm uppercase tracking-[0.2em] text-white">BLACKHOLE TATTOOS</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Creator Studio // Owner Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="p-2.5 rounded-lg border border-zinc-800 hover:border-red-600 hover:text-red-500 bg-transparent transition-all cursor-pointer flex items-center gap-2 text-xs font-mono tracking-wider"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "REFRESHING" : "REFRESH"}
          </button>
          <Link
            href="/"
            className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Visit Studio Website
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        
        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-950/20 border border-red-900/60 flex items-start gap-3 text-red-400 text-sm">
            <AlertTriangle className="shrink-0 mt-0.5" size={16} />
            <div>
              <p className="font-semibold text-white">Failed to fetch data</p>
              <p className="text-xs text-red-500/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1 */}
          <div className="glass-premium p-6 rounded-xl border border-zinc-800 flex items-center justify-between group hover:border-red-600/50 transition-all duration-300">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Consultations</p>
              <h3 className="text-3xl font-display font-black text-white mt-2 font-mono">{stats.totalBookings}</h3>
              <p className="text-[10px] text-zinc-400 mt-1">Submitted requests</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-zinc-900 group-hover:bg-red-650/10 group-hover:text-red-500 text-zinc-400 flex items-center justify-center transition-all duration-300">
              <Calendar size={20} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-premium p-6 rounded-xl border border-zinc-800 flex items-center justify-between group hover:border-red-600/50 transition-all duration-300">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pending Consultations</p>
              <h3 className="text-3xl font-display font-black text-red-500 mt-2 font-mono">{stats.pendingBookings}</h3>
              <p className="text-[10px] text-zinc-400 mt-1">Requires contact</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-zinc-900 group-hover:bg-red-650/10 group-hover:text-red-500 text-zinc-400 flex items-center justify-center transition-all duration-300">
              <Clock size={20} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-premium p-6 rounded-xl border border-zinc-800 flex items-center justify-between group hover:border-red-600/50 transition-all duration-300">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Contact Inquiries</p>
              <h3 className="text-3xl font-display font-black text-white mt-2 font-mono">{stats.totalInquiries}</h3>
              <p className="text-[10px] text-zinc-400 mt-1">General questions</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-zinc-900 group-hover:bg-red-650/10 group-hover:text-red-500 text-zinc-400 flex items-center justify-center transition-all duration-300">
              <MessageSquare size={20} />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-premium p-6 rounded-xl border border-zinc-800 flex items-center justify-between group hover:border-red-600/50 transition-all duration-300">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pending Contacts</p>
              <h3 className="text-3xl font-display font-black text-yellow-500 mt-2 font-mono">{stats.pendingInquiries}</h3>
              <p className="text-[10px] text-zinc-400 mt-1">Awaiting feedback</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-zinc-900 group-hover:bg-red-650/10 group-hover:text-red-500 text-zinc-400 flex items-center justify-center transition-all duration-300">
              <Users size={20} />
            </div>
          </div>

        </div>

        {/* Tab Controls & Settings */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-5 mb-8">
          <div className="flex flex-wrap items-center gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-800 max-w-max">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-2.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                activeTab === "bookings"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Consultations ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-5 py-2.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              General Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-5 py-2.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                activeTab === "logs"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              WhatsApp Notification Log ({whatsappLogs.length})
            </button>
          </div>

          {activeTab === "logs" && whatsappLogs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="px-4 py-2 border border-red-950/60 text-red-500 hover:bg-red-950/20 hover:border-red-600 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 size={12} /> Clear Logs
            </button>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4">
            <Loader2 className="animate-spin text-red-500" size={32} />
            <p className="text-xs uppercase tracking-widest font-mono">Syncing dossier data...</p>
          </div>
        ) : (
          <div className="w-full">
            
            {/* 1. CONSULTATIONS TAB */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                {bookings.length === 0 ? (
                  <div className="glass-premium p-12 text-center border border-zinc-800 rounded-xl text-zinc-500 text-xs tracking-widest uppercase">
                    No bookings logged yet.
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className={`glass-premium p-6 md:p-8 rounded-xl border transition-all duration-300 ${
                        booking.status === "Pending" ? "border-zinc-800 hover:border-red-900/40" : "border-zinc-900/60 opacity-70"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        
                        {/* Column 1: Client details */}
                        <div className="space-y-4 max-w-md flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-display font-black text-lg text-white uppercase tracking-wider">{booking.name}</h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                              booking.status === "Pending" 
                                ? "bg-red-950/30 text-red-500 border-red-500/30"
                                : booking.status === "Contacted"
                                ? "bg-yellow-950/30 text-yellow-500 border-yellow-800/30"
                                : booking.status === "Booked"
                                ? "bg-green-950/30 text-green-500 border-green-800/30"
                                : "bg-zinc-850 text-zinc-500 border-zinc-700"
                            }`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="space-y-2 text-xs font-mono text-zinc-400">
                            <div className="flex items-center gap-2">
                              <Phone size={12} className="text-zinc-600" />
                              <a href={`tel:${booking.phone}`} className="hover:underline">{booking.phone}</a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={12} className="text-zinc-600" />
                              <a href={`mailto:${booking.email}`} className="hover:underline">{booking.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={12} className="text-zinc-600" />
                              <span>Received: {new Date(booking.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-black/40 p-4 md:p-5 rounded-lg border border-zinc-950 min-w-[280px] lg:min-w-[400px] flex-1">
                          <div>
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Service</span>
                            <span className="text-xs font-bold text-white uppercase mt-1 block">{booking.service}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Tattoo Style</span>
                            <span className="text-xs font-bold text-red-500 uppercase mt-1 block">{booking.style || "N/A"}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Placement</span>
                            <span className="text-xs font-bold text-white uppercase mt-1 block">{booking.placement || "N/A"}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Size</span>
                            <span className="text-xs font-bold text-zinc-300 uppercase mt-1 block">{booking.size || "N/A"}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Preferred Date</span>
                            <span className="text-xs font-bold text-white mt-1 block flex items-center gap-1">
                              <Calendar size={10} className="text-red-500" /> {booking.date}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Pref. Time</span>
                            <span className="text-xs font-bold text-zinc-300 mt-1 block">{booking.time || "N/A"}</span>
                          </div>
                        </div>

                        {/* Column 3: Actions */}
                        <div className="flex flex-wrap lg:flex-col lg:items-stretch gap-2.5 shrink-0 self-center lg:self-start lg:min-w-[170px]">
                          <a
                            href={getWhatsAppLink(booking.phone, booking.name, "booking")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (booking.status === "Pending") {
                                handleUpdateStatus("booking", booking.id, "Contacted");
                              }
                            }}
                            className="px-4 py-2.5 rounded bg-green-950/20 hover:bg-green-600 border border-green-800 text-white font-semibold text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all text-center"
                          >
                            <ExternalLink size={12} /> Contact Customer
                          </a>

                          <div className="flex gap-1.5">
                            {booking.status !== "Booked" && (
                              <button
                                onClick={() => handleUpdateStatus("booking", booking.id, "Booked")}
                                className="flex-1 py-2 px-2.5 border border-zinc-800 hover:border-green-600 hover:text-green-500 text-[9px] font-bold uppercase rounded tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <Check size={10} /> Booked
                              </button>
                            )}
                            {booking.status !== "Contacted" && booking.status !== "Booked" && (
                              <button
                                onClick={() => handleUpdateStatus("booking", booking.id, "Contacted")}
                                className="flex-1 py-2 px-2.5 border border-zinc-800 hover:border-yellow-600 hover:text-yellow-500 text-[9px] font-bold uppercase rounded tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                Contacted
                              </button>
                            )}
                            {booking.status !== "Pending" && (
                              <button
                                onClick={() => handleUpdateStatus("booking", booking.id, "Pending")}
                                className="py-2 px-2.5 border border-zinc-800 hover:border-red-600 hover:text-red-500 text-[9px] font-bold uppercase rounded tracking-wider transition-all cursor-pointer flex items-center justify-center"
                                title="Restore to Pending"
                              >
                                <RotateCcw size={10} />
                              </button>
                            )}
                          </div>

                          <button
                            onClick={() => handleDelete("booking", booking.id)}
                            className="px-4 py-2 bg-zinc-950 hover:bg-red-950/30 border border-zinc-900 hover:border-red-900/60 text-zinc-550 hover:text-red-500 text-[9px] font-bold tracking-widest uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Trash2 size={10} /> Delete Record
                          </button>
                        </div>

                      </div>

                      {/* Notes Box */}
                      {booking.notes && (
                        <div className="mt-6 pt-5 border-t border-zinc-900/60">
                          <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Project Briefing notes</span>
                          <p className="text-xs font-light leading-relaxed text-zinc-400 bg-charcoal/40 p-4 rounded border border-zinc-900">
                            {booking.notes}
                          </p>
                        </div>
                      )}

                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. GENERAL INQUIRIES TAB */}
            {activeTab === "inquiries" && (
              <div className="space-y-6">
                {inquiries.length === 0 ? (
                  <div className="glass-premium p-12 text-center border border-zinc-800 rounded-xl text-zinc-500 text-xs tracking-widest uppercase">
                    No inquiries logged yet.
                  </div>
                ) : (
                  inquiries.map((inquiry) => (
                    <div 
                      key={inquiry.id} 
                      className={`glass-premium p-6 md:p-8 rounded-xl border transition-all duration-300 ${
                        inquiry.status === "Pending" ? "border-zinc-800 hover:border-red-900/40" : "border-zinc-900/60 opacity-70"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        
                        {/* Inquiry Details */}
                        <div className="space-y-4 max-w-xl flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-display font-black text-lg text-white uppercase tracking-wider">{inquiry.name}</h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                              inquiry.status === "Pending" 
                                ? "bg-red-950/30 text-red-500 border-red-500/30"
                                : "bg-zinc-850 text-zinc-550 border-zinc-700"
                            }`}>
                              {inquiry.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
                            <div className="flex items-center gap-2">
                              <Phone size={12} className="text-zinc-600" />
                              <a href={`tel:${inquiry.phone}`} className="hover:underline">{inquiry.phone}</a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={12} className="text-zinc-600" />
                              <a href={`mailto:${inquiry.email}`} className="hover:underline">{inquiry.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={12} className="text-zinc-600" />
                              <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-zinc-900/60">
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Customer Message</span>
                            <p className="text-xs font-light leading-relaxed text-zinc-350 bg-charcoal/40 p-4 rounded border border-zinc-900">
                              {inquiry.message}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap lg:flex-col lg:items-stretch gap-2.5 shrink-0 lg:min-w-[170px]">
                          <a
                            href={getWhatsAppLink(inquiry.phone, inquiry.name, "inquiry")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (inquiry.status === "Pending") {
                                handleUpdateStatus("inquiry", inquiry.id, "Contacted");
                              }
                            }}
                            className="px-4 py-2.5 rounded bg-green-950/20 hover:bg-green-600 border border-green-800 text-white font-semibold text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all text-center"
                          >
                            <ExternalLink size={12} /> Contact Customer
                          </a>

                          <div className="flex gap-1.5">
                            {inquiry.status !== "Contacted" ? (
                              <button
                                onClick={() => handleUpdateStatus("inquiry", inquiry.id, "Contacted")}
                                className="flex-1 py-2 px-2.5 border border-zinc-800 hover:border-green-600 hover:text-green-500 text-[9px] font-bold uppercase rounded tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                Mark Contacted
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateStatus("inquiry", inquiry.id, "Pending")}
                                className="flex-1 py-2 px-2.5 border border-zinc-800 hover:border-red-600 hover:text-red-500 text-[9px] font-bold uppercase rounded tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                Mark Pending
                              </button>
                            )}
                          </div>

                          <button
                            onClick={() => handleDelete("inquiry", inquiry.id)}
                            className="px-4 py-2 bg-zinc-950 hover:bg-red-950/30 border border-zinc-900 hover:border-red-900/60 text-zinc-550 hover:text-red-500 text-[9px] font-bold tracking-widest uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Trash2 size={10} /> Delete Inquiry
                          </button>
                        </div>

                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 3. WHATSAPP LOG TAB */}
            {activeTab === "logs" && (
              <div className="space-y-6">
                
                <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 flex items-start gap-4">
                  <div className="p-2.5 rounded bg-red-950/20 text-red-500">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">System Logs Overview</h5>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1 max-w-2xl">
                      Each time a customer submits the Contact Form or booking Consultation Form, the backend automatically triggers a WhatsApp dispatch. If no keys are defined in your environment variables, it executes in <span className="font-semibold text-red-500">Mock Mode</span>, archiving the notification below for review.
                    </p>
                  </div>
                </div>

                {whatsappLogs.length === 0 ? (
                  <div className="glass-premium p-12 text-center border border-zinc-800 rounded-xl text-zinc-500 text-xs tracking-widest uppercase">
                    No notifications logged yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {whatsappLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className="glass-premium p-6 rounded-xl border border-zinc-800 hover:border-zinc-700/50 transition-all duration-300"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-4">
                          <div className="space-y-1">
                            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Recipient Owner Number</span>
                            <span className="text-xs font-bold text-white font-mono">{log.recipient}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs font-mono">
                            <div className="text-right">
                              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Dispatched At</span>
                              <span className="text-zinc-400 text-[11px]">{new Date(log.createdAt).toLocaleString()}</span>
                            </div>
                            
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                              log.status === "Sent" 
                                ? "bg-green-950/20 text-green-500 border-green-800/30"
                                : "bg-red-950/20 text-red-500 border-red-800/30"
                            }`}>
                              {log.status}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Message Payload Body</span>
                          <pre className="text-xs text-zinc-300 bg-charcoal/60 p-4 rounded border border-zinc-900 font-mono whitespace-pre-wrap leading-relaxed max-w-3xl">
                            {log.message}
                          </pre>
                        </div>

                        {log.error && (
                          <div className="mt-4 p-3.5 bg-red-950/20 border border-red-900/40 rounded text-xs text-red-400 font-mono">
                            <span className="font-bold uppercase tracking-wider text-[9px] block text-red-500 mb-1">Execution Error:</span>
                            {log.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
