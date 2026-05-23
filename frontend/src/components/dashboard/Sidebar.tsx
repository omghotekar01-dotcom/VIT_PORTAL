'use client'

import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
  User,
  Users,
  FileText,
  CreditCard,
  FileCheck,
  Briefcase,
  Award,
  PartyPopper,
  FileQuestion,
  MessageSquare,
  AlertTriangle,
  Home,
  Beaker,
  Heart,
  Trophy,
  Monitor,
  Rocket,
  Gamepad2,
  Share2,
  ClipboardList,
  IndianRupee,
  Fingerprint,
  Building2,
  Box,
  TrendingUp,
  Globe,
  Mic,
  Smartphone,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const studentItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/student/dashboard' },
  { label: 'Time Table', icon: Calendar, href: '/student/timetable' },
  { label: 'Attendance', icon: BarChart3, href: '/student/attendance' },
  { label: 'Assignments', icon: FileText, href: '/student/assignments' },
  { label: 'Academics', icon: BookOpen, href: '/student/academics' },
  { label: 'Accounts (Fees)', icon: CreditCard, href: '/student/accounts' },
  { label: 'Academic Calendar', icon: Calendar, href: '/student/calendar' },
  { label: 'Lesson Plan', icon: FileText, href: '/student/lesson-plan' },
  { label: 'Admission', icon: FileCheck, href: '/student/admission' },
  { label: 'Career Choice', icon: Briefcase, href: '/student/career' },
  { label: 'Certificates', icon: Award, href: '/student/certificates' },
  { label: 'Events', icon: PartyPopper, href: '/student/events' },
  { label: 'Examination', icon: FileQuestion, href: '/student/examination' },
  { label: 'Feedback', icon: MessageSquare, href: '/student/feedback' },
  { label: 'Grievance', icon: AlertTriangle, href: '/student/grievance' },
  { label: 'Hostel', icon: Home, href: '/student/hostel' },
  { label: 'Lab Exam', icon: Beaker, href: '/student/lab-exam' },
  { label: 'My Guardian', icon: Heart, href: '/student/guardian' },
  { label: 'NBA', icon: Trophy, href: '/student/nba' },
  { label: 'Online Exam', icon: Monitor, href: '/student/online-exam' },
  { label: 'Project', icon: Rocket, href: '/student/project' },
  { label: 'Quiz', icon: Gamepad2, href: '/student/quiz' },
  { label: 'Resource Sharing', icon: Share2, href: '/student/resources' },
  { label: 'Registration', icon: ClipboardList, href: '/student/registration' },
  { label: 'TPO', icon: Sparkles, href: '/student/tpo' },
  { label: 'Other Fees', icon: IndianRupee, href: '/student/other-fees' },
  { label: 'Virtual ID Card', icon: CreditCard, href: '/student/id-card' },
  { label: 'Profile', icon: User, href: '/student/profile' },
]

export const facultyItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/faculty/dashboard' },
  { label: 'Mark Attendance', icon: FileText, href: '/faculty/attendance' },
  { label: 'Academic Calendar', icon: Calendar, href: '/faculty/calendar' },
  { label: 'Academics', icon: BookOpen, href: '/faculty/academics' },
  { label: 'Biometric', icon: Fingerprint, href: '/faculty/biometric' },
  { label: 'Event', icon: PartyPopper, href: '/faculty/events' },
  { label: 'Examination', icon: FileQuestion, href: '/faculty/examination' },
  { label: 'Faculty Appraisal', icon: TrendingUp, href: '/faculty/appraisal' },
  { label: 'Feedback', icon: MessageSquare, href: '/faculty/feedback' },
  { label: 'Grievance', icon: AlertTriangle, href: '/faculty/grievance' },
  { label: 'Infrastructure', icon: Building2, href: '/faculty/infrastructure' },
  { label: 'Inventory', icon: Box, href: '/faculty/inventory' },
  { label: 'Lab Examination', icon: Beaker, href: '/faculty/lab-exam' },
  { label: 'Leaves', icon: Home, href: '/faculty/leaves' },
  { label: 'Maintenance', icon: Settings, href: '/faculty/maintenance' },
  { label: 'Meeting', icon: Users, href: '/faculty/meeting' },
  { label: 'NBA', icon: Award, href: '/faculty/nba' },
  { label: 'Online Examination', icon: Monitor, href: '/faculty/online-exam' },
  { label: 'Guardian', icon: Heart, href: '/faculty/guardian' },
  { label: 'Payroll', icon: CreditCard, href: '/faculty/payroll' },
  { label: 'Project Monitoring', icon: Rocket, href: '/faculty/project' },
  { label: 'ISO', icon: Globe, href: '/faculty/iso' },
  { label: 'Quiz', icon: Gamepad2, href: '/faculty/quiz' },
  { label: 'Registration', icon: ClipboardList, href: '/faculty/registration' },
  { label: 'Resource Sharing', icon: Share2, href: '/faculty/resources' },
  { label: 'Task', icon: FileText, href: '/faculty/task' },
  { label: 'TimeTable', icon: Calendar, href: '/faculty/timetable' },
  { label: 'Timesheet', icon: ClipboardList, href: '/faculty/timesheet' },
  { label: 'VOLP', icon: Mic, href: '/faculty/volp' },
  { label: 'Settings', icon: Settings, href: '/faculty/settings' },
]

interface SidebarProps {
  role: 'student' | 'faculty' | 'admin' | 'tpo'
}

export const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const adminItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: User, label: 'Students', href: '/admin/students' },
    { icon: BookOpen, label: 'Faculty', href: '/admin/faculty' },
    { icon: Calendar, label: 'Timetable', href: '/admin/timetable' },
    { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  const tpoItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/tpo/dashboard' },
    { icon: Briefcase, label: 'Jobs', href: '/tpo/jobs' },
    { icon: Users, label: 'Students', href: '/tpo/students' },
    { icon: Settings, label: 'Settings', href: '/tpo/settings' },
  ]

  const menuItems = role === 'student' ? studentItems 
                 : role === 'faculty' ? facultyItems 
                 : role === 'admin' ? adminItems 
                 : tpoItems

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border z-50 hidden lg:flex flex-col shadow-sm"
    >
      <div className="p-6 flex items-center justify-between shrink-0">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-border/50">
              <img 
                src="/vit-logo.jpg" 
                alt="VIT PUNE" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-black text-lg text-foreground tracking-tighter uppercase">VIT PUNE</span>
          </motion.div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}>
                <item.icon size={20} className={cn("shrink-0", isActive && "text-primary")} />
                {!isCollapsed && (
                  <span className="font-medium text-[13px]">{item.label}</span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                  />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border shrink-0">
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium text-[13px]">Logout</span>}
        </button>
      </div>
    </motion.aside>
  )
}
