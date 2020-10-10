import React from 'react';
import PropTypes from 'prop-types';
import './styles';
import Modal from '../Modal';

let imgText = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/modal/not-text.png';

/**
 * 模态框 - 还没有参数游戏
 */
const ModalGameNot = props => {
  return (
    <Modal {...props}>
      <div className="modal-game-not">
        <img className="not-text" src={imgText} alt=""/>
        <p className="text">参与游戏，留下个人信息，即可查看排行榜<br />快去开始游戏吧！</p>
        <button className="btn__ok" onClick={props.handlerGameNot}></button>
      </div>
    </Modal>
  )
};

ModalGameNot.propTypes = {
  handlerClosePop: PropTypes.func,
};

export default ModalGameNot;
