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
                              <b-col lg="4" class="pr-0 mt-4 pt-2 col-lg-4">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="user-details-block">
                                              <b-col class="text-right">
                                                  <b-button type="button" variant=" iq-bg-danger mr-1 mb-1" size="sm" @click="modalTrashPatient = true"><i class="ri-delete-bin-7-fill m-0"></i></b-button>
                                              </b-col>
                                              <b-modal v-model="modalTrashPatient" ok-title="OK" cancel-title="Cancel" @ok="trashPatient" @cancel="modalTrashPatient = false">
                                                  <h4 class="my-4 card-title text-center">Are you sure you want to delete the patient?</h4>
                                              </b-modal>
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
                                                      <h4 class="counter">{{numberOfVisits}}</h4>
                                                      <span>{{ $t('EPR.overview.numberOfVisits') }}</span>
                                                  </li>
                                                  <li class="text-center">
                                                      <h4 class="counter">{{timeSinceFirstVisit | fromNowDate}}</h4>
                                                      <span>{{ $t('EPR.overview.firstVisit') }}</span>
                                                  </li>
                                              </ul>
                                              <hr>
                                              <div class="row ml-1 align-items-center">
                                                  <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.phone') }}:</div>
                                                  <div class="col-8 pl-lg-3 p-md-0 text-dark">{{patient.phone}}</div>
                                                  <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.email') }}:</div>
                                                  <div class="col-8 pl-lg-3 p-md-0 text-dark">{{patient.email}}</div>
                                                  <div class="col-4 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.address') }}:</div>
                                                  <div class="col-8 pl-lg-3 p-md-0 text-dark" v-if="patient.address_line_1">{{patient.address_line_1}}</div>
                                                  <div class="col-8 pl-lg-3 p-md-0 text-dark" v-else>{{ $t('EPR.overview.addressUnknown') }}</div>
                                              </div>
                                              <hr>
                                              <div class="row ml-1">
                                                  <div class="col-4 pl-lg-3 p-md-0"><h6>{{ $t('EPR.overview.Dentist') }}:</h6></div>
                                                  <div v-if="patientsDentist" class="col-8 p-md-0 pl-lg-3 text-dark">{{patientsDentist.label}}</div>
                                                  <div v-if="!patientsDentist" class="col-8 text-dark">{{ $t('EPR.overview.notSelected') }}</div>
                                                  <div class="col-4 pl-lg-3 p-md-0"><h6>{{ $t('EPR.overview.Surgeon') }}:</h6></div>
                                                  <div v-if="patientsSurgeon" class="col-8 p-md-0 pl-lg-3 text-dark">{{patientsSurgeon.label}}</div>
                                                  <div v-if="!patientsSurgeon" class="col-8 pl-lg-3 p-md-0 text-dark">{{ $t('EPR.overview.notSelected') }}</div>
                                              </div>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <b-modal v-model="addAppointmentModal" no-close-on-esc no-close-on-backdrop size="lg" :title="$t('calendar.appointmentDetails')" ok-title="Save Changes" @ok="addAppointmentModal = false" @close="addAppointmentModal = false" cancel-title="Close" :ok-disabled="isSaveDisabled" hide-footer>
                                      <form class="calendar-modal">
                                          <div class="form-row">
                                              <div class="row align-items-center justify-content-between w-100 mb-3">
                                                  <div class="col-md-3">
                                                      <label for="patient" class="mb-0">{{ $t('calendarEvent.patient') }} *</label>
                                                  </div>
                                                  <div class="col-md-9">
                                                      <p class="text-black mb-0 ml-2">{{ patient.name }} {{patient.last_name}}</p>
                                                  </div>
                                              </div>
                                              <div class="row align-items-center justify-content-between w-100 mb-3">
                                                  <div class="col-md-3">
                                                      <label for="location" class="ml-0 mb-0">{{ $t('calendarEvent.location') }} *</label>
                                                  </div>
                                                  <div class="col-md-9">
                                                      <v-select :clearable="false"
                                                                :disabled="disabled"
                                                                label="city"
                                                                :reduce="location => location.id"
                                                                class="style-chooser form-control-disabled font-size-15"
                                                                v-model="formAppointments.locationId"
                                                                :options="locations"
                                                                style="min-width:305px;"></v-select>
                                                  </div>
                                              </div>
                                              <div class="row align-items-center justify-content-between w-100 mb-3">
                                                  <div class="col-md-3">
                                                      <label for="doctor" class="mr-2 mb-0">{{ $t('calendarEvent.doctor') }} *</label>
                                                  </div>
                                                  <div class="col-md-9">
                                                      <v-select :clearable="false"
                                                                :disabled="disabled"
                                                                label="name"
                                                                :reduce="doctor => doctor.id"
                                                                class="style-chooser form-control-disabled font-size-15"
                                                                v-model="formAppointments.doctorId"
                                                                :options="doctors"
                                                                style="min-width: 305px;"></v-select>
                                                  </div>
                                              </div>
                                              <div class="row align-items-center justify-content-between w-100 mb-3">
                                                  <div class="col-md-3 pl-3 pr-0">
                                                      <label for="product_group" class="mb-0">{{ $t('calendarEvent.product_group') }} *</label>
                                                  </div>
                                                  <div class="col-md-9">
                                                      <v-select :disabled="disabled"
                                                                :clearable="false"
                                                                label="product_group_name"
                                                                :reduce="product_group => product_group.product_group_id"
                                                                class="style-chooser form-control-disabled font-size-15"
                                                                v-model="formAppointments.product_groups"
                                                                :options="product_groups"></v-select>
                                                  </div>
                                              </div>
                                              <div class="row align-items-center justify-content-between w-100 " :class="{'mb-3': !disabled}">
                                                  <div class="col-md-3">
                                                      <label for="start" class="mb-0">{{ $t('calendarEvent.start') }} *</label>
                                                  </div>
                                                  <div class="col-md-9 d-flex align-items-center mb-3">
                                                      <date-picker class="form-control form-control-disabled font-size-15"
                                                                   :class="{'no-border margin-left': disabled}"
                                                                   :disabled="disabled"
                                                                   v-model="formAppointments.assignmentDate"
                                                                   type="datetime"
                                                                   :minute-step="5"
                                                                   :show-second="false"
                                                                   :lang="'en'"
                                                                   :format="'DD.MM.YYYY HH.mm'"></date-picker>
                                                      <label for="start" class="mb-0 mr-3 ml-4">{{ $t('calendarEvent.end') }}*</label>
                                                      <date-picker required
                                                                   :disabled="disabled"
                                                                   :class="{'no-border': disabled}"
                                                                   class="form-control form-control-disabled font-size-15"
                                                                   v-model="formAppointments.end"
                                                                   type="time"
                                                                   :minute-step="5"
                                                                   :show-second="false"
                                                                   :lang="'en'"
                                                                   :format="'HH.mm'"></date-picker>
                                                  </div>
                                              </div>
                                              <br>
                                              <div class="row align-items-center justify-content-between w-100 mb-3">
                                                  <div class="col-md-3">
                                                      <label for="notes">{{ $t('calendarEvent.note') }}</label>
                                                  </div>
                                                  <div class="col-md-9">
                                                      <textarea :disabled="disabled" row="2" v-model="formAppointments.notes" class="form-control form-control-disabled font-size-15" placeholder="Add your note here for event!" id="note" required></textarea>
                                                  </div>
                                              </div>
                                              <div class="row align-items-center justify-content-between w-100 mb-3 mt-2">
                                                  <div class="col-md-3">
                                                      <label for="color">{{ $t('calendarEvent.labels') }}</label><br>
                                                  </div>
                                                  <div class="col-md-9">
                                                      <template v-for="(item,index) in colors">
                                                          <b-form-radio class="custom-radio-color font-size-16 labels"
                                                                        inline
                                                                        v-model="formData.backgroundColor"
                                                                        :key="index"
                                                                        :reduce="item => item.id"
                                                                        :value="item.id"
                                                                        :style="{'background': item.color}"
                                                                        name="labels"
                                                                        v-if="showLabels(item)">
                                                              <p class="text-white m-0 py-1 pr-2">{{ item.text }}</p>
                                                          </b-form-radio>
                                                      </template>
                                                  </div>
                                              </div>
                                              <template>
                                                  <div class="cancelation-text font-size-18 mt-3 mb-1 row align-items-center justify-content-center w-100">
                                                      <p v-if="formAppointments.appointment_canceled_in_advance_by_clinic === true">{{ $t('calendarEvent.appointmentCanceledInAdvanceByClinic') }}</p>
                                                      <p v-if="formAppointments.appointment_canceled_in_advance_by_patient === true">{{ $t('calendarEvent.appointmentCanceledInAdvanceByPatient') }}</p>
                                                  </div>
                                              </template>
                                              <div class="modal-footer modal-footer-bt" style="width: 100%;">
                                                  <template v-if="disabled">
                                                      <button v-if="formAppointments.appointment_canceled_in_advance_by_clinic === false && formAppointments.appointment_canceled_in_advance_by_patient === false || openCancelationModal === true" type="button" class="btn btn-secondary" @click="openCancelationModal = true">{{ $t('calendar.btnCancelation') }}</button>
                                                      <button type="button" class="btn btn-secondary" @click="addAppointmentModal = false, formAppointments = defaultFormAppointment">{{ $t('calendar.btnClose') }}</button>
                                                      <button type="button" class="btn btn-secondary" @click="editMode">{{ $t('calendar.btnEdit') }}</button>
                                                  </template>
                                                  <template v-if="!disabled">
                                                      <p v-if="isSaveDisabled" class="mt-1 mr-4 text-black">{{ $t('calendarEvent.requiredFields') }}</p>
                                                      <button type="button" class="btn btn-secondary" @click="closeAppointmentModal">{{ $t('calendar.btnClose') }}</button>
                                                      <button type="button" class="btn btn-primary" @click="saveAppointment">{{ $t('calendar.btnSave') }}</button>
                                                  </template>
                                              </div>
                                              <b-modal v-model="openCancelationModal"
                                                       :ok-title="$t('calendar.btnSave')"
                                                       :cancel-title="$t('calendar.btnCancel')"
                                                       :title="$t('calendar.btnCancelation')"
                                                       @ok="saveAppointment"
                                                       @close="closeCancelation"
                                                       @cancel="closeCancelation">
                                                  <div class="col-md-12 mb-2">
                                                      <div class="d-flex justify-content-around mt-2">
                                                          <b-form-radio class="custom-radio-color"
                                                                        inline
                                                                        v-model="formAppointments.appointment_canceled_in_advance_by_patient"
                                                                        value="true"
                                                                        name="cancelation">
                                                              {{ $t('calendarEvent.appointmentCanceledInAdvanceByPatient') }}
                                                          </b-form-radio>
                                                          <b-form-radio class="custom-radio-color"
                                                                        inline
                                                                        v-model="formAppointments.appointment_canceled_in_advance_by_clinic"
                                                                        value="true"
                                                                        name="cancelation">
                                                              {{ $t('calendarEvent.appointmentCanceledInAdvanceByClinic') }}
                                                          </b-form-radio>
                                                      </div>
                                                  </div>
                                              </b-modal>
                                          </div>
                                      </form>
                                  </b-modal>
                                      <!--                                  <iq-card>-->
                                      <!--                                      <template v-slot:body>-->
                                      <!--                                          <div class="iq-card-header d-flex justify-content-between">-->
                                      <!--                                              <div class="iq-header-title">-->
                                      <!--                                                  <h4 class="card-title">{{ $t('EPR.overview.personalDoctors') }}</h4><hr />-->
                                      <!--                                              </div>-->
                                      <!--                                          </div>-->
                                      <!--                                          <div class="iq-card-body">-->
                                      <!--                                              <div class="row font-size-16 ">-->
                                      <!--                                                  <div class="col-12 col-sm-7"><h6>{{ $t('EPR.overview.personalDentist') }}:</h6></div>-->
                                      <!--                                                  <div v-if="patientsDentist" class="col-12 col-sm-5">{{patientsDentist.label}}</div>-->
                                      <!--                                                  <div v-if="!patientsDentist" class="col-5">{{ $t('EPR.overview.notSelected') }}</div>-->
                                      <!--                                                  <div class="col-7"><h6>{{ $t('EPR.overview.personalSurgeon') }}:</h6></div>-->
                                      <!--                                                  <div v-if="patientsSurgeon" class="col-12 col-sm-5">{{patientsSurgeon.label}}</div>-->
                                      <!--                                                  <div v-if="!patientsSurgeon" class="col-5">{{ $t('EPR.overview.notSelected') }}</div>-->
                                      <!--                                              </div>-->
                                      <!--                                          </div>-->
                                      <!--                                      </template>-->
                                      <!--                                  </iq-card>-->
                                      <iq-card body-class="iq-card-body" v-if="files.length > 0">
                                          <template v-slot:body>
                                              <div class="iq-card-header d-flex justify-content-between">
                                                  <div class="iq-header-title">
                                                      <h4 class="card-title">{{ $t('EPR.overview.files') }} ({{filesSortBy.length}})</h4><hr />
                                                  </div>
                                              </div>
                                              <div class="iq-card-body p-0">
                                                  <ul class="profile-img-gallary profile-preview-gallery d-flex flex-wrap p-0 m-0 font-size-12 overflow-y-scroll" style="max-height: 230px;">
                                                    <li class="col-md-4 col-6 pb-3" v-for="(file, index) in filesSortBy" :key="index + file.created_at">
                                                      <div v-html="tiffConvertToCanvas(file, index, true)" :class="`tiff-block-${index}-preview`"></div>
                                                      <img
                                                          :src="file.image"
                                                          alt="gallary-image"
                                                          class="img-fluid img-files clickable"
                                                          v-if="file.type !== 'tiff'"
                                                          @click="goToFiles"
                                                      >
                                                      <object :data="file.image" type="application/pdf" width="250px" height="auto" class="m-auto d-block" v-if="file.pdf">
                                                      </object>
                                                      <div class="text-center">
                                                        <p class="mb-0"> {{file.name}}</p>
                                                        <p>{{file.created_at}}</p>
                                                      </div>
                                                    </li>
                                                  </ul>
                                              </div>
                                          </template>
                                      </iq-card>
                              </b-col>
                              <b-col>
                                  <b-col md="14" v-if="patient.general_notes">
                                      <b-card class="iq-card">
                                          <b-card-title>{{ $t('EPR.overview.generalNotes') }}</b-card-title>
                                          <hr />
                                          <b-card-text class="text-black" v-html="patient.general_notes"></b-card-text>
                                          <!-- <b-card-text><small class="text-muted">{{ $t('EPR.overview.generalNotesUpdated') }} {{patient.general_notes_updated_at | fromNowDate}}</small></b-card-text> -->
                                      </b-card>
                                      <b-card text-variant="white"
                                              bg-variant="danger"
                                              class="iq-card"
                                              v-if="patient.allergies">
                                          <b-card-title class="text-white">{{ $t('EPR.overview.allergies') }}</b-card-title>
                                          <blockquote class="blockquote mb-0">
                                              <p class="font-size-14">{{patient.allergies}}</p>
                                              <!--<footer class="blockquote-footer text-white font-size-12">{{ $t('EPR.overview.allergiesUpdated') }} {{patient.allergies_updated_at | fromNowDate}}</footer> -->
                                          </blockquote>
                                      </b-card>
                                  </b-col>
                                  <b-col md="14">
                                      <iq-card>
                                          <template v-slot:body>
                                              <div class="iq-card-header d-flex justify-content-between">
                                                  <div class="iq-header-title">
                                                      <div class="row justify-content-between align-items-center">
                                                          <h4 class="card-title">{{ $t('EPR.overview.patientNotes') }}</h4>
                                                          <button type="button" class="btn btn-primary" @click="modalNotesShow = true">{{ $t('EPR.overview.add') }}</button>
                                                      </div>
                                                      <hr />
                                                  </div>
                                              </div>
                                              <ul class="list-inline m-0 overflow-y-scroll pl-2 pr-2" style="max-height: 300px;">
                                                  <li v-for="(note,index) in notes" :key="index + note.created_at" class="d-flex align-items-center justify-content-between mb-3">
                                                      <div>
                                                          <h6>{{note.content}}</h6>
                                                          <p class="mb-0">{{note.created_at | formatDate}} - <span class="ml-0">{{ note.user_name }}</span></p>
                                                      </div>
                                                  </li>
                                              </ul>
                                          </template>
                                      </iq-card>
                                  </b-col>
                                  </b-col>
                                  <b-col>
                                      <b-col md="14">
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
                                                          class="d-flex align-items-center justify-content-between mb-3  "
                                                          :style="{
                                                  'background': index === 0 && '#c3e6cb'
                                                  }">
                                                          <div class="w-100">
                                                              <h6>{{item.description}}</h6>
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
                                                          <button type="button" class="btn btn-primary" @click="addAppointment">{{ $t('EPR.overview.add') }}</button>
                                                          </div>
                                                          <hr />
                                                      </div>
                                                  </div>
                                                  <ul class="iq-timeline">
                                                      <li v-for="(item,index) in futureAppointments" :key="index">
                                                          <div class="timeline-dots border-success"></div>
                                                          <div @click="openAppointmentModal(item)" style="cursor: pointer;">
                                                              <h6>{{item.product_group_text}}<span class="float-right">{{item.note}}</span></h6>
                                                              <small class="mt-1">{{item.starts_at | formatDate}}</small>
                                                          </div>
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
                                                  <ul class="iq-timeline" id="pastAppointments">
                                                      <li v-for="(item, index) in pastAppointments" :key="index">
                                                          <div class="timeline-dots border-success"></div>
                                                          <h6>{{item.product_group_text}}<span class="float-right">{{item.note}}</span></h6>
                                                          <small class="mt-1">{{item.starts_at | formatDate}}</small>
                                                      </li>
                                                  </ul>
                                              </template>
                                          </iq-card>
                                      </b-col>
                                  </b-col>
                              </b-row>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="info">
                      <iq-card style="background: none;">
                          <b-form-group class="row align-items-center /*justify-content-center*/">
                              <b-col md="12">
                                  <div class="profile-img-edit">
                                      <b-img v-if="patient.gender == 'female'" src="../../assets/images/user/11.png" class="profile-pic height-150 width-150 object-fit" alt="profile-pic" />
                                      <b-img v-else src="../../assets/images/user/08.png" class="profile-pic height-150 width-150 object-fit" alt="profile-pic" />
                                      <input type="hidden" v-model="user.profile_image">
                                      <div class="p-image">
                                          <div class="position-relative">
                                              <i class="ri-camera-line upload-button"></i>
                                              <b-form-file class="h-100 position-absolute upload-image" accept="image/*" @change="previewImage"></b-form-file>
                                          </div>
                                      </div>
                                  </div>
                              </b-col>
                          </b-form-group>
                          <b-row>
                              <b-col lg="6">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between margin-top">
                                              <div class="iq-header-title mt-0">
                                                  <h4 class="card-title">{{ $t('EPR.personalInfo.personalInformation') }}<span><b-button v-if="disabledData" variant="primary" :disabled="!disabledData" @click="editPatientData" class="float-right margin-top-edit-btn">{{ $t('EPR.personalInfo.editBtn') }}</b-button></span></h4>
                                              </div>
                                          </div>
                                          <b-row align-v="center">
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="fname" :label="$t('EPR.personalInfo.firstName')">
                                                  <ValidationProvider name="fname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabledData" v-model="patient.name" type="text" class="form-control-disabled font-size-12" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="lname" :label="$t('EPR.personalInfo.lastName')">
                                                  <ValidationProvider name="lname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabledData" v-model="patient.last_name" type="text" class="form-control-disabled font-size-12" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="dob" :label="$t('EPR.personalInfo.dob')">
                                                  <!--                                                  <ValidationProvider name="dob" rules="required" v-slot="{ errors }">-->
                                                  <b-form-input v-if="!patient.date_of_birth"
                                                                :disabled="disabledData"
                                                                v-model="patient.date_of_birth"
                                                                type="date"
                                                                class="form-control-disabled font-size-12 mt-0 mr-2"
                                                                id="dateInput"></b-form-input>
                                                  <b-form-input v-else
                                                                :disabled="disabledData"
                                                                v-model="patient.date_of_birth"
                                                                type="date"
                                                                class="form-control-disabled font-size-12 mt-0 mr-2"></b-form-input>
                                              </b-form-group>
                                              <b-form-group v-if="disabledData" class="col-md-12 align-items-center my-1" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="gender" :label="$t('EPR.personalInfo.gender')">
                                                  <p v-if="patient.gender === 'male'" class="form-control-disabled font-size-12 text-black" :class="{'mb-1': disabledData}" :disabled="disabledData" style="padding-left: .75rem !important">{{ $t('EPR.personalInfo.male') }}</p>
                                                  <p v-if="patient.gender === 'female'" class="form-control-disabled font-size-12 text-black" :class="{'mb-1': disabledData}" :disabled="disabledData" style="padding-left: .75rem !important">{{ $t('EPR.personalInfo.female') }}</p>
                                                  <p v-if="!patient.gender || patient.gender === 'unspecified'" class="form-control-disabled font-size-12 text-black" :class="{'mb-1': disabledData}" :disabled="disabledData" style="padding-left: .75rem !important">{{ $t('EPR.personalInfo.unspecified') }}</p>
                                              </b-form-group>
                                              <b-form-group v-else class="col-md-12 align-items-center pt-2 pb-2" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="gender" :label="$t('EPR.personalInfo.gender')">
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabledData" value="male" class="ml-2">{{ $t('EPR.personalInfo.male') }}</b-form-radio>
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabledData" value="female">{{ $t('EPR.personalInfo.female') }}</b-form-radio>
                                                  <b-form-radio inline v-model="patient.gender" :disabled="disabledData" value="unspecified">{{ $t('EPR.personalInfo.unspecified') }}</b-form-radio>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="address" :label="$t('EPR.personalInfo.address')">
                                                  <b-form-input :disabled="disabledData" name="address" class="form-control-disabled font-size-12" v-model="patient.address_line_1" style="line-height: 22px;">
                                                  </b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center mt-1" :class="{'mb-0': disabledData}" style="justify-content: space-between;" label-cols-sm="4" label-for="city" :label="$t('EPR.personalInfo.postCodeCity')">
                                                  <b-form-input :disabled="disabledData" class="col-md-4 form-control-disabled font-size-12 mt-1" style="float: left;" v-model="patient.post_code" type="text"></b-form-input>
                                                  <v-select :disabled="disabledData"
                                                            class="col-md-8 form-control-disabled style-chooser"
                                                            :class="{'margin-top-city': disabledData}"
                                                            style="float: right;" v-model="patient.city"
                                                            :clearable="false" :options="filteredMunicipalities"
                                                            :reduce="city => city.municipality_name"
                                                            :getOptionLabel="getMunicipalityLabel"
                                                            @input="onCityChange"></v-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center " :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="country" :label="$t('EPR.personalInfo.country')">
                                                  <v-select :disabled="disabledData" label="name" :clearable="false"
                                                            :reduce="country => country.id"
                                                            class="style-chooser form-control-disabled font-size-12"
                                                            v-model="patient.country_id" :options="countries"></v-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="region" :label="$t('EPR.personalInfo.region')">
                                                  <v-select class="style-chooser form-control-disabled font-size-12" :clearable="false"
                                                            :reduce="region => region.code" :disabled="disabledData"
                                                            v-model="patient.region_id"
                                                            :options="filteredRegions"></v-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="insurance" :label="$t('EPR.personalInfo.insurance')">
                                                  <b-form-input :disabled="disabledData" class="col-md-5 form-control-disabled font-size-12" style="float: left;" name="insurance_no" type="text" v-model="patient.insurance_no"></b-form-input>
                                                  <b-form-input :disabled="disabledData" class="col-md-5 form-control-disabled font-size-12" style="float: right;" name="insured_at" type="text" v-model="patient.insured_at"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="mobile_no" :label="$t('EPR.personalInfo.phone')">
                                                  <b-form-input :disabled="disabledData" name="mobile_no" type="text" class="form-control-disabled font-size-12" v-model="patient.phone"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="email" :label="$t('EPR.personalInfo.email')">
                                                  <b-form-input :disabled="disabledData" name="email" type="text" class="form-control-disabled font-size-12" v-model="patient.email"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12 align-items-center" :class="{'mb-0': disabledData}" label-cols-sm="4" label-for="tax_no" :label="$t('EPR.personalInfo.taxNumber')">
                                                  <b-form-input :disabled="disabledData" name="tax_no" type="text" class="form-control-disabled font-size-12" v-model="patient.tax_registration_number"></b-form-input>
                                              </b-form-group>
                                          </b-row>
                                          <div class="text-center p-1" v-if="!disabledData">
                                              <b-button style="padding: 5px 25px;" v-b-modal.modal-1 variant="none" class="iq-bg-secondary mr-2">Cancel</b-button>
                                              <b-button style="padding: 5px 25px;" @click="submitData()" variant="primary">Save</b-button>
                                              <b-modal id="modal-1" ok-title="OK" cancel-title="Cancel" @ok="cancelEditingPatientData">
                                                  <h4 class="my-4 card-title text-center">Are you sure you want to the<br>discard changes?</h4>
                                              </b-modal>
                                              <b-modal ref="my-modal" ok-only ok-variant="primary" ok-title="OK">
                                                  <div class="text-center">
                                                      <i class="ri-error-warning-fill ri-4x" style="color: #d84a45;"></i>
                                                      <h4 class="my-4 card-title text-center">Unable to save changes, please try again</h4>
                                                  </div>
                                              </b-modal>
                                          </div>
                                      </template>
                                  </iq-card>
                              </b-col>
                              <b-col lg="6">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between margin-top">
                                              <div class="iq-header-title mt-0">
                                                  <h4 class="card-title">{{ $t('EPR.personalInfo.personalDoctors') }}<span><b-button v-if="disabledDoctors" variant="primary" :disabled="!disabledDoctors" @click="editPatientDoctors" class="float-right margin-top-edit-btn">{{ $t('EPR.personalInfo.editBtn') }}</b-button></span></h4>
                                              </div>
                                          </div>
                                          <div class="iq-card-body" style="margin-top: -1rem;">
                                              <div class="row">
                                                  <b-form-group class="col-md-8 align-items-center pl-0" label-cols-sm="3" label-for="region">
                                                      <template slot="label">
                                                          <span>
                                                              {{ $t('EPR.personalInfo.personalDentist') }}:
                                                          </span>
                                                      </template>
                                                      <v-select :disabled="disabledDoctors"
                                                                :clearable="false"
                                                                :reduce="dentist => dentist.code"
                                                                class="style-chooser form-control-disabled mb-1 pl-2"
                                                                v-model="patient.prm_dentist_user_id"
                                                                :options="dentists">
                                                      </v-select>
                                                  </b-form-group>
                                                  <b-form-group class="col-md-8 align-items-center pl-0" label-cols-sm="3" label-for="region" style="margin-top: -1.5rem;">
                                                      <template slot="label">
                                                          <span>
                                                              {{ $t('EPR.personalInfo.personalSurgeon') }}:
                                                          </span>
                                                      </template>
                                                      <v-select :disabled="disabledDoctors" :clearable="false" :reduce="dentist => dentist.code" class="style-chooser form-control-disabled mb-1 pl-2" v-model="patient.prm_surgeon_user_id" :options="surgeons"></v-select>
                                                  </b-form-group>
                                              </div>
                                          </div>
                                          <div class="text-center p-1" v-if="!disabledDoctors">
                                              <b-button style="padding: 5px 25px;" v-b-modal.modal-1 variant="none" class="iq-bg-secondary mr-2">Cancel</b-button>
                                              <b-button style="padding: 5px 25px;" @click="submitDoctors()" variant="primary">Save</b-button>
                                              <b-modal id="modal-1" ok-title="OK" cancel-title="Cancel" @ok="cancelEditingPatientDoctors">
                                                  <h4 class="my-4 card-title text-center">Are you sure you want to the<br>discard changes?</h4>
                                              </b-modal>
                                              <b-modal ref="my-modal" ok-only ok-variant="primary" ok-title="OK">
                                                  <div class="text-center">
                                                      <i class="ri-error-warning-fill ri-4x" style="color: #d84a45;"></i>
                                                      <h4 class="my-4 card-title text-center">Unable to save changes, please try again</h4>
                                                  </div>
                                              </b-modal>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between margin-top">
                                              <div class="iq-header-title mt-0">
                                                  <h4 class="card-title">{{ $t('EPR.personalInfo.generalNotes') }}<span><b-button v-if="disabledNotes" variant="primary" :disabled="!disabledNotes" @click="editPatientNotes" class="float-right margin-top-edit-btn">{{ $t('EPR.personalInfo.editBtn') }}</b-button></span></h4>
                                              </div>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <textarea :disabled="disabledNotes"
                                                        style="line-height: 30px;"
                                                        class="textarea form-control form-control-disabled font-size-12"
                                                        rows="7"
                                                        ref="textareaGeneralNotes"
                                                        wrap="hard"
                                                        v-model="notesGeneral"
                                                        @change="changeGeneralNotes"
                                                        v-html="patient.general_notes"></textarea>
                                          </div>
                                          <div class="text-center p-1" v-if="!disabledNotes">
                                              <b-button style="padding: 5px 25px;" v-b-modal.modal-1 variant="none" class="iq-bg-secondary mr-2">Cancel</b-button>
                                              <b-button style="padding: 5px 25px;" @click="submitNotes()" variant="primary">Save</b-button>
                                              <b-modal id="modal-1" ok-title="OK" cancel-title="Cancel" @ok="cancelEditingPatientNotes">
                                                  <h4 class="my-4 card-title text-center">Are you sure you want to the<br>discard changes?</h4>
                                              </b-modal>
                                              <b-modal ref="my-modal" ok-only ok-variant="primary" ok-title="OK">
                                                  <div class="text-center">
                                                      <i class="ri-error-warning-fill ri-4x" style="color: #d84a45;"></i>
                                                      <h4 class="my-4 card-title text-center">Unable to save changes, please try again</h4>
                                                  </div>
                                              </b-modal>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between margin-top">
                                              <div class="iq-header-title mt-0">
                                                  <h4 class="card-title">{{ $t('EPR.personalInfo.allergiesAndSensitivites') }}<span><b-button v-if="disabledAllergies" variant="primary" :disabled="!disabledAllergies" @click="editPatientAllergies" class="float-right margin-top-edit-btn">{{ $t('EPR.personalInfo.editBtn') }}</b-button></span></h4>
                                              </div>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <textarea :disabled="disabledAllergies"
                                                        style="line-height: 30px;"
                                                        v-model="patient.allergies"
                                                        class="textarea form-control form-control-disabled font-size-12"
                                                        rows="3"></textarea>
                                          </div>
                                          <div class="text-center p-1" v-if="!disabledAllergies">
                                              <b-button style="padding: 5px 25px;" v-b-modal.modal-1 variant="none" class="iq-bg-secondary mr-2">Cancel</b-button>
                                              <b-button style="padding: 5px 25px;" @click="submitAllergies()" variant="primary">Save</b-button>
                                              <b-modal id="modal-1" ok-title="OK" cancel-title="Cancel" @ok="cancelEditingPatientAllergies">
                                                  <h4 class="my-4 card-title text-center">Are you sure you want to the<br>discard changes?</h4>
                                              </b-modal>
                                              <b-modal ref="my-modal" ok-only ok-variant="primary" ok-title="OK">
                                                  <div class="text-center">
                                                      <i class="ri-error-warning-fill ri-4x" style="color: #d84a45;"></i>
                                                      <h4 class="my-4 card-title text-center">Unable to save changes, please try again</h4>
                                                  </div>
                                              </b-modal>
                                          </div>
                                      </template>
                                  </iq-card>
                              </b-col>
                          </b-row>
                      </iq-card>
                  </tab-content-item>
                      <tab-content-item :active="false" id="files">
                          <iq-card body-class="iq-card-body">
                              <template v-slot:headerTitle>
                                  <h3 class="card-title mt-3 mb-2">{{ $t('EPR.filesHeader') }}</h3>
                                  <div class="btn-add-patient mt-2">
                                      <b-button variant="primary" @click="add_file">
                                        <label for="upload-file" class="text-white m-0 p-0">
                                          <i class="ri-add-line mr-2"></i>
                                          {{ $t('EPR.files.addFile') }}
                                          <input type="file" ref="file_upload" @change="uploadFile" id="upload-file" hidden accept="image/png, image/jpg, image/jpeg"/>
                                        </label>
                                      </b-button>
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
                                            <div v-html="tiffConvertToCanvas(file, index)" :class="`tiff-block-${index}`"></div>
                                              <img
                                                  :src="file.image"
                                                  alt="gallary-image"
                                                  class="img-fluid img-files"
                                                  v-if="file.type !== 'tiff'"
                                              >
                                              <object :data="file.image" type="application/pdf" width="250px" height="auto" class="m-auto d-block" v-if="file.pdf">
                                              </object>
                                              <div class="text-center">
                                                  <p class="mb-0">{{ $t('EPR.files.fileName') }}: {{file.name}}</p>
                                                  <p class="mb-0">{{ $t('EPR.files.fileType') }}: {{file.type}}</p>
                                                  <p>{{ $t('EPR.files.fileAddedAt') }}: {{file.created_at}}</p>
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
                            <b-row class="row align-items-center justify-content-between m-0">
                              <div class="row align-items-center p-0 m-0">
                                <h3 class="card-title mr-4" >
                                  {{ $t('EPR.invoices.invoicesHeader') }}
                                </h3>
                                <v-select class="patients" label="text"
                                          :clearable="false"
                                          :options="sortOptionsInvoice"
                                          @input="sortSelectedInvoice"
                                          v-model="sortByInvoice"
                                >
                                  <template v-slot:option="option">
                                    <div class="row justify-content-between">
                                      {{option.text}}
                                      <i :class="{'ri-arrow-up-s-line': option.sort === 'asc', 'ri-arrow-down-s-line': option.sort === 'desc',}"></i>
                                    </div>
                                  </template>
                                </v-select>
                              </div>
                              <span class="float-right">
                                  <b-button variant="primary" @click="addInvoice">
                                    <i class="ri-add-line mr-2"></i>
                                    {{ $t('EPR.invoices.addInvoice') }}
                                  </b-button>
                                </span>
                            </b-row>
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
                                        <template v-slot:cell(charges_sum)="data">
                                          <span>
                                            {{ data.item.charges_sum | euro }}
                                          </span>
                                        </template>
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
                class="style-chooser"
                :options="users"
                v-model="formData.user"
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
            <b-form-datepicker
                class="date"
                id="exampleInputdate"
                v-model="formData.due_at"
                :min="new Date()"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                placeholder="mm/dd/yyyy"
            ></b-form-datepicker>
