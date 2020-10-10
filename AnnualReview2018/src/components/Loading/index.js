import './index.less';
import handlebars from '@/utils/handlebars';
const templateIndex = require('./index.hbs');

/**
 * @class Loading
 * @param { Object } context 需要渲染到哪个容器中，如果不传就 append 到 body 中
 * @param { Object } option 参数
 * {
 * }
 */
export default class Loading {
  constructor(context, option) {
    // 默认参数
    const defaultOption = {
      text: '加载中'
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
    this.getElement();
  }

  render() {
    const option = this.option;
    const html = handlebars(templateIndex, {
      text: option.text
    });
    
    this.context ? this.context.html(html) : $('body').append(html);
  }

  getElement() {
    this.el = {
      loading: $('.loading')
    }
  }

  _hide() {
    this.el.loading.hide();
  }

};