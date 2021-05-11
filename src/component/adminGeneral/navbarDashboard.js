import React, {Component}from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import ADS from '../imagen/ADS.png'


class NavbarDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            modal:false,
        }        
          }
    
 render(){
        // console.log("props" , this.props.data)
        return(
         <MDBNavbar color="info-color"  dark expand="md">
          <MDBNavbarBrand >
            <a  href="/dashbordAdminGral"><img src={ADS} style={{width:"30%"}} /></a> &nbsp;&nbsp;&nbsp;
           {this.props.data} 
          </MDBNavbarBrand>        
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav  right>
             
              <MDBNavItem>
                    <MDBNavLink  to="/signupadmin"> Registrar Empresas

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

