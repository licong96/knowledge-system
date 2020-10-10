
import { handleActions } from 'redux-actions';
import * as ActionTypes from '@/constants/ActionTypes';

const initState = {
    userCookie: {},
    localhostSearch: {
        resource: 1,          // 来源 积分商城入口参与1  分享参与2
    },
    gamerInfo: {},
    joinType: 1,           // 参加类型 1首次  2积分方式  3分享方式
    isLoader: false,
    modal: {               // 模态框状态
        isRule: false,
        isShare: false,             // 分享引导提醒
        isShareSuccess: false,      // 分享成功
        isShareOnline: false,       // 分享上限
        isGamePop: false,
        isGameNot: false,
        isGameOver: false,           // 游戏结束模态框
        typeGameOver: 'over',   // 公用弹窗类型  `over`:游戏结束，`expend`:消耗600积分再玩一次，`expendSuccess`:已消耗600积分 ，`sorry`:积分不足600
    },
    dateTime: {
        currentTime: 0,             // 当前时间戳
        endTime: 1550591940000,     // 结束时间戳
    }
};

const home = handleActions(
    {
        [ActionTypes.SAVE_USER_COOKIE]: (state, { payload }) => {
            return {
                ...state,
                userCookie: payload,
              }
        },
        [ActionTypes.SAVE_LOCALHOST_SEARCH]: (state, { payload }) => {
            return {
                ...state,
                localhostSearch: payload,
              }
        },
        [ActionTypes.UPDATE_GAMER_INFO]: (state, { payload }) => {
            return {
                ...state,
                gamerInfo: {
                    ...state.gamerInfo,
                    ...payload
                },
              }
        },
        [ActionTypes.UPDATE_JoinType]: (state, { payload }) => {
            return {
                ...state,
                joinType: payload,
              }
        },
        [ActionTypes.UPDATE_MODAL]: (state, { payload }) => {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...payload
                },
              }
        },
        [ActionTypes.UPDATE_LOADER]: (state, { payload }) => {
            return {
                ...state,
                isLoader: payload,
              }
        },
        [ActionTypes.SAVE_DATE_TIME]: (state, { payload }) => {
            return {
                ...state,
                dateTime: {
                    ...state.dateTime,
                    ...payload
                },
              }
        },
    },
    initState
);


export default home;