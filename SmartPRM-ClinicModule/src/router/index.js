import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
import Layout1 from '../layouts/Layout1'
import AuthLayout1 from '../layouts/AuthLayouts/AuthLayout1'
/* Dashboards View */
import Dashboard1 from '../views/Dashboards/Dashboard1.vue'
import Dashboard3 from '../views/Dashboards/Dashboard3'
import Dashboard4 from '../views/Dashboards/Dashboard4'
/* UIElements View */
import UiAlerts from '../views/core/UiAlerts.vue'
import UiButtons from '../views/core/UiButtons.vue'
import UiBadges from '../views/core/UiBadges.vue'
import UiBreadcrumb from '../views/core/UiBreadcrumb.vue'
import UiColors from '../views/core/UiColors.vue'
import UiTypography from '../views/core/UiTypography.vue'
import UiCards from '../views/core/UiCards.vue'
import UiCarousel from '../views/core/UiCarousel.vue'
import UiEmbedVideo from '../views/core/UiEmbedVideo.vue'
import UiGrid from '../views/core/UiGrid.vue'
import UiModal from '../views/core/UiModal.vue'
import UiListGroup from '../views/core/UiListGroup.vue'
import UiImages from '../views/core/UiImages.vue'
import UiMediaObject from '../views/core/UiMediaObject.vue'
import UiTooltips from '../views/core/UiTooltips.vue'
import UiPopovers from '../views/core/UiPopovers.vue'
import UiNotifications from '../views/core/UiNotifications.vue'
import UiTabs from '../views/core/UiTabs.vue'
import UiPagination from '../views/core/UiPagination.vue'
import UiProgressBars from '../views/core/UiProgressBars.vue'
/* Authentic View */
import SignIn1 from '../views/AuthPages/Default/SignIn1'
import SignUp1 from '../views/AuthPages/Default/SignUp1'
import RecoverPassword1 from '../views/AuthPages/Default/RecoverPassword1'
import LockScreen1 from '../views/AuthPages/Default/LockScreen1'
import ConfirmMail1 from '../views/AuthPages/Default/ConfirmMail1'
/* Extra Pages */
import InvoiceExample from '../views/Pages/InvoiceExample'
import OfferExample from '../views/Pages/OfferExample'
import AdvancePaymentExample from '../views/Pages/AdvancePaymentExample'
import NewInvoice from '../views/Pages/NewInvoice'
/* Patients */
import ViewPatient from '../views/User/ViewPatient'
/* Apps Views */
import EmailListing from '../views/Apps/Email/EmailListing'
import EmailCompose from '../views/Apps/Email/EmailCompose'
import Calendar from '../views/Apps/Calendar/Calendar'
import ChatIndex from '../views/Apps/Chat/Index'
/* Icon Views */
import IconDripicons from '../views/Icons/IconDripicons'
import IconFontawesome5 from '../views/Icons/IconFontawesome5'
import IconLineAwesome from '../views/Icons/IconLineAwesome'
import IconRemixicon from '../views/Icons/IconRemixicon'
import IconUnicons from '../views/Icons/IconUnicons'
/* Tables Views */
import TablesBasic from '../views/Tables/TablesBasic'
import DataTable from '../views/Tables/DataTable'
import EditableTable from '../views/Tables/EditableTable'
import ApexCharts from '../views/Charts/ApexCharts'
import AmCharts from '../views/Charts/AmCharts'
import MorrisCharts from '../views/Charts/MorrisCharts'
import HighCharts from '../views/Charts/HighCharts'
/* Form View */
import FormLayout from '../views/Forms/FormLayout'
import FormValidates from '../views/Forms/FormValidates'
import FormSwitches from '../views/Forms/FormSwitches'
import FormRadios from '../views/Forms/FormRadios'
import FormCheckboxes from '../views/Forms/FormCheckboxes'
/* User View */
import Profile from '../views/User/Profile'
import ProfileEdit from '../views/User/ProfileEdit'
import AddUser from '../views/User/AddUser'
/* Todo */
import Callback from '../views/AuthPages/Default/Callback'
/* Plugins Views */
import DatepickerDemo from '../views/Plugins/DatepickerDemo'
/* Documents */
import Offers from '../views/Documents/Offers'
import Invoices from '../views/Documents/Invoices'
import AdvInvoices from '../views/Documents/AdvPayments'
/* Assignments */
import Assignments from '../views/Assignments/Assignments'
/* Reporting */
import Emazing from '../views/Reporting/Emazing'
import Doctor from '../views/Reporting/Doctor'
import TaxAuthority from '../views/Reporting/TaxAuthority'
/* Settings */
import Users from '../views/Settings/Users'
import Locations from '../views/Settings/Locations'
import ServicesAndProducts from '../views/Settings/ServicesAndProducts'
import Invoicing from '../views/Settings/Invoicing'
/* Statistics */
import PersonalStatistics from '../views/Statistics/PersonalStatistics.vue'
Vue.use(VueRouter)

