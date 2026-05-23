'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Award, 
  Search, 
  Filter, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Download,
  Eye,
  ShieldCheck,
  Zap,
  Building2
} from 'lucide-react'
import { CertificateModal } from '@/components/dashboard/CertificateModal'

const availableCertificates = [
  { id: 'CERT-BON', title: 'Bonafide Certificate', description: 'Proof of being a student for passport, bank, or other official uses.', duration: 'Instant', cost: 'Free' },
  { id: 'CERT-TRA', title: 'Transfer Certificate (LC)', description: 'Leaving certificate required after completion of the course.', duration: '7 Working Days', cost: '₹200' },
  { id: 'CERT-LOR', title: 'Letter of Recommendation', description: 'Academic LOR from HOD/Director for higher studies.', duration: '15 Working Days', cost: 'Free' },
  { id: 'CERT-PRO', title: 'Provisional Degree', description: 'Temporary degree certificate until the final convocation.', duration: '10 Working Days', cost: '₹500' },
]

const applicationHistory = [
  { id: 'APP-9210', type: 'Bonafide Certificate', status: 'Ready', date: 'Oct 01, 2025' },
  { id: 'APP-8542', type: 'Character Certificate', status: 'Processing', date: 'Sept 25, 2025' },
]

export default function CertificatesPage() {
  const [showCertificate, setShowCertificate] = useState(false)
  const [selectedCert, setSelectedCert] = useState<any>(null)
  const [applyingId, setApplyingId] = useState<string | null>(null)

  const handleApply = async (id: string) => {
    setApplyingId(id)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setApplyingId(null)
    alert('Application submitted successfully! Tracking ID: APP-' + Math.floor(Math.random() * 10000))
  }

  const handleView = (app: any) => {
    setSelectedCert({
      type: app.type,
      certificateNo: `VIT-CRT-${Math.random().toString(36).substring(7).toUpperCase()}`,
      date: 'Oct 02, 2025',
      studentName: 'OM GHOTEKAR',
      prn: '1251030180',
      branch: 'Computer Engineering (AI/ML)',
      content: 'To the best of our knowledge, he/she bears good moral character and has been a sincere student of this institute.'
    })
    setShowCertificate(true)
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
               Certificates & Documents <Award className="text-primary" />
            </h1>
            <p className="text-slate-500 font-medium text-lg">Apply for official institutional documents and track their status.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Application Options */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
               <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search certificate type..." 
                    className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none"
                  />
               </div>
               <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-all">
                  <Filter size={20} />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {availableCertificates.map((cert, i) => (
                 <motion.div
                   key={cert.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group relative overflow-hidden"
                 >
                    <div className="relative z-10 space-y-6">
                       <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                             <FileText size={24} />
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cert.cost}</span>
                       </div>
                       
                       <div>
                          <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight group-hover:text-primary transition-colors">{cert.title}</h4>
                          <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">{cert.description}</p>
                       </div>

                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-2 rounded-xl w-fit">
                          <Clock size={12} className="text-primary" /> ETA: {cert.duration}
                       </div>

                       <button 
                         onClick={() => handleApply(cert.id)}
                         disabled={applyingId === cert.id}
                         className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                       >
                          {applyingId === cert.id ? <Zap className="animate-pulse" size={18} /> : <Plus size={18} />}
                          {applyingId === cert.id ? 'Submitting...' : 'Apply Now'}
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* History & Stats */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-8">
               <h3 className="text-xl font-black tracking-tight uppercase">Recent Applications</h3>
               <div className="space-y-4">
                  {applicationHistory.map((app, i) => (
                    <div key={i} className="p-6 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                       <div>
                          <p className="text-sm font-black text-white uppercase">{app.type}</p>
                          <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1">{app.id} · {app.date}</p>
                       </div>
                       {app.status === 'Ready' ? (
                          <button 
                            onClick={() => handleView(app)}
                            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all"
                          >
                             <Download size={18} />
                          </button>
                       ) : (
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                             <Clock size={18} />
                          </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-10 rounded-[40px] border border-slate-100 space-y-8">
               <div className="flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Institutional Seal</h3>
               </div>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  All certificates generated via this portal are digitally signed and contain a secure QR code for verification by external agencies.
               </p>
               <div className="pt-6 border-t border-slate-100 flex items-center justify-center">
                  <div className="text-center">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Official Verification Portal</p>
                     <div className="w-24 h-24 bg-slate-50 rounded-3xl border border-slate-100 p-3 mx-auto">
                        <img 
                          src="/vit-logo.jpg" 
                          alt="VIT" 
                          className="w-full h-full object-contain grayscale opacity-30" 
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <CertificateModal 
        isOpen={showCertificate} 
        onClose={() => setShowCertificate(false)} 
        data={selectedCert || {}} 
      />
    </div>
  )
}
