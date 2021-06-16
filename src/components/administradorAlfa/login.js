import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBRow, MDBCol, MDBInput, MDBBtn,MDBAlert, MDBCard,MDBCardBody, MDBView,MDBContainer,MDBIcon} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Form,FormGroup,Label,Col,Input} from 'reactstrap';
import index from "./index.css"
import {API} from '../Graphql/Graphql'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import TextField from '@material-ui/core/TextField';

class loginAdminAlfa extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:""
        }
    }
     componentWillMount(){
        localStorage.removeItem("id_admin")
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("correo")
        localStorage.removeItem("fk_empresa")
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
        // const API='http://localhost:4000/graphql'   
        axios({
            url:API,
            method:'post',
            data:{
                query:`
                query{
                    loginAdminAlfa(data:"${[this.state.user,this.state.pass]}"){
                       message
                       id_admin
                       nombre  
                       apellido   
                       correo                                        
                       token 
                       fk_empresa
                                          
                   } 
                }
                `
            }   
             }).then(response=>{
             console.log( 'este es el response',response)
                if(response.data.data.loginAdminAlfa.message=="login exitoso"){                    
                    localStorage.setItem("id_admin",response.data.data.loginAdminAlfa.id_admin)                    
                    localStorage.setItem("nombre",response.data.data.loginAdminAlfa.nombre)   
                    localStorage.setItem("apellido",response.data.data.loginAdminAlfa.apellido) 
                    localStorage.setItem("correo",response.data.data.loginAdminAlfa.correo)
                    localStorage.setItem("fk_empresa",response.data.data.loginAdminAlfa.fk_empresa)                                    
                    localStorage.setItem("TokenAdministradorAlfa",response.data.data.loginAdminAlfa.token)
                 
                    DialogUtility.alert({
                        title:'Bienvenido' ,
                        content: "inicio de sesión exitoso!",
                        position: "fixed",
                    });                   
                    this.props.history.push("/sidenavbar")
                }
                else if(response.data.data.loginAdminAlfa.message=="usuario y contraseña incorrecto"){                   
                    DialogUtility.alert({
                        title: 'usuario y contraseña incorrectos',  
                        // position: "fixed",                     
                    });                    
                }else {
                    DialogUtility.alert({
                        title: 'Algo salio mal, por favor vuelva a intentarlo',
                        // position: "fixed",                       
                    });                
                }
             })
             .catch(err=>{
                //  console.log('error',err)
             })
    }

     render(){
         return(
            <React.Fragment>
                <div id="apppages">
                    <MDBView>
                <div style={{marginTop:"8%", marginLeft:"15%"}} >
                <MDBCol md="5">
                <MDBCard  style={{width:"62%",heigth:"50%"}}>       
                          
                <MDBCardBody >
                <div className="h5 text-center mb-4">
                <h3>iniciar sesión</h3>
                <br></br>
                    <Avatar size={84} style={{ backgroundColor: '#69c0ff' }} ><font size="20" >ADS</font></Avatar>     
                </div>
                                
                <Form onSubmit={this.onSubmitBtn}> 

                <MDBRow style={{ marginLeft:"18%"}}>
                    <MDBCol md="9">
                        <MDBInput                          
                        icon="user"
                        id="user"
                        type="email"
                        name="user"
                        onChange={this.onChangeInput}
                        value={this.state.user}
                        required
                        label="Correo"
                        />                       
                        <MDBInput                         
                          icon="unlock-alt"
                          id="pass"
                          type="password"
                          name="contrasena"
                          onChange={this.onChangeInput}
                          value={this.state.pass}
                          required                         
                          label="contraseña"    
                        />
                        
                        <div className="text-center">
                        <MDBBtn color='info' type="submit" size="sm">
                        iniciar sesión                            
                        </MDBBtn>
                        </div>                    
                    </MDBCol>
                    {/* </MDBCol> */}
                </MDBRow>                             
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
export default loginAdminAlfa