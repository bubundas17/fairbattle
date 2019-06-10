import Vue from "vue"
import VEditor from 'yimo-vue-editor'

Vue.use(VEditor, {
  name: 'v-editor-app',//Custom name
  config: {},//wagnEditor config
  uploadHandler: (type, resTxt) => {//Upload processing hook
    if (type === 'success') {
      var res = JSON.parse(resTxt)//Do not process the default look at the return value bit image path
      if (res.status !== 1) {
        return null
      }
      return res.data
    } else if (type === 'error') {
      //todo toast
    } else if (type === 'timeout') {
      //todo toast
    }
    return 'upload failed__'
  }
})