<!--            <b-form-input-->
<!--                class="date"-->
<!--                id="exampleInputdate"-->
<!--                type="date"-->
<!--                :date-disabled-fn="dateDisabled" :min="'08.07.2021'" v-model="formData.due_at" ></b-form-input>-->
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal
        v-model="modalNotesShow"
        ok-title="OK"
        cancel-title="Cancel"
        :ok-disabled="isOkDisabledNotes"
        title="Add Notes"
        @ok="addNotes"
        @close="cancelNotes"
        @cancel="cancelNotes"
    >
      <div class="col-md-12 mb-3">
        <label for="title">{{ $t('assignments.addAssignmentsModal.description') }} *</label>
        <div style="display: flex;">
          <textarea type="text" v-model="notesFormData.content" class="form-control" placeholder="Description" rows="5"/>
        </div>
      </div>
    </b-modal>
    <b-modal
        v-model="modalInvoiceShow"
        :ok-title="$t('EPR.continue')"
        :cancel-title="$t('EPR.cancel')"
        :ok-disabled="!selectedInvoices"
        :title="$t('EPR.invoiceType')"
        @ok="chooseInvoice"
        @close="cancelInvoices"
        @cancel="cancelInvoices"
    >
      <div class="col-md-12 mb-2">
        <div class="d-flex justify-content-around mt-2">
          <template v-for="(item) in invoicesType">
            <b-form-radio
                class="custom-radio-color"
                inline
                v-model="selectedInvoices"
                :name="item.value"
                :value="item.value"
                :key="item.value"
            >{{ item.label }}
            </b-form-radio>
          </template>
        </div>
      </div>
    </b-modal>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import {
  getEnquiryById,
  updateEnquiry,
  getEnquiryNotes,
  getEnquiryPastAppointments,
  getEnquiryFutureAppointments,
  getEnquiryAssignments,
  getEnquiryInvoices,
  getEnquiryOffers,
  getEnquiryServices,
  createEnquiryNotes,
  trashEnquiry
} from '../../services/enquiry'
import { getDentists, getSurgeons, getUsersForAssignments, sso } from '../../services/userService'
import { getCountriesList, getRegionsList, getLocationsList, getMunicipalitiesList } from '../../services/commonCodeLists'
import moment from 'moment'
import { createAssignments } from '@/services/assignmentsService'
import { fileUpload, getFiles } from '@/services/upDownLoad'
import { createCalendar, getDoctorList, getLabels, updateCalendar } from '@/services/calendarService'
import { getProductGroups } from '@/services/products'
import Tiff from 'tiff.js'
import DatePicker from 'vue2-datepicker'
import _ from 'lodash'
const $ = require('jquery')

