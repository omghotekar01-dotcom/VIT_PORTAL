'use client'

import { motion } from 'framer-motion'
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Star,
  Download,
  AlertCircle
} from 'lucide-react'

const events = [
  { date: '2025-10-15', title: 'Mid-Term Examinations Begin', type: 'Exam', color: 'bg-red-500' },
  { date: '2025-10-22', title: 'Technical Fest: VISHWATech', type: 'Event', color: 'bg-primary' },
  { date: '2025-11-01', title: 'Diwali Vacation Begins', type: 'Holiday', color: 'bg-orange-500' },
  { date: '2025-11-10', title: 'College Re-opens', type: 'Academic', color: 'bg-emerald-500' },
  { date: '2025-11-25', title: 'Submission of Journals', type: 'Academic', color: 'bg-blue-500' },
  { date: '2025-12-15', title: 'End-Term Examinations', type: 'Exam', color: 'bg-red-600' },
]

export default function AcademicCalendarPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Academic Calendar</h1>
          <p className="text-muted-foreground mt-1">Official institutional schedule for the year 2025-26.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Download size={18} /> Download PDF Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View Placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-foreground">October 2025</h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1
                const hasEvent = events.find(e => e.date === `2025-10-${day.toString().padStart(2, '0')}`)
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative border transition-all cursor-pointer ${
                      hasEvent 
                        ? 'border-primary/30 bg-primary/5 hover:bg-primary/10' 
                        : 'border-transparent hover:border-border hover:bg-secondary/30'
                    }`}
                  >
                    <span className={`text-sm font-bold ${hasEvent ? 'text-primary' : 'text-foreground'}`}>{day}</span>
                    {hasEvent && (
                      <div className={`w-1 h-1 rounded-full ${hasEvent.color} absolute bottom-2`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-primary" size={24} />
              <h3 className="text-xl font-bold text-foreground">Important Guidelines</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Students are advised to adhere strictly to the submission deadlines and examination dates. Any changes to the schedule will be notified through the official notice board.
            </p>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Upcoming Milestones</h3>
          <div className="space-y-4">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-[32px] border-border/50 group hover:border-primary/30 transition-all flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl ${event.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
                  <CalendarIcon className={event.color.replace('bg-', 'text-')} size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{event.date}</p>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{event.title}</h4>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg inline-block mt-2 ${event.color} bg-opacity-10 ${event.color.replace('bg-', 'text-')}`}>
                    {event.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
