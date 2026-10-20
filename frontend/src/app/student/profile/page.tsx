'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  User, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck,
  Camera,
  Edit3,
  Mail,
  Zap,
  Award,
  Globe,
  Settings,
  MoreVertical,
  CheckCircle2,
  ChevronRight,
  Heart,
  BookOpen,
  FileText,
  Save,
  X,
  Loader2,
  PenTool,
  UploadCloud,
  Eye
} from 'lucide-react'
import { studentServices } from '@/lib/studentServices'
import { cn } from '@/lib/utils'

const hubs = [
  { id: 'identity', label: 'Identity', icon: User, color: 'from-blue-500 to-indigo-600' },
  { id: 'academic', label: 'Academic', icon: GraduationCap, color: 'from-purple-500 to-pink-600' },
  { id: 'personal', label: 'Personal', icon: Heart, color: 'from-orange-500 to-red-600' },
  { id: 'professional', label: 'Pro & Skills', icon: Briefcase, color: 'from-emerald-500 to-teal-600' },
  { id: 'institutional', label: 'Support', icon: ShieldCheck, color: 'from-slate-600 to-slate-800' },
]

export default function ProfilePage() {
  const [activeHub, setActiveHub] = useState('identity')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'Demo',
    middleName: '',
    lastName: 'Student',
    gender: 'Male',
    officialEmail: 'student01@example.test',
    personalEmail: 'demo.personal@example.test',
    mobile: '0000000001',
    alternateMobile: '',
    nationality: 'India Indian',
    domicile: 'Maharashtra',
    religion: 'Not provided',
    bloodGroup: 'Not provided',
    category: 'Not provided',
    caste: 'Not provided',
    birthPlace: 'Not provided',
    nativePlace: 'Pune',
    aadhaar: 'Not provided',
    pan: 'Not provided',
    passport: 'Not provided',
    voterId: 'Not provided',
    drivingLicense: 'Not provided',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=512&h=512&auto=format&fit=crop',
    signature: ''
  })

  const handleSave = async () => {
    setSaving(true)
    await studentServices.updateProfile(profileData)
    setSaving(false)
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: 'photo' | 'signature', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, [field]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Dynamic Header */}
      <div className="relative h-64 md:h-80 rounded-[40px] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-indigo-800 animate-gradient"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/60 to-transparent flex flex-col md:flex-row items-end gap-8 backdrop-blur-[2px]">
           <div className="relative group/avatar">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-[40px] bg-white p-2 shadow-2xl relative overflow-hidden">
                <img 
                  src={profileData.photo} 
                  alt="Avatar" 
                  className="w-full h-full rounded-[32px] object-cover bg-slate-100" 
                />
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all cursor-pointer">
                  <Camera className="text-white" size={32} />
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload('photo', e)} />
                </label>
              </div>
           </div>
           
           <div className="flex-1 space-y-2 mb-2">
              <div className="flex items-center gap-3">
                 <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{profileData.firstName} {profileData.lastName}</h1>
                 <div className="bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap size={10} fill="currentColor" /> Verified
                 </div>
              </div>
              <p className="text-white/80 font-bold text-lg max-w-2xl">B.Tech in Artificial Intelligence & Machine Learning</p>
              <div className="flex flex-wrap gap-4 pt-2">
                 <span className="text-white/60 text-xs font-bold flex items-center gap-1.5"><MapPin size={14} /> {profileData.nativePlace}</span>
                 <span className="text-white/60 text-xs font-bold flex items-center gap-1.5"><BookOpen size={14} /> PRN: 9900000001</span>
                 <span className="text-white/60 text-xs font-bold flex items-center gap-1.5"><Settings size={14} /> Semester V</span>
              </div>
           </div>

           <div className="hidden md:flex gap-3 mb-2">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all border border-white/10 flex items-center gap-2"
                  >
                    <X size={18} /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-white text-primary px-8 py-3 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {saving ? 'Saving...' : 'Save Profile'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-primary px-8 py-3 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Edit3 size={18} /> Edit Profile
                </button>
              )}
           </div>
        </div>
      </div>

      {/* Hub Navigation */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
         {hubs.map((hub) => {
           const isActive = activeHub === hub.id
           return (
             <button
               key={hub.id}
               onClick={() => setActiveHub(hub.id)}
               className={cn(
                 "flex items-center gap-3 px-6 py-4 rounded-[24px] font-bold text-sm transition-all relative overflow-hidden group",
                 isActive 
                  ? 'text-white shadow-xl scale-105' 
                  : 'bg-white text-slate-500 hover:text-primary hover:bg-slate-50 border border-slate-100 shadow-sm'
               )}
             >
               {isActive && (
                 <motion.div 
                   layoutId="hub-bg"
                   className={cn("absolute inset-0 bg-gradient-to-r", hub.color)} 
                 />
               )}
               <hub.icon size={18} className="relative z-10" />
               <span className="relative z-10">{hub.label}</span>
             </button>
           )
         })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeHub}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="space-y-8"
               >
                 {activeHub === 'identity' && (
                    <div className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <ProfileCard title="Basic Information" icon={User}>
                             <DataField label="First Name" value={profileData.firstName} editable={isEditing} onChange={(v: string) => handleChange('firstName', v)} />
                             <DataField label="Middle Name" value={profileData.middleName} editable={isEditing} onChange={(v: string) => handleChange('middleName', v)} />
                             <DataField label="Last Name" value={profileData.lastName} editable={isEditing} onChange={(v: string) => handleChange('lastName', v)} />
                             <DataField label="Gender" value={profileData.gender} editable={isEditing} onChange={(v: string) => handleChange('gender', v)} />
                          </ProfileCard>
                          <ProfileCard title="Contact Channels" icon={Phone}>
                             <DataField label="Official Email" value={profileData.officialEmail} highlight />
                             <DataField label="Personal Email" value={profileData.personalEmail} editable={isEditing} onChange={(v: string) => handleChange('personalEmail', v)} />
                             <DataField label="Mobile Number" value={profileData.mobile} editable={isEditing} onChange={(v: string) => handleChange('mobile', v)} />
                             <DataField label="Alternate" value={profileData.alternateMobile} editable={isEditing} onChange={(v: string) => handleChange('alternateMobile', v)} />
                          </ProfileCard>
                       </div>

                       <ProfileCard title="Govt Identifications & Full Details" icon={ShieldCheck}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <DataField label="Aadhaar Card" value={profileData.aadhaar} editable={isEditing} onChange={(v: string) => handleChange('aadhaar', v)} />
                             <DataField label="PAN Card" value={profileData.pan} editable={isEditing} onChange={(v: string) => handleChange('pan', v)} />
                             <DataField label="Passport No." value={profileData.passport} editable={isEditing} onChange={(v: string) => handleChange('passport', v)} />
                             <DataField label="Voter ID" value={profileData.voterId} editable={isEditing} onChange={(v: string) => handleChange('voterId', v)} />
                             <DataField label="Driving License" value={profileData.drivingLicense} editable={isEditing} onChange={(v: string) => handleChange('drivingLicense', v)} />
                             <DataField label="Nationality" value={profileData.nationality} editable={isEditing} onChange={(v: string) => handleChange('nationality', v)} />
                          </div>
                       </ProfileCard>

                       <ProfileCard title="Uploads & Assets" icon={UploadCloud}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional Signature</p>
                                <div className="h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center group/sig relative overflow-hidden">
                                   {profileData.signature ? (
                                      <img src={profileData.signature} alt="Signature" className="h-full object-contain p-4" />
                                   ) : (
                                      <>
                                         <PenTool className="text-slate-300 group-hover/sig:text-primary transition-all mb-2" size={32} />
                                         <p className="text-[10px] font-bold text-slate-400">Click to upload signature</p>
                                      </>
                                   )}
                                   <input 
                                     type="file" 
                                     className="absolute inset-0 opacity-0 cursor-pointer" 
                                     accept="image/*"
                                     onChange={(e) => handleFileUpload('signature', e)}
                                   />
                                </div>
                             </div>
                             <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Voter/Aadhaar Copy</p>
                                <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center gap-4">
                                   <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                      <FileText size={20} />
                                   </div>
                                   <div>
                                      <p className="text-xs font-bold text-slate-800">aadhaar_copy.pdf</p>
                                      <p className="text-[10px] font-medium text-slate-400">Uploaded on Sept 20, 2025</p>
                                   </div>
                                   <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400">
                                      <Eye size={16} />
                                   </button>
                                </div>
                             </div>
                          </div>
                       </ProfileCard>
                    </div>
                 )}

                 {activeHub === 'academic' && (
                    <div className="space-y-6">
                       <ProfileCard title="Educational Background" icon={GraduationCap}>
                          <div className="space-y-6">
                             <TimelineItem year="2021-25" title="B.Tech (CSE - AI/ML)" subtitle="Vishwakarma Institute of Technology, Pune" score="9.2 CGPA" />
                             <TimelineItem year="2021" title="HSC (12th)" subtitle="Nashik Education Society" score="94.5%" />
                             <TimelineItem year="2019" title="SSC (10th)" subtitle="St. Lawrence High School" score="96.2%" />
                          </div>
                       </ProfileCard>
                    </div>
                 )}

                 {activeHub === 'personal' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <ProfileCard title="Health & Personal" icon={Heart}>
                          <DataField label="Blood Group" value={profileData.bloodGroup} editable={isEditing} onChange={(v: string) => handleChange('bloodGroup', v)} />
                          <DataField label="Category" value={profileData.category} editable={isEditing} onChange={(v: string) => handleChange('category', v)} />
                          <DataField label="Caste" value={profileData.caste} editable={isEditing} onChange={(v: string) => handleChange('caste', v)} />
                          <DataField label="Religion" value={profileData.religion} editable={isEditing} onChange={(v: string) => handleChange('religion', v)} />
                       </ProfileCard>
                       <ProfileCard title="Birth & Roots" icon={MapPin}>
                          <DataField label="Birth Place" value={profileData.birthPlace} editable={isEditing} onChange={(v: string) => handleChange('birthPlace', v)} />
                          <DataField label="Native Place" value={profileData.nativePlace} editable={isEditing} onChange={(v: string) => handleChange('nativePlace', v)} />
                          <DataField label="Domicile" value={profileData.domicile} editable={isEditing} onChange={(v: string) => handleChange('domicile', v)} />
                       </ProfileCard>
                    </div>
                 )}
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
                  <Zap size={80} className="text-primary" />
               </div>
               <h3 className="text-2xl font-black text-slate-800 mb-2">Profile Health</h3>
               <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                     />
                  </div>
                  <span className="font-black text-primary">92%</span>
               </div>
               <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Your profile is nearly complete! Upload your <span className="text-primary font-bold">Signature</span> and digital documents to reach 100%.
               </p>
               <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">
                  Sync with VIERP
               </button>
            </div>

            {isEditing && (
              <div className="p-8 rounded-[40px] bg-amber-500/5 border border-amber-500/20">
                 <h4 className="text-amber-600 font-bold mb-2 flex items-center gap-2">
                    <Edit3 size={18} /> Editing Mode
                 </h4>
                 <p className="text-xs text-amber-600/70">
                    You are currently in edit mode. Some fields like Official Email and PRN cannot be changed. Remember to save your changes.
                 </p>
              </div>
            )}
         </div>
      </div>
    </div>
  )
}

