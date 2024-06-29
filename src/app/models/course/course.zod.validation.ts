import { z } from 'zod';

const assignAndRemoveValidations = z.object({
  body: z.object({
    faculties: z.array(z.string(), { required_error: 'courses required' }),
  }),
});

export const coursesZodValidation = {
  assignAndRemoveValidations,
};
