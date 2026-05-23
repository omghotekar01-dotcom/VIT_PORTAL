'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface RoleCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

export const RoleCard = ({ title, icon: Icon, href, color }: RoleCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-[28px] bg-white border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:border-blue-500/20 group-hover:shadow-blue-500/10 transition-all group">
            <Icon size={28} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <span className="text-sm font-black text-slate-800 tracking-tight">{title}</span>
        </div>
      </Link>
    </motion.div>
  )
}
