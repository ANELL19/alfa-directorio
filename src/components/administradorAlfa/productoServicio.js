import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import {  Form, Row } from "reactstrap";
import { MDBContainer,MDBRow,MDBCol,MDBBtn,MDBInput,MDBCard,MDBAlert,MDBIcon } from "mdbreact";
import { MDBCardImage } from "mdbreact";
import axios from "axios";
import { API } from "../Graphql/Graphql";
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBLink } from 'mdbreact';
import CargaMasiva from './registrarCliente'
// import RegistraClientes from './signupClientes'
import {Card} from 'antd'

class ProductoServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
        concepto:" ",
        precio:"",
    //   nombre: "",
    //   apellido: "",
    //   correo1: "",
    //   correo2: "",
    //   telefono1: "",
    //   telefono2: "",
      tablas:[],
      fk_empresa:[],
      activeItem: "1"           
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
     let concepto = this.state.concepto.toUpperCase();
     let precio = this.state.precio.toUpperCase();
    //  let nombre = this.state.nombre.toUpperCase();
    //  let apellido = this.state.apellido.toUpperCase();
    //  let correo1 = this.state.correo1
    //  let correo2 = this.state.correo2
    //  let telefono1 = this.state.telefono1
    //  let telefono2 = this.state.telefono2

       axios({
      url: API,
      method: "post",
      data: {
        query: `
                mutation{
                   insertClientes(data:"${[concepto,precio]}"){           
                 
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
      concepto:" ",
      precio:"",
        
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
    let titulo =  <strong><h4>Registrar Servicio o Producto</h4></strong>

    const { activeItemPills } = this.state;
    let formulario;

    formulario =
      <Card title ={titulo}>
      <Row> 
      <MDBCol md="6">
            <MDBInput
              label="Producto o Servicio"
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
              label="Concepto"
              icon="pencil-alt"
              id="concepto"
              type="text"
              name="concepto"
              onChange={this.onChangeInput}
              value={this.state.concepto}
              required
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="Precio"
              icon="user"
              id="precio"
              type="text"
              name="precio"
              onChange={this.onChangeInput}
              value={this.state.precio}
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
                <div style={{marginTop:"1%",marginLeft:"1%"}}>
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
                </div>
                <div style={{marginLeft:"9%",marginTop:"1%"}}>
                <MDBTabContent activeItem={activeItemPills}>
                  <MDBTabPane tabId='1'>
                  <MDBContainer>
                      <MDBRow>
                        <MDBCol size="4">
                          <MDBCard style={{ width: "22rem",heigth:"25rem"}}>
                            <MDBCardImage
                              className="img-fluid"
                              src="https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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
                  </MDBTabPane>
                  <MDBTabPane tabId='2'>                   
                    <CargaMasiva/>
                  </MDBTabPane>
                </MDBTabContent>
                </div>

            </MDBCol>
          </MDBRow>
      </div>      
      </React.Fragment>
    );
  }
}
export default ProductoServicio;
