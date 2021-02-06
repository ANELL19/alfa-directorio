import React, {Component}from 'react'
import RegistroClientes from './registrarClientes'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import {NavItem} from 'reactstrap'; 

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
         <MDBNavbar color="default-color" dark expand="md">
          <MDBNavbarBrand>
          <strong className="white-text"> {this.props.data} </strong>
          </MDBNavbarBrand>
          &nbsp;
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              &nbsp;
              <MDBNavItem active>
              <RegistroClientes/>
              </MDBNavItem>
              {/* <MDBNavItem>
                <MDBNavLink to="/registrarClientes">Registrar Clientes</MDBNavLink>
              </MDBNavItem> */}
              &nbsp;
              <MDBNavItem >
                <MDBNavLink to="/loginAdmin">salir</MDBNavLink>
              </MDBNavItem>                        
            </MDBNavbarNav>
             </MDBCollapse>
        </MDBNavbar> 
     </React.Fragment>           
        )
    }
}export default NavbarAdmin;