

import { Layout, Button, theme } from 'antd';
import { VuiButtonTertiary, VuiFlexItem, VuiText } from '../ui';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useAuthenticationContext } from '../contexts/AuthenticationContext';
import { useConfigContext } from '../contexts/ConfigurationContext';
const { Header } = Layout;

const AdminHeader = () => {
    const { isAuthEnabled, logOut, user, loggedOutInformation } = useAuthenticationContext();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    const {admins} = useConfigContext();
    const isAdmin = admins?.includes(user?.email || ''); 
    
    const {pathname} = useLocation()
    
    const buttonTitle = pathname === '/search' ? {key: '/dashboard' , value: 'Dashboard'} : {key: '/search', value: 'Try Search'};

    return (
        <Header style={{ padding: "0 30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' , background: colorBgContainer ,
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
            
            <div style={{display: 'flex', alignItems: 'end'}}>
            <img
                    src={"images/casescribe.png"}
                    alt={"VA Research Bot logo"}
                    height={"20"}
                    style={{ marginTop: "1px", }}
                    />
                    <h1 style={{marginLeft: '20px', fontWeight: 'bold'}}>VA Research Bot App</h1>

            </div>

                <div style={{display: 'flex' , alignItems: 'baseline'}}>
                    

                {isAuthEnabled && (
                <>
                    <VuiFlexItem grow={false}>
                    <VuiText size="s">
                        <p style={{marginTop: '1.25rem' , marginRight: '10px'}}>Logged in as {user?.email}</p>
                    </VuiText>
                    </VuiFlexItem>

                {isAdmin && (
                    <Link to={buttonTitle.key}><Button type="primary" ghost>{buttonTitle.value}</Button></Link>
                )}
                    <VuiFlexItem>
                    <VuiButtonTertiary  className='btn_margin'  color="neutral" size="m" onClick={() => {
                        loggedOutInformation(localStorage.getItem("AuthToken"))
                        logOut();
                        navigate('/signin')
                    }}>
                        Log out
                    </VuiButtonTertiary>
                    </VuiFlexItem>
                </>
                )}
                </div>
        </Header>
      )
}

export default AdminHeader;