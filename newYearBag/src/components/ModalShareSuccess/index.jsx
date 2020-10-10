import React from 'react';
import PropTypes from 'prop-types';
import './styles';
import Modal from '../Modal';

let imgText = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/modal/share-text.png';

/**
 * 模态框 - 分享成功
 */
const ModalShareSuccess = props => {
  return (
    <Modal {...props}>
      <div className="modal-share-success">
        <img className="not-text" src={imgText} alt=""/>
        <p className="text">今日邀请好友免费玩（{props.shareNum + 1}/2）</p>
        <button className="btn__ok" onClick={props.handlerShareSuccess}></button>
      </div>
    </Modal>
  )
};

ModalShareSuccess.propTypes = {
  shareNum: PropTypes.number,
  handlerShareSuccess: PropTypes.func,
};

export default ModalShareSuccess;
