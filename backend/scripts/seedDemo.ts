import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config();

// Import models
import { Student } from '../src/models/Student';
import { User, UserRole } from '../src/models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vit-smart-campus';

type DemoStudent = {
  name: string;
  phone: string;
  prn: string;
  rollNumber: string;
  email: string;
};

const students: DemoStudent[] = [
  {
    name: 'Demo Student One',
    phone: '0000000001',
    prn: '9900000001',
    rollNumber: '0000001',
    email: 'student01@example.test'
  },
  {
    name: 'Demo Student Two',
    phone: '0000000002',
    prn: '9900000002',
    rollNumber: '0000002',
    email: 'student02@example.test'
  },
  {
    name: 'Demo Student Three',
    phone: '0000000003',
    prn: '9900000003',
    rollNumber: '0000003',
    email: 'student03@example.test'
  },
  {
    name: 'Demo Student Four',
    phone: '0000000004',
    prn: '9900000004',
    rollNumber: '0000004',
    email: 'student04@example.test'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Create or update faculty demo user to match the default demo login credentials
    const facultyEmail = 'faculty@example.test';
    const facultyName = 'Demo Faculty';
    const facultyPassword = await bcrypt.hash('faculty', 10);

    await User.findOneAndUpdate(
      { email: facultyEmail },
      {
        name: facultyName,
        email: facultyEmail,
        password: facultyPassword,
        role: UserRole.FACULTY,
        department: 'Computer Engineering'
      },
      { upsert: true }
    );
    console.log('Faculty demo user created/updated:', facultyName);

    const deanEmail = 'admin@example.test';
    const deanName = 'Dean Demo User';
    const deanPassword = await bcrypt.hash('dean', 10);

    await User.findOneAndUpdate(
      { email: deanEmail },
      {
        name: deanName,
        email: deanEmail,
        password: deanPassword,
        role: UserRole.ADMIN,
        department: 'Academic Affairs'
      },
      { upsert: true }
    );
    console.log('Dean demo user created/updated:', deanName);

    const tpoEmail = 'placement@example.test';
    const tpoName = 'TPO Demo User';
    const tpoPassword = await bcrypt.hash('tpo', 10);

    await User.findOneAndUpdate(
      { email: tpoEmail },
      {
        name: tpoName,
        email: tpoEmail,
        password: tpoPassword,
        role: UserRole.TPO,
        department: 'Placement'
      },
      { upsert: true }
    );
    console.log('TPO demo user created/updated:', tpoName);

    for (const s of students) {
      const hashed = await bcrypt.hash(s.prn, 10); // PRN used as password per request

      // Upsert Student document
      const studentDoc = await Student.findOneAndUpdate(
        { prn: s.prn },
        {
          prn: s.prn,
          name: s.name,
          email: s.email,
          password: hashed,
          department: 'Computer Engineering',
          branch: 'CE',
          year: 'TY',
          division: 'A',
          rollNumber: s.rollNumber,
          semester: 6,
          admissionYear: 2021,
          phone: s.phone,
          status: 'active'
        },
        { upsert: true, new: true }
      );

      // Ensure corresponding User exists
      await User.findOneAndUpdate(
        { email: s.email },
        {
          name: s.name,
          email: s.email,
          password: hashed,
          role: UserRole.STUDENT,
          studentId: studentDoc._id.toString(),
          department: 'Computer Engineering'
        },
        { upsert: true }
      );

      console.log('Seeded student:', s.name, s.email);
    }

    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
