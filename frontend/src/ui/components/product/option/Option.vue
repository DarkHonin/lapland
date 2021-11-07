<template lang="">
    <v-card class='my-8'>
        <v-row class='optionHeader px-5'>
            <h4 class='pa-4'>
                <v-toolbar-title>{{option.title}}</v-toolbar-title>
            </h4>
            <v-spacer></v-spacer>
            <slot name='actions'></slot>
        </v-row>
        <v-container grid-list-xs>
            
        <v-radio-group @change='updateOnChange' v-model="selected" v-if='option.type == "singleSelect"'>
            <v-radio :key='key' v-for='(select, key) in option.select' :label="select.title" :value='select'>
                <template v-slot:label>
                    <span>{{select.title}}</span>
                    <v-spacer></v-spacer>
                    <span style='color: green'>R {{select.price}}</span>
                </template>
            </v-radio>
        </v-radio-group>
        <v-list v-if='option.type == "multiSelect"'>
            <v-checkbox @change='updateOnChange' class='ma-0 pa-0' v-model="selected" :key='key' v-for='(select, key) in option.select' :value="select">
                <template v-slot:label>
                    <span>{{select.title}}</span>
                    <v-spacer></v-spacer>
                    <span style='color: green'>R {{select.price}}</span>
                </template>
            </v-checkbox>
        </v-list>
        </v-container>
    </v-card>
</template>
<script>
export default {
    props: ['option'],
    data() {
        return {
            selected: []
        }
    },
    methods: {
        updateOnChange(v){
            this.$emit('change', {option: this.option, value: this.selected})
        }
    },
}
</script>
<style lang="sass">
    .optionHeader
        display: flex
        justify-content: center
        align-items: center
</style>