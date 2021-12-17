<template>
    <div class="container">
      <b-row class="mt-3">
        <b-col cols="12" lg="4" class="pr-0 mt-4 pt-2 col-lg-4">
          <iq-card>
            <template v-slot:body>
              <div class="user-details-block">
                  <b-col class="text-right">
                      <b-button type="button" variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="modalTrashPatient = true"><i class="ri-delete-bin-7-fill m-0"></i></b-button>
                  </b-col>
                  <b-modal v-model="modalTrashPatient" ok-title="OK" cancel-title="Cancel" @ok="trashPatient" @cancel="modalTrashPatient = false">
                      <h4 class="my-4 card-title text-center">Are you sure you want to delete the patient?</h4>
                  </b-modal>
                  <div class="user-profile text-center">
                      <img v-if="patient.gender == 'female'" src="../../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid">
                      <img v-else src="../../assets/images/user/08.png" alt="profile-img" class="avatar-130 img-fluid">
                  </div>
                  <div class="text-center mt-3">
                    <h4><b>Manca Zupanc</b></h4>
                  </div>
                  <div class="mt-3 d-flex justify-content-between">
                    <div>
                      <h5>Dental procedure</h5>
                      <span>Status:</span> <b-badge variant="danger">New Lead</b-badge>
                    </div>
                    <div>
                      <span>source: <strong>Telfon</strong></span>
                    </div>
                  </div>
                  <hr>
                  <ul class="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0">
                      <li class="text-center">
                          <h4 class="counter">{{numberOfVisits || 2}}</h4>
                          <span>{{ $t('EPR.overview.numberOfVisits') }}</span>
                      </li>
                      <li class="text-center">
                          <!-- <h4 class="counter">{{timeSinceFirstVisit | fromNowDate}}</h4> -->
                          <h4 class="counter">2 months ago</h4>
                          <span>{{ $t('EPR.overview.firstVisit') }}</span>
                      </li>
                  </ul>
                  <hr>
                  <div class="row ml-1 align-items-center">
                      <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.phone') }}:</div>
                      <div class="col-8 pl-lg-3 p-md-0 text-dark">{{patient.phone || '+38630086791'}}</div>
                      <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.email') }}:</div>
                      <div class="col-8 pl-lg-3 p-md-0 text-dark">{{patient.email || 'manca.zupanc@staging.emazing.si'}}</div>
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
        </b-col>
        <b-col cols="12" lg="8">
          <iq-card>
            <template v-slot:body>
              <b-tabs pills>
                <b-tab title="Appointments">
                  <hr>
                  <div class="mt-3">
                    <h5>Show All Appointments of Patient here...</h5>
                  </div>
                </b-tab>
                <b-tab title="Services">
                  <hr>
                  <div class="mt-3">
                    <h5>Show All Services of Patient here...</h5>
                  </div>
                </b-tab>
                <b-tab title="SMS">
                  <hr>
                  <div class="mt-3">
                    <h5>Show All SMS Messages of Patient here...</h5>
                  </div>
                </b-tab>
                <b-tab title="Notes">
                  <hr>
                  <div class="mt-3">
                    <h5>Show All Notes of Patient here...</h5>
                  </div>
                </b-tab>
                <b-tab title="Todos">
                  <hr>
                  <div class="mt-3">
                    <h5>Show All Todos of Patient here...</h5>
                  </div>
                </b-tab>
              </b-tabs>
            </template>
          </iq-card>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import { xray } from '../../config/pluginInit'
import {
  getEnquiryById,
  trashEnquiry
} from '../../services/enquiry'
import { getDentists, getSurgeons, sso } from '../../services/userService'
import moment from 'moment'
export default {
  components: {
  },
  name: 'Leads',
  mounted () {
    xray.index()
    // this.getUserLogin()
    // this.getPatient(this.patientId)
    // this.getDentists()
    // this.getSurgeons()
  },
  computed: {
    // fullName () {
    //   return this.patient.name + ' ' + this.patient.last_name
    // },

    patientsDentist: function () {
      if (this.dentists && Array.isArray(this.dentists) && this.dentists.length) {
        return this.dentists.find((item) => {
          return item.code === this.patient.prm_dentist_user_id
        })
      }
      return null
    },
    patientsSurgeon: function () {
      return this.surgeons.find((item) => {
        return item.code === this.patient.prm_surgeon_user_id
      })
    }
  },
  data: function () {
    return {
      loggedInUser: null,
      modalTrashPatient: false,
      patient: {},
      dentists: [],
      surgeons: []
    }
  },
  methods: {
    getUserLogin () {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.loggedInUser = response
        }
      })
    },
    getPatient (id) {
      getEnquiryById(id).then(response => {
        this.patient = response[0]
        if (this.patient.date_of_birth !== null) {
          this.patient.date_of_birth = moment(this.patient.date_of_birth).format('YYYY-MM-DD')
        }
        if (this.patient.general_notes !== null) {
          this.notesGeneral = this.patient.general_notes.replace(/<br>/g, '\n')
        }
      }
      )
    },
    getDentists () {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    getSurgeons () {
      getSurgeons().then(response => {
        this.surgeons = response
      })
    },
    trashPatient () {
      trashEnquiry(this.patientId).then(() => {
        this.$router.push({ path: `/patients` })
      })
    }
  }
}
</script>
