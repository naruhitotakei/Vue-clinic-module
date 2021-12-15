import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
import Layout1 from '../layouts/Layout1'
import AuthLayout1 from '../layouts/AuthLayouts/AuthLayout1'
/* Home */
import Home from '../views/Home/Home'
/* Call Center Dashboard */
import CallCenterDashboard from '../views/CallCenterDashboard/CallCenterDashboard'
/* Calendar */
import Calendar from '../views/Calendars/Calendar'
/* Appointments */
import Appointments from '../views/Appointments/Appointments'
/* Patients */
import Patients from '../views/Patients/Patients'
import ViewPatient from '../views/Patients/ViewPatient'
/* Documents */
import AdvPayments from '../views/Documents/AdvPayments'
import Invoice from '../views/Documents/Invoice'
import AdvPayment from '../views/Documents/AdvPayment'
import Invoices from '../views/Documents/Invoices'
import NewInvoice from '../views/Documents/NewInvoice'
import NewAdvPayment from '../views/Documents/NewAdvPayment'
import Offers from '../views/Documents/Offers'
/* Assignments */
import Assignments from '../views/Assignments/Assignments'
/* Statistics */
import ClinicStatistics from '../views/Statistics/ClinicStatistics'
import PersonalStatistics from '../views/Statistics/PersonalStatistics'
/* Reporting */
import Emazing from '../views/Reporting/Emazing'
import TaxAuthority from '../views/Reporting/TaxAuthority'
import Doctor from '../views/Reporting/Doctor'
/* Call Center */
import Leads from '../views/CallCenter/Leads'
import ClientInfo from '../views/CallCenter/ClientInfo'
import KPIs from '../views/CallCenter/KPIs'
import WorkReport from '../views/CallCenter/WorkReport'
import ActivityReport from '../views/CallCenter/ActivityReport'
import MissingServices from '../views/CallCenter/MissingServices'
/* Settings */
import Invoicing from '../views/Settings/Invoicing'
import Locations from '../views/Settings/Locations'
import ServicesAndProducts from '../views/Settings/ServicesAndProducts'
import BusinessCustomers from '../views/Settings/BusinessCustomers'
import Users from '../views/Settings/Users'
import FreeSlots from '../views/Settings/FreeSlots'
import SMSTemplates from '../views/Settings/SMSTemplates'
import MailTemplates from '../views/Settings/MailTemplates'
import Advertising from '../views/Settings/Advertising'
import Labels from '../views/Settings/Labels'
import OnlineBooking from '../views/Settings/OnlineBooking'
/* Authentic View */
import SignIn from '../views/Auth/Pages/SignIn'
import SignUp from '../views/Auth/Pages/SignUp'
import RecoverPassword from '../views/Auth/Pages/RecoverPassword'
import LockScreen from '../views/Auth/Pages/LockScreen'
import ConfirmMail from '../views/Auth/Pages/ConfirmMail'
/* Booking */
import OnlineBookingPublic from '../views/Booking/OnlineBooking'

Vue.use(VueRouter)

const authChildRoutes = (prop, mode = false) => [
  {
    path: 'sign-in',
    name: prop + '.sign-in',
    meta: { dark: mode, auth: true },
    component: SignIn
  },
  {
    path: 'sign-up',
    name: prop + '.sign-up',
    meta: { dark: mode, auth: true },
    component: SignUp
  },
  {
    path: 'password-reset',
    name: prop + '.password-reset',
    meta: { dark: mode, auth: true },
    component: RecoverPassword
  },
  {
    path: 'lock-screen',
    name: prop + '.lock-screen',
    meta: { dark: mode, auth: true },
    component: LockScreen
  },
  {
    path: 'confirm-mail',
    name: prop + '.confirm-mail',
    meta: { dark: mode, auth: true },
    component: ConfirmMail
  }
]

