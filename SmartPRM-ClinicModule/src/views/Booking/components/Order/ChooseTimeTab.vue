<template>
  <div v-if="dateSlots.length > 0" class="mt-5">
    <div style="
      padding-left: 48px;
      padding-right: 48px;
    ">
      <slick :option="slickOptions">
        <date-card
          v-for="slot in dateSlots"
          :key="slot.date.getTime()"
          :date="slot.date"
          :availability="slot.availability"
          :active="slot.date.getTime() === date.getTime()"
          :totalPrice="form.service.price"
          @date-selected="(value) => slot.availability === false ? date = value : null"
        />
      </slick>
    </div>
    <b-container>
      <b-row>
        <b-col md="9">
          <template>
            <div class="favorite-doctor text-left">
              {{ $t('public.onlineBooking.chooseYourFavoriteDoctor') }}
            </div>
            <app-multiselect
              :options="doctors"
              label="name"
              trackBy="name"
              v-model="fieldset.doctors"
              :placeholder="$t('public.onlineBooking.selectOption')"
              :selectLabel="$t('public.onlineBooking.pressEnterToSelect')"
              :deselectLabel="$t('public.onlineBooking.pressEnterToRemove')"
            />
          </template>
          <time-selection-table
            :items="appointmentSlotsFiltered"
            @select-doctor="$emit('select-doctor', $event)"
            :selectedSlot="selectedSlot"
            :selectedDate="selectedDate"
          />
        </b-col>
        <b-col md="3">
          <div>
            <!-- <total-order-info
              :services="[form.service]"
              :totalPrice="form.service.price"
              :appointmentSlot="fieldset.appointmentSlot"
              :date="date"
              :doctor="doctor"
              :time="time"
              :selectedSlot="selectedSlot"
            /> -->
            <div class="d-flex justify-content-between mt-3">
              <b-button
                align-self="end"
                variant="primary"
                @click="$emit('change-tab', 0)"
              >
                {{ $t('public.onlineBooking.backToServices') }}
              </b-button>
              <b-button
                align-self="end"
                variant="primary"
                :disabled="!selectedSlot"
                @click="$emit('change-tab', 2)"
              >
                {{ $t('public.onlineBooking.toReview') }}
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getAppointmentSlots } from '@/services/appointmentSlotsService'
import { getAvailableDates } from '@/services/availableDatesService'
import Slick from '@/components/xray/slider/Slick.vue'
import DateCard from './DateCard.vue'
import TimeSelectionTable from './TimeSelectionTable.vue'
import TotalOrderInfo from './TotalOrderInfo.vue'
import AppMultiselect from '../Controls/AppMultiselect.vue'
import moment from 'moment'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    Slick,
    DateCard,
    TimeSelectionTable,
    TotalOrderInfo,
    AppMultiselect
  },
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      date: null,
      fieldset: {
        appointmentSlot: null,
        doctors: []
      },
      availableDates: [],
      appointmentSlots: []
    }
  },
  computed: {
    slickOptions () {
      return {
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 7,
        dots: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: { slidesToShow: 6 }
          },
          {
            breakpoint: 992,
            settings: { slidesToShow: 4 }
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 3 }
          },
          {
            breakpoint: 576,
            settings: { slidesToShow: 2 }
          }
        ],
        prevArrow: /* html */`
          <a href="#" class="ri-arrow-left-s-line left" style="
            margin-left: -48px;
            background: transparent;
          "></a>
        `,
        nextArrow: /* html */`
          <a href="#" class="ri-arrow-right-s-line right" style="
            margin-right: -48px;
            background: transparent;
          "></a>
        `
      }
    },
    dateSlots () {
      if (this.availableDates.length === 0) {
        return []
      }

      const startDate = moment(this.availableDates[0]).startOf('isoWeek')
      const endDate = moment(this.availableDates[this.availableDates.length - 1]).endOf('isoWeek')
      const dates = []

      for (let date = moment(startDate); date.isSameOrBefore(endDate); date.add(1, 'day')) {
        dates.push({
          availability: this.availableDates.includes(date.format('YYYY-MM-DD'))
            ? false
            : date.day() === 0
              ? 'closed'
              : date.isAfter(moment(this.availableDates[this.availableDates.length - 1]))
                ? 'unavailable'
                : 'taken',
          date: date.toDate()
        })
      }

      return dates
    },
    appointmentSlotsFiltered () {
      const grouped = this.appointmentSlots.reduce((group, slot) => {
        if (group[slot.starts_at] == null) {
          group[slot.starts_at] = []
        }

        group[slot.starts_at].push(slot)

        return group
      }, {})
      const sorted = Object.entries(grouped).sort(([a], [b]) => a - b)

      return sorted.map(([dateTime, slots]) => ({
        doctors: slots.map((slot) => ({
          ...slot,
          img: `/api/files/avatar/${slot.doctor_id}`
        })),
        time: moment(dateTime).format('HH:mm'),
        totalPrice: `$${this.form.service.price}`
      }))
    },
    favoriteDoctors () {
      return Object.values(this.appointmentSlots.reduce((doctorById, slot) => {
        if (doctorById[slot.doctor_id] == null) {
          doctorById[slot.doctor_id] = slot
        }

        return doctorById
      }, {}))
    }
  },
  watch: {
    'form.service.id': {
      immediate: true,
      handler: async function (serviceId) {
        this.availableDates = await getAvailableDates({
          serviceId: this.form.service.id
        })

        if (this.availableDates.length === 0) {
          return
        }

        this.date = moment(this.availableDates[0]).toDate()
        this.appointmentSlots = await getAppointmentSlots({
          serviceId,
          date: moment(this.date).format('YYYY-MM-DD')
        })
      }
    },
    date: async function (date) {
      this.appointmentSlots = await getAppointmentSlots({
        serviceId: this.form.service.id,
        date: moment(date).format('YYYY-MM-DD')
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/app-vars.scss";
.favorite-doctor{
  color: $primary;
  font-size: 16px;
}
</style>
