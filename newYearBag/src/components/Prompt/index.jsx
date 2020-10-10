import React from 'react';
import PropTypes from 'prop-types';
import './styles';

/**
 * 提示文字
 */
const Prompt = props => {
  return (
    <div className={`prompt-wrap ${props.isShow ? 'show': ''}`}>
      <p className="prompt__text">{props.text}</p>
    </div>
  )
};

Prompt.propTypes = {
  isShow: PropTypes.bool,
  text: PropTypes.string,
};

export default Prompt;
