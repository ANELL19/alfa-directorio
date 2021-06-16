import React, {Component}from 'react'
// import RegistrarClientes from './registrarClientes'
// import CargarClientes from './cargarClientes'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBContainer } from "mdbreact";
import {NavItem} from 'reactstrap'; 
import { BrowserRouter as Router } from 'react-router-dom';
import ADS from '../imagen/ADS.png'

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
    // var date= new Date()
    // var fecha = date.toLocaleString('es')     

    var  momentoActual = new Date()
//     let  hora = momentoActual.getHours()
//    let  minuto = momentoActual.getMinutes()
//    let  segundo = momentoActual.getSeconds()   
    // console.log("esta es la hora ",hora + " : " + minuto + " : " + segundo )
    // console.log("esta es la hora ", momentoActual.getHours()+ " : " + momentoActual.getMinutes()+ " : "+ momentoActual.getSeconds())
    let horas= momentoActual.getHours()+ ":" + momentoActual.getMinutes()+ ":"+ momentoActual.getSeconds()
    var f = new Date();
    // let dia= f.getDate()
    // let mes=f.getMonth()
    // let año= f.getFullYear()
//    console.log("esta es la fecha ",f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
   let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()


        return(
     <React.Fragment>
<Router>
      <MDBNavbar color="#4fc3f7 light-blue lighten-2" dark expand="md">
        <MDBNavbarBrand>
        <a href="/Dashboard"><img src={ADS} style={{width:"66%"}}/></a> 
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem disabled>
              {/* <MDBNavLink  to="#!" disabled ><MDBIcon icon="calendar-alt" />&nbsp;<h5>{fecha}</h5></MDBNavLink> */}
             <p><MDBIcon icon="calendar-alt" size="2x"/>&nbsp;<font  size="4" className="white-text pr-3">{fecha } </font></p>
           
            </MDBNavItem>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MDBNavItem disabled>
              {/* <MDBNavLink  to="#!" disabled> <MDBIcon far  />&nbsp;<h5>{horas}</h5></MDBNavLink> */}
              <p><MDBIcon far icon="clock"  size="2x"/>&nbsp;<font size="4" className="white-text pr-3">{horas}</font></p> 
            </MDBNavItem>
          </MDBNavbarNav>          
        </MDBCollapse>
      </MDBNavbar>
    </Router>
     </React.Fragment>           
        )
    }
}export default NavbarAdmin;