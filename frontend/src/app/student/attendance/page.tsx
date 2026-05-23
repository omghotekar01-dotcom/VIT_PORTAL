'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Info,
  Filter,
  Download,
  BookOpen
} from 'lucide-react'
import { useState } from 'react'

const subjectAttendance = [
  { id: 1, name: 'Machine Learning', percentage: 88, attended: 22, total: 25, faculty: 'Dr. S. K. Gupta' },
  { id: 2, name: 'Cyber Security', percentage: 75, attended: 18, total: 24, faculty: 'Prof. Anjali R.' },
  { id: 3, name: 'Cloud Computing', percentage: 92, attended: 23, total: 25, faculty: 'Dr. Vikas M.' },
  { id: 4, name: 'Data Mining', percentage: 65, attended: 13, total: 20, faculty: 'Prof. Rahul S.' },
]

const recentLogs = [
  { date: 'Oct 01, 2025', subject: 'Machine Learning', status: 'Present', time: '09:00 AM' },
  { date: 'Oct 01, 2025', subject: 'Cyber Security', status: 'Present', time: '11:00 AM' },
  { date: 'Sept 30, 2025', subject: 'Cloud Computing', status: 'Absent', time: '10:00 AM' },
  { date: 'Sept 29, 2025', subject: 'Data Mining', status: 'Present', time: '01:00 PM' },
  { date: 'Sept 29, 2025', subject: 'Machine Learning', status: 'Present', time: '09:00 AM' },
]

export default function AttendancePage() {
  const [selectedSubject, setSelectedSubject] = useState('All')

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Attendance Hub</h1>
          <p className="text-muted-foreground font-medium">Monitor your subject-wise attendance and daily logs.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
           <Download size={18} /> Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Overall %', value: '82%', icon: BarChart3, color: 'text-primary' },
           { label: 'Total Classes', value: '94', icon: Calendar, color: 'text-blue-500' },
           { label: 'Present', value: '76', icon: CheckCircle2, color: 'text-emerald-500' },
           { label: 'Absent', value: '18', icon: XCircle, color: 'text-rose-500' },
         ].map((stat, i) => (
           <div key={i} className="glass-card p-6 rounded-[32px] border-border/50 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center ${stat.color}`}>
                 <stat.icon size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                 <p className="text-xl font-black text-foreground">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Subject-wise Cards */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Subject Wise Tracking</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjectAttendance.map((sub, i) => (
                <motion.div
                  key={sub.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-[40px] border border-border/50 shadow-sm group cursor-pointer"
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-all">
                         <BookOpen size={24} />
                      </div>
                      <div className="text-right">
                         <p className="text-2xl font-black text-foreground">{sub.percentage}%</p>
                         <p className={`text-[9px] font-black uppercase tracking-widest ${sub.percentage < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {sub.percentage < 75 ? 'Shortage' : 'Safe'}
                         </p>
                      </div>
                   </div>
                   <h4 className="text-lg font-bold text-foreground mb-1">{sub.name}</h4>
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-6">{sub.faculty}</p>
                   
                   <div className="space-y-4">
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${sub.percentage}%` }}
                           className={`h-full ${sub.percentage < 75 ? 'bg-rose-500' : 'bg-primary'}`}
                         />
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                         <span>{sub.attended} Attended</span>
                         <span>{sub.total} Total Sessions</span>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Detailed Logs */}
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
              <button className="p-2 text-muted-foreground hover:text-primary transition-all">
                 <Filter size={20} />
              </button>
           </div>
           <div className="space-y-4">
              {recentLogs.map((log, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-border/50 flex items-center gap-4 group hover:border-primary/30 transition-all">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                     log.status === 'Present' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                   }`}>
                      {log.status === 'Present' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{log.subject}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{log.date} · {log.time}</p>
                   </div>
                   <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                     log.status === 'Present' ? 'bg-emerald-500/5 text-emerald-500' : 'bg-rose-500/5 text-rose-500'
                   }`}>
                      {log.status}
                   </span>
                </div>
              ))}
              <button className="w-full py-4 rounded-2xl bg-secondary text-muted-foreground font-bold text-xs uppercase tracking-widest hover:text-foreground transition-all">
                 View Full Logs
              </button>
           </div>
           
           <div className="p-6 rounded-[32px] bg-amber-500/5 border border-amber-500/20 flex items-start gap-4">
              <Info className="text-amber-500 shrink-0" size={20} />
              <p className="text-[10px] text-amber-700/80 font-medium leading-relaxed">
                 Attendance below <span className="font-bold">75%</span> may lead to debarment from end-semester examinations. Please contact your coordinator.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
