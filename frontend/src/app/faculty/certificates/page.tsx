'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  User, 
  FileText, 
  Search,
  Filter,
  Check,
  X,
  Loader2
} from 'lucide-react'

const initialRequests = [
  { id: 1, student: 'Om Ghotekar', prn: '1251030180', type: 'Bonafide Certificate', date: '2025-09-20', status: 'Pending' },
  { id: 2, student: 'Aditya Patil', prn: '1251030195', type: 'Character Certificate', date: '2025-09-19', status: 'Pending' },
  { id: 3, student: 'Sneha Kulkarni', prn: '1251030210', type: 'Tuition Fee Structure', date: '2025-09-18', status: 'Approved' },
  { id: 4, student: 'Rahul More', prn: '1251030150', type: 'NOC for Internship', date: '2025-09-17', status: 'Pending' },
]

export default function FacultyCertificatesPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [processingId, setProcessingId] = useState<number | null>(null)

  const handleAction = async (id: number, status: 'Approved' | 'Rejected') => {
    setProcessingId(id)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setProcessingId(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Certificate Requests</h1>
          <p className="text-slate-500 mt-1">Review and approve student institutional certificate applications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</p>
          <h3 className="text-2xl font-black text-slate-800">{requests.filter(r => r.status === 'Pending').length}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Approved Today</p>
          <h3 className="text-2xl font-black text-emerald-600">12</h3>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-800">Incoming Requests</h3>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search PRN or Name..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500 transition-all outline-none w-64"
                />
             </div>
             <button className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all">
                <Filter size={18} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Details</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificate Type</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {requests.map((req, i) => (
                <motion.tr
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 transition-all"
                >
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-bold text-slate-800">{req.student}</p>
                      <p className="text-xs text-slate-500 font-medium">{req.prn}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                       <FileText size={16} className="text-purple-500" />
                       {req.type}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-bold text-slate-500">{req.date}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 
                      req.status === 'Rejected' ? 'bg-red-50 text-red-600' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleAction(req.id, 'Rejected')}
                          disabled={processingId === req.id}
                          className="p-2 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                        >
                          <X size={18} />
                        </button>
                        <button 
                          onClick={() => handleAction(req.id, 'Approved')}
                          disabled={processingId === req.id}
                          className="p-2 rounded-xl bg-emerald-500 text-white hover:scale-110 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                        >
                          {processingId === req.id ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Handled
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
