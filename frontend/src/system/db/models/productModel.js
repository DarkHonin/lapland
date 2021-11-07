const patern = {
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
    return {id, title, description, images, 
        options}
}