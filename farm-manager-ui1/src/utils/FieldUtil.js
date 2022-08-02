export function getFieldName(field) {
    return field.baseField.name;
}

export function getMapCenter(user) {
    if(user.lng && user.lat){
        return [user.lng, user.lat];    
    }
    return null;
}

export function safeParseJson(json){

    if(json){
        try{
            return JSON.parse(json);
        }
        catch (err){

        }
    }
    return null;
}

export function getDomainName(domain, parenthesis) {
    if(domain) {
        let alias = '';
        if(parenthesis && domain.alias){
            if(parenthesis){
                alias = domain.alias ? ' (' + domain.alias +')': '';
            } else {
                alias = domain.alias ? ' ' + domain.alias : '';
            }
        }
        
        return domain.field.name + alias;
    }
}

export function getVarietyName(field) {
    //console.log('getVarietyName',field);
    if(field.variety == null){
        return '';
    }
    return  `${field.variety.name}  (${field.variety.category})`;
}

export function getActivityGroupFields(activityGroup) {
    if(activityGroup && activityGroup.activities && activityGroup.activities.length > 0 ){
        const domain = activityGroup.activities[0].domain;
        const count = activityGroup.activities.length > 1 ? ` +${activityGroup.activities.length -1} ` : '';

        return  `${getDomainName(domain, true)}${count}`;

    }
    return  '';
}

export function getDashboardUrl(domain, year) {

    if(domain.plantation){
        return `/dash/field/${domain.id}/${year}`
    }
    else {
        return `/dash/field/${domain.id}`
    }
}
