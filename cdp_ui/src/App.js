import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppHeader from './components/header/header';
import SideNav from './components/sidenav/sidenav';
import Dashboard from './pages/dashboard/dashboard';
import Reporting from './pages/reporting/reporting';
import Goals from './pages/goals/goals';
import store from './redux/store'
import { Provider } from 'react-redux'


const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <AppHeader />
        <Layout>
          <Layout.Sider>
            <SideNav />
          </Layout.Sider>
          <Layout style={{ overflow: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </Router>
    </Provider>
  );
};

export default App;
