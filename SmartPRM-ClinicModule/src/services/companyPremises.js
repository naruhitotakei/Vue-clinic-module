export async function getCompanyPremises () {
  const rawResponse = await fetch('/api/company-premises', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
