import { ProductLine, Invoice } from './types'

export const initialProductLine: ProductLine = {
  name: '',
  description: '',
  quantity: '1',
  rate: '0.00',
}

export const initialInvoice: Invoice = {
  logo: '',
  logoWidth: 100,
  title: 'INVOICE',
  companyName: '',
  companyAddress: '',
  companyAddress2: '',
  companyPhone: '',
  companyWebsite: '',
  invoiceTitleLabel: 'Invoice#',
  invoiceTitle: '',
  invoiceDateLabel: 'Invoice Date',
  invoiceDate: '',
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: '',

  clientName: '',
  clientAddress1: '',
  clientAddress2: '',
  productLineDescription: 'Item Description',
  productLineQuantity: 'Qty',
  productLineQuantityRate: 'Rate',
  productLineQuantityAmount: 'Amount',
  productLines: [
    {
      name: 'Brochure',
      description: 'Brochure Design',
      quantity: '2',
      rate: '100.00',
    },
    { ...initialProductLine },
    { ...initialProductLine },
  ],
  subTotalLabel: 'Sub Total',
  taxLabel: 'Sale Tax (10%)',
  totalLabel: 'TOTAL',
  currency: '$',

  bank: 'Bank Name and Address',
  sortCode: 'Sort Code',
  accountNumber: 'Account Number',
  iban: 'IBAN',
  bic: 'BIC',
  notesLabel: 'Notes',
  notes: 'It was great doing business with you.',
}
