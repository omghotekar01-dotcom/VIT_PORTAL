'use client'

import { motion } from 'framer-motion'
import { 
  Gamepad2, 
  Play, 
  Trophy, 
  Timer,
  ChevronRight,
  BrainCircuit
} from 'lucide-react'

export default function QuizPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quiz Module</h1>
        <p className="text-muted-foreground mt-1">Test your knowledge with quick interactive quizzes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-foreground">Available Quizzes</h3>
           {[
             { title: 'SQL Fundamentals', q: 15, time: '10m', type: 'DBMS' },
             { title: 'OS Kernel Basics', q: 10, time: '8m', type: 'OS' },
             { title: 'TCP/IP Model', q: 12, time: '12m', type: 'CN' },
           ].map((quiz, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-6 rounded-[32px] border-border/50 group hover:border-primary/30 transition-all flex items-center justify-between"
             >
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                   <BrainCircuit className="text-primary" size={24} />
                 </div>
                 <div>
                   <h4 className="text-lg font-bold text-foreground">{quiz.title}</h4>
                   <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                      <span>{quiz.type}</span>
                      <span>•</span>
                      <span>{quiz.q} Qs</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Timer size={12} /> {quiz.time}</span>
                   </div>
                 </div>
               </div>
               <button className="p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-110 transition-all">
                 <Play size={18} fill="currentColor" />
               </button>
             </motion.div>
           ))}
        </div>

        <div className="space-y-6">
           <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30 text-center">
              <Trophy className="text-amber-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-foreground mb-2">Quiz Leaderboard</h3>
              <p className="text-sm text-muted-foreground mb-6">Compete with your batchmates and earn points.</p>
              <div className="space-y-3 text-left">
                 {[
                   { name: 'Aarav Sharma', score: '2450 pts', rank: 1 },
                   { name: 'Priya Patel', score: '2320 pts', rank: 2 },
                   { name: 'Rohan Deshmukh', score: '2100 pts', rank: 3 },
                 ].map((p, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-muted-foreground">#{p.rank}</span>
                        <span className="text-sm font-bold text-foreground">{p.name}</span>
                      </div>
                      <span className="text-sm font-black text-primary">{p.score}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
