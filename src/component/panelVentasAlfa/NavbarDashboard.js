import React, {Component}from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

import {NavItem} from 'reactstrap'; 

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            modal:false,
        }
          }
    
 render(){
        return(
            <MDBNavbar color="default-color" dark expand="md">
              <MDBNavbarBrand>

              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
               
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/signupAdminG">
                    Registrar administrador
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#">
                      Mis administradores 
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/loginAlfa">
                     Salir
                    </MDBNavLink>
                  </MDBNavItem>
                  
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
        )
    }
}

export default Navbar;