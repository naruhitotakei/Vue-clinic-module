<template>
  <b-container fluid>
   <form>
      <b-row>
        <b-col lg="12">
            <div class="iq-edit-list-data">
              <b-row>
                <b-col lg="4" class="pr-0 mt-4 pt-2 col-lg-4">
                  <iq-card>
                      <template v-slot:body>
                          <div class="user-details-block">
                              <b-col class="text-right">
                                  <b-button type="button" variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="modalTrashPatient = true"><i class="ri-delete-bin-7-fill m-0"></i></b-button>
                              </b-col>
                              <b-modal v-model="modalTrashPatient" ok-title="OK" cancel-title="Cancel" @ok="trashPatient" @cancel="modalTrashPatient = false">
                                  <h4 class="my-4 card-title text-center">{{ $t('EPR.overview.deletePatientConfirm') }}</h4>
                              </b-modal>
                              <div class="user-profile text-center">
                                  <img v-if="patient.gender == 'female'" src="../../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid">
                                  <img v-else src="../../assets/images/user/08.png" alt="profile-img" class="avatar-130 img-fluid">
                              </div>
                              <div class="text-center mt-3">
                                  <h4><b>{{fullName}}</b></h4>
                              </div>
                              <hr>
                              <ul class="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0">
                                  <li class="text-center">
                                      <h4 class="counter">{{numberOfVisits}}</h4>
                                      <span>{{ $t('EPR.overview.numberOfVisits') }}</span>
                                  </li>
                                  <li class="text-center">
                                      <h4 class="counter">{{timeSinceFirstVisit | fromNowDate}}</h4>
                                      <span>{{ $t('EPR.overview.lastVisit') }}</span>
                                  </li>
                              </ul>
                              <hr>
                              <div class="row ml-1 align-items-center">
                                  <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.phone') }}:</div>
                                  <div class="col-8 pl-lg-3 p-md-0 text-dark">{{patient.phone}}</div>
                                  <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.email') }}:</div>
                                  <div class="col-8 pl-lg-3 p-md-0 text-dark">{{patient.email}}</div>
                                  <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.address') }}:</div>
                                  <div class="col-8 pl-lg-3 p-md-0 text-dark" v-if="patient.address_line_1">{{patient.address_line_1}}</div>
                                  <div class="col-8 pl-lg-3 p-md-0 text-dark" v-else>{{ $t('EPR.overview.addressUnknown') }}</div>
                              </div>
                              <hr>
                              <div class="row ml-1">
                                  <div class="col-4 pl-lg-3 p-md-0"><h6>{{ $t('EPR.overview.Dentist') }}:</h6></div>
                                  <div v-if="patientsDentist" class="col-8 p-md-0 pl-lg-3 text-dark">{{patientsDentist.label}}</div>
                                  <div v-if="!patientsDentist" class="col-8 text-dark">{{ $t('EPR.overview.notSelected') }}</div>
                                  <div class="col-4 pl-lg-3 p-md-0"><h6>{{ $t('EPR.overview.Surgeon') }}:</h6></div>
                                  <div v-if="patientsSurgeon" class="col-8 p-md-0 pl-lg-3 text-dark">{{patientsSurgeon.label}}</div>
                                  <div v-if="!patientsSurgeon" class="col-8 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.notSelected') }}</div>
                              </div>
                          </div>
                      </template>
                  </iq-card>
                  <iq-card body-class="iq-card-body" v-if="files.length > 0">
                    <template v-slot:body>
                        <div class="iq-card-header d-flex justify-content-between">
                            <div class="iq-header-title">
                                <h4 @click="goToFiles" class="card-title clickable">{{ $t('EPR.overview.files') }} ({{filesSortBy.length}})</h4><hr />
                            </div>
                        </div>
                        <div class="iq-card-body p-0">
                            <ul class="profile-img-gallary profile-preview-gallery d-flex flex-wrap p-0 m-0 font-size-12 overflow-y-scroll" style="max-height: 230px;">
                              <li class="col-md-4 col-6 pb-3 clickable" v-for="(file, index) in filesSortBy" :key="index + file.created_at" @click="goToFiles">
                                <div v-html="tiffConvertToCanvas(file, index, true)" class="preview" :class="`tiff-block-${index}-preview`"></div>
                                <img
                                  src="../Patients/photo.svg"
                                  alt="gallary-image"
                                  class="img-fluid dicom preview-file svg"
                                  v-if="checkIfOtherType(file.type)"
                                  >
                                <img
                                  :src="file.image"
                                  alt="gallary-image"
                                  class="img-fluid preview-file"
                                  v-if="checkIfImageType(file.type)"
                                  >
                                <object :data="file.image" type="application/pdf" width="250px" height="auto" class="m-auto d-block preview-file" v-if="file.pdf">
                                </object>
                                <div class="text-center">
                                  <p class="mb-0"> {{file.name}}</p>
                                  <p>{{file.created_at}}</p>
                                </div>
                              </li>
                            </ul>
                        </div>
                    </template>
                  </iq-card>
                </b-col>
                <b-col>
                    <iq-card>
                        <template v-slot:body>
                          <div class="lead_page_buttons">
                            <button type="button" class="btn btn-primary">Call</button>
                            <button type="button" class="btn btn-primary">Edit</button>
                            <button type="button" class="btn btn-primary">Send SMS</button>
                            <button type="button" class="btn btn-primary">Send Email</button>
                          </div>
                        </template>
                      </iq-card>
                  <b-row>
                  <b-col>
                    <b-col md="14">
                        <iq-card v-if="patient.general_notes">
                            <template v-slot:body>
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <div class="row justify-content-between align-items-center">
                                            <h4 class="card-title">{{ $t('EPR.overview.generalNotes') }}</h4>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div>
                                    <div class="text-black ml-1" v-html="patient.general_notes"></div>
                                    <!-- <b-card-text><small class="text-muted">{{ $t('EPR.overview.generalNotesUpdated') }} {{patient.general_notes_updated_at | fromNowDate}}</small></b-card-text> -->
                                </div>
                            </template>
                        </iq-card>
                    </b-col>
                    <b-col md="14">
                        <iq-card v-if="patient.allergies" class="allergies">
                            <template v-slot:body>
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <div class="row justify-content-between align-items-center">
                                            <h4 class="card-title text-white">{{ $t('EPR.overview.allergies') }}</h4>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div>
                                    <div v-html="patient.allergies" class="ml-1"></div>
                                    <!-- <b-card-text><small class="text-muted">{{ $t('EPR.overview.generalNotesUpdated') }} {{patient.general_notes_updated_at | fromNowDate}}</small></b-card-text> -->
                                </div>
                            </template>
                        </iq-card>
                    </b-col>
                    <b-col md="14">
                        <iq-card>
                            <template v-slot:body>
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <div class="row justify-content-between align-items-center">
                                            <h4 class="card-title">{{ $t('EPR.overview.patientNotes') }}</h4>
                                            <button type="button" class="btn btn-primary" @click="modalNotesShow = true">{{ $t('EPR.overview.add') }}</button>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <ul class="list-inline m-0 pl-2 pr-2">
                                    <li v-for="(note,index) in notesList" :key="index + note.created_at" id="notesList" class="d-flex align-items-center justify-content-between mb-3">
                                        <div>
                                            <h6>{{note.content}}</h6>
                                            <small class="mb-0">{{note.created_at | formatDate}} - <span class="ml-0">{{ note.user_name }}</span></small>
                                        </div>
                                    </li>
                                </ul>
                                <p v-if="notes.length === 0">{{ $t('EPR.overview.noNotes') }}</p>
                                <b-pagination
                                  class="mt-4"
                                  v-else-if="notes.length > 5"
                                  v-model="notesCurrentPage"
                                  :total-rows="notes.length"
                                  :per-page="notesPerPage"
                                  aria-controls="notesList"
                                ></b-pagination>
                            </template>
                        </iq-card>
                    </b-col>
                    <b-col md="14">
                        <iq-card>
                            <template v-slot:body>
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <div class="row justify-content-between align-items-center">
                                            <h4 class="card-title">{{ $t('EPR.overview.sms') }}</h4>
                                            <!-- <button type="button" class="btn btn-primary" @click="modalNotesShow = true">{{ $t('EPR.overview.add') }}</button> -->
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <ul class="list-inline m-0 overflow-y-scroll pl-2 pr-2" style="max-height: 300px;">
                                    <li v-for="(message,index) in smsList" :key="index + message.created_at" id="smsList" class="d-flex align-items-center justify-content-between mb-3">
                                        <div>
                                            <h6 class="text-underline" v-tooltip="message.content">{{message.name}}</h6>
                                            <small class="mb-0">{{message.created_at | formatDateAndTime}} - {{ message.delivered_at ? $t('EPR.overview.deliveredSms') :  $t('EPR.overview.notDeliveredSms')}}</small>
                                        </div>
                                    </li>
                                </ul>
                                <p v-if="smsMessages.length === 0" class="ml-1">{{ $t('EPR.overview.noSMS') }}</p>
                                <b-pagination
                                  class="mt-2"
                                  v-else-if="smsMessages.length > 4"
                                  v-model="smsCurrentPage"
                                  :total-rows="smsMessages.length"
                                  :per-page="smsPerPage"
                                  aria-controls="smsList"
                              ></b-pagination>
                            </template>
                        </iq-card>
                    </b-col>

                    </b-col>
                    <b-col>
                        <b-col md="14">
                            <iq-card>
                                <template v-slot:body>
                                    <div class="iq-card-header d-flex justify-content-between">
                                      <div class="iq-header-title">
                                        <div class="row justify-content-between align-items-center">
                                          <h4 class="card-title">{{ $t('EPR.overview.openAssignments') }}</h4>
                                          <button type="" class="btn btn-primary" @click.prevent="modalAssigmentShow = true">{{ $t('EPR.overview.add') }}</button>
                                        </div>
                                        <hr />
                                      </div>
                                    </div>
                                    <ul class="list-inline m-0 overflow-y-scroll">
                                        <li id="openList" v-for="(item,index) in openAssignments" :key="index + item.due_at"
                                            class="d-flex align-items-center justify-content-between mb-3">
                                            <div class="w-100">
                                              <div class="checkbox_text">
                                                <b-checkbox class="checkbox" v-model="item.completed" name="check-button" inline
                                                  :key="index"
                                                  @change="completeAssignment(item.id, $event)"></b-checkbox>
                                                  <strong :class="{'red-text': isItOverdue(item.due_at)}">{{ item.description }}</strong>
                                              </div>
                                              <div class="d-flex align-items-center justify-content-between">
                                                <div>
                                                  <span class="text-left ml-1">{{ item.name }} {{ item.patientlastname }}</span>&nbsp;
                                                  <span class="text-left ml-1">{{ getPatientsDentist(item) ? `(${getPatientsDentist(item)})` : '' }}</span>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                  <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                                                  <!-- <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                                                    <i class="ri-ball-pen-fill m-0"></i>
                                                  </b-button> -->
                                                </div>
                                              </div>
                                                <!-- <h6 >{{item.description}}</h6>
                                                <div class="row justify-content-between pt-1 w-100 ml-0 line-height">
                                                    <p class="mb-0">{{item.name}}</p>
                                                    <p class="mb-0">{{item.due_at | formatDate}}</p>
                                                </div> -->
                                            </div>
                                        </li>
                                    </ul>
                                    <p v-if="assignments.length === 0">{{ $t('EPR.overview.noOpenAssignments') }}</p>
                                    <b-pagination
                                      class="mt-2"
                                      v-else-if="assignments.length > 5"
                                      v-model="smsCurrentPage"
                                      :total-rows="assignments.length"
                                      :per-page="smsPerPage"
                                      aria-controls="openList"
                                  ></b-pagination>
                                </template>
                            </iq-card>
                            <iq-card>
                                <template v-slot:body>
                                    <div class="iq-card-header d-flex justify-content-between">
                                        <div class="iq-header-title">
                                            <div class="row justify-content-between align-items-center">
                                            <h4 class="card-title">{{ $t('EPR.overview.futureAppointments') }}</h4>
                                            <button type="button" class="btn btn-primary" @click="openAddAppointmentModal">{{ $t('EPR.overview.add') }}</button>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                    <ul class="iq-timeline">
                                        <li v-for="(item,index) in futureList" :key="index + 'future'" id="futureList">
                                            <div v-if="item.appointmentStatus === true" class="timeline-dots border-success"></div>
                                            <div v-if="item.appointmentStatus === false" class="timeline-dots border-danger"></div>
                                            <div v-if="item.appointmentStatus === null" class="timeline-dots border-warning"></div>
                                            <div @click="openEditAppointmentModal(item)" style="cursor: pointer;">
                                                <h6>{{item.product_group_text}}<span class="float-right">{{item.note}}</span></h6>
                                                <small class="mt-1">{{item.starts_at | formatDateAndTime}} {{ item.location ? `(${item.location})` : '' }}</small>
                                            </div>
                                        </li>
                                    </ul>
                                    <p v-if="futureAppointments.length === 0">{{ $t('EPR.overview.noFutureAppointments') }}</p>
                                    <b-pagination
                                      class="mt-2"
                                      v-else-if="futureAppointments.length > 5"
                                      v-model="futureCurrentPage"
                                      :total-rows="futureAppointments.length"
                                      :per-page="futurePerPage"
                                      aria-controls="futureList"
                                  ></b-pagination>
                                </template>
                            </iq-card>
                            <iq-card>
                                <template v-slot:body>
                                    <div class="iq-card-header">
                                      <div class="row justify-content-between align-items-center">
                                        <div class="iq-header-title">
                                          <h4 class="card-title">{{ $t('EPR.overview.pastAppointments') }}</h4>
                                        </div>
                                      </div>
                                      <hr />
                                    </div>
                                    <ul class="iq-timeline" id="pastAppointments">
                                        <li v-for="(item, index) in pastList" :key="index + 'status'" id="pastList">
                                          <div v-if="item.appointmentStatus === true" class="timeline-dots border-success"></div>
                                          <div v-if="item.appointmentStatus === false" class="timeline-dots border-danger"></div>
                                          <div v-if="item.appointmentStatus === null" class="timeline-dots border-warning"></div>
                                          <h6 @click="openEditAppointmentModal(item)" class="clickable">{{item.product_group_text}}<span class="float-right">{{item.note}}</span></h6>
                                          <small class="mt-1">{{item.starts_at | formatDateAndTime}} {{ item.location ? `(${item.location})` : '' }}</small>
                                        </li>
                                    </ul>
                                    <p v-if="pastAppointments.length === 0">{{ $t('EPR.overview.noPastAppointments') }}</p>
                                    <b-pagination
                                      class="mt-2"
                                      v-else-if="pastAppointments.length > 5"
                                      v-model="pastCurrentPage"
                                      :total-rows="pastAppointments.length"
                                      :per-page="pastPerPage"
                                      aria-controls="pastList"
                                  ></b-pagination>
                                </template>
                            </iq-card>
                            <iq-card>
                              <template v-slot:body>
                                  <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                      <div class="row justify-content-between align-items-center">
                                          <h4 class="card-title">{{ $t('assignments.completedAssignments') }}</h4>
                                        </div>
                                        <hr />
                                    </div>
                                  </div>
                                  <ul class="list-inline m-0 overflow-y-scroll">
                                      <li id="completedList" v-for="(item,index) in completedList" :key="index + item.due_at"
                                          class="d-flex align-items-center justify-content-between mb-3">
                                          <div class="w-100">
                                              <h6>{{item.description}}</h6>
                                              <div class="row justify-content-between pt-1 w-100 ml-0 line-height">
                                                  <p class="mb-0">{{item.name}}</p>
                                                  <p class="mb-0">{{item.due_at | formatDate}}</p>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                                  <p v-if="completedAssignments.length === 0">{{ $t('EPR.overview.noCompletedAssignments') }}</p>
                                    <b-pagination
                                      class="mt-2"
                                      v-else-if="completedAssignments.length > 5"
                                      v-model="completedCurrentPage"
                                      :total-rows="completedAssignments.length"
                                      :per-page="completedPerPage"
                                      aria-controls="completedList"
                                  ></b-pagination>
                              </template>
                            </iq-card>
                        </b-col>
                  </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
        </b-col>
      </b-row>
    </form>
  </b-container>
