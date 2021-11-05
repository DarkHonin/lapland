import { createProduct } from "../../db/repos/product.repo";
import { infoEntity } from "./entities/info";

import { createProduct as repoCreateProduct, updateProduct as repoUpdateProduct, uploadProductImage, fetchAllProducts} from "../../db/repos/product.repo";

export default {
    state: {
        products: [],
        productsStateMessages: new infoEntity({message: 'Info entity startup'})
    },
    actions: {
        async createProduct({commit}, product){
            commit('updateProductsInfo', {message : `Creating product: ${product.title}`})
            return repoCreateProduct(product).then(savedProduct => {
                commit('appendProduct', savedProduct)
                commit('updateProductsInfo', {message : `Created product: ${savedProduct.title} : ${savedProduct.id}`})
                return savedProduct
            })
        },

        async updateProduct({commit}, product ){
            commit('updateProductsInfo', {message : `Updating product: ${product.title}`})
            await repoUpdateProduct(product)
            commit('updateProductsInfo', {message : `Updated product: ${product.title}`})
        },

        async createProductImage({commit}, image){
            commit('updateProductsInfo', {message : `Creating product image from file: ${image.name}`})
            const {downloadUrl, fileRef} = await uploadProductImage(image)
            commit('updateProductsInfo', {message : `Created product image from file: ${image.name}`})
            const rimage = {
                url: downloadUrl,
                ref: fileRef,
                fileName: image.name
            }
            return rimage
        },

        async loadProducts({commit}){
            commit('updateProductsInfo', {message : `Loading all products`})
            const products = await fetchAllProducts()
            commit('setProducts', products)
            commit('updateProductsInfo', {message : `Products loaded`})
            return products

        }
    },  
    mutations: {
        updateProductsInfo(state, {message, errorMessage}){
            state.productsStateMessages.message = message ? message : state.productsStateMessages.message;
            state.productsStateMessages.errorMessage = errorMessage ? errorMessage : state.productsStateMessages.errorMessage;
        },
        appendProduct(state, productModel){
            state.products.push(productModel)
        },
        setProducts(state, products){
            state.products = products
        }
    },
    getters: {
        products: (s) => s.products
    }
}