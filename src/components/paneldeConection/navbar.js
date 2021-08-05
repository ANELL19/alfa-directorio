import React, {Component}from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBIcon} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import ADS from '../imagen/ADS.png'
import { MDBBtn } from "mdbreact";

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
  var d = new Date();
  var hh = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds(); 
  if (hh >= 12) {
    hh = hh - 12;    
  }
  if (hh == 0) {
    hh = 12;
  }
  let horas= hh + ":" + m + ":" + s   

    var f = new Date();
    // let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()   
    var dd = f.getDate();
    var mm = f.getMonth()+1;
    var yyyy = f.getFullYear()
    if(dd<10) {
      dd='0'+dd;
    } 
    if(mm<10) {
      mm='0'+mm;
    }    
    let fecha =  dd+"/"+mm+"/"+yyyy
        return(
          <Router>
          <MDBNavbar color="#b3e5fc light-blue lighten-4" expand="md">
            <MDBNavbarBrand>
              <a href="/"><img  src={ADS} style={{width:"60%", marginTop:"2%", marginLeft:"15%"}}/></a>
            </MDBNavbarBrand>            
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                <MDBBtn href="/loginEmpresa" gradient="blue"><MDBIcon icon="home"/>&nbsp;Registrar Empresas</MDBBtn>                   
                </MDBNavItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBNavItem>
                <MDBBtn href="/loginAdministrador" gradient="blue"><MDBIcon icon="address-card"/>&nbsp;Registrar Administrador</MDBBtn>
                </MDBNavItem>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBNavItem>
                <MDBBtn  href="/loginAdmin" gradient="blue"><MDBIcon icon="laptop"/>&nbsp;Iniciar Sesión</MDBBtn>
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

