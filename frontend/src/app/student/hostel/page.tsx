'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Home, 
  MapPin, 
  User, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Zap,
  Building2,
  Wifi,
  Coffee,
  ShieldCheck,
  Eye,
  Download
} from 'lucide-react'
import { ReceiptModal } from '@/components/dashboard/ReceiptModal'

const hostelDetails = {
  name: 'VIT Boys Hostel - Block B',
  room: '402',
  bed: 'A',
  warden: 'Mr. R. K. Shinde',
  contact: '+91 20 2420 2210',
  status: 'Allotted'
}

const feeHistory = [
  { id: 1, type: 'Hostel Rent (Sem V)', amount: 65000, date: '2025-07-20', status: 'Paid' },
  { id: 2, type: 'Mess Fees (Oct)', amount: 4500, date: '2025-10-01', status: 'Paid' },
  { id: 3, type: 'Security Deposit', amount: 10000, date: '2021-08-20', status: 'Paid' },
]

export default function HostelPage() {
  const [showReceipt, setShowReceipt] = useState(false)
  const [selectedFee, setSelectedFee] = useState<any>(null)

  const handleViewReceipt = (fee: any) => {
    setSelectedFee(fee)
    setShowReceipt(true)
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
               Hostel & Residence <Home className="text-primary" />
            </h1>
            <p className="text-slate-500 font-medium text-lg">Manage your on-campus living, mess records, and facilities.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Room & Info */}
         <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="p-10 rounded-[50px] bg-slate-900 text-white relative overflow-hidden group shadow-2xl"
               >
                  <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:scale-110 transition-transform duration-500">
                     <Building2 size={140} />
                  </div>
                  <div className="relative z-10 space-y-8">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Room Allotment</span>
                        <div className="bg-emerald-400 text-emerald-950 px-3 py-1 rounded-full text-[9px] font-black uppercase">Active</div>
                     </div>
                     <div>
                        <h2 className="text-5xl font-black tracking-tighter mb-2">Room {hostelDetails.room}</h2>
                        <p className="text-lg font-bold text-white/60">{hostelDetails.name}</p>
                     </div>
                     <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                        <div>
                           <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Bed Number</p>
                           <p className="text-sm font-black text-white uppercase">{hostelDetails.bed}</p>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Warden</p>
                           <p className="text-sm font-black text-white uppercase">{hostelDetails.warden}</p>
                        </div>
                     </div>
                  </div>
               </motion.div>

               <div className="space-y-6">
                  <div className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                           <Wifi size={24} />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Internet Access</h4>
                           <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">High Speed Connected</p>
                        </div>
                     </div>
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                           <Coffee size={24} />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Mess Status</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dinner: 7:30 - 9:30 PM</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Hostel Financials</h3>
                  <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
                     <CreditCard size={14} /> Pay Mess Fees
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/50">
                        <tr>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Receipt</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {feeHistory.map((fee) => (
                           <tr key={fee.id} className="hover:bg-slate-50/50 transition-all group">
                              <td className="px-8 py-5">
                                 <p className="text-sm font-bold text-slate-800 uppercase">{fee.type}</p>
                              </td>
                              <td className="px-8 py-5 text-xs font-bold text-slate-500">{fee.date}</td>
                              <td className="px-8 py-5 text-sm font-black text-slate-900">₹{fee.amount.toLocaleString()}</td>
                              <td className="px-8 py-5 text-right">
                                 <button 
                                   onClick={() => handleViewReceipt(fee)}
                                   className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-white hover:shadow-md transition-all border border-slate-100 flex items-center gap-2 ml-auto"
                                 >
                                    <Eye size={18} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">View</span>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Compliance & Support */}
         <div className="lg:col-span-4 space-y-8">
            <div className="p-10 rounded-[50px] bg-gradient-to-br from-primary/10 to-indigo-600/10 border border-primary/20 space-y-8">
               <div className="flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={24} />
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Policies</h3>
               </div>
               <ul className="space-y-6">
                  {[
                    'Late entry after 10:00 PM requires written permission.',
                    'Zero tolerance policy for ragging.',
                    'Room cleanliness is subject to weekly inspection.'
                  ].map((rule, i) => (
                    <li key={i} className="flex gap-4 text-xs font-bold text-slate-500 leading-relaxed">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" /> {rule}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 text-center space-y-6">
               <AlertCircle size={40} className="text-amber-500 mx-auto" />
               <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Need Support?</h4>
               <p className="text-xs text-slate-500 font-medium">Contact the Hostel administration for maintenance or grievance reporting.</p>
               <div className="pt-4 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Email</p>
                  <p className="text-sm font-black text-slate-800">hostel.care@vit.edu</p>
               </div>
            </div>
         </div>
      </div>

      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => setShowReceipt(false)} 
        data={{
          receiptNo: `VIT-HOS-${Math.random().toString(36).substring(7).toUpperCase()}`,
          date: selectedFee?.date || '',
          studentName: 'OM GHOTEKAR',
          prn: '1251030180',
          items: [{ description: selectedFee?.type || '', amount: selectedFee?.amount || 0 }],
          total: selectedFee?.amount || 0,
          status: 'Paid',
          paymentMethod: 'Hostel Portal Sync'
        }} 
      />
    </div>
  )
}
