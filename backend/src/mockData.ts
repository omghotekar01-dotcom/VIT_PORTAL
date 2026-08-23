import mongoose from 'mongoose';

export type DemoStudent = {
  _id: string;
  name: string;
  email: string;
  prn: string;
  phone: string;
  department: string;
  branch: string;
  year: string;
  division: string;
  rollNumber: string;
  semester: number;
  admissionYear: number;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
};

export type DemoUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'faculty' | 'admin' | 'tpo' | 'student';
  studentId?: string;
  facultyId?: string;
  department?: string;
};

export const demoStudents: DemoStudent[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Nupur Dharmesh Agrawal',
    email: 'nupur.1251030483@vit.edu',
    prn: '1251030483',
    phone: '7499671070',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '1030439',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Om Manish Patil',
    email: 'om.1251030402@vit.edu',
    prn: '1251030402',
    phone: '9373458251',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '1030440',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Om Nivrutti Ghotekar',
    email: 'om.1251030180@vit.edu',
    prn: '1251030180',
    phone: '7058097707',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '1030441',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Nandkishor Shantiling Pachbhai',
    email: 'nandkishor.1251030142@vit.edu',
    prn: '1251030142',
    phone: '9209510963',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '1030442',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  }
];

export const demoUsers: DemoUser[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'diifff liek shtreya das',
    email: 'faculty@vit.edu',
    password: 'faculty',
    role: 'faculty',
    department: 'Computer Engineering'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Dean Demo User',
    email: 'dean@vit.edu',
    password: 'dean',
    role: 'admin',
    department: 'Academic Affairs'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'TPO Demo User',
    email: 'tpo@vit.edu',
    password: 'tpo',
    role: 'tpo',
    department: 'Placement'
  }
];
