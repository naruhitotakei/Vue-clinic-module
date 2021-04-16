<template>
  <b-container fluid>
    <form>
      <b-row>
        <b-col lg="12">
          <iq-card body-class="p-0">
            <template v-slot:body>
              <div class="iq-edit-list">
                  <tab-nav :pills="true" class="iq-edit-profile d-flex">
                      <a id="myTab" class="nav-link show col p-0 ri-arrow-left-line" style="padding: 10px 0px !important; font-size: x-large;" @click="$router.push('/patients')" :active="false"></a>
                      <!-- <tab-nav-items class="col p-0" :active="false" href="/patients" title="Back" /> -->
                      <tab-nav-items class="col p-0" :active="true" href="#overview" title="Overview" />
                      <tab-nav-items class="col-md-2 p-0" :active="false" href="#info" title="Personal Information" />
                      <tab-nav-items class="col p-0" :active="false" href="#files" title="Files" />
                      <tab-nav-items class="col p-0" :active="false" href="#invoices" title="Invoices" />
                      <tab-nav-items class="col p-0" :active="false" href="#offers" title="Offers" />
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
                                                  <img src="../../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid">
                                              </div>
                                              <div class="text-center mt-3">
                                                  <h4><b>Anita Jereb</b></h4>
                                              </div>
                                              <hr>
                                              <ul class="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0">
                                                  <li class="text-center">
                                                      <h4 class="counter">4</h4>
                                                      <span>Number of visits</span>
                                                  </li>
                                                  <li class="text-center">
                                                      <h4 class="counter">9 m, 13 d</h4>
                                                      <span>Time since first visit</span>
                                                  </li>
                                              </ul>
                                              <hr>
                                              <div class="row ml-1">
                                                  <div class="col-3">Phone:</div>
                                                  <div class="col-9">+38640076191</div>
                                                  <div class="col-3">Email:</div>
                                                  <div class="col-9">anita.jereb@staging.emazing.si</div>
                                                  <div class="col-3">Address:</div>
                                                  <div class="col-9">Prva ulica 11, 1000 Ljubljana</div>
                                              </div>
                                          </div>
                                      </template>
                                      <div class="bg-primary pb-2 p-1" style="border-radius: 0 0 25px 25px;">
                                          <b-col md="14" class="d-flex justify-content-center">
                                              <button type="" class="btn btn-light m-2">Add Appointment</button>&nbsp;
                                              <button type="" class="btn btn-light m-2">Add Assignment</button>&nbsp;
                                          </b-col>
                                          <b-col class="text-center">
                                              <button type="" class="btn btn-danger">Delete Patient</button>
                                          </b-col>
                                      </div>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="iq-card-header d-flex justify-content-between">
                                              <div class="iq-header-title">
                                                  <h4 class="card-title">Personal doctors</h4><hr />
                                              </div>
                                          </div>
                                          <div class="iq-card-body">
                                              <div class="row font-size-16">
                                                  <div class="col-6"><h6>Personal dentist:</h6></div>
                                                  <div class="col-6">Dr. Miha Breznik</div>
                                                  <div class="col-6"><h6>Personal surgeon:</h6></div>
                                                  <div class="col-6">Dr. Nika Klemenc</div>
                                              </div>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card body-class="iq-card-body">
                                      <template v-slot:body>
                                          <div class="iq-card-header d-flex justify-content-between">
                                              <div class="iq-header-title">
                                                  <h4 class="card-title">Files (9)</h4><hr />
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
                                      <b-card title="General Notes" class="iq-card">
                                          <hr />
                                          <b-card-text style="color:black;">This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</b-card-text>
                                          <b-card-text><small class="text-muted">Last updated 3 mins ago</small></b-card-text>
                                      </b-card>
                                  </b-col>
                                  <b-card text-variant="white"
                                          bg-variant="danger"
                                          class="iq-card">
                                      <b-card-title class="text-white">Allergies</b-card-title>
                                      <blockquote class="blockquote mb-0">
                                          <p class="font-size-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                                          <footer class="blockquote-footer text-white font-size-12">Last updated 2 weeks ago</footer>
                                      </blockquote>
                                  </b-card>
                                  <b-row>
                                      <b-col md="6" class="pr-0">
                                          <iq-card>
                                              <template v-slot:body>
                                                  <div class="iq-card-header d-flex justify-content-between">
                                                      <div class="iq-header-title">
                                                          <h4 class="card-title">Patient Notes</h4><hr />
                                                      </div>
                                                  </div>
                                                  <ul class="list-inline m-0 overflow-y-scroll" style="max-height: 300px;">
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Treatment was good!</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>My Health in better now</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Not Effected</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Operation Successful</h6>
                                                              <p class="mb-0">03/03/2021</p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Medical Care is just a click away</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Not Effected</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>Treatment was good!</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
                                                      </li>
                                                      <li class="d-flex align-items-center justify-content-between mb-3">
                                                          <div>
                                                              <h6>My Health in better now</h6>
                                                              <p class="mb-0">03/03/2021 </p>
                                                          </div>
                                                          <div><a href="#" class="btn iq-bg-primary mr-2">Open</a></div>
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
                                                          <h4 class="card-title">Future Appointments</h4><hr />
                                                      </div>
                                                  </div>
                                                  <ul class="iq-timeline">
                                                      <li>
                                                          <div class="timeline-dots border-success"></div>
                                                          <h6 class="">Check up</h6>
                                                          <small class="mt-1">23 June 2021</small>
                                                      </li>
                                                  </ul>
                                              </template>
                                          </iq-card>
                                          <iq-card>
                                              <template v-slot:body>
                                                  <div class="iq-card-header d-flex justify-content-between">
                                                      <div class="iq-header-title">
                                                          <h4 class="card-title">Past Appointments</h4>
                                                          <hr />
                                                      </div>
                                                  </div>
                                                  <ul class="iq-timeline">
                                                      <li>
                                                          <div class="timeline-dots border-success"></div>
                                                          <h6 class="">Dr. Ahlin Send you Photo</h6>
                                                          <small class="mt-1">23 November 2019</small>
                                                      </li>
                                                      <li>
                                                          <div class="timeline-dots border-danger"></div>
                                                          <h6 class="">Reminder : Opertion Time!</h6>
                                                          <small class="mt-1">20 November 2019</small>
                                                      </li>
                                                      <li>
                                                          <div class="timeline-dots border-primary"></div>
                                                          <h6 class="mb-1">Patient Call</h6>
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
                                              <b-form-file class="h-100 position-absolute" accept="image/*" style="opacity: 0;" @change="previewImage"></b-form-file>
                                          </div>
                                      </div>
                                  </div>
                                  <b-button variant="primary" @click="disabled = !disabled" class="btn-add-patient btn-edit-patient" >Edit</b-button>
                              </b-col>
                          </b-form-group>
                          <b-row>
                              <b-col lg="6">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <div class="iq-header-title">
                                                  <h4 class="card-title">Personal Information</h4>
                                              </div>
                                          </div>
                                          <b-row align-v="center">
                                              <b-form-group class="col-md-12" label-cols-sm="4" label="First Name:" label-for="fname">
                                                  <ValidationProvider name="fname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="user.fname" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label="Last Name:" label-for="lname">
                                                  <ValidationProvider name="lname" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="user.lname" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>

                                              <b-form-group class="col-md-12" label-cols-sm="4" label="Date of birth:" label-for="dob">
                                                  <ValidationProvider name="dob" rules="required" v-slot="{ errors }">
                                                      <b-form-input :disabled="disabled" v-model="user.dob" type="date" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                                      <div class="invalid-feedback">
                                                          <span>{{ errors[0] }}</span>
                                                      </div>
                                                  </ValidationProvider>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label="Gender:" label-for="gender" label-class="d-block">
                                                  <b-form-radio inline v-model="user.gender" :disabled="disabled" value="male">Male</b-form-radio>
                                                  <b-form-radio inline v-model="user.gender" :disabled="disabled" value="female">Female</b-form-radio>
                                                  <b-form-radio inline v-model="user.gender" :disabled="disabled" value="unspecified">Unspecified</b-form-radio>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label="Address:" label-for="address">
                                                  <b-form-textarea :disabled="disabled" name="address" v-model="user.address" style="line-height: 22px;" rows="3">
                                                  </b-form-textarea>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" style="justify-content: space-between;" label-cols-sm="4" label="Postcode, City:" label-for="city">
                                                  <b-form-input :disabled="disabled" class="col-md-6" style="float: left;" v-model="user.postcode" type="text"></b-form-input>
                                                  <b-form-input :disabled="disabled" class="col-md-6" v-model="user.city" type="text"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="country" label="Country:">
                                                  <b-form-select :disabled="disabled" plain v-model="user.country" :selected="user.country" :options="countries" id="exampleFormControlSelect3">
                                                  </b-form-select>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="citizenship" label="Citizenship:">
                                                  <b-form-input :disabled="disabled" name="citizenship" type="text" v-model="user.citizenship"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="region" label="Region(EU):">
                                                  <b-form-input :disabled="disabled" name="region" type="text" v-model="user.region"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="insurance" label="Insurance number, insured at:">
                                                  <b-form-input :disabled="disabled" class="col-md-6" style="float: left;" name="insurance_no" type="text" v-model="user.insurance_no"></b-form-input>
                                                  <b-form-input :disabled="disabled" class="col-md-6" name="insured_at" type="text" v-model="user.insured_at"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="mobile_no" label="Mobile number:">
                                                  <b-form-input :disabled="disabled" name="mobile_no" type="text" v-model="user.mobile_no"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="email" label="Email-address:">
                                                  <b-form-input :disabled="disabled" name="email" type="text" v-model="user.email"></b-form-input>
                                              </b-form-group>
                                              <b-form-group class="col-md-12" label-cols-sm="4" label-for="tax_no" label="Tax number:">
                                                  <b-form-input :disabled="disabled" name="tax_no" type="text" v-model="user.tax_no"></b-form-input>
                                              </b-form-group>
                                          </b-row>
                                      </template>
                                  </iq-card>
                              </b-col>
                              <b-col lg="6">
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <h4>Allergies and sensitivities</h4>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <textarea :disabled="disabled" style="line-height: 30px;" v-model="user.allergies" class="textarea form-control" rows="7"></textarea>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <h4>General Notes</h4>
                                          </div>
                                          <div class="iq-card-body p-0">
                                              <textarea :disabled="disabled" style="line-height: 30px;" v-model="user.reminder" class="textarea form-control" rows="7"></textarea>
                                          </div>
                                      </template>
                                  </iq-card>
                                  <iq-card>
                                      <template v-slot:body>
                                          <div class="pl-0 iq-card-header d-flex justify-content-between">
                                              <h4>Personal Doctors</h4>
                                              <hr />
                                          </div>
                                          <div class="iq-card-body">
                                              <div class="row">
                                                  <div class="col-4 pr-1 pl-0 text-black">Dentist:</div>
                                                  <b-form-input :disabled="disabled" v-model="user.dentist" class="col-8 mb-2" type="text"></b-form-input>
                                                  <div class="col-4 pr-1 pl-0 text-black">Surgeon:</div>
                                                  <b-form-input :disabled="disabled" v-model="user.surgeon" class="col-8" type="text"></b-form-input>
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
                          <div class="text-center p-1" v-if="successfullEditMessage">
                              <b-alert :show="dismissCountDown" @dismissed="dismissCountDown=0" variant="success" style="shape-outside: content-box;" class="text-white bg-success col-md-4 float-right">
                                  <div class="iq-alert-icon">
                                      <i class="ri-checkbox-circle-line"></i>
                                  </div>
                                  <div class="iq-alert-text">Changes saved</div>
                              </b-alert>
                          </div>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="emailandsms">
                      <iq-card>
                          <template v-slot:headerTitle>
                              <h4 class="card-title">Email and SMS</h4>
                          </template>
                          <template v-slot:body>
                              <div class="form-group row align-items-center">
                                  <label class="col-md-3" for="emailnotification">Email Notification:</label>
                                  <div class="col-md-9 custom-control custom-switch">
                                      <input type="checkbox" class="custom-control-input" id="emailnotification" checked="">
                                      <label class="custom-control-label" for="emailnotification"></label>
                                  </div>
                              </div>
                              <div class="form-group row align-items-center">
                                  <label class="col-md-3" for="smsnotification">SMS Notification:</label>
                                  <div class="col-md-9 custom-control custom-switch">
                                      <input type="checkbox" class="custom-control-input" id="smsnotification" checked="">
                                      <label class="custom-control-label" for="smsnotification"></label>
                                  </div>
                              </div>
                              <div class="form-group row align-items-center">
                                  <label class="col-md-3" for="npass">When To Email</label>
                                  <div class="col-md-9">
                                      <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" id="email01">
                                          <label class="custom-control-label" for="email01">You have new notifications.</label>
                                      </div>
                                      <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" id="email02">
                                          <label class="custom-control-label" for="email02">You're sent a direct message</label>
                                      </div>
                                      <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" id="email03" checked="">
                                          <label class="custom-control-label" for="email03">Someone adds you as a connection</label>
                                      </div>
                                  </div>
                              </div>
                              <div class="form-group row align-items-center">
                                  <label class="col-md-3" for="npass">When To Escalate Emails</label>
                                  <div class="col-md-9">
                                      <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" id="email04">
                                          <label class="custom-control-label" for="email04"> Upon new order.</label>
                                      </div>
                                      <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" id="email05">
                                          <label class="custom-control-label" for="email05"> New membership approval</label>
                                      </div>
                                      <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" id="email06" checked="">
                                          <label class="custom-control-label" for="email06"> Member registration</label>
                                      </div>
                                  </div>
                              </div>
                              <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
                              <b-button type="reset" variant="none" class="iq-bg-danger">Cancel</b-button>
                          </template>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="manage-contact">
                      <iq-card>
                          <template v-slot:headerTitle>
                              <h4 class="card-title">Manage Contact</h4>
                          </template>
                          <template v-slot:body>
                              <b-form>
                                  <b-form-group>
                                      <label for="contact_no">Contact Number:</label>
                                      <b-form-input id="contact_no" type="text" v-model="user.mobile_no"></b-form-input>
                                  </b-form-group>
                                  <b-form-group>
                                      <label for="email">Email:</label>
                                      <b-form-input id="email" type="text" v-model="user.email"></b-form-input>
                                  </b-form-group>
                                  <b-form-group>
                                      <label for="url">Url:</label>
                                      <b-form-input id="url" type="text" v-model="user.url"></b-form-input>
                                  </b-form-group>
                                  <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
                                  <b-button type="reset" variant="none" class="iq-bg-danger">Cancel</b-button>
                              </b-form>
                          </template>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="files">
                      <iq-card body-class="iq-card-body">
                          <template v-slot:headerTitle>
                              <h3 class="card-title" style="margin-top: 10px;">Files</h3>
                              <div class="btn-add-patient">
                                  <b-button variant="primary" @click="add_file"><i class="ri-add-line mr-2"></i>New File</b-button>
                              </div>
                              <div class="iq-card-header-toolbar d-flex align-items-center" style="margin-top: -10px;">
                                  <div class="iq-search-bar">
                                      <form action="#" class="searchbox">
                                          <input type="text" class="text search-input" placeholder="Search" @keyup="myFunction($event.target.value)">
                                          <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                                      </form>
                                  </div>
                                  <iq-card>
                                      <b-form-group label-for="searchOptions"
                                                    label="Search By:">
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
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 1</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 2</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 3</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 4</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 5</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 6</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 7</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 8</p><p>Created at: 03-03-2021</p></div></li>
                                      <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a><div class="text-center"><p class="mb-0">File name: File 9</p><p>Created at: 03-03-2021</p></div></li>
                                  </ul>
                              </div>
                          </template>
                      </iq-card>
                  </tab-content-item>
                  <tab-content-item :active="false" id="invoices">
                      <iq-card>
                          <template v-slot:headerTitle>
                              <h3 class="card-title" style="margin-top: 10px;">
                                  Invoices<span class="float-right">
                                      <b-button variant="primary" @click="add_invoice"><i class="ri-add-line mr-2"></i>New Invoice</b-button>
                                  </span>
                              </h3>
                          </template>
                          <template v-slot:body>
                              <b-row>
                                  <b-col md="12" class="table-responsive">
                                      <b-table id="patient-invoices"
                                               bordered
                                               hover
                                               @row-clicked="$router.push('/extra-pages/invoice-example')"
                                               style="cursor: pointer;"
                                               :items="itemsInvoices"
                                               :fields="columnsInvoices"
                                               :per-page="perPage"
                                               :current-page="currentPage">
                                      </b-table>
                                  </b-col>
                              </b-row>
                              <template>
                                  <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                                  <div class="mt-3">
                                      <b-pagination v-model="currentPage"
                                                    :total-rows="totalRows"
                                                    :per-page="perPage"
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
                                  Offers<span class="float-right">
                                      <b-button variant="primary" @click="add_offer"><i class="ri-add-line mr-2"></i>New Offer</b-button>
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
                                               :items="itemsOffers"
                                               :fields="columnsOffers"
                                               :per-page="perPage"
                                               :current-page="currentPage">
                                      </b-table>
                                  </b-col>
                              </b-row>
                              <template>
                                  <b-collapse id="collapse-6" class="mb-2"> </b-collapse>
                                  <div class="mt-3">
                                      <b-pagination v-model="currentPage"
                                                    :total-rows="totalRows"
                                                    :per-page="perPage"
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
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'

