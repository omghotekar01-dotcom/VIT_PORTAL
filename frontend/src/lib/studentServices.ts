/**
 * Student Portal Services
 * Simulates backend API calls for all 22 modules
 */

export const studentServices = {
  // Academics
  downloadSyllabus: async (subjectId?: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Syllabus download started' }), 1000));
  },

  // Accounts
  makePayment: async (amount: number, type: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase() }), 2000));
  },

  // Admission
  uploadDocument: async (file: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Document uploaded successfully' }), 1500));
  },

  // Assignments
  submitAssignment: async (asgId: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Assignment submitted' }), 1000));
  },

  // Career
  updateCareerChoice: async (choice: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Career choice updated' }), 800));
  },

  // Certificates
  applyCertificate: async (type: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, requestId: 'REQ' + Date.now() }), 1200));
  },

  // Events
  registerEvent: async (eventId: number) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Registered for event' }), 1000));
  },

  // Feedback
  submitFeedback: async (data: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Feedback submitted anonymously' }), 1500));
  },

  // Grievance
  submitGrievance: async (data: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, complaintId: 'GR' + Date.now() }), 1500));
  },

  // Registration
  confirmRegistration: async (subjectIds: string[]) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Registration confirmed' }), 2000));
  },

  // Examination
  downloadHallTicket: async (examId: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, url: '#' }), 1500));
  },
  
  viewResult: async (semester: number) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, gpa: 9.24 }), 1000));
  },

  // Library
  reserveBook: async (bookId: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Book reserved for 24 hours' }), 1000));
  },

  // Profile
  updateProfile: async (data: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Profile updated' }), 1500));
  },

  // Marksheet
  getGradeSheet: async (sem: number) => {
    return new Promise((resolve) => setTimeout(() => resolve({ 
      success: true, 
      subjects: [
        { code: 'CS301', name: 'Machine Learning', credits: 4, grade: 'O', points: 10 },
        { code: 'CS302', name: 'Cyber Security', credits: 3, grade: 'A+', points: 9 },
        { code: 'CS303', name: 'Cloud Computing', credits: 3, grade: 'A', points: 8 },
        { code: 'CS304', name: 'Software Eng.', credits: 4, grade: 'A+', points: 9 },
        { code: 'CS305', name: 'Professional Ethics', credits: 2, grade: 'O', points: 10 },
      ],
      sgpa: 9.24,
      cgpa: 9.05,
      totalCredits: 16
    }), 1200));
  }
};
