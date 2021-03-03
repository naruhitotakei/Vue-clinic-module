<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
          <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Select Doctor</h4>
          </template>
            <b-button pill variant="primary" class="mb-3 mr-1"><i class="ri-arrow-left-s-line"></i>Prev</b-button>
            <b-button pill variant="primary" class="mb-3 mr-1">Doctor 1</b-button>
            <b-button pill variant="primary" class="mb-3 mr-1">Doctor 2</b-button>
            <b-button pill variant="primary" class="mb-3 mr-1">Doctor 3</b-button>
            <b-button pill variant="primary" class="mb-3 mr-1">Doctor 4</b-button>
            <b-button pill variant="primary" class="mb-3 mr-1">Doctor 5</b-button>
            <b-button pill variant="primary" class="mb-3 mr-1">Next<i class="ri-arrow-right-s-line"></i></b-button>
        </iq-card>
          </template>
          <template v-slot:headerAction>
            <b-button v-b-modal.modal-1 variant="primary"><i class="ri-add-line mr-2"></i>Book Appointment</b-button>
            <form class="mt-4" novalidate @submit="submitFormData()">
              <b-modal id="modal-1" title="Appointment details" hide-footer>
            <!-- <b-modal id="modal-1" title="Appointment details" ok-title="Save Changes" @ok="submitFormData" cancel-title="Close"> -->
              <form @submit="submitFormData()">
              <div class="form-row">
                <div class="col-md-12 mb-3">
                  <label for="validationDefault01">Appointment name</label>
                  <input type="text" v-model="formData.appName" class="form-control" id="validationDefault01" required>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault02">Date and Time</label>
                  <input type="datetime-local" placeholder="2021-01-01T13:45:00" v-model="formData.dateTime" class="form-control" id="validationDefault02" required>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault03">Regarding</label>
                  <input type="text" v-model="formData.regarding" class="form-control" id="validationDefault02" required>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault04">Type</label>
                  <select class="form-control" v-model="formData.type" id="validationDefault04" required>
                    <option selected disabled value="type">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault05">Name of Doctor</label>
                  <select class="form-control" v-model="formData.doctorList" id="validationDefault05" required>
                    <option selected disabled value="doctor_name">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault06">Name of Patient</label>
                  <select class="form-control" v-model="formData.patientName" id="validationDefault06" required>
                    <option selected disabled value="patient_name">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault06">Location</label>
                  <select class="form-control" v-model="formData.location" id="validationDefault06" required>
                    <option selected disabled value="location">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col-md-12 mb-3">
                  <label for="validationDefault05">Telephone Input</label>
                  <input type="tel" class="form-control" v-model="formData.phone" id="validationDefault05" required>
                </div>
              <div class="col-md-12 mb-3">
                  <label for="validationDefault05">Answered by</label>
                  <input type="tel" v-model="formData.answeredBy" class="form-control" id="validationDefault05" required>
              </div>
              <div class="col-md-12 mb-3">
                  <label for="validationDefault05">Presence</label>
                  <input type="tel" v-model="formData.presence" class="form-control" id="validationDefault05" required>
              </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" type="submit">Submit form</button>
              </div>
            </form>
          </b-modal>
          </form>
            <!-- <a href="#" class="btn btn-primary"><i class="ri-add-line mr-2"></i>Book Appointment</a> -->
          </template>
          <template v-slot:body>
            <FullCalendar :calendarEvents="events" />
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
import {} from '../../Forms/FormLayout'
import appointmentBook from '../../../services/appointbook'
export default {
  name: 'GoogleCalendar',
  components: { },
  data () {
    return {
      formData: {
        appName: '',
        dateTime: '',
        regarding: '',
        type: '',
        doctorList: '',
        patientName: '',
        location: '',
        phone: '',
        answeredBy: '',
        presence: ''
      },
      config: {
        dateFormat: 'Y-m-d',
        inline: true
      },
      options1: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' },
        { value: 'postponed', text: 'Postponed' }
      ],
      options2: [
        { value: 'select-1', text: 'Doctor-1' },
        { value: 'select-2', text: 'Doctor-2' },
        { value: 'select-3', text: 'Doctor-3' },
        { value: 'select-4', text: 'Doctor-4' },
        { value: 'select-5', text: 'Doctor-5' },
        { value: 'select-6', text: 'Doctor-6' }
      ],
      options3: [
        { value: '1', text: 'One' },
        { value: '2', text: 'Two' },
        { value: '3', text: 'Three' }
      ],
      selected: ['select-1'],
      selected3: null,
      events: [
        {
          title: 'All Day Event',
          start: '2019-12-01',
          color: '#fc9919'
        },
        {
          title: 'Long Event',
          start: '2019-12-07',
          end: '2019-12-10',
          color: '#ffc107' // override!
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2019-12-09T16:00:00',
          color: '#17a2b8'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2019-12-16T16:00:00',
          color: '#17a2b8'
        },
        {
          title: 'Conference',
          start: '2019-12-11',
          end: '2019-12-13',
          color: '#27e3f4' // override!
        },
        {
          title: 'Meeting',
          start: '2019-12-12T10:30:00',
          end: '2019-12-12T12:30:00',
          color: '#0084ff'
        },
        {
          title: 'Lunch',
          start: '2019-12-12T12:00:00',
          color: '#777D74'
        },
        {
          title: 'Meeting',
          start: '2019-12-12T14:30:00',
          color: '#0084ff'
        },
        {
          title: 'Birthday Party',
          start: '2019-12-28T07:00:00',
          color: '#28a745'
        },
        {
          title: 'Meeting',
          start: '2020-01-12T14:30:00',
          color: '#0084ff'
        },
        {
          title: 'Birthday Party',
          start: '2020-01-02T07:00:00',
          color: '#28a745'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2020-01-25'
        },
        {
          title: 'Birthday Party',
          start: '2020-01-13T07:00:00',
          color: '#28a745'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2019-12-28'
        },
        {
          title: 'Meeting',
          start: '2020-01-12T14:30:00',
          color: '#0084ff'
        },
        {
          title: 'Birthday Party',
          start: '2020-01-13T07:00:00',
          color: '#28a745'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2020-01-28'
        },
        {
          title: 'All Day Event',
          start: '2020-02-01',
          color: '#fc9919'
        },
        {
          title: 'Long Event',
          start: '2020-02-07',
          end: '2020-02-10',
          color: '#ffc107' // override!
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2020-02-09T16:00:00',
          color: '#17a2b8'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2020-02-16T16:00:00',
          color: '#17a2b8'
        }
      ]
    }
  },
  mounted () {
    xray.index()
  },
  computed: {
  },
  methods: {
    submitFormData () {
      console.log('FORM DATA:', this.formData)
      appointmentBook(this.formData)
    }
  }
}
</script>
