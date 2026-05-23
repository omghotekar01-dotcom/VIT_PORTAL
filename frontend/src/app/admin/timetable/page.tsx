'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Plus, X, CheckCircle2, AlertCircle, Clock, Edit3, Trash2,
  AlertTriangle, BookOpen
} from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TIME_SLOTS = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:15 - 12:15', '12:15 - 13:15', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00']
const SUBJECTS = ['DBMS', 'Operating Systems', 'Computer Networks', 'Data Structures', 'Machine Learning', 'Web Technology', 'Software Engineering', 'Digital Electronics']
const FACULTY_LIST = ['Prof. Rajesh Sharma', 'Prof. Meena Kulkarni', 'Prof. Anil Deshmukh', 'Prof. Sunita Patil', 'Prof. Kiran Joshi']
const CLASSES = ['FY-A', 'FY-B', 'SY-A', 'SY-B', 'TY-A', 'TY-B', 'BTech-A', 'BTech-B']
const TYPES = ['Theory', 'Practical', 'Tutorial']

interface Lecture {
  id: string; day: string; slot: string; subject: string; faculty: string;
  classDiv: string; type: string;
}

const mockLectures: Lecture[] = [
  { id: '1', day: 'Monday', slot: '08:00 - 09:00', subject: 'DBMS', faculty: 'Prof. Rajesh Sharma', classDiv: 'SY-A', type: 'Theory' },
  { id: '2', day: 'Monday', slot: '09:00 - 10:00', subject: 'Operating Systems', faculty: 'Prof. Meena Kulkarni', classDiv: 'TY-A', type: 'Theory' },
  { id: '3', day: 'Monday', slot: '10:00 - 11:00', subject: 'Data Structures', faculty: 'Prof. Anil Deshmukh', classDiv: 'SY-A', type: 'Practical' },
  { id: '4', day: 'Tuesday', slot: '08:00 - 09:00', subject: 'Machine Learning', faculty: 'Prof. Kiran Joshi', classDiv: 'BTech-A', type: 'Theory' },
  { id: '5', day: 'Tuesday', slot: '09:00 - 10:00', subject: 'DBMS', faculty: 'Prof. Rajesh Sharma', classDiv: 'SY-B', type: 'Theory' },
  { id: '6', day: 'Wednesday', slot: '11:15 - 12:15', subject: 'Web Technology', faculty: 'Prof. Sunita Patil', classDiv: 'TY-B', type: 'Practical' },
  { id: '7', day: 'Thursday', slot: '14:00 - 15:00', subject: 'Computer Networks', faculty: 'Prof. Anil Deshmukh', classDiv: 'TY-A', type: 'Theory' },
  { id: '8', day: 'Friday', slot: '08:00 - 09:00', subject: 'Software Engineering', faculty: 'Prof. Meena Kulkarni', classDiv: 'BTech-B', type: 'Tutorial' },
]

