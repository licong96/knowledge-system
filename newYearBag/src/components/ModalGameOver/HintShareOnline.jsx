import React from 'react';
import PropTypes from 'prop-types';

/**
 * 免费机会已用完，分享机会也用完
 */

 const HintShareOnline = props => {
  return (
    <div className="hint-online">
      <p className="text">
        邀请助力次数有限，美好新春祝福无限<br/>明日可继续邀请好友助力哦~
      </p>
      <div className="btn">
        <button className="btn__left" onClick={props.handlerLookSeniority}></button>
      </div>
    </div>
  )
 };

 HintShareOnline.propTypes = {
  handlerLookSeniority: PropTypes.func,
};
export default HintShareOnline;
