import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import Paper from '@material-ui/core/Paper';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput ,MDBAlert,MDBView, MDBMask} from 'mdbreact';
import Grid from '@material-ui/core/Grid';
import  index from "./index.css";
import {Form} from 'reactstrap';

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
                    // alert("usuario y contraseña incorrectos")
                    DialogUtility.alert({
                        title: 'usuario y contraseña incorrectos'
                       
                    });
                    
                }else {
                  //  alert("Algo salio mal, por favor vuelva a intentarlo")
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
            <div id="apppage1">
            <MDBView>
               
                  
           <Grid justify="center"  alignItems="center">

            <Paper elevation={3} style= {{width:400, height:350,marginLeft:1100,marginTop:150}}>
                <MDBRow>
                    <MDBCol style={{marginLeft:20, marginTop:20,marginRight:20}}>
                    <Form onSubmit={this.onSubmitBtn}  >
                        <MDBAlert color = "primary" className= "h5 text-center mb-4">
                            <strong> Bienvenido Administrador General</strong>
                        </MDBAlert>
                        {/* <p className="h5 text-center mb-4">Bienvenido Administrador General </p> */}
                        <MDBCol md="11" style={{marginLeft:10, marginRight:15}}>
                        <div className="grey-text">
                        <MDBInput 
                            icon="user" 
                            group type="email" 
                            validate error="wrong"
                            success="right"
                            label="correo"                          
                            type="email"
                            name="user"
                            id="user"
                            onChange={this.onChangeInput}
                            value={this.state.user}
                            required   />
                        
                        <MDBInput
                        label="Your password"
                        icon="lock" 
                        group type="password" 
                        validate
                        label="contraseña"
                            icon="lock"        
                            type="password"
                            name="password" 
                            id="pass"
                            placeholder="password"
                            onChange={this.onChangeInput}
                            value={this.state.pass}
                            required />
                        </div>
                        
                        <div className="text-center">
                        <MDBBtn  color="primary" type="submit">Iniciar sesión</MDBBtn>
                        </div>
                        </MDBCol>
                    </ Form  >
                    </MDBCol>
                </MDBRow>
                </Paper>
                </Grid>
                
                
               </MDBView>
                </div>
        </React.Fragment>
        )
    }
}export default LoginAdminGener