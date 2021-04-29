import React, {Component}from 'react'
import RegistroClientes from './registrarClientes'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn } from "mdbreact";
import {NavItem} from 'reactstrap'; 
import ADS from '../imagen/ADS.png'

class NavbarAdmin extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            modal:false,
        }
          }
    
 render(){
        console.log("props" , this.props.data)
        return(
     <React.Fragment>
         <MDBNavbar color="info-color" dark expand="md">
         <a href="/dasboardAdmin"><img src={ADS} style={{width:"66%"}}/></a>
          <MDBNavbarBrand>        
          <strong className="white-text"> {this.props.data} </strong>
          </MDBNavbarBrand>
          &nbsp;
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav justify>
              &nbsp;
              <MDBNavItem active>
              <RegistroClientes/>
              </MDBNavItem>
              {/* <MDBNavItem>
                <MDBNavLink to="/registrarClientes">Registrar Clientes</MDBNavLink>
              </MDBNavItem> */}
              &nbsp;
              <MDBNavItem >
              
                <MDBBtn color="info" href="/loginAdmin" > <MDBIcon icon="door-open" size="lg" /> Salir</MDBBtn>
              </MDBNavItem>                        
            </MDBNavbarNav>
             </MDBCollapse>
        </MDBNavbar> 
     </React.Fragment>           
        )
    }
}export default NavbarAdmin;