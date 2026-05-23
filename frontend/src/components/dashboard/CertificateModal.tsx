'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ShieldCheck, Award, GraduationCap, Building2, QrCode, FileText } from 'lucide-react'

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    type: string
    certificateNo: string
    date: string
    studentName: string
    prn: string
    branch: string
    content: string
  }
}

export const CertificateModal = ({ isOpen, onClose, data }: CertificateModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-5xl bg-[#fdfdfd] rounded-[20px] shadow-2xl overflow-hidden flex flex-col min-h-[80vh]"
          >
             {/* Print Actions Overlay (Hidden in real print) */}
             <div className="absolute top-8 right-8 z-50 flex gap-4 print:hidden">
                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                   <Download size={18} /> Download Official PDF
                </button>
                <button onClick={onClose} className="p-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 transition-all shadow-lg">
                   <X size={24} />
                </button>
             </div>

             {/* Certificate Content */}
             <div className="flex-1 p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden">
                {/* Institutional Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                   <img src="/vit-logo.jpg" className="w-[600px] grayscale" alt="Watermark" />
                </div>

                <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                   <img src="/vit-logo.jpg" className="w-24 mb-10" alt="VIT Logo" />
                   
                   <div className="space-y-2 mb-16">
                      <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-slate-800">Bansilal Ramnath Agarwal Charitable Trust's</h2>
                      <h1 className="text-5xl font-black uppercase tracking-tight text-primary leading-none">Vishwakarma Institute of Technology, Pune</h1>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">(An Autonomous Institute Affiliated to Savitribai Phule Pune University)</p>
                   </div>

                   <div className="w-full h-px bg-slate-100 mb-16 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfdfd] px-10">
                         <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-900 border-x-4 border-primary px-8">{data.type}</h3>
                      </div>
                   </div>

                   <div className="space-y-10 mb-20 text-xl text-slate-700 font-medium leading-[2.2] max-w-3xl">
                      <p>
                         This is to certify that Mr./Ms. <span className="font-black text-slate-900 underline decoration-slate-300 underline-offset-8">{data.studentName}</span> 
                         is/was a bonafide student of this Institute bearing PRN <span className="font-black text-slate-900">{data.prn}</span>.
                      </p>
                      <p>
                         He/She is studying in <span className="font-black text-slate-900">{data.branch}</span> 
                         during the academic year <span className="font-black text-slate-900">2025-26</span>.
                      </p>
                      <p className="text-lg leading-relaxed">
                         {data.content}
                      </p>
                   </div>

                   <div className="w-full flex justify-between items-end mt-auto pt-20">
                      <div className="text-left space-y-6">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificate No.</p>
                            <p className="text-sm font-black text-slate-800">{data.certificateNo}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Issue</p>
                            <p className="text-sm font-black text-slate-800">{data.date}</p>
                         </div>
                         <div className="pt-6">
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm inline-block">
                               <QrCode size={80} className="text-slate-900" />
                            </div>
                         </div>
                      </div>

                      <div className="text-right space-y-10">
                         <div className="space-y-4 flex flex-col items-end">
                            <div className="w-48 h-20 border-b border-slate-300 flex items-end justify-center pb-2 italic text-slate-400 text-sm">
                               Registrar Signature
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-800">Director / Registrar</p>
                         </div>
                         <div className="flex items-center gap-3 justify-end">
                            <ShieldCheck className="text-emerald-500" size={18} />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Digitally Verified Document</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Aesthetic Border */}
                <div className="absolute inset-8 border border-slate-100 rounded-[20px] pointer-events-none" />
                <div className="absolute inset-10 border-[3px] border-primary/5 rounded-[16px] pointer-events-none" />
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
