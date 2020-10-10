import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles';
import { UpdateModal, UpdateJoinType, UpdateGamerInfo, MemberShareNote } from '@/stores/actions/home';
import { random } from '@/utils/index';

import { COUNT_DOWN } from '@/constants/Canvas';

// 图片
const imageData = {
  // 人物
  imgPerson1: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/canvas/pot-cow.png',

  // 道具
  imgFirecrackerLeft: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/firecracker-left.png',
  imgFirecrackerRight: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/firecracker-right.png',
  imgLuckyBagLeft: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/lucky-bag-left.png',
  imgLuckyBagRight: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/lucky-bag-right.png',
  imgLuckyBag2: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/lucky-bag2.png',
  imgBomb: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/bomb2.png',
  imgVipjr: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/vipjr.png?v=1',
  
  // 加分或减分提醒
  imgAdd1: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/add1.png',
  imgAdd2: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/add2.png',
  imgMinus2: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/minus2.png',

  // 数字
  imgNumber1: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/canvas/1.png',
  imgNumber2: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/canvas/2.png',
  imgNumber3: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/canvas/3.png',
  imgNumberGo: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/canvas/go.png',
}

// 音效
const audioData = {
  audioBag1: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/musics/bag2.mp3',
  audioBag2: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/musics/bag3.mp3',
  audioVipjr: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/musics/bag1.mp3',
  audioFirecracker: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/musics/firecracker2.mp3',
  audioBomb: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/musics/bomb.mp3',
}


const actionCreators = {
  UpdateJoinType,
  UpdateModal,
  UpdateGamerInfo,
  MemberShareNote,
};

class Canvas extends Component {

