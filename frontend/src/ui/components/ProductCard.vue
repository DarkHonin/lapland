<template lang="">
    <v-card elevation='2' class='my-3'outlined max-width='600'>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                    <span>{{product.title}}</span>
                    <v-spacer />
                    <span>
                        $##,##
                    </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{product.description}}
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="160"
                color="grey"
            >
            <v-img v-if='product.images' :src='product.images[0].url' />
            </v-list-item-avatar>
        </v-list-item>
            <v-card-actions>
                
                    <v-btn outlined rounded text @click='navToProduct'> View </v-btn>
                    </spacer>
                    <v-btn outlined rounded text v-if='isAdmin' color='error'> Delete </v-btn>
                
            </v-card-actions>
    </v-card>

</template>
<script>
export default {
    props: ['product'],
    methods: {
        navToProduct(id){
            this.$router.push(`/product/${this.product.id}`)
        }
    },
    computed:{
        isAdmin(){
            return this.$store.getters.getUser.isAdmin
        }
    }
}
</script>
<style lang="">
    
</style>