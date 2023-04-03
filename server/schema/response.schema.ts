import { z } from 'zod';

const errorSchema = z.object({
  message: z.string().optional(),
  status: z.number().optional(),
});

export type TErrorResponse = z.infer<typeof errorSchema>;
