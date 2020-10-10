import React from 'react';
import PropTypes from 'prop-types';

/**
 * 提醒 - 消耗600积分玩一次
 */

 const HintExpend = props => {
  return (
    <div className="hint-sorry">
      <p className="top-text">sorry，您当前积分不足600</p>
      <div className="btn">
        <button className="btn__look" onClick={props.handlerReturnHome}></button>
        <button className="btn__again" onClick={props.handlerShare}></button>
      </div>
    </div>
  )
 };

HintExpend.propTypes = {
  handlerReturnHome: PropTypes.func,
  handlerShare: PropTypes.func,
};
export default HintExpend;