export default function TimetablePage() {
  const [lectures, setLectures] = useState(mockLectures)
  const [showModal, setShowModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(CLASSES[0])
  const [toast, setToast] = useState<{msg: string, type: 'success'|'error'|'warning'} | null>(null)

  const [lDay, setLDay] = useState(DAYS[0])
  const [lSlot, setLSlot] = useState(TIME_SLOTS[0])
  const [lSubject, setLSubject] = useState(SUBJECTS[0])
  const [lFaculty, setLFaculty] = useState(FACULTY_LIST[0])
  const [lClass, setLClass] = useState(CLASSES[0])
  const [lType, setLType] = useState(TYPES[0])

  const showToast = (msg: string, type: 'success'|'error'|'warning' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000)
  }

  const checkConflict = (day: string, slot: string, faculty: string, classDiv: string) => {
    return lectures.find(l => l.day === day && l.slot === slot && (l.faculty === faculty || l.classDiv === classDiv))
  }

  const handleAddLecture = () => {
    const conflict = checkConflict(lDay, lSlot, lFaculty, lClass)
    if (conflict) {
      if (conflict.faculty === lFaculty) {
        showToast(`Conflict: ${lFaculty} already has ${conflict.subject} at this time!`, 'error')
      } else {
        showToast(`Conflict: ${lClass} already has ${conflict.subject} at this time!`, 'error')
      }
      return
    }
    setLectures(prev => [...prev, { id: Date.now().toString(), day: lDay, slot: lSlot, subject: lSubject, faculty: lFaculty, classDiv: lClass, type: lType }])
    setShowModal(false)
    showToast('Lecture slot created')
  }

  const handleDelete = (id: string) => {
    setLectures(prev => prev.filter(l => l.id !== id))
    showToast('Lecture removed')
  }

  const filteredLectures = lectures.filter(l => l.classDiv === selectedClass)
  const typeColors: Record<string, string> = { Theory: 'bg-primary/10 text-primary border-primary/20', Practical: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', Tutorial: 'bg-purple-500/10 text-purple-600 border-purple-500/20' }

  return (
    <div className="space-y-8 pb-10">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Timetable Builder</h1>
          <p className="text-muted-foreground text-lg mt-1">Create lecture slots with automatic conflict detection.</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={18} /> Create Lecture Slot
        </button>
      </div>

      {/* Class Selector */}
      <div className="flex gap-2 flex-wrap">
        {CLASSES.map(c => (
          <button key={c} onClick={() => setSelectedClass(c)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedClass === c ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary text-foreground border border-border hover:bg-card'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Timetable Grid */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground w-24">Time</th>
                {DAYS.map(d => (
                  <th key={d} className="px-3 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">{d.slice(0, 3)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map(slot => (
                <tr key={slot} className="border-b border-border/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Clock size={12} /> {slot.split(' - ')[0]}
                    </div>
                  </td>
                  {DAYS.map(day => {
                    const lecture = filteredLectures.find(l => l.day === day && l.slot === slot)
                    return (
                      <td key={day} className="px-2 py-2">
                        {lecture ? (
                          <div className={`p-3 rounded-xl border ${typeColors[lecture.type] || 'bg-secondary border-border'} group relative`}>
                            <p className="text-xs font-black">{lecture.subject}</p>
                            <p className="text-[10px] mt-1 opacity-70">{lecture.faculty.split(' ').slice(-1)}</p>
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 mt-1 block">{lecture.type}</span>
                            <button onClick={() => handleDelete(lecture.id)}
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-black/10 transition-all">
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-center"
                            onClick={() => { setLDay(day); setLSlot(slot); setLClass(selectedClass); setShowModal(true) }}>
                            <Plus size={14} className="text-muted-foreground/30" />
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="flex gap-4">
            {TYPES.map(t => (
              <div key={t} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${typeColors[t]?.split(' ')[0] || 'bg-secondary'}`} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{filteredLectures.length} lectures for {selectedClass}</p>
        </div>
      </div>

      {/* Create Lecture Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-lg border border-border" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-border">
                <h2 className="text-2xl font-black text-foreground">Create Lecture Slot</h2>
                <p className="text-muted-foreground text-sm mt-1">System will auto-detect scheduling conflicts</p>
              </div>
              <div className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Day</label>
                    <select value={lDay} onChange={e => setLDay(e.target.value)} className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Time Slot</label>
                    <select value={lSlot} onChange={e => setLSlot(e.target.value)} className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Subject</label>
                  <select value={lSubject} onChange={e => setLSubject(e.target.value)} className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Faculty</label>
                  <select value={lFaculty} onChange={e => setLFaculty(e.target.value)} className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                    {FACULTY_LIST.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Class</label>
                    <select value={lClass} onChange={e => setLClass(e.target.value)} className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Type</label>
                    <select value={lType} onChange={e => setLType(e.target.value)} className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Conflict Warning */}
                {checkConflict(lDay, lSlot, lFaculty, lClass) && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-bold text-red-500">Scheduling Conflict Detected</p>
                      <p className="text-xs text-red-400 mt-1">
                        {checkConflict(lDay, lSlot, lFaculty, lClass)?.faculty === lFaculty
                          ? `${lFaculty} already has a class at this time`
                          : `${lClass} already has a lecture at this time`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl bg-secondary text-foreground font-bold text-sm border border-border">Cancel</button>
                <button onClick={handleAddLecture} className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">Create Slot</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
