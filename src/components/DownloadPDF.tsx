import React, { FC, useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice, TInvoice } from '../data/types'
import InvoicePage from './InvoicePage'
import FileSaver from 'file-saver'

interface Props {
  data: Invoice
  setData(data: Invoice): void
}

const Download: FC<Props> = ({ data, setData }) => {
  // Create a state to track changes to the invoice data
  const [invoiceData, setInvoiceData] = useState<Invoice>(data)
  const [key, setKey] = useState<number>(0)

  // Update the local state whenever the parent data changes
  useEffect(() => {
    setInvoiceData(data)
    // Increment the key to force re-render of the PDFDownloadLink
    setKey((prevKey) => prevKey + 1)
  }, [data])

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
  const getInvoiceNumber = () => (invoiceData.invoiceTitle ? invoiceData.invoiceTitle : 'invoice')

  function handleSaveTemplate() {
    const blob = new Blob([JSON.stringify(invoiceData)], {
      type: 'text/plain;charset=utf-8',
    })
    FileSaver(blob, `Invoice-${getInvoiceNumber()}.template`)
  }

  const fileName = `Invoice-${getInvoiceNumber()}.pdf`
  return (
    <div className={'download-pdf '}>
      <PDFDownloadLink
        key={`pdf-${key}`}
        document={<InvoicePage pdfMode={true} data={invoiceData} />}
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
