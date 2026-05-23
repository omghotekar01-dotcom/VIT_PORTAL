'use client'

import { motion } from 'framer-motion'
import { 
  Briefcase, 
  Building2, 
  Users, 
  TrendingUp,
  Target,
  FileSearch,
  ExternalLink,
  Plus
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

const placementData = [
  { year: '2022', placed: 850, offers: 1200 },
  { year: '2023', placed: 920, offers: 1450 },
  { year: '2024', placed: 980, offers: 1600 },
  { year: '2025', placed: 1050, offers: 1800 },
]

export default function TPODashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Placement Analytics</h1>
          <p className="text-muted-foreground mt-1 font-medium">Track company visits, offers, and student eligibility.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
          <Plus size={18} /> New Opportunity
        </button>
      </div>

      {/* TPO Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Offers', value: '1,842', icon: Briefcase, color: 'text-amber-500' },
          { label: 'Avg. Package', value: '12.4 LPA', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Highest Package', value: '54.0 LPA', icon: Target, color: 'text-primary' },
          { label: 'Registered Companies', value: '240+', icon: Building2, color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className={`p-3 rounded-xl bg-secondary w-fit mb-4 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-foreground mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Placement Growth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card p-8 rounded-3xl"
        >
          <h3 className="text-xl font-black text-foreground mb-8">Year-on-Year Placement</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="placed" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="offers" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Companies */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl"
        >
          <h3 className="text-xl font-black text-foreground mb-6">Upcoming Visits</h3>
          <div className="space-y-6">
            {[
              { name: 'NVIDIA', date: '02 May', role: 'SWE - AI', pkg: '24-32 LPA' },
              { name: 'Microsoft', date: '05 May', role: 'SDE-1', pkg: '18-44 LPA' },
              { name: 'Adobe', date: '10 May', role: 'UI/UX Eng', pkg: '20-28 LPA' },
            ].map((co, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-secondary border border-border group hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center font-black text-primary">
                  {co.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-foreground font-black">{co.name}</h4>
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest">{co.date}</span>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground mt-1">{co.role}</p>
                  <p className="text-[10px] font-black text-muted-foreground/60 mt-1 uppercase">{co.pkg}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 rounded-2xl border border-border text-foreground text-xs uppercase tracking-[0.2em] font-black hover:bg-secondary transition-all">
            View All Companies
          </button>
        </motion.div>
      </div>

      {/* Student Eligibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-foreground">Student Placement Status</h3>
          <button className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
            Export Report <ExternalLink size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-secondary border border-border">
            <h4 className="text-muted-foreground text-xs font-black uppercase tracking-widest">Eligible Students</h4>
            <p className="text-4xl font-black text-foreground mt-2">1,240</p>
          </div>
          <div className="p-6 rounded-3xl bg-secondary border border-border">
            <h4 className="text-muted-foreground text-xs font-black uppercase tracking-widest">Students Placed</h4>
            <p className="text-4xl font-black text-emerald-500 mt-2">1,050</p>
          </div>
          <div className="p-6 rounded-3xl bg-secondary border border-border">
            <h4 className="text-muted-foreground text-xs font-black uppercase tracking-widest">Placement Ratio</h4>
            <p className="text-4xl font-black text-amber-500 mt-2">84.6%</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

