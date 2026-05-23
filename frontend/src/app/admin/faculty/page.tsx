'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Plus, Search, Edit3, Trash2, X, CheckCircle2, AlertCircle,
  BookOpen, Building2, Layers
} from 'lucide-react'

const DEPARTMENTS = ['Computer Engineering', 'Information Technology', 'Mechanical Engineering', 'Electronics & Telecom', 'Chemical Engineering']
const SUBJECTS = ['DBMS', 'Operating Systems', 'Computer Networks', 'Data Structures', 'Machine Learning', 'Web Technology', 'Software Engineering', 'Digital Electronics', 'Thermodynamics', 'Fluid Mechanics']
const CLASSES = ['FY-A', 'FY-B', 'FY-C', 'SY-A', 'SY-B', 'SY-C', 'TY-A', 'TY-B', 'TY-C', 'BTech-A', 'BTech-B']
const DIVISIONS = ['A', 'B', 'C', 'D']

interface FacultyRecord {
  _id: string; name: string; email: string; department: string;
  assignments: { subject: string; class: string; division: string }[];
}

const mockFaculty: FacultyRecord[] = [
  { _id: '1', name: 'Prof. Rajesh Sharma', email: 'rajesh.sharma@vit.edu', department: 'Computer Engineering', assignments: [
    { subject: 'DBMS', class: 'SY-A', division: 'A' }, { subject: 'DBMS', class: 'SY-B', division: 'B' }
  ]},
  { _id: '2', name: 'Prof. Meena Kulkarni', email: 'meena.kulkarni@vit.edu', department: 'Computer Engineering', assignments: [
    { subject: 'Operating Systems', class: 'TY-A', division: 'A' }
  ]},
  { _id: '3', name: 'Prof. Anil Deshmukh', email: 'anil.deshmukh@vit.edu', department: 'Information Technology', assignments: [
    { subject: 'Computer Networks', class: 'TY-B', division: 'B' }, { subject: 'Data Structures', class: 'SY-A', division: 'A' }
  ]},
  { _id: '4', name: 'Prof. Sunita Patil', email: 'sunita.patil@vit.edu', department: 'Mechanical Engineering', assignments: [] },
]

export default function FacultyPage() {
  const [faculty, setFaculty] = useState(mockFaculty)
  const [showModal, setShowModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [toast, setToast] = useState<{msg: string, type: 'success'|'error'} | null>(null)

  // Faculty form
  const [fName, setFName] = useState('')
  const [fEmail, setFEmail] = useState('')
  const [fDept, setFDept] = useState(DEPARTMENTS[0])

  // Assignment form
  const [aSubject, setASubject] = useState(SUBJECTS[0])
  const [aClass, setAClass] = useState(CLASSES[0])
  const [aDiv, setADiv] = useState(DIVISIONS[0])

  const showToast = (msg: string, type: 'success'|'error' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000)
  }

  const filtered = faculty.filter(f => {
    if (filterDept && f.department !== filterDept) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return f.name.toLowerCase().includes(q) || f.email.toLowerCase().includes(q)
    }
    return true
  })

  const handleAddFaculty = () => {
    if (!fName || !fEmail) { showToast('Name and email required', 'error'); return }
    setFaculty(prev => [...prev, { _id: Date.now().toString(), name: fName, email: fEmail, department: fDept, assignments: [] }])
    setFName(''); setFEmail(''); setFDept(DEPARTMENTS[0]); setShowModal(false)
    showToast('Faculty member added')
  }

  const handleAddAssignment = () => {
    if (!selectedFaculty) return
    setFaculty(prev => prev.map(f => {
      if (f._id === selectedFaculty) {
        return { ...f, assignments: [...f.assignments, { subject: aSubject, class: aClass, division: aDiv }] }
      }
      return f
    }))
    setShowAssignModal(false)
    showToast('Subject assigned successfully')
  }

  const handleRemoveAssignment = (facultyId: string, idx: number) => {
    setFaculty(prev => prev.map(f => {
      if (f._id === facultyId) {
        return { ...f, assignments: f.assignments.filter((_, i) => i !== idx) }
      }
      return f
    }))
    showToast('Assignment removed')
  }

  const handleDeleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(f => f._id !== id))
    showToast('Faculty removed')
  }

  const unassignedCount = faculty.filter(f => f.assignments.length === 0).length

  return (
    <div className="space-y-8 pb-10">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground text-lg mt-1">Assign faculty to departments, subjects, and divisions.</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={18} /> Add Faculty
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Faculty', value: faculty.length, icon: Users, color: 'text-primary' },
          { label: 'Assigned', value: faculty.length - unassignedCount, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Unassigned', value: unassignedCount, icon: AlertCircle, color: 'text-amber-500' },
        ].map((s, i) => (
          <div key={s.label} className="glass-card p-6 rounded-2xl">
            <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-secondary rounded-xl py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border"
            placeholder="Search faculty..." />
        </div>
        <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
          className="bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Faculty Cards */}
      <div className="space-y-4">
        {filtered.map((f, i) => (
          <motion.div key={f._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="glass-card p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg">
                  {f.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">{f.email} · {f.department}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setSelectedFaculty(f._id); setShowAssignModal(true) }}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-primary/20 transition-all">
                  <BookOpen size={14} /> Assign Subject
                </button>
                <button onClick={() => handleDeleteFaculty(f._id)}
                  className="p-2 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
            {f.assignments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {f.assignments.map((a, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl border border-border text-sm">
                    <span className="font-bold text-foreground">{a.subject}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-primary font-bold">{a.class}</span>
                    <span className="text-muted-foreground text-xs">Div {a.division}</span>
                    <button onClick={() => handleRemoveAssignment(f._id, idx)} className="text-muted-foreground hover:text-destructive ml-1"><X size={14} /></button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-amber-500 font-bold flex items-center gap-2"><AlertCircle size={14} /> No subjects assigned yet</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Faculty Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-md border border-border" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-border flex items-center justify-between">
                <h2 className="text-2xl font-black text-foreground">Add Faculty</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-secondary"><X size={20} /></button>
              </div>
              <div className="p-8 space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Full Name *</label>
                  <input value={fName} onChange={e => setFName(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Prof. Name" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Email *</label>
                  <input value={fEmail} onChange={e => setFEmail(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="name@vit.edu" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Department</label>
                  <select value={fDept} onChange={e => setFDept(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="p-8 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl bg-secondary text-foreground font-bold text-sm border border-border">Cancel</button>
                <button onClick={handleAddFaculty} className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">Add Faculty</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assign Subject Modal */}
      <AnimatePresence>
        {showAssignModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowAssignModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-md border border-border" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-border">
                <h2 className="text-2xl font-black text-foreground">Assign Subject</h2>
                <p className="text-muted-foreground text-sm mt-1">to {faculty.find(f => f._id === selectedFaculty)?.name}</p>
              </div>
              <div className="p-8 space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Subject</label>
                  <select value={aSubject} onChange={e => setASubject(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Class</label>
                  <select value={aClass} onChange={e => setAClass(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Division</label>
                  <select value={aDiv} onChange={e => setADiv(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                    {DIVISIONS.map(d => <option key={d} value={d}>Division {d}</option>)}
                  </select>
                </div>
              </div>
              <div className="p-8 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowAssignModal(false)} className="px-6 py-3 rounded-xl bg-secondary text-foreground font-bold text-sm border border-border">Cancel</button>
                <button onClick={handleAddAssignment} className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">Assign</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
