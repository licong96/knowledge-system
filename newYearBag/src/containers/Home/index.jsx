import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UpdateModal, UpdateJoinType, MemberShareNote, PutTriggerAdd } from '@/stores/actions/home';
import './styles';
import { ModalRule, ModalGamePop, ModalActivityEnd } from '@/components';

let imgMain = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/home/main.png';
let imgLittleCow = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/home/little-cow.png';

const actionCreators = {
  UpdateModal,
  UpdateJoinType,
  MemberShareNote,
  PutTriggerAdd,
};

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRule: false,
      isGamePop: false,
      isActivityEnd: false,
    }
  }

  componentDidMount() {
  }

  // start game
  handlerStartGame() {
    this.props.UpdateJoinType(1);
    this.props.history.push({
      pathname: '/canvas',
    });
  }

  // show rule
  handlerShowRule() {
    this.setState({
      isRule: true
    })
  }
  
  // hide rule
  handlerHideRule() {
    this.setState({
      isRule: false
    })
  }

  // open seniority
  handlerOpenSeniority() {
    // let { currentTime, endTime } = this.props.dateTime;

    // // 判断活动是否已结束
    // if ((!this.props.userCookie.clientSn && !this.props.userCookie.clientSnDEC) && currentTime > endTime) {
    //   this.setState({
    //     isActivityEnd: true
    //   })
    //   return false;
    // }

    // if (!this.props.userCookie.clientSn && !this.props.userCookie.clientSnDEC) {
    //   this.props.UpdateModal({
    //     isGameNot: true
    //   });
    //   return false;
    // }

    // this.props.history.push({
    //   pathname: '/seniority',
    //   search: this.props.location.search
    // })
  }

  // 还没有参与游戏
  handlerGameNot() {
    this.props.UpdateModal({
      isGameNot: false
    });
    this.props.history.push({
      pathname: '/info',
      search: this.props.location.search
    });
  }
  
  // 关闭游戏次数上线，明儿再来弹窗
  handlerClosePop() {
    this.setState({
      isGamePop: false
    })
  }

  // 查看排行榜
  handlerLookSeniority() {
    this.props.history.push({
      pathname: '/seniority',
      search: this.props.location.search
    });
    this.handlerClosePop();
  }

  // 关闭活动结束弹窗
  handlerCloseEnd() {
    this.setState({
      isActivityEnd: false
    })
  }

  render() {
    const { currentTime, endTime } = this.props.dateTime;

    return (
      <div className="home">
        <div className="top">
          <button className="btn btn-rule" onClick={this.handlerShowRule.bind(this)}></button>
          <span className="logo"></span>
          <button className="btn btn-among" onClick={this.handlerOpenSeniority.bind(this)}></button>
        </div>
        <img className="main-text" src={imgMain} alt=""/>
        <img className="little-cow" src={imgLittleCow} alt=""/>
        <div className={`btn-wrap ${currentTime > endTime ? 'over' : ''}`}>
          <button className="btn-start" onClick={() => this.handlerStartGame()}></button>
          <button className="btn-over"></button>
        </div>
        {
          currentTime > endTime ? null : <p className="foot-text">点击开始游戏，打开音乐更有节日气氛哦！</p>
        }
        {
          // 游戏规则
          this.state.isRule ? <ModalRule handlerHideRule={this.handlerHideRule.bind(this)} /> : null
        }
        {
          // 游戏资格用完
          this.state.isGamePop ? <ModalGamePop handlerLookSeniority={this.handlerLookSeniority.bind(this)} handlerClosePop={this.handlerClosePop.bind(this)} /> : null
        }
        {
          // 活动结束
          this.state.isActivityEnd ? <ModalActivityEnd handlerCloseEnd={this.handlerCloseEnd.bind(this)} /> : null
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
    shareNum: state.canvasState.shareNum,
    dateTime: state.homeState.dateTime,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
