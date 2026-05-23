'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronRight,
  Download,
  Filter
} from 'lucide-react'

const subjects = [
  { id: 'CS301', name: 'Database Management Systems', units: 6 },
  { id: 'CS302', name: 'Operating Systems', units: 5 },
  { id: 'CS303', name: 'Computer Networks', units: 6 },
]

const lessonPlanData = [
  { unit: 1, title: 'Introduction to DBMS', topics: ['Data Models', 'Database Schema', 'Architecture'], status: 'Completed', date: 'Aug 10 - Aug 20' },
  { unit: 2, title: 'Relational Model', topics: ['ER Diagrams', 'Integrity Constraints', 'Relational Algebra'], status: 'Completed', date: 'Aug 21 - Sep 05' },
  { unit: 3, title: 'SQL Queries', topics: ['DDL/DML', 'Joins', 'Subqueries', 'Views'], status: 'In Progress', date: 'Sep 06 - Oct 10' },
  { unit: 4, title: 'Normalization', topics: ['1NF, 2NF, 3NF', 'BCNF', 'Decomposition'], status: 'Upcoming', date: 'Oct 11 - Oct 25' },
  { unit: 5, title: 'Transaction Management', topics: ['ACID Properties', 'Concurrency Control', 'Recovery'], status: 'Upcoming', date: 'Oct 26 - Nov 10' },
]

export default function LessonPlanPage() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lesson Plan</h1>
          <p className="text-muted-foreground mt-1">Detailed subject-wise academic planning and progress.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Download size={18} /> Download Full Plan
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubject(sub)}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border-2 ${
              selectedSubject.id === sub.id 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-card text-muted-foreground border-border hover:border-primary/30'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-foreground">Teaching Progress</h3>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                   60% Completed
                </div>
             </div>
             
             <div className="space-y-8">
                {lessonPlanData.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 relative group"
                  >
                    {/* Vertical Line */}
                    {i !== lessonPlanData.length - 1 && (
                      <div className="absolute left-[23px] top-[48px] bottom-[-32px] w-0.5 bg-border group-hover:bg-primary/30 transition-colors" />
                    )}
                    
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all ${
                      item.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 
                      item.status === 'In Progress' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 
                      'bg-card border-border text-muted-foreground'
                    }`}>
                      {item.status === 'Completed' ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                    </div>

                    <div className="flex-1 pb-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                         <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            Unit {item.unit}: {item.title}
                         </h4>
                         <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-1 rounded-lg">
                            {item.date}
                         </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic, j) => (
                          <span key={j} className="text-[10px] font-bold px-3 py-1 bg-secondary/50 rounded-full text-muted-foreground border border-border">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30 h-fit">
            <h3 className="text-xl font-bold text-foreground mb-6">Subject Resources</h3>
            <div className="space-y-4">
               {[
                 'Standard Reference Books',
                 'Syllabus PDF',
                 'Teaching Schedule',
                 'Practical Manual'
               ].map((res, i) => (
                 <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-all">
                   <span className="text-xs font-bold text-foreground">{res}</span>
                   <Download size={14} className="text-muted-foreground group-hover:text-primary" />
                 </button>
               ))}
            </div>
          </div>
          
          <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/20 text-center">
             <Clock className="text-primary mx-auto mb-4" size={32} />
             <h4 className="text-base font-bold text-foreground mb-2">Academic Audit</h4>
             <p className="text-xs text-muted-foreground">The syllabus progress is updated weekly by the respective subject faculties.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
