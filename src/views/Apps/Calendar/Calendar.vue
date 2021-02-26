<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Book Appointment</h4>
          </template>
          <!-- <template v-slot:headerAction>
            <a href="#" class="btn btn-primary"><i class="ri-add-line mr-2"></i>Book Appointment</a>
          </template> -->
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
export default {
  name: 'GoogleCalendar',
  components: { },
  data () {
    return {
      config: {
        dateFormat: 'Y-m-d',
        inline: true
      },
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
  }
}
</script>
