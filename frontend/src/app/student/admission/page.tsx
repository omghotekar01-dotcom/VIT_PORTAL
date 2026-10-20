'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { studentServices } from '@/lib/studentServices'
import { 
  FileCheck, 
  User, 
  MapPin, 
  Calendar,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye
} from 'lucide-react'
import { ReceiptModal } from '@/components/dashboard/ReceiptModal'

const documentsData = [
  { name: 'Aadhar Card', status: 'Verified', date: '2021-08-20' },
  { name: '10th Marksheet', status: 'Verified', date: '2021-08-20' },
  { name: '12th Marksheet', status: 'Verified', date: '2021-08-20' },
  { name: 'CET Scorecard', status: 'Verified', date: '2021-08-20' },
  { name: 'Income Certificate', status: 'Pending', date: null }
]

export default function AdmissionPage() {
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)

  const handleUpload = async () => {
    setUploading(true)
    await studentServices.uploadDocument(null)
    setUploading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admission Details</h1>
        <p className="text-muted-foreground mt-1">Direct Second Year Admission · 2021-22</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-6">Institutional Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">PRN Number</p>
                  <p className="text-lg font-bold text-foreground">21104032</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                  <FileCheck className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Branch</p>
                  <p className="text-lg font-bold text-foreground">Computer Engineering</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Admission Year</p>
                  <p className="text-lg font-bold text-foreground">2021</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Category</p>
                  <p className="text-lg font-bold text-foreground">Open (General)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[40px] border-border/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-foreground">Documents Repository</h3>
              <button 
                onClick={handleUpload}
                disabled={uploading}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50"
              >
                {uploading ? <Loader2 className="animate-spin" size={14} /> : success ? <CheckCircle2 size={14} /> : <Upload size={14} />}
                {success ? 'Uploaded' : 'Upload New'}
              </button>
            </div>
            <div className="space-y-4">
              {documentsData.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/50 group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center">
                      <FileCheck className={doc.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'} size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{doc.name}</p>
                      <p className="text-[10px] text-muted-foreground">{doc.date || 'Upload pending verification'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                      doc.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {doc.status}
                    </span>
                    <button 
                      onClick={() => setShowReceipt(true)}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline">Receipt</span>
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-primary" size={24} />
              <h3 className="text-lg font-bold text-foreground">Admission Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              For any queries regarding your admission status or document verification, contact the administration office.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-background border border-border">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Email</p>
                <p className="text-sm font-bold text-foreground">admissions@example.test</p>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-border">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Phone</p>
                <p className="text-sm font-bold text-foreground">+91 20 2420 2202</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => setShowReceipt(false)} 
        data={{
          receiptNo: 'VIT-ADM-2021-X92',
          date: '2021-08-20',
          studentName: 'OM GHOTEKAR',
          prn: '21104032',
          items: [
            { description: 'Admission Fees (FY)', amount: 165000 },
            { description: 'Security Deposit', amount: 5000 }
          ],
          total: 170000,
          status: 'Paid',
          paymentMethod: 'Demand Draft / UPI'
        }} 
      />
    </div>
  )
}
