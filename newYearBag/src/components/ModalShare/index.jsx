import React from 'react';
import PropTypes from 'prop-types';
import './styles';
/**
 * 模态框 - 分享提醒
 */
const ModalShare = props => {
  return (
    <div className="modal-share" onClick={props.handlerShareClose}>
      <div className="modal__box">
        <p className="text">点此分享游戏至朋友圈，邀请亲友一起<br />迎春接福，</p>
        <p className="text text--red">即可免费参与1次游戏，</p>
        <p className="text">每日仅限2次邀请哦!</p>
      </div>
    </div>
  )
};

ModalShare.propTypes = {
  handlerShareClose: PropTypes.func,
};

export default ModalShare;
