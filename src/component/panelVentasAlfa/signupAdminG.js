import React, {Component} from 'react'
import { MDBRow, MDBCol, MDBBtn,MDBCard,MDBAlert, MDBCardBody } from 'mdbreact';
import {Form } from 'reactstrap'
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import {API} from '../Graphql'
import Navbar from './navbar'

class signupAdminG extends Component{
    constructor(props){
        super(props)
        this.state ={
            nombre:"",
            apellido:"",
            razonSocial:"", 
            RFC:"",
            telefono:"",
            correo:"",
            contrasena:"",  
            fk_paquetes:"",
            open:false,
            success:false,
            form :true,                
        } 
        this.regresar = this.regresar.bind(this)     
    }   
    regresar(){
        this.props.history.push("/dahboardAlfa")
    } 
    onChangeInput =(e)=>{
     //   console.log("eventoonChange" , e)
        const {id,value} = e.target;
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ [id]:value }) 
      }
      
    onSubmitBtn = (e)=>{  
        // e.preventDefault();  
        // e.target.className += " was-validated";

        // let nombre = this.state.nombre.toUpperCase();
        // let apellido = this.state.apellido.toUpperCase();
        // let razonSocial = this.state.razonSocial.toUpperCase().replace(/,/g, "");
        // let RFC = this.state.RFC.toUpperCase();
        // let telefono = this.state.telefono.toUpperCase();
        // let correo = this.state.correo;
        // let contraseña = this.state.contrasena;
        // let paquetes = this.state.fk_paquetes;  
      // console.log("Datos",nombre,apellido,razonSocial,RFC,telefono,correo,contraseña,paquetes)      
      
    // if(RFC.length>= 12 && RFC.length < 14){ 
    //   if(contraseña.length>=8){
    //     if(nombre.length > 2 && apellido.length > 2 && razonSocial.length > 2 && telefono.length >= 8 && paquetes ){
    //       this.setState({form:true})
    //     }else{
    //       DialogUtility.alert({
    //                     title:'AVISO !' ,
    //                     content: "Alguno de los datos ingresados no cumple con los requisitos",
    //                 });  
    //     }

    //   }else{
    //     DialogUtility.alert({
    //                 title:'AVISO !' ,
    //                 content: "Su contraseña debe contener al menos 8 caracteres",
    //             });  
    //   }

    // }else{
    //   DialogUtility.alert({
    //                   title:'AVISO !' ,
    //                  content: "Estimado usuario, El RFC no es válido ",
            

    // })

    // }


        let id = localStorage.getItem("id");
        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                    signupAdminGeneral(data:"${[this.state.nombre.toUpperCase(),this.state.apellido.toUpperCase(),this.state.razonSocial.toUpperCase().replace(/,/g, ""), this.state.RFC.toUpperCase(),this.state.telefono.toUpperCase(),this.state.correo,this.state.contrasena,this.state.fk_paquetes,id]}"){             
                        message
                     } 
                }
                `
            }   
             })
           .then(response=>{
              //  if(response.data.data.signup.message==="registro exitoso"){
              DialogUtility.alert({
                  title:'Registro exitoso'                   
              });
              window.location.reload();
            //  Windows.location.reload();
                //this.props.history.push("/home_admin")              
        })
         .catch(err=>{
                  console.log('error',err.response)
              })  
           }
  
 

render(){
  let form;
    if(this.state.form == true){
      form=  <div style={{marginTop:"2%", marginRight:"10%", marginLeft:"10%"}}>
          <center>
          <MDBCard narrow style={{width:"80%",heigth:"60%"}}>                          
            <MDBAlert color="primary"  className="h5 text-center mb-4" ><strong>Registro de clientes nuevos</strong> </MDBAlert>
            <MDBCardBody>
            <Form className="needs-validation" onSubmit={this.onSubmitBtn} >   
            <MDBRow >      
                <MDBCol md="3" className="mb-3">     
                  <label htmlFor="nombre" >Nombre (s): </label>
                  <input           
                      id="nombre"
                      type="text"
                      name="nombres"
                      onChange={this.onChangeInput}
                      value={this.state.nombre}
                      required 
                      className="form-control"/>
                </MDBCol>
                <MDBCol md="3" className="mb-3"> 
                  <label htmlFor="defaultFormLoginPasswordEx">Apellidos:</label>
                  <input  
                      icon="user"	
                      id="apellido"
                      type="text"
                      name="apellido"
                      onChange={this.onChangeInput}
                      value={this.state.apellido}
                      required 
                      className="form-control"/>
                </MDBCol>
                <MDBCol md="3" className="mb-3">        
                  <label htmlFor="defaultFormLoginPasswordEx" >Razon social:</label>
                  <input 
                      icon="city"				
                      id="razonSocial"
                      type="text"
                      name="razonSocial"			
                      onChange={this.onChangeInput}
                      value={this.state.razonSocial} 
                      required
                      className="form-control"/>        
                </MDBCol>
                <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginPasswordEx">RFC:</label>
                  <input            
                    icon="user"	
                    id="RFC"
                    type="text"
                    name="RFC"
                    onChange={this.onChangeInput}
                    value={this.state.RFC}
                    required
                    className="form-control"/>
                </MDBCol>
                </MDBRow>

                <MDBRow>
                <MDBCol md="3" className="mb-3">    
                    <label htmlFor="defaultFormLoginPasswordEx">Telefono:</label>
                    <input 
                      icon="phone"		 
                      id="telefono"
                      type="number"
                      name="telefono"
                      onChange={this.onChangeInput}
                      value={this.state.telefono}	
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
                        value={this.state.correo}
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
                        value={this.state.contrasena}
                        validate 
                        required 
                        className="form-control"/>                     
                </MDBCol>
                <MDBCol md="3" className="mb-3" style={{marginTop:32}}>   
                  <div>
                    <select 
                    className="browser-default custom-select"
                    type="select"
                    name="fk_paquetes"
                    id="fk_paquetes" 
                    onChange={this.onChangeInput} 
                    value={this.state.fk_paquetes}                
                    required >
                    <option>Seleccione su paquete</option>
                    <option value="1">1 empresa</option>
                    <option value="2">3 empresas</option>
                    <option value="3">5 empresas</option>
                    <option value="4">10 empresas</option>
                    <option value="5">20 empresas</option>
                  </select>
                  </div>               
                  </MDBCol>  
                  </MDBRow>
                
                <MDBRow style={{marginTop:"10%"}}> 
                  <MDBCol md="3" className="mb-3"></ MDBCol>
                    
                  <MDBCol md="3" className="mb-3">      
                    <MDBBtn   color="info" type="submit"> Guardar</MDBBtn>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">                    
                    <MDBBtn  color="secondary"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
                    </MDBCol>                  
                  </MDBRow>
              </Form>              
              </MDBCardBody>
                    </MDBCard>
                    </center>
          </div> 

    }
    return(
        <React.Fragment>
          <Navbar/>
          {form} 
        </React.Fragment>
    )
}
}export default signupAdminG