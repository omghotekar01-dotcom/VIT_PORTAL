'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Printer, Share2, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react'

interface ReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    receiptNo: string
    date: string
    studentName: string
    prn: string
    items: Array<{ description: string; amount: number }>
    total: number
    status: string
    paymentMethod: string
  }
}

export const ReceiptModal = ({ isOpen, onClose, data }: ReceiptModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Action Panel */}
            <div className="w-full md:w-20 bg-slate-900 flex flex-col items-center py-8 gap-6">
               <button onClick={onClose} className="p-3 text-white/40 hover:text-white transition-colors">
                  <X size={24} />
               </button>
               <div className="flex-1" />
               <button className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 transition-all">
                  <Download size={20} />
               </button>
               <button className="p-3 text-white/40 hover:text-white transition-colors">
                  <Printer size={20} />
               </button>
               <button className="p-3 text-white/40 hover:text-white transition-colors">
                  <Share2 size={20} />
               </button>
            </div>

            {/* Receipt Content */}
            <div className="flex-1 bg-white p-8 md:p-12 overflow-y-auto max-h-[90vh]">
               <div className="flex justify-between items-start mb-12">
                  <div className="space-y-4">
                     <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100">
                        <img 
                          src="/vit-logo.jpg" 
                          className="w-full h-full object-contain"
                          alt="VIT"
                        />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Receipt</h2>
                        <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">{data.receiptNo}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle2 size={10} /> {data.status}
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Transaction Date</p>
                     <p className="text-sm font-black text-slate-800">{data.date}</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-slate-100">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billed To</p>
                     <p className="text-lg font-black text-slate-800 uppercase">{data.studentName}</p>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">PRN: {data.prn}</p>
                  </div>
                  <div className="text-right space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Method</p>
                     <p className="text-lg font-black text-slate-800 uppercase">{data.paymentMethod}</p>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Digital UPI / NetBanking</p>
                  </div>
               </div>

               <div className="space-y-6 mb-12">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Item Description</p>
                  {data.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                       <p className="text-sm font-bold text-slate-700">{item.description}</p>
                       <p className="text-sm font-black text-slate-900">₹{item.amount.toLocaleString()}</p>
                    </div>
                  ))}
               </div>

               <div className="bg-slate-50 rounded-[32px] p-8 space-y-4">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                     <span>Subtotal</span>
                     <span>₹{data.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                     <span>Tax (Institutional)</span>
                     <span>₹0.00</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                     <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Total Paid</span>
                     <span className="text-2xl font-black text-primary">₹{data.total.toLocaleString()}</span>
                  </div>
               </div>

               <div className="mt-12 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        <ShieldCheck className="text-emerald-500" size={20} />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase leading-tight tracking-widest">
                        Digitally Verified<br/>VIT Finance Dept.
                     </p>
                  </div>
                  <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                     <QrCode size={48} className="text-slate-800" />
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
