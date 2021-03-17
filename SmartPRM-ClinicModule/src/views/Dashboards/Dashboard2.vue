<template>
  <b-container>
    <b-row style="justify-content: center">
        <b-col lg="6" >
          <iq-card class-name="iq-card-block iq-card-stretch iq-card-height">
            <template v-slot:headerTitle>
              <h4 class="card-title">My Assignments</h4>
            </template>
            <template v-slot:body>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input float-left" id="customCheck11">
                      <label class="custom-control-label" for="customCheck11">You should check in some of below.</label>
                    </div>
                    <small class="ml-auto">23 November 2019</small>
                  </div>
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck10">
                      <label class="custom-control-label" for="customCheck10">Get the address of customer</label>
                    </div>
                      <small class="ml-auto">23 November 2019</small>
                  </div>
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck12">
                      <label class="custom-control-label" for="customCheck12">Contact Vendor for parcel</label>
                    </div>
                      <small class="ml-auto">23 November 2019</small>
                  </div>
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck13">
                      <label class="custom-control-label" for="customCheck13">Refule delivery truck</label>
                    </div>
                      <small class="ml-auto">23 November 2019</small>
                  </div>
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck14">
                      <label class="custom-control-label" for="customCheck14">Pick up for order no. 334</label>
                    </div>
                      <small class="ml-auto">23 November 2019</small>
                  </div>
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck15">
                      <label class="custom-control-label" for="customCheck15">Pay taxes for every bill</label>
                    </div>
                      <small class="ml-auto">23 November 2019</small>
                  </div>
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck16">
                      <label class="custom-control-label" for="customCheck16">I am designers &amp; I have no life</label>
                    </div>
                      <small class="ml-auto">23 November 2019</small>
                  </div>
                  <div class="d-flex tasks-card" role="alert">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck17">
                      <label class="custom-control-label" for="customCheck17">This is a good product. Buy it :) </label>
                    </div>
                      <small class="ml-auto">23 November 2019</small>
                  </div>
                </div>
              </div>
            </template>
          </iq-card>
        </b-col>
    </b-row>
  </b-container>
