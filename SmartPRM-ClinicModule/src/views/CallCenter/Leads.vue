<template>
  <b-container fluid>
    <form>
      <b-row>
        <b-col lg="12">
          <div class="lead-data">
            <iq-card v-for="lead in leads" :key="lead.id">
              <b-row>
                <b-col lg="4" class="pr-0 mt-4 pt-2 col-lg-4">
                  <iq-card>
                    <template v-slot:body>
                      <div class="lead-details-block">
                        <div class="user-profile text-center">
                          <img v-if="lead.gender == 'female'" src="../../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid">
                          <img v-else src="../../assets/images/user/08.png" alt="profile-img" class="avatar-130 img-fluid">
                        </div>
                        <div class="text-center mt-3">
                          <h4><b>{{ lead.name }} {{ lead.last_name }}</b></h4>
                        </div>
                        <hr>
                        <ul class="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0">
                          <li class="text-center">
                              <h4 class="counter">{{ getPatientAppointmentsData(lead.id, lang, 'visits') }}</h4>
                              <span>{{ $t('EPR.overview.numberOfVisits') }}</span>
                          </li>
                          <li class="text-center">
                              <h4 class="counter">{{ getPatientAppointmentsData(lead.id, lang, 'time') }}</h4>
                              <span>{{ $t('EPR.overview.firstVisit') }}</span>
                          </li>
                        </ul>
                        <hr>
                        <div class="row ml-1 align-items-center">
                          <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.phone') }}:</div>
                          <div class="col-8 pl-lg-3 p-md-0 text-dark">{{lead.phone}}</div>
                          <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.email') }}:</div>
                          <div class="col-8 pl-lg-3 p-md-0 text-dark">{{lead.email}}</div>
                          <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.address') }}:</div>
                          <div class="col-8 pl-lg-3 p-md-0 text-dark" v-if="lead.address_line_1">{{lead.address_line_1}}</div>
                          <div v-else class="col-8 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.addressUnknown') }}</div>
                        </div>
                        <hr>
                        <div class="row ml-1">
                          <div class="col-4 pl-lg-3 p-md-0"><h6>{{ $t('EPR.overview.Dentist') }}:</h6></div>
                          <div class="col-8 p-md-0 pl-lg-3 text-dark">{{ getLeadDentist(lead) }}</div>
                          <div class="col-4 pl-lg-3 p-md-0"><h6>{{ $t('EPR.overview.Surgeon') }}:</h6></div>
                          <div class="col-8 p-md-0 pl-lg-3 text-dark">{{ getLeadSurgeon(lead) }}</div>
                        </div>
                      </div>
                    </template>
                  </iq-card>
                </b-col>

                <b-col lg="8" class="pr-0 mt-4 pt-2 col-lg-8 d-flex">

                  <b-col md="6">

                    <b-col>
                      <button v-if="lead.phone" type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionCall') }}</button>
                      <button type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionEdit') }}</button>
                      <b-dropdown v-if="lead.phone || lead.email" text="Send " variant="primary">
                        <b-dropdown-item v-if="lead.phone">{{ $t('callCenter.leadsPage.actionSendSMS') }}</b-dropdown-item>
                        <b-dropdown-item v-if="lead.email">{{ $t('callCenter.leadsPage.actionSendEmail') }}</b-dropdown-item>
                      </b-dropdown>
                    </b-col>

                    <b-col>
                      <b-card class="iq-card"  v-if="lead.general_notes">
                        <b-card-title>{{ $t('EPR.overview.generalNotes') }}</b-card-title>
                        <hr />
                        <b-card-text class="text-black" v-html="lead.general_notes"></b-card-text>
                      </b-card>
                    </b-col>

                    <b-col md="6">
                      <b-card text-variant="white"
                        bg-variant="danger"
                        class="iq-card"
                        v-if="lead.allergies">
                        <b-card-title class="text-white">{{ $t('EPR.overview.allergies') }}</b-card-title>
                        <blockquote class="blockquote mb-0">
                          <p class="font-size-14">{{ lead.allergies }}</p>
                        </blockquote>
                      </b-card>
                    </b-col>

                    <b-col md="14" v-if="lead.notes">
                      <iq-card>
                        <template v-slot:body>
                          <div class="iq-card-header d-flex justify-content-between">
                            <div class="iq-header-title">
                              <div class="row justify-content-between align-items-center">
                                <h4 class="card-title">{{ $t('EPR.overview.patientNotes') }}</h4>
                                <!-- <button type="button" class="btn btn-primary" @click="modalNotesShow = true">{{ $t('EPR.overview.add') }}</button> -->
                              </div>
                              <hr />
                            </div>
                          </div>
                          <ul class="list-inline m-0 overflow-y-scroll pl-2 pr-2" style="max-height: 300px;">
                            <li v-for="(note, index) in lead.notes" :key="index + note.created_at" class="d-flex align-items-center justify-content-between mb-3">
                              <div>
                                <h6>{{note.content}}</h6>
                                <p class="mb-0">{{note.created_at | formatDate}} - <span class="ml-0">{{ note.user_name }}</span></p>
                              </div>
                            </li>
                          </ul>
                        </template>
                      </iq-card>
                    </b-col>

                    <!-- <b-col md="6">
                      <iq-card>
                        <template v-slot:body>
                          <div class="iq-card-header d-flex justify-content-between">
                            <div class="iq-header-title">
                              <div class="row justify-content-between align-items-center">
                                <h4 class="card-title">{{ $t('EPR.overview.sms') }}</h4>
                              </div>
                              <hr />
                            </div>
                          </div>
                            <ul class="list-inline m-0 overflow-y-scroll pl-2 pr-2" style="max-height: 300px;">
                              <li v-for="(message,index) in smsMessages" :key="index + message.created_at" class="d-flex align-items-center justify-content-between mb-3">
                                <div>
                                  <h6>{{message.kind}}</h6>
                                  <p class="mb-0">{{message.created_at | formatDateAndTime}} - {{ message.delivered_at ? $t('EPR.overview.deliveredSms') :  $t('EPR.overview.notDeliveredSms')}}</p>
                                </div>
                              </li>
                            </ul>
                        </template>
                      </iq-card>
                    </b-col> -->

                  </b-col>

                  <b-col md="6">

                    <!-- <b-col md="6">
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
                            <ul class="list-inline m-0 overflow-y-scroll" style="max-height: 300px;">
                              <li v-for="(item,index) in assignments" :key="index + item.due_at"
                                  class="d-flex align-items-center justify-content-between mb-3">
                                <div class="w-100">
                                    <h6 :class="{'red-text': isItOverdue(item.due_at)}">{{item.description}}</h6>
                                    <div class="row justify-content-between pt-1 w-100 ml-0 line-height">
                                        <p class="mb-0">{{item.name}}</p>
                                        <p class="mb-0">{{item.due_at | formatDate}}</p>
                                    </div>
                                </div>
                              </li>
                            </ul>
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
                            <li v-for="(item,index) in futureAppointments" :key="index + 'future'">
                              <div v-if="item.appointmentStatus === 'Attended'" class="timeline-dots border-success"></div>
                              <div v-if="item.appointmentStatus === 'Canceled by clinic'" class="timeline-dots border-light"></div>
                              <div v-if="item.appointmentStatus === 'Canceled by patient'" class="timeline-dots border-danger"></div>
                              <div v-if="item.appointmentStatus === 'Unknown'" class="timeline-dots border-warning"></div>
                              <div @click="openEditAppointmentModal(item)" style="cursor: pointer;">
                                  <h6>{{item.product_group_text}}<span class="float-right">{{item.note}}</span></h6>
                                  <small class="mt-1">{{item.starts_at | formatDateAndTime}}</small>
                              </div>
                            </li>
                          </ul>
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
                            <li v-for="(item, index) in pastAppointments" :key="index + 'status'">
                              <div v-if="item.appointmentStatus === 'Attended'" class="timeline-dots border-success"></div>
                              <div v-if="item.appointmentStatus === 'Canceled by clinic'" class="timeline-dots border-light"></div>
                              <div v-if="item.appointmentStatus === 'Canceled by patient'" class="timeline-dots border-danger"></div>
                              <div v-if="item.appointmentStatus === 'Unknown'" class="timeline-dots border-warning"></div>
                              <h6 @click="openEditAppointmentModal(item)" class="clickable">{{item.product_group_text}}<span class="float-right">{{item.note}}</span></h6>
                              <small class="mt-1">{{item.starts_at | formatDateAndTime}}</small>
                            </li>
                          </ul>
                        </template>
                      </iq-card>
                    </b-col> -->

                  </b-col>
                </b-col>

              </b-row>
            </iq-card>
          </div>
        </b-col>

        <div v-if="leadsCount > 0" class="pagination-fixed">
          <b-pagination
            v-model="currentPage"
            :total-rows="leadsCount"
            :per-page="limit"
            aria-controls="my-table"
          ></b-pagination>
        </div>

        <!-- <b-col lg="12">
          <div class="lead-data">
            <iq-card v-for="lead in leads" :key="lead.id">
              <b-row>
                <b-col lg="4" class="pr-0 mt-4 pt-2 col-lg-4">
                  <iq-card>
                    <template v-slot:body>
                      <div class="lead-details-block">
                        <div class="user-profile text-center" style="cursor: pointer">
                          <img v-if="lead.gender == 'female'" src="../../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid">
                          <img v-else src="../../assets/images/user/08.png" alt="profile-img" class="avatar-130 img-fluid">
                        </div>
                        <div class="text-center mt-3">
                          <h4 style="cursor: pointer"><b>{{ lead.name }} {{ lead.last_name }}</b></h4>
                        </div>
                      </div>
                    </template>
                  </iq-card>
                </b-col>

                <b-col lg="8" class="pr-0 mt-4 pt-2 col-lg-8 d-flex" style="flex-direction: column">
                  <b-row class="d-flex mb-4">
                    <button v-if="lead.phone" type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionCall') }}</button>
                    <button type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionEdit') }}</button>
                    <button v-if="lead.phone" type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionSendSMS') }}</button>
                    <button v-if="lead.email" type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionSendEmail') }}</button>
                  </b-row>
                  <b-row>
                    <div class="col-2 p-md-0 text-dark">{{ $t('EPR.overview.phone') }}:</div>
                    <div class="col-10 p-md-0 text-dark">{{lead.phone}}</div>
                    <div class="col-2 p-md-0 text-dark">{{ $t('EPR.overview.email') }}:</div>
                    <div class="col-10 p-md-0 text-dark">{{lead.email}}</div>
                    <div class="col-2 p-md-0 text-dark">{{ $t('EPR.overview.address') }}:</div>
                    <div class="col-10 p-md-0 text-dark" v-if="lead.address_line_1">{{lead.address_line_1}}</div>
                    <div v-else class="col-10 p-md-0 text-dark">{{ $t('EPR.overview.addressUnknown') }}</div>
                  </b-row>
                </b-col>

              </b-row>
            </iq-card>
            <div v-if="leadsCount > 0" class="pagination-fixed">
              <b-pagination
                v-model="currentPage"
                :total-rows="leadsCount"
                :per-page="limit"
                aria-controls="my-table"
              ></b-pagination>
            </div>
          </div>
        </b-col> -->

      </b-row>
    </form>
  </b-container>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card.vue'
