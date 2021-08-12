import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import {  Form, Row } from "reactstrap";
import { MDBContainer,MDBRow,MDBCol,MDBBtn,MDBInput,MDBCard,MDBIcon } from "mdbreact";
import { MDBCardImage } from "mdbreact";
import axios from "axios";
import { API } from "../Graphql/Graphql";
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBLink } from 'mdbreact';
import {Card} from 'antd'

class RegistrarContacto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      correo1: "",
      correo2: "",
      telefono1: "",
      ext: "",
      telefono2: "",
      puesto:"", 
      activeItem: "1"        
    };  
  }

  onChangeInput = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  onSubmitBtn = (e) => {
    e.preventDefault(); 
    
     let nombre = this.state.nombre.toUpperCase();
     let apellido = this.state.apellido.toUpperCase();
     let correo1 = this.state.correo1
     let correo2 = this.state.correo2
     let telefono1 = this.state.telefono1
     let ext = this.state.ext
     let telefono2 = this.state.telefono2
     let puesto = this.state.puesto.toUpperCase();
     //agregar id_cliente  


       axios({
      url: API,
      method: "post",
      data: {
        query: `
         mutation{
          insertContacto(data:"${[nombre,apellido,correo1,correo2,telefono1,telefono2,ext,puesto]}"){           
                 
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
      nombre: "",
      apellido: "",
      correo1: "",
      correo2: "",
      telefono1: "",
      ext: "",
      telefono2: "",     
      puesto: " "     
    });
  }

  togglePills = tab => () => {
    const { activePills } = this.state;
    if (activePills !== tab) {
      this.setState({
        activeItemPills: tab
      });
    }
  };
 

  render() {
    let titulo =  <strong><h4>Registrar Nuevo Contacto</h4></strong>

    const { activeItemPills } = this.state;
    let formulario;

    formulario =
      <Card title ={titulo}>
      <Row>      
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
              label="apellidos"
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
              label="Ext."              
              id="ext"
              type="number"
              name="ext"
              onChange={this.onChangeInput}
              value={this.state.ext}              
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
          <MDBCol md="6">
            <MDBInput
              label="Puesto"
              icon="user"
              id="puesto"
              type="text"
              name="puesto"
              onChange={this.onChangeInput}
              value={this.state.puesto}              
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
      </Card>                   

//  }
    return (
      <React.Fragment>
       <div  style={{width:"100%"}} >
          <MDBRow>
            <MDBCol md='12'>
                {/* <div style={{marginTop:"1%",marginLeft:"1%"}}>
                <MDBNav className='nav-pills'>
                  <MDBNavItem>
                    <MDBLink to='#' active={activeItemPills === '1'} onClick={this.togglePills('1')} link>
                     <MDBIcon far icon="address-card" size="2x" />&nbsp;Registra Nuevo Cliente
                    </MDBLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBLink to='#' active={activeItemPills === '2'} onClick={this.togglePills('2')} link>
                     <MDBIcon icon="cloud-upload-alt" size="2x" />&nbsp;Carga de Excel
                    </MDBLink>
                  </MDBNavItem>                  
                </MDBNav>
                </div> */}
                <div style={{marginLeft:"9%",marginTop:"1%"}}>
                 {/* <MDBTabContent activeItem={activeItemPills}> 
                  <MDBTabPane tabId='1'> */}
                  <MDBContainer>
                      <MDBRow>
                        <MDBCol size="4">
                          <MDBCard style={{ width: "22rem",heigth:"25rem"}}>
                            <MDBCardImage
                              className="img-fluid"
                              src="https://images.pexels.com/photos/5797903/pexels-photo-5797903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                              waves
                            />
                          </MDBCard>
                        </MDBCol>
                        <MDBCol size="7">
                          <Form onSubmit={this.onSubmitBtn}>
                            <div>                    
                                <MDBCol>
                              {formulario}
                              </MDBCol>                    
                            </div>                  
                          </Form>
                        </MDBCol>
                      </MDBRow>
                  </MDBContainer>    
                  {/* </MDBTabPane>                  
                </MDBTabContent> */}
                </div>

            </MDBCol>
          </MDBRow>
      </div>         
      </React.Fragment>
    );
  }
}
export default RegistrarContacto;