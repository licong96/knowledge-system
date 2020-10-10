import React from 'react';
import PropTypes from 'prop-types';
import './styles';

/**
 * 模态框 - 高阶组件
 */

const Modal = props => {
  let { children } = props;

  return (
    <div className="modal">
      <div className="modal__animation">
        <div className="modal__box">
          {children}
        </div>
      </div>
    </div>
  )
};

Modal.propTypes = {
  children: PropTypes.element
}

export default Modal;
