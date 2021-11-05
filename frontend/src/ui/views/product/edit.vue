<template>
    <div>

        <v-dialog v-model="showFileUploadDialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                Upload File
                </v-card-title>

                <v-card-text>
                    <v-file-input v-model='imageToUpload'
                     accept="image/jpeg"
                    truncate-length="15"
                    ></v-file-input>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="commitNewImage">
                    Save
                </v-btn>
                <v-btn color="primary" text @click="showFileUploadDialog = false">
                    Cancel
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-toolbar>
            <v-toolbar-title>{{product.id == undefined ? 'Create' : 'Update'}} Product</v-toolbar-title>
            <v-spacer />
            <v-btn rounded @click='commitProduct'>Save</v-btn>
        </v-toolbar>
        <v-divider />
        <v-row class='pa-5' align='center' id='imageRow'>
            <v-card class='pa-5' id='addImage' width='300' height='300' outlined rounded @click='showFileUploadDialog = true'>
                <v-icon size='50'>mdi-plus</v-icon>
                <v-card-title>Add Image</v-card-title>
            </v-card>
            <v-card class='productImage' :key='index' v-for='(img, index) in product.images' width='300' height='300' outlined rounded>
                <v-img :src='img.url' height='100%' />
                <div class='imageHover'>
                    <v-btn @click='deleteImage(img)' color="error">Delete</v-btn>
                </div>
            </v-card>

        </v-row>
        <v-divider />
        <v-form class='ma-8'>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field label='Product Title' v-model="product.title" />
                        <v-textarea name='productDescription' v-model="product.description" no-resize filled label='Product Description' />
                    </v-col>
                    <v-col>
                        <h4>Purchace</h4>
                        <v-radio-group>
                            <v-radio v-for='(option, index) in product.options' :key='index' :value='index'>
                                <template v-slot:label>
                                    <span>{{option.label}}</span> <v-spacer/> <span>${{option.value}}</span>
                                </template>
                            </v-radio>
                        </v-radio-group>
                        <v-row v-if='addingOption'>
                            <v-text-field
                                v-model="newOption.label"
                                name="option_label"
                                label="Option label"
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="newOption.value"
                                name="option_value"
                                label="Option value"
                            ></v-text-field>
                        </v-row>
                        <v-btn @click='createOption'>
                            <div v-if='!addingOption'>
                                <v-icon>mdi-plus</v-icon>
                                Add option
                            </div>
                            <div v-else>
                                Save
                            </div>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
<script>

import {ProductModel} from '../../../system/db/models/productModel';
import {mapActions}  from 'vuex'

import { getProductById,deleteProductImage } from '../../../system/db/repos/product.repo'

export default {
    data() {
        return {
            addingOption: false,
            showFileUploadDialog: false,
            newOption: {
                label: '',
                value: 0
            },
            product : {
                images: []
            },
            imageToUpload : {}
        }
    },
    props: ['id'],
    methods: {
        createOption(){
            if(!this.addingOption) return this.addingOption = true
            this.product.options.push({...this.newOption})
            this.addingOption = false
        },
        commitProduct(){
            if(this.product.id == undefined){
                this.createProduct(this.product).then(savedProduct => {
                    this.$router.push(`/product/${savedProduct.id}`)
                })
            }else{
                this.updateProduct(this.product)
            }
        },
        commitNewImage(){
            this.createProductImage(this.imageToUpload).then(image => this.product.images.push(image)).then(() => {
                if(this.product.id != undefined) this.updateProduct(this.product)
                this.showFileUploadDialog = false
                this.imageToUpload = {}
            })
        },
        deleteImage(image){
            const img = []
            this.product.images.forEach(e => {
                if(e.url != image.url) img.push(e)
            })
            this.product.images = img
            deleteProductImage(image)
            if(this.product.id != undefined)
                this.updateProduct(this.product)
        },
        ...mapActions(['createProduct', 'updateProduct', 'createProductImage'])
    },
    created() {
        if(this.id == undefined){
            this.product = new ProductModel({})
        }else{
            getProductById(this.id).then(product => this.product = product).catch(e => {
                this.$router.push('/404')
            })
        }
    },
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
        .imageHover
            opacity: 0
            width: 100%
            height: 100%
            background-color: rgba(0, 0, 0, .8)
            position: absolute
            display: flex
            justify-content: center
            align-items: center
            top: 0
            left: 0
        &:hover
            .imageHover
                opacity: 1

</style>