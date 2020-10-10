// 分享前活动首页访问情况
export function PointsMallCampaign_HomePage_UV(UV) {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_HomePage_UV', UV);
    }
}
// 分享前活动首页访问情况
export function PointsMallCampaign_HomePage_PV() {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_HomePage_PV', 1);
    }
}

// 游戏规则入口点击情况
export function PointsMallCampaign_RulesClicks_UV(UV) {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_RulesClicks_UV', UV);
    }
}
// 游戏规则入口点击情况
export function PointsMallCampaign_RulesClicks_PV() {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_RulesClicks_PV', 1);
    }
}

// 排行榜页面访问情况
export function PointsMallCampaign_RankingList_UV(UV) {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_RankingList_UV', UV);
    }
}
// 排行榜页面访问情况
export function PointsMallCampaign_RankingList_PV() {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_RankingList_PV', 1);
    }
}

// 分享给好友
export function PointsMallCampaign_Sharing_PY(UV) {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_Sharing_PY', UV);
    }
}
// 分享到朋友圈
export function PointsMallCampaign_Sharing_PYQ(UV) {
    if (window.itgTracker) {
        window.itgTracker.trackEvent('PointsMallCampaign_Sharing_PYQ', UV);
    }
}