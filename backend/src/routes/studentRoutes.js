"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
// All routes require admin authentication
router.use(auth_1.authMiddleware, auth_1.adminOnly);
// Stats
router.get('/stats', studentController_1.getStudentStats);
// CRUD
router.get('/', studentController_1.getStudents);
router.get('/:id', studentController_1.getStudentById);
router.post('/', studentController_1.createStudent);
router.post('/bulk', studentController_1.bulkCreateStudents);
router.put('/:id', studentController_1.updateStudent);
router.delete('/:id', studentController_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=studentRoutes.js.map