const childRoutes = (prop, mode) => [
  {
    path: '/',
    name: prop + '.home',
    meta: { dark: mode, auth: true, name: 'Home' },
    component: Home
  },
  {
    path: 'call-center-dashboard',
    name: prop + '.call-center-dashboard',
    meta: { dark: mode, auth: true, name: 'Call Center Dashboard' },
    component: CallCenterDashboard
  },
  {
    path: 'calendar',
    name: prop + '.calendar',
    meta: { dark: mode, auth: true, name: 'Calendar' },
    component: Calendar
  },
  {
    path: 'appointments',
    name: prop + '.appointments',
    meta: { dark: mode, auth: true, name: 'Appointments' },
    component: Appointments
  },
  {
    path: 'patients',
    name: prop + '.patients',
    meta: { dark: mode, auth: true, name: 'Editable' },
    component: Patients
  },
  {
    path: 'assignments',
    name: prop + '.assignments',
    meta: { dark: mode, auth: true, name: 'assignments' },
    component: Assignments
  },
  {
    path: 'online-booking/:clientId/:locationId',
    name: prop + '.online-booking',
    meta: { dark: mode, auth: true, name: 'online-booking' },
    component: OnlineBookingPublic
  }
]
const documentChildRoute = (prop, mode) => [
  {
    path: 'invoices',
    name: prop + '.invoices',
    meta: { dark: mode, auth: true, name: 'Invoices' },
    component: Invoices
  },
  {
    path: 'invoices/:invoiceId',
    name: prop + '.invoiceId',
    meta: { dark: mode, auth: true, name: 'Invoice' },
    component: Invoice
  },
  {
    path: 'invoices/:invoiceId/draft/patient/:patientId',
    name: prop + '.draftInvoice',
    meta: { dark: mode, auth: true, name: 'Invoice' },
    props: true,
    component: NewInvoice
  },
  {
    path: 'invoices/:patientId/new-invoice',
    name: prop + '.newInvoice',
    meta: { dark: mode, auth: true, name: 'Invoice' },
    component: NewInvoice
  },
  {
    path: 'advance-payments',
    name: prop + '.advance-payments',
    meta: { dark: mode, auth: true, name: 'Advance Payments' },
    component: AdvPayments
  },
  {
    path: 'advance-payments/:advPaymentId',
    name: prop + '.advance-payments',
    meta: { dark: mode, auth: true, name: 'Advance Payments' },
    component: AdvPayment
  },
  {
    path: 'advance-payments/:patientId/new-adv-payment',
    name: prop + '.new-adv-payment',
    meta: { dark: mode, auth: true, name: 'Advance Payments' },
    component: NewAdvPayment
  },
  {
    path: 'offers',
    name: prop + '.offers',
    meta: { dark: mode, auth: true, name: 'Offers' },
    component: Offers
  }
]
const patientChildRoute = (prop, mode) => [
  {
    path: ':patientId',
    name: prop + '.patientId',
    meta: { dark: mode, auth: true, name: 'ViewPatient' },
    component: ViewPatient
  }
]

const statisticsChildRoute = (prop, mode = false) => [
  {
    path: 'statistics-for-clinic',
    name: prop + '.statistics-for-clinic',
    meta: { dark: mode, auth: true, name: 'Statistics for Clinic' },
    component: ClinicStatistics
  },
  {
    path: 'personal-statistics',
    name: prop + '.personal-statistics',
    meta: { dark: mode, auth: true, name: 'Personal Statistics' },
    component: PersonalStatistics
  }
]

const reportingChildRoute = (prop, mode = false) => [
  {
    path: 'emazing',
    name: prop + '.emazing',
    meta: { dark: mode, auth: true, name: 'Emazing' },
    component: Emazing
  },
  {
    path: 'doctor',
    name: prop + '.doctor',
    meta: { dark: mode, auth: true, name: 'Doctor' },
    component: Doctor
  },
  {
    path: 'tax-authority',
    name: prop + '.tax-authority',
    meta: { dark: mode, auth: true, name: 'Tax Authority' },
    component: TaxAuthority
  }
]

