export default [
    {
        path: '/checkout',
        component: () => requrie('../../views/ui/order/Checkout.vue'),
        requiresAuth: true,
    }
]