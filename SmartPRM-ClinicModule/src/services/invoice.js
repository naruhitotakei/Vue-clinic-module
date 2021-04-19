export async function getInvoices () {
  const rawResponse = await fetch('/api/invoices', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getInvoiceById (id) {
  const rawResponse = await fetch('/api/invoices/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

// invoice syntax
// all elements are optionall
// {
//   name: 'ime',
//   phone, 'tel',
//   email, 'email',
//   client_id: 23,
//   gender: 'female',
//   last_name: 'priimek',
//   lead_owner_id: 0
// }
export async function createInvoice (invoice) {
  const rawResponse = await fetch('/api/invoices/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  })
  return rawResponse.json()
}

export async function updateInvoice (id, invoice) {
  const rawResponse = await fetch('/api/invoices/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoice)
  })
  return rawResponse.json()
}

export async function deleteInvoice (id) {
  const rawResponse = await fetch('/api/invoices/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
