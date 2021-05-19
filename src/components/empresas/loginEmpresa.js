// import axios from 'axios'
// import React,{Component} from 'react'
// import '@fortawesome/fontawesome-free/css/all.min.css';
//  import'bootstrap-css-only/css/bootstrap.min.css'; 
// import'mdbreact/dist/css/mdb.css';
// import {  MDBRow, MDBCol, MDBInput, MDBBtn,MDBAlert, MDBCard,MDBCardBody, MDBView} from 'mdbreact';
// import Paper from '@material-ui/core/Paper';
// import { DialogUtility } from '@syncfusion/ej2-popups';
// import {Form,FormGroup,Label,Col,Input} from 'reactstrap';
// import index from "./index.css"
// import {API} from '../Graphql/Graphql'

// class loginEmpresa extends Component{
//     constructor(props){
//         super(props)
//         this.state ={
//             user:"",
//             pass:""
//         }
//     }
//      componentWillMount(){
//         localStorage.removeItem("id_empresa")        
//         localStorage.removeItem("rfc")
//         localStorage.removeItem("razonSocial")
//         localStorage.removeItem("correo")
//         localStorage.removeItem("telefono")
//         localStorage.removeItem("TokenEmpresas")
//     }
    
//     onChangeInput =(e)=>{
//         const {id,value} = e.target;
//         this.setState({
//             [id]:value
//         })
//     }
    
//     // onSubmitBtn = (e)=>{        
//     //     e.preventDefault();  
//     //     // const API='http://localhost:4000/graphql'   
//     //     console.log("correo y contraseña",this.state.user,this.state.pass)
//     //     axios({
//     //         url:API,
//     //         method:'post',
//     //         data:{
//     //             query:`
//     //             query{
//     //                 loginEmpresas(data:"${[this.state.user,this.state.pass]}"){
//     //                    message
//     //                    id_empresa
//     //                    rfc
//     //                    razonSocial  
//     //                    correo 
//     //                    telefono                                       
//     //                    token                       
//     //                } 
//     //             }
//     //             `
//     //         }   
//     //          }).then(response=>{
//     //          console.log( 'este es el response',response)
//     //             if(response.data.data.loginEmpresas.message=="login exitoso"){                    
//     //                 localStorage.setItem("id_empresa",response.data.data.loginEmpresas.id_empresa)                    
//     //                 localStorage.setItem("rfc",response.data.data.loginEmpresas.rfc)   
//     //                 localStorage.setItem("razonSocial",response.data.data.loginEmpresas.razonSocial) 
//     //                 localStorage.setItem("correo",response.data.data.loginEmpresas.correo)    
//     //                 localStorage.setItem("telefono",response.data.data.loginEmpresas.telefono)                              
//     //                 localStorage.setItem("TokenEmpresas",response.data.data.loginEmpresas.token)
                 
//     //                 DialogUtility.alert({
//     //                     title:'Bienvenido' ,
//     //                     content: "inicio de sesión exitoso!",
//     //                 });                   
//     //                 this.props.history.push("/empresa")
//     //             }
//     //             else if(response.data.data.loginEmpresas.message=="usuario y contraseña incorrecto"){                   
//     //                 DialogUtility.alert({
//     //                     title: 'usuario y contraseña incorrectos'                       
//     //                 });                    
//     //             }else {
//     //                 DialogUtility.alert({
//     //                     title: 'Algo salio mal, por favor vuelva a intentarlo'                       
//     //                 });                
//     //             }
//     //          })
//     //          .catch(err=>{
//     //              console.log('error',err)
//     //          })
//     // }

//      render(){
//          return(
//             <React.Fragment>
//                 <div id="apppages1"  >
//                     <MDBView>
//                 <div style={{marginTop:"10%", marginLeft:"10%"}} >
//                 <MDBCol md="5">
//                 <MDBCard  style={{width:"82%",heigth:"50%"}}>       
                              
