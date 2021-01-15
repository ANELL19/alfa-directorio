import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab';
class panelRegisterClientes extends Component{

    constructor(props){
        super(props);
        this.state={

            nombre_cliente:"",
            apellidos_cliente:"",
            curp:"",
            rfc:"",
            nombreEmpresa:"",
            telefono:"",
            correo:"",
            contrasena:""
        }
    this.regresar = this.regresar.bind(this)     
}   


regresar(){
// this.props.history.push("/home_admin")
} 
    onChangeInput =(e)=>{
        // console.log("eventoonChange" , e)
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
                    insertClientes(data:"${[this.state.nombre_cliente.toUpperCase(),this.state.apellidos_cliente,this.state.curp,this.state.rfc,this.state.nombreEmpresa,this.state.telefono,this.state.correo,this.state.contrasena]}"){             
                    message
                     } 
                }
                `
            }   
             })
           .then(response=>{
              //  if(response.data.data.signup.message==="registro exitoso"){
                alert("registro exitoso")
               
                // this.props.history.push("/")
       
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
            <Paper elevation={3}  style={{width:550, height:600, display:"center", justifyContent:"stretch",marginLeft:400,marginTop:30,marginBottom:100}}>
            <MDBContainer>
    <MDBRow>
    <MDBCol style={{marginLeft:25,marginRight:15,marginTop:20}}>
      <Form  onSubmit={this.onSubmitBtn}>
        <Alert color="primary"> 
            <a  style={{marginTop:20,marginLeft:120}}>
            Registro individial clientes
            </a>
        </Alert>     
        <div className="grey-text">
            <Row >  
                <MDBInput 
                    label="Nombre (s)" 
                    icon="user"	
                    id="nombre_cliente"
                    type="text"
                    name="nombre_cliente"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    required
                />
                <MDBInput 
                    label="apellidos" 
                    icon="user"	
                    id="apellidos_cliente"
                    type="text"
                    name="apellidos_cliente"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    required
                />
                <MDBInput 
                    label="CURP" 
                    icon="user"	
                    id="curp"
                    type="text"
                    name="curp"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    required
                />
                <MDBInput 
                    label="RFC" 
                    icon="user"	
                    id="rfc"
                    type="text"
                    name="rfc"
                    onChange={this.onChangeInput}
                    value={this.state.pass}
                    required
                /> 
                <MDBInput label="nombre empresa"
                    icon="city"				
                    id="nombreEmpresa"
                    type="text"
                    name="nombreEmpresa"			
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
                <MDBBtn  outline color="info"   type="submit"> Guardar</MDBBtn>
                <MDBBtn outline color="danger"   onClick ={this.regresar} type="submit">Cancelar</MDBBtn>
              </div>
        
      </Form>
    </MDBCol>
    </MDBRow>
    </MDBContainer>
    </Paper>
    </React.Fragment>
        )
    }
}export default panelRegisterClientes