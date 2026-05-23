import mongoose from 'mongoose';

const ExamResultSchema = new mongoose.Schema({
  studentId: { type: String },
  name: { type: String },
  score: { type: Number, required: true },
  answers: { type: Array, default: [] },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model('ExamResult', ExamResultSchema);
