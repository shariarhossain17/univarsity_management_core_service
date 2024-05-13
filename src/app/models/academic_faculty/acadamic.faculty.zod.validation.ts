import { z } from 'zod';

const createAcademicFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFaculty,
};
