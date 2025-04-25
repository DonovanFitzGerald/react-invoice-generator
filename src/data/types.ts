import { CSSProperties } from 'react'
import { z, TypeOf } from 'zod'

export interface ProductLine {
  name: string
  description: string
  quantity: string
  rate: string
}

export const TProductLine = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.string(),
  rate: z.string(),
})

export const TInvoice = z.object({
  logo: z.string(),
  logoWidth: z.number(),
  title: z.string(),
  companyName: z.string(),
  companyAddress: z.string(),
  companyAddress2: z.string(),
  companyPhone: z.string(),
  companyWebsite: z.string(),
  invoiceTitleLabel: z.string(),
  invoiceTitle: z.string(),
  invoiceDateLabel: z.string(),
  invoiceDate: z.string(),
  invoiceDueDateLabel: z.string(),
  invoiceDueDate: z.string(),
  issuedToLabel: z.string(),
  clientName: z.string(),
  clientAddress1: z.string(),
  clientAddress2: z.string(),
  productLineDescription: z.string(),
  productLineQuantity: z.string(),
  productLineQuantityRate: z.string(),
  productLineQuantityAmount: z.string(),
  productLines: z.array(TProductLine),
  subTotalLabel: z.string(),
  taxLabel: z.string(),
  totalLabel: z.string(),
  currency: z.string(),

  bank: z.string(),
  sortCode: z.string(),
  accountNumber: z.string(),
  iban: z.string(),
  bic: z.string(),
  notesLabel: z.string(),
  notes: z.string(),
})

export type Invoice = TypeOf<typeof TInvoice>

export interface CSSClasses {
  [key: string]: CSSProperties
}
