<template>
    <b-container fluid>
        <b-row>
          <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">Companies</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalCompanyShow = true"><i class="ri-add-line mr-2"></i>Add company</b-button>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                         bordered
                                         hover
                                         :busy="!isCompanyDataLoaded"
                                         :items="companies"
                                         :fields="companyColumns"
                                         :per-page="companiesPerPage"
                                         :current-page="currentCompanyPage">
                                    <template #table-busy>
                                      <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong class="loading">Loading...</strong>
                                      </div>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editCompany(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeCompany(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentCompanyPage"
                                  v-if="hideCompaniesPagination"
                                  :total-rows="companies.length"
                                  :per-page="companiesPerPage"
                                  aria-controls="my-table">
                                </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
            <b-modal v-model="modalCompanyShow" no-close-on-backdrop size="lg" title="Add company" :ok-disabled="isCompanyDisabled" @close="cancelCompany"  @cancel="cancelCompany" :ok-title="$t('servicesAndProducts.addProductModal.save')" @ok="addCompany" :cancel-title="$t('servicesAndProducts.addProductModal.close')">
              <form>
                <div class="form-row">
                  <div class="col-md-12 mb-3">
                      <label for="title">Company name *</label>
                      <input type="text" v-model="companyFormData.company_name" class="form-control" placeholder="Name">
                    </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company address *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_address_line_1" class="form-control" placeholder="Address">
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                      <label for="title">Vat payer *</label>
                    <div style="display: flex;">
                      <v-select class="payer-drop-down"
                        :clearable="false" :searchable="false" v-model="companyFormData.vat_payer"
                        :reduce="item => item.code"
                        :options="vatPayerOptions">
                        <template #search="{attributes, events}">
                          <input
                              class="vs__search"
                              :required="!companyFormData.vat_payer"
                              v-bind="attributes"
                              v-on="events"
                          />
                      </template>
                      </v-select>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Company client *</label>
                    <div style="display: flex;">
                      <v-select class="drop-down"
                      :clearable="false" v-model="companyFormData.prm_client_id"
                      label="client_name"
                      :reduce="item => item.id"
                      :options="clients">
                      <template #search="{attributes, events}">
                        <input
                            class="vs__search"
                            :required="!companyFormData.prm_client_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                      </template>
                    </v-select>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Company post code *</label>
                    <div style="display: flex;">
                      <input type="number" v-model="companyFormData.company_post_code" class="form-control" placeholder="Post code" required>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Company city *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_city" class="form-control" placeholder="City" required>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Company country *</label>
                    <div style="display: flex;">
                      <v-select class="drop-down"
                      :clearable="false" v-model="companyFormData.company_country_code"
                      label="name"
                      :reduce="item => item.code"
                      :options="countries">
                      <template #search="{attributes, events}">
                        <input
                            class="vs__search"
                            :required="!companyFormData.company_country_code"
                            v-bind="attributes"
                            v-on="events"
                          />
                      </template>
                    </v-select>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company iban *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_iban" class="form-control" placeholder="Iban" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company tax number *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_tax_registration_number" class="form-control" placeholder="Tax number" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company vat number *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_vat_number" class="form-control" placeholder="Vat number" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company legal registration identifier *</label>
                    <div style="display: flex;">
                      <input type="number" v-model="companyFormData.company_legal_registration_identifier" class="form-control" placeholder="Identifer" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Cert file *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.cert_file" class="form-control" placeholder="Cert" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Key file *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.key_file" class="form-control" placeholder="Key" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Pass Phrase *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.pass_phrase" class="form-control" placeholder="Pass Phrase" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company subject *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_subject" class="form-control" placeholder="Subject" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company issuer *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_issuer" class="form-control" placeholder="Issuer" required>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="title">Company serial *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="companyFormData.company_serial" class="form-control" placeholder="Serial" required>
                    </div>
                  </div>
                </div>
              </form>
            </b-modal>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">Premises</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalPremiseShow = true"><i class="ri-add-line mr-2"></i>Add premise</b-button>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row>
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                         bordered
                                         hover
                                         :busy="!isPremiseDataLoaded"
                                         :items="premises"
                                         :fields="premiseColumns"
                                         :per-page="premisesPerPage"
                                         :current-page="currentPremisePage">
                                    <template #table-busy>
                                      <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong class="loading">Loading...</strong>
                                      </div>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editPremise(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removePremise(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                                <b-pagination v-model="currentPremisePage"
                                  v-if="hidePremisesPagination"
                                  :total-rows="premises.length"
                                  :per-page="premisesPerPage"
                                  aria-controls="my-table">
                                </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
            <b-modal v-model="modalPremiseShow" no-close-on-backdrop size="lg" title="Add premise" :ok-disabled="isPremiseDisabled" @close="cancelPremise"  @cancel="cancelPremise" :ok-title="$t('servicesAndProducts.addProductModal.save')" @ok="addPremise" :cancel-title="$t('servicesAndProducts.addProductModal.close')">
              <form>
                <div class="form-row">
                  <div class="col-md-12 mb-3">
                      <label for="title">Company name *</label>
                      <v-select class="drop-down" label="company_name"
                        :clearable="false" v-model="premiseFormData.company_id"
                        :reduce="item => item.company_id"
                        :options="companies">
                        <template #search="{attributes, events}">
                          <input
                              class="vs__search"
                              :required="!premiseFormData.company_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                        </template>
                      </v-select>
                    </div>
                  <div class="col-md-12 mb-3">
                      <label for="title">Premise name *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_name" class="form-control" placeholder="Name">
                    </div>
                  </div>
                  <div class="col-md-5 mb-3">
                      <label for="title">Premise street *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_street" class="form-control" placeholder="Street" required>
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                      <label for="title">Premise house number *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_house_number" class="form-control" placeholder="House number" required>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Additional premise house number</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_house_number_additional" class="form-control" placeholder="Additional house number">
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Premise city *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_city" class="form-control" placeholder="City" required>
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                      <label for="title">Premise post code *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_post_code" class="form-control" placeholder="Post code" required>
                    </div>
                  </div>
                  <div class="col-md-5 mb-3">
                    <label for="title">Premise country *</label>
                    <v-select class="drop-down"
                      :clearable="false" v-model="premiseFormData.premise_country_code"
                      label="name"
                      :reduce="item => item.code"
                      :options="countries">
                      <template #search="{attributes, events}">
                        <input
                            class="vs__search"
                            :required="!premiseFormData.premise_country_code"
                            v-bind="attributes"
                            v-on="events"
                          />
                      </template>
                    </v-select>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Building number *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.building_number" class="form-control" placeholder="Building number" required>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Building section number *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.building_section_number" class="form-control" placeholder="section number">
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Premise cadastral number</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_cadastral_number" class="form-control" placeholder="Cadastral number" required>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Premise community *</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.premise_community" class="form-control" placeholder="Premise community">
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Validity date *</label>
                    <div style="display: flex;">
                      <input type="date" v-model="premiseFormData.validity_date" class="form-control" placeholder="Validity date">
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                      <label for="title">Business premise id *</label>
                    <div>
                      <input type="text" @keyup="checkBusinessIdUniquness" v-model="premiseFormData.business_premise_id" class="form-control" :class="'form-control mb-0' +( isBusinessPremiseIdUnique ? '' : ' is-invalid')" placeholder="Id" required>
                      <div class="invalid-feedback" v-if="!isBusinessPremiseIdUnique">
                        Business premise id must be unique
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 mb-3">
                      <label for="title">Special notes</label>
                    <div style="display: flex;">
                      <input type="text" v-model="premiseFormData.special_notes" class="form-control" placeholder="Special notes">
                    </div>
                  </div>
                </div>
              </form>
            </b-modal>
             <b-col md="7">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h3 class="card-title" style="margin-top: 10px;">Premise devices</h3>
                        <div class="btn-add-patient mb-4 mt-0">
                            <b-button variant="primary" @click="modalDeviceShow = true"><i class="ri-add-line mr-2"></i>Add device</b-button>
                        </div>
                    </template>
                    <template v-slot:body>
                        <b-row style="min-height:250px">
                            <b-col md="12" class="table-responsive">
                                <b-table id="my-table"
                                  bordered
                                  hover
                                  :busy="!isDeviceDataLoaded"
                                  :items="devices"
                                  :fields="devicesColumns"
                                  :per-page="devicesPerPage"
                                  :current-page="currentDevicePage">
                                    <template #table-busy>
                                      <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong class="loading">Loading...</strong>
                                      </div>
                                    </template>
                                    <template v-slot:cell(action)="data">
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editDevice(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
                                      <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="removeDevice(data.item)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                        <template>
                            <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                            <div class="mt-3">
                              <b-pagination v-model="currentDevicePage"
                                v-if="hideDevicesPagination"
                                :total-rows="devices.length"
                                :per-page="devicesPerPage"
                                aria-controls="my-table">
                              </b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
                <b-modal v-model="modalDeviceShow" no-close-on-backdrop size="lg" title="Add device" :ok-disabled="isDeviceDisabled" @close="cancelDevice" @cancel="cancelDevice" :ok-title="$t('servicesAndProducts.addProductModal.save')" @ok="addDevice" :cancel-title="$t('servicesAndProducts.addProductModal.close')">
                    <form>
                      <div class="col-md-12 mb-3">
                          <label for="title">Premise name *</label>
                          <v-select class="drop-down" label="premise_name"
                              :clearable="false" v-model="deviceFormData.company_premise_id"
                              :reduce="item => item.premise_id"
                              :options="premises">
                              <template #search="{attributes, events}">
                                <input
                                    class="vs__search"
                                    :required="!premiseFormData.company_premise_id"
                                    v-bind="attributes"
                                    v-on="events"
                                  />
                              </template>
                            </v-select>
                      </div>
                      <div class="col-md-12 mb-3">
                        <label for="title">Device name *</label>
                      <div style="display: flex;">
                        <input type="text" v-model="deviceFormData.device_name" class="form-control" placeholder="Name" required>
                      </div>
                      </div>
                    </form>
                </b-modal>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { xray } from '../../config/pluginInit'
import { getCompanies, createCompany, updateCompany, deleteCompany, getCompanyById } from '../../services/companies'
import { getCountriesList, getClients } from '../../services/commonCodeLists'
import { getCompanyPremises, getPremiseById, checkBusinessIdUniquness, getCompanyPremiseDevices, createPremise, updatePremise, deletePremise, getPremiseDeviceById, createPremiseDevice, updatePremiseDevice, deletePremiseDevice } from '../../services/companyPremises'
import moment from 'moment'

export default {
  components: {
  },
  mounted () {
    xray.index()
    this.getCompanyPremises()
    this.getCompanyPremiseDevices()
    this.getCompanies()
    this.getCountries()
    this.getClients()
  },
  computed: {
    isCompanyDisabled () {
      return !this.companyFormData.company_name || !this.companyFormData.company_address_line_1 || !this.companyFormData.company_post_code ||
        !this.companyFormData.company_city || !this.companyFormData.company_country_code || !this.companyFormData.company_iban ||
        !this.companyFormData.company_tax_registration_number || !this.companyFormData.company_vat_number || !this.companyFormData.company_legal_registration_identifier ||
        !this.companyFormData.cert_file || !this.companyFormData.key_file || !this.companyFormData.pass_phrase || !this.companyFormData.company_subject ||
        !this.companyFormData.company_issuer || !this.companyFormData.company_serial || !this.companyFormData.prm_client_id || !this.companyFormData.vat_payer
    },
    isPremiseDisabled () {
      return !this.premiseFormData.company_id || !this.premiseFormData.premise_name || !this.premiseFormData.premise_street ||
        !this.premiseFormData.premise_house_number || !this.premiseFormData.premise_city || !this.premiseFormData.premise_post_code ||
        !this.premiseFormData.premise_country_code || !this.premiseFormData.premise_community || !this.premiseFormData.premise_cadastral_number ||
        !this.premiseFormData.building_number || !this.premiseFormData.building_section_number || !this.premiseFormData.special_notes ||
        !this.premiseFormData.validity_date || !this.premiseFormData.business_premise_id || !this.isBusinessPremiseIdUnique
    },
    isDeviceDisabled () {
      return !this.deviceFormData.company_premise_id || !this.deviceFormData.device_name
    },
    hideCompaniesPagination () {
      return Math.floor(this.companies.length / this.companiesPerPage) !== 0
    },
    hidePremisesPagination () {
      return Math.floor(this.premises.length / this.premisesPerPage) !== 0
    },
    hideDevicesPagination () {
      return Math.floor(this.devices.length / this.devicesPerPage) !== 0
    }
  },
  name: 'Invoicing',
  data: function () {
    return {
      premiseColumns: [
        { label: 'Company name', key: 'company_name', class: 'text-left' },
        { label: 'Premise name', key: 'premise_name', class: 'text-left' },
        { label: 'Address', key: 'premise_address', class: 'text-left' },
        { label: 'City', key: 'premise_city', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      companyColumns: [
        { label: 'Name', key: 'company_name', class: 'text-left' },
        { label: 'Address', key: 'company_address_line_1', class: 'text-left' },
        { label: 'City', key: 'company_city', class: 'text-left' },
        { label: 'Tax number', key: 'company_tax_registration_number', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      companyFormData: {
        company_name: '',
        company_address_line_1: '',
        company_post_code: '',
        company_city: '',
        company_country_code: '',
        company_iban: '',
        company_tax_registration_number: '',
        company_vat_number: '',
        company_legal_registration_identifier: '',
        cert_file: '',
        key_file: '',
        pass_phrase: '',
        company_subject: '',
        company_issuer: '',
        company_serial: '',
        prm_client_id: '',
        vat_payer: false
      },
      vatPayerOptions: [
        { code: true, label: 'Yes' },
        { code: false, label: 'No' }
      ],
      premiseFormData: {
        premise_id: '',
        company_id: '',
        premise_name: '',
        premise_street: '',
        premise_house_number: '',
        premise_house_number_additional: '',
        premise_city: '',
        premise_post_code: '',
        premise_country_code: '',
        premise_community: '',
        premise_cadastral_number: '',
        building_number: '',
        building_section_number: '',
        special_notes: '',
        validity_date: moment().format('YYYY-MM-DD'),
        business_premise_id: ''
      },
      deviceFormData: {
        company_premise_id: '',
        device_name: ''
      },
      modalPremiseShow: false,
      modalDeviceShow: false,
      modalCompanyShow: false,
      premises: [],
      devices: [],
      companies: [],
      countries: [],
      clients: [],
      isCompanyDataLoaded: false,
      isPremiseDataLoaded: false,
      isDeviceDataLoaded: false,
      currentPremisePage: 1,
      currentCompanyPage: 1,
      companiesPerPage: 20,
      premisesPerPage: 20,
      devicesColumns: [
        { label: 'Company name', key: 'company_name', class: 'text-left' },
        { label: 'Premise name', key: 'premise_name', class: 'text-left' },
        { label: 'Device name', key: 'device_name', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      currentDevicePage: 1,
      devicesPerPage: 20,
      isBusinessPremiseIdUnique: true,
      timer: null
    }
  },
  methods: {
    getCountries () {
      getCountriesList().then(response => {
        this.countries = response
      })
    },
    getClients () {
      getClients().then(response => {
        this.clients = response
      })
    },
    getCompanyPremises () {
      getCompanyPremises().then(response => {
        this.isPremiseDataLoaded = true
        this.premises = response
      })
    },
    getCompanies () {
      getCompanies().then(response => {
        this.isCompanyDataLoaded = true
        this.companies = response
      })
    },
    getCompanyPremiseDevices () {
      getCompanyPremiseDevices().then(response => {
        this.isDeviceDataLoaded = true
        this.devices = response
      })
    },
    defaultPremiseFormData () {
      return {
        company_name: '',
        premise_address: '',
        premise_id: '',
        company_id: '',
        premise_name: '',
        premise_street: '',
        premise_house_number: '',
        premise_house_number_additional: '',
        premise_city: '',
        premise_post_code: '',
        premise_country_code: '',
        premise_community: '',
        premise_cadastral_number: '',
        building_number: '',
        building_section_number: '',
        special_notes: '',
        validity_date: moment().format('YYYY-MM-DD'),
        business_premise_id: ''
      }
    },
    defaultDeviceFormData () {
      return {
        company_premise_id: '',
        device_name: ''
      }
    },
    defaultCompanyFormData () {
      return {
        company_name: '',
        company_address_line_1: '',
        company_post_code: '',
        company_city: '',
        company_country_code: '',
        company_iban: '',
        company_tax_registration_number: '',
        company_vat_number: '',
        company_legal_registration_identifier: '',
        cert_file: '',
        key_file: '',
        pass_phrase: '',
        company_subject: '',
        company_issuer: '',
        company_serial: '',
        vat_payer: '',
        prm_client_id: ''
      }
    },
    editCompany (item) {
      getCompanyById(item.company_id).then(response => {
        this.companyFormData = Object.assign({}, response[0])
        this.modalCompanyShow = true
      })
    },
    removeCompany (item) {
      let index = this.companies.indexOf(item)
      this.companies.splice(index, 1)
      deleteCompany(item.company_id)
    },
    setCurrentCompanyePage () {
      this.currentCompanyPage = 1
    },
    addCompany () {
      this.setCurrentCompanyePage()
      if (this.companyFormData.company_id) {
        updateCompany(this.companyFormData.company_id, this.companyFormData).then(() => {
          this.getCompanies()
        })
      } else {
        createCompany(this.companyFormData).then(() => {
          this.getCompanies()
        })
      }
      this.companyFormData = this.defaultPremiseFormData()
    },
    cancelCompany () {
      this.companyFormData = this.defaultCompanyFormData()
    },
    editPremise (item) {
      getPremiseById(item.premise_id).then(response => {
        this.premiseFormData = Object.assign({}, response[0])
        this.premiseFormData.validity_date = moment(response[0].validity_date).format('YYYY-MM-DD')
        this.modalPremiseShow = true
      })
    },
    removePremise (item) {
      let index = this.premises.indexOf(item)
      this.premises.splice(index, 1)
      deletePremise(item.premise_id)
    },
    setCurrentPremisePage () {
      this.currentPremisePage = 1
    },
    addPremise () {
      this.setCurrentPremisePage()
      if (this.premiseFormData.premise_id) {
        updatePremise(this.premiseFormData.premise_id, this.premiseFormData).then(() => {
          this.getCompanyPremises()
        })
      } else {
        createPremise(this.premiseFormData).then(() => {
          this.getCompanyPremises()
        })
      }
      this.premiseFormData = this.defaultPremiseFormData()
    },
    checkBusinessIdUniquness () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        let businessPremiseId = { business_premise_id: this.premiseFormData.business_premise_id }
        checkBusinessIdUniquness(businessPremiseId).then(response => {
          this.isBusinessPremiseIdUnique = !response[0].exists
          console.log('unique: ' + this.isBusinessPremiseIdUnique)
        })
      }, 1000)
    },
    cancelPremise () {
      this.premiseFormData = this.defaultPremiseFormData()
    },
    cancelDevice () {
      this.deviceFormData = this.defaultDeviceFormData()
    },
    editDevice (item) {
      getPremiseDeviceById(item.device_id).then(response => {
        this.deviceFormData = Object.assign({}, response[0])
        this.modalDeviceShow = true
      })
    },
    removeDevice (item) {
      let index = this.devices.indexOf(item)
      this.devices.splice(index, 1)
      deletePremiseDevice(item.device_id)
    },
    setCurrentDevicePage () {
      this.currentDevicePage = 1
    },
    addDevice () {
      this.setCurrentDevicePage()
      if (this.deviceFormData.device_id) {
        updatePremiseDevice(this.deviceFormData.device_id, this.deviceFormData).then(() => {
          this.getCompanyPremiseDevices()
        })
      } else {
        createPremiseDevice(this.deviceFormData).then(() => {
          this.getCompanyPremiseDevices()
        })
      }
      this.deviceFormData = this.defaultDeviceFormData()
    }
  }
}
</script>
<style lang="scss">
.category-column {
  min-width: 210px !important;
}
.loading {
  padding-left: 10px;
}

.drop-down .vs__search::placeholder,
.drop-down .vs__dropdown-toggle,
.drop-down .vs__dropdown-menu {
    border-radius: 10px;
    min-height: 45px;
    min-width: 250px !important;
}
.payer-drop-down .vs__search::placeholder,
.payer-drop-down .vs__dropdown-toggle,
.payer-drop-down .vs__dropdown-menu {
    border-radius: 10px;
    min-height: 45px;
    min-width: 118px !important;
}
</style>
