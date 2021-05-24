import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
import Layout1 from '../layouts/Layout1'
import AuthLayout1 from '../layouts/AuthLayouts/AuthLayout1'
/* Calendar */
import Calendar from '../views/Calendars/Calendar'
/* Home */
import Home from '../views/Home/Home'
/* Assignments */
import Assignments from '../views/Assignments/Assignments'
import AdvPayments from '../views/Documents/AdvPayments'
import Invoice from '../views/Documents/Invoice'
import AdvPayment from '../views/Documents/AdvPayment'
import Invoices from '../views/Documents/Invoices'
import NewInvoice from '../views/Documents/NewInvoice'
import NewAdvPayment from '../views/Documents/NewAdvPayment'
import Offers from '../views/Documents/Offers'
/* Documents */
import Patients from '../views/Patients/Patients'
/* Patients */
import ViewPatient from '../views/Patients/ViewPatient'
/* Extra Pages */
import Doctor from '../views/Reporting/Doctor'
/* Reporting */
import Emazing from '../views/Reporting/Emazing'
import TaxAuthority from '../views/Reporting/TaxAuthority'
import Invoicing from '../views/Settings/Invoicing'
import Locations from '../views/Settings/Locations'
import ServicesAndProducts from '../views/Settings/ServicesAndProducts'
/* Settings */
import Users from '../views/Settings/Users'
/* Statistics */
import ClinicStatistics from '../views/Statistics/ClinicStatistics'
import PersonalStatistics from '../views/Statistics/PersonalStatistics'
/* Authentic View */
import SignIn from '../views/Auth/Pages/SignIn'
import SignUp from '../views/Auth/Pages/SignUp'
import RecoverPassword from '../views/Auth/Pages/RecoverPassword'
import LockScreen from '../views/Auth/Pages/LockScreen'
import ConfirmMail from '../views/Auth/Pages/ConfirmMail'

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
    path: 'calendar',
    name: prop + '.calendar',
    meta: { dark: mode, auth: true, name: 'Calendar' },
    component: Calendar
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

const settingsChildRoute = (prop, mode = false) => [
  {
    path: 'users',
    name: prop + '.users',
    meta: { darke: mode, auth: true, name: 'Users' },
    component: Users
  },
  {
    path: 'locations',
    name: prop + '.locations',
    meta: { darke: mode, auth: true, name: 'Locations' },
    component: Locations
  },
  {
    path: 'services-and-products',
    name: prop + '.services-and-products',
    meta: { darke: mode, auth: true, name: 'Services And Products' },
    component: ServicesAndProducts
  },
  {
    path: 'invoicing',
    name: prop + '.invoicing',
    meta: { darke: mode, auth: true, name: 'Invoicing' },
    component: Invoicing
  }
]

const defaultlayout = (prop, mode = false) => [
  {
    path: 'new-invoice',
    name: prop + '.new-invoice',
    meta: { dark: mode, auth: true, name: 'New Invoice' },
    component: NewInvoice
  },
  {
    path: 'new-adv-payment',
    name: prop + '.new-adv-payment',
    meta: { dark: mode, auth: true, name: 'New Adv Payment' },
    component: NewAdvPayment
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
    path: '/settings',
    name: 'settings',
    component: Layout1,
    meta: { auth: true },
    children: settingsChildRoute('settings')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: Layout1,
    meta: { auth: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout1,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
