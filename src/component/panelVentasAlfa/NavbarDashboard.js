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
          <React.Fragment>
            <MDBNavbar color="info-color" >
              <MDBNavbarBrand>

              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
               
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink  to="/signupAdminG">  Registrar Administradores </MDBNavLink>
                  </MDBNavItem>                 
                  <MDBNavItem>
                    <MDBNavLink  to="/loginAlfa">
                     Salir
                    </MDBNavLink>
                  </MDBNavItem>
                  
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            </React.Fragment>
        )
    }
}

export default Navbar;