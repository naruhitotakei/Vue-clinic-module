<template>
  <b-container fluid>
    <form>
      <b-row>
        <b-col lg="12">
          <iq-card body-class="p-0">
            <template v-slot:body>
              <div class="iq-edit-list">
                  <tab-nav :pills="true" class="iq-edit-profile d-flex">
                      <a id="myTab" class="nav-link show col-12 col-sm-1 col-md-2 p-0 ri-arrow-left-line" style="padding: 10px 0px !important; font-size: x-large;" @click="$router.push('/patients')" :active="false"></a>
                      <tab-nav-items class="col-12 col-sm-2 col-md-2 p-0" :active="true" href="#overview" :title="$t('EPR.overviewTab')" />
                      <tab-nav-items class="col-12 col-sm-4 col-md-2 p-0" :active="false" href="#info" :title="$t('EPR.personalInfoTab')" />
                      <tab-nav-items class="col-12 col-sm-1 col-md-2 p-0" :active="false" href="#files" :title="$t('EPR.filesTab')" />
                      <tab-nav-items class="col-12 col-sm-2 col-md-2 p-0" :active="false" href="#invoices" :title="$t('EPR.invoicesTab')" />
                      <tab-nav-items class="col-12 col-sm-2 col-md-2 p-0 mobile-border" :active="false" href="#offers" :title="$t('EPR.offersTab')" />
                  </tab-nav>
              </div>
            </template>
          </iq-card>
        </b-col>
        <b-col lg="12">
          <div class="iq-edit-list-data">
              <tab-content id="pills-tabContent-2">
                  <tab-content-item :active="true" id="overview">
                      <iq-card style="background: none;">
                          <b-row>
                              <b-col lg="4" class="pr-0 pt-2 mt-5 col-lg-4">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="user-details-block">
                                              <div class="user-profile text-center">
                                                  <img v-if="patient.gender == 'female'" src="../../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid">
                                                  <img v-else src="../../assets/images/user/08.png" alt="profile-img" class="avatar-130 img-fluid">
                                              </div>
                                              <div class="text-center mt-3">
                                                  <h4><b>{{fullName}}</b></h4>
                                              </div>
                                              <hr>
                                              <ul class="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0">
                                                  <li class="text-center">
                                                      <h4 class="counter">4</h4>
                                                      <span>{{ $t('EPR.overview.numberOfVisits') }}</span>
                                                  </li>
                                                  <li class="text-center">
                                                      <h4 class="counter">9 m, 13 d</h4>
                                                      <span>{{ $t('EPR.overview.firstVisit') }}</span>
                                                  </li>
                                              </ul>
                                              <hr>
                                              <div class="row ml-1">
                                                  <div class="col-3">{{ $t('EPR.overview.phone') }}:</div>
                                                  <div class="col-9">{{patient.phone}}</div>
                                                  <div class="col-3">{{ $t('EPR.overview.email') }}:</div>
                                                  <div class="col-9">{{patient.email}}</div>
                                                  <div class="col-3">{{ $t('EPR.overview.address') }}:</div>
                                                  <div class="col-9" v-if="patient.address_line_1">{{patient.address_line_1}}</div>
                                                  <div class="col-9" v-else>{{ $t('EPR.overview.addressUnknown') }}</div>
                                              </div>
                                          </div>
                                      </template>
                                      <div class="bg-primary pb-2 p-1" style="border-radius: 0 0 25px 25px;">
                                          <b-col md="14" class="d-flex justify-content-center">
                                              <button type="" class="btn btn-light m-2">{{ $t('EPR.overview.addAppointment') }}</button>&nbsp;
                                              <button type="" class="btn btn-light m-2">{{ $t('EPR.overview.addAssignment') }}</button>&nbsp;
                                          </b-col>
                                          <b-col class="text-center">
                                              <button type="" class="btn btn-danger">{{ $t('EPR.overview.deletePatient') }}</button>
                                          </b-col>
                                      </div>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="iq-card-header d-flex justify-content-between">
                                              <div class="iq-header-title">
                                                  <h4 class="card-title">{{ $t('EPR.overview.personalDoctors') }}</h4><hr />
                                              </div>
                                          </div>
                                          <div class="iq-card-body">
                                              <div class="row font-size-16 ">
                                                  <div class="col-6"><h6>{{ $t('EPR.overview.personalDentist') }}:</h6></div>
                                                  <div v-if="patientsDentist" class="col-6">{{patientsDentist.label}}</div>
                                                  <div class="col-6"><h6>{{ $t('EPR.overview.personalSurgeon') }}:</h6></div>
                                                  <div v-if="patientsSurgeon" class="col-6">{{patientsSurgeon.label}}</div>
                                              </div>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card body-class="iq-card-body">
                                      <template v-slot:body>
                                          <div class="iq-card-header d-flex justify-content-between">
                                              <div class="iq-header-title">
                                                  <h4 class="card-title">{{ $t('EPR.overview.files') }} (9)</h4><hr />
                                              </div>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0 font-size-12 overflow-y-scroll" style="max-height: 230px;">
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">x-ray_1.jpg</p><p>03-03-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">blood_test_1.jpg</p><p>10-03-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">imprint_1.jpg</p><p>09-03-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">imprint_2.jpg</p><p>17-04-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">x-ray_2.jpg</p><p>21-03-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">anamnesis_1.jpg</p><p>08-03-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">anamnesis_2.jpg</p><p>11-04-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">blood_test_2.jpg</p><p>21-04-2021</p></div></li>
                                                  <li class="col-md-4 col-6"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0 pb-0">x-ray_3.jpg</p><p>12-04-2021</p></div></li>
                                              </ul>
                                          </div>
                                      </template>
                                  </iq-card>
                              </b-col>
                              <b-col lg="8">
                                  <b-col md="14">
                                      <b-card class="iq-card">
                                          <b-card-title>{{ $t('EPR.overview.generalNotes') }}</b-card-title>
                                          <hr />
                                          <b-card-text style="color:black;">Opombe o pacientu.</b-card-text>
                                          <b-card-text><small class="text-muted">{{ $t('EPR.overview.generalNotesUpdated') }} 3 mins ago</small></b-card-text>
                                      </b-card>
                                  </b-col>
                                  <b-card text-variant="white"
                                          bg-variant="danger"
                                          class="iq-card">
                                      <b-card-title class="text-white">{{ $t('EPR.overview.allergies') }}</b-card-title>
                                      <blockquote class="blockquote mb-0">
                                          <p class="font-size-14">Podatki o alergijah.</p>
                                          <footer class="blockquote-footer text-white font-size-12">{{ $t('EPR.overview.allergiesUpdated') }} 2 weeks ago</footer>
                                      </blockquote>
                                  </b-card>
                                  <b-row>
                                      <b-col md="6" class="pr-0">
                                          <iq-card>
                                              <template v-slot:body>
                                                  <div class="iq-card-header d-flex justify-content-between">
                                                      <div class="iq-header-title">
                                                          <h4 class="card-title">{{ $t('EPR.overview.patientNotes') }}</h4><hr />
                                                      </div>
                                                  </div>
                                                  <ul class="list-inline m-0 overflow-y-scroll" style="max-height: 300px;">
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Zdravljenje je uspelo!</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Rana se celi</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Brez efekta</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Poseg uspel</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Zlom zalivke</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Brez efekta</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Zdravljenje je uspelo!</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Zdravljenje zoba</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">{{ $t('EPR.overview.patientNotesOpen') }}</a></div>
                                                      </li>
                                                  </ul>
                                              </template>
                                          </iq-card>
                                      </b-col>
                                      <b-col md="6">
                                          <iq-card>
                                              <template v-slot:body>
                                                  <div class="iq-card-header d-flex justify-content-between">
                                                      <div class="iq-header-title">
                                                          <h4 class="card-title">{{ $t('EPR.overview.futureAppointments') }}</h4><hr />
                                                      </div>
                                                  </div>
                                                  <ul class="iq-timeline">
                                                      <li>
                                                          <div class="timeline-dots border-success"></div>
                                                          <h6 class="">Pregled</h6>
                                                          <small class="mt-1">23 June 2021</small>
                                                      </li>
                                                  </ul>
                                              </template>
                                          </iq-card>
                                          <iq-card>
                                              <template v-slot:body>
                                                  <div class="iq-card-header d-flex justify-content-between">
                                                      <div class="iq-header-title">
                                                          <h4 class="card-title">{{ $t('EPR.overview.pastAppointments') }}</h4>
                                                          <hr />
                                                      </div>
                                                  </div>
                                                  <ul class="iq-timeline">
                                                      <li>
                                                          <div class="timeline-dots border-success"></div>
                                                          <h6 class="">Zalivka</h6>
                                                          <small class="mt-1">23 November 2019</small>
                                                      </li>
                                                      <li>
                                                          <div class="timeline-dots border-danger"></div>
                                                          <h6 class="">Beljenje zob</h6>
                                                          <small class="mt-1">20 November 2019</small>
                                                      </li>
                                                      <li>
                                                          <div class="timeline-dots border-primary"></div>
                                                          <h6 class="mb-1">Rentgen</h6>
                                                          <small class="mt-1">19 November 2019</small>
                                                      </li>
                                                  </ul>
                                              </template>
                                          </iq-card>
                                      </b-col>
                                  </b-row>
                              </b-col>
                          </b-row>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="info">
                      <iq-card style="background: none;">
                          <b-form-group class="row align-items-center /*justify-content-center*/">
                              <b-col md="12">
                                <div class="profile-img-edit">
                                    <b-img :src="user.profile_image" class="profile-pic height-150 width-150" alt="profile-pic" />
                                    <input type="hidden" v-model="user.profile_image">
                                    <div class="p-image">
                                        <div class="position-relative">
                                            <i class="ri-camera-line upload-button"></i>
                                            <b-form-file class="h-100 position-absolute upload-image" accept="image/*" @change="previewImage"></b-form-file>
                                        </div>
                                    </div>
                                </div>
                                <b-button variant="primary" @click="disabled = !disabled" class="edit-btn">{{ $t('EPR.personalInfo.edit') }}</b-button>
                              </b-col>
                          </b-form-group>
                          <b-row>
                              <b-col lg="6">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <div class="iq-header-title">
                                                  <h4 class="card-title">{{ $t('EPR.personalInfo.personalInformation') }}</h4>
                                              </div>
                                          </div>
                                          <b-row align-v="center">
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="fname">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.firstName') }}:
                                                  </template>
                                                  <ValidationProvider name="fname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="patient.name" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="lname">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.lastName') }}:
                                                  </template>
                                                  <ValidationProvider name="lname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="patient.last_name" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="dob">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.dob') }}:
                                                  </template>
                                                  <ValidationProvider name="dob" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="patient.date_of_birth" type="date" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="gender" label-class="d-block">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.gender') }}:
                                                  </template>
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabled" value="male">{{ $t('EPR.personalInfo.male') }}</b-form-radio>
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabled" value="female">{{ $t('EPR.personalInfo.female') }}</b-form-radio>
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabled" value="unspecified">{{ $t('EPR.personalInfo.unspecified') }}</b-form-radio>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="address">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.address') }}:
                                                  </template>
                                                  <b-form-input :disabled="disabled" name="address" v-model="patient.address_line_1" style="line-height: 22px;">
                                                  </b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" style="justify-content: space-between;" label-cols-sm="4" label-for="city">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.postCodeCity') }}:
                                                  </template>
                                                  <b-form-input :disabled="disabled" class="col-md-4" style="float: left;" v-model="patient.post_code" type="text"></b-form-input>
                                                  <b-form-input :disabled="disabled" class="col-md-6" style="float: right;" v-model="patient.city" type="text"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="country">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.country') }}:
                                                  </template>
                                                  <v-select :disabled="disabled" :clearable="false" :reduce="country => country.code" class="style-chooser" v-model="patient.country_id" :options="countries"></v-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="region">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.region') }}:
                                                  </template>
                                                  <v-select class="style-chooser" :clearable="false" :reduce="region => region.code" :disabled="disabled" v-model="patient.region_id" :options="filteredRegions"> </v-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="insurance">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.insurance') }}:
                                                  </template>
                                                  <b-form-input :disabled="disabled" class="col-md-5" style="float: left;" name="insurance_no" type="text" v-model="patient.insurance_no"></b-form-input>
                                                  <b-form-input :disabled="disabled" class="col-md-5" style="float: right;" name="insured_at" type="text" v-model="patient.insured_at"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="mobile_no">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.phone') }}:
                                                  </template>
                                                  <b-form-input :disabled="disabled" name="mobile_no" type="text" v-model="patient.phone"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="email">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.email') }}:
                                                  </template>
                                                  <b-form-input :disabled="disabled" name="email" type="text" v-model="patient.email"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="tax_no">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.taxNumber') }}:
                                                  </template>
                                                  <b-form-input :disabled="disabled" name="tax_no" type="text" v-model="patient.tax_registration_number"></b-form-input>
                                              </b-form-group>
                                          </b-row>
                                      </template>
                                  </iq-card>
                              </b-col>
                              <b-col lg="6">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <h4>{{ $t('EPR.personalInfo.allergiesAndSensitivites') }}</h4>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <textarea :disabled="disabled" style="line-height: 30px;" v-model="user.allergies" class="textarea form-control" rows="7"></textarea>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <h4>{{ $t('EPR.personalInfo.generalNotes') }}</h4>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <textarea :disabled="disabled" style="line-height: 30px;" v-model="user.reminder" class="textarea form-control" rows="7"></textarea>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <h4>{{ $t('EPR.personalInfo.personalDoctors') }}</h4>
                                              <hr />
                                          </div>
                                          <div class="iq-card-body">
                                              <div class="row">
                                                <b-form-group class="col-md-12" label-cols-sm="3" label-for="region">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.personalDentist') }}:
                                                  </template>
                                                <v-select :disabled="disabled" :clearable="false" :reduce="dentist => dentist.code" class="style-chooser" v-model="patient.prm_dentist_user_id" :options="dentists"></v-select>
                                                </b-form-group>
                                                <b-form-group class="col-md-12" label-cols-sm="3" label-for="region">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.personalSurgeon') }}:
                                                  </template>
                                                <v-select :disabled="disabled" :clearable="false" :reduce="dentist => dentist.code" class="style-chooser" v-model="patient.prm_surgeon_user_id" :options="dentists"></v-select>
                                                </b-form-group>
                                              </div>
                                          </div>
                                      </template>
                                  </iq-card>
                              </b-col>
                          </b-row>
                          <div class="text-center p-1" v-if="!disabled">
                              <b-button style="padding: 5px 25px;" @click="submitData()" variant="primary" class="mr-2">Submit</b-button>
                              <b-button style="padding: 5px 25px;" v-b-modal.modal-1 variant="none" class="iq-bg-danger">Cancel</b-button>
                              <b-modal id="modal-1" ok-title="OK" cancel-title="Cancel" @ok="(resetForm()), (disabled = (disabled + 1) % 2)">
                                  <h4 class="my-4 card-title text-center">Are you sure you want to the<br>discard changes?</h4>
                              </b-modal>
                              <b-modal ref="my-modal" ok-only ok-variant="primary" ok-title="OK">
                                  <div class="text-center">
                                      <i class="ri-error-warning-fill ri-4x" style="color: #d84a45;"></i>
                                      <h4 class="my-4 card-title text-center">Unable to save changes, please try again</h4>
                                  </div>
                              </b-modal>
                          </div>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="files">
                      <iq-card body-class="iq-card-body">
                          <template v-slot:headerTitle>
                              <h3 class="card-title" style="margin-top: 10px;">{{ $t('EPR.filesHeader') }}</h3>
                              <div class="btn-add-patient">
                                  <b-button variant="primary" @click="add_file"><i class="ri-add-line mr-2"></i>{{ $t('EPR.files.addFile') }}</b-button>
                              </div>
                              <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                                  <div class="iq-search-bar">
                                      <form action="#" class="searchbox">
                                          <input type="text" class="text search-input" placeholder="Search" @keyup="myFunction($event.target.value)">
                                          <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                      </form>
                                  </div>
                                  <iq-card>
                                      <b-form-group label-for="searchOptions">
                                          <template slot="label">
                                              {{ $t('EPR.files.searchBy') }}:
                                          </template>
                                          <b-form-select plain
                                                         v-model="selected"
                                                         :options="searchOptions"
                                                         id="searchOptions"
                                                         @change="searchFunction($event)">
                                          </b-form-select>
                                      </b-form-group>
                                  </iq-card>
                              </div>
                          </template>
                          <template v-slot:body>
                              <div class="iq-card-body">
                                  <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 1</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 2</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 3</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 4</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 5</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 6</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 7</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 8</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 9</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">{{ $t('EPR.files.fileName') }}: File 9</p><p>{{ $t('EPR.files.fileCreatedAt') }}: 03-03-2021</p></div></li>
                                  </ul>
                              </div>
                          </template>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="invoices">
                      <iq-card>
                          <template v-slot:headerTitle>
                              <h3 class="card-title" style="margin-top: 10px;">
                                  {{ $t('EPR.invoices.invoicesHeader') }}<span class="float-right">
                                      <b-button variant="primary" @click="addInvoice"><i class="ri-add-line mr-2"></i>{{ $t('EPR.invoices.addInvoice') }}</b-button>
                                  </span>
                              </h3>
                          </template>
                          <template v-slot:body>
                              <b-row>
                                  <b-col md="12" class="table-responsive">
                                      <b-table id="patient-invoices"
                                               bordered
                                               hover
                                               @row-clicked="invoiceSelected"
                                               style="cursor: pointer;"
                                               :items="invoiceItems"
                                               :fields="columnsInvoices"
                                               :per-page="invoicesPerPage"
                                               :current-page="currentInvoicePage">
                                      </b-table>
                                  </b-col>
                              </b-row>
                              <template>
                                  <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                                  <div class="mt-3">
                                      <b-pagination v-model="currentInvoicePage"
                                                    :total-rows="invoiceItems.length"
                                                    :per-page="invoicesPerPage"
                                                    aria-controls="patient-invoices"></b-pagination>
                                  </div>
                              </template>
                          </template>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="offers">
                      <iq-card>
                          <template v-slot:headerTitle>
                              <h3 class="card-title" style="margin-top: 10px;">
                                  {{ $t('EPR.offers.offersHeader') }}<span class="float-right">
                                      <b-button variant="primary" @click="addOffer"><i class="ri-add-line mr-2"></i>{{ $t('EPR.offers.addOffer') }}</b-button>
                                  </span>
                              </h3>
                          </template>
                          <template v-slot:body>
                              <b-row>
                                  <b-col md="12" class="table-responsive">
                                      <b-table id="patient-offers"
                                               bordered
                                               hover
                                               @row-clicked="$router.push('/extra-pages/invoice-example')"
                                               style="cursor: pointer;"
                                               :items="offerItems"
                                               :fields="columnsOffers"
                                               :per-page="offersPerPage"
                                               :current-page="currentOfferPage">
                                      </b-table>
                                  </b-col>
                              </b-row>
                              <template>
                                  <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                                  <div class="mt-3">
                                      <b-pagination v-model="currentOfferPage"
                                                    :total-rows="offerItems.length"
                                                    :per-page="offersPerPage"
                                                    aria-controls="patient-offers"></b-pagination>
                                  </div>
                              </template>
                          </template>
                      </iq-card>
                  </tab-content-item>
              </tab-content>
          </div>
        </b-col>
      </b-row>
    </form>
    <b-toast id="b-toaster-bottom-right" variant="primary" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ $t('EPR.notification') }}</strong>
        </div>
      </template>
      <template #default>
          <span><i class="ri-checkbox-circle-line"></i>  {{ $t('EPR.changesSaved') }}</span>
      </template>
    </b-toast>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { getEnquiryById, updateEnquiry } from '../../services/enquiry'
