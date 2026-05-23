import { Request, Response } from 'express';
import ExamResult from '../models/ExamResult';

export const submitExam = async (req: Request, res: Response) => {
  const { studentId, name, score, answers } = req.body;
  try {
    const exam = new ExamResult({ studentId, name, score, answers, submittedAt: new Date() });
    await exam.save();
    res.status(201).json({ message: 'Exam submitted', exam });
  } catch (err) {
    console.error('Exam submit error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export default { submitExam };
