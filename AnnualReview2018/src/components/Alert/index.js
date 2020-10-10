import './index.less';
import handlebars from '@/utils/handlebars';
const templateIndex = require('./index.hbs');

/**
 * @class Alert
 * @param { Object } context 需要渲染到哪个容器中，如果不传就 append 到 body 中
 * @param { Object } option 参数
 * {
 * }
 */
export default class Alert {
  constructor(context, option) {
    // 默认参数
    const defaultOption = {
      title: '标题',
      desc: '非常抱歉，您2018年在vipJr尚未上满5堂课，或您还不是vipJr英语在期会员，无法生成“2018成长故事”。vipJr期待能在2019与您分享宝贝的成长。',
      btnText: '知道了'
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
    this.el.$alert.on('click', () => {
      this._hide();
      if (typeof this.option.callback === 'function') {
        this.option.callback();
        this.option.callback = null;
      }
    });
  }

  getElement() {
    this.el = {
      $alert: $('.js_alert'),
      $title: $('.js_alert .alert__title'),
      $desc: $('.js_alert .alert__desc'),
      $btn: $('.js_alert .alert__btn'),
    }
  }

  _show(info = {}, callback) {
    const { title, desc, btnText } = info;
    const { $title, $desc, $btn } = this.el;

    $title.html(title);
    $desc.html(desc);
    $btn.html(btnText);

    this.el.$alert.addClass('show');

    this.option.callback = callback;
  }

  _hide() {
    this.el.$alert.remove();
  }
};