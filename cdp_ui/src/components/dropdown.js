import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const CommonDropdown = ({ items, buttonText, onClick, icon }) => {
  const menu = (
    <Menu onClick={onClick}>
      {items.map(item => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button style={{ borderRadius: '25px' }}>
        {buttonText} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default CommonDropdown;
