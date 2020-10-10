import React, { Component } from 'react';
import './styles';
import Modal from '../Modal';
import GameOver from './GameOver';
import HintExpend from './HintExpend';
import HintLack from './HintLack';
import HintSorry from './HintSorry';
import HintTomorrow from './HintTomorrow';
import HintEnd from './HintEnd';
import HintShareOnline from './HintShareOnline';
import HintExpendSuccess from './HintExpendSuccess';

/**
 * 模态框 - 游戏结束
 */
class ModalGameOver extends Component {
  render() {
    let { types } = this.props;

    /**
     * types弹窗类型
     * over: 游戏结束
     * expend: 消耗600积分再玩一次，
     * sorry: 积分不足600
     * lack: 免费机会已用完，分享机会还剩余，积分<600
     * tomorrow: 免费机会和分享机会已用完，积分>=600
     * end: 免费机会和分享机会已用完，积分<600
     * online： 分享积分用完
     * expendSuccess: 已消耗600积分
     */
    const box = () => {
      if (types === 'over') {
        return <GameOver {...this.props} />
      }
      if (types === 'expend') {
        return <HintExpend {...this.props} />
      }
      if (types === 'expendSuccess') {
        return <HintExpendSuccess {...this.props} />
      }
      if (types === 'sorry') {
        return <HintSorry {...this.props} />
      }
      if (types === 'lack') {
        return <HintLack {...this.props} />
      }
      if (types === 'tomorrow') {
        return <HintTomorrow {...this.props} />
      }
      if (types === 'end') {
        return <HintEnd {...this.props} />
      }
      if (types === 'online') {
        return <HintShareOnline {...this.props} />
      }
    }

    return (
      <Modal {...this.props}>
        {box()}
      </Modal>
    );
  }
}

export default ModalGameOver;
