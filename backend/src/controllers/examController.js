"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitExam = void 0;
const ExamResult_1 = __importDefault(require("../models/ExamResult"));
const submitExam = async (req, res) => {
    const { studentId, name, score, answers } = req.body;
    try {
        const exam = new ExamResult_1.default({ studentId, name, score, answers, submittedAt: new Date() });
        await exam.save();
        res.status(201).json({ message: 'Exam submitted', exam });
    }
    catch (err) {
        console.error('Exam submit error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.submitExam = submitExam;
exports.default = { submitExam: exports.submitExam };
//# sourceMappingURL=examController.js.map