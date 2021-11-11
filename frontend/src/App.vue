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


export default {
  name: 'App',
  components: {Navbar},
  data: () => ({
    //
  }),
  beforeCreate() {
    
  },
};
</script>
