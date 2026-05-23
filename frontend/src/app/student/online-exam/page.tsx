'use client'

import { motion } from 'framer-motion'
import { 
  Monitor, 
  Clock, 
  Play, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Lock
} from 'lucide-react'

export default function OnlineExamPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Online Examination</h1>
        <p className="text-muted-foreground mt-1">Attempt scheduled MCQ tests and online assessments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-12 rounded-[60px] border-border/50 bg-primary/5 text-center flex flex-col items-center justify-center">
             <div className="w-20 h-20 rounded-[32px] bg-primary/10 flex items-center justify-center mb-6">
               <Lock className="text-primary" size={40} />
             </div>
             <h3 className="text-2xl font-black text-foreground mb-4">Exam Portal Locked</h3>
             <p className="text-muted-foreground max-w-sm mb-8">
               There are no active examinations at this moment. Tests will automatically appear here 15 minutes before the scheduled start time.
             </p>
             <div className="flex gap-4">
                <div className="p-4 rounded-2xl bg-white border border-border text-left min-w-[200px]">
                   <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">System Status</p>
                   <div className="flex items-center gap-2 text-emerald-500 font-bold">
                      <CheckCircle2 size={16} /> Ready
                   </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border text-left min-w-[200px]">
                   <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Next Scheduled</p>
                   <p className="text-sm font-bold text-foreground">Nov 15, 10:00 AM</p>
                </div>
             </div>
          </div>
          
          <div className="glass-card p-8 rounded-[40px] border-border/50">
             <h3 className="text-xl font-bold text-foreground mb-6">Instructions for Online Exams</h3>
             <div className="space-y-4">
                {[
                  'Ensure a stable internet connection before starting.',
                  'Use a laptop or desktop with a functional webcam.',
                  'Opening other tabs or windows will trigger a warning.',
                  'The test will auto-submit once the timer expires.'
                ].map((inst, i) => (
                  <div key={i} className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 text-[10px] font-bold">{i+1}</div>
                     <p className="text-sm text-muted-foreground">{inst}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
            <h3 className="text-xl font-bold text-foreground mb-6">Exam History</h3>
            <div className="space-y-4">
              {[
                { name: 'Unit Test 1', score: '18/20', date: 'Aug 20' },
                { name: 'Practice Quiz', score: '25/25', date: 'Sep 05' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border">
                  <div>
                    <p className="text-sm font-bold text-foreground">{h.name}</p>
                    <p className="text-[10px] text-muted-foreground">{h.date}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{h.score}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex items-start gap-4">
            <AlertCircle className="text-red-500 shrink-0" size={24} />
            <div>
              <h4 className="text-sm font-bold text-red-500">Warning</h4>
              <p className="text-xs text-red-400 mt-1">
                Any attempt to bypass the proctoring system will result in immediate disqualification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
