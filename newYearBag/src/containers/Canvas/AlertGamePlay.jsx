import React from 'react';
import PropTypes from 'prop-types';

/**
 * 游戏开始玩法提醒
 */
const ModalGameOver = props => {
  return (
    <div className="alert-game-play">
      <p className="text">
        通过左右移动Oxford小牛
        <br />
        接收不同游戏道具获得福袋
      </p>
      <button className="btn-ok" onClick={props.handlerGamePlay}></button>
    </div>
  )
};

ModalGameOver.propTypes = {
  handlerGamePlay: PropTypes.func,
};

export default ModalGameOver;
