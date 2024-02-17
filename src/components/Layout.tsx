import React from 'react';
import { DashboardOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
// import { VuiButtonTertiary, VuiFlexItem, VuiText } from '../ui';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from './Header';
// import { useAuthenticationContext } from '../contexts/AuthenticationContext';
// import {Link} from "react-router-dom";
const {  Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const items2: MenuProps['items'] = [
    {
        key: '/dashboard',
        label: `Dashboard`,
        icon: <DashboardOutlined/>,
    },

    {
      key: '/users',
      label: `All Users`,
      icon: <UserOutlined/>,
    }, {
      key: '/usersHistory',
      label: `Users History`,
      icon: <HistoryOutlined />
    }];

const AdminLayout = ({children} : any) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  const {pathname} = useLocation();

  const navigate = useNavigate();
  // const { isAuthEnabled, logOut, user } = useAuthenticationContext();

  return (
    <Layout>
      <AdminHeader />
      {/* <Header style={{ padding: "0 30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' , background: colorBgContainer ,}}>
        
        <div style={{display: 'flex', alignItems: 'end'}}>
        <img
                  src={"images/casescribe.png"}
                  alt={"VA Research Bot logo"}
                  height={"20"}
                  style={{ marginTop: "1px", }}
                />
                 <h1 style={{marginLeft: '20px', fontWeight: 'bold'}}>VA Research Bot App</h1>

        </div>

            <div style={{display: 'flex'}}>
                

            {isAuthEnabled && (
              <>
                <VuiFlexItem grow={false}>
                  <VuiText size="s">
                    <p style={{marginTop: '1.25rem' , marginRight: '10px'}}>Logged in as {user?.email}</p>
                  </VuiText>
                </VuiFlexItem>

                <Link to={'/search'}><Button type="primary" ghost>Try Search</Button></Link>
                <VuiFlexItem>
                  <VuiButtonTertiary  className='btn_margin'  color="neutral" size="m" onClick={() => {
                    logOut();
                    navigate('/signin')
                  }}>
                    Log out
                  </VuiButtonTertiary>
                </VuiFlexItem>
              </>
            )}
            </div>
      </Header> */}
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={({ key }) => {
              navigate(key);
            }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;