<template>
  <b-container fluid>
    <b-row>
      <b-col lg="8">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h4 class="card-title">New Appointments </h4>
          </template>
          <template v-slot:headerAction>
            <b-dropdown size="lg p-0"  variant="link" toggle-class="text-decoration-none" no-caret>
              <template v-slot:button-content>
                    <span class="dropdown-toggle p-0" id="dropdownMenuButton5" data-toggle="dropdown">
                      <i class="ri-more-fill m-0 text-primary"></i>
                    </span>
              </template>
              <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>View</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-delete-bin-6-fill mr-2"></i>Delete</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-pencil-fill mr-2"></i>Edit</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-printer-fill mr-2"></i>Print</b-dropdown-item>
              <b-dropdown-item href="#"><i class="ri-file-download-fill mr-2"></i>Download</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-slot:body>
            <div class="table-responsive">
              <table class="table mb-0 table-borderless">
                <thead>
                <tr>
                  <th scope="col">Patient</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Date</th>
                  <th scope="col">Timing</th>
                  <th scope="col">Contact</th>

                </tr>
                </thead>
                <tbody v-for="appointment in appointments" :key="appointment.id">
                <tr>
                  <td>{{appointment.patient}}</td>
                  <td>{{appointment.doctor}}</td>
                  <td>{{appointment.date}}</td>
                  <td>{{appointment.timing}}</td>
                  <td>{{appointment.contact}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="4">
        <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
          <template v-slot:headerTitle>
            <h4 class="card-title">Doctors Lists</h4>
          </template>
          <template v-slot:body>
            <ul class="doctors-lists m-0 p-0">
              <li class="d-flex mb-4 align-items-center" v-for="doctor in doctors" :key="doctor.name">
                <div class="user-img img-fluid"><img :src="doctor.img" alt="story-img" class="rounded-circle avatar-40"></div>
                <div class="media-support-info ml-3">
                  <h6>{{doctor.name}}</h6>
                  <p class="mb-0 font-size-12">{{doctor.degree}}</p>
                </div>
                <div class="iq-card-header-toolbar d-flex align-items-center">
                  <b-dropdown size="lg"  variant="link" toggle-class="p-0 text-decoration-none" no-caret>
                    <template v-slot:button-content class="p-0">
                    <span class="dropdown-toggle p-0" id="dropdownMenuButton6" data-toggle="dropdown">
                      <i class="ri-more-2-line"></i>
                    </span>
                    </template>
                    <b-dropdown-item href="#"><i class="ri-eye-line mr-2"></i>View</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="ri-bookmark-line mr-2"></i>Appointment</b-dropdown-item>
                  </b-dropdown>
                </div>
              </li>
            </ul>
            <a href="javascript:void(0);" class="btn btn-primary d-block mt-3"><i class="ri-add-line"></i> View All Doctors </a>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="9">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="">
              <template v-slot:headerTitle>
                <h4 class="card-title">Operations</h4>
              </template>
              <template v-slot:headerAction>
                <div class="iq-card-header-toolbar d-flex align-items-center">
                  <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                      <i class="ri-more-fill"></i>
                    </template>
                    <b-dropdown-item href="#"><i class="ri-eye-fill mr-2"></i>View</b-dropdown-item>
                    <b-dropdown-item href="#">Another action</b-dropdown-item>
                    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
              <template v-slot:body>
                <div class="table-responsive">
                  <table class="table mb-0 table-borderless">
                    <thead>
                    <tr>
                      <th scope="col">Patient</th>
                      <th scope="col">Patient Name </th>
                      <th scope="col">Doctors Team</th>
                      <th scope="col">Date Of Operation</th>
                      <th scope="col"> Report</th>
                      <th scope="col">Diseases</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td class="text-center"><img class="rounded-circle img-fluid avatar-40" src="../../assets/images/user/01.jpg" alt="profile"></td>
                      <td>Petey Cruiser</td>
                      <td>
                        <div class="iq-media-group">
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/05.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/06.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/07.jpg" alt="">
                          </a>
                        </div>
                      </td>
                      <td>12-02-2020</td>
                      <td><i class="ri-file-pdf-line font-size-16 text-danger"></i></td>
                      <td>Fracture</td>
                    </tr>
                    <tr>
                      <td class="text-center"><img class="rounded-circle img-fluid avatar-40" src="../../assets/images/user/02.jpg" alt="profile"></td>
                      <td>Anna Sthesia</td>
                      <td>
                        <div class="iq-media-group">
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/05.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/06.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/07.jpg" alt="">
                          </a>
                        </div>
                      </td>
                      <td>14-02-2020</td>
                      <td><i class="ri-file-pdf-line font-size-16 text-danger"></i></td>
                      <td>Cataract surgery</td>
                    </tr>
                    <tr>
                      <td class="text-center"><img class="rounded-circle img-fluid avatar-40" src="../../assets/images/user/03.jpg" alt="profile"></td>
                      <td>Paul Molive</td>
                      <td>
                        <div class="iq-media-group">
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/05.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/06.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/07.jpg" alt="">
                          </a>
                        </div>
                      </td>
                      <td>14-02-2020</td>
                      <td><i class="ri-file-pdf-line font-size-16 text-danger"></i></td>
                      <td>Cancer</td>

                    </tr>
                    <tr>
                      <td class="text-center"><img class="rounded-circle img-fluid avatar-40" src="../../assets/images/user/04.jpg" alt="profile"></td>
                      <td>Anna Mull</td>
                      <td>
                        <div class="iq-media-group">
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/05.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/06.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/07.jpg" alt="">
                          </a>
                        </div>
                      </td>
                      <td>16-02-2020</td>
                      <td><i class="ri-file-pdf-line font-size-16 text-danger"></i></td>
                      <td>Hysterectomy</td>
                    </tr>
                    <tr>
                      <td class="text-center"><img class="rounded-circle img-fluid avatar-40" src="../../assets/images/user/05.jpg" alt="profile"></td>
                      <td>Ruby saul</td>
                      <td>
                        <div class="iq-media-group">
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/05.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/06.jpg" alt="">
                          </a>
                          <a href="#" class="iq-media">
                            <img class="img-fluid avatar-40 rounded-circle" src="../../assets/images/user/07.jpg" alt="">
                          </a>
                        </div>
                      </td>
                      <td>18-02-2020</td>
                      <td><i class="ri-file-pdf-line font-size-16 text-danger"></i></td>
                      <td>Cancer</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </iq-card>
          </b-col>
    <b-col lg="3">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Today's Schedule</h4>
          </template>
          <template v-slot:body>
            <ul class="m-0 p-0 today-schedule">
              <li class="d-flex">
                <div class="schedule-icon"><i class="ri-checkbox-blank-circle-fill text-primary" /></div>
                <div class="schedule-text"> <span>Web Design</span>
                  <span>09:00 to 12:00</span></div>
              </li>
              <li class="d-flex">
                <div class="schedule-icon"><i class="ri-checkbox-blank-circle-fill text-success" /></div>
                <div class="schedule-text"> <span>Participate in Design</span>
                  <span>09:00 to 12:00</span></div>
              </li>
            </ul>
          </template>
        </iq-card>
      </b-col>
    <b-col lg="12">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">Activity Statistic</h4>
        </template>
        <template v-slot:body>
          <ApexChart element="patient-chart-01" :chartOption="chart5"/>
        </template>
      </iq-card>
    </b-col>
    </b-row>
  </b-container>
</template>
<script>
import IqCard from '../../components/xray/cards/iq-card'
import { xray } from '../../config/pluginInit'
const body = document.getElementsByTagName('body')
export default {
  name: 'Dashboard4',
  components: { IqCard },
  data () {
    return {
      chart5: {
        series: [{
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14]
        }],
        colors: ['#089bab', '#FC9F5B', '#5bc5d1'],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ]
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      doctors: [
        { name: 'Dr. Bojan Jernejc', img: require('../../assets/images/user/01.jpg'), degree: 'MBBS, MD' },
        { name: 'Dr. Silvija Lenart', img: require('../../assets/images/user/02.jpg'), degree: 'MD' },
        { name: 'Dr. Irma Medved', img: require('../../assets/images/user/03.jpg'), degree: 'MBBS' },
        { name: 'Dr. Petra Maver', img: require('../../assets/images/user/04.jpg'), degree: 'MBBS, MD' },
        { name: 'Dr. Damjan Ahlin', img: require('../../assets/images/user/05.jpg'), degree: 'BAMS' },
        { name: 'Dr. Martin Sever', img: require('../../assets/images/user/06.jpg'), degree: 'MS, MD' },
        { name: 'Dr. Tanja Perme', img: require('../../assets/images/user/07.jpg'), degree: 'MBBS, MD' },
        { name: 'Dr. Matic Erjavec', img: require('../../assets/images/user/08.jpg'), degree: 'MD' },
        { name: 'Dr. Peter Berlot', img: require('../../assets/images/user/09.jpg'), degree: 'MBBS' },
        { name: 'Dr. Sebastjan Bras', img: require('../../assets/images/user/10.jpg'), degree: 'MBBS, MD' }

      ],
      appointments: [
        { patient: 'Martina Dolar', doctor: 'Dr. Martin Sever', date: '20/02/2020', timing: '8:00 AM', contact: '+1-202-555-0146' },
        { patient: 'Marko Engelman', doctor: 'Dr. Sebastjan Bras', date: '25/02/2020', timing: '8:30 AM', contact: '+1-202-555-0164' },
        { patient: 'Lana Ekart', doctor: 'Dr. Suzana Zgonc', date: '20/02/2020', timing: '9:45 AM', contact: '+1-202-555-0153' },
        { patient: 'Goran Drobne', doctor: 'Dr. Martin Sever', date: '27/02/2020', timing: '11:30 AM', contact: '+1-202-555-0154' },
        { patient: 'Igor Destovnik', doctor: 'Dr. Irma Medved', date: '28/02/2020', timing: '3:30 AM', contact: '+1-202-555-0101' },
        { patient: 'Linda Darovec', doctor: 'Dr. Miha Vozelj', date: '28/02/2020', timing: '4:30 PM', contact: '+1-202-555-0176' },
        { patient: 'Maj Pavlin', doctor: 'Dr. Janez Veble', date: '29/02/2020', timing: '5:00 AM', contact: '+1-202-555-0194' }
      ]
    }
  },
  mounted () {
    xray.index()
    body[0].classList.add('sidebar-main-menu')
  },
  destroyed () {
    body[0].classList.remove('sidebar-main-menu')
  }
}
</script>
