import React from 'react';
import { Input } from 'antd';

const CommonInput = ({ placeholder, suffix, disabled, ...props }) => {
  return (
    <Input
      {...props}
      placeholder={placeholder}
      suffix="MT"
      disabled={disabled}
      className='input-field'
      style={{ borderRadius: '25px' }}
    />
  );
};

export default CommonInput;
