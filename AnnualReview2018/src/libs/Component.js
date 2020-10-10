
import handlebars from '@/utils/handlebars';
/**
 * 基础组件
 */

class Component {
    /**
     * 渲染页面元素到指定容器中，如果没有 el 属性，则直接 append 到 body 中
     * @param { String } template 模板字符串
     * @param { Object } option 数据
     * @return { String } html
     */
    render(template, option) {
        let html = this.getHtml(template, option);

        if (option.el) {
            // 判断插入元素的方式
            if (option.mode === 'replace') {
                option.el.html(html);
                return false;
            }
            option.el[option.mode](html);
            return false;
        }
        $('body').append(html);
    }

    /**
     * 把字符串模板和数据组合起来，返回HTML
     * @param { String } template 模板字符串
     * @param { Object } option 数据
     * @return { String } html
     */
    getHtml(template, option) {
        return handlebars(template, option)
    }
}

export default Component;