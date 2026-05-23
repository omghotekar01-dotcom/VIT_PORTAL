'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  MessageCircle, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Send,
  X,
  Zap,
  FileText
} from 'lucide-react'
import { useState } from 'react'

const initialGrievances = [
  { id: 'GR-821', category: 'Academic', subject: 'Re-evaluation of MSE Marks', status: 'Pending', date: 'Oct 01, 2025', priority: 'High' },
  { id: 'GR-754', category: 'Hostel', subject: 'Water supply issue in Block B', status: 'Resolved', date: 'Sept 20, 2025', priority: 'Medium' },
  { id: 'GR-690', category: 'Library', subject: 'Issue with E-Resource access', status: 'Closed', date: 'Sept 05, 2025', priority: 'Low' },
]

export default function GrievancePage() {
  const [grievances, setGrievances] = useState(initialGrievances)
  const [showNew, setShowNew] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNewGrievance = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setShowNew(false)
    alert('Grievance filed successfully. Tracking ID: GR-' + Math.floor(Math.random() * 1000))
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
               Grievance Redressal <AlertTriangle className="text-rose-500" />
            </h1>
            <p className="text-slate-500 font-medium">A dedicated portal to address and resolve your concerns efficiently.</p>
         </div>
         <button 
           onClick={() => setShowNew(true)}
           className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3"
         >
            <Plus size={20} /> File New Grievance
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Grievance List */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
               <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by Tracking ID or Subject..." 
                    className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none"
                  />
               </div>
               <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-all">
                  <Filter size={20} />
               </button>
            </div>

            <div className="space-y-4">
               {grievances.map((gr, i) => (
                 <motion.div
                   key={gr.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group flex flex-col md:flex-row md:items-center gap-8"
                 >
                    <div className={cn(
                      "w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0",
                      gr.status === 'Pending' ? 'bg-amber-50 text-amber-500' : 
                      gr.status === 'Resolved' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'
                    )}>
                       {gr.status === 'Pending' ? <Clock size={28} /> : 
                        gr.status === 'Resolved' ? <CheckCircle2 size={28} /> : <FileText size={28} />}
                    </div>

                    <div className="flex-1 space-y-1">
                       <div className="flex items-center gap-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{gr.id} · {gr.category}</p>
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                            gr.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                          )}>
                             {gr.priority} Priority
                          </span>
                       </div>
                       <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight group-hover:text-primary transition-colors">{gr.subject}</h4>
                       <p className="text-xs text-slate-500 font-bold">{gr.date}</p>
                    </div>

                    <div className="flex items-center gap-4">
                       <div className="text-right hidden md:block">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Current Status</p>
                          <p className={cn(
                            "text-xs font-black uppercase tracking-widest",
                            gr.status === 'Pending' ? 'text-amber-500' : 
                            gr.status === 'Resolved' ? 'text-emerald-500' : 'text-slate-400'
                          )}>{gr.status}</p>
                       </div>
                       <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ChevronRight size={20} />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-10">
               <div>
                  <h3 className="text-2xl font-black tracking-tight uppercase">Resolution Pulse</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Average Turnaround: 48 Hours</p>
               </div>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Resolution Rate</p>
                     <p className="text-2xl font-black text-emerald-400">92%</p>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                     <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-emerald-400" />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 text-center">
                     <p className="text-2xl font-black text-white">12</p>
                     <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Resolved</p>
                  </div>
                  <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 text-center">
                     <p className="text-2xl font-black text-amber-400">2</p>
                     <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">In Review</p>
                  </div>
               </div>
            </div>

            <div className="p-10 rounded-[40px] bg-rose-500/5 border border-rose-500/10 space-y-6 text-center">
               <ShieldAlert size={40} className="text-rose-500 mx-auto" />
               <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Escalation Policy</h4>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  If your grievance is not addressed within 72 hours, it will be automatically escalated to the Dean of Student Affairs.
               </p>
            </div>
         </div>
      </div>

      {/* New Grievance Modal */}
      <AnimatePresence>
        {showNew && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowNew(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative bg-white w-full max-w-2xl rounded-[50px] shadow-2xl overflow-hidden"
             >
                <form onSubmit={handleNewGrievance} className="p-12 space-y-8">
                   <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight">New Grievance</h3>
                      <button type="button" onClick={() => setShowNew(false)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 transition-all">
                         <X size={24} />
                      </button>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Concern Category</label>
                         <select className="w-full bg-slate-50 border-none rounded-[20px] px-6 py-4 text-sm font-bold text-slate-800 outline-none">
                            <option>Academic Affairs</option>
                            <option>Examination & Results</option>
                            <option>Hostel & Infrastructure</option>
                            <option>Library & E-Resources</option>
                            <option>Financial & Fees</option>
                         </select>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Subject / Headline</label>
                         <input 
                           required
                           placeholder="Short summary of the issue..."
                           className="w-full bg-slate-50 border-none rounded-[20px] px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                         />
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Detailed Description</label>
                         <textarea 
                           required
                           rows={4}
                           placeholder="Explain the concern in detail..."
                           className="w-full bg-slate-50 border-none rounded-[32px] px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                         />
                      </div>
                   </div>

                   <button 
                     disabled={loading}
                     className="w-full py-6 rounded-[28px] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                   >
                      {loading ? <Zap className="animate-pulse" size={20} /> : <Send size={20} />}
                      {loading ? 'Submitting File...' : 'File Grievance Now'}
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
