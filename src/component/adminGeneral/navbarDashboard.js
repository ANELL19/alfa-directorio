import React, {Component}from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import {NavItem} from 'reactstrap'; 

class NavbarDashboard extends Component {
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
         <MDBNavbar color="info-color"  dark expand="md">
          <MDBNavbarBrand >
          <strong className="white-text" > {this.props.data} </strong>
          </MDBNavbarBrand>
          &nbsp;
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              &nbsp;
              <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/signupadmin">
                    Registrar empresa
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/companyAdminGral">
                      Mis empresas  
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/loginAdmin">
                      Iniciar sesión  
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/">
                     Salir
                    </MDBNavLink>
                  </MDBNavItem>                              
            </MDBNavbarNav>
             </MDBCollapse>
        </MDBNavbar>
          
        )
    }
}export default NavbarDashboard;

