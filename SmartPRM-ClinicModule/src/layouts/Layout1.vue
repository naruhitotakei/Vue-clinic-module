<template>
  <div>
    <div id="show-overlay"></div>
    <Loader />
    <div class="wrapper">
      <!-- Sidebar  -->
      <SideBarStyle1 :items="verticalMenu" :horizontal="horizontal" :logo="logo" @toggle="sidebarMini" />
      <div id="content-page" class="content-page" :class="horizontal ? 'ml-0' : ''">
        <!-- TOP Nav Bar -->
        <NavBarStyle1 title="Dashboard" :homeURL="{ name: 'dashboard.home' }" @toggle="sidebarMini" @setOpenMenu="setOpenMenu" :logo="logo" :horizontal="horizontal" :items="horizontalMenu">
          <template slot="responsiveRight">
            <ul class="navbar-nav ml-auto navbar-list">
              <li class="nav-item iq-full-screen full-screen">
                <a href="#" class="iq-waves-effect" id="btnFullscreen"><i class="ri-fullscreen-line"></i></a>
              </li>
              <li class="nav-item">
                <a href="#" class="search-toggle iq-waves-effect">
                  <i class="ri-notification-3-fill"></i>
                  <span class="bg-danger dots"></span>
                </a>
                <div class="iq-sub-dropdown sub-font sub-notification">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0 ">
                      <div class="bg-primary p-3">
                        <h5 class="mb-0 text-white">{{ $t('nav.allNotifications') }}<small class="badge  badge-light float-right pt-1">4</small></h5>
                      </div>
                      <a href="#" class="iq-sub-card" v-for="(item, index) in notification" :key="index">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" :src="item.image" alt="img">
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">{{ item.name }}</h6>
                            <small class="float-right font-size-12">{{ item.date }}</small>
                            <p class="mb-0">{{ item.description.substring(0,40) + '...' }}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <a href="#" class="search-toggle iq-waves-effect">
                  <i class="ri-mail-open-fill"></i>
                  <span class="bg-primary count-mail"></span>
                </a>
                <div class="iq-sub-dropdown sub-font">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0 ">
                      <div class="bg-primary p-3">
                        <h5 class="mb-0 text-white">{{ $t('nav.allMessages') }}<small class="badge  badge-light float-right pt-1">5</small></h5>
                      </div>
                      <a href="#" class="iq-sub-card" v-for="(item,index) in message" :key="index">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" :src="item.image" alt="img">
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">{{ item.name }}</h6>
                            <small class="float-left font-size-12">{{ item.date }}</small>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </template>
          <template slot="right">
            <ul class="navbar-list">
              <li>
                <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center">
                  <img :src="getAvatarUrl" class="img-fluid rounded mr-3 object-fit" alt="user">
                </a>
                <div class="iq-sub-dropdown iq-dropdown">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0 ">
                      <a v-on:click="callModal('edit')" class="iq-sub-card iq-bg-primary-success-hover">
                        <div class="media align-items-center">
                          <div class="rounded iq-card-icon iq-bg-success">
                            <i class="ri-profile-line"></i>
                          </div>
                          <div class="media-body ml-3" style="cursor: pointer;">
                            <h6 class="mb-0 ">{{ $t('nav.user.profileEditTitle') }}</h6>
                            <p class="mb-0 font-size-12">{{ $t('nav.user.profileEditSub') }}</p>
                          </div>
                        </div>
                      </a>
                      <a v-on:click="callModal('setting')" class="iq-sub-card iq-bg-primary-secondary-hover">
                        <div class="media align-items-center">
                          <div class="rounded iq-card-icon iq-bg-danger">
                            <i class="ri-account-box-line"></i>
                          </div>
                          <div class="media-body ml-3" style="cursor: pointer;">
                            <h6 class="mb-0 ">{{ $t('nav.user.accountSettingTitle') }}</h6>
                            <p class="mb-0 font-size-12">{{ $t('nav.user.accountSettingSub')}}</p>
                          </div>
                        </div>
                      </a>
                      <div class="d-inline-block w-100 text-center p-3">
                        <a class="iq-bg-danger iq-sign-btn" href="javascript:void(0)" @click="userLogout" role="button">{{ $t('nav.user.signout') }}<i class="ri-login-box-line ml-2"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
  <!-- Edit profile modal -->
  <b-modal v-model="profileModalShow" title="Edit Profile" ok-title="Save Changes" @ok="editProfile" :ok-disabled="isEditDisabled" cancel-title="Close">
    <form>
      <div class="form-row">
        <div style="margin: auto; text-align: center;">
                  <div class="add-img-user profile-img-edit">
                    <b-img class="profile-pic height-150 width-150 object-fit" style="object-fit: cover" fluid :src="getAvatarUrl" alt="profile-pic" />
                    <input type="hidden" v-model="getAvatarUrl">
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
          <label for="title">Title</label>
          <input type="text" class="form-control" placeholder="Title" v-model="logedInUser.title" id="title" >
        </div>
        <div class="col-md-12 mb-3">
          <label for="name">Name *</label>
          <input type="text" class="form-control" v-model="logedInUser.first_name" id="name" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="name">Surname *</label>
          <input type="text" class="form-control" v-model="logedInUser.surname" id="surname" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="Specialization">Specialization</label>
          <input type="text" class="form-control" placeholder="Specialization" v-model="logedInUser.specialization" id="specialization" >
        </div>
        <div class="col-md-12 mb-3">
          <label for="position">Position</label>
          <input type="text" class="form-control" placeholder="Position" v-model="logedInUser.position" id="position" >
        </div>
        <div class="col-md-12 mb-3">
          <label for="email">Mail *</label>
          <input type="email" class="form-control" v-model="logedInUser.email" id="email" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="phone">Phone</label>
          <input type="tel" class="form-control" v-model="logedInUser.phone_number" id="phone" >
        </div>
      </div>
    </form>
  </b-modal>
  <!-- Account Setting -->
  <b-modal v-model="accountModalShow" title="Account Setting" ok-title="Save Changes" @ok="settingData" cancel-title="Close">
    <div class="mb-3">
      <label>Language</label>
      <v-select :clearable="false" @input="langChange" :reduce="language => language.value" class="style-chooser" label="title" v-model="logedInUser.prm_locale" :options="langsOptions"></v-select>
    </div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <form novalidate @submit.prevent="handleSubmit(settingData)">
      <div class="form-row">
      <ValidationProvider class="col-md-12 mb-3" vid="old_password" name="Old password" rules="required" v-slot="{ errors }">
        <div>
          <label for="oldPassword">Old Password</label>
          <input type="password" v-model="formData.old_password" class="form-control" id="oldPassword" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')">
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>
      <ValidationProvider class="col-md-12 mb-3" vid="confirm_password" name="New password" rules="required" v-slot="{ errors }">
        <div>
          <label for="newPassword">New Password</label>
          <input type="password" v-model="formData.confirm_password" class="form-control" id="newPassword" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')">
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>
      <ValidationProvider class="col-md-12 mb-3" name="Confirm Password" rules="required|confirmed:confirm_password" v-slot="{ errors }">
        <div>
          <label for="confirmNewPassword">Confirm New Password</label>
          <input type="password" v-model="formData.new_password" class="form-control" id="confirmNewPassword" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')">
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>
      </div>
    </form>
    </ValidationObserver>
  </b-modal>
          </template>
        </NavBarStyle1>
        <!-- TOP Nav Bar END -->
        <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                    :leave-active-class="`animated ${animated.exit}`">
          <router-view/>
        </transition>
        <FooterStyle1>
          <template v-slot:left>
            <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
            <li class="list-inline-item"><a href="#">Terms of Use</a></li>
          </template>
          <template v-slot:right>
            Copyright {{ new Date().getFullYear() }} <a href="https://www.emazing.si/en">Emazing</a> All Rights Reserved.
          </template>
        </FooterStyle1>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '../components/xray/loader/Loader'
