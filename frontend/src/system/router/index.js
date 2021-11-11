import {app} from '../db/firebase'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../../ui/views/Home.vue'

import store from '../store/index'
import products from './product'
import order from './order'

import {getAuth, onAuthStateChanged} from 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../../ui/views/About.vue')
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../../ui/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  ...products,
  ...order,
  {
    path: '/register',
    name: 'Register',
    component: () => import('../../ui/views/auth/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../../ui/views/auth/Login.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../../ui/views/404.vue')
  },
]

const router = new VueRouter({
  routes
})



router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin)

  const heck = new Promise((yay, nay) => {
    const auth = getAuth();
    const dispatch = onAuthStateChanged(auth, (user) => {
        dispatch()
        yay(store.dispatch('refreshUser', user))
    })
  }).then(user => {
    console.log('----',user)
    if(requiresAuth && (user == undefined || user.uid == undefined)) return next({path: '/login', query: {returnTo: to.path}})
    if(requiresAdmin && !user.isAdmin) return next('404')
    next()
  })
})

export default router
