import { z } from 'zod';

const createFaculty = z.object({
  body: z.object({
    facutlyId: z.string({ required_error: 'facultyId is required' }),
    firstName: z.string({ required_error: 'firstName is required' }),
    lastName: z.string({ required_error: 'lastName is required' }),
    middleName: z.string({ required_error: 'middleName is required' }),
    profileImage: z.string({ required_error: 'profileImage is required' }),
    email: z.string({ required_error: 'email is required' }),
    contacNo: z.string({ required_error: 'contactNo is required' }),
    gender: z.string({ required_error: 'gender is required' }),
    bloodGroup: z.string({ required_error: 'bloodGroup is required' }),
    designation: z.string({ required_error: 'designation is required' }),
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }),
    academicFacultyId: z.string({
      required_error: 'academicFacultyId is required',
    }),
  }),
});

export const facultyZodValidation = {
  createFaculty,
};
