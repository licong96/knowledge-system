import './index.less';
import handlebars from '@/utils/handlebars';
const templateIndex = require('./index.hbs');

/**
 * music
 * @class Music
 * @param { Object } context 需要渲染到哪个容器中
 * @param { Object } option 参数
 * {
 *  src: 音频地址
 * }
 */
export default class Music {
  constructor(context, option) {
    // 默认参数
    const defaultOption = {
      src: 'https://source.tutorabc.com.cn/ext/media/mp3/LP/AnnualReview2018/music.mp3'
    };

    // 判断是否传递了 context 参数
    if ((context instanceof jQuery)) {
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
    // this.playAudio();
    this.bindEvent();
  }

  render() {
    const option = this.option;
    
    const html = handlebars(templateIndex, {
      src: option.src
    });
    
    this.context ? this.context.html(html) : $('body').append(html);
  }

  // 获取页面元素
  getElement() {
    this.el = {
      music: $('.music'),
      audio: $('.music .audio')
    }
  }

  // 播放音乐
  playAudio() {
    const audio = this.el.audio[0];

    const play = function() {
        document.removeEventListener("WeixinJSBridgeReady", play);
        document.removeEventListener("YixinJSBridgeReady", play);
        audio.play();
    };

    // audio.play();
    
    if(window.WeixinJSBridge){
      // audio.play();
    }
    //weixin
    if (typeof WeixinJSBridge == "undefined"){
      document.addEventListener("WeixinJSBridgeReady", play, false);
    }else{
      //yixin
      document.addEventListener('YixinJSBridgeReady', play, false);
      audio.play();
    }
  }

  bindEvent() {
    const { music } = this.el;
    let onOff = false;

    music.on('click', () => {
      if (onOff) {
        this.stopMusic();
      } else {
        this.playMusic();
      }
      onOff = !onOff;
    });
  }

  // 暂停音乐
  stopMusic () {
    const { music, audio } = this.el;

    audio[0].pause();
    music.addClass('close');
  }

  // 继续播放音乐
  playMusic() {
    const { music, audio } = this.el;

    audio[0].play();
    music.removeClass('close');
  }

};