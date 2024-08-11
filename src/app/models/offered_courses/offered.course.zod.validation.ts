import { z } from 'zod';

const offeredCourseCreate = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'academic department id required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semester registration id is required',
    }),
    courseIds: z
      .array(
        z.string({
          required_error: 'course id is required',
        })
      )
      .nonempty({
        message: 'course ids is required',
      }),
  }),
});

export const offeredCourseZodValidation = {
  offeredCourseCreate,
};
