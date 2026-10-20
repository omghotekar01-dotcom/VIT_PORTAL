'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageSquare, 
  Phone, 
  Mail,
  Calendar,
  CheckCircle2,
  ChevronRight,
  User
} from 'lucide-react'

export default function GuardianPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">My Guardian / Mentor</h1>
        <p className="text-muted-foreground mt-2">Personalized academic and professional guidance from your assigned mentor.</p>
      </div>

      <div className="glass-card p-10 rounded-[60px] border-border/50 bg-primary/5 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="w-40 h-40 rounded-[48px] bg-white p-2 shadow-2xl">
            <div className="w-full h-full rounded-[40px] bg-secondary flex items-center justify-center overflow-hidden">
              <User size={80} className="text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-white">
                Assigned Mentor
              </span>
            </div>
            <h2 className="text-3xl font-black text-foreground mb-1">Prof. Meena Kulkarni</h2>
            <p className="text-lg text-muted-foreground font-medium mb-6">Associate Professor · Computer Engineering</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all">
                <MessageSquare size={18} /> Chat Now
              </button>
              <button className="flex items-center gap-2 bg-white text-foreground border border-border px-6 py-3 rounded-2xl font-bold text-sm hover:bg-secondary transition-all">
                <Calendar size={18} /> Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[40px] border-border/50">
          <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Institutional Email</p>
                <p className="text-sm font-bold text-foreground">guardian-support@example.test</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Office Phone</p>
                <p className="text-sm font-bold text-foreground">+91 20 2420 2145</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
          <h3 className="text-xl font-bold text-foreground mb-6">Meeting History</h3>
          <div className="space-y-4">
            {[
              { title: 'Academic Progress Review', date: 'Sep 25, 2025', status: 'Completed' },
              { title: 'Internship Guidance', date: 'Aug 10, 2025', status: 'Completed' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-all">
                <div>
                  <p className="text-sm font-bold text-foreground">{m.title}</p>
                  <p className="text-[10px] text-muted-foreground">{m.date}</p>
                </div>
                <CheckCircle2 className="text-emerald-500" size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
