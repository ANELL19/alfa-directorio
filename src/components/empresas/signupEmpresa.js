import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { CardBody, Label,Form,Row,Col,Alert} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBCard,MDBCardImage,MDBAlert } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import Navbar from '../paneldeConection/navbar'

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

    regresar(){
        this.props.history.push("/Dashboard")
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
          <Navbar/>
           <MDBContainer style={{ marginTop:"10%"}}>
            <Paper>
            <MDBRow>
              <MDBCol size="5">
              <MDBCard style={{ width: "25rem" }}>
                <MDBCardImage className="img-fluid" src="https://images.pexels.com/photos/8062272/pexels-photo-8062272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" waves />
              </MDBCard>
              </MDBCol>
              <MDBCol size="6" style ={{marginTop:"8%"}}>
              <MDBAlert color="primary" className="text-center" >
                  <h5>Registrar Empresa</h5>
              </MDBAlert>
              <Form  onSubmit={this.onSubmitBtn}>                
              <div >
              <Row > 
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
                  label="Razón Social" 
                  icon="user-tie"	
                  id="razonSocial"
                  type="text"
                  name="razonSocial"
                  onChange={this.onChangeInput}
                  value={this.state.razonSocial}
                  required
                />
                </MDBCol>
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
                  label="Telefono" 
                  icon="phone"
                  id="telefono"
                  type="number"
                  name="telefono"
                  onChange={this.onChangeInput}
                  value={this.state.telefono}
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
                </Row >
                </div>
                    <div className="text-center">
                      <MDBBtn   color="info"   type="submit"> Guardar</MDBBtn>
                      <MDBBtn  color="danger"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
                    </div>    
            </Form>
              </MDBCol>
            </MDBRow>
            </Paper>
          </MDBContainer>
          </React.Fragment>
    )
}

}export default signupEmpresas