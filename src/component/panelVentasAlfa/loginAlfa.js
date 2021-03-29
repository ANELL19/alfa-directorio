import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBRow, MDBCol, MDBInput, MDBBtn,MDBAlert, MDBCard,MDBCardBody, MDBView} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Form,FormGroup,Label,Col,Input} from 'reactstrap';
import index from "./index.css"

class loginAlfa extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:""
        }
    }
     componentWillMount(){
        localStorage.removeItem("id")
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("correo")
        localStorage.removeItem("TokenVentasAlfa")

    }
    onChangeInput =(e)=>{
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
                query{
                    loginAdminAlfa(data:"${[this.state.user,this.state.pass]}"){
                       message
                       id
                       nombre  
                       apellido   
                       correo                                        
                       token                       
                   } 
                }
                `
            }   
             }).then(response=>{
             console.log( 'este es el response',response)
                if(response.data.data.loginAdminAlfa.message=="login exitoso"){                    
                    localStorage.setItem("id",response.data.data.loginAdminAlfa.id)                    
                    localStorage.setItem("nombre",response.data.data.loginAdminAlfa.nombre)   
                    localStorage.setItem("apellido",response.data.data.loginAdminAlfa.apellido) 
                    localStorage.setItem("correo",response.data.data.loginAdminAlfa.correo)                                
                    localStorage.setItem("TokenVentasAlfa",response.data.data.loginAdminAlfa.token)
                 
                    DialogUtility.alert({
                        title:'Bienvenido' ,
                        content: "inicio de sesión exitoso!",
                    });                   
                    this.props.history.push("/dahboardAlfa")
                }
                else if(response.data.data.loginAdminAlfa.message=="usuario y contraseña incorrecto"){                   
                    DialogUtility.alert({
                        title: 'usuario y contraseña incorrectos'                       
                    });                    
                }else {
                    DialogUtility.alert({
                        title: 'Algo salio mal, por favor vuelva a intentarlo'                       
                    });                
                }
             })
             .catch(err=>{
                 console.log('error',err)
             })
    }

     render(){
         return(
        <React.Fragment>
<div id="apppages"  >
    <MDBView>
<div style={{marginTop:"10%", marginLeft:"10%"}} >

          <MDBCol md="5">
          <MDBCard  style={{width:"82%",heigth:"50%"}}  >
         
                              
        <MDBCardBody >
        <MDBAlert color="primary"  className="h5 text-center mb-4" >
         <strong>Administrador Alfa</strong>
        </MDBAlert>
            
        <Form onSubmit={this.onSubmitBtn}>   
      
        <FormGroup row >

        
        <Label for="correo" sm={3} size="lg" >
         Correo:
        </Label>
        <Col sm={8}>
        <Input   
            
            id="user"
            type="email"
            name="user"
            onChange={this.onChangeInput}
            value={this.state.user}
            required
            className="form-control" 
            placeholder="example@.com"
            bsSize="lg"       
            />
             </Col>
            
            </FormGroup>
            <FormGroup row>
          
        <Label for="contraseña"  sm={3} size="lg">
         Contraseña:
        </Label>
        <Col sm={8}>
        <Input            		
            id="pass"
            type="password"
            name="contrasena"
            onChange={this.onChangeInput}
            value={this.state.pass}
            validate 
            required 
            bsSize="lg" 
            className="form-control"
            placeholder="contraseña"
              />
              </Col>                           
              </FormGroup >         
          <br></br>
         <div className="text-center">
             <MDBBtn   color="info"  type="submit"> iniciar sesión</MDBBtn>                     
          </div>            
          </Form> 
          </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    
          </div>
          </MDBView>
          </div>
       
        </React.Fragment>
        )
    }
}
export default loginAlfa