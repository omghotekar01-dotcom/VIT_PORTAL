'use client'

import { motion } from 'framer-motion'
import { 
  PartyPopper, 
  Calendar, 
  MapPin, 
  Clock, 
  Plus,
  Users,
  ChevronRight,
  FileText,
  CheckCircle2,
  Loader2,
  Ticket
} from 'lucide-react'
import { useState } from 'react'
import { studentServices } from '@/lib/studentServices'
import { EventTicketModal } from '@/components/dashboard/EventTicketModal'

const initialEvents = [
  { id: 1, title: 'Annual TechFest 2025', date: 'Oct 28-30, 2025', location: 'College Campus', type: 'Technical', participants: 1200, status: 'Open' },
  { id: 2, title: 'Cultural Night', date: 'Nov 05, 2025', location: 'Auditorium', type: 'Cultural', participants: 800, status: 'Open' },
  { id: 3, title: 'Startup Pitch Deck', date: 'Nov 12, 2025', location: 'Incubation Center', type: 'Workshop', participants: 150, status: 'Open' },
]

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents)
  const [registeringId, setRegisteringId] = useState<number | null>(null)
  const [showTicket, setShowTicket] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const handleRegister = async (eventId: number) => {
    setRegisteringId(eventId)
    await studentServices.registerEvent(eventId)
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: 'Registered' } : e))
    setRegisteringId(null)
  }

  const openTicket = (event: any) => {
    setSelectedEvent(event)
    setShowTicket(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events & Participation</h1>
          <p className="text-muted-foreground mt-1">Stay updated with campus activities and technical fests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Upcoming Events</h3>
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-white/10 group hover:shadow-xl transition-all overflow-hidden flex"
            >
              {/* Left Ticket Stub */}
              <div className="w-1/3 bg-primary p-6 flex flex-col justify-between items-center text-white relative">
                 {/* Top and Bottom Cutouts */}
                 <div className="absolute -top-3 -right-3 w-6 h-6 bg-slate-50 dark:bg-[#050505] rounded-full border border-transparent dark:border-white/10 shadow-inner"></div>
                 <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-slate-50 dark:bg-[#050505] rounded-full border border-transparent dark:border-white/10 shadow-inner"></div>
                 
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 rotate-180" style={{ writingMode: 'vertical-rl' }}>
                   {event.type}
                 </span>
                 <Ticket size={32} className="opacity-50" />
              </div>
              
              {/* Dashed Perforation Line */}
              <div className="absolute left-1/3 top-3 bottom-3 border-l-2 border-dashed border-white/40 dark:border-white/10"></div>

              {/* Main Ticket Body */}
              <div className="w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase leading-tight group-hover:text-primary transition-colors">{event.title}</h4>
                  </div>
                  <div className="space-y-2 mb-6 mt-4">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      <Calendar size={14} className="text-primary" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      <MapPin size={14} className="text-primary" /> {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      <Users size={14} className="text-primary" /> {event.participants} Spots
                    </div>
                  </div>
                </div>
                
                {event.status === 'Registered' ? (
                  <div className="flex gap-3">
                    <div className="flex-1 py-3 rounded-2xl bg-emerald-500/10 text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-emerald-500/20">
                      <CheckCircle2 size={16} /> Secured
                    </div>
                    <button 
                      onClick={() => openTicket(event)}
                      className="flex-1 py-3 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2"
                    >
                      <Ticket size={16} /> Pass
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleRegister(event.id)}
                    disabled={registeringId === event.id}
                    className="w-full py-3 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {registeringId === event.id ? <Loader2 className="animate-spin" size={16} /> : null}
                    {registeringId === event.id ? 'Processing...' : 'Claim Ticket'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
            <h3 className="text-xl font-bold text-foreground mb-6">Participation History</h3>
            <div className="space-y-4">
              {[
                { title: 'Hackathon 2024', role: 'Winner', date: 'Feb 2024' },
                { title: 'Sports Meet', role: 'Participant', date: 'Jan 2024' },
                { title: 'AI Workshop', role: 'Volunteer', date: 'Dec 2023' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-all">
                  <div>
                    <p className="text-sm font-bold text-foreground">{h.title}</p>
                    <p className="text-[10px] text-muted-foreground">{h.date}</p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                    h.role === 'Winner' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
                  }`}>
                    {h.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/20 flex flex-col items-center text-center">
             <PartyPopper className="text-primary mb-4" size={40} />
             <h4 className="text-lg font-bold text-foreground mb-2">Want to organize?</h4>
             <p className="text-xs text-muted-foreground mb-6">Apply to host your own technical event or workshop through the Student Council.</p>
             <button className="text-primary font-bold text-sm hover:underline flex items-center gap-2">
               Submit Proposal <ChevronRight size={16} />
             </button>
          </div>
        </div>
      </div>

      <EventTicketModal 
        isOpen={showTicket} 
        onClose={() => setShowTicket(false)} 
        data={{
          title: selectedEvent?.title || '',
          date: selectedEvent?.date || '',
          location: selectedEvent?.location || '',
          ticketId: `VIT-EVT-${Math.random().toString(36).substring(7).toUpperCase()}`,
          studentName: 'OM GHOTEKAR',
          type: selectedEvent?.type || 'General'
        }} 
      />
    </div>
  )
}
