import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import vmodal from 'vue-js-modal'
import vuetify from '@/plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';


window.axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(vmodal)
Vue.use(VueSweetalert2);

/* eslint-disable */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>',
  vuetify
}).$mount('#app')