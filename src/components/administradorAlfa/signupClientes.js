
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import {  MDBFormInline } from "mdbreact";
import { CardBody, Label, Form, Row, Col, Alert, Button } from "reactstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBModalHeader,
  MDBCard,
  MDBAlert,
  MDBIcon
} from "mdbreact";
import { MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
import axios from "axios";
import { API } from "../Graphql/Graphql";



class Clientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa:" ",
      rfc:"",
      nombre: "",
      apellido: "",
      correo1: "",
      correo2: "",
      telefono1: "",
      telefono2: "",
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


  onSubmitBtn = (e) => {
    e.preventDefault();
  

     let empresa = this.state.empresa.toUpperCase();
     let rfc = this.state.rfc.toUpperCase();
     let nombre = this.state.nombre.toUpperCase();
     let apellido = this.state.apellido.toUpperCase();
     let correo1 = this.state.correo1
     let correo2 = this.state.correo2
     let telefono1 = this.state.telefono1
     let telefono2 = this.state.telefono2

       axios({
      url: API,
      method: "post",
      data: {
        query: `
                mutation{
                   insertClientes(data:"${[empresa,rfc,nombre,apellido,correo1,correo2,telefono1,telefono2]}"){           
                 
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
        
      })
      .catch((err) => {
        console.log("error", err.response);
      });    
  };
  
  onClear = () => {
    this.setState({
      empresa:" ",
      rfc:"",
      nombre: "",
      apellido: "",
      correo1: "",
      correo2: "",
      telefono1: "",
      telefono2: ""
      
    });
  }

  regresar() {
    this.setState({viewSearch:true})
    this.setState({viewForm:false})
  }
  render() {
    let formulario;
//     let search;
//     let razonSocial=localStorage.getItem("razonSocial")
//  if(this.state.viewSearch===true){
//   search= <div>  
//             <input  type="text" id="rfc" value={this.state.rfc} name="rfc"  onChange={this.onChangeInput}   placeholder="RFC de la Empresa" />
//             <MDBBtn gradient="aqua" rounded size="sm" onClick={e=> this.consultarDatos()}  >                        
//               <MDBIcon icon="search" />
//             </MDBBtn>  
//             <br></br> 
//           </div>
//   }
    
//   if(this.state.viewForm===true){
    formulario= <div marginTop="5%">         
                 
      <Row> 
      <MDBCol md="6">
            <MDBInput
              label="Razón Social"
              icon="user-tie"
              id="empresa"
              type="text"
              name="empresa"
              onChange={this.onChangeInput}
              value={this.state.empresa}
              required
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="RFC"
              icon="pencil-alt"
              id="rfc"
              type="text"
              name="rfc"
              onChange={this.onChangeInput}
              value={this.state.rfc}
              required
            />
          </MDBCol>
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
              // icon="user"
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
              label="Correo1"
              icon="envelope"
              id="correo1"
              type="email"
              name="correo1"
              onChange={this.onChangeInput}
              value={this.state.correo1}
              required
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="Correo2"
              icon="envelope"
              id="correo2"
              type="email"
              name="correo2"
              onChange={this.onChangeInput}
              value={this.state.correo2}
              
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="telefono1"
              icon="phone"
              id="telefono1"
              type="number"
              name="telefono1"
              onChange={this.onChangeInput}
              value={this.state.telefono1}
              required
            />
          </MDBCol> 
          <MDBCol md="6">
            <MDBInput
              label="telefono2"
              icon="phone"
              id="telefono2"
              type="number"
              name="telefono2"
              onChange={this.onChangeInput}
              value={this.state.telefono2}
              
            />
          </MDBCol> 

      </Row> 
    <div className="text-center">
          <MDBBtn color="info" type="submit">                   
            Guardar
          </MDBBtn>
          <MDBBtn
            color="danger"
            onClick={this.onClear}
            type="submit"
          >
           Borrar
          </MDBBtn>                   
      </div>                      
    </div>

//  }
let id_empresa=localStorage.getItem("empresa")
console.log("esto es el  id",id_empresa)
    return (
      <React.Fragment>
      
        <MDBContainer style={{ marginTop: "2%" }}>
          <Paper>
            <MDBRow>
              <MDBCol size="5">
                <MDBCard style={{ width: "100%" }}>
                  <MDBCardImage
                    className="img-fluid"
                    src="https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    waves
                  />
                </MDBCard>
              </MDBCol>
              <MDBCol size="6" style={{ marginTop: "5%" }}>
                <MDBAlert color="primary" className="text-center">
                  <h4>Registrar Nuevo Cliente</h4>
                </MDBAlert>
                <Form onSubmit={this.onSubmitBtn}>
                  <div>
                    {/* <Row>
                      <MDBCol md="5"></MDBCol>
                      <MDBCol md="7">                        
                      {search} 
                      </MDBCol>
                      </Row> */}
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
export default Clientes;
