<template>
  <v-container grid-list-xs>
    <v-card background-color="info" id='noticeCard'>
      <v-container grid-list-xs>
        <h4>
          Please note.
        </h4>
        <p>
          This page is still under construction and may change drasticly pending our official opening
        </p>
      </v-container>
    </v-card>
    <v-row class='my-5'>
      <v-col>
        <v-card class='pa-5' id='welcomeCard'>
          <h3>Welcome</h3>
          <span>to</span>
          <h5>Lapland SDG</h5>
          <p>
            We are a Cut, Make & Trim cloting factory.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="sass">
  #noticeCard
    background-color: rgba(50, 205, 50, .5)
    border: 1px solid darkgreen
  #welcomeCard
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: min-content
    min-width: 500px
</style>

<script>
  export default {
    name: 'Home',

    components: {
    },
  }
</script>
