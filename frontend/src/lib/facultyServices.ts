/**
 * Faculty Portal Services
 * Simulates backend API calls for faculty actions
 */

export const facultyServices = {
  // Attendance
  markAttendance: async (data: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Attendance marked successfully' }), 1500));
  },

  // Academics
  uploadMarks: async (subjectId: string, marksData: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Marks uploaded and synced' }), 2000));
  },

  uploadSyllabus: async (subjectId: string, file: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Syllabus updated' }), 1500));
  },

  // Certificates
  approveCertificate: async (requestId: number) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Request approved' }), 1000));
  },

  rejectCertificate: async (requestId: number, reason: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Request rejected' }), 1000));
  },

  // Leaves
  applyLeave: async (data: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, leaveId: 'LV' + Date.now() }), 1200));
  },

  // NBA/ISO
  uploadDocumentation: async (module: string, files: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: `${module} documentation uploaded` }), 2000));
  }
};
