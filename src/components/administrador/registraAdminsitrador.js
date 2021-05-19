import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { CardBody, Label,Form,Row,Col,Alert,Button} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBModalHeader, MDBCard } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';

import {  MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';

import axios from 'axios';
import {API} from '../Graphql/Graphql'

class signupAdminAlfa extends Component{
    constructor(props){
        super(props)
        this.state ={
            nombre:"",
            apellido:"",      
            correo:"",
            contrasena:"",  
                
        } 
        this.regresar = this.regresar.bind(this)   
        this.cerrar = this.cerrar.bind(this)   
    }   
    cerrar(){
      this.props.history.push("/dashboard")
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
        let nombre =  this.state.nombre;
        let apellido = this.state.apellido;
        let correo = this.state.correo;
        let contrasena = this.state.contrasena;          

        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                    signupAlfa(data:"${[nombre,apellido,correo,contrasena]}"){           
                 
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
              window.location.reload();
               
        })
         .catch(err=>{
                  console.log('error',err.response)
              })   
    }
render(){



    return(
        <React.Fragment>
          {/* <MDBContainer>
        <Paper elevation={3} >        
         
          <Button  onClick={this.cerrar} close />
          <MDBModalHeader >Registrar Administrador </MDBModalHeader>
          
          <MDBCol md="6">
            <Form  onSubmit={this.onSubmitBtn}>               
              <div className="grey-text">
              <Row >  
                <MDBInput 
                  label="Nombre (s)" 
                  icon="user"	
                  id="nombre"
                  type="text"
                  name="nombres"
                  onChange={this.onChangeInput}
                  value={this.state.nombre}
                  required
                />
                <MDBInput 
                  label="apellido" 
                  icon="user"	
                  id="apellido"
                  type="text"
                  name="apellido"
                  onChange={this.onChangeInput}
                  value={this.state.apellido}
                  required
                />
                  	 
                <MDBInput 
                  label="Correo" 
                  icon="envelope"
                  id="correo"
                  type="email"
                  name="correo"
                  onChange={this.onChangeInput}
                  value={this.state.correo}
                  required
                />
                <MDBInput 
                  label="Contraseña"
                  icon="lock" 		
                  id="contrasena"
                  type="password"
                  name="contrasena"
                  onChange={this.onChangeInput}
                  value={this.state.contrasena}
                  validate 
                  required
                />
                </Row >
                </div>
                    <div className="text-center">
                      <MDBBtn   color="default"   type="submit"> Guardar</MDBBtn>
                      <MDBBtn  color="danger"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
                    </div>    
            </Form>
          </MDBCol>
        </Paper>
          </MDBContainer> */}
          

          <MDBContainer>
         
            <MDBCard style={{marginTop:"5%"}}>
            
              <MDBRow>
             
              <MDBCol md="6">
              <MDBCard style={{ width: "25rem" }}>
        <MDBCardImage className="img-fluid" src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" waves />
       </MDBCard>
                
                </MDBCol>

             
            
              {/* <MDBCol > */}
              <MDBCard style={{ width: "25rem", height:"rem"}}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCol md="6">
            <Form  onSubmit={this.onSubmitBtn}>               
              <div className="grey-text">
              <Row >  
                <MDBInput 
                  label="Nombre (s)" 
                  icon="user"	
                  id="nombre"
                  type="text"
                  name="nombres"
                  onChange={this.onChangeInput}
                  value={this.state.nombre}
                  required
                />
                <MDBInput 
                  label="apellido" 
                  icon="user"	
                  id="apellido"
                  type="text"
                  name="apellido"
                  onChange={this.onChangeInput}
                  value={this.state.apellido}
                  required
                />
                  	 
                <MDBInput 
                  label="Correo" 
                  icon="envelope"
                  id="correo"
                  type="email"
                  name="correo"
                  onChange={this.onChangeInput}
                  value={this.state.correo}
                  required
                />
                <MDBInput 
                  label="Contraseña"
                  icon="lock" 		
                  id="contrasena"
                  type="password"
                  name="contrasena"
                  onChange={this.onChangeInput}
                  value={this.state.contrasena}
                  validate 
                  required
                />
                </Row >
                </div>
                    <div className="text-center">
                      <MDBBtn   color="default"   type="submit"> Guardar</MDBBtn>
                      <MDBBtn  color="danger"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
                    </div>    
            </Form>
          </MDBCol>
          
        </MDBCardBody>
      </MDBCard>
                
                {/* </MDBCol> */}

                </MDBRow>
              

            </MDBCard>
            
          </MDBContainer>


          </React.Fragment>
    )
}

}export default signupAdminAlfa