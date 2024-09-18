import React from 'react';
import { Layout } from 'antd';
import './header.css';
import { HEADER_TEXT } from '../../constants';


const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <div className="logo">{HEADER_TEXT}</div>
    </Header>
  );
};

export default AppHeader;
