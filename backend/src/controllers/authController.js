"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Student_1 = require("../models/Student");
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key_123';
const isDbConnected = () => mongoose_1.default.connection.readyState === 1;
const demoStudents = [
    { _id: 'demo1', name: 'Nupur Dharmesh Agrawal', email: 'nupur.1251030483@vit.edu', prn: '1251030483', phone: '7499671070', department: 'Computer Engineering', branch: 'CE', year: 'TY', division: 'A', rollNumber: '1030439', semester: 6, admissionYear: 2021, status: 'active', password: '1251030483' },
    { _id: 'demo2', name: 'Om Manish Patil', email: 'om.1251030402@vit.edu', prn: '1251030402', phone: '9373458251', department: 'Computer Engineering', branch: 'CE', year: 'TY', division: 'A', rollNumber: '1030440', semester: 6, admissionYear: 2021, status: 'active', password: '1251030402' },
    { _id: 'demo3', name: 'Om Nivrutti Ghotekar', email: 'om.1251030180@vit.edu', prn: '1251030180', phone: '7058097707', department: 'Computer Engineering', branch: 'CE', year: 'TY', division: 'A', rollNumber: '1030441', semester: 6, admissionYear: 2021, status: 'active', password: '1251030180' },
    { _id: 'demo4', name: 'Nandkishor Shantiling Pachbhai', email: 'nandkishor.1251030142@vit.edu', prn: '1251030142', phone: '9209510963', department: 'Computer Engineering', branch: 'CE', year: 'TY', division: 'A', rollNumber: '1030442', semester: 6, admissionYear: 2021, status: 'active', password: '1251030142' }
];
const demoUsers = [
    { _id: 'demoFaculty', name: 'diifff liek shtreya das', email: 'faculty@vit.edu', password: 'faculty', role: 'faculty', department: 'Computer Engineering' },
    { _id: 'demoDean', name: 'Dean Demo User', email: 'dean@vit.edu', password: 'dean', role: 'admin', department: 'Academic Affairs' },
    { _id: 'demoTpo', name: 'TPO Demo User', email: 'tpo@vit.edu', password: 'tpo', role: 'tpo', department: 'Placement' }
];
const findDemoStudentByEmail = (email) => demoStudents.find((student) => student.email.toLowerCase() === email.toLowerCase());
const findDemoUserByEmail = (email) => demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
const validatePassword = async (inputPassword, storedPassword, fallbackPlain) => {
    if (!storedPassword) {
        return false;
    }
    const isBcryptHash = storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$');
    if (isBcryptHash) {
        return bcryptjs_1.default.compare(inputPassword, storedPassword);
    }
    if (fallbackPlain !== undefined) {
        return Promise.resolve(inputPassword === fallbackPlain);
    }
    return false;
};
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
        const emailClean = String(email || '').trim().toLowerCase();
        const passwordClean = String(password || '').trim();
        const dbConnected = isDbConnected();
        if (role === 'student') {
            let student;
            if (dbConnected) {
                student = await Student_1.Student.findOne({ email: emailClean });
            }
            else {
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
        let user;
        if (dbConnected) {
            user = await User_1.User.findOne({ email: emailClean });
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
        console.error('Login error:', error);
        res.status(500).json({ message: 'Something went wrong', error: String(error) });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map