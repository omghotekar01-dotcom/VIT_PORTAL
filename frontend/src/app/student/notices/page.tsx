'use client'

import { motion } from 'framer-motion'
import { 
  Pin, 
  Bookmark, 
  Calendar, 
  Search, 
  Tag, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const categories = ['All', 'Academic', 'Events', 'Exams', 'Placements']

const notices = [
  {
    id: 1,
    title: 'Mid-Term Examination Schedule - May 2026',
    content: 'The mid-term examinations for all B.Tech departments are scheduled to begin from May 15th. Please check the detailed timetable attached.',
    category: 'Exams',
    date: '30 Apr 2026',
    isPinned: true,
    author: 'Examination Cell'
  },
  {
    id: 2,
    title: 'Annual Technical Fest: V-IT 2026',
    content: 'Registration for the annual technical fest is now open. Various events including Hackathons, Coding Contests, and Robotics are lined up.',
    category: 'Events',
    date: '28 Apr 2026',
    isPinned: false,
    author: 'Student Council'
  },
  {
    id: 3,
    title: 'Google Cloud Internship Drive',
    content: 'Google is visiting our campus for an internship drive for final year and pre-final year students. Eligibility criteria: CGPA > 8.0.',
    category: 'Placements',
    date: '25 Apr 2026',
    isPinned: false,
    author: 'TPO Cell'
  },
  {
    id: 4,
    title: 'Revised Academic Calendar for Sem-VI',
    content: 'There have been some adjustments to the semester calendar due to upcoming holidays. The end-sem exams will now conclude by June 10th.',
    category: 'Academic',
    date: '24 Apr 2026',
    isPinned: false,
    author: 'Dean Academics'
  },
]

export default function NoticeBoardPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotices = notices.filter(n => 
    (activeCategory === 'All' || n.category === activeCategory) &&
    (n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Notice Board</h1>
          <p className="text-gray-400 mt-1">Real-time updates and important announcements.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search notices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all w-64"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all border",
              activeCategory === cat 
                ? "bg-primary-500/10 border-primary-500/30 text-primary-400" 
                : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNotices.map((notice, i) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "glass-card p-6 rounded-3xl border-white/10 relative group hover:border-white/20 transition-all",
              notice.isPinned && "border-primary-500/30 bg-primary-500/[0.02]"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                  notice.category === 'Exams' ? 'bg-red-500/20 text-red-400' :
                  notice.category === 'Events' ? 'bg-purple-500/20 text-purple-400' :
                  notice.category === 'Placements' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                )}>
                  {notice.category}
                </span>
                {notice.isPinned && <Pin size={14} className="text-primary-400 rotate-45" />}
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <Bookmark size={18} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
              {notice.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {notice.content}
            </p>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400">
                  {notice.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{notice.author}</p>
                  <p className="text-[10px] text-gray-500">{notice.date}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-primary-400 hover:gap-2 transition-all">
                Read More <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotices.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-gray-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">No notices found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  )
}
