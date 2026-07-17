import React from 'react';

import './button.css';

export const Button = ({ buttonText, onClick, type = 'button' }) => (
  <button className='custom-button' type={type} onClick={onClick}>
    {buttonText}
  </button>
);