'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  X, 
  Send, 
  Zap, 
  Info,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react'
import { useState } from 'react'

const leaveStats = [
  { label: 'Casual Leaves', taken: 4, total: 12, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Sick Leaves', taken: 2, total: 10, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Duty Leaves', taken: 5, total: 15, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Vacation', taken: 10, total: 30, color: 'text-purple-600', bg: 'bg-purple-50' },
]

const recentApplications = [
  { id: 'LV-901', type: 'Casual Leave', range: 'Oct 10 - Oct 12', status: 'Approved', days: 3 },
  { id: 'LV-842', type: 'Duty Leave', range: 'Sept 15 - Sept 15', status: 'Approved', days: 1 },
  { id: 'LV-710', type: 'Sick Leave', range: 'Aug 01 - Aug 03', status: 'Approved', days: 3 },
]

export default function FacultyLeavesPage() {
  const [showApply, setShowApply] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleApply = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    setShowApply(false)
    alert('Leave application submitted to HOD for approval.')
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
               Leave Management <Home className="text-primary" />
            </h1>
            <p className="text-slate-500 font-medium">Apply for leaves and track your institutional attendance records.</p>
         </div>
         <button 
           onClick={() => setShowApply(true)}
           className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3"
         >
            <Plus size={20} /> New Leave Application
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
         {leaveStats.map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group"
           >
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                       <Calendar size={18} />
                    </div>
                 </div>
                 <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black text-slate-800">{stat.total - stat.taken}</p>
                    <p className="text-xs font-bold text-slate-400">Remaining</p>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <span>Used: {stat.taken}</span>
                       <span>Total: {stat.total}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(stat.taken / stat.total) * 100}%` }}
                         className={cn("h-full", stat.color.replace('text-', 'bg-'))}
                       />
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
               <FileText className="text-primary" size={24} /> Application History
            </h3>
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                     <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Days</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentApplications.map((app) => (
                       <tr key={app.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-8 py-5">
                             <p className="font-bold text-slate-800">{app.type}</p>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{app.id}</p>
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-slate-500">{app.range}</td>
                          <td className="px-8 py-5 text-center font-black text-slate-800">{app.days}</td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex items-center justify-end gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                                <CheckCircle2 size={14} /> {app.status}
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-8">
               <h3 className="text-2xl font-black uppercase tracking-tight">Policy Insights</h3>
               <div className="space-y-6">
                  <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 flex items-start gap-4">
                     <Info className="text-blue-400 shrink-0" size={18} />
                     <p className="text-[11px] text-white/60 leading-relaxed">Casual leaves must be applied at least 24 hours in advance.</p>
                  </div>
                  <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 flex items-start gap-4">
                     <ShieldCheck className="text-emerald-400 shrink-0" size={18} />
                     <p className="text-[11px] text-white/60 leading-relaxed">Medical certificate required for sick leaves exceeding 3 consecutive days.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <AnimatePresence>
        {showApply && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowApply(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative bg-white w-full max-w-2xl rounded-[50px] shadow-2xl overflow-hidden"
             >
                <form onSubmit={handleApply} className="p-12 space-y-8">
                   <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Apply for Leave</h3>
                      <button type="button" onClick={() => setShowApply(false)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 transition-all">
                         <X size={24} />
                      </button>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2 col-span-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Leave Type</label>
                         <select className="w-full bg-slate-50 border-none rounded-[20px] px-6 py-4 text-sm font-bold text-slate-800 outline-none">
                            <option>Casual Leave</option>
                            <option>Sick Leave</option>
                            <option>Duty Leave</option>
                            <option>Compensatory Off</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Start Date</label>
                         <input type="date" className="w-full bg-slate-50 border-none rounded-[20px] px-6 py-4 text-sm font-bold text-slate-800 outline-none" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">End Date</label>
                         <input type="date" className="w-full bg-slate-50 border-none rounded-[20px] px-6 py-4 text-sm font-bold text-slate-800 outline-none" />
                      </div>
                      <div className="space-y-2 col-span-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Reason for Leave</label>
                         <textarea 
                           required
                           rows={3}
                           placeholder="Describe the reason for leave..."
                           className="w-full bg-slate-50 border-none rounded-[32px] px-6 py-4 text-sm font-bold text-slate-800 outline-none resize-none"
                         />
                      </div>
                   </div>

                   <button 
                     disabled={loading}
                     className="w-full py-6 rounded-[28px] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                   >
                      {loading ? <Zap className="animate-pulse" size={20} /> : <Send size={20} />}
                      {loading ? 'Submitting Application...' : 'Apply Now'}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
