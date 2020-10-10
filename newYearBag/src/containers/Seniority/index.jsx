import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetRankList, GetMemberRank } from '@/stores/actions/seniority';
import { UpdateLoader, UpdateModal, PutTriggerAdd } from '@/stores/actions/home';
import { recordIsSeniorEnter } from '@/stores/actions/canvas';
import './styles';
import Ranking from './Ranking';
import Award from './Award';
import { PointsMallCampaign_RankingList_UV, PointsMallCampaign_RankingList_PV } from '@/utils/trackEvent';
import { getEventId } from '@/config/eventId';

const actionCreators = {
  GetRankList,
  UpdateLoader,
  GetMemberRank,
  recordIsSeniorEnter,
  UpdateModal,
  PutTriggerAdd,
};

/**
 * 排行榜及奖品
 */

class Seniority extends Component {

  componentDidMount() {
    this.getRankData();
  }

  // 获取用户分数和所有排名
  getRankData() {
    let { clientSn, ticket, clientSnDEC } = this.props.userCookie;
    let { GetMemberRank, GetRankList } = this.props;

    if (!this.props.listData.activityList) {
      this.props.UpdateLoader(true);  // 加载中
    }

    // 用户数据
    GetMemberRank({
      clientSn,
      ticket,
      clientSnDEC,
    });

    // 列表数据
    GetRankList({
      clientSn,
      ticket,
      clientSnDEC,
    }, () => {
      if (this.props.isLoader) {
        this.props.UpdateLoader(false);
      }
    }, () => {
      if (this.props.isLoader) {
        this.props.UpdateLoader(false);
      }
    });

    // 数据埋点
    PointsMallCampaign_RankingList_UV(clientSn || clientSnDEC);
    PointsMallCampaign_RankingList_PV();
  }
  

  // start game
  handlerStartGame() {
    const { currentTime, endTime } = this.props.dateTime;

    if (currentTime > endTime) {
      return false;
    }
    // 记录是否从排行榜页点击再玩一次按钮
    this.props.recordIsSeniorEnter(true);

    this.props.history.push({
      pathname: '/canvas',
      search: this.props.location.search
    });
  }

  // return home
  handlerReturnHome() {
    this.props.history.push({
      pathname: '/',
      search: this.props.location.search
    });
  }

  // 点击分享
  handlerShare() {
    let { clientSn, ticket, clientSnDEC } = this.props.userCookie;

    this.props.UpdateModal({
      isShare: true
    });
    // 分享记录
    this.props.PutTriggerAdd({
      clientSn: clientSnDEC ? clientSnDEC : undefined,
      clientTicket: clientSn ? `${clientSn}|${ticket}` : '',
      eventId: getEventId(),
    });
  }

  render() {
    const { currentTime, endTime } = this.props.dateTime;
    let listData = this.props.listData;
    let userData = this.props.userData;
    let isActivityEnd = currentTime > endTime ? true : false;

    return (
      <div className="seniority">
        <div className="bg">
          <Ranking 
            listData={listData} 
            userData={userData} 
            isActivityEnd={isActivityEnd} 
            handlerStartGame={this.handlerStartGame.bind(this)} 
            handlerShare={this.handlerShare.bind(this)} 
          />
          <Award handlerReturnHome={this.handlerReturnHome.bind(this)} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    userCookie: state.homeState.userCookie,
    listData: state.seniorityState.listData,
    userData: state.seniorityState.userData,
    isLoader: state.homeState.isLoader,
    dateTime: state.homeState.dateTime,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Seniority);
