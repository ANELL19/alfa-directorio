import React from 'react'
import {MDBBtn,MDBCard,MDBCardBody,MDBCardFooter,MDBAlert,MDBView,MDBContainer,MDBModalHeader} from 'mdbreact';
import {Form,Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {Grid  } from '@material-ui/core';
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {   MDBCardTitle, MDBCol } from 'mdbreact';
import { Height } from '@material-ui/icons';
import { align } from '@progress/kendo-drawing';
import Paper from '@material-ui/core/Paper';
import style from './style.css'
import { Button, Card, CardBody, CardText, CardGroup, CardTitle } from 'reactstrap';
import Navbar from '../paneldeConection/navbar'


  function onSubmit (values) {
  };
    class Validacion extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
         
          }
          this.cerrar = this.cerrar.bind(this) 
        }
        cerrar(){
          this.props.history.push("/dashboard")
      } 


    ingresar(values){
        console.log("values" , values)
        if(values.contraseña == "admin"){
           this.props.history.push("/")     
        }else if(!values.contraseña){
            // alert("Por favor ingrese algun valor")

            DialogUtility.alert({
            title: "Por favor ingrese algun valor"                       
             });       
        }else{
            // alert("Contraseña incorrecta")
            DialogUtility.alert({
            title: "Contraseña incorrecta"                       
             });
        }
    }    

     render() {    
  
          return (
            <React.Fragment>
            <Navbar/>    
            {/* <div style={{marginLeft:"10%",marginTop:"2%"}}> */}
             <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                      
                      <div id="apppages1">
                         <MDBView>
                         <MDBContainer  style={{ marginTop:"5%"}} >                             
                              <MDBCol md="6">
                            <Paper >  
                              <Button  onClick={this.cerrar} close />
                                <MDBModalHeader >Ingrese la Contraseña </MDBModalHeader>
                                <MDBCardBody> 
                                 <center>  
                                  <MDBAlert color="primary"  >
                                <strong><i>Ingrese la Contraseña para Registrar un Administrador</i>  </strong> 
                                </MDBAlert>                     
                                <Grid item xs={7}>                                                             
                                <Field
                                fullWidth
                                required
                                name="contraseña"
                                component={TextField}
                                type="password"
                                label="Clave de acceso"
                                /> 
                                </Grid>                               
                                <MDBBtn 
                                color="info"
                                size="md"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) =>this.ingresar(values)}>Ingresar </MDBBtn>
                               </center>
                                </MDBCardBody>                                                           
                            </Paper> 
                            </MDBCol > 
                            </MDBContainer>
                             </MDBView>
                            </div>
                          
                      </form>
                     
                    )}
                  />
                  {/* </div> */}
            </React.Fragment>
          );
        }
      }
      export default Validacion