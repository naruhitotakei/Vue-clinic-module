<template>
<div
  style="
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  "
>
  <b-img
      :src="`${src}${version}`"
      alt="profile-pic"
      class="height-150"
      fluid
  />
  <div style="margin: auto; text-align: center;">
      <div class="add-img-user profile-img-edit" style="height: auto">
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
</div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      version: ''
    }
  },
  watch: {
    src () {
      this.version = ''
    }
  },
  methods: {
    onButtonClick () {
      this.$refs.uploader.click()
    },
    async onFileChanged (event) {
      const data = new FormData()
      data.append('logo', event.target.files[0])
      await uploadFile(this.src, data)
      this.version = `?version=${new Date().getTime()}`
    }
  }
}

async function uploadFile (url, data) {
  const rawResponse = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    },
    body: data
  })

  return rawResponse.json()
}
</script>
