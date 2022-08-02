export function getRationOptions(text){
    return [
        {id: 'PER_AREA_UNIT' , name: text.perAreaUnit},
        {id: 'PER_FIELD' , name: text.perField},
       // {id: 'MANUAL' , name: text.perUnit}
    ]
}