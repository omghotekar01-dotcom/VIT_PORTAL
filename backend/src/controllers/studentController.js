"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentStats = exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getStudents = exports.bulkCreateStudents = exports.createStudent = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Student_1 = require("../models/Student");
// Create a single student
const createStudent = async (req, res) => {
    try {
        const { prn, name, email, department, branch, year, division, rollNumber, semester, admissionYear, phone, parentPhone, address, bloodGroup, dateOfBirth, gender } = req.body;
        // Check if student already exists
        const existingStudent = await Student_1.Student.findOne({ $or: [{ email }, { prn }] });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this email or PRN already exists' });
        }
        // Hash the PRN as password
        const hashedPassword = await bcryptjs_1.default.hash(prn, 12);
        const student = new Student_1.Student({
            prn,
            name,
            email,
            password: hashedPassword,
            department,
            branch,
            year,
            division,
            rollNumber,
            semester,
            admissionYear,
            phone,
            parentPhone,
            address,
            bloodGroup,
            dateOfBirth,
            gender,
            createdBy: req.userId
        });
        await student.save();
        // Return student without password
        const studentObj = student.toObject();
        const { password, ...studentWithoutPassword } = studentObj;
        res.status(201).json({ message: 'Student created successfully', student: studentWithoutPassword });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate entry: student with this PRN or email already exists' });
        }
        res.status(500).json({ message: 'Failed to create student', error: error.message });
    }
};
exports.createStudent = createStudent;
// Bulk create students
const bulkCreateStudents = async (req, res) => {
    try {
        const { students } = req.body;
        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: 'Students array is required' });
        }
        const results = { created: 0, failed: 0, errors: [] };
        for (const s of students) {
            try {
                const existing = await Student_1.Student.findOne({ $or: [{ email: s.email }, { prn: s.prn }] });
                if (existing) {
                    results.failed++;
                    results.errors.push(`${s.prn}: already exists`);
                    continue;
                }
                const hashedPassword = await bcryptjs_1.default.hash(s.prn, 12);
                const student = new Student_1.Student({
                    ...s,
                    password: hashedPassword,
                    createdBy: req.userId
                });
                await student.save();
                results.created++;
            }
            catch (err) {
                results.failed++;
                results.errors.push(`${s.prn}: ${err.message}`);
            }
        }
        res.status(201).json({ message: `Bulk operation complete`, results });
    }
    catch (error) {
        res.status(500).json({ message: 'Bulk create failed', error: error.message });
    }
};
exports.bulkCreateStudents = bulkCreateStudents;
// Get all students with filters
const getStudents = async (req, res) => {
    try {
        const { department, branch, year, division, status, search, page = 1, limit = 50 } = req.query;
        const filter = {};
        if (department)
            filter.department = department;
        if (branch)
            filter.branch = branch;
        if (year)
            filter.year = year;
        if (division)
            filter.division = division;
        if (status)
            filter.status = status;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { prn: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { rollNumber: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (Number(page) - 1) * Number(limit);
        const [students, total] = await Promise.all([
            Student_1.Student.find(filter)
                .select('-password')
                .sort({ department: 1, branch: 1, year: 1, division: 1, rollNumber: 1 })
                .skip(skip)
                .limit(Number(limit)),
            Student_1.Student.countDocuments(filter)
        ]);
        // Get filter options (distinct values)
        const [departments, branches, years, divisions] = await Promise.all([
            Student_1.Student.distinct('department'),
            Student_1.Student.distinct('branch'),
            Student_1.Student.distinct('year'),
            Student_1.Student.distinct('division'),
        ]);
        res.status(200).json({
            students,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            filters: { departments, branches, years, divisions }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch students', error: error.message });
    }
};
exports.getStudents = getStudents;
// Get student by ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student_1.Student.findById(req.params.id).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch student', error: error.message });
    }
};
exports.getStudentById = getStudentById;
// Update student
const updateStudent = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        // If PRN is being updated, rehash it as password
        if (updateData.prn) {
            updateData.password = await bcryptjs_1.default.hash(updateData.prn, 12);
        }
        const student = await Student_1.Student.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated', student });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update student', error: error.message });
    }
};
exports.updateStudent = updateStudent;
// Delete student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student_1.Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete student', error: error.message });
    }
};
exports.deleteStudent = deleteStudent;
// Get stats for admin dashboard
const getStudentStats = async (req, res) => {
    try {
        const [totalStudents, activeStudents, departmentWise, yearWise, divisionWise] = await Promise.all([
            Student_1.Student.countDocuments(),
            Student_1.Student.countDocuments({ status: 'active' }),
            Student_1.Student.aggregate([
                { $group: { _id: '$department', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            Student_1.Student.aggregate([
                { $group: { _id: '$year', count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]),
            Student_1.Student.aggregate([
                { $group: { _id: { department: '$department', division: '$division' }, count: { $sum: 1 } } },
                { $sort: { '_id.department': 1, '_id.division': 1 } }
            ]),
        ]);
        res.status(200).json({
            totalStudents,
            activeStudents,
            departmentWise,
            yearWise,
            divisionWise
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
    }
};
exports.getStudentStats = getStudentStats;
//# sourceMappingURL=studentController.js.map