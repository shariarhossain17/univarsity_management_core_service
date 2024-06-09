import z from 'zod';
const createRoom = z.object({
  body: z.object({
    roomNumber: z.string({ required_error: ' room number is required' }),
    floor: z.string({ required_error: ' floor is required' }),
  }),
});
const updateRoom = z.object({
  body: z.object({
    roomNumber: z
      .string({ required_error: ' room number is required' })
      .optional(),
    floor: z.string({ required_error: ' floor is required' }).optional(),
  }),
});

export const roomZodValidation = {
  createRoom,
  updateRoom,
};
