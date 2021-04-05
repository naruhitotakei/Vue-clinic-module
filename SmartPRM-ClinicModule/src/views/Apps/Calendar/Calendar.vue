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
            <b-button-group>
              <b-button variant="primary"><i class="ri-arrow-left-s-line"></i>Left</b-button>
              <b-button variant="primary">Doctor 1</b-button>
              <b-button variant="primary">Doctor 2</b-button>
              <b-button variant="primary">Doctor 3</b-button>
              <b-button variant="primary">Right<i class="ri-arrow-right-s-line"></i></b-button>
            </b-button-group>&nbsp;&nbsp;
            <b-button v-b-modal.modal-1 variant="primary">All Doctors</b-button>
        </iq-card>
          </template>
          <template v-slot:headerAction>
            <b-button v-b-modal.modal-1 variant="primary"><i class="ri-add-line mr-2"></i>Book Appointment</b-button>
            <form class="mt-4" novalidate @submit="submitFormData()">
              <b-modal id="modal-1" title="Appointment details" hide-footer>
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
          </template>
          <template  v-slot:body>
            <FullCalendar style="width: 100%; height: 100%;"/>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
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
      }
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
