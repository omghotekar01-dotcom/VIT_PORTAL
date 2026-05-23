"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "student";
    UserRole["FACULTY"] = "faculty";
    UserRole["ADMIN"] = "admin";
    UserRole["TPO"] = "tpo";
    UserRole["SUPER_ADMIN"] = "super_admin";
})(UserRole || (exports.UserRole = UserRole = {}));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.STUDENT
    },
    studentId: { type: String }, // For students
    facultyId: { type: String }, // For faculty
    department: { type: String },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now }
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map