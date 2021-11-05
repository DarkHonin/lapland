import Vue from 'vue'
import App from './App.vue'
import router from './system/router'
import store from './system/store'
import vuetify from './plugins/vuetify'
import './system/db/firebase'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
