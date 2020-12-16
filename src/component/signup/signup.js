import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios'

class Signup extends Component{
    constructor(props){
        super(props)
        this.state ={
            nombre:"",
            razonSocial:"", 
            telefono:"",
            correo:"",
            contrasena:"",          
        } 
        this.regresar = this.regresar.bind(this)     
    }   
    

regresar(){
    this.props.history.push("/")
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
        const API='http://localhost:4000/graphql'   
        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                    signup(data:"${[this.state.nombre,this.state.razonSocial,this.state.telefono,this.state.correo,this.state.contrasena]}"){             
                 
                    message
                     } 
                }
                `
            }   
             })
           .then(response=>{
                  console.log( 'este es el response',response)
              //  if(response.data.data.signup.message==="registro exitoso"){

                this.props.history.push("/")
       
               // }else{
               //   console.log(response.data.data.signup.message)
           //  }


            })
         .catch(err=>{
                  console.log('error',err.response)
              })  
    }
render(){
    return(
        <React.Fragment>
        <Paper elevation={3}  style={{width:350, height:500, display:"center", justifyContent:"stretch",marginLeft:400,marginTop:30,marginBottom:100}}>
        <MDBContainer>
<MDBRow>
<MDBCol style={{marginLeft:25,marginRight:15,marginTop:20}}>
  <Form  onSubmit={this.onSubmitBtn}>
    <p className="h5 text-center mb-4">Sign up</p>
    <div className="grey-text">
      <MDBInput 
        label="Nombre" 
        icon="user"	
        id="nombre"
        type="text"
        name="nombres"
        onChange={this.onChangeInput}
        value={this.state.pass}
        required
         />
      <MDBInput label="Razon Social"
        icon="city"				
        id="razonSocial"
        type="text"
        name="razonSocial"			
        onChange={this.onChangeInput}
        value={this.state.pass} 
        required
        />		 
      <MDBInput 
      label="Correo" 
      icon="envelope"
      id="correo"
      type="email"
      name="correo"
      onChange={this.onChangeInput}
      value={this.state.pass}
      required
     />
      <MDBInput 
      label="Teléfono" 
      icon="phone"		 
      id="telefono"
      type="text"
      name="telefono"
      onChange={this.onChangeInput}
      value={this.state.pass}		 
     />		 
      <MDBInput label="Contraseña"
        icon="lock" 		
        id="contrana"
        type="password"
        name="contrasena"
        onChange={this.onChangeInput}
        value={this.state.pass}
        validate 
        required/>
   </div>
    <div className="text-center">
      <MDBBtn color="primary"   type="submit"> Guardar</MDBBtn>
      <h6>¿Ya tienes una cuenta? <a href="/">Iniciar sesión</a></h6>
    </div>
    
  </Form>
</MDBCol>
</MDBRow>
</MDBContainer>
</Paper>
</React.Fragment>
    )
}

}export default Signup