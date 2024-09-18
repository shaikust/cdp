import React from 'react';
import { Button } from 'antd';
import './custombutton.css'; // Import the CSS file for styling

const ButtonGroup = ({ buttons }) => {
  return (
    <div className="footer-buttons-container">
      {buttons.map((button, index) => (
        <Button
          key={index}
          className="footer-button"
          onClick={button.onClick}
          style={button.style}
          data-testid={button['data-testid']} 
          disabled={button.disabled}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
