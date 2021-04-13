<template>
    <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
              <h3 class="card-title" style="margin-top: 10px;">{{ $t('offers.offersHeader') }}</h3>
                        <div class="btn-add-patient">
                            <b-button variant="primary" @click="add_offer"><i class="ri-add-line mr-2"></i>{{ $t('offers.offersBtn') }}</b-button>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                            <div class="iq-search-bar">
                                <form action="#" class="searchbox">
                                    <input type="text" class="text search-input" placeholder="Search" @keyup="myFunction($event.target.value)">
                                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                </form>
                            </div>
                            <iq-card>
                                <b-form-group label-for="searchoption"
                                              label="Search By:">
                                    <b-form-select plain
                                                   v-model="selected"
                                                   :options="searchOptions"
                                                   id="searchOptions"
                                                   @change="searchfunction($event)">
                                    </b-form-select>
                                </b-form-group>
                            </iq-card>
                        </div>
                    </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table
                  id="my-table"
                  bordered
                  hover
                  @row-clicked="$router.push('/extra-pages/offer-example')"
                  :items="paginatedItems"
                  :fields="columns"
                  :per-page="perPage"
                  :current-page="currentPage"
                >
                </b-table>
              </b-col>
            </b-row>
            <template>
              <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
              <div class="mt-3">
                <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
              </div>
            </template>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
var rows = [
  {
    offer_no: 'offer12312',
    patient_name: 'Maks Krajnc',
    date: '03.03.2021-14:00',
    issued_by: 'Dr. Petra Maver',
    amount: '90 EUR'
  }
]
export default {
  components: {
  },
  name: 'Offers',
  methods: {
    default () {
      return {
        offer_no: this.rows.length,
        patient_name: '',
        date: '',
        issued_by: '',
        amount: ''
      }
    },
    searchfunction (event) {
      this.dropDownText = event
      console.log('SEARCHBY OPTION:', event)
      console.log('DROPDOWN:', this.dropDownText)
      return event
    },
    myFunction (event) {
      console.log('evemt', event)
      console.log('DROPDOWN:', this.dropDownText)

      if (this.dropDownText) {
        var sorted = rows.filter((item) => {
          return item[this.dropDownText].toLowerCase().includes(event.toLowerCase())
        })
        this.paginatedItems = sorted
      }
      console.log('sorted', sorted)
    },
    add_offer () {
      console.log('ADD NEW OFFER CLICKED')
    }
  },
  data  () {
    return {
      dropDownText: '',
      selected: this.value,
      searchOptions: [
        { value: 'offer_no', text: 'Number' },
        { value: 'patient_name', text: 'Patient Name' },
        { value: 'date', text: 'Date' },
        { value: 'issue_by', text: 'Issued by' },
        { value: 'amount', text: 'Amount' }
      ],
      items: rows,
      paginatedItems: rows,
      currentPage: 1,
      perPage: 10,
      totalRows: rows.length,
      columns: [
        { label: this.$t('offers.offersColumn.no'), key: 'offer_no', class: 'text-left' },
        { label: this.$t('offers.offersColumn.patientName'), key: 'patient_name', class: 'text-left' },
        { label: this.$t('offers.offersColumn.date'), key: 'date', class: 'text-left' },
        { label: this.$t('offers.offersColumn.issuedBy'), key: 'issued_by', class: 'text-left' },
        { label: this.$t('offers.offersColumn.amount'), key: 'amount', class: 'text-left' }
      ]
    }
  },
  mounted () {
  }
}
</script>
