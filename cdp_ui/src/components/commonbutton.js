import React from 'react';
import { Button } from 'antd';
import './custombutton.css';

const ActionButton = ({ type, onClick, text }) => {
  return (
    <Button 
      type={type} 
      onClick={onClick} 
      className='action-button'
    >
      {text}
    </Button>
  );
};

export default ActionButton;
