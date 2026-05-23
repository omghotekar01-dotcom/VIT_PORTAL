'use client'

import { motion } from 'framer-motion'
import { FileText, Clock, CheckCircle2, UploadCloud, AlertTriangle, FileCheck, BookOpen, Download } from 'lucide-react'

const assignments = [
  { id: 1, title: 'Quantum Mechanics Analysis', subject: 'Physics', type: 'Assignment', dueDate: 'Tomorrow, 11:59 PM', status: 'Pending', urgent: true, grade: null },
  { id: 2, title: 'Logic Circuits Design', subject: 'Electronics', type: 'Lab Report', dueDate: '15 May 2024', status: 'Pending', urgent: false, grade: null },
  { id: 3, title: 'Software Engineering SRS', subject: 'Computer', type: 'Project Doc', dueDate: '20 May 2024', status: 'Submitted', urgent: false, grade: 'A+' },
  { id: 4, title: 'Data Structures Graph Assignment', subject: 'Computer', type: 'Code', dueDate: '02 May 2024', status: 'Graded', urgent: false, grade: '9.5/10' },
]

export default function StudentAssignments() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
            Assignments <FileText className="text-primary" size={28} />
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Track your pending tasks, submit reports, and view grades.</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-secondary px-6 py-3 rounded-2xl border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                    <span className="font-black">2</span>
                </div>
                <span className="text-sm font-black uppercase tracking-widest">Pending</span>
            </div>
            <div className="bg-secondary px-6 py-3 rounded-2xl border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <span className="font-black">12</span>
                </div>
                <span className="text-sm font-black uppercase tracking-widest">Completed</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment, i) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 rounded-[32px] relative overflow-hidden group hover:shadow-xl transition-all ${assignment.urgent ? 'border-red-500/30 shadow-red-500/5' : ''}`}
          >
            {assignment.urgent && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[40px] -z-10 rounded-full" />
            )}
            
            <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    assignment.status === 'Pending' ? (assignment.urgent ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20') :
                    assignment.status === 'Submitted' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                    'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                }`}>
                    {assignment.status}
                </div>
                {assignment.type === 'Code' ? <BookOpen size={20} className="text-muted-foreground" /> : <FileText size={20} className="text-muted-foreground" />}
            </div>

            <div className="space-y-2 mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{assignment.subject}</p>
                <h3 className="text-xl font-black text-foreground leading-tight">{assignment.title}</h3>
                <p className="text-sm font-bold text-muted-foreground">{assignment.type}</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold text-foreground bg-secondary/50 p-4 rounded-2xl border border-border">
                    {assignment.status === 'Pending' ? (
                        <>
                            <Clock size={16} className={assignment.urgent ? 'text-red-500' : 'text-amber-500'} />
                            <span className={assignment.urgent ? 'text-red-500' : ''}>Due: {assignment.dueDate}</span>
                        </>
                    ) : assignment.status === 'Graded' ? (
                        <>
                            <FileCheck size={16} className="text-emerald-500" />
                            <span className="text-emerald-500">Grade: {assignment.grade}</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 size={16} className="text-blue-500" />
                            <span>Submitted successfully</span>
                        </>
                    )}
                </div>

                {assignment.status === 'Pending' ? (
                    <button className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                        assignment.urgent 
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20'
                    }`}>
                        <UploadCloud size={16} /> Submit Work
                    </button>
                ) : (
                    <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest bg-secondary hover:bg-secondary/80 text-foreground transition-all border border-border">
                        <Download size={16} /> View Submission
                    </button>
                )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
