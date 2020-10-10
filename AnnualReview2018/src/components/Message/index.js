import './index.less';
import handlebars from '@/utils/handlebars';
const templateIndex = require('./index.hbs');

/**
 * 消息提醒
 * @class Message
 * @param { Object } context 需要渲染到哪个容器中，如果不传就 append 到 body 中
 * @param { Object } option 参数
 * {
 * }
 */
export default class Message {
  constructor(context, option) {
    // 默认参数
    const defaultOption = {};

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
    this.bindEvent();
  }

  render() {
    const { title, desc, btnText } = this.option;

    const html = handlebars(templateIndex, {
      title,
      desc,
      btnText,
    });

    this.context ? this.context.html(html) : $('body').append(html);
  }

  bindEvent() {
  }

  getElement() {
    this.el = {
      $message: $('.js_message'),
    }
  }

  _show() {
    this.el.$message.addClass('show');
  }

  _hide() {
    this.el.$message.removeClass('show');
  }

};