import React from 'react';
import PropTypes from 'prop-types';
import './styles';
import Modal from '../Modal';

/**
 * 模态框 - 游戏次数上线，明儿再来
 */
const ModalShareOnline = props => {
  return (
    <Modal {...props}>
      <div className="hint-online">
        <p className="text">
          邀请助力次数有限，美好新春祝福无限<br/>明日可继续邀请好友助力哦~
        </p>
        <div className="btn">
          <button className="btn__look" onClick={props.handlerLookSeniority}></button>
        </div>
      </div>
    </Modal>
  )
};

ModalShareOnline.propTypes = {
  handlerLookSeniority: PropTypes.func,
};

export default ModalShareOnline;
