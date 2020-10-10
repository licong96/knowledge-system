import React from 'react';
import PropTypes from 'prop-types';

/**
 * 免费机会已用完，分享机会还剩余，积分<600
 */

 const HintLack = props => {
  return (
    <div className="hint-lack">
      <p className="text">免费游戏机会有限，<br />邀请好友助力再玩一次</p>
      <div className="btn">
        <button className="btn__left" onClick={props.handlerReturnHome}></button>
        <button className="btn__right" onClick={props.handlerShare}></button>
      </div>
    </div>
  )
 };

 HintLack.propTypes = {
  handlerReturnHome: PropTypes.func,
  handlerShare: PropTypes.func,
};
export default HintLack;
