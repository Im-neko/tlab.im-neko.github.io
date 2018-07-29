import decode from 'jwt-decode';

import * as env from "../environment/environment";

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || env.api_host // API server domain
    }

    Login() {
        window.location = env.slack_uri_1;
    }

    isLogin() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(jwtoken) {
        // Saves user token to localStorage
        localStorage.setItem('jwtoken', jwtoken);
        if(env.debug){console.log('success login');}
    }

    getToken() {
        // Retrieves the user token from localStorage
        const jwtoken = localStorage.getItem('jwtoken')
        if (jwtoken && jwtoken.length > 100) { // undefinedもtrueになってしまうので回避
            return jwtoken;
        } else {
            return false;
        }
    }

    logout() {
        // Clear storage
        localStorage.clear();
        window.location.reload();
    }

    decodeJWT() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        var headers = {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
        // Setting Authorization header
        if (this.isLogin()) {
            headers['x-access-token'] = this.getToken()
        }

        console.log(headers)
        return new Promise((resolve, reject) => {
            fetch(url, {
                mode: 'cors',
                ...options,
                headers: new Headers(headers)
            })
            .then(this._checkStatus)
            .then(response => resolve(response.json())) 
            .catch(async (e) => {
                reject({status: e.json? e.status: e, body: e.json? await e.json(): e})
            })
        });
    }

    json2query(json) {
        let queryString = '?';
        Object.keys(json).forEach((key) => {
            queryString += key+'='+json[key]+'&'
        });
        return queryString;
    }

    get(path, query) {
        const queryString = this.json2query(query);
        return new Promise((resolve, reject) => {
            this.fetch(`${this.domain}${path}${queryString}`, 
                {method: 'GET'})
            .then(res => {
                return resolve(res);
            }).catch(e => reject(e))
        });

    }
    
    post(path, data) {
        return new Promise((resolve, reject) => {
            this.fetch(`${this.domain}${path}`, {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => {
                resolve(res);
            }).catch(e => reject(e));
        })
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        return new Promise((resolve, reject) => {
            if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
                resolve(response)
            } else {
                reject(response)
            }
        });
    }
}