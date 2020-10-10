import React from 'react';
import PropTypes from 'prop-types';

/**
 * 提醒 - 已消耗600积分，
 */

 const HintExpendSuccess = props => {
  return (
    <div className="hint-expend-success">
      <p className="top-text">已消耗600积分，<br />马上开玩吧！</p>
      <div className="btn">
        <button className="btn__ok" onClick={props.handlerExpendSuccess}></button>
      </div>
    </div>
  )
 };

HintExpendSuccess.propTypes = {
  handlerExpendSuccess: PropTypes.func,
};
export default HintExpendSuccess;
