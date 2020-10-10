import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles';
import { UpdateModal } from '@/stores/actions/home';
import { GameOver } from '@/stores/actions/canvas';
import { ModalGameOver } from '@/components';
import { preventDefaultTouchMove, recoverDefaultTouchMove } from '@/utils/index';
import AlertGamePlay from './AlertGamePlay';
import Game from './Game';

const actionCreators = {
  UpdateModal,
  GameOver,
};

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowGamePlay: true,     // 显示游戏开始玩法提醒
    }
    this.isOneOver = false;
    this.isOnOff = false;
  }

  onRef = (ref) => {
    this.child = ref;
  }

  componentDidMount() {
    preventDefaultTouchMove();    // 禁止滑动
  }

  componentWillUnmount() {
    recoverDefaultTouchMove();  // 恢复页面滑动
  }

  // 游戏开始操作提醒确定，点击开始游戏
  handlerGamePlay() {
    this.GameStart();
  }

  GameStart() {
    this.setState({
      isShowGamePlay: false
    });
    this.props.UpdateModal({
      isGameOver: false,
    });
    // 更新总福袋
    this.child._initState(0);
    this.props.GameOver({
      qty: 0,
      ttlQty: this.props.userQty.ttlQty
    });
    // 倒数3个数开始游戏
    this.child.countToThree();
  }

  // 游戏结束
  gamerOver(total) {
    // 清空画布
    // this.child.clearRect();
    // this.setState({
    //   isShowGamePlay: true,
    // });
    this.props.GameOver({
      qty: total,
      ttlQty: this.props.userQty.ttlQty + total
    });
    this.props.UpdateModal({
      isShare: false,
      isGameOver: true,
    });
  }

  // 再玩一次
  handlerPlayAgain() {
    this.handlerGamePlay();
  }

  render() {
    let { isGameOver, typeGameOver } = this.props.modal;
    let { clientScores, qty } = this.props.userQty;

    return (
      <div className="canvas">
        <Game onRef={this.onRef} gamerOver={this.gamerOver.bind(this)} defaultTotal={qty || 0} />
        {
          isGameOver ? 
          <ModalGameOver 
            isShow={true} 
            types={typeGameOver}
            total={this.props.userQty.qty}
            qty={this.props.userQty.ttlQty}
            currentPoints={clientScores}
            handlerPlayAgain={this.handlerPlayAgain.bind(this)} 
            btnRightText="再玩一次" /> : null
        }
        {
          this.state.isShowGamePlay ? <AlertGamePlay isShow={true} handlerGamePlay={this.handlerGamePlay.bind(this)} /> : null
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
    userQty: state.canvasState.userQty,
    isShare: state.canvasState.isShare,
    isSeniorEnter: state.canvasState.isSeniorEnter,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Canvas);
