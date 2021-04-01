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
                  <tab-nav-items class="col p-0" :active="false" href="#appointments" title="Appointments" />
                  <tab-nav-items class="col p-0" :active="false" href="#offers" title="Offers" />
                  <tab-nav-items class="col p-0" :active="false" href="#invoices" title="Invoices" />
                </tab-nav>
              </div>
            </template>
          </iq-card>
        </b-col>
        <b-col lg="12">
          <div class="iq-edit-list-data">
            <tab-content id="pills-tabContent-2">
              <tab-content-item :active="true" id="overview" >
                <iq-card style="background: none;">
                  <b-row>
      <b-col lg="4">
        <iq-card body-class="iq-card-body pl-0 pr-0 pt-0">
          <template v-slot:body>
            <div class="docter-details-block">
              <div class="doc-profile-bg bg-primary" style="height:100px;">
              </div>
              <div class="docter-profile text-center">
                <b-img :src="doctor.profile" alt="profile-img" class="avatar-130 img-fluid" />
              </div>
              <div class="text-center mt-3 pl-3 pr-3">
                <h4><b>Nika Klemenc</b></h4>
                <!-- <p>Kirurg</p> -->
                </div>
              <hr>
              <ul class="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0">
                <li class="text-center">
                  <h4 class="counter">4</h4>
                  <span>Number of visits</span>
                </li>
                <li class="text-center">
                  <h4 class="counter">2021-03-03</h4>
                  <span>Time since first visit</span>
                </li>
              </ul>
              <hr>
              <div class="row px-3 ml-1">
                  <div class="col-4">Phone:</div>
                  <div class="col-8">9876543210</div>
                  <div class="col-4">Email:</div>
                  <div class="col-8">nika@staging.in</div>
                  <div class="col-4">Address:</div>
                  <div class="col-8">abc, New York</div>
                </div>
            </div>
          </template>
        </iq-card>
        <iq-card body-class="iq-card-body">
          <template v-slot:body>
            <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Personal doctors</h4><hr/>
              </div>
            </div>
            <div class="iq-card-body">
                <div class="row">
                  <div class="col-7">Personal dentist:</div>
                  <div class="col-5">Nika</div>
                  <div class="col-7">Personal surgeon:</div>
                  <div class="col-5">Klemenc</div>
                </div>
            </div>
          </template>
        </iq-card>
        <iq-card body-class="iq-card-body">
          <template v-slot:body>
            <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Photos</h4><hr/>
              </div>
            </div>
            <div class="iq-card-body">
              <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-3"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/1.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/2.png" alt="gallary-image" class="img-fluid"></a></li>
                <li class="col-md-4 col-6 pb-0"><a href="javascript:void(0);"><img src="../../assets/images/login/3.png" alt="gallary-image" class="img-fluid"></a></li>
              </ul>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="8">
        <b-container>
        <b-row>
          <b-col md="6">
            <iq-card>
              <template v-slot:body>
                <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Patient Notes</h4><hr/>
              </div>
            </div>
                <ul class="list-inline m-0 p-0">
                  <li class="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6>Treatment was good!</h6>
                      <p class="mb-0">03/03/2021</p>
                    </div>
                    <div><a href="#" class="btn iq-bg-primary">Open</a></div>
                  </li>
                  <li class="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6>My Health in better Now</h6>
                      <p class="mb-0">03/03/2021</p>
                    </div>
                    <div><a href="#" class="btn iq-bg-primary">Open</a></div>
                  </li>
                  <li class="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6>No Effacted</h6>
                      <p class="mb-0">03/03/2021</p>
                    </div>
                    <div><a href="#" class="btn iq-bg-primary">Open</a></div>
                  </li>
                  <li class="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6>Operation Successfull</h6>
                      <p class="mb-0">03/03/2021</p>
                    </div>
                    <div><a href="#" class="btn iq-bg-primary">Open</a></div>
                  </li>
                  <li class="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6>Medical Care is just a click away</h6>
                      <p class="mb-0">03/03/2021 </p>
                    </div>
                    <div><a href="#" class="btn iq-bg-primary">Open</a></div>
                  </li>
                </ul>
              </template>
            </iq-card>
          <b-card
          text-variant="white"
          bg-variant="danger"
          class="iq-mb-3 iq-card"
        >
          <b-card-title class="text-white">Allergies</b-card-title>
          <blockquote class="blockquote mb-0">
            <p class="font-size-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer text-white font-size-12">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </b-card>
          </b-col>
          <b-col md="6">
            <iq-card>
              <template v-slot:body>
                <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Future Appointments</h4><hr/>
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
            <iq-card>
              <template v-slot:body>
                <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Past Appointments</h4>
                <hr/>
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
          <b-col md="12">
          <b-card title="General Notes" class="iq-mb-3 iq-card"><hr/>
            <b-card-text>This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</b-card-text>
            <b-card-text><small class="text-muted">Last updated 3 mins ago</small></b-card-text>
          </b-card>
          </b-col>
          <b-col md="12" style="text-align: right;">
            <button type="" class="btn btn-primary">Add Appointment</button>&nbsp;&nbsp;
            <button type="" class="btn btn-primary">Add Assignment</button>&nbsp;&nbsp;
            <button type="" class="btn btn-primary">Delete Patient</button>
          </b-col>
        </b-row>
        </b-container>
      </b-col>
    </b-row>
                </iq-card>
              </tab-content-item>
              <tab-content-item :active="false" id="info" >
                 <iq-card style="background: none;">
                    <b-form-group class="row align-items-center /*justify-content-center*/">
                        <b-col md="12">
                          <div class="profile-img-edit">
                            <b-img :src="user.profile_image" class="profile-pic height-150 width-150" alt="profile-pic"/>
                            <input type="hidden" v-model="user.profile_image">
                            <div class="p-image">
                              <div class="position-relative">
                                <i class="ri-pencil-line upload-button" @click="disabled = (disabled + 1) % 2"></i>
                                <b-form-file class="h-100 position-absolute" accept="image/*" style="opacity: 0;" @change="previewImage"></b-form-file>
                              </div>
                            </div>
                          </div>
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
                            <b-form-input :disabled="disabled == 1" v-model="user.fname" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label="Last Name:" label-for="lname">
                          <ValidationProvider name="lname" rules="required" v-slot="{ errors }">
                            <b-form-input :disabled="disabled == 1" v-model="user.lname" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>

                        <b-form-group class="col-md-12" label-cols-sm="4" label="Date of birth:" label-for="dob">
                          <ValidationProvider name="dob" rules="required" v-slot="{ errors }">
                            <b-form-input :disabled="disabled == 1" v-model="user.dob" type="date" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group :disabled="disabled == 1" class="col-md-12" label-cols-sm="4" label="Gender:" label-for="gender" label-class="d-block">
                          <b-form-radio inline v-model="user.gender" value="male">Male</b-form-radio>
                          <b-form-radio inline v-model="user.gender" value="female">Female</b-form-radio>
                          <b-form-radio inline v-model="user.gender" value="unspecified">Unspecified</b-form-radio>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label="Address:" label-for="address">
                          <b-form-textarea :disabled="disabled == 1" name="address" v-model="user.address" style="line-height: 22px;" rows="3">
                          </b-form-textarea>
                        </b-form-group>
                        <b-form-group class="col-md-12" style="justify-content: space-between;" label-cols-sm="4" label="Postcode, City:" label-for="city">
                          <b-form-input :disabled="disabled == 1" class="col-md-6" style="float: left;" v-model="user.postcode" type="text"></b-form-input>
                          <b-form-input :disabled="disabled == 1" class="col-md-6" v-model="user.city" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label-for="country" label="Country:">
                          <b-form-select :disabled="disabled == 1" plain v-model="user.country" :selected="user.country" :options="countries" id="exampleFormControlSelect3">
                          </b-form-select>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label-for="citizenship" label="Citizenship:">
                          <b-form-input :disabled="disabled == 1" name="citizenship" type="text" v-model="user.citizenship"></b-form-input>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label-for="region" label="Region(EU):">
                          <b-form-input :disabled="disabled == 1" name="region" type="text" v-model="user.region"></b-form-input>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label-for="insurance" label="Insurance number, insured at:">
                          <b-form-input :disabled="disabled == 1" class="col-md-6" style="float: left;" name="insurance_no" type="text" v-model="user.insurance_no"></b-form-input>
                          <b-form-input :disabled="disabled == 1" class="col-md-6" name="insured_at" type="text" v-model="user.insured_at"></b-form-input>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label-for="mobile_no" label="Mobile number:">
                          <b-form-input :disabled="disabled == 1" name="mobile_no" type="text" v-model="user.mobile_no"></b-form-input>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label-for="email" label="Email-address:">
                          <b-form-input :disabled="disabled == 1" name="email" type="text" v-model="user.email"></b-form-input>
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols-sm="4" label-for="tax_no" label="Tax number:">
                          <b-form-input :disabled="disabled == 1" name="tax_no" type="number" v-model="user.tax_no"></b-form-input>
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
                <textarea :disabled="disabled == 1" style="line-height: 30px;" v-model="user.allergies" class="textarea form-control" rows="7"></textarea>
            </div>
          </template>
        </iq-card>
         <iq-card>
          <template v-slot:body>
            <div class="pl-0 iq-card-header d-flex justify-content-between">
                <h4>Reminders</h4>
            </div>
            <div class="iq-card-body p-0">
                <textarea :disabled="disabled == 1" style="line-height: 30px;" v-model="user.reminder" class="textarea form-control" rows="7"></textarea>
            </div>
          </template>
        </iq-card>
         <iq-card>
          <template v-slot:body>
            <div class="pl-0 iq-card-header d-flex justify-content-between">
                <h4>Other Information</h4>
                <hr/>
            </div>
            <div class="iq-card-body">
                <div class="row">
                  <div class="col-4 pr-1 pl-0">Dentist:</div>
                  <b-form-input :disabled="disabled == 1" v-model="user.dentist" class="col-8 mb-2" type="text"></b-form-input>
                  <div class="col-4 pr-1 pl-0">Surgeon:</div>
                  <b-form-input :disabled="disabled == 1" v-model="user.surgeon" class="col-8" type="text"></b-form-input>
                </div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
          <div class="text-center p-1">
            <b-button style="padding: 5px 25px;" @click="submitData" variant="primary" class="mr-2">Submit</b-button>
            <b-button style="padding: 5px 25px;" @click="resetForm" variant="none" class="iq-bg-danger">Cancel</b-button>
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
              <tab-content-item :active="false" id="appointments">
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
            </tab-content>
          </div>
        </b-col>
      </b-row>
    </form>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'

