<template lang="">
    <div>
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
    methods: mapActions({loadProducts : 'products/loadProducts'}),
    created(){
        this.loadProducts()
    },
    computed: mapGetters({products: 'products/products'}),
}
</script>
<style lang="">
    
</style>