import './index.less';
import handlebars from '@/utils/handlebars';
const templateIndex = require('./index.hbs');

/**
 * @class Landscape
 * @param { Object } context 需要渲染到哪个容器中，如果不传就 append 到 body 中
 */
export default class Landscape {
  constructor(context, option) {
    // 默认参数
    const defaultOption = {
      src: '//source.tutorabc.com.cn/ext/images/website/abc/linkage_page/h5/doctorli/landscape.png'
    };

    // 判断是否传递了 context 参数
    if (context instanceof jQuery) {
      this.context = context;
    } else {
      this.context = null;
      option = context;
    }
    this.option = $.extend({}, defaultOption, option);

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const { src } = this.option;

    const html = handlebars(templateIndex, {
      src
    });
    
    this.context ? this.context.html(html) : $('body').append(html);
  }
};