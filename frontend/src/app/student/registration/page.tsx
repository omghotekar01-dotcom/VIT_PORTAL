'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  ClipboardList, 
  BookOpen, 
  CheckCircle2, 
  Info,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Library,
  GraduationCap
} from 'lucide-react'
import { useState } from 'react'

const availableCourses = [
  { id: 'CS501', name: 'Advanced Algorithms', credits: 4, type: 'Core', instructor: 'Dr. S. Kulkarni' },
  { id: 'CS502', name: 'Deep Learning', credits: 4, type: 'Professional Elective', instructor: 'Dr. M. Mohite' },
  { id: 'CS503', name: 'Software Architecture', credits: 3, type: 'Core', instructor: 'Prof. A. Patil' },
  { id: 'OE01', name: 'Quantum Physics', credits: 3, type: 'Open Elective', instructor: 'Dr. R. Sharma' },
  { id: 'HSS01', name: 'Professional Ethics', credits: 2, type: 'Humanities', instructor: 'Prof. S. Deshmukh' },
]

export default function RegistrationPage() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [isFinalized, setIsFinalized] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const toggleCourse = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter(c => c !== id))
    } else {
      setSelectedCourses([...selectedCourses, id])
    }
  }

  const handleFinalize = async () => {
    setSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setSubmitting(false)
    setIsFinalized(true)
  }

  const totalCredits = availableCourses
    .filter(c => selectedCourses.includes(c.id))
    .reduce((acc, curr) => acc + curr.credits, 0)

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
               Course Registration <ClipboardList className="text-primary" />
            </h1>
            <p className="text-slate-500 font-medium">Semester V · Choice Based Credit System (CBCS)</p>
         </div>
         <div className="bg-white px-6 py-4 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-6">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Credits</p>
               <p className={cn("text-2xl font-black", totalCredits > 20 ? 'text-rose-500' : 'text-primary')}>{totalCredits} / 22</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-100" />
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    S{i}
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                     <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Detail</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Credits</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Select</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {availableCourses.map((course) => (
                       <tr key={course.id} className={cn(
                         "transition-all",
                         selectedCourses.includes(course.id) ? "bg-primary/5" : "hover:bg-slate-50/50"
                       )}>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-4">
                                <div className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black",
                                  selectedCourses.includes(course.id) ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                                )}>
                                   {course.id}
                                </div>
                                <div>
                                   <p className="font-bold text-slate-800">{course.name}</p>
                                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{course.instructor}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-100 text-slate-500">
                                {course.type}
                             </span>
                          </td>
                          <td className="px-8 py-5 text-center font-black text-slate-700">{course.credits}</td>
                          <td className="px-8 py-5 text-right">
                             <button 
                               onClick={() => toggleCourse(course.id)}
                               disabled={isFinalized}
                               className={cn(
                                 "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                 selectedCourses.includes(course.id) 
                                   ? "bg-primary text-white shadow-lg shadow-primary/20" 
                                   : "bg-slate-50 text-slate-200 hover:text-primary hover:bg-white border border-slate-100"
                               )}
                             >
                                <CheckCircle2 size={20} />
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-2">
                     <h4 className="text-xl font-black uppercase tracking-tight">Academic Integrity Pledge</h4>
                     <p className="text-white/40 text-xs max-w-md font-medium">By finalizing this registration, you agree to abide by the academic regulations and honor code of VIT Pune.</p>
                  </div>
                  <button 
                    onClick={handleFinalize}
                    disabled={isFinalized || selectedCourses.length === 0 || submitting}
                    className="bg-primary text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50 disabled:grayscale"
                  >
                     {submitting ? <Zap className="animate-pulse" size={20} /> : <ShieldCheck size={20} />}
                     {isFinalized ? 'Registration Complete' : submitting ? 'Processing...' : 'Finalize Selection'}
                  </button>
               </div>
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Library size={120} />
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-10 rounded-[40px] border-slate-100 space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                     <Info size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Guidelines</h3>
               </div>
               <ul className="space-y-6">
                  {[
                    { title: 'Credit Limit', desc: 'Minimum 16 and Maximum 22 credits allowed per semester.' },
                    { title: 'Prerequisites', desc: 'Ensure you have cleared the prerequisite courses for elective selections.' },
                    { title: 'Timeline', desc: 'Add/Drop period ends on Oct 10, 2025.' },
                  ].map((item, i) => (
                    <li key={i} className="space-y-2">
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{item.title}</p>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="p-10 rounded-[40px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center space-y-6">
               <GraduationCap size={40} className="text-primary mx-auto" />
               <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Need Help?</h4>
               <p className="text-xs text-slate-500 font-medium">Contact your Academic Coordinator or the Department Head for selection guidance.</p>
               <button className="w-full py-4 rounded-2xl bg-white border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-600 hover:text-primary transition-all">
                  Request Consultation
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
