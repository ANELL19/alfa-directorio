import React, { Component } from "react"

import {  MDBModalFooter,MDBContainer,MDBRow,MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Navbar from './navbar'
import MUIDataTable from "mui-datatables";
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import {Form,FormGroup,Label,Col,Input} from 'reactstrap'; 


class dashboardAlfa extends Component{
  constructor(props){
    super(props)
    this.state = {
          datos:[],
          modal: false,
          detallesAdminGral:[],
          user:"",
          pass:"",
         

         
        }
        this.cerrar = this.cerrar.bind(this)       
    } 

    onChangeInput =(e)=>{
      const {id,value} = e.target;
      this.setState({
          [id]:value
      })
  }

    cerrar(){
      this.setState({
        modal:false
      });
    }
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }

    componentWillMount(){   

    
      const id = localStorage.getItem("id");
      const API='http://localhost:4000/graphql'   

      axios({
        url:API,
        method:'post',
        data:{
            query:`
            query{
                getVentasAlfa(data:"${[id]}"){             
                  idVentas
                  fechaVenta
                  fk_adminG
                  fk_paquete
                 } 
            }
            `
        }   
         })
       .then(response=>{
          let array  = [];
          array.push(response.data.data.getVentasAlfa)
          this.setState({datos:array})          
          })
        .catch(err=>{
                  console.log('error',err.response)
          })  
    }
    
    consultarAdminG(id){
      const API='http://localhost:4000/graphql'  

      axios({
        url:API,
        method:'post',
        data:{
            query:`
            query{
                getAdminGral(data:"${[id]}"){             
                  id_adminG
                  nombre
                  apellido
                  razonSocial
                  rfc
                  telefono
                  correo     
                  empresas
                 } 
            }
            `
        }   
         })
       .then(response=>{

         let array = [];
         array.push(response.data.data.getAdminGral[0])
         console.log("algo",array)
         this.setState({detallesAdminGral:array})
        this.setState({
          modal: !this.state.modal
        });
          
    })
     .catch(err=>{
              console.log('error',err.response)
      })  

    }

    onSubmitBtn =(e)=>{        
      e.preventDefault();
      const API='http://localhost:4000/graphql'   
  //  let correo = this.state.correoAlfa;
      //  const  contraseña = this.state.pass;
      //  const correo1=this.state.user
      // const correo = localStorage.getItem("correo") 
      // console.log("correo",correo)
    //  console.log("state",this.state.correoAlfa)
     // console.log("correo" , correo , "pass", this.state.pass)
      // console.log("correo" , correo1 , "pass", this.state.pass)
          axios ({
              url:API,
              method:'post',
              data:{
                  query:`
                  query{
                    loginAdminAlfa(data:"${[this.state.user,this.state.pass]}"){
                      message
                      correo                                         
                      token
                  } 
                }
                `
            }   
            }).then(response=>{
          console.log( 'este es el response',response.data.data.loginAdminAlfa)
                if(response.data.data.loginAdminAlfa.message=="login exitoso"){ 
                  localStorage.setItem("TokenVentasAlfa",response.data.data.loginAdminAlfa.token)
                      
                    DialogUtility.alert({
                      title:'Bienvenido' ,
                      content: "contraseña exitosa!",
                      position: "fixed"
                  });  
                  this.props.history.push("/signupAdminAlfa")
                //  console.log("estado",this.props)
                    
                }else   {                     
                    DialogUtility.alert({
                        title: ' contraseña incorrecta',
                        position: "fixed"
      
                    });                    
                }                 
            })
            .catch(err=>{
                console.log('error',err.response)
            })
            
        }

  
    
    render(){
      let data;
      let boton;
      let modal;
      const columns = ["id Ventas", "id Cliente", "id Paquete", "Fecha de la venta","Detalles"];

      console.log("datos Estado" , this.state.datos)
      
      if(this.state.datos[0]){
         data = this.state.datos[0].map(rows=>{

          boton = <div><MDBBtn size="md" color="info" onClick={e=> this.consultarAdminG(rows.fk_adminG)}>Detalles</MDBBtn></div>
                return([rows.idVentas,rows.fk_adminG, rows.fk_paquete, rows.fechaVenta,boton])
  
        } )
      }


      
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
    
    if(this.state.detallesAdminGral[0]){
      const columnsAdminGral = ["id", "Nombre", "Apellidos", "RFC","Razón Social","Teléfono","Correo","Empresas Autorizadas"];

     let dataAdminGral = this.state.detallesAdminGral.map(rows=>{
              return([rows.id_adminG,rows.nombre, rows.apellido, rows.rfc,rows.razonSocial,rows.telefono,rows.correo,rows.empresas])

      } )

      modal =  <div >
      <MDBModal size="fluid"  dialogClassName={{maxWidth:'70%'}} isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Detalles del cliente</MDBModalHeader>
          
        <MUIDataTable  
                title={"tabla clientes"} 
                data={dataAdminGral} 
                columns={columnsAdminGral} 
                options={options} 
        />
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.cerrar}>Cerrar</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      </div>
          }


       const correo= localStorage.getItem("correo")
      //  const rs = localStorage.getItem("razonSocial");     
        return(
            <React.Fragment>
             <Navbar/>
             
             <div  style={{width:"100%",marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}} >
             <MDBCol md="10">
               {/* <MuiThemeProvider theme= {this.getMuiTheme()}> */}
                <MUIDataTable  
                  title={"tabla clientes"} 
                  data={data} 
                  columns={columns} 
                  options={options} 
                />
                {/* </MuiThemeProvider> */}
               </MDBCol>
              </div>

              {modal}

              {/* <MDBBtn color="primary" href="/cotizaciones">cotizacion</MDBBtn> */}


              <MDBContainer>
        {/* <MDBBtn color="info" onClick={this.toggle}>Registar Administrado de Alfa </MDBBtn>       
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} > 
          <MDBModalHeader toggle={this.toggle}>Correo Administrador</MDBModalHeader>
          <MDBModalBody>
          <MDBModalBody> */}

    <MDBRow >            
    <MDBCol > 
    <Form onSubmit={this.onSubmitBtn}  >
      <p className="h5 text-center mb-4">{correo} </p> 


      <FormGroup row>
          <Label for="Correo" sm={3} size="lg">Correo</Label>
              <Col sm={9}>
              <Input 
                type="email" 
                name="user" 
                id="user"              
                Size="lg" 
                onChange={this.onChangeInput}
                value={this.state.user}
                required 
              />
              </Col>
          </FormGroup>    

        <FormGroup row>
          <Label for="contraseña" sm={3} size="lg">Contraseña</Label>
              <Col sm={9}>
              <Input 
                type="password" 
                name="contraseña" 
                id="pass" 
                placeholder="contraseña" 
                Size="lg" 
                onChange={this.onChangeInput}
                value={this.state.pass}
                required 
              />
              </Col>
          </FormGroup>
                    
          <div className="text-center">
          <MDBBtn color="primary" size="sm" type="submit">Iniciar sesión</MDBBtn>
          {/* <MDBBtn color="secondary" size="sm" onClick={this.toggle}>Cerrrar</MDBBtn> */}
          </div>
    </Form>
    </MDBCol >  
    </MDBRow>
        
    {/* </MDBModalBody> 
          </MDBModalBody>
          
        </MDBModal> */}
      </MDBContainer>
           
        </React.Fragment>

        )
    }
} export default dashboardAlfa
