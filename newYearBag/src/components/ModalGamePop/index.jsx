import React from 'react';
import PropTypes from 'prop-types';
import './styles';
import Modal from '../Modal';

/**
 * 模态框 - 游戏次数上线，明儿再来
 */
const ModalGamePop = props => {
  return (
    <Modal {...props}>
      <div className="modal-game-pop">
        <p className="text">
          游戏机会有限<br/>
          美好新春祝福无限<br/>
          明天还有免费游戏机会等着你
        </p>
        <div className="btn">
          <button className="btn__left" onClick={props.handlerLookSeniority}></button>
          <button className="btn__right" onClick={props.handlerClosePop}></button>
        </div>
      </div>
    </Modal>
  )
};

ModalGamePop.propTypes = {
  handlerLookSeniority: PropTypes.func,
  handlerClosePop: PropTypes.func,
};

export default ModalGamePop;
