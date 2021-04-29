import React, {Component}from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,  MDBNavbarToggler, MDBCollapse, MDBBtn } from "mdbreact"
import ADS from '../imagen/ADS.png'

class NavbarAlfa extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
      } 
     render(){
        return(
          <React.Fragment>             
            <MDBNavbar color="info-color" dark expand="md" >
              <MDBNavbarBrand>  
                <a href="/dahboardAlfa"><img src={ADS} style={{width:"66%"}}/></a>  
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav right>
                  {/* <MDBNavItem active>
                    <MDBBtn color="info" href="/signupAdminG">  Registrar clientes</MDBBtn>
                  </MDBNavItem>                 
                      <MDBNavItem active>                
                  <MDBBtn color="info"  href="/cotizaciones">
                     Cotización
                    </MDBBtn> 
                     </MDBNavItem>                     */}
                     <MDBNavItem active>                
                  <MDBBtn  color="info" href="/loginAlfa">
                     Salir
                    </MDBBtn>
                     </MDBNavItem> 
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            </React.Fragment>
        )
    }
}export default NavbarAlfa 