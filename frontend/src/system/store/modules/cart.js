import { infoEntity } from './entities/info'
import jsCookie  from 'js-cookie'

export default {
    namespaced: true,
    state: {
        cart: [],
        info: new infoEntity({message: '', errorMessage: ''}),
    },
    actions: {
        initCart({commit}){
            commit('updateInfo', {message: `Loading items from cart`})
            commit('loadFromCookies'),
            commit('updateInfo', {message: `Items loaded from cart`})
        },
        addItemToCart({commit}, cartItem){
            // commit('updateInfo', {message: `Adding item to cart: ${cartItem.title}`})
            commit('pushProduct', cartItem)
            // commit('updateInfo', {message: `Item added to cart: ${cartItem.title}`})
            commit('saveToCookies')
        },
        removeItemFromCart({commit}, index){
            commit('removeProduct', index)
            commit('saveToCookies')
        },
        clearCart({commit}){
            commit('clearCart')
            commit('saveToCookies')
        }
    },
    getters: {
        cart: (s) => () => s.cart == undefined ? [] : s.cart,
        status: (s) => s.cart == undefined || s.cart.length > 0 ? 'ready' : 'empty'
    },
    mutations:{
        updateInfo({message, errorMessage}){
            this.state.status = errorMessage && errorMessage.length > 0 ? errorMessage : message
            this.state.info = new infoEntity({message, errorMessage})
        },
        pushProduct(state, product){
            if(this.state.cart == undefined) this.state.cart = []
            this.state.cart.push(product)
        },
        removeProduct(state, index){
            this.state.cart.splice(index, 1)
        },
        loadFromCookies(){
            const cartJson = jsCookie.get('cart')
            if(!cartJson) return this.state.cart = [] 
            this.state.cart = JSON.parse(cartJson)
        },
        saveToCookies(){
            const json = JSON.stringify(this.state.cart)
            jsCookie.set('cart', json)
        },
        clearCart(){
            this.state.cart = [];
        }
    }
}