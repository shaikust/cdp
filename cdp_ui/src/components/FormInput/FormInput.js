import React from "react";
import { Form, Input } from "antd";

const FormInput = ({ name, label, rules, placeholder, style, labelStyle, value, onChange }) => (
  <Form.Item 
    name={name} 
    label={<span style={labelStyle}>{label}</span>}  
    rules={rules}
  >
    <Input 
      className={style}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Form.Item>
);

export default FormInput;
