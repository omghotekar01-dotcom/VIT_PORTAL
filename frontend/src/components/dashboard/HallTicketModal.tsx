'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Printer, ShieldCheck, QrCode, MapPin, Calendar, Clock, User, Award } from 'lucide-react'

interface HallTicketModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    ticketId: string
    examTitle: string
    studentName: string
    prn: string
    branch: string
    center: string
    schedule: Array<{ subject: string; date: string; time: string; seatNo: string }>
  }
}

export const HallTicketModal = ({ isOpen, onClose, data }: HallTicketModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-4xl bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header Branding */}
            <div className="bg-slate-900 px-10 py-8 flex justify-between items-center text-white border-b border-white/10">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2 shadow-xl shadow-primary/20">
                     <img src="/vit-logo.jpg" className="w-full h-full object-contain" alt="VIT" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Examination Hall Ticket</h2>
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-1">Vishwakarma Institute of Technology, Pune</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                     <Download size={18} /> Print Ticket
                  </button>
                  <button onClick={onClose} className="p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                     <X size={24} />
                  </button>
               </div>
            </div>

            <div className="p-10 md:p-14 overflow-y-auto max-h-[75vh]">
               {/* Student & Exam Info */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Award size={12} className="text-primary" /> Examination Detail
                        </p>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{data.examTitle}</h3>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Academic Session 2025-26</p>
                     </div>
                     <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-slate-300">
                           <User size={40} />
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-800 uppercase leading-none mb-2">{data.studentName}</h4>
                           <p className="text-sm font-black text-primary uppercase tracking-widest">{data.prn}</p>
                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{data.branch}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <MapPin size={12} className="text-primary" /> Examination Center
                        </p>
                        <p className="text-xl font-black text-slate-800 uppercase max-w-sm leading-tight">{data.center}</p>
                     </div>
                     <div className="bg-slate-900 rounded-[40px] p-8 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 text-white/5">
                           <QrCode size={80} />
                        </div>
                        <div className="relative z-10">
                           <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Serial Number</p>
                           <p className="text-2xl font-black text-white tracking-widest uppercase mt-1">{data.ticketId}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Exam Schedule Table */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                     <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Assigned Schedule</h4>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Autumn Term</span>
                  </div>
                  <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                     <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                           <tr>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject / Course</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Seat No.</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {data.schedule.map((exam, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-8 py-6">
                                    <p className="text-sm font-black text-slate-800 uppercase">{exam.subject}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional Code: 824</p>
                                 </td>
                                 <td className="px-8 py-6">
                                    <div className="space-y-1">
                                       <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase">
                                          <Calendar size={12} className="text-primary" /> {exam.date}
                                       </div>
                                       <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                                          <Clock size={12} className="text-primary" /> {exam.time}
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-8 py-6 text-center">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white font-black text-xs uppercase">
                                       {exam.seatNo}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Instructions Footer */}
               <div className="mt-12 p-10 rounded-[40px] bg-slate-50 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">Exam Protocols</h5>
                     <ul className="space-y-3">
                        {['Candidate must carry physical ID card.', 'Electronic devices are strictly prohibited.', '30 mins reporting before exam start.'].map((rule, i) => (
                           <li key={i} className="flex items-center gap-3 text-xs font-medium text-slate-500">
                              <ShieldCheck className="text-emerald-500" size={14} /> {rule}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="flex items-center justify-end gap-10">
                     <div className="text-right space-y-2">
                        <div className="w-40 h-10 border-b-2 border-slate-300" />
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Controller Signature</p>
                     </div>
                     <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <QrCode size={64} className="text-slate-900" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Strip */}
            <div className="h-4 bg-gradient-to-r from-primary via-indigo-600 to-slate-900" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
