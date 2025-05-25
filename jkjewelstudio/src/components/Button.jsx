import React from 'react';
import Fadein from "./FadeIn";

const Button = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  isSubmitting = false,
}) => {
  let buttonClass = 'button-primary'; // default

  if (variant === 'outline') {
    buttonClass = 'button-outline';
  } else if (variant === 'secondary') {
    buttonClass = 'button-secondary';
  }

  return (
    <button
      className={`button ${buttonClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Fadein>
        {isSubmitting ? (
          <>
            <span className="loading-spinner" style={{marginRight: 8}}></span>
            Placing Order...
          </>
        ) : (
          text
        )}
      </Fadein>
    </button>
  );
};

export default Button;
