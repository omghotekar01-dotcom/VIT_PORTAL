"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ExamResultSchema = new mongoose_1.default.Schema({
    studentId: { type: String },
    name: { type: String },
    score: { type: Number, required: true },
    answers: { type: Array, default: [] },
    submittedAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('ExamResult', ExamResultSchema);
//# sourceMappingURL=ExamResult.js.map