'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  History, 
  CheckCircle2, 
  Clock, 
  FileText, 
  CreditCard, 
  Award,
  Zap,
  ChevronRight
} from 'lucide-react'

const activities = [
  { id: 1, type: 'academic', title: 'Grade Sheet Viewed', time: '10 mins ago', icon: FileText, color: 'text-blue-500' },
  { id: 2, type: 'attendance', title: 'Attendance Marked', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
  { id: 3, type: 'finance', title: 'Fee Receipt Generated', time: 'Yesterday', icon: CreditCard, color: 'text-amber-500' },
  { id: 4, type: 'system', title: 'Profile Updated', time: '2 days ago', icon: Zap, color: 'text-purple-500' },
  { id: 5, type: 'academic', title: 'Certificate Requested', time: 'Oct 28', icon: Award, color: 'text-rose-500' },
]

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl space-y-8 h-full">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
               <History size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Recent Activity</h3>
         </div>
         <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
            View All <ChevronRight size={14} />
         </button>
      </div>

      <div className="space-y-6">
         {activities.map((act, i) => (
           <motion.div 
             key={act.id}
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.1 }}
             className="flex items-center gap-4 group"
           >
              <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center transition-all group-hover:scale-110 ${act.color}`}>
                 <act.icon size={22} />
              </div>
              <div className="flex-1">
                 <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{act.title}</p>
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    <Clock size={10} /> {act.time}
                 </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-all" />
           </motion.div>
         ))}
      </div>

      <div className="pt-4 border-t border-slate-50">
         <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black text-primary uppercase tracking-widest">Total Logs</p>
               <p className="text-xl font-black text-slate-800">124</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary">
               <History size={18} />
            </div>
         </div>
      </div>
    </div>
  )
}
