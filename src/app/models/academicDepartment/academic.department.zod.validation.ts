import { z } from 'zod';

const createAcademicDepartment = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFacultyId: z.string({
      required_error: 'academicFacultyId is required',
    }),
  }),
});

const updateAcademicDepartment = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title must be string',
      })
      .optional(),
    academicFacultyId: z
      .string({
        required_error: 'academicFacultyId must be string',
      })
      .optional(),
  }),
});

export const academicDepartmentZodValidation = {
  createAcademicDepartment,
  updateAcademicDepartment,
};
