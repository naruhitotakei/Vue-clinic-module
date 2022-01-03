export async function getInvoices() {
  const rawResponse = await fetch('/api/invoices', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getInvoiceById(id) {
  const rawResponse = await fetch('/api/invoices/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getConsecutiveInvoiceNumberForCompany(id) {
  const rawResponse = await fetch('/api/invoices/company/' + id + '/consecutive-number/', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getItemsOfInvoiceById(id) {
  const rawResponse = await fetch('/api/invoices/' + id + '/items', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getEnquiryToothByInvoiceItemsId(id) {
  const rawResponse = await fetch('/api/invoices/items/' + id + '/enquiry-tooth', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getPaymentItemsOfInvoiceById(id) {
  const rawResponse = await fetch('/api/invoices/' + id + '/payment-items', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function createInvoice(invoice) {
  const rawResponse = await fetch('/api/invoices', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoice),
  })
  return rawResponse.json()
}

export async function getSerialForInvoiceNumberBasedOnType(data) {
  const rawResponse = await fetch('/api/invoices/serial-number', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return rawResponse.json()
}

export async function getSerialForFursInvoiceNumberBasedOnType(data) {
  const rawResponse = await fetch('/api/invoices/furs-serial-number', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return rawResponse.json()
}

export async function deleteInvoice(id) {
  const rawResponse = await fetch('/api/invoices/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function updateInvoice(id, invoice) {
  const rawResponse = await fetch('/api/invoices/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoice),
  })
  return rawResponse.json()
}
