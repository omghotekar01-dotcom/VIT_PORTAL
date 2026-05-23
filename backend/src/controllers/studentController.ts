import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Student } from '../models/Student';

// Create a single student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { prn, name, email, department, branch, year, division, rollNumber, semester, admissionYear, phone, parentPhone, address, bloodGroup, dateOfBirth, gender } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { prn }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email or PRN already exists' });
    }

    // Hash the PRN as password
    const hashedPassword = await bcrypt.hash(prn, 12);

    const student = new Student({
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
      createdBy: (req as any).userId
    });

    await student.save();

    // Return student without password
    const studentObj = student.toObject();
    const { password, ...studentWithoutPassword } = studentObj;

    res.status(201).json({ message: 'Student created successfully', student: studentWithoutPassword });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate entry: student with this PRN or email already exists' });
    }
    res.status(500).json({ message: 'Failed to create student', error: error.message });
  }
};

// Bulk create students
export const bulkCreateStudents = async (req: Request, res: Response) => {
  try {
    const { students } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: 'Students array is required' });
    }

    const results = { created: 0, failed: 0, errors: [] as string[] };

    for (const s of students) {
      try {
        const existing = await Student.findOne({ $or: [{ email: s.email }, { prn: s.prn }] });
        if (existing) {
          results.failed++;
          results.errors.push(`${s.prn}: already exists`);
          continue;
        }

        const hashedPassword = await bcrypt.hash(s.prn, 12);
        
        const student = new Student({
          ...s,
          password: hashedPassword,
          createdBy: (req as any).userId
        });
        await student.save();
        results.created++;
      } catch (err: any) {
        results.failed++;
        results.errors.push(`${s.prn}: ${err.message}`);
      }
    }

    res.status(201).json({ message: `Bulk operation complete`, results });
  } catch (error: any) {
    res.status(500).json({ message: 'Bulk create failed', error: error.message });
  }
};

// Get all students with filters
export const getStudents = async (req: Request, res: Response) => {
  try {
    const { department, branch, year, division, status, search, page = 1, limit = 50 } = req.query;

    const filter: any = {};
    if (department) filter.department = department;
    if (branch) filter.branch = branch;
    if (year) filter.year = year;
    if (division) filter.division = division;
    if (status) filter.status = status;
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
      Student.find(filter)
        .select('-password')
        .sort({ department: 1, branch: 1, year: 1, division: 1, rollNumber: 1 })
        .skip(skip)
        .limit(Number(limit)),
      Student.countDocuments(filter)
    ]);

    // Get filter options (distinct values)
    const [departments, branches, years, divisions] = await Promise.all([
      Student.distinct('department'),
      Student.distinct('branch'),
      Student.distinct('year'),
      Student.distinct('division'),
    ]);

    res.status(200).json({
      students,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      filters: { departments, branches, years, divisions }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch student', error: error.message });
  }
};

// Update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { password, ...updateData } = req.body;

    // If PRN is being updated, rehash it as password
    if (updateData.prn) {
      updateData.password = await bcrypt.hash(updateData.prn, 12);
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated', student });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update student', error: error.message });
  }
};

// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
};

// Get stats for admin dashboard
export const getStudentStats = async (req: Request, res: Response) => {
  try {
    const [
      totalStudents,
      activeStudents,
      departmentWise,
      yearWise,
      divisionWise
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: 'active' }),
      Student.aggregate([
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Student.aggregate([
        { $group: { _id: '$year', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Student.aggregate([
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
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
};
