import React from 'react';
import PropTypes from 'prop-types';

/**
 * 免费机会和分享机会已用完，积分>=600
 */

 const HintTomorrow = props => {
  return (
    <div className="hint-tomorrow">
      <p className="top-text">您当前积分为</p>
      <p className="text-point">{props.currentPoints || '--'}</p>
      <p className="desc">确认使用<span className="bold">600</span>积分再玩一次吗？</p>
      <div className="btn">
        <button className="btn__left" onClick={props.handlerReturnHome}></button>
        <button className="btn__right" onClick={props.handlerConfirm}></button>
      </div>
    </div>
  )
 };

 HintTomorrow.propTypes = {
  currentPoints: PropTypes.number,
  handlerConfirm: PropTypes.func,
  handlerReturnHome: PropTypes.func,
};
export default HintTomorrow;
