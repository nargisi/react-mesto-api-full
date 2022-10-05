import React from 'react';
import LogoMesto from '../images/Logo.svg';

const Logo = (props) => {
  <div classname="logo">
    <div className="logo__container">
      <img className="logo__image" src={LogoMesto} alt="Mesto logo" />
      {props.title && <p className="logo__title">{props.title}</p>}
    </div>
  </div>;
};

export default Logo;