function ProfileCard({ title, icon: Icon, children, className = '' }: any) {
  return (
    <div className={cn("bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group", className)}>
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                <Icon size={20} />
             </div>
             <h4 className="font-black text-slate-800 tracking-tight">{title}</h4>
          </div>
          <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
             <MoreVertical size={18} />
          </button>
       </div>
       <div className="space-y-6">
          {children}
       </div>
    </div>
  )
}

function DataField({ label, value, highlight = false, editable = false, onChange }: any) {
  return (
    <div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
       {editable ? (
         <input 
           type="text"
           value={value}
           onChange={(e) => onChange(e.target.value)}
           className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
         />
       ) : (
         <p className={cn("text-base font-bold", highlight ? 'text-primary underline decoration-primary/30 underline-offset-4' : 'text-slate-800')}>
            {value}
         </p>
       )}
    </div>
  )
}

function TimelineItem({ year, title, subtitle, score }: any) {
  return (
    <div className="flex gap-4">
       <div className="w-1.5 rounded-full bg-slate-100 group-hover:bg-primary/20 transition-all" />
       <div className="flex-1">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{year}</p>
          <h5 className="font-bold text-slate-800">{title}</h5>
          <p className="text-xs text-slate-500">{subtitle}</p>
          {score && <p className="text-xs font-black text-emerald-600 mt-1">{score}</p>}
       </div>
    </div>
  )
}
