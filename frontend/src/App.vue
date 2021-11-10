<template>
  <v-app>
    <Navbar/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './ui/components/Navbar.vue'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export default {
  name: 'App',
  components: {Navbar},
  data: () => ({
    //
  }),
  beforeCreate() {
    this.$store.dispatch('cart/initCart')
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.$store.dispatch('refreshUser', user)
    })
  },
};
</script>