const childRoutes = (prop, mode) => [
  {
    path: '/',
    name: prop + '.home',
    meta: { dark: mode, auth: true, name: 'Home' },
    component: Dashboard4
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
    component: EditableTable
  },
  {
    path: 'assignments',
    name: prop + '.assignments',
    meta: { dark: mode, auth: true, name: 'assignments' },
    component: Assignments
  },
  // {
  //   path: 'home-2',
  //   name: prop + '.home-2',
  //   meta: { dark: mode, auth: true, name: 'Home 2' },
  //   component: Dashboard2
  // },
  {
    path: 'home-3',
    name: prop + '.home-3',
    meta: { dark: mode, auth: true, name: 'Home 3' },
    component: Dashboard3
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
    path: 'advance-payments',
    name: prop + '.advance-payments',
    meta: { dark: mode, auth: true, name: 'Advance Payments' },
    component: AdvInvoices
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
    path: 'viewpatient',
    name: prop + '.viewpatient',
    meta: { dark: mode, auth: true, name: 'ViewPatient' },
    component: ViewPatient
  }
]
const coreChildRoute = (prop, mode) => [
  {
    path: 'ui-colors',
    name: prop + '.color',
    meta: { dark: mode, auth: true, name: 'Colors' },
    component: UiColors
  },
  {
    path: 'ui-typography',
    name: prop + '.typography',
    meta: { dark: mode, auth: true, name: 'Typography' },
    component: UiTypography
  },
  {
    path: 'ui-alerts',
    name: prop + '.alert',
    meta: { dark: mode, auth: true, name: 'Alert' },
    component: UiAlerts
  },
  {
    path: 'ui-buttons',
    name: prop + '.button',
    meta: { dark: mode, auth: true, name: 'Button' },
    component: UiButtons
  },
  {
    path: 'ui-breadcrumb',
    name: prop + '.breadcrumb',
    meta: { dark: mode, auth: true, name: 'Breadcrumb' },
    component: UiBreadcrumb
  },
  {
    path: 'ui-badges',
    name: prop + '.badges',
    meta: { dark: mode, auth: true, name: 'Badges' },
    component: UiBadges
  },
  {
    path: 'ui-cards',
    name: prop + '.cards',
    meta: { dark: mode, auth: true, name: 'Card' },
    component: UiCards
  },
  {
    path: 'ui-carousel',
    name: prop + '.carousel',
    meta: { dark: mode, auth: true, name: 'Carousel' },
    component: UiCarousel
  },
  {
    path: 'ui-grid',
    name: prop + '.grid',
    meta: { dark: mode, auth: true, name: 'Grid' },
    component: UiGrid
  },
  {
    path: 'ui-embed-video',
    name: prop + '.embed-video',
    meta: { dark: mode, auth: true, name: 'Embed Video' },
    component: UiEmbedVideo
  },
  {
    path: 'ui-modal',
    name: prop + '.modal',
    meta: { dark: mode, auth: true, name: 'Model' },
    component: UiModal
  },
  {
    path: 'ui-listgroup',
    name: prop + '.listgroup',
    meta: { dark: mode, auth: true, name: 'List Group' },
    component: UiListGroup
  },
  {
    path: 'ui-images',
    name: prop + '.images',
    meta: { dark: mode, auth: true, name: 'Image' },
    component: UiImages
  },
  {
    path: 'ui-media-object',
    name: prop + '.media-object',
    meta: { dark: mode, auth: true, name: 'Media Object' },
    component: UiMediaObject
  },
  {
    path: 'ui-pagination',
    name: prop + '.pagination',
    meta: { dark: mode, auth: true, name: 'Paginations' },
    component: UiPagination
  },
  {
    path: 'ui-progressbars',
    name: prop + '.progressbars',
    meta: { dark: mode, auth: true, name: 'Progressbar' },
    component: UiProgressBars
  },
  {
    path: 'ui-tooltips',
    name: prop + '.tooltips',
    meta: { dark: mode, auth: true, name: 'Tooltip' },
    component: UiTooltips
  },
  {
    path: 'ui-popovers',
    name: prop + '.popovers',
    meta: { dark: mode, auth: true, name: 'Popover' },
    component: UiPopovers
  },
  {
    path: 'ui-notifications',
    name: prop + '.notifications',
    meta: { dark: mode, auth: true, name: 'Notification' },
    component: UiNotifications
  },
  {
    path: 'ui-tabs',
    name: prop + '.tabs',
    meta: { dark: mode, auth: true, name: 'Tabs' },
    component: UiTabs
  }
]
const formChildRoute = (prop, mode = false) => [
  {
    path: 'form-layout',
    name: prop + '.layout',
    meta: { dark: mode, auth: true, name: 'Layout' },
    component: FormLayout
  },
  {
    path: 'form-validate',
    name: prop + '.validate',
    meta: { dark: mode, auth: true, name: 'Validate' },
    component: FormValidates
  },
  {
    path: 'form-switches',
    name: prop + '.switch',
    meta: { dark: mode, auth: true, name: 'Switch' },
    component: FormSwitches
  },
  {
    path: 'form-radios',
    name: prop + '.radio',
    meta: { dark: mode, auth: true, name: 'Radio' },
    component: FormRadios
  },
  {
    path: 'form-checkboxes',
    name: prop + '.checkbox',
    meta: { dark: mode, auth: true, name: 'Checkbox' },
    component: FormCheckboxes
  }
]
const tableChildRoute = (prop, mode = false) => [
  {
    path: 'tables-basic',
    name: prop + '.basic',
    meta: { dark: mode, auth: true, name: 'Basic' },
    component: TablesBasic
  },
  {
    path: 'data-table',
    name: prop + '.dataTable',
    meta: { dark: mode, auth: true, name: 'Datatable' },
    component: DataTable
  }
  // {
  //   path: 'editable',
  //   name: prop + '.editable',
  //   meta: { dark: mode, auth: true, name: 'Editable' },
  //   component: EditableTable
  // }
]

