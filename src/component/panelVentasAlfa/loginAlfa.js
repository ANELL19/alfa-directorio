import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import { DialogUtility } from '@syncfusion/ej2-popups';

// import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
// import '../../node_modules/@syncfusion/ej2-react-buttons/styles/material.css';
import {Form} from 'reactstrap';

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
        localStorage.removeItem("Token")

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
                    localStorage.setItem("Token",response.data.data.loginAdminAlfa.token)
                    // alert(`Bievenido ${response.data.data.login.nombre}`)
                    // localStorage.setItem("fk_paquetes",response.data.data.loginAdminGeneral.fk_paquetes)

                    DialogUtility.alert({
                        title:'Bienvenido' ,
                        content: "inicio de sesión exitoso!",
                    });
                   
                    this.props.history.push("/dahboardAlfa")
                }
                else if(response.data.data.loginAdminAlfa.message=="usuario y contraseña incorrecto"){
                    // alert("usuario y contraseña incorrectos")
                    DialogUtility.alert({
                        title: 'usuario y contraseña incorrectos'
                       
                    });
                    
                }else {
                  //  alert("Algo salio mal, por favor vuelva a intentarlo")
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
            <Paper elevation={3} style= {{width:350, height:400,marginLeft:750,marginTop:80}}>
        <MDBRow >            
            <MDBCol style={{marginLeft:50, marginTop:20,marginRight:50}} > 
                <Form onSubmit={this.onSubmitBtn}  >
                    <p className="h5 text-center mb-4">¡Bienvenido!</p>
                        <br></br>  
                    <div className="grey-text">
                      <MDBInput 
                            label="correo" 
                            icon="envelope"              
                            type="email"
                            name="user"
                            id="user"
                            onChange={this.onChangeInput}
                            value={this.state.user}
                            required                            
                            />                            
                      <MDBInput 
                            label="contraseña"
                            icon="lock"        
                            type="password"
                            name="password" 
                            id="pass"
                            placeholder="password"
                            onChange={this.onChangeInput}
                            value={this.state.pass}
                            required
                            />                                    
                            </div>                
                       <div className="text-center">
                        <MDBBtn color="primary" type="submit">Iniciar sesión</MDBBtn>
                       </div>
                </Form>
            </MDBCol >  
        </MDBRow>
            </Paper>          
        </React.Fragment>
        )
    }
}
export default loginAlfa