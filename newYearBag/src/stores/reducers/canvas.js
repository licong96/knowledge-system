
import { handleActions } from 'redux-actions';
import * as ActionTypes from '@/constants/ActionTypes';

const canvasState = {
    gameStartState: {},
    userQty: {
        qty: 0,
        ttlQty: 0
    },
    userPoint: {},
    shareNum: 0,
    isShare: false,     // 是否分享成功
    isSeniorEnter: false,     // 记录是否从排行榜页点击再玩一次按钮
};

const canvas = handleActions(
    {
        [ActionTypes.SAVE_GAME_START]: (state, { payload }) => {
            return {
                ...state,
                gameStartState: payload,
              }
        },
        [ActionTypes.SAVE_USER_QTY]: (state, { payload }) => {
            return {
                ...state,
                userQty: payload,
              }
        },
        [ActionTypes.SAVE_USER_POINT]: (state, { payload }) => {
            return {
                ...state,
                userPoint: payload,
              }
        },
        [ActionTypes.SAVE_USER_IS_SHARE]: (state, { payload }) => {
            return {
                ...state,
                isShare: payload,
              }
        },
        [ActionTypes.SAVE_USER_SHARE_NUM]: (state, { payload }) => {
            return {
                ...state,
                shareNum: payload.num,
              }
        },
        [ActionTypes.RECORD_IS_SENIOR_ENTER]: (state, { payload }) => {
            return {
                ...state,
                isSeniorEnter: payload,
              }
        },
    },
    canvasState
);


export default canvas;