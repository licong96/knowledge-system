import './index.less';
import handlebars from '@/utils/handlebars';

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
            cname: '宝宝'
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
    }

    render(userInfo, total = 0) {
        const data = userInfo || this.option;

        /**
         * 用户头像加载优化
         */
        if (data.headIcon) {
            const img = new Image();

            img.src = data.headIcon;
            img.onload = () => {
                $('.js_default-head').addClass('hide');
                $('.js_user-head').addClass('show');
            }
            img.onerror = () => {
                console.error('用户头像加载失败')
            }
        }

        const html = handlebars(templateIndex, {
            data,
            total,
        });

        this.context.html(html);
    }

};