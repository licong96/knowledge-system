import React from 'react';
import PropTypes from 'prop-types';

/**
 * 免费机会已用完，分享机会还剩余，积分>=600
 * 提醒 - 消耗600积分玩一次
 */

 const HintExpend = props => {
  return (
    <div className="hint-expend">
      <p className="top-text">您当前积分为</p>
      <p className="text-point">{props.currentPoints || '--'}</p>
      <p className="desc">确认使用<span className="bold">600</span>积分再玩一次吗？</p>
      <div className="btn">
        <button className="btn__look" onClick={props.handlerConfirm}></button>
        <button className="btn__again" onClick={props.handlerShare}></button>
      </div>
    </div>
  )
 };

 HintExpend.propTypes = {
  currentPoints: PropTypes.number,
  handlerConfirm: PropTypes.func,
  handlerShare: PropTypes.func,
};
export default HintExpend;