</template>

<script>
import { getDentists, getSurgeons, getLegacyDoctors, getUsersForAssignments, sso } from '../../services/userService'
import moment from 'moment'
import { xray } from '../../config/pluginInit'
import {
  getEnquiryFutureAppointments,
  getEnquiryPastAppointments,
  getEnquiryNotes,
  getEnquiryById,
  trashEnquiry,
} from '../../services/enquiry'
import _ from 'lodash'
export default {
  name: 'ViewLead',
  mounted() {
    xray.index()
    this.getUserLogin()
    this.getPatient(this.leadId)
    this.getPatientNotes(this.leadId)
    this.getPatientPastAppointments(this.leadId, this.$i18n.locale)
    this.getPatientFutureAppointments(this.leadId, this.$i18n.locale)
    this.getPatientAssignments(this.leadId)
    // this.getCountries()
    // this.getRegions()
    // this.getMunicipalities()
    // this.getDentists()
    // this.getSurgeons()
    // this.getLegacyDoctors()
    // this.getPatientInvoices(this.leadId, 'ASC')
    // this.getPatientOffers(this.leadId)
    // this.getPatientServices(this.leadId)
    // this.getUsersForAssignments()
    // this.getFiles()
    // this.getLocations()
    // this.getSms()
    // this.getDoctors()
    // this.getProductGroups(this.$i18n.locale)
    // this.getOldProducts()
    // this.getLabels(this.$i18n.locale)
  },
  data() {
    return {
      loggedInUser: {},
      userId: null,
      calendarApi: null,
      leadId: this.$route.params.leadId,
      modalAssigmentShow: false,
      modalNotesShow: false,
      modalInvoiceShow: false,
      addAppointmentModal: false,
      modalTrashPatient: false,
      openCancelationModal: false,
      modalServiceShow: false,
      generalNotes: '',
      notesGeneral: '',
      users: [],
      patient: {},
      tempPatient: {},
      notes: [],
      assignments: [],
      completedAssignments: [],
      pastAppointments: [],
      futureAppointments: [],
      timeSinceFirstVisit: '',
      dentists: [],
      surgeons: [],
      legacyDoctors: [],
      filter: '',
      invoices: [],
      services: [],
      offers: [],
      locations: [],
      doctors: [],
      product_groups: [],
      smsMessages: [],
      smsCurrentPage: 1,
      smsPerPage: 4,
      notesCurrentPage: 1,
      notesPerPage: 5,
      completedCurrentPage: 1,
      completedPerPage: 5,
      openCurrentPage: 1,
      openPerPage: 5,
      pastCurrentPage: 1,
      pastPerPage: 5,
      futureCurrentPage: 1,
      futurePerPage: 5,
      selectedInvoices: '',
      selectedDoctor: '',
      selectedProductGroup: '',
      invoicesType: [
        {
          label: this.$t('EPR.invoice'),
          value: 'new-invoice',
        },
        {
          label: this.$t('EPR.advPayment'),
          value: 'new-adv-payment',
        },
        {
          label: this.$t('EPR.offer'),
          value: 'offer',
        },
      ],
      colors: [],
      formData: {
        enquiry: {
          id: +this.$route.params.leadId,
        },
        due_at: null,
        user: {},
      },
      formService: {
        title: '',
        product_id: '',
        product: '',
        created_at: moment().format('YYYY-MM-DD'),
        price: '',
        doctor_id: '',
        payment_method: '',
        fee: '',
      },
      formAppointments: {
        id: '',
        patient_id: null,
        notes: '',
        location: '',
        doctor_id: '',
        doctor_name: '',
        assignmentDate: '',
        end: '',
        backgroundColor: '',
        description: '',
        product_groups: '',
        crmProduct: '',
        patient_attended: '',
        appointment_canceled: false,
        cancelation_reason: '',
      },
      patient_attend: [
        {
          label: this.$t('calendarEvent.unknown'),
          value: null,
          checked: true,
        },
        {
          label: this.$t('calendarEvent.attended'),
          value: true,
          checked: false,
        },
        {
          label: this.$t('calendarEvent.notAttended'),
          value: false,
          checked: false,
        },
      ],
      notesFormData: {
        enquiry_id: +this.$route.params.leadId,
        content: '',
        user_id: null,
      },
      paymentMethodOptions: [
        { id: 1, name: 'Cash', label: this.$t('paymentMethods.cash') },
        { id: 2, name: 'Credit card', label: this.$t('paymentMethods.creditCard') },
        { id: 3, name: 'Bank Account', label: this.$t('paymentMethods.bankAccount') },
      ],
      currentInvoicePage: 1,
      invoicesPerPage: 10,
      currentOfferPage: 1,
      offersPerPage: 10,
      currentServicesPage: 1,
      servicesPerPage: 10,
      dropDownText: '',
      selected: this.value,
      sortBy: '',
      sortByInvoice: '',
      sortOptions: [
        { value: 'name', text: this.$t('EPR.files.fileName'), sort: 'asc' },
        { value: 'name', text: this.$t('EPR.files.fileName'), sort: 'desc' },
        { value: 'type', text: this.$t('EPR.files.fileType'), sort: 'asc' },
        { value: 'type', text: this.$t('EPR.files.fileType'), sort: 'desc' },
        { value: 'created_at', text: this.$t('EPR.files.fileCreatedAt'), sort: 'asc' },
        { value: 'created_at', text: this.$t('EPR.files.fileCreatedAt'), sort: 'desc' },
      ],
      sortOptionsInvoice: [
        { value: 'invoice_type', text: this.$t('EPR.invoices.filters.invoice_type'), sort: 'asc' },
        { value: 'invoice_type', text: this.$t('EPR.invoices.filters.invoice_type'), sort: 'desc' },
      ],
      files: [],
      disabled: true,
      disabledData: true,
      disabledNotes: true,
      disabledAllergies: true,
      disabledDoctors: true,
      doctor: {
        profile: require('../../assets/images/user/1.jpg'),
      },
      selected__: '',
      options: [
        { text: 'Canceled by lead', value: 'canceled by lead' },
        { text: 'Postponed by lead', value: 'postponed by lead' },
        { text: 'Canceled by clinic', value: 'canceled by clinic' },
        { text: 'Postoponed by clinic', value: 'postoponed by clinic' },
      ],
      user: {
        profile_image: require('../../assets/images/user/11.png'),
        fname: 'Anita',
        lname: 'Jereb',
        dob: '1979-04-21',
        gender: 'female',
        address: 'Prva ulica 11',
        postcode: '1000',
        city: 'Ljubljana',
        country: 'Slovenia',
        citizenship: 'Slovenian',
        region: 'Sl-unknown',
        insurance_no: '1534667',
        insured_at: 'Zavarovalnica Triglav',
        mob_no: '+38640076191',
        tax_no: '9877645677',
        email: 'anita.jereb@staging.emazing.si',
        mobile_no: '+38640076191',
        location: 'Ljubljana',
        edited_date: Date.now(),
        allergies: 'Type, cause, symptom, note, date, change , doctor...',
        reminder: 'The patient has very sensitive gums, careful not to cause bleeding...',
        surgeon: 'Dr. Nika Klemenc',
        dentist: 'Dr. Miha Breznik',
        background: require('../../assets/images/page-img/profile-bg.jpg'),
        profile: require('../../assets/images/user/11.png'),
      },
      countries: [],
      regions: [],
      products: [],
      municipalities: [],
      columnsInvoices: [
        { label: this.$t('EPR.invoicesColumn.type'), key: 'invoice_type', class: 'text-left' },
        { label: this.$t('EPR.invoicesColumn.no'), key: 'invoice_number', class: 'text-left' },
        {
          label: this.$t('EPR.invoicesColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('YYYY-MM-DD')
          },
        },
        { label: this.$t('EPR.invoicesColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
        { label: this.$t('EPR.invoicesColumn.amount'), key: 'charges_sum', class: 'text-left' },
        { label: this.$t('EPR.invoicesColumn.paymentStatus'),
          key: 'status',
          class: 'text-left',
          formatter: (value, key, item) => {
            if (item.paid_amount === '$0.00') {
              return this.$t('invoices.unpaid')
            }
            return item.total_with_vat === item.paid_amount ? this.$t('invoices.paid') : this.$t('invoices.partiallyPaid')
          },
          filterByFormatted: true,
        },
        { label: this.$t('EPR.invoicesColumn.verificationStatus'),
          key: 'verification_status',
          class: 'text-left',
          formatter: (value, key, item) => {
            return this.$t(item.verification_status)
          },
        },
      ],
      servicesSummaryColumns: [
        { label: this.$t('EPR.servicesSummaryColumn.serviceTitle'), key: 'product_name', class: 'text-left' },
        {
          label: this.$t('EPR.servicesSummaryColumn.serviceDate'),
          key: 'done_at',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('DD.MM.YYYY')
          },
        },
        {
          label: this.$t('EPR.servicesSummaryColumn.servicePrice'),
          key: 'price',
          class: 'price-column',
          formatter: value => {
            return this.$options.filters.formatPrice(value)
          },
        },
        { label: this.$t('reportingEmazing.servicesListColumn.serviceDoctor'), key: 'doctor', class: 'text-left' },
        { label: this.$t('EPR.servicesSummaryColumn.paymentMethod'), key: 'payment_method', class: 'text-left' },
      ],
      columnsOffers: [
        { label: this.$t('EPR.offersColumn.no'), key: 'invoice_number', class: 'text-left' },
        {
          label: this.$t('EPR.offersColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('DD/MM/YYYY')
          },
        },
        { label: this.$t('EPR.offersColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
        { label: this.$t('EPR.offersColumn.amount'), key: 'total_with_vat', class: 'text-left' },
      ],
      numberOfVisits: 0,
    }
  },
  methods: {
    openAddAppointmentModal() {
      this.addAppointmentModal = true
      this.findDentist(this.patient.prm_dentist_user_id)
      this.findProductGroupName()
      this.formAppointments.backgroundColor = 136
      this.formAppointments.patient_id = this.patient.id
      this.formAppointments.location = this.locations[0].city
      this.formAppointments.assignmentDate = this.roundUpStartTime()
      this.disabled = false
    },
    findProductGroupName(id) {
      let productName = this.product_groups.find(p => p.product_group_id === id)
      this.selectedProductGroup = productName.product_group_name
    },
    findDentist(dentistId) {
      let doctor = this.doctors.find(doctor => doctor.id === dentistId)
      this.selectedDoctor = doctor
    },
    getPatientAssignments(id) {
      // getEnquiryAssignments(id).then(response => {
      //   if (Array.isArray(response)) {
      //     this.assignments = response.filter(todo => !todo.completed)
      //     this.completedAssignments = response.filter(todo => todo.completed)
      //   }
      // })
    },
    getPatientFutureAppointments(id, lang) {
      getEnquiryFutureAppointments(id, lang).then(response => {
        this.futureAppointments = _.takeRight(response, 5)
        this.futureAppointments.forEach(appointment => {
          appointment['appointmentStatus'] = this.decideAppointmentStatus(appointment)
        })
      })
    },
    getPatientPastAppointments(id, lang) {
      getEnquiryPastAppointments(id, lang).then(response => {
        this.pastAppointments = _.takeRight(response, 5)
        this.numberOfVisits = response.length
        this.pastAppointments.forEach(appointment => {
          appointment['appointmentStatus'] = this.decideAppointmentStatus(appointment)
        })
        this.timeSinceFirstVisit = response.length && response[0].date
      }
      )
    },
    getPatientNotes(id) {
      getEnquiryNotes(id).then(response => {
        if (Array.isArray(response)) {
          this.notes = response.reverse()
        }
      }
      )
    },
    getPatient(id) {
      getEnquiryById(id).then(response => {
        this.patient = response[0]
        if (this.patient && this.patient.date_of_birth !== null) {
          this.patient.date_of_birth = moment(this.patient.date_of_birth).format('YYYY-MM-DD')
        }
        if (this.patient && this.patient.general_notes !== null) {
          this.notesGeneral = this.patient.general_notes.replace(/<br>/g, '\n')
        }
      }
      )
    },
    trashPatient() {
      trashEnquiry(this.leadId).then(() => {
        this.$router.push({ path: `/patients` })
      })
    },
    getUserLogin() {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.loggedInUser = response
          this.userId = response.id
        }
      })
    },
    getDentists() {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    getSurgeons() {
      getSurgeons().then(response => {
        this.surgeons = response
      })
    },
    getLegacyDoctors() {
      getLegacyDoctors().then(response => {
        this.legacyDoctors = response
      })
    },
    getUsersForAssignments() {
      getUsersForAssignments().then(response => {
        this.users = response
      })
    },
  },
  computed: {
    completedList() {
      return this.completedAssignments.slice(
        (this.completedCurrentPage - 1) * this.completedPerPage,
        this.completedCurrentPage * this.completedPerPage)
    },
    pastList() {
      return this.pastAppointments.slice(
        (this.pastCurrentPage - 1) * this.pastPerPage,
        this.pastCurrentPage * this.pastPerPage)
    },
    futureList() {
      return this.futureAppointments.slice(
        (this.futureCurrentPage - 1) * this.futurePerPage,
        this.futureCurrentPage * this.futurePerPage)
    },
    notesList() {
      return this.notes.slice(
        (this.notesCurrentPage - 1) * this.notesPerPage,
        this.notesCurrentPage * this.notesPerPage)
    },
    openAssignments: function () {
      return this.assignments.slice(
        (this.openCurrentPage - 1) * this.openPerPage,
        this.openCurrentPage * this.openPerPage)
    },
    smsList() {
      return this.smsMessages.slice(
        (this.smsCurrentPage - 1) * this.smsPerPage,
        this.smsCurrentPage * this.smsPerPage)
    },
    patientsSurgeon: function () {
      if (this.surgeons && Array.isArray(this.surgeons)) {
        return this.surgeons.find((item) => {
          return item.code === this.patient.prm_surgeon_user_id
        })
      }
      return null
    },
    patientsDentist: function () {
      if (this.dentists && Array.isArray(this.dentists) && this.dentists.length) {
        return this.dentists.find((item) => {
          return item.code === this.patient.prm_dentist_user_id
        })
      }
      return null
    },
    fullName() {
      return this.patient.name + ' ' + this.patient.last_name
    },
  },
  filters: {
    fromNowDate(val) {
      if (!val) {
        return '-'
      }
      return moment(val).fromNow()
    },
  },
}
</script>
<style scoped>
.lead_page_buttons button{
  margin: 0 15px
}
</style>
