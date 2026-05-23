'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Settings, LayoutDashboard, Search } from 'lucide-react'

export default function IsoPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">iso Portal</h1>
          <p className="text-muted-foreground mt-1">Quality assurance and compliance</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-secondary text-foreground rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-secondary/80 transition-all">
              <Search size={16} /> Search
           </button>
           <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <Settings size={16} /> Configuration
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="glass-card p-6 rounded-[24px] border-border/50 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
               <LayoutDashboard size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Audit Forms</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">Access audit forms management and settings.</p>
            
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
               Access Module <ArrowRight size={12} />
            </div>
         </motion.div>
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-[24px] border-border/50 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
               <LayoutDashboard size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">SOPs</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">Access sops management and settings.</p>
            
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
               Access Module <ArrowRight size={12} />
            </div>
         </motion.div>
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-[24px] border-border/50 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
               <LayoutDashboard size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Compliance Check</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">Access compliance check management and settings.</p>
            
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
               Access Module <ArrowRight size={12} />
            </div>
         </motion.div>
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.30000000000000004 }}
            className="glass-card p-6 rounded-[24px] border-border/50 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
               <LayoutDashboard size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Documents</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">Access documents management and settings.</p>
            
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
               Access Module <ArrowRight size={12} />
            </div>
         </motion.div>
      </div>

      <div className="glass-card p-12 rounded-[40px] border-border/50 bg-secondary/20 flex flex-col items-center justify-center text-center mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="text-2xl font-black text-foreground mb-3 flex items-center gap-2">
          VIERP Extended Modules <Sparkles className="text-primary" size={20} />
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          The <strong>iso</strong> interface is currently displaying VIERP standard components. Sub-module data is synchronized with EduPlus backend automatically.
        </p>
      </div>
    </div>
  )
}
