<template lang="">
    <v-card v-if='option'>
        <v-col>            
            <v-row class='px-5' id='optionHeader'>
                <v-text-field  v-model='option.title' ref='title' name="optionTitle" label="Option title"></v-text-field>
                <v-spacer></v-spacer>
                <v-icon class='mx-4' @click='save'>mdi-plus</v-icon>
            </v-row>
            <v-select
                ref='type'
                :items="availableTypes"
                label="Type of option"
                item-text='text'
                item-value='value'
                segmented overflow editable
                v-model='option.type'
            ></v-select>
            <v-col v-if='option.type'>
                <v-row>
                    <v-col cols='6'>
                        <v-text-field v-model='select.title' name="selectTitle" label="Select title"></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols='3'>
                        <v-text-field prefix='R' type='number' v-model='select.price' name="selectprice" label="Price"></v-text-field>
                    </v-col>
                    <v-col cols='1' id='addSelectOption'>
                        <v-icon @click='cancelSelect'>mdi-minus</v-icon>
                        <v-icon @click='saveSelect'>mdi-plus</v-icon>
                    </v-col>
                </v-row>
            </v-col>
            <v-row class='px-5 selectRow' v-for='(item, index) in option.select' :key='index'>
                <v-subheader>{{item.title}}</v-subheader>
                <v-spacer/>
                <span style='color: green'>
                    R {{item.price}}
                </span>
                <v-icon class='pl-2' @click='deleteSelect(index)' color='red'>mdi-delete</v-icon>
            </v-row>
        </v-col>
    </v-card>
</template>
<script>
export default {
    // props: {
    //     option: {
    //         dafault: () => {return {
    //             title: '',
    //             type: '',
    //             select: []
    //         }},
    //     }
    // },
    data() {
        return {
            creatingSelect: false,
            availableTypes: [
                {
                    text: 'Single Select',
                    value : 'singleSelect',
                },
                {
                    text: 'Multi Select',
                    value : 'multiSelect'
                }
            ],
            select: {
                title: '',
                price: 0
            },
            option: {
                title: '',
                type: '',
                select: []
            }
            // validation :{
            //     select: {
            //         title: [
            //                 (value) => value.length > 0 || 'Please input title',
    
            //             ],
            //         price: [
            //             (v) => v > 0 || 'Price is required' 
            //         ]

            //     }
            // }
        }
    },
    methods: {
        save(){
            this.$emit('submit', this.option)
            this.option = {
                title: '',
                type: '',
                select: []
            }
        },
        saveSelect(){
            // Object.keys(this.select).forEach(k => {
            //     this.validation['select'][k].forEach()
            // })
            this.option.select.push({...this.select})
            this.cancelSelect()
        },
        cancelSelect(){
            this.select = {
                title: '',
                price: 0
            }
            this.creatingSelect = false
        },
        deleteSelect(index){
            this.option.select.splice(index, 1)
        }
    }
}
</script>
<style lang="sass">
    #addSelectOption
        display: flex
        justify-content: center
        align-items: center
    .selectRow
        display: flex
        justify-content: center
        align-items: center
    #optionHeader
        display: flex
        justify-content: center
        align-items: center
</style>