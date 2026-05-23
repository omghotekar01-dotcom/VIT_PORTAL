import mongoose from 'mongoose';
export declare enum UserRole {
    STUDENT = "student",
    FACULTY = "faculty",
    ADMIN = "admin",
    TPO = "tpo",
    SUPER_ADMIN = "super_admin"
}
export declare const User: mongoose.Model<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: NativeDate;
    studentId?: string | null;
    facultyId?: string | null;
    department?: string | null;
    profilePicture?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=User.d.ts.map