import SideBarStyle1 from '../components/xray/sidebars/SideBarStyle1'
import NavBarStyle1 from '../components/xray/navbars/NavBarStyle1'
import SideBarItems from '../FackApi/json/SideBar'
import HorizontalItems from '../FackApi/json/HorizontalMenu'
import profile from '../assets/images/user/1.jpg'
import loader from '../assets/images/logo.png'
import { xray } from '../config/pluginInit'
import { Users } from '../FackApi/api/chat'
import { mapGetters, mapActions } from 'vuex'
import { sso, logout, editProfile, changeLang } from '../services/userService'
import { uploadAvatar } from '../services/upDownLoad'

export default {
  name: 'Layout1',
  components: {
    Loader,
    SideBarStyle1,
    NavBarStyle1
  },
  mounted () {
    this.getUserLogin()
    this.updateRadio()
  },
  computed: {
    ...mapGetters({
      selectedLang: 'Setting/langState',
      langsOptions: 'Setting/langOptionState',
      colors: 'Setting/colorState'
    }),
    getAvatarUrl: function () {
      return '/api/files/avatar?' + this.avatar_version
    },
    isEditDisabled () {
      return !this.logedInUser.first_name || !this.logedInUser.surname || !this.logedInUser.email
    }
  },
  watch: {
  },
  // sidebarTicket
  data () {
    return {
      user: {
        fname: '',
        lname: '',
        name: '',
        username: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        company_name: '',
        mobile_no: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        role: '',
        gender: '',
        dob: '',
        url: ''
      },
      avatar_version: Math.random(),
      formData: {
        old_password: '',
        new_password: '',
        email: ''
      },
      profileModalShow: false,
      accountModalShow: false,
      logedInUser: {},
      horizontal: false,
      mini: false,
      darkMode: false,
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      animateClass: [
        { value: { enter: 'zoomIn', exit: 'zoomOut' }, text: 'Zoom' },
        { value: { enter: 'fadeInUp', exit: 'fadeOutDown' }, text: 'Fade' },
        { value: { enter: 'slideInLeft', exit: 'slideOutRight' }, text: 'Slide' },
        { value: { enter: 'rotateInDownLeft', exit: 'rotateOutDownLeft' }, text: 'Roll' }
      ],
      horizontalMenu: HorizontalItems,
      verticalMenu: SideBarItems,
      userProfile: profile,
      logo: loader,
      usersList: Users,
      rtl: false,
      openMenu: false,
      message: [
        { image: require('../assets/images/user/01.jpg'), name: 'Dr. Bojan Jernejc', date: '13 Jan' },
        { image: require('../assets/images/user/02.jpg'), name: 'Dr. Silvija Lenart', date: '14 Jun' },
        { image: require('../assets/images/user/03.jpg'), name: 'Dr. Irma Medved', date: '16 Avg' },
        { image: require('../assets/images/user/04.jpg'), name: 'Dr. Petra Maver', date: '21 Sept' },
        { image: require('../assets/images/user/05.jpg'), name: 'Dr. Damjan Ahlin', date: '29 Sept' }
      ],
      notification: [
        { image: require('../assets/images/user/01.jpg'), name: 'Dr. Bojan Jernejc', date: '23 ur nazaj', description: 'Slike pacienta' },
        { image: require('../assets/images/user/02.jpg'), name: 'Dr. Silvija Lenart', date: '14 ur nazaj', description: 'Operacija' },
        { image: require('../assets/images/user/03.jpg'), name: 'Dr. Irma Medved', date: '16 ur nazaj', description: 'Rentgen' },
        { image: require('../assets/images/user/04.jpg'), name: 'Dr. Petra Maver', date: '21 ur nazaj', description: 'Kartoteka pacienta' },
        { image: require('../assets/images/user/05.jpg'), name: 'Dr. Damjan Ahlin', date: '11 ur nazaj', description: 'Nov termin' }
      ]
    }
  },
  methods: {
    setOpenMenu () {
      this.openMenu = !this.openMenu
      if (this.openMenu) {
        document.querySelector('body').style.overflow = 'hidden'
      } else {
        document.querySelector('body').style.overflow = 'auto'
      }
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
      console.log(this.selectedFile.size)
      // todo check size
      uploadAvatar(this.selectedFile)
      await this.sleep(1000)
      // this will couse avatar to be dowloaded again
      this.avatar_version = Math.random()
    },
    sleep (ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    },
    callModal (args) {
      if (args === 'edit') {
        this.profileModalShow = true
      } else {
        this.accountModalShow = true
      }
    },
    editProfile () {
      editProfile(this.logedInUser).then(() => {
        console.log('Successful update')
        this.getUserLogin()
        // this.$bvToast.show('b-toaster-bottom-right')
      }).catch(errorMsg => {
        console.log('Error: ' + errorMsg)
      })
    },
    settingData () {
      let profile = {
        email: this.logedInUser.email,
        prm_locale: this.logedInUser.prm_locale
      }
      this.changeLang(profile)
    },
    changeLang (profile) {
      changeLang(profile).then(() => {
        console.log('Successful update')
        this.$bvToast.show('b-toaster-bottom-right')
      })
    },
    updateRadio () {
      this.horizontal = this.$store.getters['Setting/horizontalMenuState']
      this.mini = this.$store.getters['Setting/miniSidebarState']
    },
    sidebarHorizontal () {
      this.$store.dispatch('Setting/horizontalMenuAction')
      this.updateRadio()
    },
    sidebarMini () {
      xray.triggerSet()
      this.$store.dispatch('Setting/miniSidebarAction')
      this.updateRadio()
    },
    rtlChange () {
      if (this.rtl) {
        this.rtlRemove()
      } else {
        this.rtlAdd()
      }
    },
    changeColor (code) {
      document.documentElement.style.setProperty('--iq-primary', code.primary)
      document.documentElement.style.setProperty('--iq-primary-light', code.primaryLight)
      if (this.darkMode) {
        document.documentElement.style.setProperty('--iq-bg-dark-color', code.bodyBgDark)
      } else {
        document.documentElement.style.setProperty('--iq-bg-light-color', code.bodyBgLight)
      }
    },
    reset () {
      this.changeColor({ primary: '#827af3', primaryLight: '#b47af3', bodyBgLight: '#efeefd', bodyBgDark: '#1d203f' })
      this.animated = { enter: 'zoomIn', exit: 'zoomOut' }
      this.light()
    },
    getUserLogin () {
      sso().then(response => {
        if (typeof response !== 'string') {
          this.logedInUser = response
          console.log(this.logedInUser)
          this.$i18n.locale = this.logedInUser.prm_locale
          this.verticalMenu = this.filterMenu(SideBarItems)
        } else {
          this.$router.push({ name: 'auth1.sign-in' })
        }
      })
    },
    userLogout () {
      logout()
      this.logedInUser = {}
      this.$router.push({ name: 'auth1.sign-in' })
    },
    filterMenu (sideBarItems) {
      var rVal = []
      for (var menuCnt = 0; menuCnt < sideBarItems.length; menuCnt++) {
        if (this.permissionContains(sideBarItems[menuCnt].title)) {
          if (sideBarItems[menuCnt].children && sideBarItems[menuCnt].children.length) {
            var rValSubmenu = []
            for (var submenuCnt = 0; submenuCnt < sideBarItems[menuCnt].children.length; submenuCnt++) {
              if (this.permissionContains(sideBarItems[menuCnt].children[submenuCnt].title)) {
                rValSubmenu.push(sideBarItems[menuCnt].children[submenuCnt])
              }
            }
            sideBarItems[menuCnt].children = rValSubmenu
          }
          rVal.push(sideBarItems[menuCnt])
        }
      }
      return rVal
    },
    permissionContains (resourceName) {
      if (!this.logedInUser) return false
      for (var i = 0; i < this.logedInUser.permissions.length; i++) {
        if (this.logedInUser.permissions[i].resource_name === resourceName) return true
      }
      console.log('User has no premission for ' + resourceName)
      return false
    },
    langChange (lang) {
      console.log('lang', lang)
      this.langChangeState(lang)
      this.$i18n.locale = lang
      if (document.getElementsByClassName('iq-show').length) {
        document.getElementsByClassName('iq-show')[0].classList.remove('iq-show')
      }
      if (lang === 'ar') {
        this.rtlAdd(lang)
      } else {
        this.rtlRemove(lang)
      }
    },
    ...mapActions({
      langChangeState: 'Setting/setLangAction',
      rtlAdd: 'Setting/setRtlAction',
      rtlRemove: 'Setting/removeRtlAction'
    })
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
  @media (max-width: 992px) {
  .full-screen {
    display: none;
  }
}
</style>
