import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import {Card, CardImg, Row,Button, Form, FormGroup, Label, Input,NavItem, NavLink,CardHeader} from 'reactstrap';

class LoginClientes extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:""
        }
    }
     componentWillMount(){
       
        localStorage.removeItem("id_cliente")
        localStorage.removeItem("nombre_cliente")
        localStorage.removeItem("apellidos_cliente")
        localStorage.removeItem("nombreEmpresa")
        
       
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
                    loginclientes(data:"${[this.state.user,this.state.pass]}"){
                    message
                       id_cliente
                       nombre_cliente  
                       apellidos_cliente
                       nombreEmpresa                      
                       telefono
                       correo                                             
                   
                   } 
                }
                `
            }   
             }).then(response=>{
                 console.log( 'este es el response',response.data.data.login.message)

                if(response.data.data.login.message=="login exitoso"){                    
                    localStorage.setItem("id_cliente",response.data.data.login.id_cliente)
                    localStorage.setItem("nombre_cliente",response.data.data.login.nombre_cliente)
                    localStorage.setItem("apellidos_cliente",response.data.data.login.apellidos_cliente)
                    localStorage.setItem("nombreEmpresa",response.data.data.login.nombreEmpresa)
                   // localStorage.setItem("TokenClient",response.data.data.login.token)
                    alert(`Bievenido ${response.data.data.login.nombre}`)
                    this.props.history.push("/")

                }
                else if(response.data.data.login.message=="usuario y contraseña incorrecto"){
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
 <Paper elevation={3}  style={{width:350, height:450, display:"center", justifyContent:"stretch",marginLeft:400,marginTop:30,marginBottom:100}}>
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
 </React.Fragment>
     

        )
    }
}
export default LoginClientes