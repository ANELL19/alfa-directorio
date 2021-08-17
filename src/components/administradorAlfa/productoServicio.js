// import React, { Component } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
// import { DialogUtility } from "@syncfusion/ej2-popups";
// import { Form, Row } from "reactstrap";
// import { MDBContainer,MDBRow,MDBCol,MDBBtn,MDBInput,MDBCard,MDBIcon } from "mdbreact";
// import { MDBCardImage } from "mdbreact";
// import axios from "axios";
// import { API } from "../Graphql/Graphql";
// import { Card } from "antd";

// // function makeid() {
// //   var text = "";
// //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// //   var number = "1234567890";

// //   for (var i = 0; i < 10; i++)
// //     text += possible.charAt(Math.floor(Math.random() * possible.length));

// //   return text;
// // }

// // console.log(makeid());

// class RegistrarProductoServicio extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       select: "",
//       concepto: "",
//       precioUnitario: ""
//       // claveProducto: "",
//     };
//   }

//   onChangeInput = (e) => {
//     const { id, value } = e.target;
//     this.setState({
//       [id]: value
//     });
//   };

//   onSubmitBtn = (e) => { 
//     let tipo = this.state.select;
//     let concepto = this.state.concepto.toUpperCase();
//     let precioUnitario = this.state.precioUnitario;
//     // let claveProducto = this.state.claveProducto  se inserta  o desde la base de datos
//     console.log("datos", tipo, concepto, precioUnitario);
//     axios({
//       url: API,
//       method: "post",
//       data: {
//         query: `
//          mutation{
//        insertProductoServicio(data:"${[tipo,concepto,precioUnitario]}"){ 
//         message
//         } 
//     }
//     `
//       }
//     })
//       .then((response) => {
//         DialogUtility.alert({
//           title: "Registro exitoso"
//         });
//       })
//       .catch((err) => {
//         console.log("error", err.response);
//       });
//   };

//   onClear = () => {
//     this.setState({
//       tipo: "",
//       concepto: "",
//       precioUnitario: "",
//       claveProducto: ""
//     });
//   };

//   render() {
//     let titulo = (
//       <strong>
//         <h4>Registrar Productos y Servicios</h4>
//       </strong>
//     );

//     return (
//       <React.Fragment>
//         <div style={{ width: "100%" }}>
//           <MDBRow>
//             <MDBCol md="12">
//               <div style={{ marginLeft: "9%", marginTop: "2%" }}>
//                 <MDBContainer>
//                   <MDBRow>
//                     <MDBCol size="4">
//                       <MDBCard style={{ width: "22rem", heigth: "25rem" }}>
//                         <MDBCardImage
//                           className="img-fluid"
//                           src="https://images.pexels.com/photos/6120166/pexels-photo-6120166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//                           waves
//                         />
//                       </MDBCard>
//                     </MDBCol>
//                     <MDBCol size="7">
//                       <form onSubmit={this.onSubmitBtn}>
//                         <div>
//                           <MDBCol>
//                             <Card title={titulo}>
//                               <Row>
//                                 <MDBCol md="6">
//                                   <div style={{ marginTop: "5%" }}>
//                                     <select
//                                       className="browser-default custom-select"
//                                       type="select"
//                                       name="tipo"
//                                       id="select"
//                                       onChange={this.onChangeInput}
//                                       value={this.state.select}
//                                     >
//                                       <option value="SERVICIO">SERVICIO</option>
//                                       <option value="PRODUCTO SERVICIO">
//                                         PRODUCTO SERVICIO
//                                       </option>
//                                     </select>
//                                   </div>
//                                 </MDBCol>
//                                 <MDBCol md="6">
//                                   <MDBInput
//                                     label="Concepto"
//                                     id="concepto"
//                                     icon="pencil-alt"
//                                     type="text"
//                                     name="concepto"
//                                     onChange={this.onChangeInput}
//                                     value={this.state.concepto}
//                                     required
//                                   />
//                                 </MDBCol>
//                               </Row>
//                               <Row>
//                                 <MDBCol md="6">
//                                   <MDBInput
//                                     label="Precio"
//                                     icon="dollar-sign"
//                                     id="precioUnitario"
//                                     type="number"
//                                     name="precioUnitario"
//                                     onChange={this.onChangeInput}
//                                     value={this.state.precioUnitario}
//                                     required
//                                   />
//                                 </MDBCol>
//                                 {/* <MDBCol md="6">
//                                   <MDBInput
//                                     label="Clave del Producto "
//                                     icon="barcode"
//                                     id="claveProducto "
//                                     type="text"
//                                     name="claveProducto "
//                                     onChange={this.onChangeInput}
//                                     value={this.state.claveProducto}
//                                   />
//                                 </MDBCol> */}
//                               </Row>
//                               <div className="text-center">
//                                 <MDBBtn color="info" type="submit">
//                                   Guardar
//                                 </MDBBtn>
//                                 <MDBBtn
//                                   color="danger"
//                                   onClick={this.onClear}
//                                   type="submit"
//                                 >
//                                   Borrar
//                                 </MDBBtn>
//                               </div>
//                             </Card>
//                           </MDBCol>
//                         </div>
//                       </form>
//                     </MDBCol>
//                   </MDBRow>
//                 </MDBContainer>
//               </div>
//             </MDBCol>
//           </MDBRow>
//         </div>
//       </React.Fragment>
//     );
//   }
// }
// export default RegistrarProductoServicio;



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