import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBAlert,MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Form} from 'reactstrap';

class LoginAdmin extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:""
        }
    }
     componentWillMount(){
        localStorage.removeItem("id_admin")
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellidos")
        localStorage.removeItem("razonSocial")
        localStorage.removeItem("RFC")
        localStorage.removeItem("telefono")
        localStorage.removeItem("correo")
        localStorage.removeItem("statusCorreo")
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
                   login(data:"${[this.state.user,this.state.pass]}"){
                    message
                       id_admin
                       nombre  
                       razonSocial
                       RFC
                       telefono
                       correo
                       statusCorreo                                            
                       token
                   } 
                }
                `
            }   
             }).then(response=>{
                //  console.log( 'este es el response',response.data.data.login.message)
                if(response.data.data.login.message=="login exitoso"){                    
                    localStorage.setItem("id_admin",response.data.data.login.id_admin)                    
                    localStorage.setItem("nombre",response.data.data.login.nombre)
                    localStorage.setItem("razonSocial",response.data.data.login.razonSocial)
                    localStorage.setItem("telefono",response.data.data.login.telefono)
                    localStorage.setItem("correo",response.data.data.login.correo)
                  //  localStorage.setItem("statusCorreo",response.data.data.login.statusCorreo)                
                    localStorage.setItem("TokenAdmin",response.data.data.login.token)
                    // alert(`Bievenido ${response.data.data.login.nombre}`)
                    DialogUtility.alert({
                        title:'Bienvenido' ,
                        content: "inicio de sesión exitoso!",
                    });
                   
                    this.props.history.push("/dasboardAdmin")
                }
                else if(response.data.data.login.message=="usuario y contraseña incorrecto"){
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
                 console.log('error',err.response)
             })
    }
     render(){
         return(
        <React.Fragment>
            <Paper elevation={3} style= {{width:400, height:350,marginLeft:700,marginTop:80}}>
        <MDBRow >            
            <MDBCol style={{marginLeft:20, marginTop:20,marginRight:20}} > 
                <Form onSubmit={this.onSubmitBtn}  >   
                <MDBAlert color="primary" className="h5 text-center md-4">
                   <strong>Bienvenido Administrador </strong> 
                    </MDBAlert>        
      
                    {/* <p className="h5 text-center mb-4">¡Bienvenido Administrador!</p> */}
                   
        <MDBCol md="11" style={{marginLeft:10, marginRight:20, marginTop:40}}>
                    <div className="grey-text">
                      <MDBInput 
                            label="correo" 
                            icon="envelope"              
                            type="email"
                            name="user"
                            id="user"
                            onChange={this.onChangeInput}
                            value={this.state.user}
                            required                            
                            />                            
                      <MDBInput 
                            label="contraseña"
                            icon="lock"        
                            type="password"
                            name="password" 
                            id="pass"
                            placeholder="password"
                            onChange={this.onChangeInput}
                            value={this.state.pass}
                            required
                            />                                    
                            </div>                
                       <div className="text-center">
                        <MDBBtn color="primary" type="submit">Iniciar sesión</MDBBtn>
                       </div>
                       </MDBCol>
                </Form>
            </MDBCol >  
        </MDBRow>
            </Paper>          
        </React.Fragment>
        )
    }
}
export default LoginAdmin