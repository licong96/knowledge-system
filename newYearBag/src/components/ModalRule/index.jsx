import React from 'react';
import PropTypes from 'prop-types';
import './styles';
import Modal from '../Modal';

const imgRule = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/home/rule.png';

/**
 * 模态框 - 游戏规则
 */
const ModalGameOver = props => {
  return (
    <Modal {...props}>
      <img className="rule__img" src={imgRule} onClick={props.handlerHideRule} alt="" />
    </Modal>
  )
};

ModalGameOver.propTypes = {
  handlerHideRule: PropTypes.func,
};

export default ModalGameOver;
