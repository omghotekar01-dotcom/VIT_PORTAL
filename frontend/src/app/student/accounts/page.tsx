'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { studentServices } from '@/lib/studentServices'
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  IndianRupee,
  FileText,
  Loader2,
  Eye
} from 'lucide-react'
import { ReceiptModal } from '@/components/dashboard/ReceiptModal'

const feeStructure = [
  { id: 1, type: 'Tuition Fee', amount: 145000, status: 'Paid', date: '2025-08-15' },
  { id: 2, type: 'Development Fee', amount: 15000, status: 'Paid', date: '2025-08-15' },
  { id: 3, type: 'Exam Fee', amount: 2500, status: 'Unpaid', date: null },
  { id: 4, type: 'Library Fee', amount: 1000, status: 'Paid', date: '2025-08-15' }
]

export default function AccountsPage() {
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null)
  
  const totalDue = feeStructure.filter(f => f.status === 'Unpaid').reduce((acc, curr) => acc + curr.amount, 0)
  
  const handlePay = async () => {
    setPaying(true)
    await studentServices.makePayment(totalDue, 'Tuition')
    setPaying(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  const handleViewReceipt = (fee: any) => {
    setSelectedReceipt({
      receiptNo: `VIT-REC-${Math.random().toString(36).substring(7).toUpperCase()}`,
      date: fee.date || new Date().toISOString().split('T')[0],
      studentName: 'OM GHOTEKAR',
      prn: '1251030180',
      items: [{ description: fee.type, amount: fee.amount }],
      total: fee.amount,
      status: 'Paid',
      paymentMethod: 'UPI / NetBanking'
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Accounts & Fees</h1>
        <p className="text-muted-foreground mt-1">Academic Year 2025-26</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group perspective-1000">
          <div className="w-full aspect-[1.586/1] rounded-[24px] bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-2xl overflow-hidden border border-white/10 transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-12 transform-style-3d">
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Due</p>
                  <h2 className="text-4xl font-black tracking-tight font-mono">₹{success ? '0' : totalDue.toLocaleString()}</h2>
                </div>
                {/* EMV Chip */}
                <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 relative overflow-hidden border border-yellow-500/50 shadow-sm">
                   <div className="absolute inset-0 border-[0.5px] border-black/10 grid grid-cols-3 grid-rows-3 opacity-30">
                      {[...Array(9)].map((_, i) => <div key={i} className="border-[0.5px] border-black/20" />)}
                   </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-lg tracking-[0.3em] font-mono opacity-90 drop-shadow-md">
                  **** **** **** {success ? '0000' : '8244'}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Card Holder</p>
                    <p className="text-sm font-bold uppercase tracking-widest drop-shadow-sm">Om Ghotekar</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Valid Thru</p>
                    <p className="text-sm font-bold font-mono drop-shadow-sm">08/26</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handlePay}
            disabled={paying || success || totalDue === 0}
            className="w-full mt-6 bg-primary text-white font-black py-4 rounded-[20px] uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            {paying ? <Loader2 className="animate-spin" size={16} /> : success ? <CheckCircle2 size={16} /> : <CreditCard size={16} />}
            {success ? 'Payment Successful' : 'Process Payment'}
          </button>
        </div>

        <div className="glass-card p-6 rounded-3xl border-border/50">
          <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <CheckCircle2 size={20} />
            <p className="text-xs font-bold uppercase tracking-widest">Paid Amount</p>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-1">₹1,61,000</h2>
          <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> Transaction Successful
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border-border/50">
          <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <FileText size={20} />
            <p className="text-xs font-bold uppercase tracking-widest">Receipts</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Download your institutional fee receipts.</p>
          <button className="flex items-center gap-2 text-primary font-bold hover:underline">
            <Download size={16} /> View all receipts
          </button>
        </div>
      </div>

      <div className="glass-card rounded-3xl border-border/50 overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-bold text-foreground">Fee Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/30">
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {feeStructure.map((fee) => (
                <tr key={fee.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-foreground">{fee.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-foreground">₹{fee.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      fee.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{fee.date || '-'}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {fee.status === 'Paid' ? (
                      <button 
                        onClick={() => handleViewReceipt(fee)}
                        className="text-primary hover:text-primary/80 transition-all hover:scale-110 flex items-center gap-2 justify-end w-full"
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">View Receipt</span>
                        <Eye size={18} />
                      </button>
                    ) : (
                      <button className="text-xs font-bold text-primary hover:underline">Pay Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReceiptModal 
        isOpen={!!selectedReceipt} 
        onClose={() => setSelectedReceipt(null)} 
        data={selectedReceipt || {}} 
      />
    </div>
  )
}
