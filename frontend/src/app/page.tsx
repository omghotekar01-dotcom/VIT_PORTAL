'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Users, ShieldCheck, Briefcase, Sparkles, Shield } from 'lucide-react'
import Link from 'next/link'

const roles = [
  {
    title: 'Student',
    icon: GraduationCap,
    href: '/auth/login?role=student',
    color: 'blue'
  },
  {
    title: 'Faculty',
    icon: Users,
    href: '/auth/login?role=faculty',
    color: 'purple'
  },
  {
    title: 'Dean',
    icon: Shield,
    href: '/auth/login?role=admin',
    color: 'red'
  },
  {
    title: 'TPO',
    icon: Briefcase,
    href: '/auth/login?role=tpo',
    color: 'amber'
  }
]

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.07]" 
        style={{ backgroundImage: 'linear-gradient(currentColor 1.5px, transparent 1.5px), linear-gradient(90deg, currentColor 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-4xl px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="bg-card/80 backdrop-blur-2xl p-8 md:p-20 rounded-[40px] md:rounded-[60px] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.1)] border border-border"
        >
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            >
              <Sparkles size={12} />
              Unified Institutional OS
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Select Your Role</h1>
            <p className="text-slate-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
              Seamless management for the modern campus. Choose your dedicated portal to continue.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link href={role.href} className="group block">
                  <div className="flex flex-col items-center gap-5">
                    <div className="w-24 h-24 rounded-[32px] bg-card border border-border shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-blue-600/10 group-hover:border-blue-600/20">
                      <role.icon size={32} className="text-slate-400 group-hover:text-blue-600 transition-colors duration-500" />
                    </div>
                    <span className="text-sm font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{role.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="pt-16 border-t border-slate-50">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-blue-600" size={24} />
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Secure Institutional Login</h2>
              </div>
              
              <p className="text-slate-400 text-sm font-medium text-center max-w-sm mb-10 leading-relaxed">
                Our encrypted gateway ensures your academic data remains private and secure. 
              </p>

              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Smart ID Detection Active
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="mt-12 text-center space-y-4">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">© 2024 VIT PUNE • ADVANCED ACADEMIC SYSTEMS</p>
        </div>
      </div>
    </main>
  )
}
