import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { CardBody, Label,Form,Row,Col,Alert} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios';
import {API} from '../Graphql/Graphql'

class signupEmpresas extends Component{
    constructor(props){
        super(props)
        this.state ={
            rfc:"",
            razonSocial:"",      
            correo:"",
            telefono:"",
            contrasena:"",  
                
        } 
        this.regresar = this.regresar.bind(this)     
    }   
    

    // regresar(){
    //     this.props.history.push("/home_admin")
    // } 

    
    regresar(){
        this.props.history.push("/loginEmpresa")
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
        let rfc = this.state.rfc.toUpperCase();
        let razonSocial = this.state.razonSocial.toUpperCase().replace(/,/g, "");
        let correo = this.state.correo;
        let telefono = this.state.telefono;
        let contrasena = this.state.contrasena;

        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                    signupEmpresas(data:"${[rfc,razonSocial,correo,telefono,contrasena]}"){
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
               // this.props.history.push("/home_admin")
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
                Registrar  Empresa
              </a>
            </Alert>     
              <div className="grey-text">
              <Row >  
                <MDBInput 
                  label="RFC" 
                  icon="user"	
                  id="rfc"
                  type="text"
                  name="rfc"
                  onChange={this.onChangeInput}
                  value={this.state.rfc}
                  required
                />
                <MDBInput 
                  label="Razón Social" 
                  icon="user"	
                  id="razonSocial"
                  type="text"
                  name="razonSocial"
                  onChange={this.onChangeInput}
                  value={this.state.razonSocial}
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
                  label="Telefono" 
                  icon="envelope"
                  id="telefono"
                  type="number"
                  name="telefono"
                  onChange={this.onChangeInput}
                  value={this.state.telefono}
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
          </MDBRow>
          </MDBContainer>
          </Paper>
          </React.Fragment>
    )
}

}export default signupEmpresas