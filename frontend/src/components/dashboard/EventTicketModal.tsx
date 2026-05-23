'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, MapPin, Calendar, Clock, Ticket, ShieldCheck, QrCode } from 'lucide-react'

interface EventTicketModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    title: string
    date: string
    location: string
    ticketId: string
    studentName: string
    type: string
  }
}

export const EventTicketModal = ({ isOpen, onClose, data }: EventTicketModalProps) => {
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
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            {/* Header Branding */}
            <div className="bg-primary p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-10 -mt-10"></div>
               <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Official Event Ticket</p>
                     <h2 className="text-2xl font-black uppercase tracking-tighter">VIT PUNE FEST</h2>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                     <X size={20} />
                  </button>
               </div>
            </div>

            {/* Ticket Body */}
            <div className="p-8 space-y-8 relative">
               {/* Perforated Line Mockup */}
               <div className="absolute top-0 left-0 right-0 h-px border-t-4 border-dashed border-slate-100 -mt-1" />
               
               <div className="space-y-2">
                  <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">
                     {data.type} Entry Pass
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{data.title}</h3>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={12} className="text-primary" /> Date
                     </p>
                     <p className="text-sm font-black text-slate-800 uppercase">{data.date}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={12} className="text-primary" /> Location
                     </p>
                     <p className="text-sm font-black text-slate-800 uppercase">{data.location}</p>
                  </div>
               </div>

               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass Holder</p>
                     <p className="text-lg font-black text-slate-800 uppercase">{data.studentName}</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                     <Ticket className="text-primary" size={24} />
                  </div>
               </div>

               <div className="flex flex-col items-center gap-6 py-8 border-t border-slate-100">
                  <div className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm">
                     <QrCode size={120} className="text-slate-900" />
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">Verification Code</p>
                     <p className="text-xl font-black text-slate-900 tracking-[0.2em]">{data.ticketId}</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button className="flex-1 bg-slate-900 text-white py-4 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2">
                     <Download size={18} /> Download Ticket
                  </button>
                  <button className="p-4 bg-white border border-slate-100 rounded-[24px] text-slate-400 hover:text-primary transition-all">
                     <Share2 size={20} />
                  </button>
               </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-6 flex items-center justify-center gap-3 border-t border-slate-100">
               <ShieldCheck className="text-emerald-500" size={16} />
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Authorized VIT Institutional Pass</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
