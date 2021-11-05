<template>
    <div>
        <v-toolbar>
            <v-spacer />
            <v-btn v-if='isAdmin' rounded @click='editProduct(product)' >Edit</v-btn>
        </v-toolbar>
        <v-divider />
        <v-row class='pa-5' align='center' id='imageRow'>
            <v-card id='addImage' min-width='300' min-height='300' v-if='!product.images' outlined rounded>
            
                    <v-icon size='50'>mdi-eye-off</v-icon>
                    <h5>No images</h5>
                
                    
            </v-card>
            <v-card class='productImage' :key='index' v-for='(img, index) in product.images' width='300' height='300' outlined rounded>
                <v-img :src='img.url' height='100%' />
            </v-card>
        </v-row>
        <v-divider />
        <v-form class='ma-8'>
            <v-container>
                <v-row>
                    <v-col>
                        <h4 > {{product.title}} </h4>
                        <p>
                            {{product.description}}
                        </p>
                    </v-col>
                    <v-col>
                        
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
<script>

import {ProductModel} from '../../../system/db/models/productModel';
import {mapActions, mapGetters}  from 'vuex'
import { getProductById } from '../../../system/db/repos/product.repo'


export default {
    data() {
        return {
            addingOption: false,
            newOption: {
                label: '',
                value: 0
            },
            product: {}
        }
    },
    props: ['id'],
    methods: {
        editProduct(){
            this.$router.push(`/product/${this.product.id}/edit`)
        },
    },
    created(){
        getProductById(this.id).then(product => this.product = product).catch(e => {
            this.$router.push('/404')
        })
    },
    computed: mapGetters(['isAdmin'])
}
</script>
<style lang="sass">
    #imageRow
        display: flex
        overflow-x: auto
        flex-wrap: nowrap
        &>*
            margin: .5em
    #addImage
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
    .productImage
        position: relative
        

</style>