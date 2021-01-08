import axios from 'axios'
import React,{Component} from 'react'
import { DialogUtility } from '@syncfusion/ej2-popups';
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Card, CardImg, Row,Button, Form, FormGroup, Label, Input,NavItem, NavLink,CardHeader} from 'reactstrap';

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
                 console.log( 'este es el response',response.data.data.login.message)

                if(response.data.data.login.message=="login exitoso"){
                    
                    localStorage.setItem("id_admin",response.data.data.login.id_admin)
                    
                    localStorage.setItem("nombre",response.data.data.login.nombre)
                    localStorage.setItem("razonSocial",response.data.data.login.razonSocial)

                    localStorage.setItem("telefono",response.data.data.login.telefono)

                    localStorage.setItem("correo",response.data.data.login.correo)
                    localStorage.setItem("statusCorreo",response.data.data.login.statusCorreo)                
                    localStorage.setItem("Token",response.data.data.login.token)
                    alert(`Bievenido ${response.data.data.login.nombre}`)
                    this.props.history.push("/homeadmin")

                }
                else if(response.data.data.login.message=="usuario y contraseña incorrecto"){
                    // DialogUtility.alert({
                    //     animationSettings: { effect: 'Zoom' },
                    //     closeOnEscape: true,
                    //     content: "This is an Alert Dialog!",
                    //     okButton: { text: 'OK', click: this.okClick.bind(this) },
                    //     showCloseIcon: true,
                    //     title: 'Alert Dialog'
                    // });
                     alert("usuario y contraseña incorrectos")
                    
                }else {
                    alert("Algo salio mal, por favor vuelva a intentarlo")
                }
             })
             .catch(err=>{
                 console.log('error',err.response)
             })
    }     

     render(){
        return(
<React.Fragment>
    <Grid  style={{ marginLeft:100,marginTop:80}}>
 <Paper elevation={3} style={{width:400, height:400}}>
 <MDBRow >
      
  <MDBCol style={{marginLeft:50, marginTop:20,marginRight:50}} > 
  <Form onSubmit={this.onSubmitBtn}  >
  <p className="h5 text-center mb-4">¡Bienvenido!</p>
    <br></br>  
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
          required/>
                
                </div>
       
        <div className="text-center">
  <MDBBtn color="primary" type="submit">Iniciar sesión</MDBBtn>
  </div>
 
  {/* <Row style={{padding:15}}>
  ¿No tienes una cuenta?  &nbsp; <a href="/signup">Registrate</a>
  </Row> */}
  </Form>
  </MDBCol >  
  </MDBRow>

      </Paper>
      </Grid>
 </React.Fragment>
     

        )
    }
}
export default LoginAdmin