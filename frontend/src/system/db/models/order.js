const ORDER_STATUS = {
    STATUS_PENDING : 'STATUS_PENDING',
    STATUS_IN_PRODUCTION : 'STATUS_IN_PRODUCTION',
    STATUS_FABRICATED : 'STATUS_FABRICATED'
}


const structure = {
    cart: [], // The items ordered, see ui/views/product/index:59
    createdAt: 'Datetime stamp of created',
    updatedAt: 'Datetime stamp of changed', // add to object {created: firebase.database.ServerValue.TIMESTAMP}
    status: ORDER_STATUS.STATUS_PENDING,
    shippingInfo: {
        // ???
    },

}