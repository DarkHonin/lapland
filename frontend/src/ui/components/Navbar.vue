<template>
    <v-toolbar flat dense 
       elevate-on-scroll
      >
        <v-toolbar-title>
            <router-link to='/'>
                <h1>Lapland SDG</h1>
            </router-link>
        </v-toolbar-title>
        <v-spacer />
        <nav>
            <v-btn color="primairy" text><router-link to='/product'>Products</router-link></v-btn>
            <CartButton />
            <span v-if='getUser.uid == undefined'>
                <v-btn color="primairy" text>
                    <router-link to='/login'>Login</router-link>
                </v-btn>
                <v-btn color="primairy" text>
                    <router-link to='/register'>Register</router-link>
                </v-btn>
            </span>
            <span v-else>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            {{getUser.displayName}}
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <DropdownItem v-if='getUser.uid' :item='dashboardRoute' />
                        <DropdownItem v-for="(item, index) in items" :item='item' :key="index"/>
                    </v-list>
                </v-menu>
            </span>
        </nav>
    </v-toolbar>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'

import DropdownItem from './navbar/DropdownItem.vue'
import CartButton from './cart/CartButton.vue'

export default {
    data(){
        return {
            items: [
                {
                    title: 'Profile',
                    icon: 'account',
                    action: (context) => context.$router.push('/profile')
                },
                {
                    title: 'Logout',
                    action: (context) => {
                        context.$store.dispatch('logout').then(() => context.$router.push('/'))
                    }
                }
            ],
            dashboardRoute: {
                    title: 'Dashboard',
                    action: (context) => context.$router.push('/dashboard'),
                    icon: 'dashboard'
                }
        }
    },
    components: {DropdownItem, CartButton},
    computed: mapGetters(['getUser', 'getUserMessage']),
    methods: {...mapActions(['logout'])},
}
</script>
<style lang="sass">
    nav
        a
            text-decoration: none

        &>*
            margin: 0px .2em

        &:first-child
            margin-left: 0px

        &:last-child
            margin-right: 0px
</style>