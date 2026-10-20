'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Plus, Search, Filter, Download, Upload, Trash2, Edit3, 
  ChevronDown, X, CheckCircle2, AlertCircle, GraduationCap,
  Building2, Layers, BookOpen, Hash
} from 'lucide-react'

const DEPARTMENTS = [
  'Computer Engineering', 'Information Technology', 'Mechanical Engineering',
  'Electronics & Telecom', 'Chemical Engineering', 'Civil Engineering'
]
const BRANCHES = ['CE', 'IT', 'ME', 'ENTC', 'CHE', 'CIVIL']
const YEARS = ['FY', 'SY', 'TY', 'BTech']
const DIVISIONS = ['A', 'B', 'C', 'D']
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]

interface StudentForm {
  prn: string; name: string; email: string; department: string; branch: string;
  year: string; division: string; rollNumber: string; semester: number;
  admissionYear: number; phone: string; gender: string;
}

const emptyForm: StudentForm = {
  prn: '', name: '', email: '', department: DEPARTMENTS[0], branch: BRANCHES[0],
  year: YEARS[0], division: DIVISIONS[0], rollNumber: '', semester: 1,
  admissionYear: new Date().getFullYear(), phone: '', gender: 'Male'
}

// Mock student data for UI demonstration
const mockStudents = [
  { _id: '1', prn: '9900000011', name: 'Demo Student 1', email: 'adminstudent01@example.test', department: 'Computer Engineering', branch: 'CE', year: 'TY', division: 'A', rollNumber: '32', semester: 5, admissionYear: 2021, status: 'active', gender: 'Male' },
  { _id: '2', prn: '9900000012', name: 'Demo Student 2', email: 'adminstudent02@example.test', department: 'Computer Engineering', branch: 'CE', year: 'TY', division: 'A', rollNumber: '15', semester: 5, admissionYear: 2021, status: 'active', gender: 'Male' },
  { _id: '3', prn: '9900000013', name: 'Demo Student 3', email: 'adminstudent03@example.test', department: 'Information Technology', branch: 'IT', year: 'TY', division: 'B', rollNumber: '08', semester: 5, admissionYear: 2021, status: 'active', gender: 'Female' },
  { _id: '4', prn: '9900000014', name: 'Demo Student 4', email: 'adminstudent04@example.test', department: 'Computer Engineering', branch: 'CE', year: 'SY', division: 'B', rollNumber: '45', semester: 3, admissionYear: 2022, status: 'active', gender: 'Male' },
  { _id: '5', prn: '9900000015', name: 'Demo Student 5', email: 'adminstudent05@example.test', department: 'Mechanical Engineering', branch: 'ME', year: 'SY', division: 'A', rollNumber: '12', semester: 3, admissionYear: 2022, status: 'inactive', gender: 'Female' },
  { _id: '6', prn: '9900000016', name: 'Demo Student 6', email: 'adminstudent06@example.test', department: 'Computer Engineering', branch: 'CE', year: 'FY', division: 'C', rollNumber: '03', semester: 1, admissionYear: 2023, status: 'active', gender: 'Male' },
]

