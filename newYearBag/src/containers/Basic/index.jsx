import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UpdateModal, UpdateJoinType, MemberShareNote, PutTriggerAdd, UpdateGamerInfo } from '@/stores/actions/home';
import './styles';
import { ModalRule, ModalGamePop, ModalShare, Music, Loader } from '@/components';


const actionCreators = {
  UpdateModal,
  UpdateJoinType,
  MemberShareNote,
  PutTriggerAdd,
  UpdateGamerInfo,
};

class Home extends Component {
  // hide rule
  handlerHideRule() {
    this.props.UpdateModal({
      isRule: false
    })
  }
  
  // 关闭游戏次数上线，明儿再来弹窗
  handlerClosePop() {
    this.props.UpdateModal({
      isGamePop: false
    })
  }
  
  // 关闭分享好友弹窗
  handlerShareClose() {
    this.props.UpdateModal({
      isShare: false
    })
  }

  render() {
    let { isRule, isGameNot, isGamePop, isShare, isShareSuccess, isShareOnline } = this.props.modal;
    let { isLoader } = this.props;

    return (
      <div className="basic">
        <Music />
        {
          isLoader ? <Loader /> : null
        }
        {
          // 游戏规则
          isRule ? <ModalRule handlerHideRule={this.handlerHideRule.bind(this)} /> : null
        }
        {
          // 游戏资格用完
          isGamePop ? <ModalGamePop handlerClosePop={this.handlerClosePop.bind(this)} /> : null
        }
        {
          // 分享提醒
          isShare ? <ModalShare handlerShareClose={this.handlerShareClose.bind(this)} /> : null
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    userCookie: state.homeState.userCookie,
    gamerInfo: state.homeState.gamerInfo,
    modal: state.homeState.modal,
    isLoader: state.homeState.isLoader,
    shareNum: state.canvasState.shareNum,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
