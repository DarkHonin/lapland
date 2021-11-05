<template>
    <div>
        <v-toolbar style='z-index: 1'>
            
            <v-spacer />
            <v-btn icon>
                <v-icon @click='createProduct'>mdi-plus</v-icon>
            </v-btn>
        </v-toolbar>
        <v-row>
            <v-navigation-drawer permanent style='z-index: 0'>
                <v-list dense nav class='py-5'>
                    <v-list-item class='drawerItem' v-for='(item, index) in drawerItems' :key='index' @click='selectedPanel = index' :active='index == selectedPanel'>
                        <v-list-item-content>
                            <v-list-item-title class='px-5'>
                                {{item.label}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-divider vertical />
            <v-col id='viewport'>
                <v-card outlined max-width='600'>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="text-h5 mb-1">
                                <span>Product Title</span>
                                <v-spacer />
                                <span>
                                    $##,##
                                </span>
                            </v-list-item-title>
                            <v-list-item-subtitle>

                                This is a product description, I think this should suffice but I cant tell before I actually generate the ui elements
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                            tile
                            size="160"
                            color="grey"
                        ></v-list-item-avatar>
                    </v-list-item>
                        <v-card-actions>
                        <v-btn outlined rounded text> View </v-btn>
                        <v-btn outlined rounded text> Delete </v-btn>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showSideMenu : true,
            drawerItems : [
                {
                    label: 'Products',
                    panel: 'products'
                },
                {
                    label: 'Catagories',
                    panel: 'catagoeries'
                }
            ],
            selectedPanel: 0
        }
    },
    methods: {
        showPanel(panel){

        },
        createProduct(){
            this.$router.push('/product/add')
        }
    }
}
</script>
<style lang="sass">
    .drawerItem[active]
        background-color: lightgrey

    #viewport
        min-height: calc( 100vh - 100px )
        overflow-y: auto
        padding: 2em
        justify-content: center
        align-items: flex-start
        display: flex
</style>
