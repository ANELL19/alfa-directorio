
import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import {  Form, Row } from "reactstrap";
import { MDBRow,MDBCol,MDBBtn,MDBInput,MDBCard } from "mdbreact";
import { MDBCardImage } from "mdbreact";
import axios from "axios";
import { API } from "../Graphql/Graphql";
import {Card} from 'antd'

class ClientesADS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa:" ",
      rfc:""           
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
     let fk_empresa =  localStorage.getItem("fk_empresa")     
     console.log("datos",empresa,rfc,fk_empresa)
if( empresa && rfc ){
       axios({
      url: API,
      method: "post",
      data: {
        query: `
                mutation{
                  insertClientesAlfa(data:"${[empresa,rfc,fk_empresa]}"){  
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
        title: "Complete los campos"
      });      
    }   
  };
  
  onClear = () => {
    this.setState({
      empresa:" ",
      rfc:"",        
    });
  } 

  render() {
    let titulo =  <strong><h4>Registrar Nuevo Cliente</h4></strong>
    return (
      <React.Fragment>         
           <div style={{width:"70%",marginTop:"1%",marginLeft:"15%"}}>
            <Card title={titulo}>
            <MDBRow >           
              <MDBCol size="5">
              <MDBCard style={{ width: "20rem"}}>
                <MDBCardImage className="img-fluid"
                 src="https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                 waves />
              </MDBCard>
              </MDBCol>
              <MDBCol size="6" style ={{marginTop:"8%"}}>

              <Form  onSubmit={this.onSubmitBtn}>                
              <Row > 
              <MDBCol md="6">
            <MDBInput
              label="Razón Social"
              icon="user-tie"
              id="empresa"
              type="text"
              name="empresa"
              onChange={this.onChangeInput}
              value={this.state.empresa}              
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
            />
          </MDBCol>
              
              </Row >
          <div className="text-center">
          <MDBBtn color="info" type="submit">Guardar</MDBBtn>
          <MDBBtn color="danger" onClick={this.onClear} type="submit">Borrar</MDBBtn>                   
          </div>    
            </Form>
              </MDBCol>           
            </MDBRow>
            </Card> 
            </div>          
      </React.Fragment>
    );
  }
}
export default ClientesADS;