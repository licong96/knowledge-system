import * as ActionTypes from '@/constants/ActionTypes';
const apiHome = '';

// 保存用户COOKIE
export const saveUserCookie = (payload) => ({
    type: ActionTypes.SAVE_USER_COOKIE,
    payload
});

// 保存地址栏参数
export const saveLocalhostSearch = (payload) => ({
    type: ActionTypes.SAVE_LOCALHOST_SEARCH,
    payload
});

// 更新玩家信息
export const UpdateGamerInfo = (payload) => ({
    type: ActionTypes.UPDATE_GAMER_INFO,
    payload
});

// 更新参与类型
export const UpdateJoinType = (payload) => ({
    type: ActionTypes.UPDATE_JoinType,
    payload
});

// 更新弹窗数据
export const UpdateModal = (payload) => ({
    type: ActionTypes.UPDATE_MODAL,
    payload
});

// 记录用户是否分享成功
export const SaveUserIsShare = (payload) => ({
    type: ActionTypes.SAVE_USER_IS_SHARE,
    payload
});

// 修改Loader状态
export const UpdateLoader = (payload) => ({
    type: ActionTypes.UPDATE_LOADER,
    payload
});

// 保持当前时间和到期时间
export const SaveDateTime = (payload) => ({
    type: ActionTypes.SAVE_DATE_TIME,
    payload
});


// ----------------------------------

// 获取玩家信息
export const GetGamerInfo = (params, callback, callbackErro) => async dispatch => {
    const res = await apiHome.GetGamerInfo(params);
    if(res.code === 200000) {
        dispatch(UpdateGamerInfo(res.data));
        typeof callback === 'function' && callback(res);
    } else {
        typeof callbackErro === 'function' && callbackErro(res);
    }
};

// 分享记录
export const MemberShareNote = (params, callback) => async dispatch => {
    const res = await apiHome.MemberShareNote(params);
    if(res.code === 200000) {
        dispatch(SaveUserIsShare(res.data));
        typeof callback === 'function' && callback(res);
    }
};

// 分享添加事件
export const PutTriggerAdd = (params, callback) => async dispatch => {
    const res = await apiHome.PutTriggerAdd(params);
    if(res.code === 200000) {
        typeof callback === 'function' && callback(res);
    }
};

// 查询活动有效截止日期
export const GameEffectiveDate = (params, callback) => async dispatch => {
    const res = await apiHome.GameEffectiveDate(params);
    if(res.code === 200000) {
        dispatch(SaveDateTime({endTime: res.data}));
        typeof callback === 'function' && callback(res);
    }
};

// 获取当前时间
export const GetServerTime = (params) => async dispatch => {
    const res = await apiHome.GetServerTime(params);
    if (res.ResultCode === '1') {
        dispatch(SaveDateTime({
            currentTime: new Date(res.Data).getTime()
        }));
    }
};