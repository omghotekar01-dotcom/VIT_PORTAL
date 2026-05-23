'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  FileText,
  TrendingUp,
  ArrowRight,
  Clock,
  Calendar,
  Zap,
  Target,
  Rocket,
  Shield,
  MessageSquare,
  History
} from 'lucide-react'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

const classData = [
  { name: 'SY B.Tech A', students: 68, avgAttendance: 84 },
  { name: 'TY B.Tech B', students: 72, avgAttendance: 79 },
  { name: 'FY B.Tech C', students: 65, avgAttendance: 92 },
  { name: 'B.Tech IT-A', students: 70, avgAttendance: 88 },
]

const performanceData = [
  { name: 'Week 1', value: 65 },
  { name: 'Week 2', value: 78 },
  { name: 'Week 3', value: 72 },
  { name: 'Week 4', value: 85 },
  { name: 'Week 5', value: 90 },
]

export default function FacultyDashboard() {
  return (
    <div className="space-y-10 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h1 className="text-4xl font-black text-slate-800 tracking-tight">Madhavi Mohite</h1>
             <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest animate-pulse">Live Dashboard</span>
          </div>
          <p className="text-slate-500 font-medium">Head of Department · Engineering, Science and Humanities</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                 <Users size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Students</p>
                 <p className="text-xl font-black text-slate-800">275</p>
              </div>
           </div>
           <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                 <Rocket size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ongoing Projects</p>
                 <p className="text-xl font-black text-slate-800">12</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Analytics Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 space-y-8"
        >
          {/* Attendance Overview Chart */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Target size={200} />
             </div>
             <div className="flex items-center justify-between mb-10">
                <div>
                   <h3 className="text-2xl font-black text-slate-800 tracking-tight">Class Attendance Analytics</h3>
                   <p className="text-slate-400 text-sm font-medium">Real-time attendance tracking across divisions.</p>
                </div>
                <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none">
                   <option>Semester V</option>
                   <option>Semester IV</option>
                </select>
             </div>
             <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classData}>
                    <defs>
                       <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="avgAttendance" fill="url(#barGradient)" radius={[10, 10, 10, 10]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Quick Task Hub */}
             <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
                <div className="flex items-center justify-between">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Zap className="text-yellow-400" size={24} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-lg">High Priority</span>
                </div>
                <div>
                   <h4 className="text-xl font-black mb-2">Pending Appraisals</h4>
                   <p className="text-white/60 text-sm">You have 4 faculty appraisals pending for this quarter.</p>
                </div>
                <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">
                   Process Now
                </button>
             </div>

             {/* Recent Messages */}
             <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                   <MessageSquare className="text-primary" size={20} /> Latest Feedback
                </h4>
                <div className="space-y-4">
                   {[
                     { from: 'Div-A Students', text: 'Request for extra lecture on Neural Networks...', time: '10m ago' },
                     { from: 'Admin Office', text: 'NBA documentation review meeting at 4 PM.', time: '1h ago' },
                   ].map((msg, i) => (
                     <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center mb-1">
                           <p className="text-xs font-black text-slate-800">{msg.from}</p>
                           <p className="text-[9px] text-slate-400">{msg.time}</p>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{msg.text}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </motion.div>

        {/* Side Info Panel */}
        <div className="lg:col-span-4 space-y-8">
           {/* Current Session Card */}
           <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[40px] text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
                 <Shield size={120} />
              </div>
              <div className="relative z-10 space-y-8">
                 <div>
                    <div className="flex items-center gap-2 mb-4">
                       <Clock size={16} className="text-indigo-200" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Current Session</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight leading-none">Mathematics-II Tutorial</h3>
                    <p className="text-indigo-200 mt-2 font-bold">Division C · Room 1404</p>
                 </div>
                 
                 <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Duration</p>
                       <p className="text-sm font-bold">10:00 - 11:00</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/20" />
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Batch</p>
                       <p className="text-sm font-bold">CSAIML-F</p>
                    </div>
                 </div>

                 <button className="w-full py-4 rounded-2xl bg-white text-indigo-600 font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} /> Mark Attendance
                 </button>
              </div>
           </div>

           {/* Vision & Mission Summary */}
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Rocket size={12} /> Institutional Vision
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                       To be a globally recognized educational institute that provides state-of-the-art engineering and technology education.
                    </p>
                 </div>
                 <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                    <h5 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Target size={12} /> Institutional Mission
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                       To develop globally competent professionals through an innovative and socially responsible educational environment.
                    </p>
                 </div>
              </div>
           </div>

           {/* Quick Activity Panel */}
           <RecentActivity />
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value, progress, color = 'bg-purple-500' }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-end">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-black text-slate-800">{value}</p>
       </div>
       <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             className={`h-full ${color}`}
          />
       </div>
    </div>
  )
}
