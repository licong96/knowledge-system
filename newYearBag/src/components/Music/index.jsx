import React, { Component } from 'react';
import './styles';

/**
 * Music
 */

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onOff: true
    }
    this.src = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/musics/bg.mp3';
    this.onOff = true;
  }

  componentDidMount() {
    this.playAudio();
  }

  // 播放音乐
  playAudio() {
    let audio = this.refs.audio;

    let play = function() {
        document.removeEventListener("WeixinJSBridgeReady", play);
        document.removeEventListener("YixinJSBridgeReady", play);
        audio.play();
    };
    
    if(window.WeixinJSBridge){
      audio.play();
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

  // 打开或关闭音乐
  handlerMusic() {
    let audio = this.refs.audio;

    if (this.state.onOff) {
      audio.pause();
    } else {
      audio.play();
    }

    this.setState({
      onOff: !this.state.onOff
    });
  }

  render() {
    return (
      <div className="music-wrap">
        <i className={`icon-music ${this.state.onOff ? 'open' : ''}`} onClick={this.handlerMusic.bind(this)}></i>
        <audio ref="audio" id="audioBg" className="audio" src={this.src} preload="none" loop autoPlay ></audio>
      </div>
    );
  }
}

export default Music;
