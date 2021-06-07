// doctorUserIdList == null - all doctors according to role
export async function getApontments (startdate, endate, doctorUserIdList) {
  var url = '/api/calendar/' + startdate + '/' + endate
  if (doctorUserIdList && doctorUserIdList.length > 0) {
    url += encodeURI(JSON.stringify(doctorUserIdList))
  }
  const rawResponse = await fetch(url, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getDoctorList () {
  const rawResponse = await fetch('/api/calendar/doctors', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}
