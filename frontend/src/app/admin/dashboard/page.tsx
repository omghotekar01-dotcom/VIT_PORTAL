'use client'

import { motion } from 'framer-motion'
import { 
  Users, GraduationCap, Building2, Activity, ArrowUpRight, ShieldCheck,
  BookOpen, Calendar, AlertTriangle, CheckCircle2
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import Link from 'next/link'

const deptData = [
  { name: 'Computer', students: 850 },
  { name: 'IT', students: 420 },
  { name: 'Mechanical', students: 600 },
  { name: 'ENTC', students: 580 },
  { name: 'Chemical', students: 320 },
]

const yearData = [
  { name: 'FY', value: 720, color: '#3b82f6' },
  { name: 'SY', value: 680, color: '#8b5cf6' },
  { name: 'TY', value: 750, color: '#10b981' },
  { name: 'BTech', value: 620, color: '#f59e0b' },
]

const alerts = [
  { msg: '12 students missing division assignment', type: 'warning' },
  { msg: '3 faculty have no subject assigned', type: 'warning' },
  { msg: 'Timetable conflict: Prof. Sharma on Mon 10AM', type: 'error' },
  { msg: 'Bulk import of 45 students completed', type: 'success' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg mt-1">Campus management overview and system alerts.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
          <ShieldCheck className="text-red-500" size={14} />
          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Administrative Control</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '2,770', sub: '+12% from last year', icon: GraduationCap, color: 'text-primary', href: '/admin/students' },
          { label: 'Faculty Members', value: '184', sub: '98% assigned', icon: Users, color: 'text-purple-500', href: '/admin/faculty' },
          { label: 'Departments', value: '6', sub: 'All active', icon: Building2, color: 'text-emerald-500', href: '#' },
          { label: 'Active Lectures', value: '342', sub: 'This week', icon: Calendar, color: 'text-amber-500', href: '/admin/timetable' },
        ].map((stat, i) => (
          <Link key={stat.label} href={stat.href}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-6 rounded-2xl group hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors" size={16} />
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-foreground mt-1">{stat.value}</h3>
              <p className="text-[10px] text-muted-foreground mt-2">{stat.sub}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Department Distribution */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-black text-foreground mb-6">Department-wise Students</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }} />
                <Bar dataKey="students" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Year Distribution Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-black text-foreground mb-6">Year-wise Split</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={yearData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {yearData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {yearData.map(y => (
              <div key={y.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: y.color }} />
                <span className="text-xs font-bold text-muted-foreground">{y.name}: {y.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-black text-foreground mb-6">System Alerts</h3>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border ${
                a.type === 'error' ? 'bg-red-500/5 border-red-500/10' : 
                a.type === 'warning' ? 'bg-amber-500/5 border-amber-500/10' : 'bg-emerald-500/5 border-emerald-500/10'
              }`}>
                {a.type === 'error' ? <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} /> :
                 a.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} /> :
                 <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />}
                <span className="text-sm text-foreground font-medium">{a.msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-black text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Student', icon: GraduationCap, href: '/admin/students', color: 'bg-primary/10 text-primary' },
              { label: 'Assign Faculty', icon: Users, href: '/admin/faculty', color: 'bg-purple-500/10 text-purple-500' },
              { label: 'Setup Timetable', icon: Calendar, href: '/admin/timetable', color: 'bg-emerald-500/10 text-emerald-500' },
              { label: 'View Reports', icon: BookOpen, href: '/admin/reports', color: 'bg-amber-500/10 text-amber-500' },
            ].map(action => (
              <Link key={action.label} href={action.href}>
                <div className="p-6 rounded-2xl bg-secondary border border-border hover:bg-card hover:shadow-lg transition-all cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon size={20} />
                  </div>
                  <p className="text-sm font-black text-foreground">{action.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
