'use client'

import { motion } from 'framer-motion'
import { Search, Download, Filter, GraduationCap, CheckCircle2, XCircle, Clock, Building2, ExternalLink } from 'lucide-react'

const students = [
  { prn: '12210101', name: 'Aarav Patel', branch: 'Computer', cgpa: 9.2, status: 'Placed', company: 'Microsoft', package: '44 LPA' },
  { prn: '12210102', name: 'Sneha Sharma', branch: 'IT', cgpa: 8.8, status: 'Placed', company: 'NVIDIA', package: '28 LPA' },
  { prn: '12210103', name: 'Rohan Gupta', branch: 'ENTC', cgpa: 7.9, status: 'In Process', company: 'Adobe', package: 'TBD' },
  { prn: '12210104', name: 'Priya Singh', branch: 'Computer', cgpa: 8.5, status: 'Unplaced', company: '-', package: '-' },
  { prn: '12210105', name: 'Vikram Joshi', branch: 'Mechanical', cgpa: 6.8, status: 'Not Eligible', company: '-', package: '-' },
]

export default function TPOStudents() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
            Placement Records <GraduationCap className="text-primary" size={28} />
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Monitor student eligibility, interview status, and offers.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary hover:bg-card border border-border text-foreground font-black text-sm uppercase tracking-widest transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden rounded-[32px] border-border">
        {/* Search Bar */}
        <div className="p-4 border-b border-border bg-secondary/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text"
              placeholder="Search by PRN, Name, or Company..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-secondary/30">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">PRN</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student Info</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Academic</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Placement Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Company & Offer</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {students.map((student, i) => (
                <motion.tr 
                  key={student.prn}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-secondary/20 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-foreground tracking-widest">{student.prn}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-foreground">{student.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground mt-0.5">{student.branch}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-primary">{student.cgpa}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">CGPA</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      student.status === 'Placed' ? 'bg-emerald-500/10 text-emerald-500' :
                      student.status === 'In Process' ? 'bg-amber-500/10 text-amber-500' :
                      student.status === 'Not Eligible' ? 'bg-red-500/10 text-red-500' :
                      'bg-slate-500/10 text-slate-500'
                    }`}>
                      {student.status === 'Placed' && <CheckCircle2 size={12} />}
                      {student.status === 'In Process' && <Clock size={12} />}
                      {student.status === 'Not Eligible' && <XCircle size={12} />}
                      {student.status === 'Unplaced' && <Clock size={12} />}
                      {student.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.company !== '-' ? (
                      <div>
                        <p className="text-sm font-bold text-foreground flex items-center gap-1">
                          <Building2 size={12} className="text-muted-foreground" /> {student.company}
                        </p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-0.5">{student.package}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
