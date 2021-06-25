import React, {Component}from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,MDBFormInline} from "mdbreact";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import ADS from '../imagen/ADS.png'
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { MDBBtn } from "mdbreact";
import ReactDOM from 'react-dom';

class NavbarAdmin extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false 
        }
          }

          toggleCollapse = () => {
            this.setState({ isOpen: !this.state.isOpen });
          }

         
       
    
 render(){  
    // var date= new Date()
    // var fecha = date.toLocaleString('es')     

    var  momentoActual = new Date()
    let horas= momentoActual.getHours()+ ":" + momentoActual.getMinutes()+ ":"+ momentoActual.getSeconds()
    var f = new Date();
    let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()


        return(
          <Router>
          <MDBNavbar color="#b3e5fc light-blue lighten-4" expand="md">
            <MDBNavbarBrand>
              <img  src={ADS} style={{width:"60%", marginTop:"2%", marginLeft:"15%"}}/> 
            </MDBNavbarBrand>            
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                <MDBBtn href="/loginEmpresa" gradient="blue"><MDBIcon icon="home"/>&nbsp;Registrar Empresas</MDBBtn>                   
                </MDBNavItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBNavItem>
                <MDBBtn href="/loginAdministrador" gradient="blue"><MDBIcon icon="address-card"/>&nbsp;Registrar Adminsitrador</MDBBtn>
                </MDBNavItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBNavItem>
                <MDBBtn  href="/" gradient="blue"><MDBIcon icon="laptop"/>&nbsp;Iniciar Sesión</MDBBtn>
                </MDBNavItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBNavItem >
                <MDBBtn gradient="blue" disabled><MDBIcon icon="calendar-alt"/>&nbsp;{fecha}</MDBBtn>                   
                </MDBNavItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBNavItem >
                <MDBBtn gradient="blue" disabled><MDBIcon far icon="clock"/>&nbsp;{horas}</MDBBtn>                   
                </MDBNavItem>
              </MDBNavbarNav>             
            </MDBCollapse>
          </MDBNavbar>
        </Router>           
        )
    }
}export default NavbarAdmin;

