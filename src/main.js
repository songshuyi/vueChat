import Vue from 'vue'
import App from './App.vue'
import Util from '@/js/common.js'

import { ImagePreview, Dialog } from 'vant'
import 'vant/lib/index.css'
Vue.use(ImagePreview)
Vue.use(Dialog)


Vue.config.productionTip = false

Vue.prototype.$util = Util

new Vue({
  render: h => h(App),
}).$mount('#app')
