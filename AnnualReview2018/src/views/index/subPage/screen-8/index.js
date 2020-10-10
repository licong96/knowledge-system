import './index.less';
import handlebars from '@/utils/handlebars';
import { shareFriendCount, shareFriendCircleCount } from '@/utils/trackEvent';
import { medal } from '@/config/designation';
import { isWeiXin, isApp } from '@/utils/index';
import { fromwhereShare, fromwhereShareAPP } from '@/config/fromwhere';

const templateIndex = require('./index.hbs');

/**
 * @class Screen
 * @param { Object } context 需要渲染到哪个容器中
 * @param { Object } option 参数
 * {
 *  userInfo: 用户信息
 * }
 */
export default class Screen {
    constructor(context, option) {
        // 默认参数
        const defaultOption = {
        };

        if (!(context instanceof jQuery)) {
            console.error('context容器参数必须是jquery对象')
            return;
        }
        this.context = context
        this.option = $.extend({}, defaultOption, option);

        this.init();
    }

    init() {
        this.initShare();
        this.render();
        this.bindEvent();
    }

    bindEvent() {
        this.handerReport();
        this.handerShare();
        this.handerMore();
    }

    // 点击生成年度证书
    handerReport() {
        const callbackReport = this.option.callbackReport;

        // $('.js_report').on('click', () => {
        //     typeof callbackReport === 'function' ? callbackReport() : console.error('类型错误');
        // });
    }

    // 点击分享
    handerShare() {
        const callbackShare = this.option.callbackShare;

        $('.js_share').on('click', () => {
            typeof callbackShare === 'function' ? callbackShare() : console.error('类型错误');
        });
    }

    // 更多规则
    handerMore() {
        const callbackMore = this.option.callbackMore;

        $('.js_more').on('click', () => {
            typeof callbackMore === 'function' ? callbackMore() : console.error('类型错误');
        });
    }

    render() {
        const { userInfo, content, total } = this.option;
        let ClientTitle = '';

        medal.forEach((item, index) => {
            if (content.ClientTitle.includes(item)) {
                ClientTitle = `https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/screen-8/medal-${index + 1}.png`;
            }
        });

        const html = handlebars(templateIndex, {
            userInfo, 
            content,
            ClientTitle,
            total,
        });

        this.context.html(html);
    }

    // 初始化分享
    initShare() {
        const { userInfo, content, ClientSn, eventId } = this.option;
        const fromwhere = isApp() ? fromwhereShareAPP : fromwhereShare;

        const shareLink = `${window.location.origin}/landingpage/h5/AnnualReview2018/share.html?ClientSnDec=${ClientSn}&ClientSn=${ClientSn}&eventId=${eventId}&fromwhere=${fromwhere}`;

        // 组装分享信息
        this.option.shareTitle = `vipJr给${userInfo.cname}加冕2018${content.ClientTitle}称号！快来给TA打Call~`;
        this.option.shareDesc = '见证2018闪光时刻，展望2019全新成长';
        this.option.shareLink = shareLink;
        this.option.shareImgUrl = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/share-icon3.jpg';
        
        // 判断是否微信分享
        if (isWeiXin()) {
            window.WXReady = this.WXReady.bind(this);      // 把这个函数交给全局，下面的js里面会去调用它，绑定了当前this
            $('body').append('<script src="https://source.tutorabc.com.cn/Ext/js/api/weixin/wx_config.js"></script>');
        }
    }

    // 微信分享调用函数
    WXReady() {
        const { shareTitle, shareDesc, shareLink, shareImgUrl, ClientSn, callbackTrigger } = this.option;

        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: shareDesc,
            link: shareLink,
            imgUrl: shareImgUrl,
            success: function () {
                shareFriendCount(ClientSn);  // 微信-分享给“朋友”次数
                typeof callbackTrigger === 'function' ? callbackTrigger() : console.error('类型错误');
            }
        });

        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
            title: shareTitle,
            link: shareLink,
            imgUrl: shareImgUrl,
            success: function () {
                shareFriendCircleCount(ClientSn);   // 微信-分享给“朋友”次数
                typeof callbackTrigger === 'function' ? callbackTrigger() : console.error('类型错误');
            }
        });


        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareQQ({
            title: shareTitle,
            desc: shareDesc,
            link: shareLink,
            imgUrl: shareImgUrl,
        });


        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareWeibo({
            title: shareTitle,
            desc: shareDesc,
            link: shareLink,
            imgUrl: shareImgUrl,
        });
        // document.getElementById('media').play();
    }
};