import axios from 'axios';

export function fetchData1(resolve) {
    return axios.get('https://licong96.github.io/language/manifest.json').then(res => resolve(res));
}
