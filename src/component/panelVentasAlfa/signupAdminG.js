import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row,Col,Alert} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import {  FormGroup, Input } from 'reactstrap';
import { DesktopWindows } from '@material-ui/icons';

class signupAdminG extends Component{
    constructor(props){
        super(props)
        this.state ={
            nombre:"",
            apellido:"",
            razonSocial:"", 
            RFC:"",
            telefono:"",
            correo:"",
            contrasena:"",  
            fk_paquetes:"",
            open:false,
            success:false
                
        } 
        this.regresar = this.regresar.bind(this)     
    }   
    componentWillMount(){
      this.validate();
    }
    validate= async()=>{
       
       await this.setState({nombre:localStorage.getItem("nombre")})
       await this.setState({apellido:localStorage.getItem("apellido")})
       await this.setState({razonSocial:localStorage.getItem("razonSocial")})
       await this.setState({RFC:localStorage.getItem("RFC")})
       await this.setState({telefono:localStorage.getItem("telefono")})
       await this.setState({correo:localStorage.getItem("correo")})
       localStorage.removeItem("nombre")
       localStorage.removeItem("apellido")
       localStorage.removeItem("razonSocial")
       localStorage.removeItem("RFC")
       localStorage.removeItem("telefono")
       localStorage.removeItem("correo")
       localStorage.removeItem("contraseña")
       localStorage.removeItem("fk_paquetes")
    }
    

    regresar(){
        this.props.history.push("/home_admin")
    } 
    onChangeInput =(e)=>{
     //   console.log("eventoonChange" , e)
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
               
       // this.setState({ [e.target.name]: e.target.value });

       if(this.state.nombre && this.state.apellido && this.state.RFC && this.state.razonSocial && this.state.telefono && this.state.correo && this.state.contrasena && this.state.fk_paquetes !="Ya seleccionado"){
        function ValidateEmail(sEmail) {
            var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
          
            if(!sEmail.match(reEmail)) {
              return false;
            }
          
            return true;
          
          }
          if(this.state.rfc.length >= 12 && this.state.rfc.length < 14){
            if(ValidateEmail(this.state.correo)===true){
                if(this.state.contrasena.length >= 8){
                    if(this.state.nombre.length > 2 && this.state.apellido.length > 2 && this.state.razonSocial.length > 2 && this.state.telefono.length >= 8 ){
                        this.setState({success:true});
                    }else{
                        alert("Alguno de los datos ingresados no cumple con los requisitos")
                    }
                }else{
                    alert("Su contraseña debe contener al menos 8 caracteres")
                }
            }else{
                alert("El correo electrónico no cumple los requisitos")
            }
          }else{
              alert("El RFC no es válido ")
          }
         
      }else{
        this.setState({open:true});
      }
    }
     handleClose = (e) =>{
       this.setState({open:false})
     }  
     handleSuccess= ()=>{
       this.setState({success:false})
     }
    onSubmitBtn = (e)=>{
     // console.log("contraseña" , this.state.contrasena)
        e.preventDefault();  
        const API='http://localhost:4000/graphql'   

        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                    signupAdminGeneral(data:"${[this.state.nombre.toUpperCase(),this.state.apellido.toUpperCase(),this.state.razonSocial.toUpperCase(), this.state.RFC.toUpperCase(),this.state.telefono.toUpperCase(),this.state.correo.toUpperCase(),this.state.contrasena,this.state.fk_paquetes]}"){             
                 
                    message
                     } 
                }
                `
            }   
             })
           .then(response=>{
              //  if(response.data.data.signup.message==="registro exitoso"){
              DialogUtility.alert({
                  title:'Registro exitoso' ,
                  
              });
            //  Windows.location.reload();
                //this.props.history.push("/home_admin")
              
        })
         .catch(err=>{
                  console.log('error',err.response)
              })  
    }
render(){
    return(
        <React.Fragment>
        <Paper elevation={3}  style={{width:550, height:600, display:"center", justifyContent:"stretch",marginLeft:400,marginTop:30,marginBottom:100}}>
        <MDBContainer>
          <MDBRow>
          <MDBCol style={{marginLeft:25,marginRight:15,marginTop:20}}>
            <Form  onSubmit={this.onSubmitBtn}>
            <Alert color="primary">
              <a  style={{marginTop:20,marginLeft:120}}>
                Administrador de ventas
              </a>
            </Alert>     
              <div className="grey-text">
              <Row >  
                <MDBInput 
                  label="Nombre (s)" 
                  icon="user"	
                  id="nombre"
                  type="text"
                  name="nombres"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  required
                />
                <MDBInput 
                  label="apellidos" 
                  icon="user"	
                  id="apellido"
                  type="text"
                  name="apellido"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  required
                />
                <MDBInput label="Razon Social"
                  icon="city"				
                  id="razonSocial"
                  type="text"
                  name="razonSocial"			
                  onChange={this.onChangeInput}
                  value={this.state.pass} 
                  required
                />        
                <MDBInput 
                  label="RFC" 
                  icon="user"	
                  id="RFC"
                  type="text"
                  name="RFC"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  required
                />       
                <MDBInput 
                  label="Teléfono" 
                  icon="phone"		 
                  id="telefono"
                  type="text"
                  name="telefono"
                  onChange={this.onChangeInput}
                  value={this.state.pass}	
                  required	 
                />     	 
                <MDBInput 
                  label="Correo" 
                  icon="envelope"
                  id="correo"
                  type="email"
                  name="correo"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  required
                />
                <MDBInput 
                  label="Contraseña"
                  icon="lock" 		
                  id="contrasena"
                  type="password"
                  name="contrasena"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  validate 
                  required
                />
                <br></br>
                 {/* <FormGroup>
                    <Label for="exampleSelect">Seleccione un paquete</Label>
                    <Input
                     type="select"
                     name="fk_paquetes"
                     id="fk_paquetes" 
                     onChange={this.onChangeInput} 
                     value={this.state.fk_paquetes}
                    //  validate 
                     required>
                       
                      <option value="1">1 empresa </option>
                      <option value="2">3 empresas</option> 
                      <option value="3">5 empresas</option>
                      <option value="4">10 empresas</option>
                      <option value="5">20 empresas</option>
                    </Input>
                  </FormGroup> */}
                  <div>
                   <select 
                   className="browser-default custom-select"
                   type="select"
                   name="fk_paquetes"
                   id="fk_paquetes" 
                   onChange={this.onChangeInput} 
                   value={this.state.fk_paquetes}
                  //  validate 
                   required >
          <option>Seleccione su paquete</option>
          <option value="1">1 empresa</option>
          <option value="2">3 empresas</option>
          <option value="3">5 empresas</option>
          <option value="4">10 empresas</option>
          <option value="5">20 empresas</option>
        </select>
        </div>
                </Row >
                </div>
                    <div className="text-center">
                      <MDBBtn  outline color="info"   type="submit"> Guardar</MDBBtn>
                      <MDBBtn outline color="danger"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
                    </div>    
            </Form>
          </MDBCol>
          </MDBRow>
          </MDBContainer>
          </Paper>
          </React.Fragment>
    )
}

}export default signupAdminG