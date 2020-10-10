import * as ActionTypes from '@/constants/ActionTypes';

// 保存用户参与游戏的信息
export const SaveUserGameStart = (payload) => ({
    type: ActionTypes.SAVE_GAME_START,
    payload
});

// 保存用户获得的福袋
export const SaveUserQty = (payload) => ({
    type: ActionTypes.SAVE_USER_QTY,
    payload
});

// 保存用户的积分数
export const SaveUserPoint = (payload) => ({
    type: ActionTypes.SAVE_USER_POINT,
    payload
});

// 保存用户的分享数
export const SaveUserShareNum = (payload) => ({
    type: ActionTypes.SAVE_USER_SHARE_NUM,
    payload
});

// 记录是否从排行榜页点击再玩一次按钮
export const recordIsSeniorEnter = (payload) => ({
    type: ActionTypes.RECORD_IS_SENIOR_ENTER,
    payload
});

// ----------------------

// 游戏结束
export const GameOver = (data) => async dispatch => {
	dispatch(SaveUserQty(data));
};
