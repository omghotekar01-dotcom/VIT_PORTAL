'use client'

import { motion } from 'framer-motion'
import { 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  CheckCircle2,
  ChevronRight,
  Target
} from 'lucide-react'
import { useState } from 'react'

const careerOptions = [
  { 
    id: 'placement', 
    title: 'Placement', 
    description: 'Aiming for a job in a reputed company through college placements.',
    icon: Briefcase,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  { 
    id: 'higher-studies', 
    title: 'Higher Studies', 
    description: 'Planning to pursue Masters (M.Tech, MS, MBA) or research.',
    icon: GraduationCap,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  { 
    id: 'entrepreneurship', 
    title: 'Entrepreneurship', 
    description: 'Aspiring to start your own business or startup venture.',
    icon: Rocket,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  }
]

export default function CareerChoicePage() {
  const [selected, setSelected] = useState('placement')

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Career Choice</h1>
        <p className="text-muted-foreground mt-2">Define your professional path to help us provide better guidance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelected(option.id)}
            className={`cursor-pointer glass-card p-8 rounded-[40px] border-2 transition-all text-center relative ${
              selected === option.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border/50 hover:border-primary/30'
            }`}
          >
            {selected === option.id && (
              <div className="absolute top-4 right-4 text-primary">
                <CheckCircle2 size={24} />
              </div>
            )}
            <div className={`w-16 h-16 rounded-3xl ${option.bgColor} flex items-center justify-center mx-auto mb-6`}>
              <option.icon className={option.color} size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{option.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {option.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-[40px] border-border/50 bg-secondary/30">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-primary" size={24} />
          <h3 className="text-xl font-bold text-foreground">Next Steps for {careerOptions.find(o => o.id === selected)?.title}</h3>
        </div>
        <div className="space-y-4">
          {[
            'Attend TPO orientation sessions',
            'Build your technical profile on GitHub',
            'Participate in mock interview drills',
            'Prepare for aptitude and coding tests'
          ].map((step, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-all">
              <span className="text-sm font-medium text-foreground">{step}</span>
              <ChevronRight className="text-muted-foreground group-hover:text-primary transition-all" size={18} />
            </div>
          ))}
        </div>
        <button className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
          Update Career Preference
        </button>
      </div>
    </div>
  )
}