  constructor(props) {
    super(props);

    this.props.onRef(this);

    this.state = {
      countThree: -1,           // 倒数3个数
      total: 0,                 // 总分
      countDown: COUNT_DOWN,    // 倒计时 30 秒
      isBomb: false,
    }

    this.isOneOver = false;
    this.canvas = null;
    this.ctx = null;
    this.timeBlock = null;
    this.countTime = null;
    this.onceTime = null;
    this.threeTime = null;

    const resize = () => {
      const innerWidth = window.innerWidth * 2;
      const innerHeight = window.innerHeight * 2;
      const personFoot = 50;    // 人物距离底部的位置

      this.constPerson = {
        potWidth: 240,      // 盆的宽度
        potHeight: 40,     // 盆的高度
        potTop: 30,       // 盆距离人头上面的高度
        potOffsetLeft: 40,  // 盆和人物的偏移量
        perWidth: 433,  // 人物高度
        perHeight: 352,
        perTop: innerHeight - 352 - personFoot,
        perLeft: innerWidth / 2,
        perStartLeft: 0,    // 按下的位置
        perStep: 10,        // 移动的速度
        time: null,
        isTouch: false,
        lastPerLeft: 0,     // 上一个的位置，用来匀速滑动
      }
      
      // 人物状态
      this.person = Object.assign({}, this.constPerson);

      // 滑动数据
      this.touch = {
        boxWidth: 100,
        timeLeft: null,
        timeRight: null,
        step: 4,
        currentLeft: 0,
        currentTop: innerHeight - 50,
        maxLeft: innerWidth,
      };

      this.screen = {
        innerWidth: innerWidth,
        innerHeight: innerHeight,
      };
    };
    resize(this);

    // 竖屏处理
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', () => {
      if (window.orientation === 180 || window.orientation === 0) {
        setTimeout(() => {
          resize(this);
          this.canvas.width = this.screen.innerWidth;
          this.canvas.height = this.screen.innerHeight;
          this.drawPreson();
        }, 100);
      }
    }, false);

    // 道具
    this.propertys = [
      {
        id: 0,
        name: '福袋-left',
        value: 1,                      // 分数
        element: 'imgLuckyBagLeft',    // 图片元素
        propHint: 'imgAdd1',          // 加分或减分元素
        audio: 'audioBag1',           // 音效
      },
      {
        id: 1,
        name: '福袋-right',
        value: 1,
        element: 'imgLuckyBagRight',
        propHint: 'imgAdd1',
        audio: 'audioBag1',
      },
      {
        id: 2,
        name: '福袋2',
        value: 1,
        element: 'imgLuckyBag2',
        propHint: 'imgAdd1',
        audio: 'audioBag2',
      },
      {
        id: 3,
        name: 'logo',
        value: 2,
        element: 'imgVipjr',
        propHint: 'imgAdd2',
        audio: 'audioVipjr'
      },
      {
        id: 4,
        name: '鞭炮-left',
        value: -2,
        element: 'imgFirecrackerLeft',
        propHint: 'imgMinus2',
        audio: 'audioFirecracker',
      },
      {
        id: 5,
        name: '鞭炮-right',
        value: -2,
        element: 'imgFirecrackerRight',
        propHint: 'imgMinus2',
        audio: 'audioFirecracker',
      },
      {
        id: 6,
        name: '炸弹',
        value: 0,
        isBomb: true,
        element: 'imgBomb',
        audio: 'audioBomb',
      }
    ];

    // 概率，一个很长的数据，每个道具代表一个数字，用这个道具的长度除以总的长度，就等于出现的概率
    this.odds = {
      imgLuckyBagLeft: Array(6).fill(0),
      imgLuckyBagRight: Array(6).fill(1),
      imgLuckyBag2: Array(6).fill(2),
      Vipjr: Array(3).fill(3),
      imgFirecrackerLeft: Array(2).fill(4),
      imgFirecrackerRight: Array(2).fill(5),
      Bomb: Array(6).fill(6),
    };
    this.probability = [
      ...this.odds.imgLuckyBagLeft, 
      ...this.odds.imgLuckyBagRight, 
      ...this.odds.imgLuckyBag2, 
      ...this.odds.Vipjr, 
      ...this.odds.imgFirecrackerLeft, 
      ...this.odds.imgFirecrackerRight, 
      ...this.odds.Bomb];

    // console.log('probability', this.probability.length);

    this.countChild = [];   // 页面中的道具
    this.countIndex = 0;    // 记录下标
    this.timeDraw = null;   // 渲染动画
    this.isOverPlay = false;  // 是否结束游戏

    this.propHint = [];   // 道具加分或减分提醒
    this.propHintTime = null;

    // 图片
    this.arrImage = [
      {
        name: 'imgPerson1',
        image: imageData.imgPerson1
      },
      {
        name: 'imgLuckyBagLeft',
        image: imageData.imgLuckyBagLeft
      },
      {
        name: 'imgLuckyBagRight',
        image: imageData.imgLuckyBagRight
      },
      {
        name: 'imgLuckyBag2',
        image: imageData.imgLuckyBag2
      },
      {
        name: 'imgBomb',
        image: imageData.imgBomb
      },
      {
        name: 'imgFirecrackerLeft',
        image: imageData.imgFirecrackerLeft
      },
      {
        name: 'imgFirecrackerRight',
        image: imageData.imgFirecrackerRight
      },
      {
        name: 'imgVipjr',
        image: imageData.imgVipjr
      },
      {
        name: 'imgAdd1',
        image: imageData.imgAdd1
      },
      {
        name: 'imgAdd2',
        image: imageData.imgAdd2
      },
      {
        name: 'imgMinus2',
        image: imageData.imgMinus2
      },
    ];
    // 图片元素对象
    this.imageElement = {
      imgPerson1: null,
      imgLuckyBag2: null,
      imgLuckyBagLeft: null,
      imgLuckyBagRight: null,
      imgFirecrackerLeft: null,
      imgFirecrackerRight: null,
      imgBomb: null,
      imgVipjr: null,
      imgAdd1: null,
      imgAdd2: null,
      imgMinus2: null,
    }
  }

  componentDidMount() {
    let { innerWidth, innerHeight } = this.screen;

    this.canvas = this.refs.canvas;

    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.ctx = this.canvas.getContext('2d');

    this.imageLoad();
  }

  componentWillUnmount() {
    // 如果是中途退出游戏，中断，并且发送请求
    if (!this.isOverPlay && this.countChild.length > 0) {
      this.commGamerOver();
    }
    // 清空动画
    this.clearTime();
  }

  clearTime() {
    clearTimeout(this.countTime);
    clearTimeout(this.onceTime);
    clearTimeout(this.threeTime);
    cancelAnimationFrame(this.timeBlock);
  }

  // 还原一些数据，一进来就显示总福袋
  _initState(qty = 0) {
    this.setState({
      total: qty,
      countDown: COUNT_DOWN,
    });
  }

  // 倒数3个数
  countToThree() {
    let count = 3;
    let _this = this

    this.setState({
      countThree: count
    });
    this.isOneOver = false;
    this.isOverPlay = false;    // 还原状态

    clearTimeout(this.threeTime);
    this.threeTime = setTimeout(function repeat() {
      // GO 的时候就立马去创建道具数据
      if (count === 0) {
        _this.startDiamond();
      }

      if (count < 0) {
        clearTimeout(_this.threeTime);
        // 绘制要在道具数据函数执行之后
        _this.againDraw();
        return false;
      }

      count--;
      _this.setState({
        countThree: count
      });
      _this.threeTime = setTimeout(repeat, 1000);
    }, 1000);
  }

  // 随机道具数据
  startDiamond() {
    let _this = this;
    let { innerWidth } = this.screen;
    let countDown = COUNT_DOWN;
    let propertys = this.propertys;
    let probability = this.probability;         // 概率数组
    let probLength = this.probability.length;   // 概率长度
    let imageElement = this.imageElement;
    let { imgFirecrackerLeft, imgFirecrackerRight, Bomb } = this.odds;
    
    // 30秒倒计时
    clearTimeout(this.countTime);
    this.countTime = setTimeout(function repeat() {
        countDown--;
        _this.setState({
          countDown
        });
        if (countDown <= 0 || _this.isOverPlay) {
          _this.commGamerOver();  // 时间一到，立即停止
          countDown = 0;
          clearTimeout(_this.countTime);
          return false;
        }
        _this.countTime = setTimeout(repeat, 1000);
    }, 0);


    // 随机物品
    clearTimeout(this.onceTime);
    this.onceTime = setTimeout(function repeat() {
      if (countDown <= 0) {
        clearTimeout(_this.onceTime);
        return false
      }
      // 每次出现多少个道具
      let number = random(1, 3);

      // 第二阶段
      if (countDown > COUNT_DOWN - 15 && countDown <= COUNT_DOWN - 10) {
        number = random(3, 6);
      }

      for (let i = 0; i < number; i++) {
        let num = probLength;         // 通过随机数的长短来过滤鞭炮和炸弹
        let step = random(4, 10, 100); // 道具的速度

        // 第一阶段
        if (countDown > COUNT_DOWN - 10) {
          num = num - imgFirecrackerLeft.length - imgFirecrackerRight.length - Bomb.length;
        }
        
        // 第二阶段
        if (countDown > COUNT_DOWN - 15 && countDown <= COUNT_DOWN - 10) {
          num = num - imgFirecrackerLeft.length - imgFirecrackerRight.length - Bomb.length;
          step = random(8, 14, 100);
        }

        // 道具数据
        let property = propertys[probability[random(0, num)]];
        // 道具图片元素
        let img = imageElement[property.element];

        _this.countChild.push({
          id: _this.countIndex,
          width: img.width,
          height: img.height,
          top: -img.height,
          left: random(0, innerWidth - (img.width), 100),
          step,
          property,
          isPlay: false,
        });
        _this.countIndex++;
      }
      _this.onceTime = setTimeout(repeat, 500);
    }, 0);
  }

  // 从新绘制
  againDraw() {
    let _this = this;
    let ctx = this.ctx;
    let { innerWidth, innerHeight } = this.screen;

    cancelAnimationFrame(this.timeDraw);
    this.timeDraw = requestAnimationFrame(function frame() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      _this.timeDraw = requestAnimationFrame(frame);

      _this.drawPreson();   // 人物
      _this.drawProps();    // 道具
      _this.drawPropHint(); // 加分或减分提醒
    });
  }

  // 添加，加分或减分提醒数据
  pushPropHint(item) {
    if (!item.property.propHint) {
      return false;
    }

    let _this = this;
    let img = this.imageElement[item.property.propHint];
    let propHint = this.propHint;

    this.propHint.push({
      width: img.width,
      height: img.height,
      top: parseInt(item.top, 10),
      left: parseInt(item.left, 10),
      originalTop: parseInt(item.top, 10),      // 距离上面的元素位置
      property: item.property,
    });

    cancelAnimationFrame(this.propHintTime);
    this.propHintTime = requestAnimationFrame(function frame() {
      for (let i = 0, leng = propHint.length; i < leng; i++) {
        let item = propHint[i];

        item.top -= 1;
        if (item.top < item.originalTop - 20) {
          _this.propHint.splice(i, 1);
          cancelAnimationFrame(_this.propHintTime);
          break;
        }
      }

      if (_this.propHint.length) {
        _this.propHintTime = requestAnimationFrame(frame);
      }
    });
  }

  // 绘制加分或减分提醒
  drawPropHint() {
    let ctx = this.ctx;
    let propHint = this.propHint;
    let imageElement = this.imageElement;

    for (let i = 0, leng = propHint.length; i < leng; i++) {
      let item = propHint[i];

      ctx.beginPath();
      ctx.drawImage(imageElement[item.property.propHint], item.left + (item.width / 2), (item.top + (item.height / 2)), item.width, item.height);
    }
  }

  // 绘制道具
  drawProps() {
    let ctx = this.ctx;
    let countChild = this.countChild;
    let imageElement = this.imageElement;
    let { innerHeight } = this.screen;
    let { perLeft, perTop, potWidth, potHeight, potTop, potOffsetLeft } = this.person;

    for (let i = 0, leng = countChild.length; i < leng; i++) {
      let item = countChild[i];
      if (item.top < innerHeight) {
        item.top += item.step;

        let potLeft = perLeft - (potWidth / 2) - potOffsetLeft;   // 盆距离左边的坐标
        let itemLeft = item.left;

        // 碰撞检测
        if (
          itemLeft >= potLeft &&
          (itemLeft + item.width) <= (potLeft + potWidth) && 
          (item.top + item.height) >= (perTop + potTop) && 
          (item.top + item.height) <= (perTop + potTop + potHeight)
        ) {
          // 播放对应的音乐
          // 微信只能这种方法触发事件
          if (window.WeixinJSBridge) {
            window.WeixinJSBridge.invoke('getNetworkType', {}, ()=> {
              this[item.property.audio].play();
            })
          } else {
            this[item.property.audio].play();
          }

          // 如果是炸弹，游戏结束
          if (item.property.isBomb) {
            this.setState({
              isBomb: true
            });
            this.countChild = [];
            this.isOverPlay = true;
            this.clearTime();
            setTimeout(() => {
              this.commGamerOver();
              this.setState({
                isBomb: false
              });
            }, 1600);
            break;
          }

          this.setState(() => ({
            total: this.state.total + item.property.value
          }));

          // 加分或减分提醒
          this.pushPropHint(item);

          // 如果分数低于 0，游戏结束
          if (this.state.total < 0) {
            this.setState({
              total: 0
            });
            this.clearTime();
            this.commGamerOver();
            break;
          }

          // 去掉碰到的元素
          this.countChild = countChild.filter(list => list.id !== item.id);
        }

        // 绘制道具
        ctx.beginPath();
        ctx.drawImage(imageElement[item.property.element], item.left, item.top, item.width, item.height);
      } else {
        this.countChild = countChild.filter(list => list.id !== item.id);
      }
    }
  }

  // 统一处理游戏结束
  commGamerOver() {
    if (this.isOneOver) {
      return false;
    }
    this.isOneOver = true;

    this.props.gamerOver(this.state.total);
    this.countChild = [];
    this.isOverPlay = true;
  }

  // 图片加载
  imageLoad() {
    let imgLength = 0;
    let arrImage = this.arrImage;

    arrImage.forEach(item => {
      let image = new Image();

      image.src = item.image;

      this.imageElement[item.name] = image

      image.onload = () => {
        imgLength++;
        if (imgLength === arrImage.length) {
          this.drawPreson();
        }
      }

      image.onerror = () => {
        console.log('图片加载失败', imgLength)
      }
    });
  }

  // 绘制人物
  drawPreson() {
    let ctx = this.ctx;
    let { perLeft, perTop, perWidth, perHeight } = this.person;

    ctx.beginPath();
    ctx.drawImage(this.imageElement.imgPerson1, perLeft - (perWidth / 2), perTop, perWidth, perHeight);
  }

  // 开始滑动人物
  handleStartCanvas(event) {
    let { clientX } = event.touches[0];

    this.person.perStartLeft = clientX * 2;
    this.person.lastPerLeft = 0;
  }

  handleMoveCanvas(event) {
    if (this.countChild.length === 0) {
      return false;
    }

    let _this = this;
    let { innerWidth } = this.screen;
    let { clientX } = event.touches[0];
    let newLeft = (clientX * 2) - this.person.perStartLeft;
    let space = 0;

    /**
     * 计算手指滑动了多少，然后让人物移动多少
     * `lastPerLeft`是上一个的位置，用上一个的滑动值，减去当前滑动值，可以得出滑动的区间
     */
    cancelAnimationFrame(_this.person.time);

    _this.person.time = requestAnimationFrame(function frame() {

      space = newLeft - _this.person.lastPerLeft;

      _this.person.perLeft += space;
      _this.person.lastPerLeft = newLeft;

      if (_this.person.perLeft < 0) {
        _this.person.perLeft = 0;
      }

      if (_this.person.perLeft > innerWidth) {
        _this.person.perLeft = innerWidth
      }

      _this.againDraw();
    })
  }

  handleEndCanvas() {
    cancelAnimationFrame(this.person.time);
  }

  // 清空画布
  clearRect() {
    let { innerWidth, innerHeight } = this.screen;

    this.ctx.clearRect(0, 0, innerWidth, innerHeight);

    this.person = Object.assign({}, this.constPerson);    // 还原人物数据
    this.drawPreson();
  }

  render() {
    let total = this.state.total || this.props.defaultTotal;
    let scoreFont = {};

    // 福袋数，如果大于10000，为了显示完整，改小字体
    if (total > 999) {
      scoreFont = {
        fontSize: '20px'
      }
    }
    if (total > 9999) {
      scoreFont = {
        fontSize: '16px'
      }
    }
    if (total > 99999) {
      scoreFont = {
        fontSize: '14px'
      }
    }

    return (
      <div className="canvas">
        <canvas 
          ref="canvas" 
          onTouchStart={this.handleStartCanvas.bind(this)} 
          onTouchMove={this.handleMoveCanvas.bind(this)} 
          onTouchEnd={this.handleEndCanvas.bind(this)}
        ></canvas>

        <div className="top">
          <span className="top__label time">{this.state.countDown}</span>
          <span className="logo"></span>
          <span className="top__label score" style={scoreFont}>{total}</span>
        </div>

        {/* 倒计时 */}
        <div className={`count-wrap count--${this.state.countThree}`}>
          <img className="count__img" src={imageData.imgNumberGo} alt=""/>
          <img className="count__img" src={imageData.imgNumber1} alt=""/>
          <img className="count__img" src={imageData.imgNumber2} alt=""/>
          <img className="count__img" src={imageData.imgNumber3} alt=""/>
        </div>
        
        {/* 音效 */}
        <div style={{ display: 'none' }}>
          <audio ref={(input) => {this.audioBag1 = input}} src={audioData.audioBag1} preload="none"></audio>
          <audio ref={(input) => {this.audioBag2 = input}} src={audioData.audioBag2} preload="none"></audio>
          <audio ref={(input) => {this.audioVipjr = input}} src={audioData.audioVipjr} preload="none"></audio>
          <audio ref={(input) => {this.audioFirecracker = input}} src={audioData.audioFirecracker} preload="none"></audio>
          <audio ref={(input) => {this.audioBomb = input}} src={audioData.audioBomb} preload="none"></audio>
        </div>
        {
          // 炸弹效果
          this.state.isBomb ? <img className="bomb" src="https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/prop/bomb-over.png" alt=""/> : null
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    homeState: state.homeState,
    gamerInfo: state.homeState.gamerInfo,
    modal: state.homeState.modal,
    gameStartState: state.canvasState.gameStartState,
    userQty: state.canvasState.userQty,
    userPoint: state.canvasState.userPoint,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Canvas);
