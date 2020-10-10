import React from 'react';
import './styles';

/**
 * Loader
 */
const Loader = () => {
  return (
    <section className="loader-wrap">
      <div className="loader">
        <div className="loader-inner line-spin-fade-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  )
};

export default Loader;
