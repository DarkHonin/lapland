<template lang="">
    <v-menu offset-y>
        <template v-slot:activator='{ on, attrs}'>
            <v-btn :color="hasCart ? 'info' : 'error' " v-bind="attrs" v-on="on">
                Cart
                <v-icon class='pl-2'>mdi-cart</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-toolbar >
                <keep-alive>
                    <v-subheader v-if='!hasCart' >No Items, cart empty</v-subheader>
                    <v-card flat v-else class='d-flex'>
                        <v-btn text color='success' @click='checkout'>Checkout</v-btn>
                            <v-spacer></v-spacer>
                        <v-btn @click='clearCart' style='transform: scale(.8)' text color="error">Clear cart</v-btn>
                    </v-card>
                </keep-alive>
                
            </v-toolbar>
            <v-card rounded outline v-for="(item, key) in cart" :key="key" class='ma-1'>
                <v-card-title style='wrap: no-wrap'>
                    {{ item.product.title }}
                     <v-icon class='pl-2' color='error' @click='removeCartItem(key)'>mdi-delete</v-icon> 
                </v-card-title>
                <h5>
                    Selection
                </h5>
                <v-card flat class='pa-3' v-for='(option, index) in item.selection' :key='index'>
                    <h6>{{option.title}}</h6>
                    <ul v-if='option.type=="multiSelect"'>
                        <li class='d-flex' v-for='(select, index) in option.value' :key='index' >
                            <span> {{select.title}} </span>
                            <v-spacer></v-spacer>
                            <span style='color: green'> R {{select.price}}</span>
                        </li>
                    </ul>
                    <v-row class='pl-5 ma-1 mr-0' v-if='option.type=="singleSelect"'>
                        <span> {{option.value.title}} </span>
                        <v-spacer></v-spacer>
                        <span style='color: green'> R {{option.value.price}}</span>
                    </v-row>
                </v-card>
                </ul>
            </v-card>
        </v-list>
    </v-menu>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'



export default {
    methods: {
        chekout: () => this.$router.push('/checkout'),
        ...mapActions({removeCartItem : 'cart/removeItemFromCart', clearCart: 'cart/clearCart'})},
    computed: {
        cart() {
            return this.$store.state.cart
        },
        hasCart() {
            return !this.cart || this.cart.length != 0
        }
    },
    watch :{
        cart(v){
            this.$forceUpdate()
        }
    }
    
}
</script>
<style lang="">
    
</style>