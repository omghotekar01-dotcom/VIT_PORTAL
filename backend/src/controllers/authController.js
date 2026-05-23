"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const Student_1 = require("../models/Student");
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key_123';
const signup = async (req, res) => {
    try {
        const { name, email, password, role, studentId, facultyId, department } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const newUser = new User_1.User({
            name,
            email,
            password: hashedPassword,
            role,
            studentId,
            facultyId,
            department
        });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // If role is student, check Student collection (email + PRN as password)
        if (role === 'student') {
            const student = await Student_1.Student.findOne({ email });
            if (!student) {
                return res.status(404).json({ message: 'Student not found. Contact your admin.' });
            }
            if (student.status !== 'active') {
                return res.status(403).json({ message: `Your account is ${student.status}. Contact administration.` });
            }
            const isPasswordCorrect = await bcryptjs_1.default.compare(password, student.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid credentials. Use your PRN number as password.' });
            }
            const token = jsonwebtoken_1.default.sign({ userId: student._id, role: 'student', studentId: student.prn }, JWT_SECRET, { expiresIn: '7d' });
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
        // For other roles (admin, faculty, tpo), check User collection
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (role && user.role !== role) {
            return res.status(403).json({ message: `This account does not have ${role} access.` });
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map