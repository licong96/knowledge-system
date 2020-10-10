// import * as ActionTypes from '@/constants/ActionTypes';
// import { apiSeniority } from '@/api'


// // 更新统计查询
// export const UpdateRankList = (payload) => ({
//     type: ActionTypes.UPDATE_RANK_LIST,
//     payload
// });

// // 更新统计查询
// export const UpdateRankUser = (payload) => ({
//     type: ActionTypes.UPDATE_RANK_USER,
//     payload
// });


// // ----------------------------------

// // 统计查询
// export const GetRankList = (params, callback, callbackErro) => async dispatch => {
//     const res = await apiSeniority.GetRankList(params);
//     if(res.code === 200000) {
//         dispatch(UpdateRankList(res.data));
//         typeof callback === 'function' && callback(res);
//     } else {
//         typeof callbackErro === 'function' && callbackErro(res);
//     }
// };

// // 查询个人排名
// export const GetMemberRank = (params, callback) => async dispatch => {
//     const res = await apiSeniority.GetMemberRank(params);
//     if(res.code === 200000) {
//         dispatch(UpdateRankUser(res.data));
//         typeof callback === 'function' && callback(res);
//     }
// };
