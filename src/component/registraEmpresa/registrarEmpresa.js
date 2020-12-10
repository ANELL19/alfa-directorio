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
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


class registrarEmpleado extends Component{
    constructor(props){
            super(props)
            this.state ={
                nombre:"",
                empresa:"",
                correo:"",
                Telefono1:"",
                ext1:"",
                telefono2:"",
                ext2:"",
                nota: "",


            }
        }
    render(){
        return(
            <React.Fragment>               
                
              
                 
            <Paper elevation={3} variant="outlined" style={{height:600, width:350, marginLeft:100, marginRight:30, marginTop:50}}>
          {/* //    <Card style={{marginLeft:70,marginTop:20}}> */}
                   <Alert color="primary" >
                  <center> <strong><h6>Registrar contacto</h6></strong></center>  
                    </Alert>  
                  
                 <Form style={{marginLeft:70,marginTop:20}}>  {/* <Form onSubmit={this.onSubmitBtn}>            */}
                   
                    
                    <FormControl>
                    <Label >Nombre:</Label>
                    <Input
                    id="input-with-icon-adornment"
                    placeholder="Nombre"
                    startAdornment={
                        <InputAdornment position="start">    
                        <AccountCircle/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl>               
                    <br></br> 
                    <FormControl  >
                    <Label >Empresa:</Label>
                    <Input
                    id="input-with-icon-adornment"
                    placeholder="Empresa"
                    startAdornment={
                        <InputAdornment position="start">    
                        <LocationCityIcon/>                 
                        </InputAdornment>
                    }
                    />        
                    </FormControl>               
                    <br></br>
                    <FormControl >
                    <Label >Correo:</Label>
                    <Input
                    id="input-with-icon-adornment"
                    placeholder="Correo"
                    startAdornment={
                        <InputAdornment position="start">
                        <MailOutlineIcon/>  
                        </InputAdornment>
                    }
                    />        
                    </FormControl> 
                    <br></br>
                    <FormControl >
                    <Label >Telefono 1:</Label>
                    <Input
                    id="input-with-icon-adornment"
                    placeholder="Telefono1"
                    startAdornment={
                        <InputAdornment position="start">
                        <PhoneIcon/>                  
                        </InputAdornment>
                    }
                    />  

                    <FormControl >
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
                    <br></br>


                    </FormControl> 
                    <br></br>
                    <FormControl >
                    <Label >telefono 2:</Label>
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
                    <br></br>

                    <FormControl >
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
                    <br></br>

                    <TextField
                    id="outlined-full-width"
                    label="Nota"                    
                    placeholder="notas"                    
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    />
                    <Button variant="contained" color="primary" style={{marginLeft:30}} >Guardar</Button>                

                 </Form>              
             </Paper>                   
          </React.Fragment>        
          
        )
    }


}export default registrarEmpleado