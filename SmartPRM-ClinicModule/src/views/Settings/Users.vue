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
                        <b-button variant="primary" @click="openProfileModal(user)" class="btn btn-primary">{{ $t('settingsUsers.editProfile') }}</b-button>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-modal v-model="editProfileShowModal" no-close-on-backdrop size="lg" :title="$t('settingsUsers.editProfile')" :ok-disabled="isEditDisabled" @close="editProfileShowModal = false" @cancel="editProfileShowModal = false" :ok-title="$t('settingsUsers.editProfileModal.save')" @ok="editUser" :cancel-title="$t('settingsUsers.editProfileModal.close')">
            <form>
                <div class="form-row">
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('settingsUsers.editProfileModal.name') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.name" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.name')" required>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('settingsUsers.editProfileModal.mail') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.mail" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.mail')">
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('settingsUsers.editProfileModal.phone') }}</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.phone" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.phone')">
                        </div>
                    </div>
                </div>
            </form>
        </b-modal>
    </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import { getUsers, updateUser } from '../../services/userService'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      profile: { image: require('../../assets/images/user/placeholder.png') },
      editProfileShowModal: false,
      formData: {
        id: '',
        name: '',
        mail: '',
        phone: ''
      }
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
    },
    editUser () {
      updateUser(this.formData.id, this.formData).then(() => {
        this.editProfileShowModal = false
      })
    },
    openProfileModal (user) {
      this.editProfileShowModal = true
      this.formData = user
    }
  },
  computed: {
    isEditDisabled () {
      return !this.formData.name || !this.formData.mail
    }
  }
}
</script>
