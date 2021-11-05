<template lang="">
    <div>
        <v-toolbar>
            <v-spacer/>
            <router-link to='/product'><v-btn color="primairy" text><v-icon>mdi-add</v-icon></v-btn></router-link>    
        </v-toolbar>
        <v-container grid-list-xs>
            <v-list v-if='products != undefined'>
                <ProductCard v-for='(product, index) in products' :product='product' :key='index'/>
            </v-list>
        </v-container>
    </div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'

import ProductCard from '../../components/ProductCard.vue'

export default {
    components: {ProductCard},
    data() {
        return {}
    },
    methods: mapActions(['loadProducts']),
    created(){
        this.loadProducts()
    },
    computed: mapGetters(['products', 'isAdmin']),
}
</script>
<style lang="">
    
</style>