
import { handleActions } from 'redux-actions';
import * as ActionTypes from '@/constants/ActionTypes';

const seniorityState = {
    listData: {},
    userData: {},
};

const seniority = handleActions(
    {
        [ActionTypes.UPDATE_RANK_LIST]: (state, { payload }) => {
            return {
                ...state,
                listData: payload,
              }
        },
        [ActionTypes.UPDATE_RANK_USER]: (state, { payload }) => {
            return {
                ...state,
                userData: payload,
              }
        },
    },
    seniorityState
);


export default seniority;