import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form} from 'reactstrap';
import { FormGroup } from '@material-ui/core';
import axios from 'axios'


 


class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:""
        }
    }

    componentWillMount(){
        localStorage.removeItem("nombre_empresa")
        localStorage.removeItem("correo")
        localStorage.removeItem("telefono")       
        localStorage.removeItem("id")


    }

    onChangeInput =(e)=>{
        console.log("eventoonChange" , e)
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
                       nombre
                       razon_social
                       telefono
                       correo                       
                       contrasena 
                       token
                   } 
                }
                `
            }   
             }).then(response=>{
                 console.log( 'este es el response',response)
                if(response.data.data.login.message=="login exitoso"){
                    localStorage.setItem("id",response.data.data.login.id)
                    localStorage.setItem("nombre_admin",response.data.data.login.nombre)
                    localStorage.setItem("nombre_empresa",response.data.data.login.razon_social)
                    localStorage.setItem("correo",response.data.data.login.correo)
                    localStorage.setItem("telefono",response.data.data.login.telefono)                  
                    localStorage.setItem("Token",response.data.data.login.token)

                    alert(`Bievenido ${response.data.data.login.empresa} `)
                    this.props.history.push("/home")

                }
                else{
                    alert("usuario y contraseña incorrectos")
                }
             })
             .catch(err=>{
                 console.log('error',err.response)
             })


    //     if(this.state.user=="jesus" && this.state.pass=='123' ){
    //         this.props.history.push("/dashboard")

    //     }  
    //         console.log(this.state.user,this.state.pass)
  
    }
     
    render(){
        return(
   <React.Fragment>  
    
    <Paper elevation={3} variant="outlined" style={{height:390, width:350, marginLeft:100, marginRight:30, marginTop:100}}>
     
         
       
        <CardBody style={{marginLeft:70,marginTop:20}}>
        <h4> ¡Bienvenidos!</h4>
        <br></br>
        
         <Form onSubmit={this.onSubmitBtn}>           
         <FormControl  >
        <Label  for="User">Correo</Label>
        <Input
          id="User"
          name="User"
          type="email"
          onChange={this.onChangeInput} 
          value={this.state.User}
          startAdornment={
            <InputAdornment position="start">
              <MailOutlineIcon/>                 
            </InputAdornment>
          }
        />        
         </FormControl>
        

         <br></br><br></br>

         
         <FormControl >
        <Label  for="Password">Contraseña</Label>
        <Input
          id="pass"
          name="password"
          type="password"
          onChange={this.onChangeInput}
          value={this.state.pass}
          startAdornment={
            <InputAdornment position="start">
              <LockOpenIcon/>                  
            </InputAdornment>
          }
        />        
         </FormControl> 
          <br></br><br></br>
         <Button color="primary" style={{marginLeft:30}}  type="submit">Iniciar sesión</Button>
      <h8>¿No tienes una cuenta? <a href="/signup">Registrate</a></h8>
        </Form>
        </CardBody>    
        
     
      </Paper >      
    </React.Fragment>   
           )
    }
}export default Login