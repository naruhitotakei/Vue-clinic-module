<template>
  <div>
    <div id="show-overlay"></div>
    <Loader />
    <div class="wrapper">
      <!-- Sidebar  -->
      <SideBarStyle1 :items="verticalMenu" :horizontal="horizontal" :logo="logo" @toggle="sidebarMini" />
      <div id="content-page" class="content-page" :class="horizontal ? 'ml-0' : ''">
        <!-- TOP Nav Bar -->
        <NavBarStyle1 title="Dashboard" :homeURL="{ name: 'dashboard1.home' }" @toggle="sidebarMini" :logo="logo" :horizontal="horizontal" :items="horizontalMenu">
          <template slot="responsiveRight">
            <ul class="navbar-nav ml-auto navbar-list">
              <li class="nav-item">
                <a class="search-toggle iq-waves-effect language-title" href="#"><img :src="selectedLang.image" alt="img-flaf" class="img-fluid mr-1" style="height: 14px; width: 18px;" /> {{ selectedLang.title }} <i class="ri-arrow-down-s-line"></i></a>
                <div class="iq-sub-dropdown">
                  <a class="iq-sub-card" href="javascript:void(0)" v-for="(lang, i) in langsOptions" :key="`Lang${i}`" @click="langChange(lang)">
                    <img :src="lang.image" alt="img-flaf" class="img-fluid mr-2" />{{ lang.title }}
                  </a>
                </div>
              </li>
              <li class="nav-item iq-full-screen">
                <a href="#" class="iq-waves-effect" id="btnFullscreen"><i class="ri-fullscreen-line"></i></a>
              </li>
              <li class="nav-item">
                <a href="#" class="search-toggle iq-waves-effect">
                  <i class="ri-notification-3-fill"></i>
                  <span class="bg-danger dots"></span>
                </a>
                <div class="iq-sub-dropdown">
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
                <div class="iq-sub-dropdown">
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
                  <img :src="userProfile" class="img-fluid rounded mr-3" alt="user">
                  <div class="caption">
                    <h6 class="mb-0 line-height">{{ logedInUser.name }}</h6>
                    <span class="font-size-12">{{ $t('nav.user.available') }}</span>
                  </div>
                </a>
                <div class="iq-sub-dropdown iq-dropdown">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0 ">
                      <div class="bg-primary p-3">
                        <h5 class="mb-0 text-white line-height">Hello {{ logedInUser.name }}</h5>
                        <span class="text-white font-size-12">{{ $t('nav.user.available') }}</span>
                      </div>
                      <a v-on:click="callModal('edit')" class="iq-sub-card iq-bg-primary-success-hover">
                        <div class="media align-items-center">
                          <div class="rounded iq-card-icon iq-bg-success">
                            <i class="ri-profile-line"></i>
                          </div>
                          <div class="media-body ml-3">
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
                          <div class="media-body ml-3">
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
  <b-modal v-model="profileModalShow" title="Edit Profile" ok-title="Save Changes" @ok="editProfileData" cancel-title="Close">
    <form>
      <div class="form-row">
        <div class="col-md-12 mb-3">
        <label for="validationDefault01">Profile Picture:</label><br>
        <input type="file" accept="image/*" @change="uploadImage($event)">
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Name:</label>
          <input type="text" v-model="formData.name" class="form-control" placeholder="John" id="validationDefault01" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Surname:</label>
          <input type="text" v-model="formData.surname" class="form-control" placeholder="Doe" id="validationDefault01" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Title:</label>
          <input type="text" v-model="formData.title" class="form-control" placeholder="Title" id="validationDefault01" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Email:</label>
          <input type="email" v-model="formData.email" class="form-control" placeholder="abc@gmail.com" id="validationDefault01" required>
        </div>
        <div class="col-md-12 mb-3">
          <label for="validationDefault01">Phone:</label>
          <input type="tel" v-model="formData.phone" class="form-control" placeholder="9876543210" id="validationDefault01" required>
        </div>
      </div>
    </form>
  </b-modal>
  <!-- Account Setting -->
  <b-modal v-model="accountModalShow" title="Account Setting" ok-title="Save Changes" @ok="submit" cancel-title="Close">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <form novalidate @submit.prevent="handleSubmit(settingData)">
      <div class="form-row">
      <ValidationProvider class="col-md-12 mb-3" vid="old_password" name="Old password" rules="required|old_password" v-slot="{ errors }">
        <div>
          <label for="validationDefault01">Old Password:</label>
          <input type="password" v-model="formData.old_password" class="form-control" id="validationDefault01" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')">
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>
      <ValidationProvider class="col-md-12 mb-3" vid="confirm_password" name="New password" rules="required" v-slot="{ errors }">
        <div>
          <label for="validationDefault01">New Password:</label>
          <input type="password" v-model="formData.confirm_password" class="form-control" id="validationDefault01" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')">
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>
      <ValidationProvider class="col-md-12 mb-3" name="Confirm Password" rules="required|confirmed:confirm_password" v-slot="{ errors }">
        <div>
          <label for="validationDefault01">Confirm New Password:</label>
          <input type="password" v-model="formData.new_password" class="form-control" id="validationDefault01" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')">
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
import { sso, logout } from '../services/userService'
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
    })
  },
  watch: {
  },
  // sidebarTicket
  data () {
    return {
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
      verticalMenu: {},
      userProfile: profile,
      logo: loader,
      usersList: Users,
      rtl: false,
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
    uploadImage (event) {
      console.log('IMAGE UPLOADED:', event.target.files[0])
      this.profileImage = event.target.files[0]
      console.log('PROFILE IMAGE:', this.profileImage)
      let data = new FormData()
      data.append('name', 'my-picture')
      data.append('file', event.target.files[0])
    // let config = {
    //   header : {
    //     'Content-Type' : 'image/png'
    //   }
    // }
    },
    callModal (args) {
      if (args === 'edit') {
        this.profileModalShow = true
      } else {
        this.accountModalShow = true
      }
    },
    editProfileData () {
      console.log('EDIT FORMDATA:', this.formData)
    },
    settingData () {
      console.log('setting data submitted')
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
          this.verticalMenu = this.filterMenu(SideBarItems)
        } else {
          this.$router.push({ name: 'auth1.sign-in1' })
        }
      })
    },
    userLogout () {
      logout()
      this.logedInUser = {}
      this.$router.push({ name: 'auth1.sign-in1' })
    },
    filterMenu (sideBarItems) {
      console.log('User permissions ', this.logedInUser.permissions)
      var rVal = []
      for (var i = 0; i < sideBarItems.length; i++) {
        if (this.permissionContains(sideBarItems[i].title)) {
          rVal.push(sideBarItems[i])
        }
      }
      return rVal
    },
    permissionContains (resourceName) {
      if (this.logedInUser) return true // todo - vrzi venm da bo delovalo filtriranje
      if (!this.logedInUser) return false
      for (var i = 0; i < this.logedInUser.permissions.length; i++) {
        if (this.logedInUser.permissions[i].resource_name === resourceName) return true
      }
      console.log('User has no premission for ' + resourceName)
      return false
    },
    langChange (lang) {
      this.langChangeState(lang)
      this.$i18n.locale = lang.value
      document.getElementsByClassName('iq-show')[0].classList.remove('iq-show')
      if (lang.value === 'ar') {
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
</style>
