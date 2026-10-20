import mongoose from 'mongoose';

export type DemoStudent = {
  _id: string;
  name: string;
  email: string;
  prn: string;
  password?: string;
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
    name: 'Demo Student One',
    email: 'student01@example.test',
    prn: '9900000001',
    phone: '0000000001',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '0000001',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Demo Student Two',
    email: 'student02@example.test',
    prn: '9900000002',
    phone: '0000000002',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '0000002',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Demo Student Three',
    email: 'student03@example.test',
    prn: '9900000003',
    phone: '0000000003',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '0000003',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Demo Student Four',
    email: 'student04@example.test',
    prn: '9900000004',
    phone: '0000000004',
    department: 'Computer Engineering',
    branch: 'CE',
    year: 'TY',
    division: 'A',
    rollNumber: '0000004',
    semester: 6,
    admissionYear: 2021,
    status: 'active'
  }
];

export const demoUsers: DemoUser[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Demo Faculty',
    email: 'faculty@example.test',
    password: 'faculty',
    role: 'faculty',
    department: 'Computer Engineering'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Demo Administrator',
    email: 'admin@example.test',
    password: 'dean',
    role: 'admin',
    department: 'Academic Affairs'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Demo Placement Officer',
    email: 'placement@example.test',
    password: 'tpo',
    role: 'tpo',
    department: 'Placement'
  }
];
