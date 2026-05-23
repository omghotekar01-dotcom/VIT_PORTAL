const fs = require('fs');
const path = require('path');

const moduleConfigs = {
  calendar: { desc: 'Academic schedule and important dates', features: ['Term Schedule', 'Holidays', 'Exam Dates', 'Events'] },
  academics: { desc: 'Curriculum, syllabus, and course materials', features: ['Course Material', 'Syllabus Tracker', 'Study Resources', 'Reference Links'] },
  biometric: { desc: 'Punch-in and punch-out logs', features: ["Today's Log", 'Weekly Summary', 'Missed Punches', 'Late Marks'] },
  events: { desc: 'Organize and manage institutional events', features: ['Create Event', 'Manage Registrations', 'Budgeting', 'Reports'] },
  examination: { desc: 'Exam duties, seating, and invigilation', features: ['Duty Chart', 'Paper Setting', 'Invigilation', 'Exam Reports'] },
  feedback: { desc: 'Student feedback and course evaluation', features: ['Course Feedback', 'Self Appraisal', 'Improvement Plan', 'Analytics'] },
  grievance: { desc: 'File and track complaints', features: ['New Complaint', 'My Grievances', 'Committee Response', 'Status Tracker'] },
  infrastructure: { desc: 'IT and Facility support tickets', features: ['Lab Equipment', 'Classroom IT', 'Repair Request', 'Booking'] },
  inventory: { desc: 'Departmental equipment and stock', features: ['Stock Register', 'Request Item', 'Return Item', 'Audit'] },
  'lab-exam': { desc: 'Practical examinations and vivas', features: ['Batch Schedule', 'External Examiners', 'Marks Entry', 'Print Sheets'] },
  maintenance: { desc: 'Campus maintenance tracking', features: ['Electrical', 'Plumbing', 'Carpentry', 'Cleaning'] },
  meeting: { desc: 'Departmental meetings and minutes', features: ['Schedule Meeting', 'MOM', 'Action Items', 'Calendar'] },
  nba: { desc: 'Accreditation, CO-PO mapping', features: ['Course Outcomes', 'PO Attainment', 'Rubrics', 'Reports'] },
  'online-exam': { desc: 'MCQ and online test management', features: ['Question Bank', 'Create Test', 'Proctoring', 'Results'] },
  guardian: { desc: 'Student mentorship and counseling', features: ['My Mentees', 'Meeting Logs', 'Performance', 'Counseling Notes'] },
  project: { desc: 'Final year project monitoring', features: ['Project Groups', 'Weekly Reviews', 'Rubric Evaluation', 'Final Marks'] },
  iso: { desc: 'Quality assurance and compliance', features: ['Audit Forms', 'SOPs', 'Compliance Check', 'Documents'] },
  quiz: { desc: 'Class quizzes and assessments', features: ['Create Quiz', 'Question Pool', 'Submissions', 'Analytics'] },
  registration: { desc: 'Course and elective registration', features: ['Student List', 'Elective Approval', 'Prerequisites', 'Add/Drop'] },
  resources: { desc: 'Library and digital resource access', features: ['E-Books', 'Journals', 'Software Keys', 'Lab Manuals'] },
  task: { desc: 'Administrative and academic tasks', features: ['My Tasks', 'Assigned by HOD', 'Deadlines', 'Completed'] },
  timesheet: { desc: 'Weekly academic activity logging', features: ['Log Hours', 'Lectures Taken', 'Admin Work', 'Research'] },
  volp: { desc: 'Virtual Online Learning Platform', features: ['Live Classes', 'Recorded Sessions', 'Assignments', 'Discussions'] }
};

const getTemplate = (moduleName) => {
  const config = moduleConfigs[moduleName] || { desc: 'Module operations', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] };
  
  return `'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Settings, LayoutDashboard, Search } from 'lucide-react'

export default function ${moduleName.replace(/-./g, x => x[1].toUpperCase()).replace(/^./, x => x.toUpperCase())}Page() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">${moduleName.replace('-', ' ')} Portal</h1>
          <p className="text-muted-foreground mt-1">${config.desc}</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-secondary text-foreground rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-secondary/80 transition-all">
              <Search size={16} /> Search
           </button>
           <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <Settings size={16} /> Configuration
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         ${config.features.map((feature, i) => `
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ${i * 0.1} }}
            className="glass-card p-6 rounded-[24px] border-border/50 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
               <LayoutDashboard size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">${feature}</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">Access ${feature.toLowerCase()} management and settings.</p>
            
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
               Access Module <ArrowRight size={12} />
            </div>
         </motion.div>`).join('')}
      </div>

      <div className="glass-card p-12 rounded-[40px] border-border/50 bg-secondary/20 flex flex-col items-center justify-center text-center mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="text-2xl font-black text-foreground mb-3 flex items-center gap-2">
          VIERP Extended Modules <Sparkles className="text-primary" size={20} />
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          The <strong>${moduleName}</strong> interface is currently displaying VIERP standard components. Sub-module data is synchronized with EduPlus backend automatically.
        </p>
      </div>
    </div>
  )
}
`};

const baseDir = path.join(__dirname, 'src', 'app', 'faculty');

Object.keys(moduleConfigs).forEach(mod => {
  const dirPath = path.join(baseDir, mod);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, getTemplate(mod));
  console.log('Updated:', filePath);
});
console.log('All faculty pages detailed.');
