import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {  MDBCol, MDBCardBody,MDBCard, MDBBtn,MDBAlert,MDBView} from 'mdbreact';
import {Form,FormGroup,Label,Col,Input} from 'reactstrap';
import  index from "./index.css";

class LoginAdminGener extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:""
        }
    }
     componentWillMount(){
        localStorage.removeItem("idadminGral")
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("razonSocial")
        localStorage.removeItem("rfc")
        // localStorage.removeItem("telefono")     
        localStorage.removeItem("correo")  
        localStorage.removeItem("fk_paquetes")
        localStorage.removeItem("paquetesdeAdmonGral")
        localStorage.removeItem("Token")
        localStorage.removeItem("correoAdministrador")

    }
    onChangeInput =(e)=>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    onSubmitBtn = (e)=>{        
        e.preventDefault();  
        const API='http://localhost:4000/graphql'   
        axios({
            url:API,
            method:'post',
            data:{
                query:`
                query{
                    loginAdminGeneral(data:"${[this.state.user,this.state.pass]}"){
                        message
                       id_adminG
                       nombre  
                       apellido   
                       razonSocial 
                        rfc 
                       correo                                                                       
                       token
                       fk_paquetes  
                   } 
                }
                `
            }   
             }).then(response=>{
                 console.log( 'este es el response',response)
                console.log("")
                if(response.data.data.loginAdminGeneral.message=="login exitoso"){                    
                    localStorage.setItem("idadminGral",response.data.data.loginAdminGeneral.id_adminG)                    
                    localStorage.setItem("nombre",response.data.data.loginAdminGeneral.nombre)   
                    localStorage.setItem("apellido",response.data.data.loginAdminGeneral.apellido)
                    localStorage.setItem("razonSocial",response.data.data.loginAdminGeneral.razonSocial)
                    localStorage.setItem("rfc",response.data.data.loginAdminGeneral.rfc)
                    // localStorage.setItem("telefono",response.data.data.LoginAdminGeneral.telefono)
                    localStorage.setItem("correo",response.data.data.loginAdminGeneral.correo)                                 
                    localStorage.setItem("Token",response.data.data.loginAdminGeneral.token)
                    // alert(`Bievenido ${response.data.data.login.nombre}`)
                    localStorage.setItem("fk_paquetes",response.data.data.loginAdminGeneral.fk_paquetes)

                    DialogUtility.alert({
                        title:'Bienvenido' ,
                        content: "inicio de sesión exitoso!",
                    });                   
                    this.props.history.push("/dashbordAdminGral")
                }
                else if(response.data.data.loginAdminGeneral.message=="usuario y contraseña incorrecto"){                   
                    DialogUtility.alert({
                        title: 'usuario y contraseña incorrectos'                       
                    });                    
                }else {                 
                    DialogUtility.alert({
                        title: 'Algo salio mal, por favor vuelva a intentarlo'                       
                    });
                }
             })
             .catch(err=>{
                 console.log('error',err)
             })
    }
        render(){
        return(
        <React.Fragment>
            <div id="apppage1"  >
        <MDBView>
        <div style={{marginTop:"10%", marginLeft:"10%" }}>
                <MDBCol md="5">
                <MDBCard  style={{width:"70%",heigth:"59%", marginLeft:"100%"}}>  
            <MDBCardBody >
            <MDBAlert color="primary"  className="h5 text-center mb-4" >
                <strong>Administrador General</strong>
            </MDBAlert>       
            <Form onSubmit={this.onSubmitBtn}>  
            <FormGroup row >  
              <Label for="correo" sm={4} size="lg" ><h6> Correo:</h6></Label>   
               <Col sm={7}>
                <Input  
                    label="correo"            
                    icon="user"
                    id="user"
                    type="email"
                    name="user"
                    onChange={this.onChangeInput}
                    value={this.state.user}
                    required
                    className="form-control" 
                    placeholder="example@.com"/>
               </Col>
            </FormGroup>
            <FormGroup row > 
               <Label for="contraseña" sm={4} size="lg"><h6>Contraseña:</h6></Label>
                <Col sm={7}>
                 <Input  
                    label="contraseña"  
                    icon="lock"        		
                    id="pass"
                    type="password"
                    name="contrasena"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    validate 
                    required              
                    className="form-control"
                    placeholder="contraseña"/> 
                </Col>   
            </FormGroup> 
                <div className="text-center">
                 <MDBBtn color="info"  type="submit"> iniciar sesión</MDBBtn>                     
                </div>            
            </Form> 
            </MDBCardBody>          
            </MDBCard>
            </MDBCol>                        
                </div>
                </MDBView>
                </div>
        </React.Fragment>
        )
        }
        }export default LoginAdminGener

