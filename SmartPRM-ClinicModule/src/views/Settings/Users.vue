<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="3" v-for="user in users" :key="user.id">
                <iq-card body-class="text-center">
                    <template v-slot:body>
                        <div class="doc-profile">
                            <img class="rounded-circle img-fluid avatar-80" :src="profile.image" alt="profile">
                        </div>
                        <div class="iq-doc-info mt-3">
                            <h4> {{user.name}}</h4>
                           <!-- <p class="mb-0">{{doctor.specialist}}</p>
                            <a href="javascript:void(0);">{{doctor.website}}</a> -->
                        </div>
                        <!--<div class="iq-doc-description mt-2">
                            <p class="mb-0">{{doctor.description}}</p>
                        </div>-->
                        <div class="iq-doc-description mt-2">
                            <p class="mb-0">{{user.mail}}</p>
                        </div>
                        <div class="iq-doc-description mt-2">
                            <p class="mb-0">{{user.phone}}</p>
                        </div>
                        <a href="#" class="btn btn-primary">{{ $t('settingsUsers.viewProfile') }}</a>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { getUsers } from '../../services/userService'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      profile: { image: require('../../assets/images/user/placeholder.png') }
    }
  },
  mounted () {
    xray.index()
    this.getUserList()
  },
  firestore () {
    return {
    }
  },
  components: {
  },
  beforeMount () {
  },
  methods: {
    getUserList () {
      getUsers().then(response => {
        this.users = response
      })
    }
  },
  computed: {
  }
}
</script>
