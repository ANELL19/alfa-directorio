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
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row} from 'reactstrap';
import { FormGroup } from '@material-ui/core';
import axios from 'axios'

class Signup extends Component{
    constructor(props){
        super(props)
        this.state ={
            nombre:"",
            razonSocial:"", 
            telefono:"",
            correo:"",
            contrasena:"",          
        } 
        this.regresar = this.regresar.bind(this)     
    }   
    

regresar(){
    this.props.history.push("/")
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
                mutation{
                    signup(data:"${[this.state.nombre,this.state.razonSocial,this.state.telefono,this.state.correo,this.state.contrasena]}"){             
                 
                    message
                     } 
                }
                `
            }   
             })
           .then(response=>{
                  console.log( 'este es el response',response)
              //  if(response.data.data.signup.message==="registro exitoso"){

                this.props.history.push("/")
       
               // }else{
               //   console.log(response.data.data.signup.message)
           //  }


            })
         .catch(err=>{
                  console.log('error',err.response)
              })  
    }

    render(){
        return(
          <React.Fragment>     
            <Paper elevation={3} variant="outlined" style={{height:550, width:350, marginLeft:100, marginRight:30, marginTop:50}}>
          {/* //    <Card style={{marginLeft:70,marginTop:20}}> */}
               
                 <Form style={{marginLeft:70,marginTop:20}}  onSubmit={this.onSubmitBtn}> 
                 <h3>Crea tu cuenta.</h3>
                <br></br> 
                                
                 {/* <Form onSubmit={this.onSubmitBtn}>            */}
                 <FormControl  >
                    <Label for="nombre">nombre admin</Label>
                    <Input
                    id="nombre"
                    type="text"
                    name="nombres"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">    
                        <LocationCityIcon/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl>               
                    <br></br><br></br>       
                    
                    
                    <FormControl  >
                    <Label for="razonSocial">razon_social</Label>
                    <Input
                    id="razonSocial"
                    type="text"
                    name="razonSocial"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">    
                        <LocationCityIcon/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl>               
                    <br></br><br></br>       
                    
                    <FormControl >
                    <Label  for="correo">Correo</Label>
                    <Input
                    id="correo"
                    type="email"
                    name="correo"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">
                        <MailOutlineIcon/>  
                        </InputAdornment>
                    }
                    />        
                    </FormControl> 
                    <br></br><br></br>

                    <FormControl >
                    <Label for="telefono">Telefono</Label>
                    <Input
                    id="telefono"
                    type="text"
                    name="telefono"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">
                        <PhoneIcon/>                  
                        </InputAdornment>
                    }
                    />        
                    </FormControl> 
                    <br></br><br></br>

                    <FormControl >
                    <Label for= "contrasena" >Contraseña</Label>
                    <Input
                    id="contrana"
                    type="password"
                    name="contrasena"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">
                        <LockOpenIcon/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl> 
                    <br></br><br></br><br></br>

                    <Button variant="contained" color="primary" style={{marginLeft:30}}   type="submit"> Crea tu cuenta</Button>
                    <h5>¿Ya tienes una cuenta? <a href="/">Iniciar sesión</a></h5>

                 </Form>
                 
 
              {/* </CardBody>  */}
               
             </Paper > 
                  
          </React.Fragment>        
          
        )
    }

}export default Signup