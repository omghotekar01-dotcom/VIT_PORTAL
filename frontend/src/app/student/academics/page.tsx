'use client'

import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Trophy, FileDown, Activity, ShieldCheck, Sparkles, Target } from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

const sgpaData = [
  { semester: 'Sem I', sgpa: 8.8 },
  { semester: 'Sem II', sgpa: 9.1 },
  { semester: 'Sem III', sgpa: 8.9 },
  { semester: 'Sem IV', sgpa: 9.4 },
]

const currentSemResults = [
  { code: 'CS301', name: 'Machine Learning', credits: 4, grade: 'A+', points: 10, type: 'Theory' },
  { code: 'CS302', name: 'Software Engineering', credits: 3, grade: 'A', points: 9, type: 'Theory' },
  { code: 'CS303', name: 'Computer Networks', credits: 4, grade: 'A+', points: 10, type: 'Theory' },
  { code: 'CS304L', name: 'ML Lab', credits: 2, grade: 'O', points: 10, type: 'Practical' },
  { code: 'CS305L', name: 'Networks Lab', credits: 2, grade: 'A+', points: 10, type: 'Practical' },
]

export default function StudentAcademics() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
            Academic Performance <Trophy className="text-amber-500" size={28} />
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Track your grades, CGPA progression, and download marksheets.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary hover:bg-card border border-border text-foreground font-black text-sm uppercase tracking-widest transition-all">
            <FileDown size={18} /> Transcript
          </button>
        </div>
      </div>

      {/* CGPA Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-[32px] bg-primary text-primary-foreground relative overflow-hidden"
        >
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                    <Target size={24} className="text-white" />
                </div>
                <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-1">Cumulative GPA</p>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-6xl font-black">9.05</h2>
                    <span className="text-white/80 font-bold">/ 10</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 text-xs font-black">
                    <TrendingUp size={14} /> +0.15 vs Last Sem
                </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20">
                <Trophy size={200} />
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-[32px] col-span-1 md:col-span-2 relative overflow-hidden flex flex-col justify-between"
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-black text-foreground">SGPA Trajectory</h3>
                    <p className="text-sm font-bold text-muted-foreground">Consistent High Distinction</p>
                </div>
            </div>
            <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sgpaData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="semester" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }}
                        />
                        <Line type="monotone" dataKey="sgpa" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'hsl(var(--card))' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
      </div>

      {/* Current Semester Results */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden rounded-[32px] border-border"
      >
        <div className="p-8 border-b border-border/50 bg-secondary/30 flex items-center justify-between">
            <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight">Semester IV Results</h3>
                <p className="text-sm font-bold text-muted-foreground mt-1">Declared on May 02, 2024</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={16} /> Pass
            </div>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[800px]">
                <thead>
                    <tr className="bg-secondary/10 border-b border-border/50">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Course Code</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Subject Name</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Credits</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Grade</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Points</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                    {currentSemResults.map((result, i) => (
                        <tr key={result.code} className="hover:bg-secondary/20 transition-colors">
                            <td className="px-8 py-6">
                                <span className="text-sm font-black text-foreground tracking-widest">{result.code}</span>
                            </td>
                            <td className="px-8 py-6">
                                <p className="text-sm font-bold text-foreground">{result.name}</p>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{result.type}</p>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <span className="text-sm font-bold text-muted-foreground">{result.credits}</span>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl font-black text-lg ${
                                    result.grade === 'O' || result.grade === 'A+' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                    result.grade === 'A' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                    'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                }`}>
                                    {result.grade}
                                </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <span className="text-sm font-black text-foreground">{result.points}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="p-8 border-t border-border/50 bg-secondary/20 flex items-center justify-end gap-12">
            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Credits</p>
                <p className="text-2xl font-black text-foreground">22</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Earned Points</p>
                <p className="text-2xl font-black text-foreground">206</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Semester SGPA</p>
                <p className="text-4xl font-black text-primary">9.36</p>
            </div>
        </div>
      </motion.div>
    </div>
  )
}
