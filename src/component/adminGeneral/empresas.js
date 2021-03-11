
import React, { Component } from "react"
import NavbarDashboard from './navbarDashboard'
import MUIDataTable from "mui-datatables";
import {MDBContainer,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact'
import { Button, Table,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {  MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { CardBody, Label,Form,Row,Col,Alert} from 'reactstrap';
import modalLoginAdmin from './modal'
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'


class Empresas extends Component{
  constructor(props){
    super(props)
    this.state = {
      larazonSocial:'',
      consulta:[],
        datos:[],       
        detallesEmpresas:[],
        correoAdmin:'',
       // modal:false,
         modal12: false,
        button:false,
        user:"",
        pass:""
                
        }
    
    }
    abrirModal=()=>{
      this.setState({modal:this.state.modal})
    } 
    
    onChangeInput =(e)=>{     
        const {id,value} = e.target; 
        this.setState({
            [id]:value            
        })
    }
  
    componentWillMount(){  
     const idAdminGral = localStorage.getItem("idadminGral")   
     const API= 'http://localhost:4000/graphql'  
         axios ({
            url:API,
            method:'post',
            data:{
              query:`
                query{   
                    getTablaAdmin(data:"${[idAdminGral]}"){
                      id_admin
                      nombre
                      apellidos                      
                      razonSocial
                      rfc
                      telefono
                      correo                    
                    } 
                }
                `
            }           
             })
           .then(response => {
            this.setState({datos:response.data.data.getTablaAdmin})
            console.log("response",response.data.data.getTablaAdmin)
            let array=[];
              array.map(response.data.data.getTablaAdmin)
              console.log("algo",array)
            })
            .catch(err=>{          
            })
             this.setState({button:true})              
          }

          
    onSubmitBtn =(e)=>{        
        e.preventDefault();
        const API='http://localhost:4000/graphql'   
        let correo   =  this.state.correoAdmin;
      const  contraseña = this.state.pass;
        const correoAdmin  = localStorage.getItem("correoAdministrador")
        console.log("correo" , correo , "pass", contraseña)
            axios ({
                url:API,
                method:'post',
                data:{
                    query:`
                    query{
                      loginModalAdmin(data:"${[correoAdmin,contraseña]}"){
                           message
                           id_admin
                           nombre  
                           razonSocial
                           RFC
                           telefono
                           correo
                           statusCorreo                                            
                           token
                       } 
                    }
                    `
                }   
                 }).then(response=>{
              //  console.log( 'este es el response',response.data.data.login.message)
                    if(response.data.data.loginModalAdmin.message=="login exitoso"){                    
                        localStorage.setItem("id_admin",response.data.data.loginModalAdmin.id_admin)                    
                        localStorage.setItem("nombre",response.data.data.loginModalAdmin.nombre)
                        localStorage.setItem("razonSocial",response.data.data.loginModalAdmin.razonSocial)
                        localStorage.setItem("telefono",response.data.data.loginModalAdmin.telefono)
                        localStorage.setItem("correo",response.data.data.loginModalAdmin.correo)                            
                        localStorage.setItem("TokenAdmin",response.data.data.loginModalAdmin.token)
                        // alert(`Bievenido ${response.data.data.login.nombre}`)
                        DialogUtility.alert({
                            title:'Bienvenido' ,
                            content: "inicio de sesión exitoso!",
                        });
                       
                        this.props.history.push("/dasboardAdmin")
                    }else 
                    //  (response.data.data.loginModalAdmin.message=="usuario y contraseña incorrecto")
                     {
                        // alert("usuario y contraseña incorrectos")
                        DialogUtility.alert({
                            title: ' contraseña incorrectos',
                            position: "fixed"
          
                        });
                      
                    }                   
                 }).catch(err=>{
                     console.log('error',err.response)
                 })              
                 localStorage.removeItem("idadminGral")
                 localStorage.removeItem("nombre")
                 localStorage.removeItem("apellido")
                 localStorage.removeItem("razonSocial")
                 localStorage.removeItem("rfc")
                 // localStorage.removeItem("telefono")     
                 localStorage.removeItem("correo")  
                 localStorage.removeItem("fk_paquetes")
                 localStorage.removeItem("paquetesdeAdmonGral")
                 localStorage.removeItem("Token")
            }
            modal(dataEmpresas){
              console.log("dataEmpresas" , dataEmpresas)
              this.setState({correoAdmin :dataEmpresas.correo})
              localStorage.setItem("correoAdministrador",dataEmpresas.correo)
              this.setState({modal12:true})
            }
           
           
            toggle = nr => () => {
              let modalNumber = 'modal' + nr
              this.setState({
                [modalNumber]: !this.state[modalNumber]
              });           
              }

     
    render(){
      let data;
      let modal; 
      let boton;      
   
        const columns = ["id", "Nombre", "Apellidos","RFC","Nombre Empresa","Teléfono","Correo",{name:"información", options:{filter: false, sort:false,download:false}}];
        
       //    console.log("estado",this.state.datos) 
            data = this.state.datos.map(rows=>{
              boton = <div><MDBBtn color= "info" size="sm"  onClick={(e)=>this.modal(rows)}>información</MDBBtn></div> 
          
          modal= <MDBContainer>
              
              <MDBModal  isOpen={this.state.modal12} >
                <MDBModalHeader >Iniciar sesión</MDBModalHeader>
                <font   size="1" face="arial">
                <MDBModalBody>

                <MDBRow >            
            <MDBCol > 
                <Form onSubmit={this.onSubmitBtn}  >
                    <p className="h5 text-center mb-4">Correo Administrador {this.state.correoAdmin}</p>
                        <br></br>
                        
                    <div className="grey-text" style={{marginRight:10, marginLeft:100}}>
                    <MDBCol  md="9">                 
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
                             </MDBCol >                                  
                            </div> 
                                          
                       <div className="text-center">
                        <MDBBtn color="primary" size="sm" type="submit"   >Iniciar sesión</MDBBtn>
                        <MDBBtn color="secondary" size="sm" onClick={(e) => this.setState({modal12:false})}>Cerrrar</MDBBtn>
                       </div>
                </Form>
            </MDBCol >  
        </MDBRow>
                     
                </MDBModalBody> 
                </font>
                <MDBModalFooter>
                  {/* <MDBBtn color="secondary" size="sm" onClick={(e) => this.setState({modal12:false})}>Cerrrar</MDBBtn> */}
                </MDBModalFooter>
              </MDBModal>
            </MDBContainer>
          
     
            
            return([rows.id_admin,rows.nombre, rows.apellidos, rows.rfc, rows.razonSocial, rows.telefono, rows.correo,boton])
          })
        const options={ 
            filterType:"drowpdawn",
            responsive: "stacked",
            textLabels:{
            body: {
              noMatch: "Lo sentimos, no se encontraron registros coincidentes",
              toolTip: " Ordenar",
              columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            pagination: {
              next: "Página siguiente",
              previous: "Página anterior",
              rowsPerPage: "Filas por página:",
              displayRows: "de",
            },
            toolbar: {
              search: "Buscar",
              downloadCsv: " Descargar CSV",
              print: "Imprimir ",
              viewColumns: "Ver columnas",
              filterTable: "Tabla de filtros",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "RESET",
            },
            viewColumns: {
              title: "Mostrar columnas",
              titleAria: "Mostrar / Ocultar columnas de tabla",
            },
            selectedRows: {
              text: "fila (s) seleccionadas",
              delete: "Eliminar",
              deleteAria: "Eliminar filas seleccionadas",
            },
          
          }
            
          } ;
       const rs = localStorage.getItem("razonSocial");        
    
        return(
            <React.Fragment>
             <NavbarDashboard data={rs}/>
             <div  style={{width:1200,marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}}>
             <MUIDataTable  
                  title={"Empresas"} 
                  data={data} 
                  columns={columns} 
                  options={options} 
                />
             {modal}      
                </div>
        </React.Fragment>
        )
    }
} export default Empresas