var rowsInvoices = [
  {
    invoice_no: 'invoice372',
    amount: '90 EUR',
    issued_by: 'Dr. Damjan Ahlin',
    date: '27.02.2021-14:00',
    status: 'Paid'
  },
  {
    invoice_no: 'invoice405',
    amount: '70 EUR',
    issued_by: 'Dr. Silvija Lenart',
    date: '14.03.2021-11:00',
    status: 'Paid'
  },
  {
    invoice_no: 'invoice499',
    amount: '70 EUR',
    issued_by: 'Dr. Bojan Jernejc',
    date: '28.03.2021-12:00',
    status: 'Unpaid'
  }
]
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
  },
  data () {
    return {
      dismissCountDown: 0,
      dismissSecs: 3,
      successfullEditMessage: false,
      dropDownText: '',
      selected: this.value,
      searchOptions: [
        { value: 'file_name', text: 'File Name' },
        { value: 'created_at', text: 'Created Date' }
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
      countries: [
        { value: 'Slovenia', text: 'Slovenia' },
        { value: 'Canada', text: 'Canada' },
        { value: 'Niada', text: 'Niada' },
        { value: 'USA', text: 'USA' },
        { value: 'India', text: 'India' },
        { value: 'Africa', text: 'Africa' }
      ],
      columnsInvoices: [
        { label: 'Number', key: 'invoice_no', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left' },
        { label: 'Issued by', key: 'issued_by', class: 'text-left' },
        { label: 'Invoice amount', key: 'amount', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' }
      ],
      columnsOffers: [
        { label: 'Number', key: 'offer_no', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left' },
        { label: 'Issued by', key: 'issued_by', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' }
      ],
      itemsInvoices: rowsInvoices,
      itemsOffers: rowsOffers,
      currentPage: 1,
      perPage: 10
    }
  },
  methods: {
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
      this.dismissCountDown = this.dismissSecs
      this.successfullEditMessage = true
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
