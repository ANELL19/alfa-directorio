import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row,Alert} from 'reactstrap';
import { FormGroup } from '@material-ui/core';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


class registrarEmpleado extends Component{
    constructor(props){
            super(props)
            this.state ={
                nombre_cliente:"",
                empresa:"",               
                telefono1:"",          
                telefono2:"",
                correo:"",
                nota: "",


            }
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
                        directorio(data:"${[this.state.nombre_cliente,this.state.empresa,this.state.telefono1,this.state.telefono2,this.state.correo]}"){             
                     
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
                 
            <Paper elevation={3} variant="outlined" style={{height:600, width:350, marginLeft:100, marginRight:30, marginTop:50}}>
          {/* //    <Card style={{marginLeft:70,marginTop:20}}> */}
                   <Alert color="primary" >
                  <center> <strong><h6>Registrar contacto</h6></strong></center>  
                    </Alert>  
                  
                 <Form style={{marginLeft:70,marginTop:20}} onSubmit={this.onSubmitBtn} >  {/* <Form onSubmit={this.onSubmitBtn}>            */}
                   
                    
                    <FormControl>
                    <Label for="nombre">Nombre:</Label>
                    <Input
                    id="nombre_cliente"
                    type="text"
                    name="nombre_cliente"
                    placeholder="Nombre"
                    onChange={this.onChangeInput} 
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">    
                        <AccountCircle/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl>               
                    <br></br> 
                    <FormControl  >
                    <Label for="empresa" >Empresa:</Label>
                    <Input
                    id="empresa"
                    type="text"
                    name="empresa"
                    placeholder="Empresa"
                    onChange={this.onChangeInput} 
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">    
                        <LocationCityIcon/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl>               
                    <br></br>
                    <FormControl >
                    <Label  for ="correo">Correo:</Label>
                    <Input
                    id="correo"
                    type="email"
                    name="correo"                   
                    placeholder="Correo"
                    onChange={this.onChangeInput} 
                    value={this.state.pass}                
                    startAdornment={
                        <InputAdornment position="start">
                        <MailOutlineIcon/>  
                        </InputAdornment>
                    }
                    />        
                    </FormControl> 
                    <br></br>
                    <FormControl >
                    <Label  for= "telefono1">Telefono 1:</Label>
                    <Input
                    id="telefono1"
                    type="text"
                    name="telefono1"
                    placeholder="Telefono1"
                    onChange={this.onChangeInput} 
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">
                        <PhoneIcon/>                  
                        </InputAdornment>
                    }
                    />  

                    {/* <FormControl >
                    <Label >Ext.</Label>
                    <Input
                    id="input-with-icon-adornment"
                    placeholder="Telefono2"
                    onChange={this.onChangeInput} 
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">
                        <PhoneIcon/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl> 
                    <br></br> */}


                    </FormControl> 
                    <br></br>
                    <FormControl >
                    <Label  for="telefono2">telefono 2:</Label>
                    <Input
                    id="telefono2"
                    type="text"
                    name="telefono2"
                    placeholder="Telefono2"
                    onChange={this.onChangeInput} 
                    value={this.state.pass}
                    startAdornment={
                        <InputAdornment position="start">
                        <PhoneIcon/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl> 
                    <br></br>

                    {/* <FormControl >
                    <Label >Ext.</Label>
                    <Input
                    id="input-with-icon-adornment"
                    placeholder="Telefono2"
                    startAdornment={
                        <InputAdornment position="start">
                        <PhoneIcon/>                 
                        </InputAdornment>
                    }
                    />         
                    </FormControl> 
                    <br></br>*/}

                    <TextField
                    id="nota"
                    type="text"
                    name="nombre"
                    label="Nota"                    
                    placeholder="notas"                    
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    />
                    <Button variant="contained" color="primary" style={{marginLeft:30}} type="submit" >Guardar</Button>                

                 </Form>              
             </Paper>                   
          </React.Fragment>        
          
        )
    }


}export default registrarEmpleado