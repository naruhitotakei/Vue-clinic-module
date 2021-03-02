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
<!-- <kbd class="bg-dark">
<pre class="text-white" id="form-3">
<code>
&lt;b-form-group
    label-for="exampleFormControlSelect1"
    label="Select Input"&gt;
    &lt;b-form-select plain v-model="selected" :options="options1" id="exampleFormControlSelect1"&gt;
      &lt;template v-slot:first&gt;
        &lt;b-form-select-option :value="null" disabled&gt;Select your age&lt;/b-form-select-option&gt;
      &lt;/template&gt;
    &lt;/b-form-select&gt;
  &lt;/b-form-group&gt;
        </code>
            </pre>
                </kbd> -->
            <b-button v-b-modal.modal-1 variant="primary"><i class="ri-add-line mr-2"></i>Book Appointment</b-button>
            <b-modal id="modal-1" title="Appointment details" ok-title="Save Changes" @ok="submitFormData" cancel-title="Close">
            <b-form>
              <b-form-group label="Appointment name:" label-for="appname">
                <b-form-input id="appname" v-model="formData.appName"></b-form-input>
              </b-form-group>
              <b-form-group label="Date and Time Input" label-for="datetime">
                <b-form-input id="datetime" v-model="formData.dateTime" type="datetime-local" value="2019-12-19T13:45:00"></b-form-input>
              </b-form-group>
              <b-form-group label="Regarding:" label-for="regarding">
                <b-form-input id="regarding" v-model="formData.regarding"></b-form-input>
              </b-form-group>
              <b-form-group label="Type:" label-for="type">
              <b-form-select id="type" plain v-model="formData.type" :options="options3" class="mb-3">
                <!-- <template v-slot:first>
                  <b-form-select-option :value="null"></b-form-select-option>
                </template> -->
              </b-form-select>
            </b-form-group>
            <b-form-group label="Name of Doctor:" label-for="doctorlist">
              <b-form-select id="doctorlist" plain v-model="formData.doctorList" :options="options2" class="mb-3">
              </b-form-select>
            </b-form-group>
            <b-form-group label="Name of Patient:" label-for="patientname">
              <b-form-select id="patientname" plain v-model="formData.patientName" :options="options3" class="mb-3">
              </b-form-select>
            </b-form-group>
            <b-form-group label="Location:" label-for="location">
              <b-form-select id="location" plain v-model="formData.location" :options="options3" class="mb-3">
              </b-form-select>
            </b-form-group>
            <b-form-group label="Telephone Input" label-for="phone" class="mb-3">
                <b-form-input id="phone" v-model="formData.phone" placeholder="1-(555)-555-5555"></b-form-input>
             </b-form-group>
             <b-form-group label="Answered by:" label-for="answeredby">
                <b-form-input id="answeredby" v-model="formData.answeredBy"></b-form-input>
              </b-form-group>
              <b-form-group label="Presence:" label-for="presence">
              <b-form-select id="presence" plain :options="options1" v-model="formData.presence" class="mb-3" style="padding: 12px">
              </b-form-select>
              </b-form-group>
              <!-- <b-form-checkbox class="mb-3">
                Remember me
              </b-form-checkbox>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="submit" variant="none" class="iq-bg-danger ml-3">Cancle</b-button> -->
            </b-form>
          </b-modal>
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
