import React from 'react';
import Fadein from "./FadeIn";


const Button = ({ text, onClick, variant = 'primary' }) => {
  let buttonClass = 'button-primary'; // default

  if (variant === 'outline') {
    buttonClass = 'button-outline';
  } else if (variant === 'secondary') {
    buttonClass = 'button-secondary';
  }

  return (
    <button className={`button ${buttonClass}`} onClick={onClick}>
      <Fadein>{text}</Fadein>
    </button>
  );
};

export default Button;
