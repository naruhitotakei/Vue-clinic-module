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
                                                      <h4 class="counter">{{pastAppointments.length}}</h4>
                                                      <span>{{ $t('EPR.overview.numberOfVisits') }}</span>
                                                  </li>
                                                  <li class="text-center">
                                                      <h4 class="counter">{{timeSinceFirstVisit | fromNowDate}}</h4>
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
                                              <button type="" class="btn btn-light m-1 ">{{ $t('EPR.overview.addAppointment') }}</button>&nbsp;
                                              <button type="" class="btn btn-light m-1" @click.prevent="modalAssigmentShow = true">{{ $t('EPR.overview.addAssignment') }}</button>&nbsp;
                                              <button type="button" @click="addInvoice" class="btn btn-light m-1">{{ $t('EPR.overview.addInvoice') }}</button>
                                          </b-col>
                                          <b-col class="text-center">
                                              <button type="" class="btn btn-danger mt-3">{{ $t('EPR.overview.deletePatient') }}</button>
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
                                                  <div class="col-12 col-sm-7"><h6>{{ $t('EPR.overview.personalDentist') }}:</h6></div>
                                                  <div v-if="patientsDentist" class="col-12 col-sm-5">{{patientsDentist.label}}</div>
                                                  <div v-if="!patientsDentist" class="col-5">{{ $t('EPR.overview.notSelected') }}</div>
                                                  <div class="col-7"><h6>{{ $t('EPR.overview.personalSurgeon') }}:</h6></div>
                                                  <div v-if="patientsSurgeon" class="col-12 col-sm-5">{{patientsSurgeon.label}}</div>
                                                  <div v-if="!patientsSurgeon" class="col-5">{{ $t('EPR.overview.notSelected') }}</div>
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
                                      <b-card class="iq-card" v-if="patient.general_notes">
                                          <b-card-title>{{ $t('EPR.overview.generalNotes') }}</b-card-title>
                                          <hr />
                                          <b-card-text style="color:black;">{{patient.general_notes}}</b-card-text>
                                          <b-card-text><small class="text-muted">{{ $t('EPR.overview.generalNotesUpdated') }} {{patient.general_notes_updated_at | fromNowDate}}</small></b-card-text>
                                      </b-card>
                                  </b-col>
                                  <b-card
                                      v-if="patient.allergies"
                                      text-variant="white"
                                      bg-variant="danger"
                                      class="iq-card">
                                      <b-card-title class="text-white">{{ $t('EPR.overview.allergies') }}</b-card-title>
                                      <blockquote class="blockquote mb-0">
                                          <p class="font-size-14">{{patient.allergies}}</p>
                                          <footer class="blockquote-footer text-white font-size-12">{{ $t('EPR.overview.allergiesUpdated') }} {{patient.allergies_updated_at | fromNowDate}}</footer>
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
                                                      <li v-for="(note,index) in notes" :key="index + note.created_at" class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>{{note.content}}</h6>
                                                              <p class="mb-0">{{note.created_at | formatDate}}</p>
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
                                                <h4 class="card-title">{{ $t('EPR.overview.openAssignments') }}</h4><hr />
                                              </div>
                                            </div>
                                            <ul class="list-inline m-0 overflow-y-scroll" style="max-height: 300px;">
                                              <li v-for="(item,index) in openAssignments" :key="index + item.due_at" class="d-flex align-items-center justify-content-between mb-3">
                                                <div>
                                                  <h6>{{item.todoname}}</h6>
                                                  <p class="mb-0">{{item.due_at | formatDate}}</p>
                                                </div>
                                              </li>
                                            </ul>
                                          </template>
                                        </iq-card>
                                          <iq-card>
                                              <template v-slot:body>
                                                  <div class="iq-card-header d-flex justify-content-between">
                                                      <div class="iq-header-title">
                                                          <h4 class="card-title">{{ $t('EPR.overview.futureAppointments') }}</h4><hr />
                                                      </div>
                                                  </div>
                                                  <ul class="iq-timeline">
                                                      <li v-for="(item,index) in futureAppointments" :key="index + item.date">
                                                          <div class="timeline-dots border-success"></div>
                                                          <h6 class="">{{item.kind}}</h6>
                                                          <small class="mt-1">{{item.date | formatDate}}</small>
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
                                                      <li v-for="(item,index) in pastAppointments" :key="index">
                                                          <div class="timeline-dots border-success"></div>
                                                          <h6>{{item.kind}}</h6>
                                                          <small class="mt-1">{{item.date | formatDate}}</small>
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
                                    <b-img :src="user.profile_image" class="profile-pic height-150 width-150 object-fit" alt="profile-pic" />
                                    <input type="hidden" v-model="user.profile_image">
                                    <div class="p-image">
                                        <div class="position-relative">
                                            <i class="ri-camera-line upload-button"></i>
                                            <b-form-file class="h-100 position-absolute upload-image" accept="image/*" @change="previewImage"></b-form-file>
                                        </div>
                                    </div>
                                </div>
                                <b-button variant="primary" :disabled="!disabled" @click="editPatient" class="edit-btn">{{ $t('EPR.personalInfo.edit') }}</b-button>
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
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="fname" :label="$t('EPR.personalInfo.firstName')">
                                                  <ValidationProvider name="fname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="patient.name" type="text" class="form-control-disabled" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="lname" :label="$t('EPR.personalInfo.lastName')">
                                                  <ValidationProvider name="lname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="patient.last_name" type="text" class="form-control-disabled" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="dob" :label="$t('EPR.personalInfo.dob')">
                                                  <ValidationProvider name="dob" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="patient.date_of_birth" type="date" class="form-control-disabled" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="gender" label-class="d-block" :label="$t('EPR.personalInfo.gender')">
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabled" value="male">{{ $t('EPR.personalInfo.male') }}</b-form-radio>
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabled" value="female">{{ $t('EPR.personalInfo.female') }}</b-form-radio>
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabled" value="unspecified">{{ $t('EPR.personalInfo.unspecified') }}</b-form-radio>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="address" :label="$t('EPR.personalInfo.address')">
                                                  <b-form-input :disabled="disabled" name="address" class="form-control-disabled" v-model="patient.address_line_1" style="line-height: 22px;">
                                                  </b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" style="justify-content: space-between;" label-cols-sm="4" label-for="city" :label="$t('EPR.personalInfo.postCodeCity')">
                                                  <b-form-input :disabled="disabled" class="col-md-4 form-control-disabled" style="float: left;" v-model="patient.post_code" type="text"></b-form-input>
                                                  <b-form-input :disabled="disabled" class="col-md-6 form-control-disabled" style="float: right;" v-model="patient.city" type="text"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="country" :label="$t('EPR.personalInfo.country')">
                                                  <v-select :disabled="disabled" :clearable="false" :reduce="country => country.code" class="style-chooser form-control-disabled" v-model="patient.country_id" :options="countries"></v-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="region" :label="$t('EPR.personalInfo.region')">
                                                  <v-select class="style-chooser form-control-disabled" :clearable="false" :reduce="region => region.code" :disabled="disabled" v-model="patient.region_id" :options="filteredRegions"> </v-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="insurance" :label="$t('EPR.personalInfo.insurance')">
                                                  <b-form-input :disabled="disabled" class="col-md-5 form-control-disabled" style="float: left;" name="insurance_no" type="text" v-model="patient.insurance_no"></b-form-input>
                                                  <b-form-input :disabled="disabled" class="col-md-5 form-control-disabled" style="float: right;" name="insured_at" type="text" v-model="patient.insured_at"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="mobile_no" :label="$t('EPR.personalInfo.phone')">
                                                  <b-form-input :disabled="disabled" name="mobile_no" type="text" class="form-control-disabled" v-model="patient.phone"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="email" :label="$t('EPR.personalInfo.email')">
                                                  <b-form-input :disabled="disabled" name="email" type="text" class="form-control-disabled" v-model="patient.email"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="tax_no" :label="$t('EPR.personalInfo.taxNumber')">
                                                  <b-form-input :disabled="disabled" name="tax_no" type="text" class="form-control-disabled" v-model="patient.tax_registration_number"></b-form-input>
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
                                              <textarea :disabled="disabled" style="line-height: 30px;" v-model="patient.allergies" class="textarea form-control form-control-disabled" rows="7"></textarea>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <h4>{{ $t('EPR.personalInfo.generalNotes') }}</h4>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <textarea :disabled="disabled" style="line-height: 30px;" v-model="patient.general_notes" class="textarea form-control form-control-disabled" rows="7"></textarea>
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
                                                <v-select :disabled="disabled" :clearable="false" :reduce="dentist => dentist.code" class="style-chooser form-control-disabled" v-model="patient.prm_dentist_user_id" :options="dentists"></v-select>
                                                </b-form-group>
                                                <b-form-group class="col-md-12" label-cols-sm="3" label-for="region">
                                                  <template slot="label">
                                                      {{ $t('EPR.personalInfo.personalSurgeon') }}:
                                                  </template>
                                                <v-select :disabled="disabled" :clearable="false" :reduce="dentist => dentist.code" class="style-chooser form-control-disabled" v-model="patient.prm_surgeon_user_id" :options="surgeons"></v-select>
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
                              <b-modal id="modal-1" ok-title="OK" cancel-title="Cancel" @ok="cancelEditingPatient">
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
                                  <h3 class="card-title mt-3 mb-2">{{ $t('EPR.filesHeader') }}</h3>
                                  <div class="btn-add-patient mt-2">
                                      <b-button variant="primary" @click="add_file"><i class="ri-add-line mr-2"></i>{{ $t('EPR.files.addFile') }}</b-button>
                                  </div>
                                  <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                                      <h5 class="mt-2">{{ $t('EPR.files.sortBy') }}</h5>
                                      <div class="mt-4 ml-3">
                                          <b-form-group label-for="sortOptions">
                                            <v-select class="patients" label="text" taggable :clearable="false" id="select"
                                                        :options="sortOptions" v-model="sortBy">
                                                <template v-slot:option="option">
                                                 <div class="row justify-content-between">
                                                   {{option.text}}
                                                   <i :class="{'ri-arrow-up-s-line': option.sort === 'asc', 'ri-arrow-down-s-line': option.sort === 'desc',}"></i>
                                                 </div>
                                                </template>
                                              </v-select>
                                          </b-form-group>
                                      </div>
                                  </div>
                              </template>
                              <template v-slot:body>
                                  <div class="iq-card-body">
                                      <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                          <li class="col-md-4 col-6 pb-3" v-for="(file, index) in filesSortBy" :key="index + file.created_at">
                                              <img :src="file.image" alt="gallary-image" class="img-fluid">
                                              <div class="text-center">
                                                  <p class="mb-0">{{ $t('EPR.files.fileName') }}: {{file.name}}</p>
                                                  <p class="mb-0">{{ $t('EPR.files.fileType') }}: {{file.type}}</p>
                                                  <p>{{ $t('EPR.files.fileCreatedAt') }}: {{file.created_at}}</p>
                                              </div>
                                          </li>
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
                                               :items="invoices"
                                               :fields="columnsInvoices"
                                               :per-page="invoicesPerPage"
                                               :current-page="currentInvoicePage">
                                      </b-table>
                                  </b-col>
                              </b-row>
                              <template>
                                  <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                                  <div class="mt-3">
                                      <b-pagination
                                        v-if="hideInvoicesPagination"
                                        v-model="currentInvoicePage"
                                        :total-rows="invoices.length"
                                        :per-page="invoicesPerPage"
                                        aria-controls="patient-invoices">
                                      </b-pagination>
                                  </div>
                              </template>
                          </template>
                      </iq-card>
                      <iq-card>
                          <template v-slot:body>
                              <h5 class="card-title">{{ $t('EPR.invoices.servicesSummary') }}</h5>
                              <b-table small
                                       id="patient-services"
                                       :items="services"
                                       :fields="servicesSummaryColumns"
                                       :per-page="servicesPerPage"
                                       :current-page="currentServicesPage"></b-table>
                          </template>
                          <template>
                              <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                              <div class="ml-4 pb-2">
                                  <b-pagination
                                    v-if="hideSummaryPagination"
                                    v-model="currentServicesPage"
                                    :total-rows="services.length"
                                    :per-page="servicesPerPage"
                                    aria-controls="patient-services">
                                    </b-pagination>
                              </div>
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
                                               :items="offers"
                                               :fields="columnsOffers"
                                               :per-page="offersPerPage"
                                               :current-page="currentOfferPage">
                                      </b-table>
                                  </b-col>
                              </b-row>
                              <template>
                                  <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                                  <div class="mt-3">
                                      <b-pagination
                                        v-if="hideOffersPagination"
                                        v-model="currentOfferPage"
                                        :total-rows="offers.length"
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
    <b-modal
        v-model="modalAssigmentShow"
        no-close-on-backdrop
        size="md"
        :ok-disabled="isOkDisabled"
        :title="$t('assignments.addAssignmentsModal.addAssignments')"
        :ok-title="$t('assignments.addAssignmentsModal.save')"
        :cancel-title="$t('assignments.addAssignmentsModal.close')"
        @ok="addAssignments"
        @close="cancelAssignments"
        @cancel="cancelAssignments"
    >
      <form>
        <div class="form-row">
          <div class="col-md-12 mb-3" v-if="users">
            <label for="title">{{ $t('assignments.addAssignmentsModal.users') }} *</label>
            <v-select
                taggable
                :clearable="false"
                :getOptionLabel="getOptionLabel"
                :options="users || []"
                v-model="formData.user"
                @input="selectedUser"
            >
            </v-select>
          </div>
          <div class="col-md-12 mb-3">
            <label for="title">{{ $t('assignments.addAssignmentsModal.description') }} *</label>
            <div style="display: flex;">
              <textarea type="text" v-model="formData.description" class="form-control" placeholder="Description"/>
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <label for="title">{{ $t('assignments.addAssignmentsModal.due_at') }} </label>
            <b-form-input class="date" id="exampleInputdate" type="date" v-model="formData.due_at" ></b-form-input>
          </div>
        </div>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { getEnquiryById, updateEnquiry, getEnquiryNotes, getEnquiryAppointments, getEnquiryInvoices, getEnquiryOffers, getEnquiryServices } from '../../services/enquiry'
