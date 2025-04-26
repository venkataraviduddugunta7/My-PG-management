import { Layout, theme } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar/sidebar';
import './assets/scss/main.scss';

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      {/* Sidebar - width controlled here */}
      <Layout.Sider
        width={240}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar collapsed={collapsed} />
      </Layout.Sider>
      
      {/* Main content - offset by sidebar width */}
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 240,
        transition: 'margin-left 0.2s',
      }}>
        <Content
          style={{
            margin: '0px 0px 0px 8px ',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;