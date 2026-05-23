'use client'

import { motion } from 'framer-motion'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { 
  Users, 
  BookOpen, 
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Map,
  Calendar,
  FileText,
  Bell,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

const performanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 92 },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden rounded-[40px] flex flex-col md:flex-row relative min-h-[320px]"
      >
        <div className="flex-1 p-10 md:p-14 z-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Welcome back, Scholar.</h1>
          <p className="text-slate-500 text-lg max-w-xl leading-relaxed mb-8">
            Your academic journey is looking bright today. You have 3 upcoming lectures and your semester project is 85% complete.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all shadow-lg shadow-blue-500/20 group">
              Check Schedule
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-100 transition-all">
              My Grades
            </button>
          </div>
        </div>
        <div className="md:w-1/3 relative hidden md:block overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white z-10"></div>
          <div className="w-full h-full bg-slate-100 flex items-center justify-center p-8">
            <div className="w-full h-full rounded-3xl bg-blue-600/5 border border-blue-600/10 flex items-center justify-center relative overflow-hidden">
                <Sparkles className="text-blue-600/20 absolute -top-10 -right-10 w-40 h-40" />
                <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl shadow-blue-500/30">
                        <TrendingUp className="text-white" size={32} />
                    </div>
                    <p className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Academic Pulse</p>
                    <p className="text-2xl font-black text-slate-800">92% Rank</p>
                </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Attendance Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 rounded-[32px] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">On Track</span>
          </div>
          <p className="text-slate-800 text-xl font-black mb-2">Attendance</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-slate-900">78%</span>
            <span className="text-green-500 font-bold text-sm">+2% from last month</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                className="h-full bg-blue-600 rounded-full"
            />
          </div>
        </motion.div>

        {/* Assignments Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 rounded-[32px] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Urgent</span>
          </div>
          <p className="text-slate-800 text-xl font-black mb-2">Assignments</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-slate-900">4</span>
            <span className="text-slate-400 font-bold text-sm">Pending submissions</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Quantum Mechanics Quiz - 2h left
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Logic Circuits Lab - Tomorrow
            </div>
          </div>
        </motion.div>

        {/* Ongoing Lecture Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-10 rounded-[32px] bg-primary text-primary-foreground relative overflow-hidden group"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2"><Sparkles size={18}/> Ongoing Lecture</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Live Now
                  </div>
                </div>
                <h4 className="text-3xl font-black mb-1">Machine Learning</h4>
                <p className="text-white/80 text-sm font-bold">Dr. S. K. Gupta • Room L-402</p>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>09:00 AM</span>
                <span>10:00 AM</span>
              </div>
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[45%]" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-center mt-3 text-white/60">Next: OS Lab @ 10:00 AM</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[50px] -z-0"></div>
          <div className="absolute -bottom-6 -right-6 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen size={140} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Notices */}
        <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-10 rounded-[32px]">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quick Notices</h2>
                    <button className="text-blue-600 text-sm font-black uppercase tracking-widest hover:underline">Mark all as read</button>
                </div>
                
                <div className="space-y-8">
                    {[
                        { title: 'New Campus Event: AI Symposium 2024', desc: 'Join leading experts in the Main Auditorium this Friday for a deep dive into neural architectures.', time: '2 hours ago • Campus Admin', icon: Sparkles, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { title: 'Library Extended Hours', desc: 'Starting Monday, the West Library will remain open 24/7 for mid-term preparation.', time: '5 hours ago • Library Services', icon: Bell, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    ].map((notice, i) => (
                        <div key={i} className="flex gap-6 group cursor-pointer">
                            <div className={`w-14 h-14 rounded-2xl ${notice.bg} ${notice.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                <notice.icon size={24} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">{notice.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{notice.desc}</p>
                                <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest pt-2">{notice.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Chart Redux */}
            <div className="glass-card p-10 rounded-[32px]">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-800">Academic Analytics</h3>
                        <p className="text-slate-400 text-sm mt-1">Growth trajectory across semesters.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100">Semester V</button>
                    </div>
                </div>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                        <defs>
                        <linearGradient id="colorScore2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore2)" strokeWidth={4} />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* AI Assistant Section */}
        <div className="space-y-8">
            <RecentActivity />
        </div>

            {/* Quick Actions / System Stats Card */}
            <div className="glass-card p-8 rounded-[32px] space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest">Campus Live</h4>
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary p-4 rounded-2xl">
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Canteen Load</p>
                        <p className="text-lg font-black text-foreground">Moderate</p>
                    </div>
                    <div className="bg-secondary p-4 rounded-2xl">
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Lib Capacity</p>
                        <p className="text-lg font-black text-foreground">42%</p>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}
