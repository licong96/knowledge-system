import Component from '@/libs/Component';
import './index.less';
const templateIndex = require('./index.hbs');

/**
 * @class Test
 * @param { Object } option 参数
 * {
 *    el: jQuery元素，需要渲染到哪个容器中，如果不传就 append 到 body 中
 *    mode: append || prepend || after || before || replace // html元素插入容器的模式，默认是 `append`，replace是覆盖等于html()方法，
 * }
 */
class Test extends Component {
  constructor(option) {
    super();

    if (!(option.el instanceof jQuery)) {
      console.error('`el`属性不是一个有效的jQuery元素')
    }

    // 默认参数
    const defaultOption = {
      mode: 'append',
      title: '标题',
      desc: '文字描述',
      btnText: '知道了',
    };
    
    this.option = Object.assign({}, defaultOption, option);
    
    this._init();
  }

  _init() {
    this.render(templateIndex, this.option);
  }

}

export default Test;