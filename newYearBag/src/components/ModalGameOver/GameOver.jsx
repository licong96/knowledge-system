import React from 'react';
import PropTypes from 'prop-types';

/**
 * 模态框 - 游戏结束
 */
 const GameOver = props => {
  return (
    <div className="game-over">
      <p className="text">本次获得：<span className="bold">{props.total}个福袋</span></p>
      <p className="text">累积获得：<span className="bold">{props.qty}个福袋</span></p>
      <p className="desc">接新年福袋心想事成，抢免费好礼喜气洋洋</p>
      <div className="btn">
        {/* <button className="btn__look" onClick={props.handlerLookSeniority}></button> */}
        <button className="btn__again" onClick={props.handlerPlayAgain}></button>
      </div>
    </div>
  )
};

GameOver.propTypes = {
  total: PropTypes.number,
  handlerLookSeniority: PropTypes.func,
  handlerPlayAgain: PropTypes.func,
};

export default GameOver;
