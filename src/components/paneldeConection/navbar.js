import React, {Component}from 'react'
// import RegistrarClientes from './registrarClientes'
// import CargarClientes from './cargarClientes'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBContainer } from "mdbreact";
import {NavItem} from 'reactstrap'; 
import { BrowserRouter as Router } from 'react-router-dom';
import ADS from '../imagen/ADS.png'

import { Layout, Menu, Breadcrumb } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class NavbarAdmin extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false  ,        
           
        }
          }

          toggleCollapse = () => {
            this.setState({ isOpen: !this.state.isOpen });
          }
        

          handleClick = e => {
            console.log('click ', e);
          };
    
 render(){  
    // var date= new Date()
    // var fecha = date.toLocaleString('es')     

    var  momentoActual = new Date()
//     let  hora = momentoActual.getHours()
//    let  minuto = momentoActual.getMinutes()
//    let  segundo = momentoActual.getSeconds()   
    // console.log("esta es la hora ",hora + " : " + minuto + " : " + segundo )
    // console.log("esta es la hora ", momentoActual.getHours()+ " : " + momentoActual.getMinutes()+ " : "+ momentoActual.getSeconds())
    let horas= momentoActual.getHours()+ ":" + momentoActual.getMinutes()+ ":"+ momentoActual.getSeconds()
    var f = new Date();
    // let dia= f.getDate()
    // let mes=f.getMonth()
    // let año= f.getFullYear()
//    console.log("esta es la fecha ",f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
   let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()


        return(
     <React.Fragment>
<Router>
      <MDBNavbar color="#4fc3f7 light-blue lighten-2" dark expand="md">
        <MDBNavbarBrand>
        <a href="/Dashboard"><img src={ADS} style={{width:"66%"}}/></a> 
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem disabled>
              {/* <MDBNavLink  to="#!" disabled ><MDBIcon icon="calendar-alt" />&nbsp;<h5>{fecha}</h5></MDBNavLink> */}
             <p><MDBIcon icon="calendar-alt" size="2x"/>&nbsp;<font  size="4" className="white-text pr-3">{fecha } </font></p>
           
            </MDBNavItem>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MDBNavItem disabled>
              {/* <MDBNavLink  to="#!" disabled> <MDBIcon far  />&nbsp;<h5>{horas}</h5></MDBNavLink> */}
              <p><MDBIcon far icon="clock"  size="2x"/>&nbsp;<font size="4" className="white-text pr-3">{horas}</font></p> 
            </MDBNavItem>
          </MDBNavbarNav>          
        </MDBCollapse>
      </MDBNavbar>
    </Router>
{/* ++++++ */}
<Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>

      
     </React.Fragment>           
        )
    }
}export default NavbarAdmin;