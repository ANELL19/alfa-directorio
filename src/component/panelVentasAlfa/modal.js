import React, { Component } from "react"
import { MDBAlert, MDBBtn, MDBModalBody} from 'mdbreact';
import { MDBModal,  MDBModalHeader, MDBModalFooter,MDBContainer} from 'mdbreact';
import Navbar from './navbar'
// import { Form} from 'reactstrap';
import {  MDBRow, MDBCol } from 'mdbreact';
import { CardBody, Label,Form,Row,Col,Alert,FormGroup,Input} from 'reactstrap';
import {  MDBCard, MDBCardImage, MDBCardTitle, MDBCardText,MDBCardBody } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import {API} from '../Graphql'

class Modal extends Component{
  constructor(props){
    super(props)
    this.state = {           
          isOpen: false,
          modal:false,            
          user:"",
          pass:"",
          correoAlfa:'',          
          loginform:true,
          form:false,
          botonAceptar:true,

        }
        this.regresar = this.regresar.bind(this) 
            } 
   
         onChangeInput =(e)=>{
          // console.log("eventoonChange" , e) 
          const {id,value} = e.target;
          this.setState({
              [id]:value
          })
      } 

      regresar(){
        this.props.history.push("/dahboardAlfa")
    } 
   
  
      onSubmitBtn =(e)=>{        
        e.preventDefault();
        // const API='http://localhost:4000/graphql' 
        let correoAdminAlfa =localStorage.getItem("correo")   
      // let correo = this.state.correoAdminAlfa;
       const  contraseña = this.state.pass;
     
      //  const correoAlfa = localStorage.getItem("correoAlfa") 
       console.log("correoAlfa",correoAdminAlfa)
      //  console.log("state",this.state.correoAlfa)
    console.log("correo" , correoAdminAlfa , "pass", this.state.pass)
            axios ({
                url:API,
                method:'post',
                data:{
                    query:`
                    query{
                      loginModalAlfa(data:"${[correoAdminAlfa,contraseña]}"){
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
                  //  this.setState({form:true})
                  //  this.setState({loginform:false})
                 }else 
                 //  (response.data.data.loginModalAdmin.message=="usuario y contraseña incorrecto")
                  {
                     // alert("usuario y contraseña incorrectos")
                     DialogUtility.alert({
                         title: ' contraseña incorrecta',
                         position: "fixed"
       
                     });
                     window.location.reload()
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

 let  loginform;
 const correoAdminAlfa =localStorage.getItem("correo") 
 // console.log("correoAdminAlfa",correoAdminAlfa)
// if(this.state.loginform== true){
  loginform=<div>
    <MDBCard style={{ width: "150%", marginTop:"10%" , marginLeft:"20%"}}>
              <MDBCardBody>
                <MDBAlert color="info" className="text-center"><strong>Registrar Nuevo Administrador de Alfa</strong></MDBAlert>
                <Form onSubmit={this.onSubmitBtn}  >
                <p className="h5 text-center mb-4"> {correoAdminAlfa} </p>  
               
                      {/* <div style={{marginLeft:"30%"}}> */}
                      <div  className="h5 text-center mb-4">
                      <TextField                      
                        label="Contraseña"
                        name="pass"
                        id="pass"
                        type="password"
                        onChange={this.onChangeInput}
                        value={this.state.pass}
                        defaultValue="Normal"
                        variant="outlined"
                        style={{width:"60%"}}/>
                      </div>
                                                 
                  <div className="text-center">
                  <MDBBtn color="primary"  type= "submit">Iniciar sesión</MDBBtn> 
                  <MDBBtn color="secondary" onClick={this.regresar}>Cerrrar</MDBBtn>
                  </div>
                </Form>        
              </MDBCardBody>
            </MDBCard>  
    
          </div>
// }
 return(
            <React.Fragment>
             <Navbar/> 
             <MDBRow>     
               {loginform}
               {/* {form}  */}
            </MDBRow>            
        </React.Fragment>

        )
    }
} export default Modal

