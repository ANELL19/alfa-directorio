import React, {Component}from 'react'
import 'antd/dist/antd.css';
import  './sidenavbar.css';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined,MenuFoldOutlined,DesktopOutlined,DollarOutlined,OrderedListOutlined,
  CloseOutlined,SolutionOutlined } from '@ant-design/icons';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TablaClientes from './tablaClientes'
import TablaEventos from './eventosEvenbrite'
import CargarClientes from './registrarCliente'
import Cotizaciones from './cotizaciones'
import TablaCotizacion from './TablaCotizaciones'
import Cliente from './signupClientes'
import ADS from '../imagen/ADS.png'

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
      tablaCotizaciones:false,
      nuevoCliente:false
    };

    this.cerrar = this.cerrar.bind(this) 
  }
  cerrar(){
    this.props.history.push("/")
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
    this.setState({tablaCotizaciones:false});
    this.setState({nuevoCliente:false});
  }

  generarCotizaciones(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:true});
    this.setState({tablaEventos:false});
    this.setState({registrarClientes:false});
    this.setState({tablaCotizaciones:false});
    this.setState({nuevoCliente:false});
  }

   tablaEventos(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:false});
    this.setState({tablaEventos:true});
    this.setState({registrarClientes:false});
    this.setState({tablaCotizaciones:false});
    this.setState({nuevoCliente:false});
  }

  cargarClientes(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:false});
    this.setState({tablaEventos:false});
    this.setState({registrarClientes:true});
    this.setState({tablaCotizaciones:false});
    this.setState({nuevoCliente:false});
  }

  consultarCotizaciones(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:false});
    this.setState({tablaEventos:false});
    this.setState({registrarClientes:false});
    this.setState({tablaCotizaciones:true});
    this.setState({nuevoCliente:false});   
  }

  registrarCliente(){
    this.setState({tablaInicio:false});
    this.setState({cotizaciones:false});
    this.setState({tablaEventos:false});
    this.setState({registrarClientes:false});
    this.setState({tablaCotizaciones:false});
    this.setState({nuevoCliente:true});    
  }

 

  render() {   
    var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();
if(dd<10) {
  dd='0'+dd;
} 
if(mm<10) {
  mm='0'+mm;
} 
console.log("esto es la fecha", dd,mm,yyyy)


    
    let tabla;
    let eventos;  
    let clientes;
    let cotizaciones;
    let tablaCotizaciones;
    let signupCliente;
   

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
    if(this.state.tablaCotizaciones === true){
      tablaCotizaciones=     
      <div>
        <TablaCotizacion/>
      </div>
 
     }

     if(this.state.nuevoCliente === true){
      signupCliente=
       <div>
         <Cliente/>
       </div>
     }     
    

    let nombre = localStorage.getItem("nombre")
    let apellidos = localStorage.getItem("apellido")
    let empresa = localStorage.getItem("nombre_empresa")
  

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
            {/* <Menu.Item key="2" onClick={e=>this.cargarClientes()}icon={<CloudUploadOutlined style={{ fontSize: '25px', color: '#fff' }} />}>
              Cargar Clientes
            </Menu.Item> */}
            <Menu.Item key="2" onClick={e=>this.registrarCliente()} icon={<SolutionOutlined style={{ fontSize: '25px', color: '#fff' }} />}>           
              Registrar Cliente            
            </Menu.Item>
            <Menu.Item key="3" onClick={e=>this.generarCotizaciones()} icon={<DollarOutlined style={{ fontSize: '25px', color: '#fff' }} /> }>
              Generar Cotizacion
            </Menu.Item>  
            <Menu.Item key="4" onClick={e=>this.consultarCotizaciones()} icon={<FolderOpenIcon style={{ fontSize: '25px', color: '#fff' }} />}>
             Historial de Cotizaciones
            </Menu.Item>          
            <Menu.Item key="5" onClick={e=>this.tablaEventos()} icon={<DesktopOutlined style={{ fontSize: '25px', color: '#fff' }} />}>           
              Eventos Evenbrite              
            </Menu.Item> 
            <Menu.Item key="6" onClick={this.cerrar} icon={<CloseOutlined  style={{ fontSize: '25px', color: '#fff' }} />}>
              cerrar sesión
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >       
          <Header className="site-layout-background" style={{ padding: 0 , color:"#fff"}}>   
          
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,              
            })} 
           <font color="#fff" size="4">{empresa}&nbsp;&nbsp;&nbsp;&nbsp;DIRECTORIO DE CLIENTES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {nombre}&nbsp;{apellidos} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<CalendarTodayIcon style={{ fontSize: '25px', color: '#fff' }}/>}&nbsp;{ dd+"/"+mm+"/"+yyyy} </font>           
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
            {tablaCotizaciones}
            {signupCliente}         
          </Content>
        </Layout>
      </Layout>
    );
  }
} export default SiderDemo;

