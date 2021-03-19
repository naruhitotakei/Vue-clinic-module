<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12" md="3" v-for="doctor in doctors" :key="doctor.message">
          <iq-card body-class="text-center">
            <template v-slot:body>
              <div class="doc-profile">
                <img class="rounded-circle img-fluid avatar-80" :src="doctor.image" alt="profile">
              </div>
              <div class="iq-doc-info mt-3">
                <h4> {{doctor.name}}</h4>
                <p class="mb-0" >{{doctor.specialist}}</p>
                <a href="javascript:void(0);">{{doctor.website}}</a>
              </div>
              <div class="iq-doc-description mt-2">
                <p class="mb-0">{{doctor.description}}</p>
              </div>
              <div class="iq-doc-description mt-2">
                <p class="mb-0">{{doctor.email}}</p>
              </div>
              <div class="iq-doc-description mt-2">
                <p class="mb-0">{{doctor.phone}}</p>
              </div>
              <a href="#" class="btn btn-primary">View Profile</a>
            </template>
          </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'

export default {
  name: 'UserList',
  data () {
    return {
      doctors: [
        { name: 'Dr. Ana Mencin', specialist: 'Kadriolog', image: require('../../assets/images/user/1.jpg'), email: 'ana.mencin@gmail.com', phone: '+38670532732' },
        { name: 'Dr. Bojan Jernejc', specialist: 'Ginekolog', image: require('../../assets/images/user/01.jpg'), email: 'bojan.jernejc@gmail.com', phone: '+38641235833' },
        { name: 'Dr. Silvija Lenart', specialist: 'Ortoped', image: require('../../assets/images/user/02.jpg'), email: 'silvija.lenart@gmail.com', phone: '+38640934232' },
        { name: 'Dr. Irma Medved', specialist: 'Infektolog', image: require('../../assets/images/user/03.jpg'), email: 'irma.medved@gmail.com', phone: '+38631493422' },
        { name: 'Dr. Petra Maver', specialist: 'Kirurg', image: require('../../assets/images/user/04.jpg'), email: 'pavel.maver@gmail.com', phone: '+38670324786' },
        { name: 'Dr. Damjan Ahlin', specialist: 'Nevrokirurg', image: require('../../assets/images/user/05.jpg'), email: 'damjan.ahlin@gmail.com', phone: '+38640593412' },
        { name: 'Dr. Martin Sever', specialist: 'Oftamolog', image: require('../../assets/images/user/06.jpg'), email: 'martin.sever@gmail.com', phone: '+38670313285' },
        { name: 'Dr. Tanja Perme', specialist: 'Ginekolog', image: require('../../assets/images/user/07.jpg'), email: 'tanja.perme@gmail.com', phone: '+38631945122' },
        { name: 'Dr. Matic Erjavec', specialist: 'Kirurg', image: require('../../assets/images/user/08.jpg'), email: 'matic.erjavec@gmail.com', phone: '+38651934832' },
        { name: 'Dr. Peter Berlot', specialist: 'Urolog', image: require('../../assets/images/user/09.jpg'), email: 'peter.berlot@gmail.com', phone: '+38640573247' },
        { name: 'Dr. Sebastjan Bras', specialist: 'Anesteziolog', image: require('../../assets/images/user/10.jpg'), email: 'sebastjan.bras@gmail.com', phone: '+38651423841' },
        { name: 'Dr. Dejan Sivec', specialist: 'Kirurg', image: require('../../assets/images/user/12.jpg'), email: 'dejan.sivec@gmail.com', phone: '+38631945022' },
        { name: 'Dr. Janez Veble', specialist: 'Kardiolog', image: require('../../assets/images/user/12.jpg'), email: 'janez.veble@gmail.com', phone: '+386705932483' },
        { name: 'Dr. Suzana Zgonc', specialist: 'Ortoped', image: require('../../assets/images/user/13.jpg'), email: 'suzana.zgonc@gmail.com', phone: '+38651832430' },
        { name: 'Dr. Miha Vozelj', specialist: 'Kirurg', image: require('../../assets/images/user/14.jpg'), email: 'miha.vozelj@gmail.com', phone: '+38631743823' },
        { name: 'Dr. Renata Kobler', specialist: 'Anesteziolog', image: require('../../assets/images/user/15.jpg'), email: 'rajko.kobler@gmail.com', phone: '+38670583248' }

      ]
    }
  },
  mounted () {
    xray.index()
  },
  firestore () {
    return {
    }
  },
  components: {
  },
  beforeMount () {
  },
  method: {
  },
  computed: {
  }
}
</script>
