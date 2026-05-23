'use client'

import { motion } from 'framer-motion'
import { 
  Beaker, 
  Clock, 
  Calendar, 
  AlertTriangle,
  ChevronRight,
  FileText
} from 'lucide-react'

export default function LabExamPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Lab Examination</h1>
        <p className="text-muted-foreground mt-1">Schedules, marks, and lab assessment tracking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-12 rounded-[60px] border-border/50 bg-secondary/10 text-center flex flex-col items-center justify-center">
             <div className="w-20 h-20 rounded-[32px] bg-primary/10 flex items-center justify-center mb-6">
               <Beaker className="text-primary" size={40} />
             </div>
             <h3 className="text-2xl font-black text-foreground mb-4">No Active Lab Exams</h3>
             <p className="text-muted-foreground max-w-sm mb-8">
               Lab examinations for the current semester have not been scheduled yet. You will be notified once the timetable is released.
             </p>
             <button className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
               View General Instructions <ChevronRight size={18} />
             </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
            <h3 className="text-xl font-bold text-foreground mb-6">Evaluation Criteria</h3>
            <div className="space-y-4">
              {[
                { name: 'Practical Performance', weight: '40%' },
                { name: 'Viva Voce', weight: '30%' },
                { name: 'Journal / Records', weight: '30%' },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border">
                  <p className="text-sm font-bold text-foreground">{c.name}</p>
                  <p className="text-sm font-bold text-primary">{c.weight}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
            <div>
              <h4 className="text-sm font-bold text-amber-500">Important Note</h4>
              <p className="text-xs text-amber-400 mt-1">
                Carry your certified journals and lab manuals for all practical examinations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