import { getInvoices } from '../../services/invoice'
import { getDentists } from '../../services/userService'
import { getCountriesList, getRegionsList } from '../../services/commonCodeLists'
import moment from 'moment'

var rowsOffers = [
  {
    offer_no: 'offer112',
    date: '28.03.2021-12:00',
    issued_by: 'Dr. Bojan Jernejc',
    amount: '300 EUR'
  }
]
export default {
  name: 'ViewPatient',
  mounted () {
    xray.index()
    this.getPatient(this.patientId)
    this.getInvoices()
    this.getCountries()
    this.getRegions()
    this.getDentists()
  },
  computed: {
    fullName () {
      return this.patient.name + ' ' + this.patient.last_name
    },
    filteredRegions () {
      return this.regions.filter((item) => {
        return item.country_id === this.patient.country_id
      })
    },
    patientsDentist: function () {
      return this.dentists.find((item) => {
        return item.code === this.patient.prm_dentist_user_id
      })
    },
    patientsSurgeon: function () {
      return this.dentists.find((item) => {
        return item.code === this.patient.prm_dentist_user_id
      })
    }
  },
  data () {
    return {
      patientId: this.$route.params.patientId,
      patient: {},
      dentists: [],
      invoiceItems: [],
      offerItems: rowsOffers,
      currentInvoicePage: 1,
      invoicesPerPage: 10,
      currentOfferPage: 1,
      offersPerPage: 10,
      dropDownText: '',
      selected: this.value,
      searchOptions: [
        { value: 'file_name', text: this.$t('EPR.files.fileName') },
        { value: 'created_at', text: this.$t('EPR.files.fileCreatedAt') }
      ],
      disabled: true,
      doctor: {
        profile: require('../../assets/images/user/1.jpg')
      },
      user: {
        profile_image: require('../../assets/images/user/11.png'),
        fname: 'Anita',
        lname: 'Jereb',
        dob: '1979-04-21',
        gender: 'female',
        address: 'Prva ulica 11',
        postcode: '1000',
        city: 'Ljubljana',
        country: 'Slovenia',
        citizenship: 'Slovenian',
        region: 'Sl-unknown',
        insurance_no: '1534667',
        insured_at: 'Zavarovalnica Triglav',
        mob_no: '+38640076191',
        tax_no: '9877645677',
        email: 'anita.jereb@staging.emazing.si',
        mobile_no: '+38640076191',
        location: 'Ljubljana',
        edited_date: Date.now(),
        allergies: 'Type, cause, symptom, note, date, change , doctor...',
        reminder: 'The patient has very sensitive gums, careful not to cause bleeding...',
        surgeon: 'Dr. Nika Klemenc',
        dentist: 'Dr. Miha Breznik',
        background: require('../../assets/images/page-img/profile-bg.jpg'),
        profile: require('../../assets/images/user/11.png')
      },
      countries1: [
        { code: 1, label: 'Slovenia' },
        { code: 2, label: 'Italy' },
        { code: 3, label: 'Austria' },
        { code: 4, label: 'Afghanistan' }
      ],
      countries: [],
      regions: [],
      columnsInvoices: [
        { label: this.$t('EPR.invoicesColumn.no'), key: 'invoice_number', class: 'text-left' },
        {
          label: this.$t('EPR.invoicesColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('YYYY-MM-DD')
          }
        },
        { label: this.$t('EPR.invoicesColumn.issuedBy'), key: 'company_name', class: 'text-left' },
        { label: this.$t('EPR.invoicesColumn.amount'), key: 'total_with_vat', class: 'text-left' },
        { label: this.$t('EPR.invoicesColumn.status'),
          key: 'status',
          class: 'text-left',
          formatter: (value, key, item) => {
            if (item.paid_amount === '$0.00') {
              return 'Unpaid'
            }
            return item.total_with_vat === item.paid_amount ? 'Paid' : 'Partialy Paid'
          }
        }
      ],
      columnsOffers: [
        { label: this.$t('EPR.offersColumn.no'), key: 'offer_no', class: 'text-left' },
        { label: this.$t('EPR.offersColumn.date'), key: 'date', class: 'text-left' },
        { label: this.$t('EPR.offersColumn.issuedBy'), key: 'issued_by', class: 'text-left' },
        { label: this.$t('EPR.offersColumn.amount'), key: 'amount', class: 'text-left' }
      ]
    }
  },
  methods: {
    getPatient (id) {
      getEnquiryById(id).then(response => {
        this.patient = response[0]
        if (this.patient.date_of_birth !== null) {
          this.patient.date_of_birth = moment(this.patient.date_of_birth).format('YYYY-MM-DD')
        }
      }
      )
    },
    getInvoices () {
      getInvoices().then(response => {
        this.invoiceItems = response
      })
    },
    getDentists () {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    getCountries () {
      getCountriesList().then(response => {
        this.countries = response
      })
    },
    getRegions () {
      getRegionsList().then(response => {
        this.regions = response
      })
    },
    invoiceSelected (item) {
      this.$router.push({ path: `/documents/invoices/${item.invoice_number}` })
    },
    default () {
      return {
        invoice_no: this.rowsInvoices.length,
        amount: '',
        issued_by: '',
        status: '',
        date: '',
        offer_no: this.rowsOffers.length
      }
    },
    addInvoice () {
      this.$router.push('/extra-pages/new-invoice')
    },
    updatePatient () {
      updateEnquiry(this.patientId, this.patient).then(() => {
        console.log('Successful update')
        this.$bvToast.show('b-toaster-bottom-right')
      }).catch(errorMsg => {
        console.log('Error: ' + errorMsg)
      })
    },
    addOffer () {

    },
    searchFunction (event) {
      this.dropDownText = event
      console.log('SEARCHBY OPTION:', event)
      console.log('DROPDOWN:', this.dropDownText)
      return event
    },
    add_file () {
      console.log('Add file clicked')
    },
    myFunction (event) {
      console.log('evemt', event)
      console.log('DROPDOWN:', this.dropDownText)

      // if (this.dropDownText) {
      //   var sorted = rows.filter((item) => {
      //     return item[this.dropDownText].toLowerCase().includes(event.toLowerCase())
      //   })
      //   this.paginatedItems = sorted
      // }
      // console.log('sorted', sorted)
    },
    resetForm () {
      this.user = {
        profile_image: require('../../assets/images/user/11.png'),
        fname: 'Anita',
        lname: 'Jereb',
        dob: '1979-04-21',
        gender: 'female',
        address: 'Prva ulica 11',
        postcode: '1000',
        city: 'Ljubljana',
        country: 'Slovenia',
        citizenship: 'Slovenian',
        region: 'Sl-unknown',
        insurance_no: '1534667',
        insured_at: 'Zavarovalnica Triglav',
        mob_no: '+38640076191',
        tax_no: '9877645677',
        email: 'anita.jereb@staging.emazing.si',
        mobile_no: '+38640076191',
        location: 'Ljubljana',
        edited_date: Date.now(),
        allergies: 'Type, cause, symptom, note, date, change , doctor...',
        reminder: 'The patient has very sensitive gums, careful not to cause bleeding...',
        surgeon: 'Dr. Nika Klemenc',
        dentist: 'Dr. Miha Breznik',
        background: require('../../assets/images/page-img/profile-bg.jpg'),
        profile: require('../../assets/images/user/11.png')
      }
      console.log('RESET FORM', this.user)
    },
    submitData () {
      this.disabled = true
      this.updatePatient()
      // this.$refs['my-modal'].show() prikazi modal ukoliko dodje do greske neke
    },
    previewImage: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.user.profile_image = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    }
  }
}
</script>

<style lang="scss">
.upload-image {
    margin-left: -25px;
    opacity: 0;
}
.upload-image .custom-file-label {
    cursor: pointer;
}

.edit-btn {
    float: right;
    margin-top: 6.825rem !important;
    margin-left: 50px !important;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    border-radius: 10px;
    min-height: 45px;
}

.vs--disabled .vs__dropdown-toggle, .vs--disabled .vs__clear, .vs--disabled .vs__search, .vs--disabled .vs__selected, .vs--disabled .vs__open-indicator {
    background-color: #e9ecef !important;
    margin-top: 4px;
}

@media (max-width: 576px) {
  .mobile-border a {
    border-radius: 0 0 15px 15px !important;
  }
}
</style>
