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
                    <button type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionCall') }}</button>
                    <button type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionEdit') }}</button>
                    <button type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionSendSMS') }}</button>
                    <button type="button" class="btn btn-primary mr-3" style="height: max-content">{{ $t('callCenter.leadsPage.actionSendEmail') }}</button>
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
          </div>
        </b-col>

      </b-row>
    </form>
  </b-container>
</template>

<script>
import IqCard from '../../components/xray/cards/iq-card.vue'
import {
  getEnquires
} from '../../services/enquiry'
import { xray } from '../../config/pluginInit'
export default {
  components: {
    IqCard
  },
  name: 'Leads',
  async mounted () {
    xray.index()
    this.getLeads('ASC')
  },
  data: function () {
    return {
      isDataLoaded: false,
      leads: []
    }
  },
  methods: {
    async getLeads (sort) {
      this.isDataLoaded = false
      getEnquires(sort).then(response => {
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
    }
  }
}
</script>
