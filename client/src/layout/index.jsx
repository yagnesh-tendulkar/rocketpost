import React from 'react';

import { Breadcrumb, Layout, theme } from 'antd';
import AppHeader from './header/Header';
import AppSidebar from './sidebar/Sidebar';
import AppFooter from './footer/Footer';
const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='!h-full'>
      <AppHeader />
      <Layout>
        <AppSidebar />
        <Layout
          style={{
            padding: '0 4px 4px',
          }}
        >

          <Content
            style={{
              padding: 4,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
          {/* <AppFooter/> */}
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AppLayout;