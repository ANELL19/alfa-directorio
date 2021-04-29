import React, {Component} from 'react'
import {Form} from 'reactstrap';
import {  MDBRow, MDBCol, MDBBtn,MDBCard,MDBAlert, MDBCardBody} from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'

class signupAdmin extends Component{
    constructor(props){
        super(props)
        this.state ={
            nombre:"",
            apellidos:"",
            razonSocial:"", 
            RFC:"",
            telefono:"",
            correo:"",
            contrasena:"",  
            statusCorreo:""        
        } 
        this.regresar = this.regresar.bind(this)     
    }     
    regresar(){
        this.props.history.push("/dashbordAdminGral")
    } 
    onChangeInput =(e)=>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }   
    onSubmitBtn = async (e)=>{  
        e.preventDefault();  
        const API='http://localhost:4000/graphql'   
        let empresasRegistradas;
        let empresasAutorizadas;       
       const idAdminGral = localStorage.getItem("idadminGral")
             await  axios({
                url:API,
                method:'post',
                data:{
                    query:`
                    query{
                      getValidation(data:"${[idAdminGral]}"){      
                          id                          
                         } 
                    }
                    `
                }   
                 })
               .then(response=>{  
                  empresasRegistradas = parseInt(response.data.data.getValidation.id)
                  empresasAutorizadas = parseInt(localStorage.getItem("paquetesdeAdmonGral"))         
                  })
             .catch(err=>{
                      console.log('error',err.response)
               })  
              //  console.log("empresasRegistradas",empresasRegistradas,"empresasAutorizadas",empresasAutorizadas)
               if(empresasRegistradas < empresasAutorizadas){                  
                  const idAdminGral  = localStorage.getItem("idadminGral")                  
                   axios({
                      url:API,
                      method:'post',
                      data:{
                          query:`
                         query{
                          signupAdmin(data:"${[this.state.nombre.toUpperCase(),this.state.apellidos.toUpperCase(),this.state.razonSocial.toUpperCase(), this.state.RFC.toUpperCase(),this.state.telefono.toUpperCase(),this.state.correo.toUpperCase(),this.state.contrasena,idAdminGral]}"){             
                                message
                              } 
                          }
                          `
                      }   
                       })
                     .then(response=>{
                       if(response.data.data.signupAdmin.message == "el registro en signup fue exitoso"){
                        DialogUtility.alert({
                          title:'Aviso!' ,
                          content:"La empresa se ha registrado exitosamente"
                        }); 
                       }else if (response.data.data.signupAdmin.message =="ya se encuentra registrado"){
                        DialogUtility.alert({
                          title:'Aviso!' ,
                          content:"Estimado usuario, el RFC que ha proporcionado ya se encuentra registrado, verifique sus datos e intentelo nuevamente"
                       }); 
                       }else {
                        DialogUtility.alert({
                          title:'Aviso!' ,
                          content:"Algo salió mal"
                        }); 
                       }                     
                        })                        
                   .catch(err=>{
                            console.log('error',err.response)
                        }) 
                 } 
                 else  {
                  DialogUtility.alert({
                    title:'Aviso' ,
                    content:`Estimado usuario, usted ya cuenta con ${empresasRegistradas} empresas registradas, su paquete máximo es de ${empresasAutorizadas} empresas autorizadas, por favor comuniquese con su ejecutivo de ADS  para ampliar su paquete.`
                  });          
                 }
                }
 render(){
  return(
      <React.Fragment>    
          <div style={{marginTop:"2%", marginLeft:"15%"}}>
          <MDBCol md="15">
          <MDBCard narrow style={{width:"80%",heigth:"60%"}}>                           
            <MDBAlert color="primary"  className="h5 text-center mb-4" >
              <strong> Registrar Administradores</strong>
            </MDBAlert>
                <MDBCardBody>
                <Form onSubmit={this.onSubmitBtn}>   
                    <MDBRow > 
                        <MDBCol md="3" className="mb-3"> 
                              <label htmlFor="nombre">Nombre (s):</label>
                              <input           
                                  id="nombre"
                                  type="text"
                                  name="nombres"
                                  onChange={this.onChangeInput}
                                  value={this.state.pass}
                                  required 
                                  className="form-control"/>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3"> 
                              <label htmlFor="Apellidos:">Apellidos: </label>
                              <input  
                                  icon="user"	
                                  id="apellido"
                                  type="text"
                                  name="apellido"
                                  onChange={this.onChangeInput}
                                  value={this.state.pass}
                                  required 
                                  className="form-control"/>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">        
                              <label htmlFor="Razón social:">Razón social:</label>
                              <input 
                                  icon="city"				
                                  id="razonSocial"
                                  type="text"
                                  name="razonSocial"			
                                  onChange={this.onChangeInput}
                                  value={this.state.pass} 
                                  required
                                  className="form-control"/>           
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">   
                              <label htmlFor="RFC:">RFC:</label>
                              <input            
                                icon="user"	
                                id="RFC"
                                type="text"
                                name="RFC"
                                onChange={this.onChangeInput}
                                value={this.state.pass}
                                required
                                className="form-control"/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="3" className="mb-3">    
                              <label htmlFor="defaultFormLoginPasswordEx">Teléfono:</label>
                              <input 
                                icon="phone"		 
                                id="telefono"
                                type="number"
                                name="telefono"
                                onChange={this.onChangeInput}
                                value={this.state.pass}	
                                required
                                className="form-control"/>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">   
                              <label htmlFor="defaultFormLoginEmailEx">Correo:</label>
                              <input   
                                  icon="envelope"
                                  id="correo"
                                  type="email"
                                  name="correo"
                                  onChange={this.onChangeInput}
                                  value={this.state.pass}
                                  required
                                  className="form-control" />
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">   
                              <label htmlFor="defaultFormLoginPasswordEx">Contraseña:</label>
                              <input
                                  icon="lock" 		
                                  id="contrasena"
                                  type="password"
                                  name="contrasena"
                                  onChange={this.onChangeInput}
                                  value={this.state.pass}
                                  validate 
                                  required 
                                    className="form-control"/>
                        </MDBCol>             
                    </MDBRow>
             <br></br>
             <div className="text-center">
              <MDBBtn   color="info"  type="submit"> Guardar</MDBBtn>
              <MDBBtn color="secondary"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
              </div> 
             </Form>
               </MDBCardBody>
          </MDBCard>
          </MDBCol>
          </div>
        </React.Fragment>
      )
  }
}export default signupAdmin