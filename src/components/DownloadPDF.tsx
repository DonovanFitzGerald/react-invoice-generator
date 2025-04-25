import React, { FC } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice, TInvoice } from '../data/types'
import InvoicePage from './InvoicePage'
import FileSaver from 'file-saver'

interface Props {
  data: Invoice
  setData(data: Invoice): void
}

const Download: FC<Props> = ({ data, setData }) => {
  // Use current data for PDF generation
  const debounced = data

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return

    const file = e.target.files[0]
    file
      .text()
      .then((str: string) => {
        try {
          if (!(str.startsWith('{') && str.endsWith('}'))) {
            str = atob(str)
          }
          const d = JSON.parse(str)
          const dParsed = TInvoice.parse(d)
          console.info('parsed correctly')
          setData(dParsed)
        } catch (e) {
          console.error(e)
          return
        }
      })
      .catch((err) => console.error(err))
  }

  // Get the invoice number from the invoice title or use 'invoice' as fallback
  const getInvoiceNumber = () => (data.invoiceTitle ? data.invoiceTitle : 'invoice')

  function handleSaveTemplate() {
    const blob = new Blob([JSON.stringify(debounced)], {
      type: 'text/plain;charset=utf-8',
    })
    FileSaver(blob, `Invoice-${getInvoiceNumber()}.template`)
  }

  const fileName = `Invoice-${getInvoiceNumber()}.pdf`
  return (
    <div className={'download-pdf '}>
      <PDFDownloadLink
        key="pdf"
        document={<InvoicePage pdfMode={true} data={debounced} />}
        fileName={fileName}
        aria-label="Save PDF"
        title="Save PDF"
        className="download-pdf__pdf"
      ></PDFDownloadLink>
      <p>Save PDF</p>

      <button
        type="button"
        onClick={handleSaveTemplate}
        aria-label="Save Template"
        title="Save Template"
        className="download-pdf__template_download mt-40"
      />
      <p className="text-small">Save Template</p>

      <label className="download-pdf__template_upload">
        <input
          type="file"
          accept=".json,.template"
          onChange={handleInput}
          title="Upload Template File"
          aria-label="Upload Template File"
        />
      </label>
      <p className="text-small">Upload Template</p>
    </div>
  )
}

export default Download