const statisticsChildRoute = (prop, mode = false) => [
  {
    path: 'statistics-for-clinic',
    name: prop + '.statistics-for-clinic',
    meta: { dark: mode, auth: true, name: 'Statistics for Clinic' },
    component: Dashboard1
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

const iconChildRoute = (prop, mode = false) => [
  {
    path: 'dripicons',
    name: prop + '.dripicons',
    meta: { dark: mode, auth: true, name: 'Dripicons' },
    component: IconDripicons
  },
  {
    path: 'fontawesome-5',
    name: prop + '.fontawesome-5',
    meta: { dark: mode, auth: true, name: 'Font Awsome' },
    component: IconFontawesome5
  },
  {
    path: 'lineawesome',
    name: prop + '.lineawesome',
    meta: { dark: mode, auth: true, name: 'Line Awsome' },
    component: IconLineAwesome
  },
  {
    path: 'remixicon',
    name: prop + '.remixicon',
    meta: { dark: mode, auth: true, name: 'Remixicon' },
    component: IconRemixicon
  },
  {
    path: 'unicons',
    name: prop + '.unicons',
    meta: { dark: mode, auth: true, name: 'Unicon' },
    component: IconUnicons
  }
]

const chartChildRoutes = (prop, mode = false) => [
  {
    path: 'apex-charts',
    name: prop + '.apex',
    meta: { dark: mode, auth: true, name: 'Apex Chat' },
    component: ApexCharts
  },
  {
    path: 'am-charts',
    name: prop + '.am',
    meta: { dark: mode, auth: true, name: 'Am Chart' },
    component: AmCharts
  },
  {
    path: 'high-charts',
    name: prop + '.high',
    meta: { dark: mode, auth: true, name: 'High Chart' },
    component: HighCharts
  },
  {
    path: 'morris-charts',
    name: prop + '.morris',
    meta: { dark: mode, auth: true, name: 'Mirris Chart' },
    component: MorrisCharts
  }
]

const appChildRoute = (prop, mode = false) => [
  // {
  //   path: 'calendar',
  //   name: prop + '.calendar',
  //   meta: { dark: mode, auth: true, name: 'Calendar' },
  //   component: Calendar
  // },
  {
    path: 'chat',
    name: prop + '.chat',
    meta: { dark: mode, auth: true, name: 'Chat' },
    component: ChatIndex
  },
  {
    path: 'email',
    name: prop + '.email',
    meta: { dark: mode, auth: true, name: 'Email' },
    component: EmailListing
  },
  {
    path: 'email-compose',
    name: prop + '.email.compose',
    meta: { dark: mode, auth: true, name: 'New Email' },
    component: EmailCompose
  }
]

const authChildRoutes = (prop, mode = false) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { dark: mode, auth: true },
    component: SignIn1
  },
  {
    path: 'sign-up1',
    name: prop + '.sign-up1',
    meta: { dark: mode, auth: true },
    component: SignUp1
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { dark: mode, auth: true },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { dark: mode, auth: true },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { dark: mode, auth: true },
    component: ConfirmMail1
  }
]

