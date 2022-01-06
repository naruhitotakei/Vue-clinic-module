<template>
  <div>
    <Loader />
    <section class="sign-in-page">
      <b-container class="sign-in-page-bg mt-5 p-0">
        <div class="row no-gutters">
          <div class="col-md-6 text-center position-relative">
            <div class="sign-in-detail text-white">
              <a class="sign-in-logo mb-5" href="#"><img :src="logo" class="img-fluid image" alt="logo"></a>
                <div class="mr-4">
                  <img :src="require('../../assets/images/login/4.png')" class="img-fluid-logo mb-4" alt="logo">
                </div>
            </div>
          </div>
          <div class="col-md-6 position-relative">
            <div class="sign-in-from">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>
<script>
import Loader from '../../components/xray/loader/Loader'
import logo from '../../assets/images/Logo-Dental-White.png'
import { xray } from '../../config/pluginInit'
import bgImage from '../../assets/images/login/2.png'
export default {
  name: 'AuthLayout1',
  components: {
    Loader,
  },
  mounted() {
    xray.index()
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
      },
      logo: logo,
      bgImageURL: bgImage,
    }
  },
}
</script>
<style lang="scss">
.image {
  padding-left: 100px !important;
}
@media (max-width: 768px) {
  .sign-in-from {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .image {
    padding-left: 0px !important;
  }
  [dir=ltr] .img-fluid {
    max-width: 75%;
  }
}
</style>
