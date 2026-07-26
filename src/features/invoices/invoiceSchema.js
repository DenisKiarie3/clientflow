import { z } from 'zod'

export const lineItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().positive('Must be greater than 0'),
  unitPrice: z.coerce.number().nonnegative('Must be 0 or more'),
})

export const invoiceSchema = z.object({
  clientId: z.string().min(1, 'Select a client'),
  dueDate: z.string().min(1, 'Due date is required'),
  taxRate: z.coerce.number().min(0).max(1),
  notes: z.string().optional(),
  lineItems: z.array(lineItemSchema).min(1, 'Add at least one line item'),
})