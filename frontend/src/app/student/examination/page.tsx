'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  History,
  TrendingUp,
  FileQuestion,
  Loader2,
  ChevronRight,
  Printer,
  Share2,
  X,
  Award,
  Zap,
  Info
} from 'lucide-react'
import { useState } from 'react'
import { studentServices } from '@/lib/studentServices'
import { HallTicketModal } from '@/components/dashboard/HallTicketModal'

const currentExams = [
  { id: 'MSE-OCT-25', title: 'Mid-Semester Exam (MSE)', date: 'Oct 15 - Oct 22, 2025', status: 'Upcoming', hallTicket: true },
  { id: 'ESE-DEC-25', title: 'End-Semester Exam (ESE)', date: 'Dec 01 - Dec 15, 2025', status: 'Scheduled', hallTicket: false },
]

const results = [
  { sem: 4, gpa: 9.42, status: 'Released', date: 'June 2025' },
  { sem: 3, gpa: 9.15, status: 'Released', date: 'Jan 2025' },
  { sem: 2, gpa: 8.85, status: 'Released', date: 'June 2024' },
  { sem: 1, gpa: 9.05, status: 'Released', date: 'Jan 2024' },
]

export default function ExaminationPage() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [viewingMarksheet, setViewingMarksheet] = useState<any>(null)
  const [loadingMarksheet, setLoadingMarksheet] = useState(false)
  const [viewingHallTicket, setViewingHallTicket] = useState<any>(null)

  const handleDownloadHallTicket = async (examId: string) => {
    setDownloading(examId)
    await studentServices.downloadHallTicket(examId)
    setDownloading(null)
    setViewingHallTicket({
      ticketId: `VIT-HT-${Math.random().toString(36).substring(7).toUpperCase()}`,
      examTitle: 'Mid-Semester Exam (MSE) - Oct 2025',
      studentName: 'OM GHOTEKAR',
      prn: '1251030180',
      branch: 'Computer Engineering (AI/ML)',
      center: 'VIT Main Campus, Bibwewadi, Pune - 411037',
      schedule: [
        { subject: 'Advanced Algorithms', date: 'Oct 15, 2025', time: '09:00 AM - 12:00 PM', seatNo: 'L-501/A1' },
        { subject: 'Deep Learning', date: 'Oct 17, 2025', time: '02:00 PM - 05:00 PM', seatNo: 'L-501/A1' },
        { subject: 'Software Architecture', date: 'Oct 20, 2025', time: '09:00 AM - 12:00 PM', seatNo: 'L-501/A1' }
      ]
    })
  }

  const handleViewMarksheet = async (sem: number) => {
    setLoadingMarksheet(true)
    const data: any = await studentServices.getGradeSheet(sem)
    setViewingMarksheet({ ...data, sem })
    setLoadingMarksheet(false)
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">Examination & Results</h1>
          <p className="text-slate-500 font-medium">Access your hall tickets, grade sheets, and SGPA/CGPA history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Exams & Hall Tickets */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
               <FileQuestion className="text-primary" size={24} /> Upcoming Assessments
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {currentExams.map((exam) => (
                 <motion.div
                   key={exam.id}
                   whileHover={{ y: -5 }}
                   className="glass-card p-8 rounded-[40px] border-slate-100 relative overflow-hidden group"
                 >
                   <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                      <FileText size={80} />
                   </div>
                   <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between">
                         <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                           exam.status === 'Upcoming' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                         }`}>
                           {exam.status}
                         </span>
                         <p className="text-[10px] font-black text-slate-400">{exam.id}</p>
                      </div>
                      <div>
                         <h4 className="text-xl font-black text-slate-800 uppercase leading-tight">{exam.title}</h4>
                         <p className="text-xs text-slate-500 font-bold mt-1">{exam.date}</p>
                      </div>
                      
                      {exam.hallTicket ? (
                        <button 
                          onClick={() => handleDownloadHallTicket(exam.id)}
                          disabled={downloading === exam.id}
                          className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                          {downloading === exam.id ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                          {downloading === exam.id ? 'Generating...' : 'Hall Ticket'}
                        </button>
                      ) : (
                        <div className="w-full py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-100">
                           <Loader2 size={16} /> Not Released
                        </div>
                      )}
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>

          {/* Results History */}
          <div className="space-y-6 pt-4">
             <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <History className="text-primary" size={24} /> Grade History
             </h3>
             <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-slate-50/50 border-b border-slate-100">
                      <tr>
                         <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Semester</th>
                         <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Result Date</th>
                         <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">SGPA</th>
                         <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Marksheet</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {results.map((res) => (
                        <tr key={res.sem} className="hover:bg-slate-50/30 transition-all group">
                           <td className="px-8 py-5 font-bold text-slate-800">Semester {res.sem}</td>
                           <td className="px-8 py-5 text-xs font-bold text-slate-500">{res.date}</td>
                           <td className="px-8 py-5">
                              <span className="font-black text-primary text-xl">{res.gpa}</span>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <button 
                                onClick={() => handleViewMarksheet(res.sem)}
                                disabled={loadingMarksheet}
                                className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all border border-slate-100 flex items-center gap-2 ml-auto"
                              >
                                {loadingMarksheet ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
                                <span className="text-[10px] font-black uppercase tracking-widest">View Grade Sheet</span>
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Exam Guidelines & Stats */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-10 rounded-[40px] bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Award size={120} />
              </div>
              <TrendingUp className="mb-6 opacity-80" size={36} />
              <h3 className="text-2xl font-black mb-2 tracking-tight uppercase">Current Standing</h3>
              <p className="text-white/60 text-xs mb-8 font-medium">Your cumulative performance across all 4 semesters.</p>
              <div className="flex items-end gap-3 mb-4">
                 <div className="text-7xl font-black">9.24</div>
                 <div className="text-sm font-black uppercase tracking-widest mb-3 text-emerald-300 flex items-center gap-1">
                    <Zap size={14} fill="currentColor" /> Top 5%
                 </div>
              </div>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Cumulative CGPA</p>
           </div>

           <div className="glass-card p-10 rounded-[40px] border-slate-100 bg-slate-50/50 space-y-8">
              <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                 <AlertTriangle size={20} className="text-amber-500" /> Compliance Checklist
              </h4>
              <ul className="space-y-4">
                 {[
                   'Carry Physical Hall Ticket & ID Card.',
                   'Reach Exam Hall 30 Mins Before Start.',
                   'Strictly No Electronic Gadgets.',
                   'Verify Seat Number on Notice Board.'
                 ].map((rule, i) => (
                   <li key={i} className="flex gap-4 text-xs font-bold text-slate-500">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> {rule}
                   </li>
                 ))}
              </ul>
              <div className="pt-6 border-t border-slate-200">
                 <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
                    <Info className="text-primary shrink-0" size={18} />
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                      "For any discrepancies in the result, please report to the Controller of Examinations within 7 working days."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Grade Sheet Modal */}
      <AnimatePresence>
        {viewingMarksheet && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setViewingMarksheet(null)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
             >
                <div className="p-10 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                         <img 
                            src="/vit-logo.jpg" 
                            alt="Logo" 
                            className="w-8 h-8 object-contain bg-white rounded p-1"
                         />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Semester {viewingMarksheet.sem} Grade Sheet</h3>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Vishwakarma Institute of Technology, Pune</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-primary transition-all border border-slate-100">
                         <Printer size={20} />
                      </button>
                      <button 
                        onClick={() => setViewingMarksheet(null)}
                        className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 transition-all border border-slate-100"
                      >
                         <X size={20} />
                      </button>
                   </div>
                </div>

                <div className="p-12 space-y-12">
                   {/* Student Meta */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Name</p>
                         <p className="text-sm font-black text-slate-800 uppercase">Om Ghotekar</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PRN Number</p>
                         <p className="text-sm font-black text-slate-800">1251030180</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Branch</p>
                         <p className="text-sm font-black text-slate-800 uppercase">Computer Engg</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Examination</p>
                         <p className="text-sm font-black text-slate-800 uppercase">May - 2025</p>
                      </div>
                   </div>

                   {/* Grades Table */}
                   <div className="space-y-6">
                      <div className="overflow-hidden rounded-3xl border border-slate-100">
                         <table className="w-full text-left">
                            <thead className="bg-slate-900 text-white">
                               <tr>
                                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Course Code</th>
                                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Course Title</th>
                                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Credits</th>
                                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Grade</th>
                                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Points</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {viewingMarksheet.subjects.map((sub: any) => (
                                 <tr key={sub.code} className="hover:bg-slate-50 transition-all">
                                    <td className="px-8 py-5 text-xs font-black text-slate-500">{sub.code}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-800">{sub.name}</td>
                                    <td className="px-8 py-5 text-sm font-black text-slate-800 text-center">{sub.credits}</td>
                                    <td className="px-8 py-5 text-center">
                                       <span className="px-3 py-1 bg-primary/5 text-primary rounded-lg font-black text-xs">{sub.grade}</span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-black text-slate-800 text-center">{sub.points}</td>
                                 </tr>
                               ))}
                            </tbody>
                            <tfoot className="bg-slate-50/50">
                               <tr className="border-t-2 border-slate-900">
                                  <td colSpan={2} className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Semester Aggregates</td>
                                  <td className="px-8 py-5 text-sm font-black text-slate-800 text-center">{viewingMarksheet.totalCredits}</td>
                                  <td colSpan={2} className="px-8 py-5 text-right">
                                     <div className="flex justify-end items-center gap-8">
                                        <div>
                                           <span className="text-[10px] font-black uppercase text-slate-400 mr-2 tracking-widest">SGPA:</span>
                                           <span className="text-lg font-black text-primary">{viewingMarksheet.sgpa}</span>
                                        </div>
                                        <div>
                                           <span className="text-[10px] font-black uppercase text-slate-400 mr-2 tracking-widest">CGPA:</span>
                                           <span className="text-lg font-black text-slate-900">{viewingMarksheet.cgpa}</span>
                                        </div>
                                     </div>
                                  </td>
                               </tr>
                            </tfoot>
                         </table>
                      </div>
                   </div>

                   {/* Signature & Seal */}
                   <div className="flex justify-between items-end pt-10">
                      <div className="space-y-2">
                         <div className="w-32 h-16 border-b-2 border-slate-200 flex items-end justify-center pb-2 italic text-slate-400 text-xs">
                            Institutional Seal
                         </div>
                         <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Registrar Office</p>
                      </div>
                      <div className="text-right space-y-2">
                         <div className="w-48 h-16 border-b-2 border-slate-200 flex items-end justify-end pb-2">
                            <span className="font-serif italic text-slate-800">C.E. Deshmukh</span>
                         </div>
                         <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Controller of Examinations</p>
                      </div>
                   </div>

                   <button className="w-full py-5 rounded-[24px] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 mt-10">
                      <Download size={20} /> Download Official PDF
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
      <HallTicketModal 
        isOpen={!!viewingHallTicket} 
        onClose={() => setViewingHallTicket(null)} 
        data={viewingHallTicket || {}} 
      />
    </div>
  )
}
