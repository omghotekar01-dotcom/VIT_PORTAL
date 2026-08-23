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
    name: 'Nupur Dharmesh Agrawal',
    phone: '7499671070',
    prn: '1251030483',
    rollNumber: '1030439',
    email: 'nupur.1251030483@vit.edu'
  },
  {
    name: 'Om Manish Patil',
    phone: '9373458251',
    prn: '1251030402',
    rollNumber: '1030440',
    email: 'om.1251030402@vit.edu'
  },
  {
    name: 'Om Nivrutti Ghotekar',
    phone: '7058097707',
    prn: '1251030180',
    rollNumber: '1030441',
    email: 'om.1251030180@vit.edu'
  },
  {
    name: 'Nandkishor Shantiling Pachbhai',
    phone: '9209510963',
    prn: '1251030142',
    rollNumber: '1030442',
    email: 'nandkishor.1251030142@vit.edu'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Create or update faculty demo user to match the default demo login credentials
    const facultyEmail = 'faculty@vit.edu';
    const facultyName = 'diifff liek shtreya das';
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

    const deanEmail = 'dean@vit.edu';
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

    const tpoEmail = 'tpo@vit.edu';
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
