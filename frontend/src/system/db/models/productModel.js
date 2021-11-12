const schema = {
    id: '',
    title: '',
    description: '',
    images: [
        {
            url: 'url to image',
            ref: 'storage refrence',
            filename: 'name of the original file'    
        }
        // ...
    ],
    options : [
        {
            title: 'the name of the option',
            type: 'option selection', // such as 'singleSelect' 'multiSelect'
            select: [
                {
                    title: 'title of the selection option',
                    price: 'the price of the option'
                }
            ]
        }
    ]
}

export function ProductModel({id, title, description, images=[], options=[]}){
    return {
        id, title, description, images, 
        options,
        getMaxPrice(){
            var tVal = 0
            options.forEach( option => {
                var holdV = 0
                if(option.type == 'singleSelect'){
                    option.select.forEach(select => holdV = Math.max(holdV, select.price))
                }else{
                    option.select.forEach(select => holdV += Number(select.price))
                }
                tVal += holdV
            } )
            return tVal
        },
        getMinPrice(){
            var tVal = 0
            options.forEach( option => {
                var holdV = Number.MAX_SAFE_INTEGER
                if(option.type == 'singleSelect'){
                    option.select.forEach(select => {
                        console.log(select, Number(select.price))
                        holdV = Math.min(holdV, Number(select.price))
                    })
                    tVal += holdV
                }
            } )
            return tVal
        },
        toMap(){
            const toSave = {}
            Object.keys(schema).forEach(key => toSave[key] = this[key])
            return toSave
        }
    }
}