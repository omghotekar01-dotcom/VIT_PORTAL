'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Download, 
  Share2, 
  Phone, 
  MapPin, 
  Droplets, 
  QrCode,
  ShieldCheck,
  Zap,
  Info,
  Sparkles,
  CreditCard,
  Eye,
  Camera,
  Image as ImageIcon
} from 'lucide-react'
import { useState, useRef } from 'react'

export default function VirtualIDCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const student = {
    name: 'Om Ghotekar',
    prn: '1251030180',
    branch: 'Computer Engineering',
    batch: '2022-2026',
    validUntil: 'June 2026',
    bloodGroup: 'O+',
    emergency: '+91 98765 43210',
    address: 'Bibwewadi, Pune - 411037',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=512&h=512&auto=format&fit=crop'
  }

  return (
    <div className="min-h-screen pb-20 space-y-10 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-4">
            Next-Gen ID <CreditCard className="text-primary" size={32} />
          </h1>
          <p className="text-slate-500 font-medium text-lg">Your encrypted digital identity with holographic security.</p>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
        >
           <button className="p-4 rounded-[24px] bg-white border border-slate-100 text-slate-400 hover:text-primary transition-all shadow-sm hover:shadow-md">
              <Share2 size={20} />
           </button>
            <button className="bg-white border border-slate-200 text-slate-800 px-8 py-4 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2 group">
               <ImageIcon size={18} className="group-hover:scale-110 transition-transform" /> Download Image
            </button>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center gap-2 group">
               <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> Export Secure PDF
            </button>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 pt-10">
        {/* Interactive Card Container */}
        <div className="relative group w-full max-w-[500px] perspective-2000">
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-1000"></div>
            
            <motion.div 
              ref={cardRef}
              style={{
                rotateX: isFlipped ? 0 : rotateX,
                rotateY: isFlipped ? 180 : rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full aspect-[1.58/1] cursor-pointer shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] rounded-[35px] transition-all"
            >
              {/* Front Side */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-[35px] overflow-hidden border border-slate-100/50 flex flex-col group">
                 {/* Holographic Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hologram-effect"></div>
                 
                 {/* Shine Effect */}
                 <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                    className="absolute top-0 bottom-0 w-32 bg-white/40 skew-x-[35deg] blur-xl pointer-events-none z-20"
                 />

                 {/* Top Branding Header */}
                 <div className="bg-[#0f172a] p-7 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-10 -mt-10"></div>
                    <div className="flex items-center gap-4 relative z-10">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1.5 shadow-xl">
                          <img 
                            src="/vit-logo.jpg" 
                            alt="Logo" 
                            className="w-full h-full object-contain"
                          />
                       </div>
                       <div>
                          <p className="text-white font-black text-xs leading-tight tracking-[0.1em] uppercase">Vishwakarma Institute</p>
                          <p className="text-primary font-black text-[9px] tracking-[0.3em] uppercase mt-0.5">of Technology, Pune</p>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                           <Sparkles className="text-primary animate-pulse" size={16} />
                        </div>
                    </div>
                 </div>

                 <div className="flex-1 p-10 flex gap-10 bg-gradient-to-br from-white to-slate-50/50">
                    {/* Portrait Section */}
                    <div className="space-y-6 relative">
                       <div className="w-36 h-48 rounded-[30px] bg-slate-100 border-[6px] border-white overflow-hidden shadow-2xl relative group/photo">
                          <img src={student.photo} alt={student.name} className="w-full h-full object-cover grayscale-[30%] group-hover/photo:grayscale-0 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity" />
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover/photo:opacity-100 transition-all transform translate-y-2 group-hover/photo:translate-y-0">
                            <Camera className="text-white" size={18} />
                          </div>
                       </div>
                       <div className="text-center space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valid Until</p>
                          <p className="text-sm font-black text-slate-800 uppercase bg-slate-200/50 px-3 py-1 rounded-full">{student.validUntil}</p>
                       </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-8 pt-4">
                       <div className="space-y-2">
                          <h2 className="text-4xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter">{student.name.split(' ')[0]}<br/><span className="text-primary">{student.name.split(' ')[1]}</span></h2>
                          <div className="flex items-center gap-3">
                            <p className="text-lg font-black text-slate-900/30 uppercase tracking-widest">{student.prn}</p>
                            <ShieldCheck className="text-emerald-500" size={16} />
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engineering Branch</p>
                             <p className="text-base font-black text-slate-700">{student.branch}</p>
                          </div>
                          <div className="flex items-center gap-10">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch</p>
                                <p className="text-sm font-black text-slate-700">{student.batch}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Blood</p>
                                <p className="text-sm font-black text-rose-600">{student.bloodGroup}</p>
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 {/* Footer Security Strip */}
                 <div className="h-4 bg-gradient-to-r from-primary via-indigo-600 to-purple-700 flex items-center justify-center px-10">
                    <div className="flex gap-1">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="h-0.5 w-4 bg-white/20 rounded-full" />
                        ))}
                    </div>
                 </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 backface-hidden bg-[#0f172a] rounded-[35px] overflow-hidden border border-slate-800 flex flex-col rotate-y-180 shadow-2xl">
                 <div className="absolute inset-0 opacity-10 hologram-effect pointer-events-none" />
                 
                 <div className="p-10 flex-1 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                       <div className="space-y-8">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-[11px] font-black text-primary uppercase tracking-widest">
                                <MapPin size={14} /> Permanent Address
                             </div>
                             <p className="text-sm font-bold text-slate-300 max-w-[240px] leading-relaxed">
                                {student.address}
                             </p>
                          </div>
                          
                          <div className="space-y-6">
                             <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[11px] font-black text-rose-400 uppercase tracking-widest">
                                   <Phone size={14} /> Emergency Contact
                                </div>
                                <p className="text-xl font-black text-white tracking-widest">{student.emergency}</p>
                             </div>
                             
                             <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Info className="text-primary" size={20} />
                                <p className="text-[10px] font-bold text-slate-400 leading-tight">This ID is linked to your institutional cloud profile and Biometric records.</p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex flex-col items-center gap-4">
                           <div className="p-6 bg-white rounded-[35px] shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                              <QrCode size={120} className="text-slate-900" />
                           </div>
                           <div className="text-center">
                               <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Institutional</p>
                               <p className="text-[10px] font-black text-white uppercase tracking-widest">ID: VIT-820-Q4</p>
                           </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-white/10">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                             <ShieldCheck size={16} className="text-emerald-500" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Encrypted Signature</span>
                       </div>
                       <img src="/vit-logo.jpg" className="h-6 opacity-20 grayscale brightness-200" />
                    </div>
                 </div>
              </div>
            </motion.div>
        </div>

        {/* Dynamic Action Panel */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 w-full lg:max-w-md space-y-8"
        >
           <div className="glass-card p-10 rounded-[50px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:scale-110 transition-transform">
                <Sparkles size={120} />
              </div>
              
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-3xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30">
                       <Info size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight leading-none">Security<br/><span className="text-primary">Guidelines</span></h3>
                 </div>

                 <div className="space-y-6">
                    {[
                      { text: 'Dynamic QR Refresh every 60 seconds.', icon: Zap, color: 'text-amber-500' },
                      { text: 'Valid for library access & canteen payments.', icon: CreditCard, color: 'text-blue-500' },
                      { text: 'Tap to flip and view sensitive data.', icon: Eye, color: 'text-purple-500' },
                      { text: 'Digital twin of your physical identity.', icon: ShieldCheck, color: 'text-emerald-500' }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                         <div className={`w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm ${item.color}`}>
                            <item.icon size={18} />
                         </div>
                         <p className="text-sm font-black text-slate-600 uppercase tracking-tight">{item.text}</p>
                      </motion.div>
                    ))}
                 </div>

                 <button className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-primary transition-all active:scale-95">
                    Revoke & Reset Card
                 </button>
              </div>
           </div>

           <div className="p-8 rounded-[40px] border-2 border-dashed border-slate-200 flex items-center justify-center text-center">
              <div>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Sync Status</p>
                 <div className="flex items-center gap-3">
                    <div className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <p className="text-sm font-black text-slate-800 uppercase">Real-time Encrypted</p>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .hologram-effect {
            background: linear-gradient(135deg, 
                rgba(255,255,255,0) 0%, 
                rgba(255,255,255,0.05) 25%, 
                rgba(59,130,246,0.1) 50%, 
                rgba(255,255,255,0.05) 75%, 
                rgba(255,255,255,0) 100%);
            background-size: 200% 200%;
            animation: hologram 10s linear infinite;
        }
        @keyframes hologram {
            0% { background-position: 0% 0%; }
            100% { background-position: 200% 200%; }
        }
      `}</style>
    </div>
  )
}
