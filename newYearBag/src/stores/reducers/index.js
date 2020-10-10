import { combineReducers } from 'redux'
import homeState from './home';
import canvasState from './canvas';
import seniorityState from './seniority';
import infoState from './info';

export const getFareRootReducer = combineReducers({
    homeState,
    canvasState,
    seniorityState,
    infoState,
});