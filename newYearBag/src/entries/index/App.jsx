import React, { Component } from 'react';
import './app.scss';
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUserCookie, saveLocalhostSearch, GetGamerInfo, GetServerTime, GameEffectiveDate, UpdateLoader } from '@/stores/actions/home';

import Basic from '@/containers/Basic';
import Home from '@/containers/Home';
import Canvas from '@/containers/Canvas';
import Seniority from '@/containers/Seniority';
import Info from '@/containers/Info';

const actionCreators = {
  saveUserCookie,
  saveLocalhostSearch,
  GetGamerInfo,
  UpdateLoader,
  GetServerTime,
  GameEffectiveDate,
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          {/* basic是基本组件，都会匹配它 */}
          <Route path="/" component={Basic} />
          <Route path="/home" component={Home} />
          <Route path="/canvas" component={Canvas} />
          <Route path="/seniority" component={Seniority} />
          <Route path="/info" component={Info} />
        </div>
      </Router>
    );
  }
}

export default connect(
  (state) => ({
    userCookie: state.homeState.userCookie,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(App);
