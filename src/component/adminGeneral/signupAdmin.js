import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row,Col,Alert} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
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


     // console.log("contraseña" , this.state.contrasena)
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
              //   console.log("response" , response)
                 
                  empresasRegistradas = parseInt(response.data.data.getValidation.id)
                  empresasAutorizadas = parseInt(localStorage.getItem("paquetesdeAdmonGral"))         
                  })
             .catch(err=>{
                      console.log('error',err.response)
               })  
    
               console.log("empresasRegistradas",empresasRegistradas,"empresasAutorizadas",empresasAutorizadas)
               
               if(empresasRegistradas < empresasAutorizadas){   

               
                  const idAdminGral  = localStorage.getItem("idadminGral")
                       
                                             
                  
                  axios({
                      url:API,
                      method:'post',
                      data:{
                          query:`
                         query{
                          pruebaUser(data:"${[this.state.nombre.toUpperCase(),this.state.apellidos.toUpperCase(),this.state.razonSocial.toUpperCase(), this.state.RFC.toUpperCase(),this.state.telefono.toUpperCase(),this.state.correo.toUpperCase(),this.state.contrasena,idAdminGral]}"){             
                                
                                message

                               } 
                          }
                          `
                      }   
                       })
                     .then(response=>{
                       if(response.data.data.pruebaUser.message == "el registro en signup fue exitoso"){
                        DialogUtility.alert({
                          title:'Aviso!' ,
                          content:"La empresa se ha registrado exitosamente"
                        }); 
                       }else if (response.data.data.pruebaUser.message =="ya se encuentra registrado"){
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
                      // console.log("data signup",response.data.data.pruebaUser.apellidos)
                      // console.log("data signup",response.data.data.pruebaUser.razonSocial)
                      // console.log("data signup",response.data.data.pruebaUser.rfc)

                                         
                          // window.location.reload();
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
        <Paper elevation={3}  style={{width:550, height:600, display:"center", justifyContent:"stretch",marginLeft:400,marginTop:30,marginBottom:100}}>
        <MDBContainer>
          <MDBRow>
          <MDBCol style={{marginLeft:25,marginRight:15,marginTop:20}}>
            <Form  onSubmit={this.onSubmitBtn}>
            <Alert color="primary">
              <a  style={{marginTop:20,marginLeft:120}}>
                Registrar Administradores
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
                  label="apellidos" 
                  icon="user"	
                  id="apellidos"
                  type="text"
                  name="apellidos"
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
                  label="RFC" 
                  icon="user"	
                  id="RFC"
                  type="text"
                  name="RFC"
                  onChange={this.onChangeInput}
                  value={this.state.pass}
                  required
                />       
                <MDBInput 
                  label="Teléfono" 
                  icon="phone"		 
                  id="telefono"
                  type="number"
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
                      <MDBBtn outline color="danger"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
                    </div>    
            </Form>
          </MDBCol>
          </MDBRow>
          </MDBContainer>
          </Paper>
          </React.Fragment>
    )
}

}export default signupAdmin