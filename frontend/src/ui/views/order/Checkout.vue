<template lang="">
    <v-container grid-list-xs>
        <v-toolbar>
            <v-spacer></v-spacer>
            <span> </span>
        </v-toolbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        getTotal(){
            var total = 0
            this.cart.forEach(p => {
                
            })
        }
    },
    computed: mapGetters({cart : 'cart/cart'})
}
</script>
<style lang="">
    
</style>