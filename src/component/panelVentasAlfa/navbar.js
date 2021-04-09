import React, {Component}from 'react'
import {Form,FormGroup,Label,Col,Input} from 'reactstrap'; 
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler,
  MDBCollapse,MDBContainer,MDBRow,MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact"


class NavbarAlfa extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            // modal:false,
            modal:false,            
            user:"",
            pass:"",
            correoAlfa:''
            
        }
       this.toggle=this.toggle.bind(this)     
          }
                    
      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
          onChangeInput =(e)=>{
          // console.log("eventoonChange" , e) 
          const {id,value} = e.target;
          this.setState({
              [id]:value
          })
      }                    
      
      onSubmitBtn =(e)=>{        
        e.preventDefault();
        const API='http://localhost:4000/graphql'   
      let correo = this.state.correoAlfa;
        const  contraseña = this.state.pass;
        const correoAlfa = localStorage.getItem("correoAlfa") 
      //  console.log("correoAlfa",correoAlfa)
      //  console.log("state",this.state.correoAlfa)
    // console.log("correo" , correo , "pass", this.state.pass)
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
            console.log( 'este es el response',response.data.data.loginModalAlfa)
                  if(response.data.data.loginModalAlfa.message=="login exitoso"){ 
                  localStorage.setItem("TokenVentasAlfa",response.data.data.loginModalAlfa.token)
                      DialogUtility.alert({
                          title:'Bienvenido' ,
                          content: "contraseña exitosa!",
                          position: "fixed"
                      });                        
                      this.props.history.push("/signupAdminAlfa")
                    
                      
                  }else 
                  //  (response.data.data.loginModalAdmin.message=="usuario y contraseña incorrecto")
                  {
                      // alert("usuario y contraseña incorrectos")
                      DialogUtility.alert({
                          title: ' contraseña incorrecta',
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

    const boton= <div><MDBBtn size="sm" onClick={this.toggle}>información</MDBBtn></div> 
            
      let modal= <div>
        <MDBContainer>
        <MDBBtn color="info" onClick={this.toggle}>Registar Administrado de Alfa </MDBBtn>       
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} > 
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
                Size="lg" 
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
                     {modal} 
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
{/* 
            <MDBBtn color="primary" href="/cotizaciones">cotizacion</MDBBtn> */}
            </React.Fragment>
        )
    }
}export default NavbarAlfa 