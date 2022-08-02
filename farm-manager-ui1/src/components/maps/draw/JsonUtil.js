export function safeParse(value){
    if(value){
        try {
            return JSON.parse(value);
          }
          catch(err) {
            return null;
          }
    }
    return null;
}