import { getDentists, getSurgeons } from '../../services/userService'
import { getCountriesList, getRegionsList } from '../../services/commonCodeLists'
import { getUsers } from '@/services/userService'
import moment from 'moment'
import { createAssignments, getAssignments } from '@/services/assignmentsService'

export default {
  name: 'ViewPatient',
  mounted () {
    xray.index()
    this.getPatient(this.patientId)
    this.getPatientNotes(this.patientId)
    this.getPatientAppointments(this.patientId)
    this.getCountries()
    this.getRegions()
    this.getDentists()
    this.getSurgeons()
    this.getPatientInvoices(this.patientId)
    this.getPatientOffers(this.patientId)
    this.getPatientServices(this.patientId)
    this.getUsers()
    this.getAssignments()
  },
  computed: {
    isOkDisabled () {
      return !this.formData.due_at || !this.formData.description
    },
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
      return this.surgeons.find((item) => {
        return item.code === this.patient.prm_surgeon_user_id
      })
    },
    openAssignments: function () {
      return this.assignments
    },
    futureAppointments: function () {
      return this.appointments.filter((item) => {
        return this.filterAppointments(item)
      })
    },
    pastAppointments: function () {
      return this.appointments.filter((item) => {
        return !this.filterAppointments(item)
      }).reverse()
    },
    hideInvoicesPagination () {
      return Math.floor(this.invoices.length / this.invoicesPerPage) !== 0
    },
    hideOffersPagination () {
      return Math.floor(this.offers.length / this.offersPerPage) !== 0
    },
    hideSummaryPagination () {
      return Math.floor(this.services.length / this.servicesPerPage) !== 0
    },
    filesSortBy () {
      if (this.sortBy === '') {
        let files = [...this.files]
        return files.sort((a, b) => {
          if (new Date(a.created_at) < new Date(b.created_at)) return -1
          if (new Date(a.created_at) > new Date(b.created_at)) return 1
          return 0
        })
      }
      if (this.sortBy.value === 'name') {
        let files = [...this.files]
        return files.sort((a, b) => {
          let nameA = a.name.toLowerCase()
          let nameB = b.name.toLowerCase()
          if (this.sortBy.sort === 'asc') {
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
          } else {
            if (nameA > nameB) return -1
            if (nameA < nameB) return 1
            return 0
          }
        })
      }
      if (this.sortBy.value === 'created_at') {
        let files = [...this.files]
        return files.sort((a, b) => {
          if (this.sortBy.sort === 'asc') {
            return moment(b.created_at, 'DD.MM.YY') - moment(a.created_at, 'DD.MM.YY')
          } else {
            return moment(a.created_at, 'DD.MM.YY') - moment(b.created_at, 'DD.MM.YY')
          }
        })
      }
      if (this.sortBy.value === 'type') {
        let files = [...this.files]
        return files.sort((a, b) => {
          let typeA = a.type.toLowerCase()
          let typeB = b.type.toLowerCase()
          if (this.sortBy.sort === 'asc') {
            if (typeA < typeB) return -1
            if (typeA > typeB) return 1
            return 0
          } else {
            if (typeA > typeB) return -1
            if (typeA < typeB) return 1
            return 0
          }
        })
      }
      return this.files
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
  data () {
    return {
      patientId: this.$route.params.patientId,
      modalAssigmentShow: false,
      users: [],
      patient: {},
      tempPatient: {},
      notes: [],
      assignments: [],
      appointments: [],
      timeSinceFirstVisit: '',
      dentists: [],
      surgeons: [],
      filter: '',
      invoices: [],
      services: [],
      offers: [],
      formData: {
        enquiry: {
          id: +this.$route.params.patientId
        },
        description: '',
        due_at: null,
        user: {}
      },
      currentInvoicePage: 1,
      invoicesPerPage: 10,
      currentOfferPage: 1,
      offersPerPage: 10,
      currentServicesPage: 1,
      servicesPerPage: 10,
      dropDownText: '',
      selected: this.value,
      sortBy: '',
      sortOptions: [
        { value: 'name', text: this.$t('EPR.files.fileName'), sort: 'asc' },
        { value: 'name', text: this.$t('EPR.files.fileName'), sort: 'desc' },
        { value: 'type', text: this.$t('EPR.files.fileType'), sort: 'asc' },
        { value: 'type', text: this.$t('EPR.files.fileType'), sort: 'desc' },
        { value: 'created_at', text: this.$t('EPR.files.fileCreatedAt'), sort: 'asc' },
        { value: 'created_at', text: this.$t('EPR.files.fileCreatedAt'), sort: 'desc' }
      ],
      files: [
        { image: require('../../assets/images/login/1.png'), name: 'File 2', type: 'Rentgen', created_at: '21.04.2021' },
        { image: require('../../assets/images/login/2.png'), name: 'File 4', type: 'Krvna slika', created_at: '17.04.2021' },
        { image: require('../../assets/images/login/3.png'), name: 'File 5', type: 'Rentgen', created_at: '11.04.2021' },
        { image: require('../../assets/images/login/1.png'), name: 'File 1', type: 'Anamneza', created_at: '10.04.2021' },
        { image: require('../../assets/images/login/2.png'), name: 'File 9', type: 'Rentgen', created_at: '03.04.2021' },
        { image: require('../../assets/images/login/3.png'), name: 'File 7', type: 'Krvna Slika', created_at: '21.03.2021' },
        { image: require('../../assets/images/login/1.png'), name: 'File 6', type: 'Rentgen', created_at: '17.03.2021' },
        { image: require('../../assets/images/login/2.png'), name: 'File 3', type: 'Anamneza', created_at: '12.03.2021' },
        { image: require('../../assets/images/login/3.png'), name: 'File 8', type: 'Rentgen', created_at: '08.03.2021' }
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
        { label: this.$t('EPR.invoicesColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
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
      servicesSummaryColumns: [
        { label: this.$t('EPR.servicesSummaryColumn.serviceTitle'), key: 'name', class: 'text-left' },
        {
          label: this.$t('EPR.servicesSummaryColumn.serviceDate'),
          key: 'done_at',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('DD.MM.YYYY')
          }
        },
        {
          label: this.$t('EPR.servicesSummaryColumn.servicePrice'),
          key: 'price',
          class: 'text-left',
          formatter: value => {
            return value + '0 EUR'
          }
        },
        { label: this.$t('EPR.servicesSummaryColumn.paymentMethod'), key: 'payment_method', class: 'text-left' }
      ],
      columnsOffers: [
        { label: this.$t('EPR.offersColumn.no'), key: 'invoice_number', class: 'text-left' },
        {
          label: this.$t('EPR.offersColumn.date'),
          key: 'invoice_time',
          class: 'text-left',
          formatter: value => {
            return moment(value).format('DD/MM/YYYY')
          }
        },
        { label: this.$t('EPR.offersColumn.issuedBy'), key: 'operator_name', class: 'text-left' },
        { label: this.$t('EPR.offersColumn.amount'), key: 'total_with_vat', class: 'text-left' }
      ]
    }
  },
  methods: {
    selectedUser (val) {
      console.log('selected', val)
    },
    getOptionLabel (option) {
      return (option && option.name) || ''
    },
    createBillingDetails () {
      let details = ''
      if (this.patient.name) details += this.patient.name
      if (this.patient.last_name) details += ' ' + this.patient.last_name
      details += '<br>'
      if (this.patient.address_line_1) details += this.patient.address_line_1 + '<br>'
      if (this.patient.post_code) details += this.patient.post_code
      if (this.patient.city) details += ' ' + this.patient.city
      if (this.patient.country) details += ', ' + this.patient.country
      details += '<br>'
      if (this.patient.phone) details += 'Telefon: ' + this.patient.phone + '<br>'
      if (this.patient.email) details += 'Email: ' + this.patient.email
      return details
    },
    filterAppointments (appointment) {
      let currentDate = moment()
      let date = moment(appointment.date).format('YYYY-MM-DD')
      if (appointment.time !== null) {
        date += ' ' + appointment.time
      }
      return moment(date).isAfter(currentDate)
    },
    getPatient (id) {
      getEnquiryById(id).then(response => {
        this.patient = response[0]
        if (this.patient.date_of_birth !== null) {
          this.patient.date_of_birth = moment(this.patient.date_of_birth).format('YYYY-MM-DD')
        }
      }
      )
    },
    getPatientNotes (id) {
      getEnquiryNotes(id).then(response => {
        this.notes = response.reverse()
      }
      )
    },
    getPatientAppointments (id) {
      getEnquiryAppointments(id).then(response => {
        this.appointments = response
        this.timeSinceFirstVisit = response.length && response[0].date
      }
      )
    },
    getPatientInvoices (id) {
      getEnquiryInvoices(id).then(response => {
        this.invoices = response
      })
    },
    getPatientOffers (id) {
      getEnquiryOffers(id).then(response => {
        this.offers = response
      })
    },
    getPatientServices (id) {
      getEnquiryServices(id).then(response => {
        this.services = response
      })
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
    addInvoice () {
      this.$router.push({ name: 'extra-pages.new-invoice', params: { enquireId: this.patient.id, billingDetails: this.createBillingDetails() } })
    },
    editPatient () {
      this.disabled = !this.disabled
      this.tempPatient = Object.assign({}, this.patient)
    },
    cancelEditingPatient () {
      this.disabled = !this.disabled
      this.patient = this.tempPatient
    },
    updatePatient () {
      updateEnquiry(this.patientId, this.patient).then((response) => {
        console.log('Successful update')
        this.patient = response
        this.$bvToast.show('b-toaster-bottom-right')
      }).catch(errorMsg => {
        console.log('Error: ' + errorMsg)
      })
    },
    addOffer () {

    },
    add_file () {
      console.log('Add file clicked')
    },
    resetForm () {
      this.user = {
        profile_image: require('../../assets/images/user/11.png'),
        background: require('../../assets/images/page-img/profile-bg.jpg'),
        profile: require('../../assets/images/user/11.png')
      }
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
    },
    sortSelected (value) {
      let array = [value]
      this.sortOn = array
    },
    getUsers () {
      getUsers().then(response => {
        this.users = response.filter(item => item.prm_role_id === 4)
      })
    },
    getAssignments () {
      getAssignments('all').then(response => {
        this.assignments = response.filter(item => item.enquiry_id === +this.$route.params.patientId)
      })
    },
    defaultFormData () {
      return {
        enquiry: {
          id: +this.patientId
        },
        description: '',
        due_at: null,
        user: {}
      }
    },
    cancelAssignments () {
      this.formData = this.defaultFormData()
    },
    addAssignments () {
      createAssignments(this.formData).then(() => {
        this.getAssignments()
        this.formData = this.defaultFormData()
      })
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

@media (max-width: 992px) {
  .iq-card {
    .row {
      .pr-0 {
        padding-right: 15px !important;
      }
    }
  }
}

@media (max-width: 576px) {
  .mobile-border a {
    border-radius: 0 0 15px 15px !important;
  }
}
</style>
