import './index.less';
import handlebars from '@/utils/handlebars';

const templateIndex = require('./index.hbs');

/**
 * @class Screen
 * @param { Object } context 需要渲染到哪个容器中
 * @param { Object } option 参数
 * {
 *  
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
        const { content } = this.option;
        const { Participation, Pronunciation, Comprehension, Creativity, Facility } = this.option.content;

        /**
         * 尝试使用函数式编程，计算圆形进度条旋转的角度
         */
        const countL = (num) => {
            return {
                L: -136 + (num * 36 - 180), 
                R: 45
            }
        };
        const countR = (num) => {
            return {
                L: -136, 
                R: -136 + (num * 36)
            }
        };
        const middle = (num) => num > 5;
        const count = (num) => middle(num) ? countL(num) : countR(num);

        const valParticipation = count(Participation);
        const valPronunciation = count(Pronunciation);
        const valComprehension = count(Comprehension);
        const valCreativity = count(Creativity);
        const valFacility = count(Facility);

        const html = handlebars(templateIndex, {
            content,
            valParticipation,
            valPronunciation,
            valComprehension,
            valCreativity,
            valFacility,
        });

        this.context.html(html);
    }
};