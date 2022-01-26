export async function getSmsTemplates(sort) {
  const rawResponse = await fetch('/api/sms-templates', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getSmsTemplate(id) {
  const rawResponse = await fetch('/api/sms-template/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function updateSmsTemplate(smsTemplateData) {
  const rawResponse = await fetch('/api/sms-template/update', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(smsTemplateData),
  })
  return rawResponse.json()
}
