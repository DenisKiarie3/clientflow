// import { z } from 'zod'

// export const clientSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Enter a valid email'),
//   company: z.string().optional(),
//   phone: z.string().optional(),
//   notes: z.string().optional(),
// })

import { z } from 'zod'

export const clientSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Enter a valid email'),

  company: z.string().trim().optional().or(z.literal('')),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]*$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),

  notes: z.string().trim().optional().or(z.literal('')),
})