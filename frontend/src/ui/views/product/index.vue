<template>
    <div>
        <v-toolbar>
            <v-btn v-if='isAdmin' color="primary" rounded @click='editProduct(product)' >Edit</v-btn>
            <v-spacer />
            <v-btn rounded @click='addToCart(product)' >
                Add to cart
                <v-icon class='ml-2'>mdi-cart-plus</v-icon>
            </v-btn>
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
                        <h5>Options</h5>
                        <Option @change='optionChanged' v-for='(option, index) in product.options' :option='option' :key='index'>
                            <template v-slot:error='{item}'>
                                <span v-if='errors[item.title]' style='' class='ma-auto optionError'>{{errors[item.title]}}</span>
                            </template>
                        </Option>
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
import Option from '../../components/product/option/Option.vue'

export default {
    data() {
        return {
            addingOption: false,
            newOption: {
                label: '',
                value: 0
            },
            product: {},
            selection: {},
            errors: {}
        }
    },
    components: {Option},
    props: ['id'],
    methods: {
        optionChanged({option, value}){
            this.selection[option.title] = {
                title: option.title,
                type: option.type,
                value
            }
        },
        editProduct(){
            this.$router.push(`/product/${this.product.id}/edit`)
        },
        addToCart(){
            var abort = false
            this.product.options.forEach(e => {
                if(e.type == 'singleSelect' && !this.selection[e.title]){
                    this.errors[e.title] = `Please select one`
                    abort = true
                }
            })
            this.$forceUpdate()
            if(abort) return
            this.errors = {}
            const save = {
                product: this.product,
                selection: Object.values(this.selection)
            }
            this.$store.dispatch('cart/addItemToCart', save)
            this.selection = []
        }
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
    .optionError
        color: red
        display: block
        width: fit-content
</style>