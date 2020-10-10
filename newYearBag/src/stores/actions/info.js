// import * as ActionTypes from '@/constants/ActionTypes';
// import { apiInfo } from '@/api'

// // 更新发送验证码返回的状态
// export const UpdateCode = (payload) => ({
//     type: ActionTypes.UPDATE_CODE,
//     payload
// })

// // 更新通用留名单返回的状态
// export const UpdateMGM = (payload) => ({
//     type: ActionTypes.UPDATE_MGM,
//     payload
// });

// // ----------------------------------

// // 获取验证码
// export const SendSmsVerificationCode = (params, callback) => async dispatch => {
//     const res = await apiInfo.SendSmsVerificationCode(params);
//     if (res) {
//         dispatch(UpdateCode(res));
//         typeof callback === 'function' && callback(res);
//     }
// };

// // 通用留名单
// export const MGMLandingPage = (params, callback, callbackErro) => async dispatch => {
//     const res = await apiInfo.MGMLandingPage(params);
//     if (res.resultCode === '1') {
//         dispatch(UpdateMGM(res.data));
//         typeof callback === 'function' && callback(res);
//     } else {
//         typeof callbackErro === 'function' && callbackErro(res);
//     }
// };
