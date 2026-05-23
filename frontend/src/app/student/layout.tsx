'use client'

import { Sidebar, studentItems } from '@/components/dashboard/Sidebar'
import { MobileNav } from '@/components/dashboard/MobileNav'
import { Chatbot } from '@/components/dashboard/Chatbot'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar role="student" />
      <MobileNav items={studentItems} role="student" />
      <Chatbot />
      
      {/* Main Content */}
      <div className="lg:pl-[280px] transition-all duration-300">
        {/* Header - Hidden on mobile as MobileNav has its own bar */}
        <header className="h-20 border-b border-border hidden lg:flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-8">
            <div className="relative group max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                <input 
                type="text" 
                placeholder="Search VIT Portal..." 
                className="w-full bg-secondary border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:bg-background focus:border-primary/20 transition-all text-foreground"
                />
            </div>
            
            <nav className="flex items-center gap-6">
                {['Overview', 'Resources', 'Community'].map((tab) => (
                    <button key={tab} className={cn(
                        "text-sm font-bold transition-all relative py-2",
                        tab === 'Overview' ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}>
                        {tab}
                        {tab === 'Overview' && (
                            <motion.div layoutId="header-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                <Sparkles size={16} />
                AI Assist
            </button>
            <button className="relative p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-background"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-foreground">Aryan Sharma</p>
                <p className="text-[11px] text-muted-foreground font-medium">TY B.Tech CSE</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border overflow-hidden">
                <User size={20} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 pt-28 lg:pt-8 max-w-7xl mx-auto">
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
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </div>
  )
}