//                 <MDBCardBody >
//                 <MDBAlert color="primary"  className="h5 text-center mb-4" >
//                 <strong>Bienvenido a Empresas</strong>
//                 </MDBAlert>                    
//                 <Form onSubmit={this.onSubmitBtn}> 
//             <FormGroup row >                
//                 <Label for="correo" sm={4} size="lg">Correo:</Label>
//                 <Col sm={8}>
//                     <Input                       
//                         id="user"
//                         type="email"
//                         name="user"
//                         onChange={this.onChangeInput}
//                         value={this.state.user}
//                         required
//                         className="form-control" 
//                         placeholder="ejemplo@gmail.com"
//                         bsSize="lg"/>
//                 </Col>                    
//             </FormGroup>
//             <FormGroup row>            
//                 <Label for="contraseña"  sm={4} size="lg">Contraseña:</Label>
//                 <Col sm={8}>
//                     <Input            		
//                         id="pass"
//                         type="password"
//                         name="contrasena"
//                         onChange={this.onChangeInput}
//                         value={this.state.pass}
//                         validate 
//                         required 
//                         bsSize="lg" 
//                         className="form-control"
//                         placeholder="contraseña"/>
//                  </Col>                           
//                     </FormGroup >         
//                 <br></br>
//                     <div className="text-center">
//                         <MDBBtn   color="info"  type="submit"> iniciar sesión</MDBBtn>                     
//                     </div>            
//                 </Form> 
//                 </MDBCardBody>
//             </MDBCard>
//             </MDBCol>        
//             </div>
//             </MDBView>
//             </div>       
//         </React.Fragment>
//         )
//     }
// }
// export default loginEmpresa


import React from 'react'
import {MDBBtn,MDBCard,MDBCardBody,MDBCardHeader,MDBCardFooter,MDBAlert,MDBContainer,MDBView,MDBIcon,MDBModalHeader,MDBModal} from 'mdbreact';
import {Form,Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {Grid  } from '@material-ui/core';
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {   MDBCardTitle, MDBCol } from 'mdbreact';
import { Height } from '@material-ui/icons';
import { align } from '@progress/kendo-drawing';
import Paper from '@material-ui/core/Paper';
import style from './style.css'
import { Button, Card, CardBody, CardText, CardGroup, CardTitle } from 'reactstrap';
import Navbar from '../paneldeConection/navbar'
//   import Navbar from '../dashboardAdminAlfa/Navbar'


  function onSubmit (values) {
  };
    class Validacion extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
         
          }
          this.cerrar = this.cerrar.bind(this) 
        }
        
        cerrar(){
          this.props.history.push("/dashboard")
        }


    ingresar(values){
        console.log("values" , values)
        if(values.contraseña === "admin"){
           this.props.history.push("/empresa")     
        }else if(!values.contraseña){
            // alert("Por favor ingrese algun valor")

            DialogUtility.alert({
            title: "Por favor ingrese algun valor"                       
             });       
        }else{
            // alert("Contraseña incorrecta")
            DialogUtility.alert({
            title: "Contraseña incorrecta"                       
             });
        }
    }    

     render() {    
  
          return (
            <React.Fragment>
           <Navbar/>
             <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                      <div id="apppages2">
                         <MDBView>
                            <MDBContainer  style={{ marginTop:"5%"}} >                             
                              <MDBCol md="6">
                            <Paper >  
                              <Button  onClick={this.cerrar} close />
                                <MDBModalHeader >Ingrese la Contraseña </MDBModalHeader>
                                <MDBCardBody> 
                                 <center>  
                                  <MDBAlert color="primary"  >
                                <strong><i>Ingrese la Contraseña  para Registrar su Empresa</i>  </strong> 
                                </MDBAlert>                     
                                <Grid item xs={7}>                                                             
                                <Field
                                fullWidth
                                required
                                name="contraseña"
                                component={TextField}
                                type="password"
                                label="Clave de acceso"
                                /> 
                                </Grid>                               
                                <MDBBtn 
                                color="info"
                                size="md"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) =>this.ingresar(values)}>Ingresar </MDBBtn>
                               </center>
                                </MDBCardBody>                                                           
                            </Paper> 
                            </MDBCol > 
                            </MDBContainer>
                             </MDBView>
                            </div>
                      </form>
                    )}
                  />                 
            </React.Fragment>
          );
        }
      }
      export default Validacion