const callCenterChildRoute = (prop, mode = false) => [
  {
    path: 'leads',
    name: prop + '.leads',
    meta: { dark: mode, auth: true, name: 'Leads' },
    component: Leads
  },
  {
    path: 'client-info',
    name: prop + '.client-info',
    meta: { dark: mode, auth: true, name: 'Client Info' },
    component: ClientInfo
  },
  {
    path: 'KPIs',
    name: prop + '.KPIs',
    meta: { dark: mode, auth: true, name: 'KPIs' },
    component: KPIs
  },
  {
    path: 'work-report',
    name: prop + '.work-report',
    meta: { dark: mode, auth: true, name: 'Work Report' },
    component: WorkReport
  },
  {
    path: 'activity-report',
    name: prop + '.activity-report',
    meta: { dark: mode, auth: true, name: 'Activity Report' },
    component: ActivityReport
  },
  {
    path: 'missing-services',
    name: prop + '.missing-services',
    meta: { dark: mode, auth: true, name: 'Missing Services' },
    component: MissingServices
  }
]

const settingsChildRoute = (prop, mode = false) => [
  {
    path: 'users',
    name: prop + '.users',
    meta: { dark: mode, auth: true, name: 'Users' },
    component: Users
  },
  {
    path: 'locations',
    name: prop + '.locations',
    meta: { dark: mode, auth: true, name: 'Locations' },
    component: Locations
  },
  {
    path: 'services-and-products',
    name: prop + '.services-and-products',
    meta: { dark: mode, auth: true, name: 'Services And Products' },
    component: ServicesAndProducts
  },
  {
    path: 'invoicing',
    name: prop + '.invoicing',
    meta: { dark: mode, auth: true, name: 'Invoicing' },
    component: Invoicing
  },
  {
    path: 'business-customers',
    name: prop + '.business-customers',
    meta: { dark: mode, auth: true, name: 'Business Customers' },
    component: BusinessCustomers
  },
  {
    path: 'free-slots',
    name: prop + '.free-slots',
    meta: { dark: mode, auth: true, name: 'Free Slots' },
    component: FreeSlots
  },
  {
    path: 'sms-templates',
    name: prop + '.sms-templates',
    meta: { dark: mode, auth: true, name: 'SMS Templates' },
    component: SMSTemplates
  },
  {
    path: 'mail-templates',
    name: prop + '.mail-templates',
    meta: { dark: mode, auth: true, name: 'Mail Templates' },
    component: MailTemplates
  },
  {
    path: 'advertising',
    name: prop + '.advertising',
    meta: { dark: mode, auth: true, name: 'Advertising' },
    component: Advertising
  },
  {
    path: 'labels',
    name: prop + '.labels',
    meta: { dark: mode, auth: true, name: 'Labels' },
    component: Labels
  },
  {
    path: 'online-booking',
    name: prop + '.online-booking',
    meta: { dark: mode, auth: true, name: 'Online Booking' },
    component: OnlineBooking
  }
]

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout1,
    meta: { auth: true },
    children: childRoutes('dashboard')
  },
  {
    path: '/documents',
    name: 'documents',
    component: Layout1,
    meta: { auth: true },
    children: documentChildRoute('documents')
  },
  {
    path: '/patients',
    name: 'patients',
    component: Layout1,
    meta: { auth: true },
    children: patientChildRoute('patients')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Layout1,
    meta: { auth: true },
    children: statisticsChildRoute('statistics')
  },
  {
    path: '/reporting',
    name: 'reporting',
    component: Layout1,
    meta: { auth: true },
    children: reportingChildRoute('reporting')
  },
  {
    path: '/call-center',
    name: 'call-center',
    component: Layout1,
    meta: { auth: true },
    children: callCenterChildRoute('call-center')
  },
  {
    path: '/settings',
    name: 'settings',
    component: Layout1,
    meta: { auth: true },
    children: settingsChildRoute('settings')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout1,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/public',
    name: 'public',
    component: OnlineBookingPublic,
    meta: { auth: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
