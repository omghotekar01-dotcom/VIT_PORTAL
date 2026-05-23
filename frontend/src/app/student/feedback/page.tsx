'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  ChevronRight,
  Sparkles,
  X,
  Loader2
} from 'lucide-react'
import { useState } from 'react'

const feedbackForms = [
  { id: 'FAC-EVAL-25', title: 'Faculty Evaluation (Term I)', deadline: 'Oct 15, 2025', category: 'Academic' },
  { id: 'CAMP-INFRA', title: 'Campus Infrastructure Feedback', deadline: 'Ongoing', category: 'Institutional' },
  { id: 'LIB-SERV', title: 'Library Services Survey', deadline: 'Nov 02, 2025', category: 'Services' },
]

export default function FeedbackPage() {
  const [selectedForm, setSelectedForm] = useState<any>(null)
  const [ratings, setRatings] = useState<any>({ q1: 0, q2: 0, q3: 0, q4: 0 })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (q: string, r: number) => setRatings({ ...ratings, [q]: r })

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSelectedForm(null)
    }, 3000)
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-2">
         <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
            Feedback Hub <MessageSquare className="text-primary" />
         </h1>
         <p className="text-slate-500 font-medium">Your voice shapes the future of VIT Pune. All submissions are processed anonymously.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-4 space-y-6">
            {feedbackForms.map((form) => (
              <motion.button
                key={form.id}
                whileHover={{ x: 10 }}
                onClick={() => setSelectedForm(form)}
                className={`w-full text-left p-8 rounded-[40px] border transition-all relative overflow-hidden group ${
                  selectedForm?.id === form.id 
                    ? 'bg-primary text-white border-primary shadow-xl' 
                    : 'bg-white text-slate-800 border-slate-100 hover:border-primary/30 shadow-sm'
                }`}
              >
                 <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-start">
                       <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                         selectedForm?.id === form.id ? 'bg-white/10' : 'bg-slate-50 text-slate-400'
                       }`}>
                          {form.category}
                       </span>
                       <ChevronRight size={18} className={selectedForm?.id === form.id ? 'text-white' : 'text-slate-200'} />
                    </div>
                    <div>
                       <h4 className="text-xl font-black leading-tight uppercase tracking-tight">{form.title}</h4>
                       <p className={`text-xs mt-2 font-bold ${selectedForm?.id === form.id ? 'text-white/60' : 'text-slate-400'}`}>
                          Deadline: {form.deadline}
                       </p>
                    </div>
                 </div>
                 {selectedForm?.id === form.id && (
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                       <Sparkles size={80} />
                    </div>
                 )}
              </motion.button>
            ))}
         </div>

         <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
               {selectedForm ? (
                 <motion.div
                   key="form"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="bg-white rounded-[50px] border border-slate-100 shadow-xl overflow-hidden"
                 >
                    {submitted ? (
                       <div className="p-20 text-center space-y-6">
                          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto">
                             <CheckCircle2 size={48} />
                          </div>
                          <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Submission Received</h3>
                          <p className="text-slate-500 font-medium">Thank you for your valuable input. Redirecting to hub...</p>
                       </div>
                    ) : (
                       <div className="p-12 space-y-10">
                          <div className="flex items-center justify-between">
                             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{selectedForm.title}</h3>
                             <button onClick={() => setSelectedForm(null)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                                <CloseIcon size={20} />
                             </button>
                          </div>

                          <div className="space-y-12">
                             {[
                               { id: 'q1', text: 'Quality of course content and delivery' },
                               { id: 'q2', text: 'Availability and support of the faculty' },
                               { id: 'q3', text: 'Relevance of assignments and practicals' },
                               { id: 'q4', text: 'Overall satisfaction with the learning environment' }
                             ].map((q, i) => (
                               <div key={q.id} className="space-y-6">
                                  <div className="flex gap-4">
                                     <span className="text-2xl font-black text-slate-200">0{i+1}</span>
                                     <p className="text-lg font-bold text-slate-700">{q.text}</p>
                                  </div>
                                  <div className="flex gap-4">
                                     {[1, 2, 3, 4, 5].map((star) => (
                                       <button
                                         key={star}
                                         onClick={() => handleRating(q.id, star)}
                                         className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                           ratings[q.id] >= star 
                                             ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                                             : 'bg-slate-50 text-slate-300 hover:bg-slate-100'
                                         }`}
                                       >
                                          <Star size={24} fill={ratings[q.id] >= star ? 'currentColor' : 'none'} />
                                       </button>
                                     ))}
                                  </div>
                               </div>
                             ))}
                          </div>

                          <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                             <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                                <AlertCircle size={16} />
                                Once submitted, response cannot be altered.
                             </div>
                             <button 
                               onClick={handleSubmit}
                               disabled={submitting || Object.values(ratings).some(v => v === 0)}
                               className="bg-primary text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:grayscale"
                             >
                                {submitting ? <Spinner className="animate-spin" size={20} /> : <Send size={20} />}
                                {submitting ? 'Submitting...' : 'Complete Feedback'}
                             </button>
                          </div>
                       </div>
                    )}
                 </motion.div>
               ) : (
                 <div className="h-full min-h-[500px] rounded-[50px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-20">
                    <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mb-8">
                       <Zap size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-300 uppercase tracking-tight">Select a form to start</h3>
                    <p className="text-slate-400 font-medium mt-2 max-w-sm">Choose an active feedback form from the left panel to begin your submission.</p>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}

function CloseIcon({ size }: any) { return <motion.div><AlertCircle size={size} /></motion.div> }
function Spinner({ className, size }: any) { return <motion.div className={className} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles size={size} /></motion.div> }
