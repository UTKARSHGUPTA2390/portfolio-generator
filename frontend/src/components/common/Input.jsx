import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, name, error }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${error ? 'input-error' : ''}`}
        />
        <div className="input-glow"></div>
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
