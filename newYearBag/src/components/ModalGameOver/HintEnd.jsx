import React from 'react';
import PropTypes from 'prop-types';

/**
 * 免费机会已用完，分享机会还剩余，积分<600
 */

 const HintEnd = props => {
  return (
    <div className="hint-end">
      <p className="text">
        游戏机会有限<br/>
        美好新春祝福无限<br/>
        明天还有免费游戏机会等着你
      </p>
      <div className="btn">
        <button className="btn__left" onClick={props.handlerLookSeniority}></button>
        <button className="btn__right" onClick={props.handlerReturnHome}></button>
      </div>
    </div>
  )
 };

 HintEnd.propTypes = {
  currentPoints: PropTypes.number,
  handlerConfirm: PropTypes.func,
  handlerShare: PropTypes.func,
};
export default HintEnd;
