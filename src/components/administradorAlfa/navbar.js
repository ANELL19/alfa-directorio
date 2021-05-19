import React, {Component}from 'react'
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
  } from "mdbreact";
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
        // console.log("props" , this.props.data)
        return(
     <React.Fragment>
         {/* <MDBNavbar color="info-color" dark expand="md">
         <a href="/dashboard"><img src={ADS} style={{width:"66%"}}/></a>
          <MDBNavbarBrand>        
          <strong className="white-text"> {this.props.data} </strong>
          </MDBNavbarBrand>
          &nbsp;
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav justify>
              &nbsp;
              <MDBNavItem active>
              <CargarClientes/>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/registrarClientes">Registrar Clientes</MDBNavLink>
              </MDBNavItem>
              &nbsp;
              <MDBNavItem >
              
                <MDBBtn color="info" href="/loginAdmin" > <MDBIcon icon="door-open" size="lg" /> Salir</MDBBtn>
              </MDBNavItem>                        
            </MDBNavbarNav>
             </MDBCollapse>
         </MDBNavbar>  */}

<Router>
      <MDBNavbar color="#4fc3f7 light-blue lighten-2" dark expand="md">
        <MDBNavbarBrand>
        <a href="/dashboard"><img src={ADS} style={{width:"66%"}}/></a>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
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
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>



         
     </React.Fragment>           
        )
    }
}export default NavbarAdmin;