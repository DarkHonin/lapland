
export default [
    {
        path: '/product',
        component: () => import('../../ui/views/product/listing.vue'),
    },
    {
        path: '/product/add',
        component: () => import('../../ui/views/product/edit.vue'),
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        },
    },
    {
        name: 'Products',
        path: '/product/:id',
        component: () => import('../../ui/views/product/index.vue'),
        props: (req) => {
            return req.params
        },
    },
    {
        path: '/product/:id/edit',
        component: () => import('../../ui/views/product/edit.vue'),
        props: (req) => {
            return req.params
        },
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        },
    }

]