import {
  getDentists,
  getSurgeons
} from '../../services/userService'
import {
  getLeadsCount,
  getLimitedEnquires,
  getEnquiryPastAppointments
  // getEnquiryNotes
} from '../../services/enquiry'
import { xray } from '../../config/pluginInit'
import moment from 'moment'

export default {
  components: {
    IqCard
  },
  name: 'Leads',
  async mounted () {
    xray.index()
    this.getDentists()
    this.getSurgeons()
    this.getAllLeadsCount()
    this.getLeads(this.limit, this.offset)
  },
  watch: {
    currentPage (newPage) {
      this.offset = (newPage * this.limit) - this.limit
      this.getLeads(this.limit, this.offset)
    }
  },
  filters: {
    fromNowDate (val) {
      if (!val) {
        return '-'
      }
      return moment(val).fromNow()
    },
    formatDate (val) {
      if (!val) {
        return '-'
      }
      return moment(val).format('DD-MM-YYYY')
    }
  },
  data: function () {
    return {
      isDataLoaded: false,
      leadsCount: 0,
      leads: [],
      currentPage: 1,
      limit: 10,
      offset: 0,
      dentists: [],
      surgeons: [],
      notes: [],
      lang: this.$i18n.locale
    }
  },
  methods: {
    async getAllLeadsCount () {
      this.isDataLoaded = false
      getLeadsCount().then(response => {
        this.leadsCount = response[0].count
      })
    },
    async getLeads (dataLimit, dataOffset) {
      this.isDataLoaded = false
      getLimitedEnquires(dataLimit, dataOffset).then(response => {
        this.isDataLoaded = true
        if (Array.isArray(response)) {
          this.leads = response.map(obj => (
            { ...obj,
              editable: false,
              region: obj.region_name,
              country: obj.country_name,
              last_visit: obj.last_visit,
              next_visit: obj.next_visit,
              personal_dentist: obj.label
            }
          ))
        }
      })
    },
    getDentists () {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    getLeadDentist (lead) {
      if (this.dentists && this.dentists.length) {
        let dentist = this.dentists.find((item) => {
          return item.code === lead.prm_dentist_user_id
        })
        if (!dentist || dentist === '') {
          return 'Not Selected'
        }
        return dentist.label
      }
    },
    getSurgeons () {
      getSurgeons().then(response => {
        this.surgeons = response
      })
    },
    getLeadSurgeon (lead) {
      if (this.surgeons && this.surgeons.length) {
        let surgeon = this.surgeons.find((item) => {
          return item.code === lead.prm_surgeon_user_id
        })
        if (!surgeon || surgeon === '') {
          return 'Not Selected'
        }
        return surgeon.label
      }
    },
    getPatientAppointmentsData (id, lang, returnData) {
      var numberOfVisits = 0
      var timeSinceFirstVisit = '-'
      getEnquiryPastAppointments(id, lang).then(response => {
        numberOfVisits = response.length
        timeSinceFirstVisit = response.length ? response[0].date : '-'
      })

      if (returnData === 'visits') {
        return numberOfVisits
      } else {
        return timeSinceFirstVisit
      }
    }
  }
}
</script>

<style lang="scss">
  .pagination-fixed {
    position: fixed;
    bottom: 1rem;
  }
</style>
