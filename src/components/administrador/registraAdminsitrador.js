import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import {  Label, Form, Row} from "reactstrap";
import { MDBContainer,MDBRow,MDBCol,MDBBtn,MDBInput,MDBCard,MDBAlert,MDBIcon } from "mdbreact";
import { MDBCardImage } from "mdbreact";
import axios from "axios";
import { API } from "../Graphql/Graphql";
import Navbar from "../paneldeConection/navbar";
import {Card} from 'antd'
import { Divider } from "@material-ui/core";
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
      fk_empresa:[],
      rs:''     
    };  
  }

  onChangeInput = (e) => {
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
    if(nombre && apellido && correo && contrasena){
      if(this.state.fk_empresa[0]){
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
      }else{
        DialogUtility.alert({
          title: "Aviso!",
          content: "Por favor Asigne una Razón Social"
        });
      }
    }
      
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
          localStorage.setItem("razonSocial",response.data.data.getEmpresas[0].razonSocial)
          this.setState({rs:response.data.data.getEmpresas[0].razonSocial})
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
    this.props.history.push("/")
  }

  render() {
    let formulario;
    let search;
 if(this.state.viewSearch===true){
  search=   
            <div style={{width:"100%",marginLeft:"40%"}}>   
            <input  type="text" id="rfc" value={this.state.rfc} name="rfc"  onChange={this.onChangeInput}   placeholder="RFC de la Empresa" />
            <MDBBtn gradient="aqua" rounded size="sm" onClick={e=> this.consultarDatos()}  >                        
              <MDBIcon icon="search" />
            </MDBBtn>  
            </div>
        
  }

 let titulo = <strong><h5>Registrar Administrador</h5></strong>

    return (
      <React.Fragment>
        <Navbar />
        <div style={{width:"70%",marginTop:"1%",marginLeft:"15%"}}>
          <Card title ={titulo}>
          <Paper>
            <MDBRow>
              <MDBCol size="5">
                <MDBCard style={{ width: "20rem"}}>
                  <MDBCardImage
                    className="img-fluid"
                    src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    waves
                  />
                </MDBCard>
              </MDBCol>
              <MDBCol size="6" style={{ marginTop: "2%"}}>
                <Form onSubmit={this.onSubmitBtn}>
                  <div>
                    <Row>
                      <MDBCol md="5"></MDBCol>
                      {search}
                    </Row>
                    <MDBCol style={{marginTop:"6%"}}>
                    <Row>        
                    <MDBCol md="6"> <h6><strong>Razón Social:</strong></h6></MDBCol>
                    <strong><Label>{this.state.rs || "Razon social no ingresada"}</Label></strong>
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
                     </MDBCol>                    
                  </div>                  
                </Form>
              </MDBCol>
            </MDBRow>
          </Paper>
          </Card>
          </div>
      </React.Fragment>
    );
  }
}
export default signupAdminAlfa;
