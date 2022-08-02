const MAX_INACTIVE_MIN = 60;

export function getAuthConfig() {
    var config = {
        headers: {
            'Cache-Control': 'no-cache',
            'X-Authorization': 'Bearer ' + getJwtToken(),
            'x-acting': sessionStorage.getItem('x-acting')
        }
    };
    return config;
}

export function getRefreshConfig() {
    var config = {
        headers: {
            'Cache-Control': 'no-cache',
            'X-Authorization': 'Bearer ' +getRefreshToken()
        }
    };
    return config;
}

export function authError(message) {
    console.log(message);
}

export function setJwtToken(token) {
    let tokenData = {
        token: token,
        lastActivity: new Date().getTime()
    }
    sessionStorage.setItem('token', JSON.stringify(tokenData));
}

export function removeJwtToken() {
    sessionStorage.removeItem('token');
}

export function resetTokenInactive() {
    let tokenData = sessionStorage.getItem('token');
    if(tokenData){
        let tokenDataJson = JSON.parse(tokenData);
        setJwtToken(tokenDataJson.token);
    }
}
export function getJwtToken() {
    let tokenData = sessionStorage.getItem('token');
    if(tokenData) {
        let tokenDataJson = JSON.parse(tokenData);
        let inactiveMinutes = (new Date().getTime() - tokenDataJson.lastActivity) / (1000 * 60);
        if (inactiveMinutes < MAX_INACTIVE_MIN) {
            return tokenDataJson.token;
        } else {
            removeJwtToken();
        }
    }
    return null;
}

export function setRefreshToken(token) {
    sessionStorage.setItem('refreshToken', token);
}

export function getRefreshToken() {
    sessionStorage.getItem('refreshToken');
}