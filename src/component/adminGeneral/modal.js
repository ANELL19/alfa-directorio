
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
        datos:[],       
        detallesEmpresas:[],
       // modal:false,
         modal12: false,
        button:false,
        user:"",
        pass:""
                
        }
    //  this.toggle=this.toggle.bind(this)
    }

    // toggle (parametro){
    //   this.setState({modal:parametro})
    // }
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
        // const idAdminGral = localStorage.getItem("idadminGral")        
        // const API= 'http://localhost:4000/graphql' 
    }

    onSubmitBtn = (e)=>{        
        e.preventDefault(); 
        const idAdminGral = localStorage.getItem("idadminGral")        
        const API= 'http://localhost:4000/graphql'  
        axios({
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
        
         
            })
            .catch(err=>{
               console.log('error' ,err.response)
            })
         //   reader.readAsText(e.target.files[0])
            this.setState({button:true})
            axios({
                url:API,
                method:'post',
                data:{
                    query:`
                    query{
                       login(data:"${[this.state.user,this.state.pass]}"){
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
                    if(response.data.data.login.message=="login exitoso"){                    
                        localStorage.setItem("id_admin",response.data.data.login.id_admin)                    
                        localStorage.setItem("nombre",response.data.data.login.nombre)
                        localStorage.setItem("razonSocial",response.data.data.login.razonSocial)
                        localStorage.setItem("telefono",response.data.data.login.telefono)
                        localStorage.setItem("correo",response.data.data.login.correo)
                      //  localStorage.setItem("statusCorreo",response.data.data.login.statusCorreo)                
                        localStorage.setItem("Token",response.data.data.login.token)
                        // alert(`Bievenido ${response.data.data.login.nombre}`)
                        DialogUtility.alert({
                            title:'Bienvenido' ,
                            content: "inicio de sesión exitoso!",
                        });
                       
                        this.props.history.push("/dasboardAdmin")
                    }
                    else if(response.data.data.login.message=="usuario y contraseña incorrecto"){
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
                     console.log('error',err.response)
                 })
              }  

            modal(dataEmpresas){
           //   console.log("dataChat" , dataChat)
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
   
        const columns = ["id", "Nombre", "Apellidos","RFC","Nombre Empresa","Teléfono","Correo","información"];
        
           console.log("estado",this.state.datos) 
            data = this.state.datos.map(rows=>{
              boton = <div><MDBBtn size="sm"  onClick={(e)=>this.modal(rows)}>información</MDBBtn></div> 
              modal= <MDBContainer>
              <MDBModal size="lg" isOpen={this.state.modal12} >
                <MDBModalHeader >información</MDBModalHeader>
                <font   size="1" face="arial">
                <MDBModalBody>

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
                     
                </MDBModalBody> 
                </font>
                <MDBModalFooter>
                  <MDBBtn color="secondary" size="sm" onClick={(e) => this.setState({modal12:false})}>Cerrrar</MDBBtn>
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