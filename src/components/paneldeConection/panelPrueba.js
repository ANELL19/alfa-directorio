import React, {Component}from 'react'
import './stylePanel.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
 UsergroupAddOutlined 
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class prueba extends Component{
    constructor(props){
        super(props)
        this.state = {      
            collapsed: false,
        };
      
      }


    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    
    render(){
        const { collapsed } = this.state;
        return(
            
          
            <Layout style={{ minHeight: '100vh' }}>
            <Sider className="sidevar" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" > aqui va la fecha 17/06/2021 </div>
              <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Registrar Empresa
                </Menu.Item>
                <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
                  Registrar Adminsitrador
                </Menu.Item>
                <Menu.Item key="3" icon={<DesktopOutlined />}>
                  Iniciar sesión
                </Menu.Item>                
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background1" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, marginTop:100 }}>
                  Bill is a cat.
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>ALFA DISEÑO DE SISTEMAS S.A DE C.V.</Footer>
            </Layout>
          </Layout>
        )
    }
}export default prueba;

