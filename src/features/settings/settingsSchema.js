import { z } from 'zod'

export const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'CAD', 'AUD']

export const settingsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  email: z.string().email('Enter a valid email'),
  currency: z.enum(CURRENCY_OPTIONS),
  invoiceNumberPrefix: z
    .string()
    .min(1, 'Prefix is required')
    .max(8, 'Keep it to 8 characters or fewer')
    .regex(/^[A-Za-z0-9]+$/, 'Letters and numbers only'),
})