const fs = require('fs');
const path = require('path');

const modules = [
  'calendar', 'academics', 'biometric', 'events', 'examination', 
  'feedback', 'grievance', 'infrastructure', 'inventory', 'lab-exam', 
  'maintenance', 'meeting', 'nba', 'online-exam', 'guardian', 
  'project', 'iso', 'quiz', 'registration', 'resources', 'task', 
  'timesheet', 'volp'
];

const getTemplate = (moduleName) => `'use client'\n\nimport { motion } from 'framer-motion'
import { Construction, Sparkles } from 'lucide-react'

export default function ${moduleName.replace(/-./g, x => x[1].toUpperCase()).replace(/^./, x => x.toUpperCase())}Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">${moduleName.replace('-', ' ')} Module</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor ${moduleName.replace('-', ' ')} operations.</p>
        </div>
      </div>

      <div className="glass-card p-12 rounded-[40px] border-border/50 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20"
        >
          <Construction className="text-primary" size={40} />
        </motion.div>
        
        <h2 className="text-2xl font-black text-foreground mb-3 flex items-center gap-2">
          System Integration in Progress <Sparkles className="text-primary" size={20} />
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          The <strong>${moduleName}</strong> module is currently being finalized for the production environment. Complete functionality will be available in the next deployment cycle.
        </p>
        
        <div className="mt-8 flex gap-4">
           <div className="px-4 py-2 rounded-xl bg-secondary/50 border border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
             Status: Integration
           </div>
           <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500">
             ETA: 48 Hours
           </div>
        </div>
      </div>
    </div>
  )
}
`;

const baseDir = path.join(__dirname, 'src', 'app', 'faculty');

modules.forEach(mod => {
  const dirPath = path.join(baseDir, mod);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, getTemplate(mod));
  console.log('Created/Updated:', filePath);
});
console.log('All missing faculty pages created.');
