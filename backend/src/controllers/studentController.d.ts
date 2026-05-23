import { Request, Response } from 'express';
export declare const createStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const bulkCreateStudents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStudents: (req: Request, res: Response) => Promise<void>;
export declare const getStudentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStudentStats: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=studentController.d.ts.map