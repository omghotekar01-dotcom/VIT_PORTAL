'use client'

import { motion } from 'framer-motion'
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react'

export default function NBAPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">NBA Accreditation</h1>
        <p className="text-muted-foreground mt-1">Institutional quality assurance and student outcome tracking.</p>
      </div>

      <div className="glass-card p-12 rounded-[60px] border-border/50 bg-secondary/10 flex flex-col items-center text-center">
         <div className="w-20 h-20 rounded-[32px] bg-primary/10 flex items-center justify-center mb-6">
           <ShieldCheck className="text-primary" size={40} />
         </div>
         <h2 className="text-2xl font-black text-foreground mb-4">NBA Outcome Tracking</h2>
         <p className="text-muted-foreground max-w-lg mb-8">
           This module tracks Program Outcomes (POs) and Course Outcomes (COs) to ensure the highest standards of technical education as per NBA guidelines.
         </p>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              { label: 'Attainment level', value: 'High', icon: Trophy },
              { label: 'Participation', value: '92%', icon: Award },
              { label: 'NBA Status', value: 'Accredited', icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-[32px] bg-white border border-border">
                 <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                   <stat.icon className="text-primary" size={20} />
                 </div>
                 <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">{stat.label}</p>
                 <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  )
}
