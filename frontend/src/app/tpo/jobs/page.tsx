'use client'

import { motion } from 'framer-motion'
import { Building2, Search, Plus, MapPin, Calendar, Briefcase, IndianRupee, Users, GraduationCap, Sparkles, Filter } from 'lucide-react'

const jobs = [
  { id: 'JOB-2024-101', company: 'NVIDIA', role: 'Software Engineer - AI', location: 'Pune', package: '24-32 LPA', criteria: 'CGPA > 8.0, No backlogs', date: '02 May 2024', status: 'Active', applicants: 124 },
  { id: 'JOB-2024-102', company: 'Microsoft', role: 'SDE-1', location: 'Bangalore', package: '18-44 LPA', criteria: 'CGPA > 7.5', date: '05 May 2024', status: 'Active', applicants: 450 },
  { id: 'JOB-2024-103', company: 'Adobe', role: 'UI/UX Engineer', location: 'Noida', package: '20-28 LPA', criteria: 'Design Portfolio Required', date: '10 May 2024', status: 'Draft', applicants: 0 },
  { id: 'JOB-2024-104', company: 'Google', role: 'Cloud Platform Engineer', location: 'Hyderabad', package: '30-40 LPA', criteria: 'CGPA > 8.5', date: '15 May 2024', status: 'Closed', applicants: 850 },
]

export default function TPOJobs() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
            Campus Drives <Sparkles className="text-primary" size={28} />
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage companies, job postings, and eligibility criteria.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary hover:bg-card border border-border text-foreground font-black text-sm uppercase tracking-widest transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
            <Plus size={18} /> Add Drive
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card p-4 rounded-3xl flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text"
            placeholder="Search companies, roles, or job IDs..."
            className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none text-foreground font-medium placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-6 md:p-8 rounded-[32px] hover:border-primary/30 transition-all group"
          >
            <div className="flex flex-col lg:flex-row gap-6 justify-between">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center font-black text-2xl text-primary shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-black text-foreground tracking-tight">{job.company}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      job.status === 'Draft' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-slate-500/10 text-slate-500 border-slate-500/20'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-muted-foreground mb-4">{job.role}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-muted-foreground">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
                      <IndianRupee size={16} className="text-primary" /> {job.package}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
                      <MapPin size={16} className="text-primary" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
                      <Calendar size={16} className="text-primary" /> {job.date}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end gap-4 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-6">
                <div className="w-full lg:w-auto text-left lg:text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Eligibility Criteria</p>
                  <div className="flex items-center lg:justify-end gap-2 text-sm font-bold text-foreground">
                    <GraduationCap size={16} className="text-primary" /> {job.criteria}
                  </div>
                </div>

                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-secondary border border-border text-foreground font-black text-sm">
                    <Users size={16} className="text-primary" /> {job.applicants} Applied
                  </div>
                  <button className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest transition-all text-center">
                    Manage Drive
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
