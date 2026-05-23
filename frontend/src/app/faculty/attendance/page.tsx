'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Calendar, 
  Clock, 
  ArrowLeft,
  Save,
  Loader2,
  Filter,
  ChevronRight,
  User,
  History,
  X,
  Edit3,
  BookOpen,
  ArrowRight,
  Zap,
  MapPin,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { facultyServices } from '@/lib/facultyServices'
import { cn } from '@/lib/utils'

const facultyClasses = [
  { id: 1, branch: 'SY B.Tech (Computer)', subject: 'Mathematics III', batch: 'Div-A', time: '09:00 AM', room: 'L-501', color: 'blue' },
  { id: 2, branch: 'TY B.Tech (AI & ML)', subject: 'Machine Learning', batch: 'Div-B', time: '11:00 AM', room: 'L-402', color: 'purple' },
  { id: 3, branch: 'SY B.Tech (IT)', subject: 'DBMS Lab', batch: 'Batch-S1', time: '02:00 PM', room: 'Lab-10', color: 'emerald' },
  { id: 4, branch: 'BE B.Tech (Computer)', subject: 'Cloud Computing', batch: 'Div-A', time: '04:00 PM', room: 'L-302', color: 'orange' },
]

const initialStudents = [
  { prn: '1251030180', name: 'Om Ghotekar', present: true, totalAttended: 22, totalClasses: 25 },
  { prn: '1251030195', name: 'Aditya Patil', present: true, totalAttended: 18, totalClasses: 25 },
  { prn: '1251030210', name: 'Sneha Kulkarni', present: true, totalAttended: 24, totalClasses: 25 },
  { prn: '1251030150', name: 'Rahul More', present: false, totalAttended: 13, totalClasses: 25 },
  { prn: '1251030225', name: 'Ishani Deshmukh', present: true, totalAttended: 21, totalClasses: 25 },
  { prn: '1251030300', name: 'Karan Sharma', present: false, totalAttended: 15, totalClasses: 25 },
]

const studentAttendanceHistory = [
  { date: '2025-10-01', status: 'Present' },
  { date: '2025-09-30', status: 'Present' },
  { date: '2025-09-29', status: 'Absent' },
  { date: '2025-09-28', status: 'Present' },
  { date: '2025-09-27', status: 'Present' },
]

