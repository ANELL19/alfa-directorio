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

class RegistrarProductoServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo:"",
      concepto:"",
      precio:"",
      claveProducto:" "      
    };  
  }

  onChangeInput = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

//  componentWillUnmount(){
  
//   }
 

  onSubmitBtn = (e) => {
    e.preventDefault();
    let tipo = this.state.tipo
    let concepto = this.state.concepto
    let precio = this.state.precio
    console.log("datos",tipo,concepto,precio)
    if(tipo && concepto && precio ){
      axios({
        url: API,
        method: "post",
        data: {
          query: `
                  mutation{
                    insertProductoServicio(data:"${[tipo,concepto,precio]}"){           
                   
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
         
    }else{
      DialogUtility.alert({
        title: "Aviso!",
        content: "Por favor acomplete los campos"
      });
    }      
  };

  render() {
 let titulo = <strong><h4>Registrar Productos y Servicios</h4></strong>

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
                    src="https://images.pexels.com/photos/6120166/pexels-photo-6120166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    waves
                  />
                </MDBCard>
              </MDBCol>
              <MDBCol size="6" style={{ marginTop: "2%"}}>
                <Form onSubmit={this.onSubmitBtn}>
                  <div>                    
                    <MDBCol style={{marginTop:"6%"}}>
                    <Row>           
                    <MDBCol md="6" style={{ marginTop: "5%" }}>                                   
                      <select
                        className="browser-default custom-select"
                        type="select"
                        name="tipo"
                        id="tipo"
                        onChange={this.onChangeInput}
                        value={this.state.tipo}
                      >
                        <option value="SERVICIO">SERVICIO</option>
                        <option value="PRODUCTO SERVICIO">PRODUCTO SERVICIO</option>
                      </select>                                  
                  </MDBCol>
                        <MDBCol md="6">
                          <MDBInput
                            label="concepto"
                            id="concepto"
                            icon="pencil-alt"
                            type="text"
                            name="concepto"
                            onChange={this.onChangeInput}
                            value={this.state.concepto}
                          />
                        </MDBCol>
                      </Row> 
                      <Row>
                        <MDBCol md="6">
                          <MDBInput
                            label="precio"
                            icon="dollar-sign"
                            id="precio"
                            type="number"
                            name="precio"
                            onChange={this.onChangeInput}
                            value={this.state.precio}                            
                          />
                        </MDBCol>
                        <MDBCol md="6">
                                   <MDBInput
                                     label="Clave del Producto "
                                     icon="barcode"
                                     id="claveProducto "
                                     type="text"
                                     name="claveProducto "
                                     onChange={this.onChangeInput}
                                     value={this.state.claveProducto}
                                     disabled
                                   />
                                 </MDBCol>
                       
                                             
                    </Row> 
                  <div className="text-center">
                        <MDBBtn color="info" type="submit">                   
                          Guardar
                        </MDBBtn>
                        <MDBBtn
                          color="danger"
                          // onClick={e=>this.regresar()}
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
export default RegistrarProductoServicio;