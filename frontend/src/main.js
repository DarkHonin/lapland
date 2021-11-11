import Vue from 'vue'
import App from './App.vue'
import router from './system/router'
import store from './system/store'
import vuetify from './plugins/vuetify'
import './system/db/firebase'

import {getAuth, onAuthStateChanged} from 'firebase/auth'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) },
  created(){
    this.$store.dispatch('cart/initCart')

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //     this.$store.dispatch('refreshUser', user)
    // })
  }
}).$mount('#app')
