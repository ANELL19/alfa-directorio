import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row,Col,Alert} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBCard,MDBAlert, MDBCardBody, MDBCardHeader } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import {  FormGroup, Input } from 'reactstrap';
import { DesktopWindows } from '@material-ui/icons';
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
            success:false
                
        } 
        this.regresar = this.regresar.bind(this)     
    }   
    componentWillMount(){
      this.validate();
    }
    validate= async()=>{
       
       await this.setState({nombre:localStorage.getItem("nombre")})
       await this.setState({apellido:localStorage.getItem("apellido")})
       await this.setState({razonSocial:localStorage.getItem("razonSocial")})
       await this.setState({RFC:localStorage.getItem("RFC")})
       await this.setState({telefono:localStorage.getItem("telefono")})
       await this.setState({correo:localStorage.getItem("correo")})
       localStorage.removeItem("nombre")
       localStorage.removeItem("apellido")
       localStorage.removeItem("razonSocial")
       localStorage.removeItem("RFC")
       localStorage.removeItem("telefono")
       localStorage.removeItem("correo")
       localStorage.removeItem("contraseña")
       localStorage.removeItem("fk_paquetes")
    }
    

    regresar(){
        this.props.history.push("/dashboardAlfa")
    } 
    onChangeInput =(e)=>{
     //   console.log("eventoonChange" , e)
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
               
       // this.setState({ [e.target.name]: e.target.value });

    //    if(this.state.nombre && this.state.apellido && this.state.RFC && this.state.razonSocial && this.state.telefono && this.state.correo && this.state.contrasena && this.state.fk_paquetes !="Ya seleccionado"){
    //     function ValidateEmail(sEmail) {
    //         var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
          
    //         if(!sEmail.match(reEmail)) {
    //           return false;
    //         }
          
    //         return true;
          
    //       }
    //       if(this.state.rfc.length >= 12 && this.state.rfc.length < 14){
    //         if(ValidateEmail(this.state.correo)===true){
    //             if(this.state.contrasena.length >= 8){
    //                 if(this.state.nombre.length > 2 && this.state.apellido.length > 2 && this.state.razonSocial.length > 2 && this.state.telefono.length >= 8 ){
    //                     this.setState({success:true});
    //                 }else{
    //                     alert("Alguno de los datos ingresados no cumple con los requisitos")
    //                 }
    //             }else{
    //                 alert("Su contraseña debe contener al menos 8 caracteres")
    //             }
    //         }else{
    //             alert("El correo electrónico no cumple los requisitos")
    //         }
    //       }else{
    //           alert("El RFC no es válido ")
    //       }
         
    //   }else{
    //     this.setState({open:true});
    //   }
    // }
    //  handleClose = (e) =>{
    //    this.setState({open:false})
    //  }  
    //  handleSuccess= ()=>{
    //    this.setState({success:false})
      }
    onSubmitBtn = (e)=>{
     // console.log("contraseña" , this.state.contrasena)
        e.preventDefault();  
        const API='http://localhost:4000/graphql'   
        var id = localStorage.getItem("id")

        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                    signupAdminGeneral(data:"${[this.state.nombre.toUpperCase(),this.state.apellido.toUpperCase(),this.state.razonSocial.toUpperCase(), this.state.RFC.toUpperCase(),this.state.telefono.toUpperCase(),this.state.correo.toUpperCase(),this.state.contrasena,this.state.fk_paquetes,id]}"){             
                 
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
            //  Windows.location.reload();
                //this.props.history.push("/home_admin")
              
        })
         .catch(err=>{
                  console.log('error',err.response)
              })  
    }
render(){
    return(
        <React.Fragment>
          <Navbar/>
          <div style={{marginTop:"2%"}}>
          <MDBCol md="10">
          <MDBCard narrow style={{width:"80%",heigth:"60%"}}  >
                            {/* <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-3 mx-5 mb-4">
                            <h6 className="mt-2"><strong>Datos del cliente</strong></h6>
                            </MDBCardHeader> */}
                               <MDBAlert color="primary"  className="h5 text-center mb-4" >
       
      
                               <strong>Datos del cliente</strong>
       </MDBAlert>
                            <MDBCardBody>
                            <Form onSubmit={this.onSubmitBtn}>   

  <MDBRow >
    
      
      <MDBCol md="3" className="mb-3"> 
        {/* <p className="h4 text-center mb-4">!Hola de nuevo¡<h6>Inicia sesión con tu correo
electrónico</h6></p>
<br /> */}

        <label htmlFor="nombre" >
         Nombre (s):
        </label>
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

        <label htmlFor="defaultFormLoginPasswordEx" >
         Apellidos:
        </label>
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

       
        <label htmlFor="defaultFormLoginPasswordEx" >
         Razon social:
        </label>
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
        <label htmlFor="defaultFormLoginPasswordEx" >
         RFC:
        </label>
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
        <label htmlFor="defaultFormLoginPasswordEx" >
         Telefono:
        </label>
        <input 
           icon="phone"		 
           id="telefono"
           type="number"
           name="telefono"
           onChange={this.onChangeInput}
           value={this.state.pass}	
           required
           className="form-control"
        />
        </MDBCol>
        <MDBCol md="3" className="mb-3">   
        <label htmlFor="defaultFormLoginEmailEx" >
         Correo:
        </label>
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
        <label htmlFor="defaultFormLoginPasswordEx" >
         Contraseña:
        </label>
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
              <MDBCol md="3" className="mb-3" style={{marginTop:32}}>   
        <div>
          <select 
          className="browser-default custom-select"
          type="select"
          name="fk_paquetes"
          id="fk_paquetes" 
          onChange={this.onChangeInput} 
          value={this.state.fk_paquetes}
        //  validate 
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
          <MDBBtn   color="info"   type="submit"> Guardar</MDBBtn>
          </MDBCol>
          <MDBCol md="3" className="mb-3"> 
          <MDBBtn  color="secondary"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
           </MDBCol>
         
        </MDBRow>
          </Form>
          
          </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
          </div>
  
          </React.Fragment>
    )
}

}export default signupAdminG