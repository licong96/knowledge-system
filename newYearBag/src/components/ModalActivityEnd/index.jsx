import React from 'react';
import PropTypes from 'prop-types';
import './styles';
import Modal from '../Modal';

/**
 * 模态框 - 活动结束
 */
const ModalActivityEnd = props => {
  return (
    <Modal {...props}>
      <div className="hint-activity-end">
        <p className="text">活动已结束</p>
        <div className="btn">
          <button className="btn__look" onClick={props.handlerCloseEnd}></button>
        </div>
      </div>
    </Modal>
  )
};

ModalActivityEnd.propTypes = {
  handlerCloseEnd: PropTypes.func,
};

export default ModalActivityEnd;
