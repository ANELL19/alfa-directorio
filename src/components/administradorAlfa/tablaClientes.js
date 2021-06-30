import React,{Component} from 'react'
import MUIDataTable from "mui-datatables";
import { DialogUtility } from '@syncfusion/ej2-popups';
import {MDBBtn, MDBModal, MDBModalHeader,MDBCard,MDBInput,MDBCol,MDBContainer,MDBRow,MDBIcon} from 'mdbreact'
import { Button } from 'antd';
import {Row,Col} from 'reactstrap';
import {API} from '../Graphql/Graphql'
import axios from 'axios'

class Tablas extends Component{
  constructor(props){
    super(props)
    this.state={      
      tablas:[],          
      peticionApi:[],
      detallesEditarCliente:[],
      modal: false,
      id_cliente:" ",
      rfc:" ",
      empresa:" ",
      nombre:" ",
      apellido:" ",
      correo1:" ",
      correo2:" ",
      telefono1:" ",
      telefono2:" "
      }    
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChangeInput = (e) => {
    console.log("eventoonChange", e);
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  
  async componentWillMount(){
    let array =  []    

     await axios({
            url:API,
            method:'post',
            data:{
              query:`
                query{   
                  getTablaClientes(data:"${[""]}"){
                    id_cliente
                    rfc
                    empresa
                    nombre
                    apellido
                    correo1
                    correo2
                    telefono1 
                    telefono2   
                    } 
                }
                `
            }           
             })
           .then(datos => {
             console.log("LA DATA de clientes",datos)
             array.push(datos.data.data.getTablaClientes)
             console.log("email",datos.data.data.getTablaClientes)
              this.setState({tablas:datos.data.data.getTablaClientes})             
            })

            .catch(err=>{
               console.log('error' ,err.response)
            })

            // array[0].map(rows=>{
            //   // console.log("rows de correo",rows)
            //   axios.get(`https://app.verify-email.org/api/v1/nsfdbVY9HBiaU4i0a9hypdy1Ids6bLzHayJd2HtonD33AYMjPk/verify/${rows.correo}`)
            // .then(res => {
            //   arrayApi.push([res.data.email,res.data.status_description])
            //   this.setState({peticionApi:arrayApi})
            // }).catch(err=>{
            //   console.log(err)
            // })
            // }) 
    
    }

    datosIndividialesClientes(id){
      console.log("idRecibido", id)
      console.log("el array",id.id_cliente) 
      axios({
        url:API,
        method:'post',
        data:{
            query:`
            query{
              getTablaClientes(data:"${[id]}"){
                id_cliente
                rfc
                empresa
                nombre
                apellido
                correo1
                correo2
                telefono1 
                telefono2 
                 } 
            }
            `
        }   
         })
       .then(response=>{
          if(response){
            let array = [];
         array.push("response de array",response)        
          this.setState({detallesEditarCliente:array})  
          
      

      // console.log("id_cliente",id.id_cliente) 
      // console.log("rfc_cliente",id.rfc)
      // console.log("empresa_cliente",id.empresa) 
      // console.log("nombre_cliente",id.nombre) 
      // console.log("apellidos_cliente",id.apellido) 
      // console.log("correo1_cliente",id.correo1)
      // console.log("correo2_cliente",id.correo2)
      // console.log("telefono1_cliente",id.telefono1)
      // console.log("telefon2_cliente",id.telefono2)

      
        localStorage.setItem("id_cliente",id.id_cliente )     
        localStorage.setItem("rfc_cliente",id.rfc)               
        localStorage.setItem("razonSocial_cliente",id.empresa)   
        localStorage.setItem("nombre_cliente",id.nombre) 
        localStorage.setItem("apellidos_cliente",id.apellido)
        localStorage.setItem("correo1_cliente",id.correo1)      
        localStorage.setItem("correo2_cliente",id.correo2)                                
        localStorage.setItem("telefono1_cliente",id.telefono1)
        localStorage.setItem("telefono2_cliente",id.telefono2)
          this.setState({
            modal: !this.state.modal
          }); 
          }
        //  console.log("esto es response",response)          
        //  console.log("array de id",array[1].data.data.getTablaClientes)
        //  console.log("estado",this.state.detallesEditarCliente.id_cliente)   
       
          //  if(this.state.detallesIdCotizaciones[0]){
          //    this.setState({tablaInicial:false})
          //    this.setState({renderPDF:true})
          //  }       
        
    })
     .catch(err=>{
              console.log('error',err.response)
      }) 
    }

    deleteCliente(id){
      console.log("idRecibido delite", id)
      // console.log("id_cliente",id_cliente)

      axios({
        url:API,
        method:'post',
        data:{
            query:`
            mutation{
              deleteCliente(data:"${[id]}"){
                id_cliente
                rfc
                razonSocial
                nombre
                apellido
                correo1
                correo2
                telefono1 
                telefono2 
                 } 
            }
            `
        }   
         })
       .then(response=>{
         console.log("response de delite",response)          
          window.location.reload()    
    })
     .catch(err=>{
              console.log('error',err.response)
      })
    }

    onSubmitBtn = (e) => {
      e.preventDefault();
    
  
      //  let id_cliente = localStorage.getItem("id_cliente" )     
       let rfc = localStorage.getItem("rfc_cliente")               
       let empresa_cliente = localStorage.getItem("razonSocial_cliente")   
       let nombre_cliente = localStorage.getItem("nombre_cliente") 
       let apellidos_cliente =localStorage.getItem("apellidos_cliente")
       let corre1_cliente = localStorage.getItem("correo1_cliente")      
       let corre2_cliente = localStorage.getItem("correo2_cliente")                                
       let telefono1_cliente = localStorage.getItem("telefono1_cliente")
       let telefono2_cliente = localStorage.getItem("telefono2_cliente")

          console.log("data a enviar ",rfc,empresa_cliente)
  
         axios({
        url: API,
        method: "post",
        data: {
          query: `
                  mutation{
                    updateCliente(data:"${[rfc.toUpperCase(),empresa_cliente.toUpperCase(),nombre_cliente.toUpperCase(),apellidos_cliente.toUpperCase(),corre1_cliente,corre2_cliente,telefono1_cliente,telefono2_cliente]}"){           
                   
                      message
                       } 
                  }
                  `
        }
      })
        .then((response) => {     
          console.log("response de update",response)
          DialogUtility.alert({
            title: "Registro exitoso"
          });
          
        })
        .catch((err) => {
          console.log("error", err.response);
        });    
    };

    render(){ 
      // let id_cliente = localStorage.getItem("id_cliente" )     
      let rfc = localStorage.getItem("rfc_cliente")               
      let empresa_cliente = localStorage.getItem("razonSocial_cliente")   
      let nombre_cliente = localStorage.getItem("nombre_cliente") 
      let apellidos_cliente =localStorage.getItem("apellidos_cliente")
      let corre1_cliente = localStorage.getItem("correo1_cliente")      
      let corre2_cliente = localStorage.getItem("correo2_cliente")                                
      let telefono1_cliente = localStorage.getItem("telefono1_cliente")
      let telefono2_cliente = localStorage.getItem("telefono2_cliente")
        

      // console.log("arrayApi" ,this.state.peticionApi)
      // let filtrar;
      // filtrar = this.state.peticionApi.filter(function(hero){
      //   return hero[1] == "BAD email"
      // })
      // console.log("filtrar" , filtrar)
 let modal;

     modal= <div>
          <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
            <MDBModalHeader toggle={this.toggle}>Editar Datos del Cliente</MDBModalHeader>
            <MDBContainer>
            <MDBRow>
              <MDBCol>
                <MDBCard>
              <form onSubmit={this.onSubmitBtn}>
                
            <Row  >
            <Col xs="4">        
            <label htmlFor="defaultFormLoginPasswordEx" > <strong>RFC: </strong></label>
                       <input                                              
                            id="rfc"
                            type="text"
                            name="rfc"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={rfc}
                            required
                            className="form-control"
                            // value={this.state.rfc}
                            />
            </Col>
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx" > <strong>razón Social: </strong></label>
                       <input                                              
                            id="razonSocial"
                            type="text"
                            name="razonSocial"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={empresa_cliente}
                            required
                            className="form-control"
                            // value={this.state.RazonSocial}
                            /></Col>
          </Row>
          <Row>
          <Col xs="6">       
          <label htmlFor="defaultFormLoginPasswordEx" > <strong>nombre: </strong></label>
                       <input                                              
                            id="nombre"
                            type="text"
                            name="nombe"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={nombre_cliente}
                            required
                            className="form-control"
                            // value={this.state.nombre}
                            />
            </Col>
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx" > <strong>Apellidos: </strong></label>
                       <input                                              
                            id="apellido"
                            type="text"
                            name="apellido"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={apellidos_cliente}
                            required
                            className="form-control"
                            // value={this.state.apellido}
                            />
              
              </Col>
          </Row>
          <Row>
          <Col xs="6">       
          <label htmlFor="defaultFormLoginPasswordEx" > <strong>correo 1: </strong></label>
                       <input                                              
                            id="correo1"
                            type="email"
                            name="correo1"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={corre1_cliente}
                            required
                            className="form-control"
                            // value={this.state.correo1}
                            />
            </Col>
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx" > <strong>Correo 2: </strong></label>
                       <input                                              
                            id="correo2"
                            type="email"
                            name="correo2"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={corre2_cliente}                           
                            className="form-control"
                            // value={this.state.correo2}
                            />
              </Col>
          </Row>
          <Row>
          <Col xs="6">       
          <label htmlFor="defaultFormLoginPasswordEx" > <strong>Telefono 1: </strong></label>
                       <input                                              
                            id="telefono1"
                            type="text"
                            name="telefono1"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={telefono1_cliente}
                            required
                            className="form-control"
                            // value={this.state.telefono1}
                            />
            </Col>
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx" > <strong>Telefono 2: </strong></label>
                       <input                                              
                            id="telefono2"
                            type="text"
                            name="telefono2"
                            onChange={this.onChangeInput}
                            // value={this.state.pass}
                            defaultValue={telefono2_cliente}                            
                            className="form-control"
                            // value={this.state.telefono2}
                            />
             </Col>
          </Row>

          <div className="text-center">
              <MDBBtn color="info" type="submit">                   
                Guardar
              </MDBBtn>
              <MDBBtn
                color="danger"
                onClick={this.onClear}
                type="submit"
              >
              Cancelar
              </MDBBtn>                   
          </div> 

              
          </form>
         
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  
          </MDBModal>
          </MDBContainer>
          </div> 
    
      let botonesEditar;
      let eliminar;
      let data;

    const columns = ["Id_Cliente","RFC","Empresa","Nombre","Apellidos","Correo1","Correo2","Teléfono1","Teléfono2","Editar","Eliminar"];
    
     data = this.state.tablas.map((rows,i)=>{    
      
      botonesEditar=        
      <div>
        <Button type="primary" shape="circle" size="large" onClick={e=>this.datosIndividialesClientes(rows)}>
          <MDBIcon icon="pencil-alt" />
        </Button>
      </div>

      eliminar= 
      <div> 
        <Button type="danger" shape="circle" size="large" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar este Cliente?, Los datos se perderán')) this.deleteCliente(rows.id_cliente)} } >
          <i class="far fa-trash-alt"></i>
        </Button>
      </div>


         return([rows.id_cliente,rows.rfc,rows.empresa,rows.nombre,rows.apellido, rows.correo1, rows.correo2, rows.telefono1, rows.telefono2,botonesEditar,eliminar])
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
        
      } 
        return(
            <React.Fragment>
          <div  style={{width:"100%",marginTop:"1%",marginBottom:"2%"}} >               
              <MUIDataTable  
                title={"tabla clientes"} 
                data={data} 
                columns={columns} 
                options={options}          
              /> 
            </div>  
            {modal}      
            </React.Fragment>
        )
    }
} export default Tablas