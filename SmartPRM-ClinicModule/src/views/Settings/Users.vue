<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="3" v-for="user in users" :key="user.id">
                <iq-card body-class="text-center">
                    <template v-slot:body>
                        <div class="doc-profile">
                            <img class="rounded-circle img-fluid avatar-80" :src="'/api/files/avatar-' + user.id + '?' + avatar_version" alt="profile">
                        </div>
                        <div class="iq-doc-info mt-3">
                            <h4> {{user.title}} {{user.name}} {{user.surname}} </h4>
                        </div>
                        <div class="iq-doc-description mt-2">
                            <p class="mb-0">{{user.specialization}}</p>
                        </div>
                        <div class="iq-doc-description">
                            <p class="mb-0">{{user.position}}</p>
                        </div>
                        <div class="iq-doc-description">
                            <p class="mb-0">{{user.role_name}}</p>
                        </div>
                        <div class="iq-doc-description">
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
        <b-modal
            v-model="editProfileShowModal"
            no-close-on-backdrop size="lg"
            :title="$t('settingsUsers.editProfile')"
            :ok-disabled="isEditDisabled"
            @close="editProfileShowModal = false"
            @cancel="editProfileShowModal = false"
            :ok-title="$t('settingsUsers.editProfileModal.save')"
            @ok="editUser"
            :cancel-title="$t('settingsUsers.editProfileModal.close')">
            <form>
                <div class="form-row">
                    <div style="margin: auto; text-align: center;">
                        <div class="add-img-user profile-img-edit">
                            <b-img
                                class="profile-pic height-150 width-150 object-fit"
                                style="object-fit: cover"
                                fluid
                                :src="'/api/files/avatar-' + formData.id + '?' + avatar_version"
                                alt="profile-pic" />
                            <input type="hidden" v-model="formData.img">
                            <div class="p-image">
                                <b-button variant="none" class="upload-button iq-bg-primary position-relative" style="left: 12px;" @click="onButtonClick">
                                    File Upload
                                </b-button>
                                <input ref="uploader" class="d-none" type="file" accept="image/*" @change="onFileChanged">
                            </div>
                        </div>
                        <div class="img-extension mt-3">
                            <div class="d-inline-block align-items-center">
                                <span>Only</span>
                                <b-link href="javascript:void(0);">.jpg</b-link>
                                <b-link href="javascript:void(0);">.png</b-link>
                                <b-link href="javascript:void(0);">.jpeg</b-link>
                                <span>allowed</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="title">{{ $t('settingsUsers.editProfileModal.title') }}</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.title" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.title')">
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="name">{{ $t('settingsUsers.editProfileModal.name') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.name" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.name')" required>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="surname">{{ $t('settingsUsers.editProfileModal.surname') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.surname" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.surname')" required>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="specialization">{{ $t('settingsUsers.editProfileModal.specialization') }}</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.specialization" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.specialization')">
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="position">{{ $t('settingsUsers.editProfileModal.position') }}</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.position" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.position')">
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="role_name">{{ $t('settingsUsers.editProfileModal.role') }}</label>
                        <div>
                            <v-select :label="$t('settingsUsers.editProfileModal.role')" v-model="formData.role_id"
                                      :clearable="false" :options="roles" :reduce="role => role.role_id" :getOptionLabel="user => user.role_name">
                            </v-select>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="mail">{{ $t('settingsUsers.editProfileModal.mail') }} *</label>
                        <div style="display: flex;">
                            <input type="text" v-model="formData.mail" class="form-control" :placeholder="$t('settingsUsers.editProfileModal.mail')" required>
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="phone">{{ $t('settingsUsers.editProfileModal.phone') }}</label>
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
import { getUsers, updateUser, getRoles } from '../../services/userService'
import { userAvatarUpload } from '../../services/upDownLoad'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      roles: [],
      profile: { image: require('../../assets/images/user/placeholder.png') },
      editProfileShowModal: false,
      avatar_version: Math.random(),
      formData: {
        id: '',
        title: '',
        name: '',
        surname: '',
        specialization: '',
        position: '',
        role_id: '',
        role_name: '',
        mail: '',
        phone: '',
        img: ''
      }
    }
  },
  mounted () {
    xray.index()
    this.getUserList()
    this.getRolesList()
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
    getRolesList () {
      getRoles().then(response => {
        this.roles = response
      })
    },
    editUser () {
      updateUser(this.formData.id, this.formData).then(() => {
        this.editProfileShowModal = false
        this.getUserList()
      })
    },
    openProfileModal (user) {
      this.editProfileShowModal = true
      this.formData = user
    },
    onButtonClick () {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })
      this.$refs.uploader.click()
    },
    async onFileChanged (e) {
      this.selectedFile = e.target.files[0]
      // todo check size
      await userAvatarUpload(this.selectedFile, this.formData.id)
      await this.sleep(1000)
      // this will couse avatar to be dowloaded again
      this.avatar_version = Math.random()
    },
    sleep (ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    }
  },
  computed: {
    isEditDisabled () {
      return !this.formData.name || !this.formData.mail || !this.formData.surname
    },
    getAvatarUrl: function () {
      return '/api/files/avatar?' + this.avatar_version
    }
  }
}
</script>
