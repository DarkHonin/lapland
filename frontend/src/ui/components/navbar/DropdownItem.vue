<template lang="">
    <v-list-item>
        <v-list-item-title @click='commitAction' class='list-item'>
            <v-container grid-list-xs>
                <v-icon v-if='item.icon'>{{`mdi-${item.icon}`}}</v-icon>
                {{ item.title }}
            </v-container>
        </v-list-item-title>
    </v-list-item>
</template>
<script>
export default {
    props: ['item'],
    methods: {
        commitAction(){
            if(this.item.action)this.item.action(this)
        }
    },
};
</script>
<style lang="sass">
    .list-item
        &:hover
            cursor: pointer
            color: rgba(0, 0, 0, 0.8)


</style>