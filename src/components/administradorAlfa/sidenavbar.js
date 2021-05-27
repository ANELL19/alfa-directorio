import React, {Component}from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import  './sidenavbar.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  UsergroupAddOutlined,
  DesktopOutlined,
  DollarOutlined,
  OrderedListOutlined 
} from '@ant-design/icons';
import TablaClientes from './tablaClientes'
import TablaEventos from './eventosEvenbrite'
import CargarClientes from './registrarCliente'
import Cotizaciones from './cotizaciones'
import ADS from '../imagen/ADS.png'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
       MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol , MDBContainer,MDBRow} from 'mdbreact'
import { Button,Table, ModalBody,} from 'reactstrap';
import {API} from '../Graphql/Graphql'
import axios from 'axios'

const { Header, Sider, Content } = Layout;

class SiderDemo extends Component {
  constructor(props){
    super(props)
    this.state = {      
      collapsed: false, 
      tablaInicio:true,      
      tablaEventos:false,
      registrarClientes:false,      
      cotizaciones:false,
    };
  }
 
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  tablaInicio(){
    this.setState({tablaInicio:true});
    this.setState({cotizaciones:false});
    this.setState({tablaEventos:false});
    this.setState({registrarClientes:false});

  }

  generarCotizaciones(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:true});
    this.setState({tablaEventos:false});
    this.setState({registrarClientes:false});

  }

   tablaEventos(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:false});
    this.setState({tablaEventos:true});
    this.setState({registrarClientes:false});

  }
  cargarClientes(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:false});
    this.setState({tablaEventos:false});
    this.setState({registrarClientes:true});

  }

  render() {    
    let tabla;
    let eventos;  
    let clientes;
    let cotizaciones;

    if(this.state.tablaInicio === true) {  
      tabla=
      <div>
        <TablaClientes/>
      </div>
    }
       
    if(this.state.tablaEventos === true){ 
      eventos=  
      <div>
        <TablaEventos/>
      </div>
    }

    if(this.state.registrarClientes === true){
    clientes=
    <div>
      <CargarClientes/>
    </div>
    }
     
     if(this.state.cotizaciones === true){
     cotizaciones=     
     <div>
       <Cotizaciones/>
     </div>

    }

    return (
      <Layout>     
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>      
          <div className="logo" >
            <img href="/dashboard" src={ADS} style={{width:"60%", marginTop:"2%", marginLeft:"15%"}}/> 
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={e=>this.tablaInicio()} icon={<OrderedListOutlined style={{ fontSize: '25px', color: '#fff' }}/>}>
              Tabla Clientes              
            </Menu.Item>
            <Menu.Item key="2" onClick={e=>this.cargarClientes()}icon={<CloudUploadOutlined style={{ fontSize: '25px', color: '#fff' }} />}>
              Registrar Clientes
            </Menu.Item>          
            <Menu.Item key="3" onClick={e=>this.tablaEventos()} icon={<DesktopOutlined style={{ fontSize: '25px', color: '#fff' }} />}>           
              Eventos Evenbrite              
            </Menu.Item>            
            <Menu.Item key="4" onClick={e=>this.generarCotizaciones()} icon={<DollarOutlined style={{ fontSize: '25px', color: '#fff' }} /> }>
              Generar Cotizacion
            </Menu.Item>
            <Menu.Item key="6" icon={<CloudUploadOutlined style={{ fontSize: '25px', color: '#fff' }} /> }>
              nav 6
            </Menu.Item>
            <Menu.Item key="7" icon={<CloudUploadOutlined style={{ fontSize: '25px', color: '#fff' }} /> }>
              nav 7
            </Menu.Item>
            <Menu.Item key="8" icon={<UsergroupAddOutlined style={{ fontSize: '25px', color: '#fff' }} />}>
              nav 8
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >       
          <Header className="site-layout-background" style={{ padding: 0 , color:"#fff"}}>   
          
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,              
            })} 
           <font color="#fff" size="4">DIRECTORIO DE CLIENTES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>lizbeth cuevas anell</i>  </font > 
          </Header>
          <Content
            // className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {tabla}
            {eventos}
            {clientes}
            {cotizaciones}
          </Content>
        </Layout>
      </Layout>
    );
  }
} export default SiderDemo;

