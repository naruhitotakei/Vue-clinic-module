<template>
    <b-container fluid>
      <b-row>
        <b-col lg="12">
          <iq-card body-class="p-0">
            <template v-slot:body>
              <div class="iq-edit-list">
                <tab-nav :pills="true" class="iq-edit-profile d-flex">
                  <tab-nav-items class="col-12 col-sm-3 col-md-3 p-0" :active="true" href="#reports" title="Work Reports" />
                  <tab-nav-items class="col-12 col-sm-3 col-md-3 p-0" :active="false" href="#calls" title="Missed Calls" />
                  <tab-nav-items class="col-12 col-sm-3 col-md-3 p-0" :active="false" href="#callsByHour" title="Calls By Hour" />
                  <tab-nav-items class="col-12 col-sm-3 col-md-3 p-0" :active="false" href="#overview" title="Work Overview" />
                </tab-nav>
              </div>
            </template>
          </iq-card>
        </b-col>
        <b-col cols="12">
          <div class="iq-edit-list-data">
            <tab-content id="pills-tabContent-2">
              <tab-content-item :active="true" id="reports">
                <WorkReports />
              </tab-content-item>

              <tab-content-item :active="false" id="calls">
                <iq-card>
                  <MissedCalls />
                </iq-card>
              </tab-content-item>

              <tab-content-item :active="false" id="callsByHour">
                <iq-card>
                  <CallsByHour />
                </iq-card>
              </tab-content-item>

              <tab-content-item :active="false" id="overview">
                <iq-card>
                  <WorkOverview />
                </iq-card>
              </tab-content-item>
            </tab-content>
          </div>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import WorkReports from '@/components/CallCenter/WorkReport/WorkReport'
import MissedCalls from '@/components/CallCenter/WorkReport/MissedCalls'
import CallsByHour from '@/components/CallCenter/WorkReport/CallsByHour'
import WorkOverview from '@/components/CallCenter/WorkReport/WorkOverview'
export default {
  components: {
    IqCard,
    WorkReports,
    MissedCalls,
    CallsByHour,
    WorkOverview,
  },
  name: 'WorkReport',
  mounted() {
    xray.index()
  },
  data: function () {
    return {
    }
  },
  methods: {
  },
}
</script>
