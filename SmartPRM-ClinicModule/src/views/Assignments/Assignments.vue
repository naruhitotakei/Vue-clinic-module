<template>
    <b-container fluid>
        <b-row style="justify-content: center;">
            <b-col cols="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
                    <template v-slot:headerTitle>
                      <div class="row align-items-center justify-content-between pl-3 pr-3 mb-4 mt-4">
                        <h4 class="card-title">{{ $t('assignments.assignmentsHeader') }}</h4>
                        <div class="btn-add-patient  mt-0">
                          <b-button variant="primary" @click="addNewAssignment"><i class="ri-add-line mr-2"></i>{{ $t('assignments.addAssignments') }}</b-button>
                        </div>
                      </div>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" lg="6">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
              <template v-slot:headerTitle>
                  <b-row>
                    <b-col cols="12" lg="6">
                      <h5>My {{ $t('assignments.todaysAssignments') }}</h5>
                    </b-col>
                    <b-col cols="12" lg="6" v-if="myCompletedAssignments">
                      <b-progress :value="myCompletedAssignments" :max="100" show-progress></b-progress>
                    </b-col>
                  </b-row>
              </template>
              <template v-slot:body>
                  <b-list-group class="list-group-flush" id="myTodaysAssignments">
                      <b-list-group-item
                          v-for="(item, index) in myTodayList"
                          :key="index"
                      >
                        <div :class="{ 'taskIsActive' : !item.completed}">
                          <div>
                            <b-checkbox v-model="item.completed" name="check-button" inline
                              :key="index"
                              @change="finishAssignment(item.id, $event, 'myToday')"><strong>{{ item.description }}</strong></b-checkbox>
                          </div>
                          <div class="d-flex align-items-center justify-content-between">
                            <div>
                              <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                              <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                              <i class="ri-ball-pen-fill m-0"></i>
                            </b-button>
                            </div>
                          </div>
                        </div>
                          <!-- <div class="assignments-container row align-items-center flex-nowrap justify-content-between w-100" :class="{ 'taskIsActive' : !item.completed}">
                            <div class="row align-items-center flex-nowrap w-40">
                              <b-checkbox v-model="item.completed" :disabled="item.disabled || item.completed" name="check-button" inline :key="index" class="checkbox-assignment" @change="finishAssignment(item.id, $event, 'today')"></b-checkbox>
                              <span class="assignments-descriptions w-100 text-break">{{ item.description }}</span>
                            </div>
                            <div class="w-60 row justify-content-end flex-nowrap">
                              <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                              <span class="pl-5">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                              <span class="text-right text-width-150">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
                              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%" @click="editAssignments(item)" >
                                <i class="ri-ball-pen-fill m-0"></i>
                              </b-button>
                            </div>
                          </div> -->
                      </b-list-group-item>
                  </b-list-group>
                  <template>
                      <div class="mt-4 ml-2">
                          <p v-if="myTodaysTotalRows === 0"> You have no assignment today.</p>
                          <b-pagination
                              v-else-if="myTodaysTotalRows > 10"
                              v-model="myTodayCurrentPage"
                              :total-rows="myTodaysTotalRows"
                              :per-page="myTodayPerPage"
                              aria-controls="myTodaysAssignments"></b-pagination>
                      </div>
                  </template>
              </template>
            </iq-card>
          </b-col>
          <b-col cols="12" lg="6">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height overdueAssignments-body">
                <template v-slot:headerTitle>
                    <h5>My {{ $t('assignments.overdueAssignments') }}</h5>
                </template>
                <template v-slot:body>
                  <b-list-group class="list-group-flush" id="myOverdueAssignments">
                    <b-list-group-item
                      v-for="(item, index) in myOverDueList"
                      :key="index"
                      :style="{'background': getDifferenceDate(item.due_at) === 1 && '#ffeeba' || getDifferenceDate(item.due_at) > 1 && '#f5c6cb'}">
                      <div :class="{ 'taskIsActive' : !item.completed}">
                        <div>
                          <b-checkbox v-model="item.completed" name="check-button" inline
                            :key="index"
                            @change="finishAssignment(item.id, $event, 'myoverdue')"><strong>{{ item.description }}</strong></b-checkbox>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                            <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                          </div>
                          <div class="d-flex align-items-center">
                            <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                            <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                            <i class="ri-ball-pen-fill m-0"></i>
                          </b-button>
                          </div>
                        </div>
                      </div>
                    </b-list-group-item>
                  </b-list-group>
                  <template>
                    <div class="mt-4 ml-2">
                      <p v-if="myOverdueAssignments.length < 1"> You have no overdue assignments.</p>
                        <b-pagination
                            v-else-if="myOverdueAssignments.length > 10"
                            v-model="myOverdueCurrentPage"
                            :total-rows="myOverdueAssignments.length"
                            :per-page="myOverduePerPage"
                            aria-controls="myOverdueAssignments"></b-pagination>
                    </div>
                  </template>
                </template>
              </iq-card>
          </b-col>
        </b-row>
            <!-- </b-col>
        </b-row> -->
        <b-row style="justify-content: center;">
            <b-col cols="12" lg="6">
              <iq-card class-name="iq-card-block iq-card-stretch iq-card-height overdueAssignments-body">
                  <template v-slot:headerTitle>
                      <h5>{{ $t('assignments.todaysAssignments') }} of other users</h5>
                  </template>
                  <template v-slot:body>
                    <AppMultiselect v-model="filterToday" :options="todayAssignmentUsers" placeholder="Filter By Users" />
                    <b-list-group class="list-group-flush" id="todaysAssignments">
                      <b-list-group-item
                        v-for="(item, index) in otherUserTodayList"
                        :key="index"
                      >
                        <div :class="{ 'taskIsActive' : !item.completed}">
                          <div>
                            <b-checkbox v-model="item.completed"  name="check-button" inline
                              :key="index"
                              @change="openWarningModal(item.id, $event, 'today')"><strong>{{ item.description }}</strong></b-checkbox>
                          </div>
                          <b-row>
                            <b-col cols="12" lg="6" align-self="center">
                              <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                              <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                            </b-col>
                            <b-col cols="12" lg="6" class="d-flex align-items-center justify-content-end">
                              <span class="text-right pr-2">{{ item.todoname }}</span>
                                <span class="text-right">{{ item.due_at | formatDate }}</span>
                                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 2%;" @click="editAssignments(item)">
                                <i class="ri-ball-pen-fill m-0"></i>
                              </b-button>
                            </b-col>
                          </b-row>
                          <!-- <div class="d-flex align-items-center justify-content-between">
                            <div>
                              <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                              <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                               <i class="ri-ball-pen-fill m-0"></i>
                             </b-button>
                            </div>
                          </div> -->
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                    <template>
                      <div class="mt-4 ml-2">
                        <p v-if="todaysAssignments.length < 1"> You have no overdue assignments.</p>
                          <b-pagination
                              v-else-if="todaysAssignments.length > 10"
                              v-model="todayCurrentPage"
                              :total-rows="todaysAssignments.length"
                              :per-page="todayPerPage"
                              aria-controls="todaysAssignments"></b-pagination>
                      </div>
                    </template>
                  </template>
                </iq-card>
            </b-col>
            <b-col cols="12" lg="6">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height overdueAssignments-body">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.overdueAssignments') }} of other users.</h5>
                    </template>
                  <template v-slot:body>
                    <AppMultiselect v-model="filterOverdue" :options="pastAssignmentUsers" placeholder="Filter By Users" />
                    <b-list-group class="list-group-flush mt-2" id="overdueAssignments">
                      <b-list-group-item
                        v-for="(item, index) in otherUserOverDueList"
                        :key="index"
                        :style="{'background': getDifferenceDate(item.due_at) === 1 && '#ffeeba' || getDifferenceDate(item.due_at) > 1 && '#f5c6cb'}">
                        <div :class="{ 'taskIsActive' : !item.completed}">
                          <div>
                            <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline
                              :key="index"
                              @change="openWarningModal(item.id, $event, 'overdue')">
                                <strong>{{ item.description }}</strong>
                            </b-checkbox>
                          </div>
                          <b-row>
                            <b-col cols="12" lg="6" align-self="center">
                              <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                              <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                            </b-col>
                            <b-col cols="12" lg="6" class="d-flex align-items-center justify-content-end">
                              <span class="text-right pr-2">{{ item.todoname }}</span>
                                <span class="text-right">{{ item.due_at | formatDate }}</span>
                                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 2%;" @click="editAssignments(item)">
                                <i class="ri-ball-pen-fill m-0"></i>
                              </b-button>
                            </b-col>
                          </b-row>
                          <!-- <div class="d-flex align-items-center justify-content-between">
                            <div>
                              <span class="text-left">{{ item.patientname }} {{ item.patientlastname }}</span>
                              <span class="text-left pl-2">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                            </div>
                            <div>
                              <div class="d-flex align-items-center">
                                <span class="text-right text-width-100">{{ item.todoname }}</span>
                                <span class="text-right text-width-100">{{ item.due_at | formatDate }}</span>
                                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 2%;" @click="editAssignments(item)">
                                <i class="ri-ball-pen-fill m-0"></i>
                              </b-button>
                              </div>
                            </div>
                          </div> -->
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                    <!-- <b-list-group class="list-group-flush" id="overdueAssignments">
                      <b-list-group-item
                          v-for="(item, index) in overdueAssignments[overdueCurrentPage]"
                          :key="index"
                          :style="{'background': getDifferenceDate(item.due_at) === 1 && '#ffeeba' || getDifferenceDate(item.due_at) > 1 && '#f5c6cb'}">
                        <div class="row align-items-center flex-nowrap justify-content-between w-100"
                          :class="{ 'taskIsActive' : !item.completed}">
                           <div class="w-60 flex-nowrap row">
                             <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline
                                         :key="index" class="checkbox-assignment"
                                         @change="finishAssignment(item.id, $event)"></b-checkbox>
                             <span class="assignments-descriptions  w-100 text-break">{{ item.description }}</span>
                           </div>
                           <div class="w-20 row justify-content-end flex-nowrap">
                             <span class="pl-5 text-left">{{ item.todoname }}</span>
                           </div>
                           <div class="w-20 row justify-content-end flex-nowrap">
                             <span class="pl-5 text-left">{{ item.patientname }} {{ item.patientlastname }}</span>
                             <span class="pl-5 text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                             <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                             <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                               <i class="ri-ball-pen-fill m-0"></i>
                             </b-button>
                           </div>
                        </div>
                      </b-list-group-item>
                    </b-list-group> -->
                    <template>
                      <div class="mt-4 ml-2">
                        <p v-if="overdueAssignments.length === 0"> You have no overdue assignments.</p>
                        <b-pagination
                          v-else-if="overdueAssignments.length > 10"
                          v-model="overdueCurrentPage"
                          :total-rows="overdueAssignments.length"
                          :per-page="overduePerPage"
                          aria-controls="overdueAssignments">
                        </b-pagination>
                      </div>
                    </template>
                  </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-row style="justify-content: center;">
            <b-col cols="12" lg="6">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height futureAssignments-body">
                    <template v-slot:headerTitle>
                        <h5>My {{ $t('assignments.futureAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="myFutureAssignments">
                            <b-list-group-item
                                v-for="(item, index) in myFutureList"
                                :key="index"
                            >
                              <div :class="{ 'taskIsActive' : !item.completed}">
                                <div>
                                  <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline
                                    :key="index"
                                    @change="finishAssignment(item.id, $event, 'myFuture')"><strong>{{ item.description }}</strong></b-checkbox>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                  <div>
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                                    <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                                  </div>
                                  <div class="d-flex align-items-center">
                                    <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                                    <i class="ri-ball-pen-fill m-0"></i>
                                  </b-button>
                                  </div>
                                </div>
                              </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="myFutureTotalRows===0"> You have no future assignments.</p>
                                <b-pagination
                                    v-else-if="myFutureTotalRows > 10"
                                    v-model="myFutureCurrentPage"
                                    :total-rows="myFutureTotalRows"
                                    :per-page="myFuturePerPage"
                                    aria-controls="myFutureAssignments"
                                ></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
            <b-col cols="12" lg="6">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height futureAssignments-body">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.futureAssignments') }} of other users</h5>
                    </template>
                    <template v-slot:body>
                      <AppMultiselect v-model="filterFuture" :options="futureAssignmentUsers" placeholder="Filter By Users" />
                        <b-list-group class="list-group-flush" id="futureAssignments">
                            <b-list-group-item
                                v-for="(item, index) in otherUserFutureList"
                                :key="index"
                            >
                              <div :class="{ 'taskIsActive' : !item.completed}">
                                <div>
                                  <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline
                                    :key="index"
                                    @change="openWarningModal(item.id, $event, 'future')"><strong>{{ item.description }}</strong></b-checkbox>
                                </div>
                                <b-row>
                                  <b-col cols="12" lg="6" align-self="center">
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                                    <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                                  </b-col>
                                  <b-col cols="12" lg="6" class="d-flex align-items-center justify-content-end">
                                    <span class="text-right pr-2">{{ item.todoname }}</span>
                                      <span class="text-right">{{ item.due_at | formatDate }}</span>
                                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 2%;" @click="editAssignments(item)">
                                      <i class="ri-ball-pen-fill m-0"></i>
                                    </b-button>
                                  </b-col>
                                </b-row>
                                <!-- <div class="d-flex align-items-center justify-content-between">
                                  <div>
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>&nbsp;
                                    <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                                  </div>
                                  <div class="d-flex align-items-center">
                                    <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                                    <i class="ri-ball-pen-fill m-0"></i>
                                  </b-button>
                                  </div>
                                </div> -->
                              </div>
                                <!-- <div class="assignments-container row align-items-center flex-nowrap justify-content-between w-100" :class="{ 'taskIsActive' : !item.completed}">
                                    <div class="w-40 flex-nowrap row">
                                      <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="checkbox-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                      <span class="assignments-description  w-100 text-break">{{ item.description }}</span>
                                    </div>
                                  <div class="w-60 row justify-content-end flex-nowrap">
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5 text-left" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                    <span class="pl-5 text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                                    <span class="text-right text-width-150">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
                                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                                      <i class="ri-ball-pen-fill m-0"></i>
                                    </b-button>
                                  </div>
                                </div> -->
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="futureAssigments.length === 0"> You have no future assignments.</p>
                                <b-pagination
                                    v-else-if="futureAssigments.length > 10"
                                    v-model="futureCurrentPage"
                                    :total-rows="futureAssigments.length"
                                    :per-page="futurePerPage"
                                    aria-controls="futureAssignments"
                                ></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <!-- <b-row style="justify-content: center;">
            <b-col lg="12">
                <iq-card class-name="iq-card-block iq-card-stretch iq-card-height completedAssignments-body">
                    <template v-slot:headerTitle>
                        <h5>{{ $t('assignments.completedAssignments') }}</h5>
                    </template>
                    <template v-slot:body>
                        <b-list-group class="list-group-flush" id="completedAssignments" :per-page="completedPerPage" :current-page="completedCurrentPage">
                            <b-list-group-item v-for="(item, index) in completedAssigments[completedCurrentPage]" :key="index">
                                <div class="assignments-container row align-items-center flex-nowrap" :class="{ 'taskIsActive' : !item.completed}">
                                    <b-checkbox v-model="item.completed" :disabled="item.disabled" name="check-button" inline :key="index" class="checkbox-assignment" @change="finishAssignment(item.id, $event)"></b-checkbox>
                                    <span class="assignments-description">{{ item.description }}</span>
                                    <router-link tag="span" :to="'/patients/'+ item.enquiry_id" class="pl-5" style="cursor:pointer;">{{ item.patientname }} {{ item.patientlastname }}</router-link>
                                  <span class="pl-5">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                                    <span class="text-right ">{{ item.due_at | formatDateAssignments(getLocale) }}</span>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <template>
                            <div class="mt-4 ml-2">
                                <p v-if="completedTotalRows===0"> You have no completed assignments.</p>
                                <b-pagination
                                    v-else-if="completedTotalRows > 10"
                                    v-model="completedCurrentPage"
                                    :total-rows="completedTotalRows"
                                    :per-page="completedPerPage"
                                    aria-controls="completedAssignments"></b-pagination>
                            </div>
                        </template>
                    </template>
                </iq-card>
            </b-col>
        </b-row> -->
      <b-modal
          v-model="modalAssigmentShow"
          no-close-on-backdrop
          size="md"
          :ok-disabled="isOkDisabled"
          :title="!formData.id ? $t('assignments.addAssignmentsModal.addAssignments') : $t('assignments.addAssignmentsModal.editAssignments')"
          :ok-title="$t('assignments.addAssignmentsModal.save')"
          :cancel-title="$t('assignments.addAssignmentsModal.close')"
          @ok="addAssignments"
          @close="cancelAssignments"
          @cancel="cancelAssignments"
      >
        <form>
          <div class="form-row">
            <div class="col-md-12 mb-3">
              <label for="title">{{ $t('assignments.addAssignmentsModal.enquiry') }} *</label>
              <v-select
                taggable
                :clearable="false"
                label="full_name"
                :options="enquires"
                v-model="formData.enquiry"
              >
                <template v-slot:option="option">
                  {{ option.name }} {{option.last_name}}
                </template>
              </v-select>
            </div>
            <div class="col-md-12 mb-3">
              <label for="title">{{ $t('home.openAssignmentsColumn.assignedTo') }} *</label>
              <v-select
                taggable
                :clearable="false"
                label="name"
                :options="users"
                v-model="formData.user_id"
              >
                <template v-slot:option="option">
                  {{ option.name }} {{ option.surname }}
                </template>
                <template v-slot:selected-option="data">
                  {{ data.name }} {{ data.surname }}
                </template>
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

      <b-modal
        v-model="warningModal"
        size="md"
        title="Update Assignment"
        :ok-title="$t('assignments.addAssignmentsModal.save')"
        :cancel-title="$t('assignments.addAssignmentsModal.close')"
        @ok="changeAssignmentStatus"
        @close="closeWarningModal"
        @cancel="closeWarningModal"
      >
        <div v-if="assignmentToEdit">
          Are you sure you want to {{ assignmentToEdit.event ? 'Complete' : 'Incomplete' }} this assignment ?
        </div>
      </b-modal>
    </b-container>
</template>
<style lang="scss" >
[dir=ltr] .iq-sidebar .iq-menu li.active {
    background-color: #ffffff;
    border-radius: 15px;
}

.taskIsActive {
    color: black;
}

.checkbox-assignment {
    margin-left: 2rem;
}

.custom-control-label {
  &:before,
  &:after{
    top: 50%;
    transform: translateY(-50%);
  }
}

body  .custom-control-label::before {
  top:50% !important;
}
body  .custom-control-label::after {
  top:50% !important;
}

.progress-bar {
  background-color: #4d9eae !important;
}

@media (max-width: 1661px) {
  body .wrapper .assignments-container .assignments-description {
    width: 384px;
  }
  body .wrapper .assignments-container span {
    width: 265px;
  }
  .text-width-150 {
    width: 150px !important;
  }
}

@media (max-width: 1441px) {
  body .wrapper .assignments-container .assignments-description {
    width: 284px;
  }
  body .wrapper .assignments-container span {
    width: 227px;
  }
}

@media (max-width: 1361px) {
  body .wrapper .assignments-container span {
    width: 189px;
  }
}

@media(max-width: 1000px) {
  #todaysAssignments,
  #overdueAssignments,
  #futureAssignments,
  #completedAssignments{
    width: 900px;
  }

  .todaysAssignments-body,
  .overdueAssignments-body,
  .futureAssignments-body,
  .completedAssignments-body{
    overflow-y: scroll;
  }

  .custom-control-label {
    margin-top: 3px !important;
  }

}

</style>
<script>
import { xray } from '../../config/pluginInit'
import { getAssignments, finishAssignment, createAssignments, updateAssignments } from '../../services/assignmentsService'
import { getEnquires } from '@/services/enquiry'
import { getUsers, getDentists, sso } from '@/services/userService'
import moment from 'moment'
import AppMultiselect from '../Booking/components/Controls/AppMultiselect.vue'

export default {
  name: 'Assignments',
  components: {
    AppMultiselect
  },
  async mounted () {
    xray.index()
    await this.getUserLogin()
    this.getDentists()
    this.getUsersList()
    this.getAssignments()
    this.getEnquires()
  },
  computed: {
    getLocale () {
      return this.$store.getters['Setting/langState'].value ? this.$store.getters['Setting/langState'].value : this.$store.getters['Setting/langState']
    },
    isOkDisabled () {
      return !this.formData.due_at || !this.formData.description
    },
    myTodayList () {
      return this.myTodayAssignments.slice(
        (this.myTodayCurrentPage - 1) * this.myTodayPerPage,
        this.myTodayCurrentPage * this.myTodayPerPage)
    },
    otherUserTodayList () {
      return this.todaysAssignments.slice(
        (this.todayCurrentPage - 1) * this.todayPerPage,
        this.todayCurrentPage * this.todayPerPage)
    },
    myFutureList () {
      return this.myFutureAssignments.slice(
        (this.myFutureCurrentPage - 1) * this.myFuturePerPage,
        this.myFutureCurrentPage * this.myFuturePerPage)
    },
    otherUserFutureList () {
      return this.futureAssigments.slice(
        (this.futureCurrentPage - 1) * this.futurePerPage,
        this.futureCurrentPage * this.futurePerPage)
    },
    otherUserOverDueList () {
      return this.overdueAssignments.slice(
        (this.overdueCurrentPage - 1) * this.overduePerPage,
        this.overdueCurrentPage * this.overduePerPage)
    },
    myOverDueList () {
      return this.myOverdueAssignments.slice(
        (this.myOverdueCurrentPage - 1) * this.myOverduePerPage,
        this.myOverdueCurrentPage * this.myOverduePerPage)
    },
    filterOverdueByUser () {
      if (this.filterOverdue && this.filterOverdue.length) {
        let filteredAssignments = []
        this.filterOverdue.forEach(item => {
          const foundRecords = this.overdueAssignments.filter(assignment => assignment.todoname && assignment.todoname === item.full_name)
          filteredAssignments = [...filteredAssignments, ...foundRecords]
        })
        return filteredAssignments
      }
      return this.overdueAssignments
    }
  },
  watch: {
    filterOverdue (val) {
      if (val && val.length) {
        this.filterOverDueItems()
      } else {
        this.overdueAssignments = [...this.allOverdueAssignments]
      }
    },
    filterFuture (val) {
      if (val && val.length) {
        this.filterFutureItems()
      } else {
        this.futureAssigments = [...this.allFutureAssignments]
      }
    },
    filterToday (val) {
      if (val && val.length) {
        this.filterTodayItems()
      } else {
        this.todaysAssignments = [...this.allTodayAssignments]
      }
    }
  },
  methods: {
    filterOverDueItems () {
      if (this.filterOverdue && this.filterOverdue.length) {
        let filteredAssignments = []
        this.filterOverdue.forEach(item => {
          const foundRecords = this.allOverdueAssignments.filter(assignment => assignment.todoname && assignment.todoname === item)
          filteredAssignments = filteredAssignments.concat(foundRecords)
        })
        this.overdueAssignments = JSON.parse(JSON.stringify(filteredAssignments))
      } else {
        this.overdueAssignments = [...this.allOverdueAssignments]
      }
    },
    filterFutureItems () {
      if (this.filterFuture && this.filterFuture.length) {
        let filteredAssignments = []
        this.filterFuture.forEach(item => {
          const foundRecords = this.allFutureAssignments.filter(assignment => assignment.todoname && assignment.todoname === item)
          filteredAssignments = filteredAssignments.concat(foundRecords)
        })
        this.futureAssigments = JSON.parse(JSON.stringify(filteredAssignments))
      } else {
        this.futureAssigments = [...this.allFutureAssignments]
      }
    },
    filterTodayItems () {
      if (this.filterToday && this.filterToday.length) {
        let filteredAssignments = []
        this.filterToday.forEach(item => {
          const foundRecords = this.allTodayAssignments.filter(assignment => assignment.todoname && assignment.todoname === item)
          filteredAssignments = filteredAssignments.concat(foundRecords)
        })
        this.todaysAssignments = JSON.parse(JSON.stringify(filteredAssignments))
      } else {
        this.todaysAssignments = [...this.allTodayAssignments]
      }
    },
    editAssignments (assignment) {
      let enquiry = this.enquires.find(item => item.id === assignment.enquiry_id)
      let user = this.users.find(user => user.id === assignment.user_id)
      this.formData = {
        id: assignment.id,
        enquiry: enquiry,
        description: assignment.description,
        due_at: moment(assignment.due_at).format('YYYY-MM-DD'),
        user_id: user
      }
      this.modalAssigmentShow = true
    },
    getUsersList () {
      getUsers().then(response => {
        this.users = response
        this.users = this.users.map(user => {
          const userObj = Object.assign({}, user)
          userObj.full_name = user.name + ' ' + user.surname
          return userObj
        })
      })
    },
    getAssignments () {
      getAssignments('today').then(response => {
        // this.todaysAssignments = response
        // this.todaysTotalRows = response.length
        this.setMyTodayAssignments(response)
        this.setOtherUserTodayAssignments(response)
        this.getUsersInTodayAssignments()

        this.myCompletedAssignments = this.getCompletedAssignments()
      })
      getAssignments('past').then(response => {
        if (Array.isArray(response)) {
          let reverseResponse = response.reverse()
          this.setOtherUsersOverdueAssignments(reverseResponse)
          this.setMyOverdueAssignments(reverseResponse)
          this.getUsersInPastAssignments()
        }
      })
      getAssignments('future').then(response => {
        // let res = []
        if (Array.isArray(response)) {
          let reverseResponse = response.reverse()
          this.setMyFutureAssignments(reverseResponse)
          this.setOtherUsersFutureAssignments(reverseResponse)
          this.getUsersInFutureAssignments()
          // for (let i = 0; i < response.length; i += 3) {
          //   res = [...res, reverseResponse.slice(i, i + 20)]
          // }
          // this.futureAssigments = res
          // this.futureTotalRows = response.length
        }
      })
      getAssignments('finished').then(response => {
        let res = []
        if (Array.isArray(response)) {
          let reverseResponse = response.reverse()
          for (let i = 0; i < response.length; i += 3) {
            res = [...res, reverseResponse.slice(i, i + 20)]
          }
          this.completedAssigments = res
          this.completedTotalRows = response.length
        }
      })
    },
    getCompletedAssignments () {
      if (this.myTodayAssignments.length) {
        const total = this.myTodayAssignments.length
        const completed = this.myTodayAssignments.filter(assignment => assignment.completed)
        return (Number(completed.length) / Number(total)) * 100
      }
      return null
    },
    getUsersInPastAssignments () {
      this.pastAssignmentUsers = []
      this.pastAssignmentUsers = this.allOverdueAssignments
        .filter(item => item.todoname)
        .map(item => item.todoname)
      this.pastAssignmentUsers = [...new Set(this.pastAssignmentUsers)]
    },
    getUsersInFutureAssignments () {
      this.futureAssignmentUsers = []
      this.futureAssignmentUsers = this.allFutureAssignments
        .filter(item => item.todoname)
        .map(item => item.todoname && item.todoname)
      this.futureAssignmentUsers = [...new Set(this.futureAssignmentUsers)]
    },
    getUsersInTodayAssignments () {
      this.todayAssignmentUsers = []
      this.todayAssignmentUsers = this.allTodayAssignments
        .filter(item => item.todoname)
        .map(item => item.todoname && item.todoname)
      this.todayAssignmentUsers = [...new Set(this.todayAssignmentUsers)]
    },
    setMyFutureAssignments (assignments) {
      let filtered = assignments.filter(assignment => assignment.user_id === this.formData.user_id)
      this.myFutureAssignments = filtered
      this.myFutureTotalRows = filtered.length
    },
    setOtherUsersFutureAssignments (assignments) {
      let filtered = assignments.filter(assignment => assignment.user_id !== this.formData.user_id)
      this.futureAssigments = filtered
      this.allFutureAssignments = filtered
      this.futureTotalRows = filtered.length
    },
    setMyTodayAssignments (assignments) {
      let filtered = assignments.filter(assignment => assignment.user_id === this.formData.user_id)
      this.myTodayAssignments = filtered
      this.myTodaysTotalRows = filtered.length
    },
    setOtherUserTodayAssignments (assignments) {
      let filtered = assignments.filter(assignment => assignment.user_id !== this.formData.user_id)
      this.todaysAssignments = filtered
      this.allTodayAssignments = filtered
      this.todaysTotalRows = filtered.length
    },
    setOtherUsersOverdueAssignments (assignments) {
      // let res = []
      let filtered = assignments.filter(assignment => assignment.user_id !== this.formData.user_id)
      // if (filtered.length > 10) {
      //   for (let i = 0; i < filtered.length; i += 3) {
      //     res = [...res, filtered.slice(i, i + 10)]
      //   }
      // } else {
      //   res = filtered
      // }

      this.overdueAssignments = [...filtered]
      this.allOverdueAssignments = [...filtered]
      this.overdueTotalRows = filtered.length
    },
    setMyOverdueAssignments (assignments) {
      let res = []
      let filtered = assignments.filter(assignment => assignment.user_id === this.formData.user_id)
      if (filtered > 10) {
        for (let i = 0; i < filtered.length; i++) {
          res = [...res, filtered.slice(i, i + 10)]
        }
      } else {
        res = filtered
      }

      this.myOverdueAssignments = res
      this.myOverdueTotalRows = filtered.length
    },
    openWarningModal (id, event, from) {
      this.assignmentToEdit = { id, event, from }
      this.warningModal = true
    },
    async closeWarningModal () {
      if (this.assignmentToEdit) {
        console.log(this.assignmentToEdit)
        let array = []
        let aIndex = null
        if (this.assignmentToEdit.from === 'overdue') {
          array = JSON.parse(JSON.stringify(this.overdueAssignments))
        }
        if (this.assignmentToEdit.from === 'future') {
          array = JSON.parse(JSON.stringify(this.futureAssigments))
        }
        if (this.assignmentToEdit.from === 'today') {
          array = JSON.parse(JSON.stringify(this.todaysAssignments))
        }

        if (array) {
          const assignment = await array.find((assignment, index) => {
            if (assignment.id === this.assignmentToEdit.id) {
              aIndex = index
              return assignment
            }
          })
          if (assignment && aIndex > -1) {
            assignment.completed = false
            if (this.assignmentToEdit.from === 'today') {
              this.$set(this.todaysAssignments, aIndex, assignment)
            }
            if (this.assignmentToEdit.from === 'overdue') {
              this.$set(this.overdueAssignments, aIndex, assignment)
            }
            if (this.assignmentToEdit.from === 'future') {
              this.$set(this.futureAssigments, aIndex, assignment)
            }
          }
        }

        this.warningModal = false
      }
    },
    changeAssignmentStatus () {
      if (this.assignmentToEdit) {
        this.finishAssignment(this.assignmentToEdit.id, this.assignmentToEdit.event, this.assignmentToEdit.from)
      }
      this.warningModal = false
    },
    finishAssignment (id, finished, from) {
      const completedBy = this.userId
      finishAssignment(id, finished, completedBy).then(response => {
        this.assignmentToEdit = null
        if (from === 'myToday') {
          this.myCompletedAssignments = this.getCompletedAssignments()
          // this.todaysAssignments = this.todaysAssignments.filter(assignment => assignment.id !== id)
        }
        if (from === 'overdue') {
          this.overdueAssignments = this.overdueAssignments.filter(assignment => assignment.id !== id)
        }
        // if (from === 'myoverdue') {
        //   this.myOverdueAssignments = this.myOverdueAssignments.filter(assignment => assignment.id !== id)
        // }
        if (from === 'future') {
          this.futureAssigments = this.futureAssigments.filter(assignment => assignment.id !== id)
        }
        if (from === 'myFuture') {
          this.myFutureAssignments = this.myFutureAssignments.filter(assignment => assignment.id !== id)
        }
      })
    },
    getEnquires () {
      getEnquires().then(response => {
        let enquires = [...response]
        enquires.map((item, index) => {
          enquires[index].full_name = item.name + ' ' + item.last_name
        })
        this.enquires = enquires
      })
    },
    getDifferenceDate (date) {
      return Math.floor((Date.parse(new Date(Date.now())) - Date.parse(date)) / 86400000)
    },
    addNewAssignment () {
      this.formData.user_id = null
      this.modalAssigmentShow = true
    },
    addAssignments () {
      if (this.formData.id) {
        let data = Object.assign({}, this.formData)
        if (typeof this.formData.user_id === 'object') {
          data.user_id = this.formData.user_id.id
        }
        updateAssignments(this.formData.id, data).then(() => {
          this.getAssignments()
          this.formData = this.defaultFormData()
          this.getUserLogin()
        })
      } else {
        let data = Object.assign({}, this.formData)
        if (typeof this.formData.user_id === 'object') {
          data.user_id = this.formData.user_id.id
        }
        createAssignments(data).then(() => {
          this.getAssignments()
          this.formData = this.defaultFormData()
          this.getUserLogin()
        })
      }
    },
    defaultFormData () {
      return {
        enquiry: null,
        description: '',
        due_at: null,
        user_id: 0
      }
    },
    cancelAssignments () {
      this.formData = this.defaultFormData()
      this.getUserLogin()
    },
    getUserLogin () {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.formData.user_id = response.id
          this.userId = response.id
        }
      })
    },
    getDentists () {
      getDentists().then(response => {
        this.dentists = response
      })
    },
    patientsDentist (patient) {
      if (this.dentists && this.dentists.length) {
        let dentist = this.dentists.find((item) => {
          return item.code === patient.prm_dentist_user_id
        })
        return dentist && dentist.label
      }
    }
  },
  data () {
    return {
      disabled: false,
      userId: null,
      modalAssigmentShow: false,
      assignmentToEdit: null,
      warningModal: false,
      selectEnquires: null,
      logedInUser: {},
      enquires: [],
      dentists: [],
      index: [],
      filterOverdue: [],
      filterFuture: [],
      filterToday: [],
      futureAssignmentUsers: [],
      pastAssignmentUsers: [],
      allTodayAssignments: [],
      todayAssignmentUsers: [],
      myCompletedAssignments: null,
      todaysAssignments: [],
      allOverdueAssignments: [],
      allFutureAssignments: [],
      myOverdueAssignments: [],
      overdueAssignments: [],
      myFutureAssignments: [],
      myFutureTotalRows: 0,
      myFutureCurrentPage: 1,
      myFuturePerPage: 10,
      futureAssigments: [],
      myTodayAssignments: [],
      myTodaysTotalRows: 0,
      todaysTotalRows: 0,
      myTodayCurrentPage: 1,
      myTodayPerPage: 10,
      overdueTotalRows: 0,
      futureTotalRows: 0,
      completedAssigments: [],
      completedTotalRows: 0,
      todayCurrentPage: 1,
      todayPerPage: 10,
      overdueCurrentPage: 1,
      overduePerPage: 10,
      myOverdueTotalRows: 0,
      myOverdueCurrentPage: 1,
      myOverduePerPage: 10,
      futureCurrentPage: 1,
      futurePerPage: 10,
      completedCurrentPage: 0,
      completedPerPage: 10,
      users: [],
      bool: [
        { label: 'Completed', checked: true },
        { label: 'Completed', checked: false }
      ],
      state: [
        { label: 'False/Inactive', checked: false, disabled: false },
        { label: 'True/Active', checked: true, disabled: false }
      ],
      formData: {
        id: 0,
        enquiry: {},
        description: '',
        due_at: null,
        user_id: 0
      }
    }
  }
}
</script>
