import express from 'express';
import { authMiddleware, adminOnly } from '../middleware/auth';
import {
  createStudent,
  bulkCreateStudents,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats
} from '../controllers/studentController';

const router = express.Router();

// All routes require admin authentication
router.use(authMiddleware, adminOnly);

// Stats
router.get('/stats', getStudentStats);

// CRUD
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.post('/bulk', bulkCreateStudents);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
