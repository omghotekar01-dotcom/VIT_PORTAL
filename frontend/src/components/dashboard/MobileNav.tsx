'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, User, LogOut, Bell, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  items: any[]
  role: string
}

export const MobileNav = ({ items, role }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      {/* Top Mobile Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-md border-b border-border z-[100] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-border/50">
            <img 
              src="/vit-logo.jpg" 
              alt="VIT PUNE" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-black text-lg text-foreground tracking-tighter uppercase">VIT PUNE</span>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-secondary rounded-2xl text-foreground shadow-sm transition-all active:scale-95"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Slide-over Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-card border-l border-border z-[101] shadow-2xl overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Navigation</h3>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-xl transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                        <div className={cn(
                          "flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all",
                          isActive 
                            ? "bg-primary text-white shadow-xl shadow-primary/20" 
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}>
                          <item.icon size={20} />
                          <span className="font-bold text-sm">{item.label}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                <div className="pt-8 border-t border-border">
                  <button className="w-full flex items-center gap-4 px-6 py-4 rounded-[20px] text-rose-500 bg-rose-500/5 hover:bg-rose-500 hover:text-white transition-all font-bold">
                    <LogOut size={20} />
                    Logout Account
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
