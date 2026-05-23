import mongoose, { Document } from 'mongoose';
export interface IStudent extends Document {
    prn: string;
    name: string;
    email: string;
    password: string;
    department: string;
    branch: string;
    year: string;
    division: string;
    rollNumber: string;
    semester: number;
    admissionYear: number;
    phone?: string;
    parentPhone?: string;
    address?: string;
    bloodGroup?: string;
    dateOfBirth?: Date;
    gender?: string;
    status: 'active' | 'inactive' | 'graduated' | 'suspended';
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Student: mongoose.Model<IStudent, {}, {}, {}, mongoose.Document<unknown, {}, IStudent, {}, mongoose.DefaultSchemaOptions> & IStudent & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IStudent>;
//# sourceMappingURL=Student.d.ts.map