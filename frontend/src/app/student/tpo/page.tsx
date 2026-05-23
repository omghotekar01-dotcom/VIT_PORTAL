'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Award,
  TrendingUp,
  FileText,
  X,
  Zap,
  Share2,
  Building2
} from 'lucide-react'
import { useState } from 'react'

const jobs = [
  { id: 'J-2025-01', company: 'Google', role: 'Software Engineer (L3)', location: 'Bangalore / Remote', package: '32.5 LPA', deadline: 'Oct 15, 2025', status: 'Open', color: 'bg-blue-500' },
  { id: 'J-2025-02', company: 'Microsoft', role: 'Applied Scientist', location: 'Hyderabad', package: '28.0 LPA', deadline: 'Oct 20, 2025', status: 'Applied', color: 'bg-indigo-600' },
  { id: 'J-2025-03', company: 'NVIDIA', role: 'Hardware Engineer', location: 'Pune', package: '24.0 LPA', deadline: 'Oct 12, 2025', status: 'Open', color: 'bg-emerald-500' },
  { id: 'J-2025-04', company: 'Amazon', role: 'Cloud Associate', location: 'Bangalore', package: '22.0 LPA', deadline: 'Nov 01, 2025', status: 'Open', color: 'bg-orange-500' },
]

export default function TPOPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [applying, setApplying] = useState(false)

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
               Career & Placements <Sparkles className="text-primary animate-pulse" />
            </h1>
            <p className="text-slate-500 font-medium text-lg">Your gateway to the world's leading technology companies.</p>
         </div>
         <div className="flex gap-4">
            <button className="bg-white border border-slate-200 text-slate-400 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-primary transition-all flex items-center gap-2">
               <FileText size={18} /> My Resume
            </button>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
               Placement Stats
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Job Board */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
               <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by Company, Role or Skills..." 
                    className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none"
                  />
               </div>
               <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-all">
                  <Filter size={20} />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {jobs.map((job, i) => (
                 <motion.div
                   key={job.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   onClick={() => setSelectedJob(job)}
                   className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden"
                 >
                    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-5 -mr-10 -mt-10", job.color)}></div>
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100 group-hover:scale-110 transition-transform">
                          <Building2 className="text-slate-400 group-hover:text-primary transition-colors" size={28} />
                       </div>
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                         job.status === 'Applied' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/5 text-primary'
                       )}>
                          {job.status}
                       </span>
                    </div>

                    <div className="space-y-4 relative z-10">
                       <div>
                          <h4 className="text-xl font-black text-slate-800 uppercase leading-tight group-hover:text-primary transition-colors">{job.role}</h4>
                          <p className="text-sm font-black text-slate-400 uppercase tracking-tighter mt-1">{job.company}</p>
                       </div>
                       
                       <div className="space-y-3 pt-4 border-t border-slate-50">
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                             <MapPin size={14} className="text-slate-300" /> {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                             <IndianRupee size={14} className="text-emerald-500" /> {job.package}
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Calendar size={12} /> Deadline: {job.deadline}
                       </div>
                       <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Stats & Tips */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[50px] text-white relative overflow-hidden">
               <div className="absolute bottom-0 right-0 p-8 opacity-10">
                  <TrendingUp size={120} />
               </div>
               <div className="relative z-10 space-y-10">
                  <div>
                     <h3 className="text-2xl font-black tracking-tight uppercase">Hiring Momentum</h3>
                     <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">45+ Companies visiting in Oct</p>
                  </div>
                  
                  <div className="space-y-8">
                     <div className="flex justify-between items-center">
                        <div>
                           <p className="text-3xl font-black text-white">1,240</p>
                           <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Total Offers FY 25</p>
                        </div>
                        <div className="text-right">
                           <p className="text-3xl font-black text-primary">54 LPA</p>
                           <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Highest Package</p>
                        </div>
                     </div>
                     
                     <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 space-y-4">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Your Eligibility</p>
                        <div className="flex items-center gap-4">
                           <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                           </div>
                           <span className="text-sm font-black text-white">85%</span>
                        </div>
                        <p className="text-[9px] font-medium text-white/30 italic">Target: Increase CGPA above 9.0 for Tier-1 roles.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-10 rounded-[40px] border border-slate-100 space-y-8">
               <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <Award size={20} className="text-amber-500" /> TPO Checklist
               </h4>
               <ul className="space-y-4">
                  {[
                    'Upload latest Semester 5 marksheets.',
                    'Keep 5 copies of Physical Resume ready.',
                    'Complete the "Mock Interview" module.',
                    'Update LinkedIn profile in TPO portal.'
                  ].map((rule, i) => (
                    <li key={i} className="flex gap-4 text-xs font-bold text-slate-500 leading-relaxed">
                       <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> {rule}
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>

      {/* Job Details Modal */}
      <AnimatePresence>
         {selectedJob && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJob(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-3xl rounded-[50px] shadow-2xl overflow-hidden"
              >
                 <div className="p-12 space-y-10">
                    <div className="flex justify-between items-start">
                       <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                             <Building2 className="text-slate-400" size={40} />
                          </div>
                          <div>
                             <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{selectedJob.company}</h3>
                             <p className="text-sm font-black text-primary uppercase tracking-widest">{selectedJob.role}</p>
                          </div>
                       </div>
                       <button onClick={() => setSelectedJob(null)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 transition-all">
                          <X size={24} />
                       </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-100">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package</p>
                          <p className="text-sm font-black text-slate-800">{selectedJob.package}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                          <p className="text-sm font-black text-slate-800">{selectedJob.location}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</p>
                          <p className="text-sm font-black text-slate-800">Full-time</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hiring ID</p>
                          <p className="text-sm font-black text-slate-800">{selectedJob.id}</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h5 className="text-sm font-black uppercase tracking-widest text-slate-900">Job Description</h5>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          We are looking for a high-performing individual to join our technology team. You will be working on cutting-edge systems, solving complex problems at scale. Experience with Distributed Systems, Algorithms, and System Design is highly preferred.
                       </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                       <button 
                         onClick={() => {
                           setApplying(true)
                           setTimeout(() => {
                             setApplying(false)
                             setSelectedJob(null)
                             alert('Application submitted successfully to ' + selectedJob.company)
                           }, 2000)
                         }}
                         disabled={selectedJob.status === 'Applied' || applying}
                         className="flex-1 py-6 rounded-[28px] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                       >
                          {applying ? <Zap className="animate-pulse" size={20} /> : <Briefcase size={20} />}
                          {selectedJob.status === 'Applied' ? 'Already Applied' : applying ? 'Submitting Resume...' : 'Apply for this Role'}
                       </button>
                       <button className="px-8 py-6 rounded-[28px] bg-slate-100 text-slate-400 hover:text-primary transition-all">
                          <Share2 size={24} />
                       </button>
                    </div>
                 </div>
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