export default function AdminStudentsPage() {
  const [students, setStudents] = useState(mockStudents)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [form, setForm] = useState<StudentForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [filterYear, setFilterYear] = useState('')
  const [filterDiv, setFilterDiv] = useState('')
  const [toast, setToast] = useState<{msg: string, type: 'success'|'error'} | null>(null)
  const [bulkText, setBulkText] = useState('')

  const showToast = (msg: string, type: 'success'|'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = students.filter(s => {
    if (filterDept && s.department !== filterDept) return false
    if (filterYear && s.year !== filterYear) return false
    if (filterDiv && s.division !== filterDiv) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return s.name.toLowerCase().includes(q) || s.prn.includes(q) || s.email.toLowerCase().includes(q)
    }
    return true
  })

  const handleSubmit = () => {
    if (!form.prn || !form.name || !form.email) {
      showToast('PRN, Name, and Email are required', 'error')
      return
    }
    if (editingId) {
      setStudents(prev => prev.map(s => s._id === editingId ? { ...s, ...form } : s))
      showToast('Student updated successfully')
    } else {
      const newStudent = { ...form, _id: Date.now().toString(), status: 'active' as const }
      setStudents(prev => [...prev, newStudent])
      showToast('Student added successfully')
    }
    setForm(emptyForm)
    setEditingId(null)
    setShowAddModal(false)
  }

  const handleEdit = (student: typeof mockStudents[0]) => {
    setForm({
      prn: student.prn, name: student.name, email: student.email,
      department: student.department, branch: student.branch, year: student.year,
      division: student.division, rollNumber: student.rollNumber,
      semester: student.semester, admissionYear: student.admissionYear,
      phone: '', gender: student.gender
    })
    setEditingId(student._id)
    setShowAddModal(true)
  }

  const handleDelete = (id: string) => {
    setStudents(prev => prev.filter(s => s._id !== id))
    showToast('Student removed')
  }

  const handleBulkAdd = () => {
    try {
      const lines = bulkText.trim().split('\n').filter(l => l.trim())
      let added = 0
      for (const line of lines) {
        const [prn, name, email, dept, branch, year, div, roll, sem] = line.split(',').map(s => s.trim())
        if (prn && name && email) {
          setStudents(prev => [...prev, {
            _id: Date.now().toString() + added,
            prn, name, email,
            department: dept || DEPARTMENTS[0], branch: branch || BRANCHES[0],
            year: year || YEARS[0], division: div || DIVISIONS[0],
            rollNumber: roll || '', semester: Number(sem) || 1,
            admissionYear: new Date().getFullYear(), status: 'active' as const,
            gender: 'Male'
          }])
          added++
        }
      }
      showToast(`${added} students added via bulk import`)
      setBulkText('')
      setShowBulkModal(false)
    } catch { showToast('Invalid CSV format', 'error') }
  }

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    depts: new Set(students.map(s => s.department)).size,
    divisions: new Set(students.map(s => `${s.department}-${s.division}`)).size
  }

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
          <h1 className="text-4xl font-black text-foreground tracking-tight">Student Management</h1>
          <p className="text-muted-foreground text-lg mt-1">Add, organize, and manage students by department, branch, and division.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowBulkModal(true)}
            className="bg-secondary text-foreground px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 border border-border hover:bg-card transition-all">
            <Upload size={16} /> Bulk Import
          </button>
          <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowAddModal(true) }}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: stats.total, icon: Users, color: 'text-primary' },
          { label: 'Active', value: stats.active, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Departments', value: stats.depts, icon: Building2, color: 'text-purple-500' },
          { label: 'Divisions', value: stats.divisions, icon: Layers, color: 'text-amber-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card p-6 rounded-2xl">
            <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-foreground mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-secondary rounded-xl py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border"
            placeholder="Search by name, PRN, or email..." />
        </div>
        <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
          className="bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterYear} onChange={e => setFilterYear(e.target.value)}
          className="bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
          <option value="">All Years</option>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={filterDiv} onChange={e => setFilterDiv(e.target.value)}
          className="bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
          <option value="">All Divisions</option>
          {DIVISIONS.map(d => <option key={d} value={d}>Div {d}</option>)}
        </select>
        {(filterDept || filterYear || filterDiv) && (
          <button onClick={() => { setFilterDept(''); setFilterYear(''); setFilterDiv('') }}
            className="text-primary text-xs font-black uppercase tracking-widest hover:underline whitespace-nowrap">Clear Filters</button>
        )}
      </div>

      {/* Student Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['PRN', 'Name', 'Email', 'Department', 'Year', 'Div', 'Sem', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-6 py-16 text-center text-muted-foreground">
                  <GraduationCap size={40} className="mx-auto mb-4 opacity-30" />
                  <p className="font-bold">No students found</p>
                  <p className="text-sm mt-1">Try adjusting your filters or add a new student.</p>
                </td></tr>
              ) : filtered.map((s, i) => (
                <motion.tr key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-black text-foreground">{s.prn}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{s.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{s.email}</td>
                  <td className="px-6 py-4"><span className="text-xs font-bold bg-primary/5 text-primary px-3 py-1 rounded-lg">{s.branch}</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{s.year}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{s.division}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{s.semester}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${s.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(s)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(s._id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={16} /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-bold">Showing {filtered.length} of {students.length} students</p>
          <p className="text-xs text-muted-foreground">Students login with <strong className="text-foreground">Email</strong> + <strong className="text-foreground">PRN as password</strong></p>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-foreground">{editingId ? 'Edit Student' : 'Add New Student'}</h2>
                  <p className="text-muted-foreground text-sm mt-1">PRN will be used as the student's login password</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl hover:bg-secondary"><X size={20} /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">PRN Number *</label>
                    <input value={form.prn} onChange={e => setForm({...form, prn: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 21104032" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Full Name *</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., Om Ghotekar" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">School Email *</label>
                  <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., student01@example.test" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Department</label>
                    <select value={form.department} onChange={e => setForm({...form, department: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Branch</label>
                    <select value={form.branch} onChange={e => setForm({...form, branch: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Year</label>
                    <select value={form.year} onChange={e => setForm({...form, year: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Division</label>
                    <select value={form.division} onChange={e => setForm({...form, division: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {DIVISIONS.map(d => <option key={d} value={d}>Division {d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Semester</label>
                    <select value={form.semester} onChange={e => setForm({...form, semester: Number(e.target.value)})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      {SEMESTERS.map(s => <option key={s} value={s}>Sem {s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Roll No</label>
                    <input value={form.rollNumber} onChange={e => setForm({...form, rollNumber: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="32" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Admission Year</label>
                    <input type="number" value={form.admissionYear} onChange={e => setForm({...form, admissionYear: Number(e.target.value)})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Gender</label>
                    <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}
                      className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-bold text-foreground focus:outline-none">
                      <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-8 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-6 py-3 rounded-xl bg-secondary text-foreground font-bold text-sm border border-border">Cancel</button>
                <button onClick={handleSubmit} className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">
                  {editingId ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Import Modal */}
      <AnimatePresence>
        {showBulkModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowBulkModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-xl border border-border" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-border flex items-center justify-between">
                <h2 className="text-2xl font-black text-foreground">Bulk Import Students</h2>
                <button onClick={() => setShowBulkModal(false)} className="p-2 rounded-xl hover:bg-secondary"><X size={20} /></button>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-sm text-muted-foreground">Paste CSV data (one student per line):</p>
                <p className="text-[10px] font-black text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                  Format: PRN, Name, Email, Department, Branch, Year, Division, RollNo, Semester
                </p>
                <textarea value={bulkText} onChange={e => setBulkText(e.target.value)} rows={8}
                  className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder={`9900000011, Demo Student 1, adminstudent01@example.test, Computer Engineering, CE, TY, A, 32, 5\n9900000012, Demo Student 2, adminstudent02@example.test, Computer Engineering, CE, TY, A, 15, 5`} />
              </div>
              <div className="p-8 border-t border-border flex justify-end gap-3">
                <button onClick={() => setShowBulkModal(false)} className="px-6 py-3 rounded-xl bg-secondary text-foreground font-bold text-sm border border-border">Cancel</button>
                <button onClick={handleBulkAdd} className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">Import Students</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
