import React, {Component}from 'react'
import RegistroClientes from '../../clientes/RegistrarClientes/registrarClientes'
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
        console.log("props" , this.props.data)
        return(
            <MDBNavbar color="default-color" dark expand="md">
              <MDBNavbarBrand>
                <strong className="white-text"> {this.props.data} </strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav >                  
                  <NavItem>
              <RegistroClientes/>
            </NavItem> 
                </MDBNavbarNav>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon fab icon="twitter" />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon fab icon="google-plus-g" />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem  href="/">Salir</MDBDropdownItem>                        
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
        )
    }
}

export default Navbar;