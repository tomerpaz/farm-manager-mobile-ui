export function getToggleIcon(edit) {
    if (edit) {
        return "fa fa-times fa-lg";
    } else {
        return "fa fa-cog fa-lg";
    }
}


export function parseJson(json){

    try {
        const data = JSON.parse(json);
        if (data) {
            return data;
        }
    } catch (err) {
        console.log('error parse json', json);
    }
}