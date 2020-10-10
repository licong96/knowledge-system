import React, { Component } from 'react';
import './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SendSmsVerificationCode, MGMLandingPage } from '@/stores/actions/info';
import { GetGamerInfo, saveUserCookie, UpdateLoader, UpdateModal, PutTriggerAdd } from '@/stores/actions/home';
import { Prompt } from '@/components';
import { verifyPhone } from '@/utils/verify';
import { setCookie } from '@/utils/cookie';
import { fromwhereMGM } from '@/config/fromwhere';
import { isWeiXin } from '@/utils/index';
import { PointsMallCampaign_Sharing_PY, PointsMallCampaign_Sharing_PYQ } from '@/utils/trackEvent';
import { getEventId, updateEventId } from '@/config/eventId';

const ENV = 'env';

const actionCreators = {
    SendSmsVerificationCode,
    MGMLandingPage,
    GetGamerInfo,
    saveUserCookie,
    UpdateLoader,
    UpdateModal,
    PutTriggerAdd,
};

/**
 * 填写信息
 */
class ModalShare extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cphone: '',
      verifyCode: '',
      age_area: '',
      name: '',
      errorText: '',      // 输入错误提醒
      countText: '发送短信验证码',
      isPrompt: false,   // 提示
      promptText: '',   // 提示文字
    }

    this.time = null;
    this.timePrompt = null;
    this.isOnce = false;
    this.isSubmit = false;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    clearTimeout(this.time);
    clearTimeout(this.timePrompt);
  }

  // 分享朋友
  callbackWxSharePY() {
    let { clientSn, clientSnDEC } = this.props.userCookie;

    this.callbackWxShare();
    PointsMallCampaign_Sharing_PY(clientSn || clientSnDEC);
  }

  // 分享朋友圈
  callbackWxSharePYQ() {
    let { clientSn, clientSnDEC } = this.props.userCookie;
    
    this.callbackWxShare();
    PointsMallCampaign_Sharing_PYQ(clientSn || clientSnDEC);
  }

  // 分享成功回调函数
  callbackWxShare() {
  //   let { UpdateModal, PutTriggerAdd, GetMemberShares } = this.props;
  //   let { clientSn, ticket, clientSnDEC } = this.props.userCookie;

  //   if (!clientSn && !ticket && !clientSnDEC) {
  //     return false
  //   }

  //   // 判断是否超过分享次数
  //   GetMemberShares({
  //     clientSn,
  //     ticket,
  //     clientSnDEC,
  //   }, (res) => {
  //     if (res.num >= 2) {
  //       // 超过分享次数
  //       UpdateModal({
  //         isShareOnline: true,
  //         isShare: false,
  //         isGameOver: false,
  //       })
  //     } else {
  //       // 分享成功
  //       UpdateModal({
  //         isShareSuccess: true,
  //         isShare: false,
  //         isGameOver: false,
  //         typeGameOver: 'over'
  //       });
  //     }
  //   })

  //   // 分享记录
  //   PutTriggerAdd({
  //     clientSn: clientSnDEC ? clientSnDEC : undefined,
  //     clientTicket: clientSn ? `${clientSn}|${ticket}` : '',
  //     eventId: getEventId(),
  //   });
  //   // 更新eventId
  //   updateEventId();
  //   // 更新微信分享地址
  //   wexinShare.call(this);
  //   if (isWeiXin()) {
  //     window.WXReady();
  //   }
  }

  // input 改变
  handlerInputChange(event, types) {
    this.setState({
      [types]: event.target.value
    });
  }

  // input 聚焦
  handlerInputFocus() {
    this.setState({
      errorText: ''
    });
  }

  // 获取验证码
  handlerGetCode() {
    let { cphone } = this.state;

    if (!verifyPhone(cphone)) {
      this.setState({
        errorText: 'error__phone'
      });
      return false;
    }

    if (this.isOnce) {
      return false;
    }
    this.isOnce = true;
    this.countDown();

    // 发送请求
    this.props.SendSmsVerificationCode(`Type=1&token=vipjrmgm&cphone=${cphone}`, (res) => {
      let promptText = '';

      if (res.Success) {
        promptText = '获取验证码成功';
      } else {
        promptText = '获取验证码失败';
      }

      this.setState({
        isPrompt: true,
        promptText
      });
      // 去掉成功提醒
      this.timePrompt = setTimeout(() => {
        this.setState({
          isPrompt: false
        });
      }, 2000);

      // 如果是测试环境，手动添加验证码
      if (ENV === 'dev' || ENV === 'stage') {
        this.setState({
          verifyCode: res.Data.Result,
          errorText: ''
        });
      }
    })
  }

  // 倒计时
  countDown() {
    let _this = this;
    let count = 60;
    let countText = 0;

    clearTimeout(this.time);

    this.time = setTimeout(function repeat() {
      countText = count + '秒后重新发送'
      _this.setState({
        countText
      });

      count--;
      if (count < 0) {
        clearTimeout(_this.time);
        _this.setState({
          countText: '发送短信验证码'
        });
        _this.isOnce = false;
        return false;
      }

      _this.time = setTimeout(repeat, 1000);
    }, 0);
  }

  // submit
  handlerSubmit() {

  }

  render() {
    let { isPrompt, promptText, cphone, verifyCode, name } = this.state;
    
    return (
      <div className={`put-info ${this.state.errorText}`}>
        <div className="input-wrap">
          {/* <input className="input__86 border" value="+86" type="tel"/> */}
          <input 
            className="input__phone border" 
            type="tel" 
            value={cphone || ''}
            placeholder="手机号" 
            onChange={(event) => this.handlerInputChange(event, 'cphone')} 
            onFocus={this.handlerInputFocus.bind(this)}
          />
          <span className="error-text error-phone">请输入正确的手机号</span>
        </div>
        <div className="input-wrap">
          <input 
            className="input__code border" 
            type="tel" 
            value={verifyCode || ''}
            placeholder="验证码"
            onChange={(event) => this.handlerInputChange(event, 'verifyCode')} 
            onFocus={this.handlerInputFocus.bind(this)}
          />
          <span className="error-text error-code">请输入验证码</span>
          <span className="error-text error-code-no">验证码不正确</span>
          <button className="btn_code border" onClick={this.handlerGetCode.bind(this)}>{this.state.countText}</button>
        </div>
        <div className="input-wrap">
          <select 
            className="input__age border"
            onChange={(event) => this.handlerInputChange(event, 'age_area')} 
            onFocus={this.handlerInputFocus.bind(this)}
          >
            <option value="">年龄</option>
            <option value="58">1岁</option>
            <option value="59">2岁</option>
            <option value="60">3岁</option>
            <option value="46">4岁</option>
            <option value="47">5岁</option>
            <option value="48">6岁</option>
            <option value="49">7岁</option>
            <option value="50">8岁</option>
            <option value="51">9岁</option>
            <option value="52">10岁</option>
            <option value="53">11岁</option>
            <option value="54">12岁</option>
            <option value="55">13岁</option>
            <option value="56">14岁</option>
            <option value="57">15岁</option>
            <option value="61">16岁</option>
            <option value="62">17岁</option>
            <option value="63">18岁</option>
            <option value="24">18岁以上</option>
          </select>
          <i className="arrow"></i>
          <span className="error-text error-age">请选择学员年龄</span>
        </div>
        <div className="input-wrap">
          <input 
            className="input__name border" 
            type="text" 
            value={name || ''}
            placeholder="学员姓名（选填）" 
            onChange={(event) => this.handlerInputChange(event, 'name')}
          />
        </div>
        <button className="btn-submit" onClick={this.handlerSubmit.bind(this)}></button>
        {/* 提醒 */}
        <Prompt isShow={isPrompt} text={promptText} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    infoState: state.infoState,
    mgm: state.infoState.mgm,
    code: state.infoState.code,
    localhostSearch: state.homeState.localhostSearch,
    userCookie: state.homeState.userCookie,
    shareNum: state.canvasState.shareNum,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ModalShare);
  