<template>
  <div v-if="dateSlots.length > 0" class="mt-5">
    <div style="padding-left: 48px; padding-right: 48px">
      <slick :option="slickOptions">
        <date-card
          v-for="slot in dateSlots"
          :key="slot.date.getTime()"
          :date="slot.date"
          :availability="slot.availability"
          :active="slot.date.getTime() === date.getTime()"
          :totalPrice="form.service.price"
          @date-selected="
            (value) => (slot.availability === false ? (date = value) : null)
          "
        />
      </slick>
    </div>
    <b-container>
      <b-row>
        <b-col md="9">
          <div class="favorite-doctor text-left">
            {{ $t('public.onlineBooking.chooseYourFavoriteDoctor') }}
          </div>
          <app-multiselect
            :options="availableDoctors"
            label="name"
            trackBy="name"
            v-model="filters.doctors"
            :placeholder="$t('public.onlineBooking.selectOption')"
            :selectLabel="$t('public.onlineBooking.pressEnterToSelect')"
            :deselectLabel="$t('public.onlineBooking.pressEnterToRemove')"
          />
          <div
            v-if="appointmentSlots && appointmentSlots.length > 0"
            class="mt-5"
          >
            <time-selection-table
              :items="appointmentSlotsFiltered"
              :appointment-slot.sync="fieldset.appointmentSlot"
            />
          </div>
        </b-col>
        <b-col md="3">
          <div v-if="fieldset.appointmentSlot != null">
            <total-order-info :order="form" />
            <div class="d-flex justify-content-between mt-3">
              <b-button
                align-self="end"
                variant="primary"
                @click="$emit('next', -1)"
              >
                {{ $t('public.onlineBooking.backToServices') }}
              </b-button>
              <b-button
                align-self="end"
                variant="primary"
                :disabled="fieldset.appointmentSlot == null"
                @click="$emit('next')"
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
import moment from 'moment'
import { defineComponent } from '@vue/composition-api'
import { getAvailableDates } from '@/services/availableDatesService'
import { getAvailableDoctors } from '@/services/availableDoctorsService'
import { getAppointmentSlots } from '@/services/appointmentSlotsService'
import Slick from '@/components/xray/slider/Slick.vue'
import DateCard from './DateCard.vue'
import TimeSelectionTable from './TimeSelectionTable.vue'
import TotalOrderInfo from './TotalOrderInfo.vue'
import AppMultiselect from '../Controls/AppMultiselect.vue'

export default defineComponent({
  components: {
    Slick,
    DateCard,
    TimeSelectionTable,
    TotalOrderInfo,
    AppMultiselect,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      fieldset: {
        appointmentSlot: null,
      },
      filters: {
        doctors: [],
      },
      date: null,
      availableDates: [],
      availableDoctors: [],
      appointmentSlots: [],
    }
  },
  computed: {
    slickOptions() {
      return {
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 7,
        dots: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: { slidesToShow: 6, slidesToScroll: 6 },
          },
          {
            breakpoint: 992,
            settings: { slidesToShow: 4, slidesToScroll: 4 },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 3, slidesToScroll: 3 },
          },
          {
            breakpoint: 576,
            settings: { slidesToShow: 2, slidesToScroll: 2 },
          },
        ],
        prevArrow: /* html */ `
          <a href="#" class="ri-arrow-left-s-line left" style="
            margin-left: -48px;
            background: transparent;
          "></a>
        `,
        nextArrow: /* html */ `
          <a href="#" class="ri-arrow-right-s-line right" style="
            margin-right: -48px;
            background: transparent;
          "></a>
        `,
      }
    },
    dateSlots() {
      if (this.availableDates.length === 0) {
        return []
      }

      const startDate = moment(this.availableDates[0]).startOf('isoWeek')
      const endDate = moment(
        this.availableDates[this.availableDates.length - 1],
      ).endOf('isoWeek')
      const dates = []

      for (
        let date = moment(startDate);
        date.isSameOrBefore(endDate);
        date.add(1, 'day')
      ) {
        dates.push({
          availability: (() => {
            if (this.availableDates.includes(date.format('YYYY-MM-DD'))) {
              return false
            }

            if (date.day() === 0) {
              return 'closed'
            }

            if (
              date.isAfter(
                moment(this.availableDates[this.availableDates.length - 1]),
              )
            ) {
              return 'unavailable'
            }

            return 'taken'
          })(),
          date: date.toDate(),
        })
      }

      return dates
    },
    appointmentSlotsFiltered() {
      let appointmentSlots = this.appointmentSlots
      const doctorIds = this.filters.doctors.map((doctor) => doctor.id)

      if (doctorIds.length) {
        appointmentSlots = appointmentSlots.filter((slot) => {
          return doctorIds.includes(slot.doctor_id)
        })
      }

      appointmentSlots = appointmentSlots.reduce((group, slot) => {
        if (group[slot.starts_at] == null) {
          group[slot.starts_at] = []
        }

        group[slot.starts_at].push(slot)

        return group
      }, {})
      appointmentSlots = Object.entries(appointmentSlots).sort(
        ([a], [b]) => a - b,
      )
      appointmentSlots = appointmentSlots.map(([dateTime, slots]) => ({
        doctors: slots,
        time: moment(dateTime).format('HH:mm'),
        totalPrice: `$${this.form.service.price}`,
      }))

      return appointmentSlots
    },
    doctors() {
      return Object.values(
        this.appointmentSlots.reduce((doctorById, slot) => {
          if (doctorById[slot.doctor_id] == null) {
            doctorById[slot.doctor_id] = slot
          }

          return doctorById
        }, {}),
      )
    },
  },
  watch: {
    'fieldset': {
      deep: true,
      handler(value) {
        this.$emit('update:form', {
          ...this.form,
          ...value,
        })
      },
    },

    'form.service.id': {
      immediate: true,
      handler: async function (serviceId) {
        await Promise.all([
          (async () => {
            this.fieldset.appointmentSlot = null
            this.availableDates = []
            this.availableDates = await getAvailableDates({
              serviceId: this.form.service.id,
            })
            this.date = moment(this.availableDates[0]).toDate()
            this.appointmentSlots = []
            this.appointmentSlots = await getAppointmentSlots({
              serviceId,
              date: moment(this.date).format('YYYY-MM-DD'),
            })
            this.fieldset.appointmentSlot = this.appointmentSlots[0]
          })(),
          (async () => {
            this.filters.doctors = []
            this.availableDoctors = []
            this.availableDoctors = await getAvailableDoctors({
              serviceId: this.form.service.id,
            })
          })(),
        ])
      },
    },
    'date': async function (date) {
      this.fieldset.appointmentSlot = null
      this.appointmentSlots = []
      this.appointmentSlots = await getAppointmentSlots({
        serviceId: this.form.service.id,
        date: moment(date).format('YYYY-MM-DD'),
      })
      this.fieldset.appointmentSlot = this.appointmentSlots[0]
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/app-vars.scss';
.favorite-doctor {
  color: $primary;
  font-size: 16px;
}

::v-deep .slick-dots {
  bottom: -35px;
}
</style>
