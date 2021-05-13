// doctorUserIdList == null - all doctors according to role
export async function getApontments (startdate, endate, doctorUserIdList) {
  const rawResponse = await fetch('/api/calendar/' + startdate + '/' + endate + (id==null? '' : ('?doc=' + doctorUserIdList.toString()) ), {
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