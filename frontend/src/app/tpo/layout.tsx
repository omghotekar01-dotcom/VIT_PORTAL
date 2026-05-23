'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { Chatbot } from '@/components/dashboard/Chatbot'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, User, Briefcase } from 'lucide-react'

export default function TPOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Sidebar role="tpo" />
      <Chatbot />
      
      {/* Main Content */}
      <div className="pl-[80px] md:pl-[280px] transition-all duration-300">
        {/* Header */}
        <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 bg-white/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
              <Briefcase className="text-amber-600" size={12} />
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Placement Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Prof. Rajesh K.</p>
                <p className="text-[11px] text-slate-500 font-medium">TPO Head</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                <User size={20} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </div>
  )
}