export default function FacultyAttendancePage() {
  const [step, setStep] = useState<'select' | 'mark'>('select')
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [isFetching, setIsFetching] = useState(false)
  
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [saving, setSaving] = useState(false)
  
  const [detailStudent, setDetailStudent] = useState<any>(null)

  const handleSelectClass = async (cls: any) => {
    setSelectedClass(cls)
    setIsFetching(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsFetching(false)
    setStep('mark')
  }

  const toggleAttendance = (prn: string) => {
    setStudents(prev => prev.map(s => s.prn === prn ? { ...s, present: !s.present } : s))
  }

  const handleSave = async () => {
    setSaving(true)
    await facultyServices.markAttendance(students)
    setSaving(false)
    alert('Attendance marked and synced with the portal.')
  }

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.prn.includes(searchTerm)
  )

  return (
    <div className="space-y-10 pb-20">
      <AnimatePresence mode="wait">
        {step === 'select' ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-10"
          >
            <div className="flex flex-col items-center text-center space-y-6">
               <div className="w-24 h-24 rounded-[40px] bg-white text-primary flex items-center justify-center p-3 shadow-lg border border-slate-100">
                  <img 
                    src="/vit-logo.jpg" 
                    alt="VIT PUNE" 
                    className="w-full h-full object-contain"
                  />
               </div>
               <div className="space-y-2">
                  <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center justify-center gap-4">
                     Assigned Classes <Sparkles className="text-primary animate-pulse" />
                  </h1>
                  <p className="text-slate-500 font-medium max-w-lg mx-auto">Select a batch below to fetch students and mark today's attendance for the institutional portal.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
               {facultyClasses.map((cls) => (
                 <motion.button
                   key={cls.id}
                   whileHover={{ y: -8, scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleSelectClass(cls)}
                   className="relative group text-left"
                 >
                    <div className={cn(
                       "h-full p-8 rounded-[40px] border-2 transition-all overflow-hidden bg-white shadow-sm",
                       cls.color === 'blue' && "border-blue-100 hover:border-blue-500 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]",
                       cls.color === 'purple' && "border-purple-100 hover:border-purple-500 hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)]",
                       cls.color === 'emerald' && "border-emerald-100 hover:border-emerald-500 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]",
                       cls.color === 'orange' && "border-orange-100 hover:border-orange-500 hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)]",
                    )}>
                       {/* Background Glow */}
                       <div className={cn(
                          "absolute -top-24 -right-24 w-48 h-48 blur-[60px] opacity-20 rounded-full",
                          cls.color === 'blue' && "bg-blue-500",
                          cls.color === 'purple' && "bg-purple-500",
                          cls.color === 'emerald' && "bg-emerald-500",
                          cls.color === 'orange' && "bg-orange-500",
                       )} />

                       <div className="relative z-10 space-y-6">
                          <div className="flex items-center justify-between">
                             <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center",
                                cls.color === 'blue' && "bg-blue-50 text-blue-500",
                                cls.color === 'purple' && "bg-purple-50 text-purple-500",
                                cls.color === 'emerald' && "bg-emerald-50 text-emerald-500",
                                cls.color === 'orange' && "bg-orange-50 text-orange-500",
                             )}>
                                <BookOpen size={24} />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{cls.batch}</span>
                          </div>

                          <div>
                             <h3 className="text-xl font-black text-slate-800 leading-tight mb-1 group-hover:text-primary transition-colors">{cls.subject}</h3>
                             <p className="text-xs font-bold text-slate-500">{cls.branch}</p>
                          </div>

                          <div className="pt-4 border-t border-slate-50 space-y-3">
                             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <Clock size={12} /> {cls.time}
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <MapPin size={12} /> {cls.room}
                             </div>
                          </div>
                          
                          <div className="pt-2 flex justify-end">
                             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <ArrowRight size={18} />
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.button>
               ))}
            </div>

            {isFetching && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center"
               >
                  <div className="relative">
                     <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Users className="text-primary animate-pulse" size={32} />
                     </div>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mt-8">Fetching Student Roster</h2>
                  <p className="text-slate-500 font-bold mt-2">Loading students for {selectedClass?.subject}...</p>
               </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="mark"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                 <button 
                   onClick={() => setStep('select')}
                   className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline mb-2"
                 >
                    <ArrowLeft size={14} /> Back to Batches
                 </button>
                 <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">{selectedClass.subject}</h1>
                 <p className="text-slate-500 font-medium">
                    {selectedClass.branch} · {selectedClass.batch} · Today
                 </p>
              </div>
              
              <div className="flex gap-4">
                 <button 
                   onClick={handleSave}
                   disabled={saving}
                   className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
                 >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {saving ? 'Syncing...' : 'Submit Attendance'}
                 </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-6">
                  {/* Search and Quick Filters */}
                  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                     <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="Search PRN or Name..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none"
                        />
                     </div>
                     <div className="flex gap-2">
                        <button onClick={() => setStudents(s => s.map(x => ({...x, present: true})))} className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                           <CheckCircle2 size={16} /> Mark All
                        </button>
                        <button onClick={() => setStudents(s => s.map(x => ({...x, present: false})))} className="p-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                           <XCircle size={16} /> Reset
                        </button>
                     </div>
                  </div>

                  {/* Student Table */}
                  <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                     <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                           <tr>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Details</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Semester Stats</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Current Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {filteredStudents.map((student) => (
                             <tr key={student.prn} className="hover:bg-slate-50/50 transition-all group">
                                <td className="px-8 py-5">
                                   <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                                         {student.name.charAt(0)}
                                      </div>
                                      <div>
                                         <p className="font-bold text-slate-800">{student.name}</p>
                                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{student.prn}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                   <button 
                                     onClick={() => setDetailStudent(student)}
                                     className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2 mx-auto border border-slate-200"
                                   >
                                      <History size={14} /> {student.totalAttended}/{student.totalClasses}
                                   </button>
                                </td>
                                <td className="px-8 py-5">
                                   <div className="flex justify-center">
                                      <button 
                                        onClick={() => toggleAttendance(student.prn)}
                                        className={cn(
                                          "px-10 py-3 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-xl transition-all",
                                          student.present ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-rose-500 text-white shadow-rose-500/20"
                                        )}
                                      >
                                         {student.present ? 'Present' : 'Absent'}
                                      </button>
                                   </div>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Summary Column */}
               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-10">
                     <div className="space-y-1">
                        <h3 className="text-2xl font-black tracking-tight uppercase">Live Analytics</h3>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Real-time Session Monitoring</p>
                     </div>
                     
                     <div className="grid grid-cols-1 gap-6">
                        <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex justify-between items-center">
                           <div>
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Present Count</p>
                              <p className="text-4xl font-black text-emerald-400">{students.filter(s => s.present).length}</p>
                           </div>
                           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                              <CheckCircle2 size={24} />
                           </div>
                        </div>
                        <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex justify-between items-center">
                           <div>
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Absent Count</p>
                              <p className="text-4xl font-black text-rose-400">{students.filter(s => !s.present).length}</p>
                           </div>
                           <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                              <XCircle size={24} />
                           </div>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex justify-between items-end">
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Attendance %</p>
                           <p className="text-xl font-black text-primary">{Math.round((students.filter(s => s.present).length / students.length) * 100)}%</p>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(students.filter(s => s.present).length / students.length) * 100}%` }}
                              className="h-full bg-primary"
                           />
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-10 rounded-[40px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center">
                     <Zap size={40} className="text-primary mb-6 mx-auto animate-pulse" />
                     <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Smart Sync</h4>
                     <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                        Data is automatically synced with the Central University Repository upon submission.
                     </p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Attendance Modal */}
      <AnimatePresence>
        {detailStudent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setDetailStudent(null)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
             >
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                         {detailStudent.name.charAt(0)}
                      </div>
                      <div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tight">{detailStudent.name}</h3>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{detailStudent.prn} · AI/ML Engineering</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setDetailStudent(null)}
                     className="p-3 bg-white rounded-xl text-slate-400 hover:text-rose-500 transition-all border border-slate-100"
                   >
                      <X size={20} />
                   </button>
                </div>
                
                <div className="p-10 space-y-10">
                   <div className="grid grid-cols-3 gap-6">
                      <div className="p-6 rounded-[32px] bg-emerald-50 border border-emerald-100 text-center">
                         <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Attended</p>
                         <p className="text-3xl font-black text-emerald-700">{detailStudent.totalAttended}</p>
                      </div>
                      <div className="p-6 rounded-[32px] bg-rose-50 border border-rose-100 text-center">
                         <p className="text-[10px] font-black text-rose-600 uppercase mb-2">Missed</p>
                         <p className="text-3xl font-black text-rose-700">{detailStudent.totalClasses - detailStudent.totalAttended}</p>
                      </div>
                      <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/20 text-center">
                         <p className="text-[10px] font-black text-primary uppercase mb-2">Percentage</p>
                         <p className="text-3xl font-black text-primary">{Math.round((detailStudent.totalAttended / detailStudent.totalClasses) * 100)}%</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                         <Calendar size={18} className="text-primary" /> Semester Timeline
                      </h4>
                      <div className="space-y-3 max-h-[350px] overflow-y-auto no-scrollbar pr-2">
                         {studentAttendanceHistory.map((log, i) => (
                           <div key={i} className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group">
                              <span className="text-sm font-bold text-slate-700">{log.date}</span>
                              <div className="flex items-center gap-4">
                                 <span className={cn(
                                   "text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full",
                                   log.status === 'Present' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                 )}>
                                    {log.status}
                                 </span>
                                 <button className="p-2 rounded-xl bg-white text-slate-300 opacity-0 group-hover:opacity-100 hover:text-primary hover:border-primary border border-slate-100 transition-all">
                                    <Edit3 size={16} />
                                 </button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <button className="w-full py-5 rounded-[24px] bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transition-all">
                      Update Archive Records
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
