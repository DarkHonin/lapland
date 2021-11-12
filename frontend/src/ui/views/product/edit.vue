<template>
    <div>
        <v-dialog v-model="showFileUploadDialog" width="500">
            <!-- Dialog for the file upload -->
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
        <v-dialog v-model="deleteDialog.show" max-width="500" transition="dialog-transition">
            <!-- Delete option dialog -->
            <v-card width='500px'>
                <v-card-title primary-title>
                    Delete option: '{{deleteDialog.option.title}}'
                </v-card-title>
                <v-card-text>
                    Are you sure you want to delte this option?
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click='abortOptionDelete'>Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click='commitOptionDelete'>Delete</v-btn>
                </v-card-actions>
            </v-card>
                
            </v-dialog>

        <v-toolbar>
            <v-toolbar-title>{{product.id == undefined ? 'Create' : 'Update'}} Product</v-toolbar-title>
            <v-spacer />
            <v-btn rounded @click='save()'>Save</v-btn>
        </v-toolbar>
        <v-divider />
        <v-row class='pa-5' align='center' id='imageRow'>
            <v-card class='pa-5' id='addImage' min-width='300' min-height='300' outlined rounded @click='showFileUploadDialog = true'>
                <v-icon size='50'>mdi-plus</v-icon>
                <v-card-title>Add Image</v-card-title>
            </v-card>
            <v-card class='productImage' :key='index' v-for='(img, index) in product.images' width='300' height='300' min-width='300' outlined rounded>
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
                        <h4>Options</h4>
                        <div v-for='(option, key) in product.options' :key='key'>
                            <CreateOption class='option' :option='option' v-if='key == editingOptionIndex' @submit='(v) => saveOption(v, key)'/>    
                            <Option v-else class='option' :option='option' >
                                <template v-slot:actions>
                                    <v-icon class='mr-2' @click='editingOptionIndex = key'>mdi-pencil</v-icon>
                                    <v-icon @click='promptOptionDelete(key)' color='error'>mdi-delete</v-icon>
                                </template>
                            </Option>
                        </div>
                        <CreateOption class='option' @submit='(v) => saveOption(v)'/>
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
import CreateOption from '../../components/product/option/CreateOption.vue'
import Option from '../../components/product/option/Option.vue'

export default {
    components: {CreateOption, Option},
    data() {
        return {
            deleteDialog: {
                show: false,
                deleteIndex: -1,
                option: {}
            },
            editingOption: -1,
            addingOption: false,
            showFileUploadDialog: false,
            newOption: {
                label: '',
                value: 0
            },
            product : {
                images: [],
                options: []
            },
            imageToUpload : {},
            editingOptionIndex: -1
        }
    },
    props: ['id'],
    methods: {

        commitOptionDelete(){
            this.product.options.splice(this.deleteDialog.deleteIndex, 1)
            this.abortOptionDelete()
            this.updateProduct(this.product)
        },
        abortOptionDelete(){
            this.deleteDialog = {
                show: false,
                deleteIndex: -1,
                option: {}
            }
        },
        promptOptionDelete(index){
            this.deleteDialog.deleteIndex = index
            this.deleteDialog.option = this.product.options[index],
            this.deleteDialog.show = true
        },

        createOption(){
            if(!this.addingOption) return this.addingOption = true
            this.product.options.push({...this.newOption})
            this.addingOption = false
        },
        saveOption(option, key = -1){
            if(key == -1)
                this.product.options.push(option)
            else
                this.product.options[key] = option
            if(this.editingOptionIndex != -1) this.editingOptionIndex = -1
            if(this.product.id != undefined)
                this.updateProduct(this.product)
        },
        save(){
          this.commitProduct().then( (product) => {
              this.$router.push(`/product/${product.id}`)
          })
        },
        commitProduct(){
            if(this.product.id == undefined){
                return this.createProduct(this.product)
            }else{
                return this.updateProduct(this.product)
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
        ...mapActions({createProduct: 'products/createProduct', updateProduct: 'products/updateProduct', createProductImage: 'products/createProductImage'})
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
    .option
        max-width: 500px
        margin: .5em
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