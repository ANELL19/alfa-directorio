import React, {Component}from 'react'
import {Form,FormGroup,Label,Col,Input} from 'reactstrap'; 
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler,
  MDBCollapse,MDBContainer,MDBRow,MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact"
import { render } from '@testing-library/react';


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
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem active>
                    <MDBBtn color="info" href="/signupAdminG">  Registrar clientes</MDBBtn>
                  </MDBNavItem>   
                  <MDBNavItem active>
                  {/* <MDBNavLink >  Registrar alfa </MDBNavLink>                    */}
                  <MDBBtn  color="info" href="/loginAlfa">
                     Salir
                    </MDBBtn>
                     </MDBNavItem> 
                     <MDBNavItem active>
                  {/* <MDBNavLink >  Registrar alfa </MDBNavLink>                    */}
                  <MDBBtn color="info"  href="/cotizaciones">
                     Cotización
                    </MDBBtn>
                     </MDBNavItem>                    
                
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
{/* 
            <MDBBtn color="primary" href="/cotizaciones">cotizacion</MDBBtn> */}
            </React.Fragment>
        )
    }
}export default NavbarAlfa 