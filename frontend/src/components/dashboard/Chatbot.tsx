'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles, Minus } from 'lucide-react'

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi Aryan! I am your VIT AI Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      let response = "I'm not sure about that. Can you please check with the administration?"
      const query = input.toLowerCase()
      
      if (query.includes('attendance')) {
        response = "Your overall attendance is 82.1%. You're doing great, but Cyber Security needs attention (71.4%)."
      } else if (query.includes('lecture') || query.includes('schedule') || query.includes('timetable')) {
        response = "Your next lecture is Cyber Security at 11:15 AM in Lab-10. Don't be late!"
      } else if (query.includes('marks') || query.includes('exam')) {
        response = "Mid-term exams start from May 15th. You can find the detailed schedule on the Notice Board."
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 1000)
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-primary-600 text-white shadow-2xl shadow-primary-500/40 flex items-center justify-center z-50 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare size={28} className="relative z-10" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 w-[400px] h-[550px] glass-card rounded-3xl border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center border border-primary-500/30">
                  <Bot className="text-primary-400" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Campus Assistant</h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-500 font-medium">AI Agent Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                  <Minus size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.role === 'assistant' ? "bg-primary-500/10 text-primary-400" : "bg-purple-500/10 text-purple-400"
                  )}>
                    {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'assistant' 
                      ? "bg-white/5 border border-white/10 text-gray-300 rounded-tl-none" 
                      : "bg-primary-500 text-white rounded-tr-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about attendance, schedule..."
                  className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
                {['Attendance?', 'Next Lecture?', 'Exam Dates?'].map(chip => (
                  <button 
                    key={chip}
                    onClick={() => setInput(chip.replace('?', ''))}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-gray-500 hover:border-primary-500/30 hover:text-primary-400 transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
