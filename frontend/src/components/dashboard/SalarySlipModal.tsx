'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Printer, ShieldCheck, QrCode, Briefcase, Calendar, CreditCard, Building2 } from 'lucide-react'

interface SalarySlipModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    slipNo: string
    month: string
    year: string
    employeeName: string
    employeeId: string
    designation: string
    department: string
    bankAccount: string
    pan: string
    earnings: Array<{ label: string; amount: number }>
    deductions: Array<{ label: string; amount: number }>
    netSalary: number
  }
}

export const SalarySlipModal = ({ isOpen, onClose, data }: SalarySlipModalProps) => {
  const safeData = data || {}
  const earnings = safeData.earnings || []
  const deductions = safeData.deductions || []
  
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0)
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0)

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
            className="relative w-full max-w-4xl bg-white rounded-[50px] shadow-2xl overflow-hidden"
          >
            {/* Action Bar */}
            <div className="bg-slate-900 px-10 py-6 flex justify-between items-center text-white">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-2">
                     <img src="/vit-logo.jpg" className="w-full h-full object-contain" alt="VIT" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black uppercase tracking-tighter leading-none">Salary Slip</h2>
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{data.month} {data.year}</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-primary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                     <Download size={16} /> Download PDF
                  </button>
                  <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                     <X size={20} />
                  </button>
               </div>
            </div>

            <div className="p-10 md:p-14 overflow-y-auto max-h-[80vh]">
               {/* Employee Info Header */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="space-y-6">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Briefcase size={12} className="text-primary" /> Employee Details
                        </p>
                        <h3 className="text-2xl font-black text-slate-900 uppercase">{data.employeeName}</h3>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{data.designation} • {data.department}</p>
                     </div>
                     <div className="flex gap-10">
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Employee ID</p>
                           <p className="text-sm font-black text-slate-800">{data.employeeId}</p>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PAN Number</p>
                           <p className="text-sm font-black text-slate-800">{data.pan}</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bank Details</p>
                           <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">{data.bankAccount}</p>
                        </div>
                        <CreditCard className="text-slate-300" size={24} />
                     </div>
                     <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-end">
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Days Payable</p>
                           <p className="text-xl font-black text-slate-900">30 / 30</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Slip Number</p>
                           <p className="text-xs font-black text-primary uppercase">{data.slipNo}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Earnings vs Deductions Table */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                  {/* Earnings */}
                  <div className="space-y-6">
                     <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Earnings</h4>
                        <span className="text-xs font-black text-slate-400">Amount (₹)</span>
                     </div>
                     <div className="space-y-4">
                        {earnings.map((e, i) => (
                           <div key={i} className="flex justify-between items-center">
                              <p className="text-sm font-bold text-slate-600">{e.label}</p>
                              <p className="text-sm font-black text-slate-900">{e.amount.toLocaleString()}</p>
                           </div>
                        ))}
                     </div>
                     <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Gross Earnings</p>
                        <p className="text-lg font-black text-slate-900">₹{totalEarnings.toLocaleString()}</p>
                     </div>
                  </div>

                  {/* Deductions */}
                  <div className="space-y-6">
                     <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Deductions</h4>
                        <span className="text-xs font-black text-slate-400">Amount (₹)</span>
                     </div>
                     <div className="space-y-4">
                        {deductions.map((d, i) => (
                           <div key={i} className="flex justify-between items-center">
                              <p className="text-sm font-bold text-slate-600">{d.label}</p>
                              <p className="text-sm font-black text-rose-500">{d.amount.toLocaleString()}</p>
                           </div>
                        ))}
                     </div>
                     <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Total Deductions</p>
                        <p className="text-lg font-black text-slate-900">₹{totalDeductions.toLocaleString()}</p>
                     </div>
                  </div>
               </div>

               {/* Net Salary Highlight */}
               <div className="bg-slate-900 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl -mr-20 -mt-20"></div>
                  <div className="relative z-10">
                     <p className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-2">Net Salary Payable</p>
                     <h3 className="text-5xl font-black tracking-tighter">₹{(safeData.netSalary || 0).toLocaleString()}</h3>
                     <p className="text-sm font-bold text-primary mt-2">System Generated Document</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-6">
                     <div className="p-4 bg-white rounded-3xl">
                        <QrCode size={80} className="text-slate-900" />
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="text-emerald-500" size={18} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Digitally Signed</span>
                        </div>
                        <p className="text-[9px] font-medium text-white/30 max-w-[140px] leading-tight italic">
                           This is a computer generated document and does not require a physical signature.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Institutional Info */}
            <div className="bg-slate-50 p-8 flex items-center justify-center gap-8 border-t border-slate-100">
               <div className="flex items-center gap-2">
                  <Building2 className="text-slate-400" size={16} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">VIT Pune Main Campus</p>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
               <div className="flex items-center gap-2">
                  <Printer className="text-slate-400" size={16} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Generated Slip</p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
