import './index.less';
import handlebars from '@/utils/handlebars';
const templateIndex = require('./index.hbs');

/**
 * @class More
 * @param { Object } context 需要渲染到哪个容器中，如果不传就 append 到 body 中
 * @param { Object } option 参数
 * {
 * }
 */
export default class More {
  constructor(context, option) {
    // 默认参数
    const defaultOption = {
      title: '标题',
      desc: '文字描述',
      btnText: '知道了',
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
    this.bindEvent();
  }

  render() {
    const {title, desc, btnText} = this.option;

    const html = handlebars(templateIndex, {
      title,
      desc,
      btnText,
    });
    
    this.context ? this.context.html(html) : $('body').append(html);
  }

  bindEvent() {
    $('.js_more').on('click', () => {

      this._hide();

      if (typeof this.option.callback === 'function') {
        this.option.callback();
        this.option.callback = null;
      }
    });
  }

  _show(callback) {
    // 如果不放倒异步中将无法执行，这是一个bug
    setTimeout(() => {
      $('.js_more').addClass('show');

      $('body').css({
        'overflow': 'hidden'
      });
    }, 0);

    this.option.callback = callback;
  }

  _hide() {
    $('.js_more').removeClass('show');

    $('body').css({
      'overflow': 'visible'
    });
  }
};