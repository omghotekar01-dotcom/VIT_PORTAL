'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle2, 
  ChevronRight,
  Zap,
  BarChart3,
  Star,
  FileText,
  AlertCircle
} from 'lucide-react'

const kpiData = [
  { label: 'Teaching Quality', score: 4.8, max: 5.0, status: 'Exceeds Expectations' },
  { label: 'Research Output', score: 3.5, max: 5.0, status: 'Meets Expectations' },
  { label: 'Student Feedback', score: 4.6, max: 5.0, status: 'Exceeds Expectations' },
  { label: 'Admin Contributions', score: 4.2, max: 5.0, status: 'Exceeds Expectations' },
]

export default function FacultyAppraisalPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
               Faculty Appraisal <TrendingUp className="text-primary" />
            </h1>
            <p className="text-slate-500 font-medium">Performance monitoring and career growth tracking for AY 2025-26.</p>
         </div>
         <div className="bg-white px-8 py-4 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate Score</p>
               <p className="text-3xl font-black text-primary">4.28 / 5</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
               <Award size={24} />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {kpiData.map((kpi, i) => (
                 <motion.div
                   key={i}
                   whileHover={{ y: -5 }}
                   className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6"
                 >
                    <div className="flex items-center justify-between">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <Target size={24} />
                       </div>
                       <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={10} fill={s <= Math.round(kpi.score) ? '#3b82f6' : 'none'} stroke={s <= Math.round(kpi.score) ? '#3b82f6' : '#e2e8f0'} />
                          ))}
                       </div>
                    </div>
                    <div>
                       <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{kpi.label}</h4>
                       <p className="text-xs font-bold text-primary mt-1">{kpi.status}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                       <p className="text-2xl font-black text-slate-800">{kpi.score} <span className="text-xs text-slate-400">/ {kpi.max}</span></p>
                       <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all flex items-center gap-1">
                          Details <ChevronRight size={14} />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* Achievement Timeline */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <Zap className="text-primary" size={24} /> Recent Milestones
               </h3>
               <div className="space-y-8">
                  {[
                    { title: 'Best Teacher Award 2024', date: 'Sept 05, 2024', desc: 'Recognized for excellence in pedagogy and student engagement in ES&H department.' },
                    { title: 'Research Publication: IEEE Access', date: 'Aug 12, 2024', desc: 'Published high-impact paper on Optimized Neural Architectures.' },
                    { title: 'Grant Approval: DST-SERB', date: 'June 10, 2024', desc: 'Received research grant of INR 25 Lakhs for Smart Campus projects.' },
                  ].map((m, i) => (
                    <div key={i} className="flex gap-6 group">
                       <div className="w-1.5 rounded-full bg-slate-100 group-hover:bg-primary/20 transition-all shrink-0" />
                       <div className="space-y-2">
                          <div className="flex items-center gap-3">
                             <h5 className="font-black text-slate-800 uppercase tracking-tight">{m.title}</h5>
                             <span className="text-[10px] font-black text-slate-400">{m.date}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">{m.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-10">
               <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Growth Map</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Career Path: Professor Grade II</p>
               </div>
               
               <div className="space-y-8">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Appraisal Progress</p>
                     <p className="text-xl font-black text-primary">85%</p>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                     <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                  </div>
               </div>

               <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 flex items-start gap-4">
                  <AlertCircle className="text-amber-400 shrink-0" size={18} />
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Complete your peer-review feedback by Oct 15 to finalize your annual self-appraisal.
                  </p>
               </div>

               <button className="w-full py-5 rounded-[24px] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                  <FileText size={18} /> Self Appraisal Form
               </button>
            </div>

            <div className="p-10 rounded-[40px] bg-blue-500/5 border border-blue-500/10 text-center space-y-6">
               <BarChart3 size={40} className="text-primary mx-auto" />
               <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Analytics Hub</h4>
               <p className="text-xs text-slate-500 font-medium">Dive deep into your course analytics and student performance trends.</p>
               <button className="w-full py-4 rounded-2xl bg-white border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-600 hover:text-primary transition-all">
                  Open Analytics
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}
