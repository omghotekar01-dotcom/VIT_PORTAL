'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, Lock, Mail, ArrowRight, Loader2, Hash, AlertCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'student'
  
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
        setLoading(false)
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      router.push(`/${data.user.role}/dashboard`)
    } catch (err) {
      console.warn('Backend not available, using demo mode')
      localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email, role }))
      router.push(`/${role}/dashboard`)
    } finally {
      setLoading(false)
    }
  }

  const isStudent = role === 'student'

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background p-6">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="bg-card/80 backdrop-blur-2xl p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.1)] border border-border">
          <div className="flex flex-col items-center mb-12">
            <div className="w-24 h-24 rounded-[40px] bg-white text-primary flex items-center justify-center mx-auto mb-6 p-3 shadow-lg border border-slate-100">
              <img 
                src="/vit-logo.jpg" 
                alt="VIT PUNE" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-foreground capitalize tracking-tight">{role} Portal</h2>
              <p className="text-muted-foreground font-medium text-sm md:text-lg">
                {isStudent ? 'Use your college email & PRN number to login.' : 'Enter your institutional credentials.'}
              </p>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-5 py-4 mb-8 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold">
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                {isStudent ? 'College Email' : 'Institutional Email'}
              </label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary border border-transparent rounded-2xl py-4 pl-16 pr-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-base font-bold shadow-sm"
                  placeholder={isStudent ? 'name@vit.edu' : 'admin@vit.edu'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  {isStudent ? 'PRN Number (Password)' : 'Password'}
                </label>
                {!isStudent && <Link href="#" className="text-xs text-primary hover:underline font-black">Forgot?</Link>}
              </div>
              <div className="relative group">
                {isStudent ? (
                  <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                ) : (
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                )}
                <input 
                  type={isStudent ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary border border-transparent rounded-2xl py-4 pl-16 pr-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-base font-bold shadow-sm"
                  placeholder={isStudent ? 'Enter your PRN (e.g., 21104032)' : '••••••••'}
                />
              </div>
            </div>

            {isStudent && (
              <p className="text-xs text-muted-foreground bg-secondary px-4 py-3 rounded-xl border border-border">
                💡 Your default password is your <strong className="text-foreground">PRN number</strong>. Contact admin if you have trouble logging in.
              </p>
            )}

            <button 
              type="submit" disabled={loading}
              className="w-full bg-foreground hover:opacity-90 text-background font-black py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 group transition-all text-sm uppercase tracking-[0.15em]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  Sign In to {role} Portal
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {role === 'admin' && (
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-muted-foreground text-sm font-medium">
                Need admin access? Contact the <strong className="text-foreground">Super Administrator</strong>
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
            ← Change Role
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
