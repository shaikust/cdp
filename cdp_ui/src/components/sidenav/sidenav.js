import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './sidenav.css';

const SideNav = () => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} className="side-nav-menu">
      <Menu.Item key="1">
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/reporting">Reporting</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/goals">Goals</Link>
      </Menu.Item>
    </Menu>
  );
};

export default SideNav;
