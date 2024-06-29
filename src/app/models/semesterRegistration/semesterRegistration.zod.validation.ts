import { z } from 'zod';

const semesterRegistrationStatus = ['UPCOMING', 'ONGOING', 'ENDED'] as const;

const semesterRegistration = z.object({
  body: z.object({
    startDate: z.string({ required_error: 'startDate is required' }),
    endDate: z.string({ required_error: 'endDate is required' }),
    status: z.enum(semesterRegistrationStatus).default('UPCOMING'),
    minCredit: z.number({ required_error: 'minCredit is required' }),
    maxCredit: z.number({ required_error: 'maxCredit is required' }),
  }),
});

export const semesterRegistrationZodValidation = {
  semesterRegistration,
};
