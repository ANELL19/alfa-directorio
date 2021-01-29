import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row,Col,Alert} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'

class signupAdminAlfa extends Component{
    constructor(props){
        super(props)
        this.state ={
            nombre:"",
            apellido:"",      
            correo:"",
            contrasena:"",  
                
        } 
        this.regresar = this.regresar.bind(this)     
    }   
    

    regresar(){
        this.props.history.push("/home_admin")
    } 
    onChangeInput =(e)=>{
        console.log("eventoonChange" , e)
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }   
    onSubmitBtn = (e)=>{
     // console.log("contraseña" , this.state.contrasena)
        e.preventDefault();  
        const API='http://localhost:4000/graphql'   

        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                    signupAlfa(data:"${[this.state.nombre,this.state.apellido,this.state.correo,this.state.contrasena]}"){             
                 
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
        <Paper elevation={3}  style={{width:550, height:600, display:"center", justifyContent:"stretch",marginLeft:400,marginTop:30,marginBottom:100}}>
        <MDBContainer>
          <MDBRow>
          <MDBCol style={{marginLeft:25,marginRight:15,marginTop:20}}>
            <Form  onSubmit={this.onSubmitBtn}>
            <Alert color="primary">
              <a  style={{marginTop:20,marginLeft:120}}>
                Registrar Administrador panel alfa
              </a>
            </Alert>     
              <div className="grey-text">
              <Row >  
                <MDBInput 
                  label="Nombre (s)" 
                  icon="user"	
                  id="nombre"
                  type="text"
                  name="nombres"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  required
                />
                <MDBInput 
                  label="apellido" 
                  icon="user"	
                  id="apellido"
                  type="text"
                  name="apellido"
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
                  label="Contraseña"
                  icon="lock" 		
                  id="contrasena"
                  type="password"
                  name="contrasena"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  validate 
                  required
                />
                </Row >
                </div>
                    <div className="text-center">
                      <MDBBtn   color="default"   type="submit"> Guardar</MDBBtn>
                      <MDBBtn  color="danger"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
                    </div>    
            </Form>
          </MDBCol>
          </MDBRow>
          </MDBContainer>
          </Paper>
          </React.Fragment>
    )
}

}export default signupAdminAlfa