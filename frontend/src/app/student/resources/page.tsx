'use client'

import { motion } from 'framer-motion'
import { 
  Share2, 
  Download, 
  Search, 
  FileText, 
  Video, 
  FileArchive,
  ChevronRight,
  Filter
} from 'lucide-react'

const resources = [
  { id: 1, name: 'DBMS Unit 1 Notes.pdf', type: 'PDF', subject: 'DBMS', size: '2.4 MB' },
  { id: 2, name: 'OS Process Management.mp4', type: 'Video', subject: 'OS', size: '45 MB' },
  { id: 3, name: 'Networking Lab Manual.zip', type: 'Archive', subject: 'CN', size: '12 MB' },
  { id: 4, name: 'Software Engineering Syllabus.pdf', type: 'PDF', subject: 'SE', size: '1.1 MB' },
]

export default function ResourceSharingPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resource Sharing</h1>
          <p className="text-muted-foreground mt-1">Access and download academic study materials and notes.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-[32px] border border-border shadow-sm">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search by subject or file name..." 
            className="w-full bg-secondary border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-2xl text-sm font-bold border border-border hover:bg-background transition-all whitespace-nowrap">
            <Filter size={18} /> All Subjects
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all whitespace-nowrap">
            <Share2 size={18} /> Upload Resource
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((res, i) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[40px] border-border/50 group hover:border-primary/30 transition-all flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
              {res.type === 'PDF' && <FileText className="text-red-500" size={28} />}
              {res.type === 'Video' && <Video className="text-blue-500" size={28} />}
              {res.type === 'Archive' && <FileArchive className="text-amber-500" size={28} />}
            </div>
            
            <h4 className="text-base font-bold text-foreground mb-1 line-clamp-1">{res.name}</h4>
            <div className="flex items-center gap-2 mb-6">
               <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-lg">
                 {res.subject}
               </span>
               <span className="text-[10px] text-muted-foreground">{res.size}</span>
            </div>

            <button className="w-full mt-auto py-3 rounded-2xl bg-secondary text-foreground text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
              <Download size={14} /> Download
            </button>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30 flex items-center justify-between">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-sm">
             <Share2 className="text-primary" size={32} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-foreground">Cloud Storage Integration</h3>
             <p className="text-sm text-muted-foreground">Access your institutional Google Drive and OneDrive folders directly.</p>
           </div>
        </div>
        <button className="bg-foreground text-background px-8 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all">
          Connect Storage
        </button>
      </div>
    </div>
  )
}