export default {
  name: 'ViewPatient',
  components: {
    DatePicker
  },
  mounted () {
    xray.index()
    this.getPatient(this.patientId)
    this.getPatientNotes(this.patientId)
    this.getPatientPastAppointments(this.patientId, this.$i18n.locale)
    this.getPatientFutureAppointments(this.patientId, this.$i18n.locale)
    this.getPatientAssignments(this.patientId)
    this.getCountries()
    this.getRegions()
    this.getMunicipalities()
    this.getDentists()
    this.getSurgeons()
    this.getPatientInvoices(this.patientId, 'ASC')
    this.getPatientOffers(this.patientId)
    this.getPatientServices(this.patientId)
    this.getUsersForAssignments()
    this.getFiles()
    this.getLocations()
    this.getUserLogin()
    this.getDoctors()
    this.getProductGroups(this.$i18n.locale)
    this.getLabels(this.$i18n.locale)
    this.formAppointments.assignmentDate = this.roundUpStartTime()
  },
  computed: {
    isSaveDisabled () {
      return !this.formAppointments.patientId || !this.formAppointments.locationId || !this.formAppointments.doctorId || !this.formAppointments.product_groups || !this.formAppointments.assignmentDate || !this.formAppointments.end
    },
    isOkDisabled () {
      return !this.formData.due_at || !this.formData.description
    },
    isOkDisabledNotes () {
      return !this.notesFormData.content
    },
    fullName () {
      return this.patient.name + ' ' + this.patient.last_name
    },
    filteredRegions () {
      return this.regions.filter((item) => {
        return item.country_id === this.patient.country_id
      })
    },
    filteredRegionsCity () {
      return this.regions.filter((item) => {
        return item.code === this.patient.city.region_id
      })
    },
    filteredMunicipalities () {
      if (this.patient.country_id) {
        return this.municipalities.filter(item => {
          return item.country_id === this.patient.country_id
        })
      } else {
        return this.municipalities
      }
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
      let assignments = [...this.assignments]
      return assignments.reverse()
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
      logedInUser: {},
      calendarApi: null,
      patientId: this.$route.params.patientId,
      modalAssigmentShow: false,
      modalNotesShow: false,
      modalInvoiceShow: false,
      addAppointmentModal: false,
      modalTrashPatient: false,
      openCancelationModal: false,
      generalNotes: '',
      notesGeneral: '',
      users: [],
      patient: {},
      tempPatient: {},
      notes: [],
      assignments: [],
      pastAppointments: [],
      futureAppointments: [],
      timeSinceFirstVisit: '',
      dentists: [],
      surgeons: [],
      filter: '',
      invoices: [],
      services: [],
      offers: [],
      locations: [],
      doctors: [],
      product_groups: [],
      selectedInvoices: '',
      invoicesType: [
        {
          label: this.$t('EPR.invoice'),
          value: 'new-invoice'
        },
        {
          label: this.$t('EPR.advPayment'),
          value: 'new-adv-payment'
        },
        {
          label: this.$t('EPR.offer'),
          value: 'offer'
        }
      ],
      colors: [],
      formData: {
        enquiry: {
          id: +this.$route.params.patientId
        },
        due_at: null,
        user: {}
      },
      formAppointments: {
        id: '',
        patientId: null,
        notes: '',
        locationId: '',
        doctorId: '',
        assignmentDate: '',
        end: '',
        backgroundColor: '#64D6E8',
        description: '',
        product_groups: '',
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      },
      notesFormData: {
        enquiry_id: +this.$route.params.patientId,
        content: '',
        user_id: null
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
      sortByInvoice: '',
      sortOptions: [
        { value: 'name', text: this.$t('EPR.files.fileName'), sort: 'asc' },
        { value: 'name', text: this.$t('EPR.files.fileName'), sort: 'desc' },
        { value: 'type', text: this.$t('EPR.files.fileType'), sort: 'asc' },
        { value: 'type', text: this.$t('EPR.files.fileType'), sort: 'desc' },
        { value: 'created_at', text: this.$t('EPR.files.fileCreatedAt'), sort: 'asc' },
        { value: 'created_at', text: this.$t('EPR.files.fileCreatedAt'), sort: 'desc' }
      ],
      sortOptionsInvoice: [
        { value: 'invoice_type', text: this.$t('EPR.invoices.filters.invoice_type'), sort: 'asc' },
        { value: 'invoice_type', text: this.$t('EPR.invoices.filters.invoice_type'), sort: 'desc' }
      ],
      files: [
        // { image: require('../../assets/images/login/1.png'), name: 'File 2', type: 'Rentgen', created_at: '21.04.2021' },
        // { image: require('../../assets/images/login/2.png'), name: 'File 4', type: 'Krvna slika', created_at: '17.04.2021' },
        // { image: require('../../assets/images/login/3.png'), name: 'File 5', type: 'Rentgen', created_at: '11.04.2021' },
        // { image: require('../../assets/images/login/1.png'), name: 'File 1', type: 'Anamneza', created_at: '10.04.2021' },
        // { image: require('../../assets/images/login/2.png'), name: 'File 9', type: 'Rentgen', created_at: '03.04.2021' },
        // { image: require('../../assets/images/login/3.png'), name: 'File 7', type: 'Krvna Slika', created_at: '21.03.2021' },
        // { image: require('../../assets/images/login/1.png'), name: 'File 6', type: 'Rentgen', created_at: '17.03.2021' },
        // { image: require('../../assets/images/login/2.png'), name: 'File 3', type: 'Anamneza', created_at: '12.03.2021' },
        // { image: require('../../assets/images/login/3.png'), name: 'File 8', type: 'Rentgen', created_at: '08.03.2021' }
      ],
      disabled: true,
      disabledData: true,
      disabledNotes: true,
      disabledAllergies: true,
      disabledDoctors: true,
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
      municipalities: [],
      columnsInvoices: [
        { label: this.$t('EPR.invoicesColumn.type'), key: 'invoice_type', class: 'text-left' },
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
        { label: this.$t('EPR.invoicesColumn.amount'), key: 'charges_sum', class: 'text-left' },
        { label: this.$t('EPR.invoicesColumn.paymentStatus'),
          key: 'status',
          class: 'text-left',
          formatter: (value, key, item) => {
            if (item.paid_amount === '$0.00') {
              return this.$t('invoices.unpaid')
            }
            return item.total_with_vat === item.paid_amount ? this.$t('invoices.paid') : this.$t('invoices.partiallyPaid')
          },
          filterByFormatted: true
        },
        { label: this.$t('EPR.invoicesColumn.verificationStatus'),
          key: 'verification_status',
          class: 'text-left',
          formatter: (value, key, item) => {
            return this.$t(item.verification_status)
          }
        }
      ],
      servicesSummaryColumns: [
        { label: this.$t('EPR.servicesSummaryColumn.serviceTitle'), key: 'product_name', class: 'text-left' },
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
        { label: this.$t('reportingEmazing.servicesListColumn.serviceDoctor'), key: 'doctor', class: 'text-left' },
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
      ],
      numberOfVisits: 0
    }
  },
  watch: {
    'formAppointments.assignmentDate' () {
      if (!this.formAppointments.id) {
        this.formAppointments.end = new Date(moment(this.formAppointments.assignmentDate).add('0', 'hours').add('15', 'minutes'))
      }
    },
    '$i18n.locale' () {
      this.getProductGroups(this.$i18n.locale)
      this.getPatientPastAppointments(this.patientId, this.$i18n.locale)
      this.getPatientFutureAppointments(this.patientId, this.$i18n.locale)
    }
  },
  methods: {
    getLabels (lang) {
      getLabels(lang).then(response => {
        this.colors = response
      })
    },
    goToFiles () {
      $('#myTab a[href="#files"]').tab('show')
    },
    onCityChange () {
    },
    sortSelectedInvoice () {
      this.getPatientInvoices(this.patientId, this.sortByInvoice.sort.toUpperCase())
    },
    uploadFile (e) {
      fileUpload(e.target.files[0], this.$route.params.patientId).then(data => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
          let file = {
            image: reader.result,
            name: this.$route.params.patientId + '-' + Date.now() + '.' + e.target.files[0].type.split('/')[1],
            type: e.target.files[0].type.split('/')[1],
            created_at: moment(Date.now()).format('YYYY-MM-DD'),
            pdf: e.target.files[0].type.split('/')[1] === 'pdf'
          }
          this.files.push(file)
        }
        let type = data.data.split('.')[5]
        let img = data.data.split('/')[3]
        let file = {
          image: `/api/files/${img}`
        }
        if (type === 'tiff') {
          this.tiffConvertToCanvas(file, this.files.length)
        }
      })
    },
    getFiles () {
      getFiles().then(data => {
        for (let i = 0; i < data.data.Contents.length; i++) {
          let key = data.data.Contents[i].Key.split('-')[0]
          let type = data.data.Contents[i].Key.split('.')[1]
          let image = '/api/files/' + data.data.Contents[i].Key
          if (key === this.$route.params.patientId) {
            this.files.push({
              image: image,
              name: data.data.Contents[i].Key,
              type: type,
              created_at: moment(data.data.Contents[i].LastModified).format('YYYY-MM-DD'),
              pdf: type === 'pdf'
            })
          }
        }
      })
    },
    tiffConvertToCanvas (file, index, preview) {
      let type = file.image.split('.')[1]
      if (type === 'tiff') {
        let canvas = null
        const xhr = new XMLHttpRequest()
        xhr.open('GET', file.image)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function (e) {
          const buffer = xhr.response
          const tiff = new Tiff({ buffer: buffer })
          canvas = tiff.toCanvas()
          if (canvas) {
            if (preview) {
              setTimeout(() => {
                document.querySelector(`.tiff-block-${index}-preview`).append(canvas)
              }, 1000)
            }
            document.querySelector(`.tiff-block-${index}`).append(canvas)
          }
        }
        xhr.send()
      }
    },
    changeGeneralNotes (e) {
      this.generalNotes = this.notesGeneral.replace(/\n/g, '<br>')
    },
    selectedUser (val) {
    },
    getOptionLabel (option) {
      return (option && option.label) || ''
    },
    getMunicipalityLabel (city) {
      return (city && city.municipality_name)
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
    getPatient (id) {
      getEnquiryById(id).then(response => {
        this.patient = response[0]
        if (this.patient.date_of_birth !== null) {
          this.patient.date_of_birth = moment(this.patient.date_of_birth).format('YYYY-MM-DD')
        }
        if (this.patient.general_notes !== null) {
          this.notesGeneral = this.patient.general_notes.replace(/<br>/g, '\n')
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
    getPatientPastAppointments (id, lang) {
      getEnquiryPastAppointments(id, lang).then(response => {
        this.pastAppointments = _.takeRight(response, 5)
        this.numberOfVisits = response.length
        this.timeSinceFirstVisit = response.length && response[0].date
      }
      )
    },
    getPatientFutureAppointments (id, lang) {
      getEnquiryFutureAppointments(id, lang).then(response => {
        this.futureAppointments = _.takeRight(response, 5)
      })
    },
    getPatientAssignments (id) {
      getEnquiryAssignments(id).then(response => {
        this.assignments = response
      })
    },
    getPatientInvoices (id, sort) {
      getEnquiryInvoices(id, sort).then(response => {
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
    getMunicipalities () {
      getMunicipalitiesList().then(response => {
        this.municipalities = response
      })
    },
    invoiceSelected (item) {
      this.$router.push({ path: `/documents/invoices/${item.invoice_id}` })
    },
    addInvoice () {
      this.modalInvoiceShow = true
    },
    editPatientData () {
      this.disabledData = !this.disabledData
      this.tempPatient = Object.assign({}, this.patient)
    },
    editPatientNotes () {
      this.disabledNotes = !this.disabledNotes
      this.tempPatient = Object.assign({}, this.patient)
    },
    editPatientAllergies () {
      this.disabledAllergies = !this.disabledAllergies
      this.tempPatient = Object.assign({}, this.patient)
    },
    editPatientDoctors () {
      this.disabledDoctors = !this.disabledDoctors
      this.tempPatient = Object.assign({}, this.patient)
    },
    cancelEditingPatientData () {
      this.disabledData = !this.disabledData
      this.patient = this.tempPatient
    },
    cancelEditingPatientNotes () {
      this.disabledNotes = !this.disabledNotes
      this.patient = this.tempPatient
    },
    cancelEditingPatientAllergies () {
      this.disabledAllergies = !this.disabledAllergies
      this.patient = this.tempPatient
    },
    cancelEditingPatientDoctors () {
      this.disabledDoctors = !this.disabledDoctors
      this.patient = this.tempPatient
    },
    updatePatient () {
      this.patient.general_notes = this.generalNotes
      updateEnquiry(this.patientId, this.patient).then((response) => {
        this.patient = response
        this.$bvToast.show('b-toaster-bottom-right')
      })
    },
    trashPatient () {
      trashEnquiry(this.patientId).then(() => {
        this.$router.push({ path: `/patients` })
      })
    },
    addOffer () {

    },
    add_file () {
    },
    resetForm () {
      this.user = {
        profile_image: require('../../assets/images/user/11.png'),
        background: require('../../assets/images/page-img/profile-bg.jpg'),
        profile: require('../../assets/images/user/11.png')
      }
    },
    submitData () {
      this.disabledData = true
      this.updatePatient()
      // this.$refs['my-modal'].show() prikazi modal ukoliko dodje do greske neke
    },
    submitNotes () {
      this.disabledNotes = true
      this.updatePatient()
    },
    submitAllergies () {
      this.disabledAllergies = true
      this.updatePatient()
    },
    submitDoctors () {
      this.disabledDoctors = true
      this.updatePatient()
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
    getUsersForAssignments () {
      getUsersForAssignments().then(response => {
        this.users = response
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
    defaultFormAppointment () {
      return {
        id: '',
        notes: '',
        location_id: location.city,
        doctor_id: '',
        assignmentDate: '',
        end: '',
        hours: '',
        minutes: '',
        backgroundColor: '',
        description: '',
        product_groups: '',
        appointment_canceled_in_advance_by_clinic: false,
        appointment_canceled_in_advance_by_patient: false
      }
    },
    cancelAssignments () {
      this.formData = this.defaultFormData()
    },
    dateDisabled (ymd, date) {
      const weekday = date.getDay()
      const day = date.getDate()
      return weekday === 0 || weekday === 6 || day === 13
    },
    addAssignments () {
      createAssignments(this.formData).then(() => {
        this.getPatientAssignments(this.patientId)
        this.formData = this.defaultFormData()
      })
    },
    addNotes () {
      this.notesFormData.user_id = this.logedInUser.id
      createEnquiryNotes(this.notesFormData).then(() => {
        this.getPatientNotes(this.patientId)
        this.cancelNotes()
      })
    },
    chooseInvoice () {
      switch (this.selectedInvoices) {
        case 'new-invoice':
          return this.$router.push({ path: `/documents/invoices/${this.patient.id}/${this.selectedInvoices}` })
        case 'new-adv-payment':
          return this.$router.push({ path: `/documents/advance-payments/${this.patient.id}/${this.selectedInvoices}` })
        case 'offer':
          return this.$router.push({ path: `/documents/offer/${this.patient.id}/${this.selectedInvoices}` })
        default:
      }
    },
    cancelNotes () {
      this.notesFormData.content = ''
    },
    cancelInvoices () {
      this.modalInvoiceShow = false
      this.selectedInvoices = ''
    },
    addAppointment () {
      this.addAppointmentModal = true
      this.disabled = false
    },
    closeAppointmentModal () {
      this.addAppointmentModal = false
      this.formAppointments = this.defaultFormAppointment()
      this.disabled = true
    },
    updateCalendar (id, appointment) {
      updateCalendar(id, appointment).then(() => {
        this.addAppointmentModal = false
        this.getPatientPastAppointments(this.patientId, this.$i18n.locale)
        this.getPatientFutureAppointments(this.patientId, this.$i18n.locale)
      })
    },
    saveAppointment  () {
      this.addAppointmentModal = false
      this.formAppointments.resourceId = this.formAppointments.doctorId
      this.formAppointments.patientId = this.patient.id
      if (typeof this.formAppointments.doctorId === 'number') {
        let doctor = this.doctors.find(doctor => doctor.id === this.formAppointments.doctorId)
        this.formAppointments.doctorId = doctor.name
      }
      if (typeof this.formAppointments.locationId === 'number') {
        let location = this.locations.find(location => location.id === this.formAppointments.locationId)
        this.formAppointments.locationId = location.city
      }
      if (typeof this.formAppointments.product_groups === 'object') {
        this.formAppointments.product_groups = this.formAppointments.product_groups.product_group_id
      }
      if (typeof this.formAppointments.backgroundColor === 'string') {
        this.formAppointments.backgroundColor = this.colors.find(label => {
          return label.value === this.formAppointments.backgroundColor
        })
      }
      if (!this.formAppointments.id) {
        createCalendar(this.formAppointments).then(() => {
          this.formAppointments = this.defaultFormAppointment()
          this.$emit('setModalShow', false)
          this.getPatientFutureAppointments(this.patientId, this.$i18n.locale)
        })
      } else {
        this.updateCalendar(this.formAppointments.id, this.formAppointments)
      }
    },
    getLocations () {
      getLocationsList().then(response => {
        this.locations = response
        if (response.length === 1) {
          this.formAppointments.locationId = response[0].city
        }
      })
    },
    getDoctors () {
      getDoctorList().then((response) => {
        this.doctors = response
        this.formAppointments.doctor_id = response.find(doctor => doctor.name === this.logedInUser.name)
      })
    },
    getUserLogin () {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.logedInUser = response
        }
      })
    },
    getProductGroups (lang) {
      getProductGroups(lang).then((response) => {
        this.product_groups = response
      })
    },
    openAppointmentModal (appointment) {
      this.formAppointments = {
        id: appointment.appointment_id,
        locationId: appointment.location,
        doctorId: appointment.doctor_name,
        notes: appointment.note,
        product_groups: appointment.product_group_text,
        assignmentDate: new Date(moment(appointment.date).format('YYYY-MM-DD') + 'T' + appointment.time),
        end: new Date(appointment.end_time),
        backgroundColor: appointment.label_text,
        appointment_canceled_in_advance_by_patient: false,
        appointment_canceled_in_advance_by_clinic: false
      }
      this.addAppointmentModal = true
    },
    showLabels (item) {
      if (this.disabled && this.formAppointments.label_id === item.id) {
        return true
      } else if (!this.disabled) {
        return true
      }
    },
    editMode (e) {
      e.preventDefault()
      this.disabled = false
    },
    closeCancelation () {
      this.openCancelationModal = false
      this.formAppointments.appointment_canceled_in_advance_by_clinic = false
      this.formAppointments.appointment_canceled_in_advance_by_patient = false
    },
    roundUpStartTime () {
      let startTime = new Date()
      startTime.setHours(startTime.getHours() + Math.ceil(startTime.getMinutes() / 60))
      startTime.setMinutes(0, 0, 0)
      return startTime
    }
  }
}
</script>

<style lang="scss">
.clickable {
  cursor: pointer !important;
}
.labels {
    border-radius: 10px !important;
    margin: .225rem !important;
}

.no-border {
    border: none !important;
}

.margin-left {
    margin-left: -0.775rem !important;
}

#dateInput {
    color: transparent !important;
}

.upload-image {
    margin-left: -25px;
    opacity: 0;
}
.upload-image .custom-file-label {
    cursor: pointer;
}

.margin-top {
    margin-top: -0.5rem !important;
}

.margin-top-edit-btn {
    margin-top: -0.225rem !important;
}

.margin-top-city {
    margin-top: -0.05rem !important;
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

.patient-filex {
  max-width: 250px !important;
  margin: 0 auto;
  display: block;
}

.img-files {
  display: block;
  margin: 0 auto;
  max-width: 300px !important;
}

.profile-preview-gallery {
  .img-files {
    max-width: 120px !important;
  }
}

canvas {
  max-width: 300px;
  display: block;
  margin: 0 auto;
  &:not(:first-child)
  {
    display: none;
  }
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
