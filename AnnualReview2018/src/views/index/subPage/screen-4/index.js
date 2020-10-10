import './index.less';
import handlebars from '@/utils/handlebars';

const templateIndex = require('./index.hbs');

/**
 * @class Screen
 * @param { Object } context 需要渲染到哪个容器中
 * @param { Object } option 参数
 * {
 *  userInfo,
 *  content
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
        this.render();
    }

    render() {
        const { userInfo, content } = this.option;

        const html = handlebars(templateIndex, {
            userInfo,
            content
        });

        this.context.html(html);
    }
};