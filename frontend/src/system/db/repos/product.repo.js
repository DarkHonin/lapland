import {db, storage} from '../firebase'
import { ProductModel } from '../models/productModel'
import {doc, addDoc, getDocs, getDoc, collection, updateDoc} from 'firebase/firestore'
import {uploadBytes, ref, getDownloadURL, deleteObject} from 'firebase/storage'


function productCollection(){
    return collection(db, 'products')
}

export async function getProductById(productId){
    const ref = await getDoc(doc(db, 'products', productId))
    if(!ref.exists()) throw 'No document exists'
    return new ProductModel({...ref.data(), id: ref.id})
}

export async function updateProduct(productModel){
    console.log(productModel.toMap())
    await updateDoc(doc(db, 'products', productModel.id), productModel.toMap())
}

export async function uploadProductImage(imageFile){
    function randomId(){
        const chars = 'abcdefghijklmnopqrstuvwxyz'
        let ret = ''
        for(let i = 0; i < 16; i++){
            ret += chars[Math.floor(Math.random() * chars.length)]
        }
        return ret;
    }
    const fileRef = `/images/${randomId()}.${imageFile.name.split('.').pop()}`;
    const sRef = ref(storage, fileRef)
    await uploadBytes(sRef, imageFile, {contentType: 'image/jpeg'})

    const downloadUrl = await getDownloadURL(sRef)
    return {downloadUrl, fileRef}
}

export async function deleteProductImage(image){
    const sRef = ref(storage, image.ref)
    await deleteObject(sRef).catch(error => console.log(error))
}

export async function createProduct(productModel){
    
    const data = {};
    Object.keys(productModel).map(v =>{
            if(productModel[v] != undefined)
                data[v] = productModel[v]
        })

    const ref = await addDoc(productCollection(), data)
    data.id = ref.id
    await updateDoc(ref, {id : data.id})
    return new ProductModel({...data});
} 

export async function fetchAllProducts(){
    
    const snap = await getDocs(productCollection())
    const ret = []
    snap.forEach(d => ret.push(new ProductModel({...d.data()})))   
    console.log(ret)
    return ret;
}