export default {
  name: 'ViewPatient',
  mounted () {
    xray.index()
  },
  data () {
    return {
      disabled: 1,
      doctor: {
        profile: require('../../assets/images/user/1.jpg')
      },
      user: {
        profile_image: require('../../assets/images/user/11.png'),
        fname: 'Nik',
        lname: 'Jone',
        dob: '30/03/2021',
        gender: 'female',
        address: 'Rusjanov trg 10',
        postcode: '1000',
        city: 'Ljbuljana',
        country: 'Slovenia',
        citizenship: 'Slovenian',
        region: 'Sl-unknown',
        insurance_no: '1534667',
        insured_at: 'zanahjbn jnjn',
        mob_no: '+386 67388 78889',
        tax_no: '9877645677',
        email: 'nikjone@demoo.com',
        mobile_no: '001 2351 256 12',
        location: 'USA',
        edited_date: Date.now(),
        allergies: 'Type, cause, symptom, note, date, change , doctor...',
        reminder: 'The patient has very sensitive gums, careful not to cause bleeding...',
        surgeon: 'Dr. Penger',
        dentist: 'Dr. Penger',
        background: require('../../assets/images/page-img/profile-bg.jpg'),
        profile: require('../../assets/images/user/11.png')
      },
      currentPassword: '',
      countries: [
        { value: 'Slovenia', text: 'Slovenia' },
        { value: 'Canada', text: 'Canada' },
        { value: 'Niada', text: 'Niada' },
        { value: 'USA', text: 'USA' },
        { value: 'India', text: 'India' },
        { value: 'Africa', text: 'Africa' }
      ],
      states: [
        { value: 'California', text: 'California' },
        { value: 'Florida', text: 'Florida' },
        { value: 'Georgia', text: 'Georgia' },
        { value: 'Connecticut', text: 'Connecticut' },
        { value: 'Louisiana', text: 'Louisiana' }
      ]
    }
  },
  methods: {
    resetForm () {
      this.user = {
        profile_image: require('../../assets/images/user/11.png'),
        fname: 'Nik',
        lname: 'Jone',
        dob: '30/03/2021',
        gender: 'female',
        address: 'Rusjanov trg 10',
        postcode: '1000',
        city: 'Ljbuljana',
        country: 'Slovenia',
        citizenship: 'Slovenian',
        region: 'Sl-unknown',
        insurance_no: '1534667',
        insured_at: 'zanahjbn jnjn',
        mob_no: '+386 67388 78889',
        tax_no: '9877645677',
        email: 'nikjone@demoo.com',
        mobile_no: '001 2351 256 12',
        location: 'USA',
        edited_date: Date.now(),
        allergies: 'Type, cause, symptom, note, date, change , doctor...',
        reminder: 'The patient has very sensitive gums, careful not to cause bleeding...',
        surgeon: 'Dr. Penger',
        dentist: 'Dr. Penger',
        background: require('../../assets/images/page-img/profile-bg.jpg'),
        profile: require('../../assets/images/user/11.png')
      }
      console.log('RESET FORM', this.user)
    },
    submitData () {
      console.log('FORM DATA:', this.user)
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
    changePassword: function () {
    }
  }
}
</script>
