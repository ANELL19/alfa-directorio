import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import {  Label, Form, Row} from "reactstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBAlert,
  MDBIcon
} from "mdbreact";
import { MDBCardImage } from "mdbreact";
import axios from "axios";
import { API } from "../Graphql/Graphql";
import Navbar from "../paneldeConection/navbar";

class signupAdminAlfa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rfc:"",
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      tablas:[],
      viewSearch:true,
      viewForm:false,
      fk_empresa:[]     
    };  
  }

  onChangeInput = (e) => {
    console.log("eventoonChange", e);
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

 componentWillUnmount(){
  localStorage.removeItem("id_empresa")
  localStorage.removeItem("rfc")
  localStorage.removeItem("telefono")
  localStorage.removeItem("correo")
  localStorage.removeItem("razonSocial")    
  }

  onSubmitBtn = (e) => {
    e.preventDefault();
    let nombre = this.state.nombre.toUpperCase();
    let apellido = this.state.apellido.toUpperCase();
    let correo = this.state.correo;
    let contrasena = this.state.contrasena;

       axios({
      url: API,
      method: "post",
      data: {
        query: `
                mutation{
                    signupAlfa(data:"${[nombre,apellido,correo,contrasena,this.state.fk_empresa]}"){  
                    message
                     } 
                }
                `
      }
    })
      .then((response) => {     
        DialogUtility.alert({
          title: "Registro exitoso"
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err.response);
      });    
  };
  
  consultarDatos(){    
    let rfc=this.state.rfc
    axios({
      url:API,
      method:'post',
      data:{
          query:`
          query{
              getEmpresas(data:"${[rfc]}"){
                id_empresa
                rfc
                razonSocial
                correo
                telefono 
                message        
             } 
          }
          `
      }   
  
       }).then(response=>{
       console.log( 'este es el response',response)  
        if(response.data.data.getEmpresas[0]){
          localStorage.setItem("empresa",response.data.data.getEmpresas[0].id_empresa)
          localStorage.setItem("rfc",response.data.data.getEmpresas[0].rfc)
          localStorage.setItem("razonSocial",response.data.data.getEmpresas[0].razonSocial)
          localStorage.setItem("correo",response.data.data.getEmpresas[0].correo)
          localStorage.setItem("telefono",response.data.data.getEmpresas[0].telefono)          
          console.log("la razon social",localStorage.getItem("razonSocial"))       
          this.setState({fk_empresa:response.data.data.getEmpresas[0].id_empresa})       
        }else{
           DialogUtility.alert({
                
                  title:'AVISO!' ,
                  content:'El RFC no fue encontrado'
                  
              });
        }
        
   
       
       })
       .catch(err=>{
           console.log('error',err)
       })   
  }

  regresar() {
    this.setState({viewSearch:true})
    this.setState({viewForm:false})
  }

  render() {
    let formulario;
    let search;
    let razonSocial=localStorage.getItem("razonSocial")
 if(this.state.viewSearch===true){
  search= <div>  
            <input  type="text" id="rfc" value={this.state.rfc} name="rfc"  onChange={this.onChangeInput}   placeholder="RFC de la Empresa" />
            <MDBBtn gradient="aqua" rounded size="sm" onClick={e=> this.consultarDatos()}  >                        
              <MDBIcon icon="search" />
            </MDBBtn>  
            <br></br> 
          </div>
  }
    
  if(this.state.viewForm===true){
    formulario= <div marginTop="5%">         
                 
      <Row>        
      <MDBCol md="6"> <h6>Razón Social:</h6></MDBCol>
      <Label>{localStorage.getItem("razonSocial")}</Label>
          <MDBCol md="6">
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
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="apellido"
              id="apellido"
              type="text"
              name="apellido"
              onChange={this.onChangeInput}
              value={this.state.apellido}
              required
            />
          </MDBCol>
        </Row> 
        <Row>
          <MDBCol md="6">
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
          </MDBCol>
          <MDBCol md="6">
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
          </MDBCol>                      
      </Row> 
    <div className="text-center">
          <MDBBtn color="info" type="submit">                   
            Guardar
          </MDBBtn>
          <MDBBtn
            color="danger"
            onClick={e=>this.regresar()}
            type="submit"
          >
            Cancelar
          </MDBBtn>                   
      </div>                      
    </div>

 }

    return (
      <React.Fragment>
        <Navbar />
        <MDBContainer style={{ marginTop: "5%" }}>
          <Paper>
            <MDBRow>
              <MDBCol size="5">
                <MDBCard style={{ width: "25rem" }}>
                  <MDBCardImage
                    className="img-fluid"
                    src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    waves
                  />
                </MDBCard>
              </MDBCol>
              <MDBCol size="6" style={{ marginTop: "5%" }}>
                <MDBAlert color="primary" className="text-center">
                  <h4>Registrar Administrador</h4>
                </MDBAlert>
                <Form onSubmit={this.onSubmitBtn}>
                  <div>
                    <Row>
                      <MDBCol md="5"></MDBCol>
                      <MDBCol md="7">                        
                      {search}
                      </MDBCol>
                      </Row>
                      <MDBCol>
                     {formulario}
                     </MDBCol>                    
                  </div>                  
                </Form>
              </MDBCol>
            </MDBRow>
          </Paper>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default signupAdminAlfa;
