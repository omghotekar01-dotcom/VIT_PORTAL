import express from 'express';
import { submitExam } from '../controllers/examController';

const router = express.Router();

router.post('/submit', submitExam);

export default router;
