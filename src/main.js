import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import './plugins/bootstrap-vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import { store } from './store/index.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueConfirmDialog from 'vue-confirm-dialog'

import Requester from "./assets/models/requester.model.js";
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.prototype.$rq = new Requester();

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.use(Vuex);
Vue.use(Notifications);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBC5PzXTo9DmOQmkTWlUANfzSgfhyD452Y',
    libraries: 'places'
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
