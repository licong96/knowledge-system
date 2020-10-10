import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles';
import PutInfo from './PutInfo';

let imgLogo = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/vipJr-logo.png';
let imgText = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/info/text.png';

const actionCreators = {
};

class Home extends Component {
  render() {
    return (
      <div className="info-page">
        <img className="logo" src={imgLogo} alt=""/>
        <img className="text" src={imgText} alt=""/>
        <p className="text-sm">还可免费领取价值298元1对1外教体验课</p>
        <PutInfo {...this.props}  />
      </div>
    );
  }
}

export default connect(
  (state) => ({
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
