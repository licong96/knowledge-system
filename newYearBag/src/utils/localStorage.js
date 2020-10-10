const prefix = 'vip_';

export const set = (key, val) => {
    try {
        localStorage.setItem(genKey(key), JSON.stringify(val));
    }
    catch (e) {
        console.log('browser do not support localStorage', e);
    }
};

export const get = (key) => {
    try {
        return JSON.parse(localStorage.getItem(genKey(key)));
    }
    catch (e) {
        console.log('browser do not support localStorage or parse error', e);
    }
};

export const remove = (key) => {
    try {
        localStorage.removeItem(genKey(key));
    }
    catch (e) {
        console.log('browser do not support localStorage', e);
    }
};

export const clear = (forced) => {
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
