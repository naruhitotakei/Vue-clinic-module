export async function getOnlineBookingProducts (locale) {
  const rawResponse = await fetch('/api/online-booking-products/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
