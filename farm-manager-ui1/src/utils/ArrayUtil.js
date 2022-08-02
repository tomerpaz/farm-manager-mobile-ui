export function findFirstById(arr, id){
    if(arr && id){
       const found =  arr.find(e => e.id === id)
        return found;
    }
    return null;
}

export function findFirstAttributeById(arr, id, attr ){
    if(arr && id && attr){
        const found =  arr.find(e => e.id === id)
        if(found ){
            return found[attr];
        }
    }
}