import './index.less';
import html2canvas from 'html2canvas';
import '@/libs/jquery.qrcode';
import '@/libs/jq.qrcode';
import handlebars from '@/utils/handlebars';
import { medal } from '@/config/designation';
import { isApp } from '@/utils/index';
import { fromwhereCode, fromwhereCodeAPP } from '@/config/fromwhere';

const templateIndex = require('./index.hbs');

/**
 * @class Report
 * @param { Object } context 需要渲染到哪个容器中
 * @param { Object } option 参数
 * {
 *  userInfo: 用户信息
 * }
 */
export default class Report {
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
        this.render();
        this.bindEvent();
    }

    render() {
        const { userInfo, content } = this.option;
        let ClientTitle = '';

        medal.forEach((item, index) => {
            if (content.ClientTitle.includes(item)) {
                ClientTitle = `https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/screen-8/medal-${index + 1}.png`;
            }
        });

        const html = handlebars(templateIndex, {
            userInfo, 
            content,
            medal,
            ClientTitle,
        });

        this.context.html(html);

        // 判断是否APP，添加不同的fromwhere
        if (isApp()) {
            this.option.fromwhere = fromwhereCodeAPP;
        } else {
            this.option.fromwhere = fromwhereCode;
        }
        this.qrcode();
    }

    bindEvent() {
        $('.screenshot').on('click', function() {
            $(this).hide();
        });
    }

    // 生成二维码
    qrcode() {
        const { ClientSn, eventId, fromwhere } = this.option;
        const link = `https://www.vipjr.com/?ClientSnDec=${ClientSn}&fromwhere=${fromwhere}&eventId=${eventId}`;

        jQuery('#qrcode').qrcode({
            width: 120,
            height: 120,
            text: link
        });
    }

    // 生产年度报告
    _getReport() {
        const { callbackTrigger, callbackSuccess } = this.option;
        html2canvas(document.getElementById("report"), {
            useCORS: true,
        }).then(canvas => {
            const base64 = canvas.toDataURL('image/png');

            $('.screenshot').html(`<img class="img" src="${base64}" alt="">`).show();
            
            typeof callbackSuccess === 'function' ? callbackSuccess() : console.error('类型错误');
        });
        typeof callbackTrigger === 'function' ? callbackTrigger() : console.error('类型错误');
    }
};