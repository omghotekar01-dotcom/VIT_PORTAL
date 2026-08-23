import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Student } from '../models/Student';
import { demoStudents, demoUsers } from '../mockData';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key_123';

const isDbConnected = () => mongoose.connection.readyState === 1;

const findDemoStudentByEmail = (email: string) =>
  demoStudents.find((student) => student.email.toLowerCase() === email.toLowerCase());

const findDemoUserByEmail = (email: string) =>
  demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());

const validatePassword = async (
  inputPassword: string,
  storedPassword: string | undefined,
  fallbackPlain?: string
) => {
  if (!storedPassword) {
    return false;
  }

  const isBcryptHash = storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$');
  if (isBcryptHash) {
    return bcrypt.compare(inputPassword, storedPassword);
  }

  if (fallbackPlain !== undefined) {
    return Promise.resolve(inputPassword === fallbackPlain);
  }

  return false;
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, studentId, facultyId, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      studentId,
      facultyId,
      department
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Something went wrong', error: String(error) });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const emailClean = String(email || '').trim().toLowerCase();
    const passwordClean = String(password || '').trim();
    console.log('Login attempt:', { email: emailClean, role });
    const dbConnected = isDbConnected();

    // If role is student, check Student collection or fallback demo students
    if (role === 'student') {
      let student;
      if (dbConnected) {
        student = await Student.findOne({ email: emailClean });
      } else {
        student = findDemoStudentByEmail(emailClean);
      }

      if (!student) {
        return res.status(404).json({ message: 'Student not found. Contact your admin.' });
      }

      if (student.status !== 'active') {
        return res.status(403).json({ message: `Your account is ${student.status}. Contact administration.` });
      }

      const isPasswordCorrect = await validatePassword(passwordClean, student.password, student.prn);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials. Use your PRN number as password.' });
      }

      const token = jwt.sign(
        { userId: student._id, role: 'student', studentId: student.prn },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        token,
        user: {
          id: student._id,
          name: student.name,
          email: student.email,
          role: 'student',
          prn: student.prn,
          department: student.department,
          branch: student.branch,
          year: student.year,
          division: student.division,
          semester: student.semester
        }
      });
    }

    // For other roles (admin, faculty, tpo), check User collection first, then fallback to demo users
    let user;
    if (dbConnected) {
      user = await User.findOne({ email: emailClean });
    }

    if (!user) {
      user = findDemoUserByEmail(emailClean);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: `This account does not have ${role} access.` });
    }

    const isPasswordCorrect = await validatePassword(passwordClean, user.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong', error: String(error) });
  }
};
