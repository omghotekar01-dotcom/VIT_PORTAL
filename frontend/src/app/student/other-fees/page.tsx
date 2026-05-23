'use client'

import { motion } from 'framer-motion'
import { 
  IndianRupee, 
  CreditCard, 
  Download, 
  AlertCircle,
  FileText,
  ChevronRight
} from 'lucide-react'

export default function OtherFeesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Other Fees & Fines</h1>
        <p className="text-muted-foreground mt-1">Manage miscellaneous payments like exam fees and hostel fines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-foreground">Pending Charges</h3>
           {[
             { name: 'Re-evaluation Fee', amount: 500, due: 'Oct 30', type: 'Exam' },
             { name: 'Late Library Return', amount: 50, due: 'Immed.', type: 'Fine' },
           ].map((fee, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-6 rounded-[32px] border-border/50 group hover:border-primary/30 transition-all flex items-center justify-between"
             >
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                   <AlertCircle className="text-red-500" size={24} />
                 </div>
                 <div>
                   <h4 className="text-lg font-bold text-foreground">{fee.name}</h4>
                   <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{fee.type} · Due: {fee.due}</p>
                 </div>
               </div>
               <div className="text-right">
                  <p className="text-xl font-black text-foreground mb-1">₹{fee.amount}</p>
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Pay Now</button>
               </div>
             </motion.div>
           ))}
        </div>

        <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
           <h3 className="text-xl font-bold text-foreground mb-6">Payment History</h3>
           <div className="space-y-4">
              {[
                { name: 'Duplicate ID Card', amount: 200, date: 'Aug 12', status: 'Success' },
                { name: 'Cultural Fest Entry', amount: 150, date: 'Sep 02', status: 'Success' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                       <FileText size={18} />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-foreground">{h.name}</p>
                       <p className="text-[10px] text-muted-foreground">{h.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-bold text-foreground">₹{h.amount}</p>
                     <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">{h.status}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}