const defaultlayout = (prop, mode = false) => [
  {
    path: 'invoice-example',
    name: prop + '.invoice-example',
    meta: { dark: mode, auth: true, name: 'Invoices Example' },
    component: InvoiceExample
  },
  {
    path: 'offer-example',
    name: prop + '.offer-example',
    meta: { dark: mode, auth: true, name: 'Offer Example' },
    component: OfferExample
  },
  {
    path: 'advance-payment-example',
    name: prop + '.advance-payment-example',
    meta: { dark: mode, auth: true, name: 'Advance Payment Example' },
    component: AdvancePaymentExample
  },
  {
    path: 'new-invoice',
    name: prop + '.new-invoice',
    meta: { dark: mode, auth: true, name: 'New Invoices' },
    component: NewInvoice
  }
]

const userChildRoute = (prop, mode = false) => [
  {
    path: 'profile',
    name: prop + '.profile',
    meta: { dark: mode, auth: true, name: 'Profile' },
    component: Profile
  },
  {
    path: 'profile-edit',
    name: prop + '.edit',
    meta: { dark: mode, auth: true, name: 'Edit Profile' },
    component: ProfileEdit
  },
  {
    path: 'add-user',
    name: prop + '.add',
    meta: { dark: mode, auth: true, name: 'Add Profile' },
    component: AddUser
  }
  // {
  //   path: 'user-list',
  //   name: prop + '.list',
  //   meta: { dark: mode, auth: true, name: 'User List' },
  //   component: UserList
  // }
]

const pluginsChildRoute = (prop, mode = false) => [
  {
    path: 'datepicker',
    name: prop + '.datepicker',
    meta: { dark: mode, auth: true, name: 'Datepicker' },
    component: DatepickerDemo
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
  // {
  //   path: '/assignment',
  //   name: 'dashboard3',
  //   component: Layout1,
  //   meta: { auth: true },
  //   children: childRoutes('dashboard3')
  // },
  {
    path: '/core',
    name: 'core',
    component: Layout1,
    meta: { auth: true },
    children: coreChildRoute('core')
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
    path: '/table',
    name: 'table',
    component: Layout1,
    meta: { auth: true },
    children: tableChildRoute('table')
  },
  {
    path: '/chart',
    name: 'chart',
    component: Layout1,
    meta: { auth: true },
    children: chartChildRoutes('chart')
  },
  {
    path: '/icon',
    name: 'icon',
    component: Layout1,
    meta: { auth: true },
    children: iconChildRoute('icon')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout1,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: Layout1,
    meta: { auth: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/app',
    name: 'app',
    component: Layout1,
    meta: { auth: true },
    children: appChildRoute('app')
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: Layout1,
    meta: { auth: true },
    children: userChildRoute('doctor')
  },
  {
    path: '/form',
    name: 'form',
    component: Layout1,
    meta: { auth: true },
    children: formChildRoute('form')
  },
  {
    path: '/plugins',
    name: 'plugins',
    component: Layout1,
    meta: { auth: true },
    children: pluginsChildRoute('plugins')
  },
  {
    path: '/callback',
    name: 'callback',
    meta: { auth: false },
    component: Callback
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
