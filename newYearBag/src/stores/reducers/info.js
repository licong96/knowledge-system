
import { handleActions } from 'redux-actions';
import * as ActionTypes from '@/constants/ActionTypes';

const initState = {
    mgm: {},
    code: {},
};

const info = handleActions(
    {
        [ActionTypes.UPDATE_CODE]: (state, { payload }) => {
            return {
                ...state,
                code: payload,
              }
        },
        [ActionTypes.UPDATE_MGM]: (state, { payload }) => {
            return {
                ...state,
                mgm: payload,
              }
        },
    },
    initState
);

export default info;