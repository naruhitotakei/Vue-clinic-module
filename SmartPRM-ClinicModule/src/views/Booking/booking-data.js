export const consultation = [
  {
    name: 'consultation 1',
    duration: '10min',
    price: '$30'
  },
  {
    name: 'consultation 2',
    duration: '20min',
    price: '$50'
  },
  {
    name: 'consultation 3',
    duration: '30min',
    price: '$70'
  }
]

export const services = [
  {
    service: 'teeth withening'
  },
  {
    service: 'teeth withening 2'
  },
  {
    service: 'other service'
  }
]

export const team = [
  {
    firstName: 'John',
    secondName: 'Smith',
    avatar: ''
  },
  {
    firstName: 'Angel',
    secondName: 'Chack',
    avatar: ''
  }
]

export const serviceData = [
  {
    consultation: [
      {
        name: 'consultation 1',
        duration: '10min',
        price: '$30'
      },
      {
        name: 'consultation 2',
        duration: '20min',
        price: '$50'
      },
      {
        name: 'consultation 3',
        duration: '30min',
        price: '$70'
      }
    ],
    itemName: 'Consultation'
  },
  {
    services: [
      {
        service: 'teeth withening'
      },
      {
        service: 'teeth withening 2'
      },
      {
        service: 'other service'
      }
    ],
    itemName: 'Services'
  }
]

export const servicesList = [
  {
    title: 'Consultations',
    list: [
      { id: 1, serviceName: 'Consultation 1', time: '20 minutes', price: 30, section: 'Consultation' },
      { id: 2, serviceName: 'Consultation 2', time: '20 minutes', price: 50, section: 'Consultation' },
      { id: 3, serviceName: 'Consultation 3', time: '20 minutes', price: 70, section: 'Consultation' },
      { id: 4, serviceName: 'Consultation 4', time: '20 minutes', price: 100, section: 'Consultation' }
    ]
  },
  {
    title: 'Teeth Withening',
    list: [
      { id: 5, serviceName: 'Teeth Withening 1', time: '40 minutes', price: 30, section: 'Teeth Withening' },
      { id: 6, serviceName: 'Teeth Withening 2', time: '40 minutes', price: 50, section: 'Teeth Withening' },
      { id: 7, serviceName: 'Teeth Withening 3', time: '40 minutes', price: 70, section: 'Teeth Withening' },
      { id: 8, serviceName: 'Teeth Withening 4', time: '40 minutes', price: 100, section: 'Teeth Withening' }
    ]
  }
]

export const dailySchedule = [
  '7:00',
  '7:30',
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30'
]

export const allDoctors = [
  { name: 'Dr. Bojan Jernejc', img: require('../../assets/images/user/01.jpg'), degree: 'MBBS, MD' },
  { name: 'Dr. Silvija Lenart', img: require('../../assets/images/user/02.jpg'), degree: 'MD' },
  { name: 'Dr. Irma Medved', img: require('../../assets/images/user/03.jpg'), degree: 'MBBS' },
  { name: 'Dr. Petra Maver', img: require('../../assets/images/user/04.jpg'), degree: 'MBBS, MD' },
  { name: 'Dr. Damjan Ahlin', img: require('../../assets/images/user/05.jpg'), degree: 'BAMS' },
  { name: 'Dr. Martin Sever', img: require('../../assets/images/user/06.jpg'), degree: 'MS, MD' },
  { name: 'Dr. Tanja Perme', img: require('../../assets/images/user/07.jpg'), degree: 'MBBS, MD' },
  { name: 'Dr. Matic Erjavec', img: require('../../assets/images/user/08.jpg'), degree: 'MD' },
  { name: 'Dr. Peter Berlot', img: require('../../assets/images/user/09.jpg'), degree: 'MBBS' },
  { name: 'Dr. Sebastjan Bras', img: require('../../assets/images/user/10.jpg'), degree: 'MBBS, MD' }
]

export const daysScedule = [
  { name: 'Dr. Bojan Jernejc', img: require('../../assets/images/user/01.jpg'), degree: 'MBBS, MD', busyTimes: ['7:30', '10:30', '11:00'] },
  { name: 'Dr. Silvija Lenart', img: require('../../assets/images/user/02.jpg'), degree: 'MD', busyTimes: ['10:30', '17:30', '18:00'] },
  { name: 'Dr. Irma Medved', img: require('../../assets/images/user/03.jpg'), degree: 'MBBS', busyTimes: ['12:00', '15:30', '16:00', '20:00'] },
  { name: 'Dr. Petra Maver', img: require('../../assets/images/user/04.jpg'), degree: 'MBBS, MD', busyTimes: ['8:00', '8:30', '9:00', '9:30, 11:00'] },
  { name: 'Dr. Damjan Ahlin', img: require('../../assets/images/user/05.jpg'), degree: 'BAMS', busyTimes: [] },
  { name: 'Dr. Martin Sever', img: require('../../assets/images/user/06.jpg'), degree: 'MS, MD', busyTimes: ['11:30', '12:30', '13:00', '14:30, 15:00'] },
  { name: 'Dr. Tanja Perme', img: require('../../assets/images/user/07.jpg'), degree: 'MBBS, MD', busyTimes: ['8:00', '12:30', '17:00', '18:30, 19:00'] },
  { name: 'Dr. Matic Erjavec', img: require('../../assets/images/user/08.jpg'), degree: 'MD', busyTimes: ['7:00', '7:30', '8:00', '8:30, 9:00'] },
  { name: 'Dr. Peter Berlot', img: require('../../assets/images/user/09.jpg'), degree: 'MBBS', busyTimes: ['10:00', '12:30', '13:00', '13:30, 14:00'] },
  { name: 'Dr. Sebastjan Bras', img: require('../../assets/images/user/10.jpg'), degree: 'MBBS, MD', busyTimes: ['15:00', '15:30', '16:00', '16:30, 17:00'] }
]
