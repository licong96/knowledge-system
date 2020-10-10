const prefix = 'vip_';

export const setLocalStorage = (key, val) => {
    try {
        localStorage.setItem(genKey(key), JSON.stringify(val));
    }
    catch (e) {
        console.log('browser do not support localStorage', e);
    }
};

export const getLocalStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(genKey(key)));
    }
    catch (e) {
        console.log('browser do not support localStorage or parse error', e);
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(genKey(key));
    }
    catch (e) {
        console.log('browser do not support localStorage', e);
    }
};

export const clearLocalStorage = (forced) => {
    try {
        if (forced) return localStorage.clear();

        for (let key in localStorage) {
            key.indexOf(prefix) == 0 && localStorage.removeItem(key);
        }
    }
    catch (e) {
        console.log('browser do not support localStorage', e);
    }
};

export const print = () => {
    for (let key in localStorage) {
        console.log(key);
    }
};

const genKey = (key) => (prefix + key);
