'use client'

import { motion } from 'framer-motion'
import { 
  Rocket, 
  Users, 
  Upload, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  FileText
} from 'lucide-react'

export default function ProjectMonitoringPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Monitoring</h1>
          <p className="text-muted-foreground mt-1">Track your capstone and mini-project progress.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={18} /> Submit Weekly Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50 relative overflow-hidden">
            <div className="absolute top-8 right-8">
               <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center text-xs font-black">
                 65%
               </div>
            </div>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-3xl bg-orange-500/10 flex items-center justify-center">
                <Rocket className="text-orange-500" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground">Next-Gen Campus AI</h3>
                <p className="text-muted-foreground">Final Year Project · Group ID: FY-24-CS</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Guide</p>
                <p className="text-sm font-bold text-foreground">Dr. Elizabeth Vance</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Domain</p>
                <p className="text-sm font-bold text-foreground">AI / ML</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Next Review</p>
                <p className="text-sm font-bold text-primary">Oct 28, 2025</p>
              </div>
            </div>
            
            <h4 className="text-sm font-bold text-foreground mb-4">Project Members</h4>
            <div className="flex items-center gap-3">
               {['AS', 'RJ', 'MP'].map((m, i) => (
                 <div key={i} className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                   {m}
                 </div>
               ))}
               <button className="w-10 h-10 rounded-full border border-dashed border-border flex items-center justify-center text-muted-foreground hover:bg-primary/5 transition-all">
                 <Plus size={16} />
               </button>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[40px] border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-6">Recent Updates</h3>
            <div className="space-y-4">
               {[
                 { title: 'Project Proposal Submitted', date: 'Sep 15', status: 'Approved' },
                 { title: 'Literature Survey Completion', date: 'Sep 30', status: 'Approved' },
                 { title: 'Dataset Collection', date: 'Oct 10', status: 'In Review' },
               ].map((u, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/50 group hover:border-primary/30 transition-all">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                       <FileText size={20} className="text-primary" />
                     </div>
                     <div>
                       <p className="text-sm font-bold text-foreground">{u.title}</p>
                       <p className="text-[10px] text-muted-foreground">{u.date}</p>
                     </div>
                   </div>
                   <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                     u.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                   }`}>
                     {u.status}
                   </span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
            <h3 className="text-xl font-bold text-foreground mb-6">Submission Queue</h3>
            <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-background border border-border">
                  <p className="text-xs font-bold text-foreground mb-2">Phase 1 Report</p>
                  <button className="w-full bg-primary/10 text-primary py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    Upload PDF
                  </button>
               </div>
               <div className="p-4 rounded-2xl bg-background border border-border">
                  <p className="text-xs font-bold text-foreground mb-2">Presentation Slides</p>
                  <button className="w-full bg-primary/10 text-primary py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    Upload PPT
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Plus({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}
