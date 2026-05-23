'use client'

import { motion } from 'framer-motion'
import { 
  Clock, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Zap,
  Monitor,
  Beaker,
  BookOpen
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const hours = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

const schedule = [
  { day: 'Monday', start: '08:00', duration: 1, subject: 'Mathematics III', room: 'L-501', faculty: 'Dr. S. Patil', type: 'Lecture', color: 'blue' },
  { day: 'Monday', start: '09:00', duration: 1, subject: 'Machine Learning', room: 'L-402', faculty: 'Dr. S. K. Gupta', type: 'Lecture', color: 'purple' },
  { day: 'Monday', start: '11:00', duration: 2, subject: 'DBMS Lab', room: 'Lab-10', faculty: 'Prof. Anjali R.', type: 'Practical', color: 'emerald' },
  { day: 'Tuesday', start: '10:00', duration: 1, subject: 'Operating Systems', room: 'L-501', faculty: 'Dr. Vikas M.', type: 'Lecture', color: 'blue' },
  { day: 'Tuesday', start: '13:00', duration: 2, subject: 'OS Lab', room: 'Lab-05', faculty: 'Prof. Rahul S.', type: 'Practical', color: 'emerald' },
  { day: 'Wednesday', start: '09:00', duration: 1, subject: 'Computer Networks', room: 'L-402', faculty: 'Dr. S. K. Gupta', type: 'Lecture', color: 'orange' },
  { day: 'Wednesday', start: '14:00', duration: 1, subject: 'Software Eng.', room: 'L-302', faculty: 'Prof. Rahul S.', type: 'Lecture', color: 'pink' },
  { day: 'Thursday', start: '11:00', duration: 1, subject: 'Cyber Security', room: 'L-101', faculty: 'Prof. Anjali R.', type: 'Lecture', color: 'indigo' },
  { day: 'Thursday', start: '15:00', duration: 2, subject: 'Project Work', room: 'Lab-02', faculty: 'Dr. S. K. Gupta', type: 'Practical', color: 'cyan' },
  { day: 'Friday', start: '10:00', duration: 1, subject: 'Cloud Computing', room: 'L-501', faculty: 'Dr. Vikas M.', type: 'Lecture', color: 'blue' },
  { day: 'Friday', start: '14:00', duration: 2, subject: 'ML Practical', room: 'Lab-05', faculty: 'Dr. S. K. Gupta', type: 'Practical', color: 'purple' },
]

export default function TimetablePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [selectedDay, setSelectedDay] = useState('Monday')

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const currentHour = currentTime ? currentTime.getHours() : 0
  const currentMinute = currentTime ? currentTime.getMinutes() : 0
  
  // Calculate vertical position for the "Now" bar
  const calculateNowPosition = () => {
    if (!currentTime) return -1;
    const startHour = 8
    const endHour = 18
    const totalMinutes = (endHour - startHour) * 60
    const minutesSinceStart = (currentHour - startHour) * 60 + currentMinute
    
    if (currentHour < startHour || currentHour >= endHour) return -1
    return (minutesSinceStart / totalMinutes) * 100
  }

  const nowPos = calculateNowPosition()

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
            Academic Schedule <Sparkles className="text-primary animate-pulse" size={32} />
          </h1>
          <p className="text-muted-foreground font-medium">B.Tech Semester V · Division A</p>
        </div>
        
        <div className="flex bg-secondary/50 p-1.5 rounded-[20px] border border-border backdrop-blur-md">
          {['Weekly', 'Daily'].map((mode) => (
            <button
              key={mode}
              className={cn(
                "px-8 py-2.5 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all",
                mode === 'Weekly' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Timetable Container */}
      <div className="relative glass-card rounded-[40px] border-border/50 overflow-hidden shadow-2xl">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full -z-10" />

        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[1200px]">
            {/* Header Days */}
            <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-border/50 bg-secondary/20">
              <div className="p-6 flex items-center justify-center border-r border-border/50">
                <Clock size={20} className="text-primary" />
              </div>
              {days.map((day) => (
                <div key={day} className="p-6 text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                    {day.substring(0, 3)}
                  </span>
                  <span className="text-sm font-black text-foreground">{day}</span>
                </div>
              ))}
            </div>

            {/* Timetable Grid Content */}
            <div className="relative">
              {/* Time Slots (Rows) */}
              {hours.slice(0, -1).map((hour, idx) => (
                <div key={hour} className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-border/30 last:border-0 group h-24">
                  <div className="flex items-center justify-center border-r border-border/50 bg-secondary/10 text-[11px] font-black text-muted-foreground group-hover:text-primary transition-colors">
                    {hour}
                  </div>
                  {/* Empty slots background cells */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border-r border-border/30 last:border-0" />
                  ))}
                </div>
              ))}

              {/* Absolute Positioned Subject Cards */}
              <div className="absolute inset-0 pointer-events-none">
                 <div className="grid grid-cols-[100px_repeat(6,1fr)] h-full">
                    <div className="col-start-1" /> {/* Time column spacing */}
                    
                    {days.map((day, dayIdx) => (
                       <div key={day} className="relative h-full">
                          {schedule
                            .filter(s => s.day === day)
                            .map((item, i) => {
                               const startIdx = hours.indexOf(item.start)
                               return (
                                 <motion.div
                                   key={i}
                                   initial={{ opacity: 0, scale: 0.95 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   className="absolute left-1 right-1 pointer-events-auto cursor-pointer group/card"
                                   style={{ 
                                      top: `${(startIdx / 10) * 100}%`, 
                                      height: `${(item.duration / 10) * 100}%`,
                                      zIndex: 20
                                   }}
                                 >
                                    <div className={cn(
                                       "h-full rounded-2xl border-2 p-3 flex flex-col justify-between transition-all group-hover/card:scale-[1.02] overflow-hidden",
                                       item.color === 'blue' && "bg-blue-500/10 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
                                       item.color === 'purple' && "bg-purple-500/10 border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]",
                                       item.color === 'emerald' && "bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
                                       item.color === 'orange' && "bg-orange-500/10 border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]",
                                       item.color === 'pink' && "bg-pink-500/10 border-pink-500/20 shadow-[0_0_20_rgba(236,72,153,0.1)]",
                                       item.color === 'indigo' && "bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]",
                                       item.color === 'cyan' && "bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
                                    )}>
                                       {/* Shining Glow Effect */}
                                       <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                                       
                                       <div>
                                          <div className="flex items-center justify-between mb-1">
                                             <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{item.type}</span>
                                             {item.type === 'Practical' ? <Beaker size={12} className="opacity-50" /> : <Monitor size={12} className="opacity-50" />}
                                          </div>
                                          <h4 className="text-[13px] font-black text-foreground leading-tight">{item.subject}</h4>
                                       </div>
                                       
                                       <div className="space-y-1">
                                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground">
                                             <MapPin size={10} className="text-primary" /> {item.room}
                                          </div>
                                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground truncate">
                                             <User size={10} className="text-primary" /> {item.faculty}
                                          </div>
                                       </div>
                                    </div>
                                 </motion.div>
                               )
                            })
                          }
                       </div>
                    ))}
                 </div>
              </div>

              {/* LIVE TIME BAR (SHINING) */}
              {nowPos !== -1 && (
                <div 
                  className="absolute left-[100px] right-0 h-1 bg-primary/40 z-50 pointer-events-none blur-[0.5px]"
                  style={{ top: `${nowPos}%` }}
                >
                   <div className="absolute left-0 -top-1.5 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#3b82f6] flex items-center justify-center">
                      <Zap size={8} className="text-white fill-white" />
                   </div>
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary via-white/40 to-transparent animate-pulse" />
                   <div className="absolute -top-6 -left-2 bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-lg">
                      NOW
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Legend */}
      <div className="glass-card p-6 rounded-[32px] border-border/50 flex flex-wrap items-center gap-8 bg-secondary/20">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
               <BookOpen size={18} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-muted-foreground">Type A</p>
               <p className="text-sm font-bold">Theory Lectures</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
               <Beaker size={18} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-muted-foreground">Type B</p>
               <p className="text-sm font-bold">Laboratory / Practical</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
               <Zap size={18} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-muted-foreground">Active</p>
               <p className="text-sm font-bold">Ongoing Session</p>
            </div>
         </div>
      </div>
    </div>
  )
}
