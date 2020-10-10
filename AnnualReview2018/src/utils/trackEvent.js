
/**
 * 数据埋点
 */
const itgTracker = window.itgTracker;
const isMath = window.location.href.includes('math') || window.location.href.includes('Math')
const project = isMath ? '_math' : '';

// 曝光数
/**
 * 首页浏览次数
 * @param { string } project
 */
export function exposureFirstPage() {
    const pv = 0;

    if (itgTracker) {
        if (isApp()) {
            itgTracker.trackEvent('2018_app_annualreport_pv' + project, pv);
        } else {
            itgTracker.trackEvent('2018_wx_annualreport_pv' + project, pv);
        }
    }
}

/**
 * 尾页浏览次数
 */
export function exposureLastPage() {
    const pv = 0;

    if (itgTracker) {
        if (isApp()) {
            itgTracker.trackEvent('2018_app_annualreport_end_pv' + project, pv);
        } else {
            itgTracker.trackEvent('2018_wx_annualreport_end_pv' + project, pv);
        }
    }
}

/**
 * 分享页浏览次数
 */
export function exposureSharePage() {
    const pv = 0;

    if (itgTracker) {
        itgTracker.trackEvent('2018_share_annualreport_pv' + project, pv);
    }
}


// 新用户数
/**
 * 首页的独立访客
 * @param {String} UV 加密过的 Client Sn
 */
export function newUserFirstPage(UV) {
    if (itgTracker) {
        if (isApp()) {
            itgTracker.trackEvent('2018_app_annualreport_uv' + project, UV);
        } else {
            itgTracker.trackEvent('2018_wx_annualreport_uv' + project, UV);
        }
    }
}

/**
 * 尾页的独立访客
 * @param {String} UV 加密过的 Client Sn
 */
export function newUserLastPage(UV) {
    if (itgTracker) {
        if (isApp()) {
            itgTracker.trackEvent('2018_app_annualreport_end_uv' + project, UV);
        } else {
            itgTracker.trackEvent('2018_wx_annualreport_end_uv' + project, UV);
        }
    }
}

/**
 * 分享页的独立访客
 * @param {String} UV 加密过的 Client Sn
 */
export function newUserSharePage(UV) {
    if (itgTracker) {
        itgTracker.trackEvent('2018_share_annualreport_uv' + project, UV);
    }
}


// 分享数
/**
 * 微信-分享给“朋友”次数
 * @param {String} UV 加密过的 Client Sn
 */
export function shareFriendCount(UV) {
    if (itgTracker) {
        itgTracker.trackEvent('2018_wx_annualreport_py' + project, UV);
    }
}

/**
 * 微信-分享给“朋友圈”次数
 * @param {String} UV 加密过的 Client Sn
 */
export function shareFriendCircleCount(UV) {
    if (itgTracker) {
        itgTracker.trackEvent('2018_wx_annualreport_pyq' + project, UV);
    }
}

/**
 * 微信-“朋友”二次转发的次数
 * @param {String} UV 加密过的 Client Sn
 */
export function shareFriendTransmit(UV) {
    if (itgTracker) {
        itgTracker.trackEvent('2018_wx_annualreport_py_twice' + project, UV);
    }
}

/**
 * 微信-“朋友圈”二次转发的次数
 * @param {String} UV 加密过的 Client Sn
 */
export function shareFriendCircconstransmit(UV) {
    if (itgTracker) {
        itgTracker.trackEvent('2018_wx_annualreport_pyq_twice' + project, UV);
    }
}

/**
 * APP 分享次数，无法不区分朋友和朋友圈，也无法区分是否分享成功
 * @param {String} UV 加密过的 Client Sn
 */
export function shareAPPFriend(UV) {
    if (itgTracker) {
        itgTracker.trackEvent('2018_app_annualreport' + project, UV);
    }
}

/**
 * 判断是否APP
 */
function isApp() {
    if (navigator.userAgent.match(/vipjrphone/i) || navigator.userAgent.match(/vipjrphone_android/i)) {
        return true
    }
    return false;
}

/**
 * 分享页点击领取
 */
export function exposureShareFromPage(UV) {
    if (itgTracker) {
        itgTracker.trackEvent('2018_share_from_annualreport_uv', UV);
    }
}