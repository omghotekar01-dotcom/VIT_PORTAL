import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  prn: string;               // PRN number (used as password for login)
  name: string;
  email: string;             // School email (used as login email)
  password: string;          // Hashed PRN
  department: string;        // e.g., "Computer Engineering"
  branch: string;            // e.g., "CE", "IT", "ME", "ENTC"
  year: string;              // e.g., "FY", "SY", "TY", "BTech"
  division: string;          // e.g., "A", "B", "C"
  rollNumber: string;        // Roll number within division
  semester: number;          // Current semester (1-8)
  admissionYear: number;     // Year of admission
  phone?: string;
  parentPhone?: string;
  address?: string;
  bloodGroup?: string;
  dateOfBirth?: Date;
  gender?: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  createdBy: mongoose.Types.ObjectId;  // Admin who created this student
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>({
  prn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  division: { type: String, required: true },
  rollNumber: { type: String, required: true },
  semester: { type: Number, required: true, min: 1, max: 8 },
  admissionYear: { type: Number, required: true },
  phone: { type: String },
  parentPhone: { type: String },
  address: { type: String },
  bloodGroup: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'graduated', 'suspended'],
    default: 'active'
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

// Compound index for efficient queries
studentSchema.index({ department: 1, branch: 1, year: 1, division: 1 });
studentSchema.index({ email: 1 });
studentSchema.index({ prn: 1 });

export const Student = mongoose.model<IStudent>('Student', studentSchema);
