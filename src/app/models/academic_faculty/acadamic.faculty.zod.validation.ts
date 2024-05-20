import { z } from 'zod';

const createAcademicFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateAcademicFaculty = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFaculty,
  updateAcademicFaculty,
};
