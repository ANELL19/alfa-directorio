import React, {Component}from 'react'
import './styleNavbar.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {  MDBIcon} from "mdbreact";
  
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
 UsergroupAddOutlined 
} from '@ant-design/icons';
// import LoginEmpresa  from '../empresas/loginEmpresa'
// import LoginAdminsitrador from '../administrador/loginadministrador'
// import LoginADS from '../administradorAlfa/login'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class NavbarAdmin extends Component {
    constructor(props){
        super(props)
        this.state = {
          collapsed: false,
          registraEmpresa:true,
          registrarCliente:false,
          iniciarSesion:false
        }
          }

          onCollapse = collapsed => {
            console.log(collapsed);
            this.setState({ collapsed });
          };
    
          // registraEmpresa(){
          //   this.setState({registraEmpresa:true});
          //   this.setState({registrarCliente:false});
          //   this.setState({iniciarSesion:false});
          // }
          // registrarCliente(){
          //   this.setState({registraEmpresa:false});
          //   this.setState({registrarCliente:true});
          //   this.setState({iniciarSesion:false});
    
          // }
          // iniciarSesion(){
          //   this.setState({registraEmpresa:false});
          //   this.setState({registrarCliente:false});
          //   this.setState({iniciarSesion:true});
          // }
 render(){  
          var  momentoActual = new Date()
          let horas= momentoActual.getHours()+ ":" + momentoActual.getMinutes()+ ":"+ momentoActual.getSeconds()
          var f = new Date();
          let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()

        // let signUpEmpresa;
        // let signUpCliente;
        // let loginADS;

        // if(this.state.registraEmpresa === true){
        //   signUpEmpresa=
        //   <div>
        //   <LoginEmpresa/>
        //   </div>
        // }

        // if(this.state.registrarCliente === true){
        //   signUpCliente=
        //   <div>
        //   <LoginAdminsitrador/>
        //   </div>
        // }
          
        // if(this.state.iniciarSesion === true){
        //   loginADS=
        //   <div>
        //   <LoginADS/>
        //   </div>
        // }

          const { collapsed } = this.state;
        return(
          <Layout style={{ minHeight: '100vh' }}>
          <Sider className="sidevar" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo1" > aqui va la fecha 17/06/2021 </div>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" href="/loginEmpresa" icon={<PieChartOutlined />}>
                Registrar Empresa
              </Menu.Item>
              <Menu.Item key="2" href="/loginAdministrador" icon={<UsergroupAddOutlined />}>
                Registrar Adminsitrador
              </Menu.Item>
              <Menu.Item key="3" href="/" icon={<DesktopOutlined />}>
                Iniciar sesión
              </Menu.Item>                
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background1" style={{ padding: 0 }} >                
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MDBIcon icon="calendar-alt" size="2x"/>&nbsp;<font  size="4" className="white-text pr-3">{fecha }</font> 
              <MDBIcon far icon="clock"  size="2x"/>&nbsp;<font size="4" className="white-text pr-3">{horas}</font>
            </p> 
            </Header>
            <Content>               
              <div className="site-layout-background2" style={{padding:15,minHeight:250,marginTop:"1%" }}>
                {/* {signUpEmpresa}
                {signUpCliente}
                {loginADS} */}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>ALFA DISEÑO DE SISTEMAS S.A DE C.V.</Footer>
          </Layout>
        </Layout>          
        )
    }
}export default NavbarAdmin;