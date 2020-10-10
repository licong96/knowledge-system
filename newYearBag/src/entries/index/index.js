
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureGetFareStore } from '@/stores/index';
import '@/index.js';
import App from './App';
import * as serviceWorker from '../../serviceWorker';

// 创建 Redux 的 store 对象
const store = configureGetFareStore();

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
