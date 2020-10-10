import '@/assets/js/common';
import './index.less';

import {
    Loading,
    Music,
    Share,
    Alert,
    More,
    Landscape,
    Message,
    HomeMore
} from '@/components';
import {
    Report,
    screen_1,
    screen_2,
    screen_3,
    screen_4,
    screen_5,
    screen_6,
    screen_7,
    screen_8
} from './subPage';
import {
    isApp
} from '@/utils/index';
import { CustomerBaseInfo, JRClientAnnualReview, EventTrace } from '@/config/designation';

// import axios from 'axios';

require('@/libs/skrollr.js'); // VERSION: '0.5.11'

// 需要加载的图片资源
const imgListData = [
    'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/screen-1/book-cover.png',
    'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/screen-1/book-left.png',
    'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/screen-1/book-right.png',
    'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/screen-1/book-bg.png',
    'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/screen-1/table.png',
];

const page = {
    el: {
        $down: $('.js_down'),
    },
    // 单列数据
    data: {
        query: { ClientSn: 1 },
        eventId: '2018' + new Date().getTime() + Math.floor(Math.random() * 10), // 不重复的随机数
        currentIndex: 0, // 当前处在哪一页
        currentTop: 0, // 当前滚动的高度
        screenHeight: [1500, 2800, 3800, 4900, 6100, 7300, 8400, 10000], // 每一页的高度
        downOnOff: false, // 防止重复点击
        localStorageKey: '', // localStorage中用户数据的 key 
    },
    // 实例对象
    components: {
        Skrollr: null,
        Loading: null,
        Music: null,
        Share: null,
        Alert: null,
        More: null,
        Landscape: null,
        Message: null,
        HomeMore: null,
    },
    // 初始化
    init() {
        this.initHomeMore();
        this.initAlert();
        this.initLandscape();
        this.initLoading();

        const {
            ClientSn
        } = this.data.query;

        // 地址栏里的ClientSn优先
        if (ClientSn) {
            this.entrance(decodeURIComponent(ClientSn));
            return false;
        }
    },
    // 入口
    entrance(ClientSn) {
        this.firstLoading(ClientSn);
        this.initMusic();
        this.initMessage();
    },
    // 初始化音乐
    initMusic() {
        this.components.Music = new Music();
    },
    // 初始化加载中
    initLoading() {
        this.components.Loading = new Loading();
    },
    // 初始化弹窗
    initAlert() {
        this.components.Alert = new Alert();
    },
    // 初始化竖屏显示提醒
    initLandscape() {
        this.components.Landscape = new Landscape();
    },
    // 初始化消息提醒
    initMessage() {
        this.components.Message = new Message();
    },
    initHomeMore() {
        this.components.HomeMore = new HomeMore();
    },
    // 首页加载
    async firstLoading(ClientSn) {
        await this.loadPageImg();

        // 图片加载完毕之后，出现第一屏
        this.renderScreen_1({});
        this.initSkrollr(ClientSn);

        setTimeout(() => {
            this.components.Loading._hide();
        }, 100);
        this.getUserData(ClientSn);
    },
    // 阻止默认滚动
    preventDefault(e) {
        e.preventDefault();
    },
    // 获取数据
    getUserData(ClientSn) {
        const userInfo = CustomerBaseInfo.data.list[0];
        const content = JRClientAnnualReview.Data.Items[0];
        const total = EventTrace.data.total;

        this.initRender(ClientSn, userInfo, content, total);
    },
    // 渲染页面，处理逻辑
    initRender(ClientSn, userInfo, content, total) {
        const {
            eventId
        } = this.data;
        const _this = this;

        // 拿到数据之后更新Screen_1
        this.components.screen_1.render(userInfo, total);

        this.renderScreen_2({
            content
        });
        this.renderScreen_3({
            content
        });
        this.renderScreen_4({
            userInfo,
            content,
        });
        this.renderScreen_5({
            content
        });
        this.renderScreen_6({
            content
        });
        this.renderScreen_7({
            content
        });
        this.renderScreen_8({
            userInfo,
            content,
            ClientSn,
            eventId,
            total,
            callbackReport() { // 点击生成年度证书
                _this.components.Message._show();
                _this.components.Report._getReport();
            },
            callbackShare() { // 点击分享，区分APP和微信
                if (isApp()) {
                    // APP里面只有苹果提示右上角图标
                    if (navigator.userAgent.match(/vipjrphone/i)) {
                        _this.components.Share._show();
                    }
                    _this.components.screen_8._appShare();
                } else {
                    _this.components.Share._show();
                }
            },
            callbackMore() { // 点击更多规则
                _this.components.More._show();
            },
            callbackTrigger() { // 会员事件-添加事件，分享出去
            }
        });

        // 生产证书
        this.renderReport({
            userInfo,
            content,
            ClientSn,
            eventId,
            callbackTrigger() { // 会员事件-添加事件，二维码图片
            },
            callbackSuccess() { // 生成成功
                _this.components.Message._hide();
            }
        });

        // refresh滑动，skrollr.stylesheets只能运行一次
        require('@/assets/js/skrollr.stylesheets.min');
        this.components.Skrollr.refresh();

        setTimeout(() => {
            document.body.removeEventListener('touchmove', this.preventDefault, true);
            this.el.$down.addClass('show'); // 显示下滑图标

            this.bindEvent();
            this.renderShare();
            this.renderMore();
        }, 30);
    },
    /**
     * 自动播放到指定位置
     * @param {*} scrollTop 
     */
    skrollrAnimatePlay(scrollTop) {
        const duration = (scrollTop - this.data.currentTop) * 3;
        const _this = this;

        this.components.Skrollr.animateTo(scrollTop, {
            duration,
            easing: 'linear',
            done() {
                _this.data.downOnOff = false;
            }
        });
    },
    // 停止播放
    skrollrAnimateStop() {
        this.components.Skrollr.stopAnimateTo();
    },
    // 绑定事件
    bindEvent() {
        const {
            screenHeight,
        } = this.data;

        // 点击下滑自动播放
        this.el.$down.on('click', () => {
            if (this.data.downOnOff) {
                this.data.downOnOff = false;
                this.skrollrAnimateStop();
            } else {
                this.data.downOnOff = true;
                this.skrollrAnimatePlay(screenHeight[this.data.currentIndex]);
            }
        });
    },
    // 图片加载
    loadPageImg() {
        const $collection = $('.collection-img');
        const _this = this;

        const loadPromises = imgListData.map((item) => {
            return (new Promise((resolve, reject) => {
                const img = new Image();
                img.src = item;
                img.onload = () => {
                    $collection.append(img);
                    resolve();
                };
                img.onerror = () => {
                    _this.components.Alert._show({
                        title: '提示',
                        desc: '图片加载失败了，请刷新页面试试，或检查您的网络',
                        btnText: '知道了'
                    }, () => {
                        window.location.reload();
                    });
                    reject();
                };
            }))
        });
        return Promise.all(loadPromises);
    },
    // 渲染第一屏
    renderScreen_1(option) {
        this.components.screen_1 = new screen_1($('.screen-1'), option);
    },
    // 渲染第二屏
    renderScreen_2(option) {
        this.components.screen_2 = new screen_2($('.screen-2'), option);
    },
    // 渲染第三屏
    renderScreen_3(option) {
        this.components.screen_3 = new screen_3($('.screen-3'), option);
    },
    // 渲染第四屏
    renderScreen_4(option) {
        this.components.screen_4 = new screen_4($('.screen-4'), option);
    },
    // 渲染第五屏
    renderScreen_5(option) {
        this.components.screen_5 = new screen_5($('.screen-5'), option);
    },
    // 渲染第六屏
    renderScreen_6(option) {
        this.components.screen_6 = new screen_6($('.screen-6'), option);
    },
    // 渲染第七屏
    renderScreen_7(option) {
        this.components.screen_7 = new screen_7($('.screen-7'), option);
    },
    // 渲染第八屏
    renderScreen_8(option) {
        this.components.screen_8 = new screen_8($('.screen-8'), option);
    },
    // 渲染生产证书页
    renderReport(option) {
        this.components.Report = new Report($('.report'), option);
    },
    // 渲染分享组件
    renderShare() {
        this.components.Share = new Share();
    },
    // 渲染更多规则
    renderMore() {
        this.components.More = new More();
    },
    // 初始化 Skrollr 0.5.11
    initSkrollr(ClientSn) {
        const _this = this;
        let time = null;
        let onOff = false;
        let startTime = new Date().getTime();

        this.components.Skrollr = skrollr.init({
            smoothScrolling: true,
            easing: 'swing',
            render: function (info) {
                // 每 1.5s 之后运行一次这个函数
                if (new Date().getTime() > (startTime + 1500)) {
                    startTime = new Date().getTime();
                    downScroll();
                }

                if (time) {
                    clearTimeout(time);
                }
                time = setTimeout(downScroll, 200);

                function downScroll() {
                    const {
                        maxTop,
                        curTop
                    } = info;

                    // 计算当前滑动到哪一页
                    _this.data.currentIndex = _this.countCurrentIndex(curTop);
                    _this.data.currentTop = curTop;

                    if (curTop > (maxTop - 600)) {
                        _this.el.$down.removeClass('show');
                    } else {
                        _this.el.$down.addClass('show');
                    }

                    // 进入页面最大可滑动位置150以内
                    if (curTop > (maxTop - 150) && !onOff) {
                        onOff = true;
                    }
                }
            }
        });
        // this.components.Skrollr.setScrollTop(3000, true);           // 设置距离顶部的偏移，第二个参数如果为true，不进行动画
    },
    /**
     * 计算当前滑动到哪一页
     */
    countCurrentIndex(curTop) {
        const {
            screenHeight
        } = this.data;
        let currentIndex = 0;

        while (curTop >= screenHeight[currentIndex]) {
            currentIndex++
        }
        return currentIndex;
    }
};

$(function () {
    page.init();
});