</template>
<style>
  [dir=ltr] .iq-sidebar .iq-menu li.active {
    background-color: #ffffff;
    border-radius: 15px;
}
</style>
<script>
import { xray } from '../../config/pluginInit'
import { Arabic } from 'flatpickr/dist/l10n/ar'
import { english } from 'flatpickr/dist/l10n/default'
import { mapGetters } from 'vuex'
import IqCard from '../../components/xray/cards/iq-card'
export default {
  name: 'Dashboard2',
  components: { IqCard },
  mounted () {
    xray.index()
  },
  computed: {
    ...mapGetters({
      lang: 'Setting/langState'
    })
  },
  watch: {
  },
  methods: {
  },
  data () {
    return {
      config: {
        dateFormat: 'Y-m-d',
        inline: true,
        locale: english
      },
      arConfig: {
        dateFormat: 'Y-m-d',
        inline: true,
        locale: Arabic
      },
      chart1: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [60, 15, 50, 30, 70]
        }],
        colors: ['#0084ff'],

        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      chart2: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [70, 40, 60, 30, 60]
        }],
        colors: ['#ffd400'],
        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      chart3: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [60, 40, 60, 40, 70]
        }],
        colors: ['#00ca00'],

        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      chart4: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [75, 30, 60, 35, 60]
        }],
        colors: ['#e64141'],
        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
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
      chart6: {
        chart: {
          height: 400,
          type: 'bar',
          sparkline: {
            show: false

          },
          toolbar: {
            show: false
          }
        },
        colors: ['#089bab', '#fc9f5b'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 5,
          colors: ['#ffffff']
        },
        series: [{
          name: 'Male',
          enabled: 'true',
          data: [44, 90, 90, 60, 115]
        }, {
          name: 'Female',
          data: [35, 80, 100, 70, 95]
        }],

        fill: {
          opacity: 1

        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            }
          }
        }
      },
      chart7: {
        chart: {
          height: 112,
          type: 'area',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          },
          group: 'sparklines'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          data: []
        }],
        colors: ['#0084ff'],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
          range: 777600000
        },
        yaxis: {
          labels: {
            minWidth: 34
          },
          max: 100
        },
        legend: {
          show: false
        }
      },
      chart8: {
        chart: {
          height: 112,
          type: 'area',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          },
          group: 'sparklines'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          data: []
        }],
        colors: ['#00ca00'],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
          range: 777600000
        },
        yaxis: {
          labels: {
            minWidth: 34
          },
          max: 100
        },
        legend: {
          show: false
        }
      },
      items: [{
        package_no: '#0879985',
        date: '26/12/2019',
        delivery: '30/12/2019',
        status: {
          name: 'Moving',
          color: 'success'
        },
        location: 'Victoria 8007 Australia',
        progress: {
          count: 90,
          color: 'success'
        }
      },
      {
        package_no: '#0879984',
        date: '23/12/2019',
        delivery: '27/12/2019',
        status: {
          name: 'Pending',
          color: 'warning text-white'
        },
        location: 'Athens 2745 Greece',
        progress: {
          count: 70,
          color: 'warning'
        }
      },
      {
        package_no: '#0879983',
        date: '18/12/2019',
        delivery: '30/12/2019',
        status: {
          name: 'Canceled',
          color: 'danger'
        },
        location: 'Victoria 8007 Australia',
        progress: {
          count: 45,
          color: 'danger'
        }
      },
      {
        package_no: '#0879982',
        date: '14/12/2019',
        delivery: '20/12/2019',
        status: {
          name: 'Working',
          color: 'info'
        },
        location: 'Delhi 0014 India',
        progress: {
          count: 90,
          color: 'info'
        }
      }
      ],
      usersList: [{
        name: 'Anna Sthesia',
        role: 'Admin',
        image: require('../../assets/images/user/01.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Paul Molive',
        role: 'User',
        image: require('../../assets/images/user/02.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Bob Frapples',
        role: 'Auther',
        image: require('../../assets/images/user/03.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Barb Ackue',
        role: 'Editor',
        image: require('../../assets/images/user/04.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Greta Life',
        role: 'User',
        image: require('../../assets/images/user/05.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Ira Membrit',
        role: 'User',
        image: require('../../assets/images/user/06.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Pete Sariya',
        role: 'Editor',
        image: require('../../assets/images/user/07.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Anna Sthesia',
        role: 'Editor',
        image: require('../../assets/images/user/08.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Paul Molive',
        role: 'Author',
        image: require('../../assets/images/user/09.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Bob Frapples',
        role: 'User',
        image: require('../../assets/images/user/10.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Anna Sthesia',
        role: 'Admin',
        image: require('../../assets/images/user/01.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Paul Molive',
        role: 'User',
        image: require('../../assets/images/user/02.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Bob Frapples',
        role: 'Auther',
        image: require('../../assets/images/user/03.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Barb Ackue',
        role: 'Editor',
        image: require('../../assets/images/user/04.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Greta Life',
        role: 'User',
        image: require('../../assets/images/user/05.jpg'),
        link: '',
        isActive: true
      }
      ],
      timelineItems: [{
        color: 'primary',
        title: 'Client Login',
        right: '24 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'success',
        title: 'Scheduled Maintenance',
        right: '23 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'danger',
        title: 'Dev Meetup',
        right: '20 November 2019',
        description: 'Bonbon macaroon jelly <a href="">beans gummi</a> bears jelly lollipop apple',
        child: {
          type: 'img',
          items: [
            require('../../assets/images/user/05.jpg'),
            require('../../assets/images/user/06.jpg'),
            require('../../assets/images/user/07.jpg'),
            require('../../assets/images/user/08.jpg'),
            require('../../assets/images/user/09.jpg'),
            require('../../assets/images/user/10.jpg')
          ]
        }
      },
      {
        color: 'primary',
        title: 'Client Call',
        right: '19 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'warning',
        title: 'Mega Event',
        right: '15 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      }
      ],
      averageList: [
        {
          title: 'AVG Impressions',
          icons: { icon: 'ri-arrow-down-line', color: 'danger' },
          number: '2.648',
          percentage: '26.84'
        },
        {
          title: 'AVG Engagements Rate',
          icons: { icon: 'ri-arrow-up-line', color: 'info' },
          number: '89.6',
          percentage: '8.64'
        },
        {
          title: 'AVG Reach',
          icons: { icon: 'ri-arrow-up-line', color: 'success' },
          number: '826',
          percentage: '0.64'
        },
        {
          title: 'AVG Transport',
          icons: { icon: 'ri-arrow-up-line', color: 'primary' },
          number: '7.55',
          percentage: '25.5'
        }
      ]
    }
  }
}
</script>
