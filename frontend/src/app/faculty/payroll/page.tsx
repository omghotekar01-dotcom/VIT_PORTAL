'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  CreditCard, 
  Download, 
  Eye, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck,
  Building2,
  DollarSign,
  PieChart
} from 'lucide-react'
import { SalarySlipModal } from '@/components/dashboard/SalarySlipModal'

const salaryHistory = [
  { id: 1, month: 'September', year: '2025', netSalary: 125000, status: 'Released', date: '2025-09-30' },
  { id: 2, month: 'August', year: '2025', netSalary: 125000, status: 'Released', date: '2025-08-31' },
  { id: 3, month: 'July', year: '2025', netSalary: 125000, status: 'Released', date: '2025-07-31' },
  { id: 4, month: 'June', year: '2025', netSalary: 118000, status: 'Released', date: '2025-06-30' },
]

export default function PayrollPage() {
  const [selectedSlip, setSelectedSlip] = useState<any>(null)

  const handleViewSlip = (slip: any) => {
    setSelectedSlip({
      slipNo: `VIT-EMP-${Math.random().toString(36).substring(7).toUpperCase()}`,
      month: slip.month,
      year: slip.year,
      employeeName: 'DR. S. K. GUPTA',
      employeeId: 'EMP-CSE-2021-08',
      designation: 'Associate Professor',
      department: 'Computer Engineering',
      bankAccount: 'HDFC BANK - XXXX 8921',
      pan: 'ABCDE1234F',
      earnings: [
        { label: 'Basic Pay', amount: 85000 },
        { label: 'HRA (House Rent Allowance)', amount: 25000 },
        { label: 'DA (Dearness Allowance)', amount: 12000 },
        { label: 'Special Allowance', amount: 8000 },
        { label: 'Research Incentive', amount: 5000 }
      ],
      deductions: [
        { label: 'Provident Fund (PF)', amount: 6500 },
        { label: 'Professional Tax', amount: 200 },
        { label: 'Income Tax (TDS)', amount: 3300 }
      ],
      netSalary: slip.netSalary
    })
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">Payroll & Compensation</h1>
          <p className="text-slate-500 font-medium">Monthly salary slips, tax declarations, and financial records.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center gap-2">
              <TrendingUp size={18} /> IT Declaration
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 p-8 text-white/5">
                <DollarSign size={120} />
            </div>
            <div className="relative z-10 space-y-6">
               <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <PieChart className="text-primary" size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Annual CTC (FY 25-26)</p>
                  <h2 className="text-4xl font-black tracking-tighter">₹18,50,000</h2>
               </div>
               <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-emerald-400">
                  <ArrowUpRight size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">+12% Hike from 2024</span>
               </div>
            </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass-card p-8 rounded-[40px] border-slate-100 flex flex-col justify-between"
         >
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                     <Calendar className="text-slate-400" size={20} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Next Payout</h3>
               </div>
               <div>
                  <h2 className="text-3xl font-black text-slate-900">Oct 31, 2025</h2>
                  <p className="text-xs font-medium text-slate-400 mt-1">Status: Processing in Bank</p>
               </div>
            </div>
            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <CreditCard className="text-primary" size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">XXXX 8921</span>
               </div>
               <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Change</button>
            </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="glass-card p-8 rounded-[40px] border-slate-100 flex flex-col justify-between"
         >
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                     <ShieldCheck className="text-slate-400" size={20} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Compliance</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Provident Fund</p>
                     <span className="text-xs font-black text-slate-800">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Professional Tax</p>
                     <span className="text-xs font-black text-slate-800">Verified</span>
                  </div>
               </div>
            </div>
            <button className="w-full py-3 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">
               View Compliance docs
            </button>
         </motion.div>
      </div>

      <div className="glass-card rounded-[40px] border-slate-100 overflow-hidden shadow-xl shadow-slate-200/20">
         <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white/50">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Recent Salary Slips</h3>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-400">
               <Calendar size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Year 2025</span>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Month / Year</th>
                     <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Net Salary</th>
                     <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                     <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Payout Date</th>
                     <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {salaryHistory.map((slip) => (
                     <tr key={slip.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-8 py-6">
                           <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{slip.month} {slip.year}</p>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-sm font-black text-slate-900">₹{slip.netSalary.toLocaleString()}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                              {slip.status}
                           </span>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold text-slate-500">{slip.date}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleViewSlip(slip)}
                                className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:underline"
                              >
                                 <Eye size={16} /> View
                              </button>
                              <button className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-primary">
                                 <Download size={16} /> PDF
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="p-10 rounded-[50px] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
               <Building2 size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black uppercase tracking-tighter">Tax Planning FY 25-26</h3>
               <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Last date for proof submission: Dec 15, 2025</p>
            </div>
         </div>
         <button className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
            Plan Tax Savings
         </button>
      </div>

      <SalarySlipModal 
        isOpen={!!selectedSlip} 
        onClose={() => setSelectedSlip(null)} 
        data={selectedSlip || {}} 
      />
    </div>
  )
}
