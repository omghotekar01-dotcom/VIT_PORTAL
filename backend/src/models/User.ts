import mongoose from 'mongoose';

export enum UserRole {
  STUDENT = 'student',
  FACULTY = 'faculty',
  ADMIN = 'admin',
  TPO = 'tpo',
  SUPER_ADMIN = 'super_admin'
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.STUDENT 
  },
  studentId: { type: String }, // For students
  facultyId: { type: String }, // For faculty
  department: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
