import React, {Component}from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import modalAlfa from './modalAlfa';
import {NavItem,Form,FormGroup,Label,Col,Input} from 'reactstrap'; 
import { MDBContainer,MDBRow,MDBCol,MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios';


class NavbarAlfa extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            // modal:false,
            modal:false,            
            user:"",
            pass:"",
            correo:""
        }
       this.toggle=this.toggle.bind(this)     
          }
          
          
          //  toggle (parametro){
          //     this.setState({modal:parametro})
          //     // console.log("parametro",parametro)
          //    }
            
          toggle = () => {
            this.setState({
              modal: !this.state.modal
            });
          }
             onChangeInput =(e)=>{
              console.log("eventoonChange" , e) 
              const {id,value} = e.target;
              this.setState({
                  [id]:value
              })
          }
         

          onSubmitBtn =(e)=>{        
            e.preventDefault();
            const API='http://localhost:4000/graphql'   
              
           const  contraseña = this.state.pass;
            const correo = localStorage.getItem("correo") 
        console.log("correo" , correo , "pass", this.state.pass)
                axios ({
                    url:API,
                    method:'post',
                    data:{
                        query:`
                        query{
                          loginModalAlfa(data:"${[correo,contraseña]}"){
                            message
                           correo                                         
                            token
                        } 
                     }
                     `
                 }   
                  }).then(response=>{
               //  console.log( 'este es el response',response.data.data.login.message)
                     if(response.data.data.loginModalAlfa.message=="login exitoso"){                    
                        //  localStorage.setItem("id_admin",response.data.data.loginModalAlfa.id_admin)                    
                        //  localStorage.setItem("nombre",response.data.data.loginModalAlfa.nombre)
                        //  localStorage.setItem("razonSocial",response.data.data.loginModalAlfa.razonSocial)
                        //  localStorage.setItem("telefono",response.data.data.loginModalAlfa.telefono)
                          localStorage.setItem("correoAlfa",response.data.data.loginModalAlfa.correo)                            
                         localStorage.setItem("TokenVentasAlfa",response.data.data.loginModalAlfa.token)
                         // alert(`Bievenido ${response.data.data.login.nombre}`)
                        //  this.props.history.push("/signupAdminAlfa")
                         DialogUtility.alert({
                             title:'Bienvenido' ,
                             content: "inicio de sesión exitoso!",
                         });
                        
                          this.props.history.push("/signupAdminAlfa")
                     }else 
                     //  (response.data.data.loginModalAdmin.message=="usuario y contraseña incorrecto")
                      {
                         // alert("usuario y contraseña incorrectos")
                         DialogUtility.alert({
                             title: ' contraseña incorrectos',
                             position: "fixed"
           
                         });
                       
                     }
                     // else {
                     //   //  alert("Algo salio mal, por favor vuelva a intentarlo")
                     //     DialogUtility.alert({
                     //         title: 'Algo salio mal, por favor vuelva a intentarlo'                       
                     //     });
                     // }
                  }).catch(err=>{
                      console.log('error',err.response)
                  })
               
             }
             
               
               
    
 render(){
   const  correo =localStorage.getItem("correo") 
// console.log("algo",correoAlfa)

// const boton= <div><MDBBtn size="sm" onClick={this.toggle}>información</MDBBtn></div> 
          
   let modal;
  modal=
  <div>
     <MDBContainer>
      {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Correo Administrador</MDBModalHeader>
        <MDBModalBody>
        <MDBModalBody>

<MDBRow >            
<MDBCol > 
<Form onSubmit={this.onSubmitBtn}  >
    <p className="h5 text-center mb-4">{correo} </p>     
 
              <FormGroup row>
                    <Label for="contraseña" sm={3} size="lg">Contraseña</Label>
                        <Col sm={9}>
                        <Input 
                                type="password" 
                                name="password" 
                                id="pass" 
                                placeholder="contraseña" 
                                bsSize="lg" 
                                onChange={this.onChangeInput}
                                value={this.state.pass}
                                required 
                        />
                        </Col>
               </FormGroup>
                          
       <div className="text-center">
        <MDBBtn color="primary" size="sm" type="submit">Iniciar sesión</MDBBtn>
        <MDBBtn color="secondary" size="sm" onClick={this.toggle}>Cerrrar</MDBBtn>
       </div>
</Form>
</MDBCol >  
</MDBRow>
     
</MDBModalBody> 
        </MDBModalBody>
        
      </MDBModal>
    </MDBContainer>
 </div> 

        return(
          <React.Fragment>
            <MDBNavbar color="info-color" dark expand="md" >
              <MDBNavbarBrand>
               
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
               
                <MDBNavbarNav right>
                  <MDBNavItem active>
                    <MDBNavLink  to="/signupAdminG">  Registrar Administradores </MDBNavLink>
                  </MDBNavItem>   
                  <MDBNavItem active>
                  {/* <MDBNavLink >  Registrar alfa </MDBNavLink>                    */}
                  
                  </MDBNavItem>   
                

                 {modal} 
            
                      
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

export default NavbarAlfa 