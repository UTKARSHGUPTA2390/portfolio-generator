import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', fullWidth = false, disabled = false, ...props }) => {
  return (
    <button
      {...props}
      type={type}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''} ${disabled ? 'btn-disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >

      <span className="btn-content">{children}</span>
      <div className="btn-flare"></div>
    </button>
  );
};

export default Button;
