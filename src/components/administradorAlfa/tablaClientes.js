import React,{Component} from 'react'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
       MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol , MDBContainer,MDBRow,MDBIcon} from 'mdbreact'
       import { Button, Tooltip } from 'antd';
import { SearchOutlined,
         DeleteOutlined } from '@ant-design/icons';
import {Table, ModalBody,} from 'reactstrap';
import {API} from '../Graphql/Graphql'
import axios from 'axios'
class Tablas extends Component{

  constructor(props){
    super(props)
    this.state={      
      tablas:[],          
      peticionApi:[],
      detallesEditarCliente:[],
      modal: false
      }    
  }
  async componentWillMount(){
    let array =  []
    let arrayApi =  []

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
        //  console.log("esto es response",response)
         let array = [];
         array.push(response)        
         this.setState({detallesEditarCliente:array[0]})    
         console.log("array de id",array)
         console.log("estado",this.state.detallesEditarCliente[0].id_cliente)   
        // localStorage.setItem("id_cliente",this.state.tablas.id_cliente )     
        // localStorage.setItem("rfc_cliente",this.state.getTablaClientes[0].rfc)               
        // localStorage.setItem("razonSocial",this.state.detallesIdCotizaciones[0].razonSocial)   
        // localStorage.setItem("nombre_cliente",this.state.detallesIdCotizaciones[0].nombre) 
        // localStorage.setItem("apellidos_cliente",this.state.detallesIdCotizaciones[0].apellidos)
        // localStorage.setItem("correo1",this.state.detallesIdCotizaciones[0].correo1)                                    
        // localStorage.setItem("telefono1",this.state.detallesIdCotizaciones[0].telefono1)
        // localStorage.setItem("servicio",this.state.detallesIdCotizaciones[0].servicio)
        // localStorage.setItem("precio",this.state.detallesIdCotizaciones[0].precio)                                    
        // localStorage.setItem("iva",this.state.detallesIdCotizaciones[0].iva)
        // localStorage.setItem("total",this.state.detallesIdCotizaciones[0].total)
        // localStorage.setItem("promocion",this.state.detallesIdCotizaciones[0].promocion)
        // localStorage.setItem("vendedor",this.state.detallesIdCotizaciones[0].vendedor)
        // localStorage.setItem("fecha",this.state.detallesIdCotizaciones[0].fecha)
          //  if(this.state.detallesIdCotizaciones[0]){
          //    this.setState({tablaInicial:false})
          //    this.setState({renderPDF:true})
          //  }
         
        
    })
     .catch(err=>{
              console.log('error',err.response)
      }) 

    }

    toggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    }

  

    render(){    

      // console.log("arrayApi" ,this.state.peticionApi)
      // let filtrar;
      // filtrar = this.state.peticionApi.filter(function(hero){
      //   return hero[1] == "BAD email"
      // })
      // console.log("filtrar" , filtrar)
     
    
let botonesEditar;
let eliminar;

let dataClientes ;


    
    const columns = ["Id_Cliente","RFC","Empresa","Nombre","Apellidos","Correo1","Correo2","Teléfono1","Teléfono2","Editar","Eliminar","Boton MOdal"];
     const data = this.state.tablas.map((rows,i)=>{
      // botonesEditar = this.state.tablas.map(rows=>{
        // console.log("esto es rows",rows)
        // }) 

        // botonesEditar=<Button type="primary" shape="circle" size="large"  onClick={e=>this.datosIndividialesClientes(rows.id_cliente)}> <MDBIcon icon="pencil-alt" /></Button>
        // eliminar= <Button type="danger" shape="circle" size="large" > <MDBIcon far icon="trash-alt" /></Button>
        dataClientes = this.state.detallesEditarCliente.map(rows =>{
          console.log("esto es roes de dataClientes",rows)
           botonesEditar=<Button type="primary" shape="circle" size="large"  onClick={e=>this.datosIndividialesClientes(rows.id_cliente)}> <MDBIcon icon="pencil-alt" /></Button>
                eliminar= <Button type="danger" shape="circle" size="large" > <MDBIcon far icon="trash-alt" /></Button>
            
        })
      
      
           
        // let botones = <MDBBtn color ="info" size="sm" onClick={(e)=>this.modal()}> datos cliente </MDBBtn>
          
        //  return([rows.id_cliente,rows.nombre_cliente, rows.apellidos_cliente, rows.curp, rows.rfc, rows.nombreEmpresa, rows.telefono, rows.correo,botones])
         return([rows.id_cliente,rows.rfc,rows.empresa,rows.nombre,rows.apellido, rows.correo1, rows.correo2, rows.telefono1, rows.telefono2,botonesEditar,eliminar,dataClientes])
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
            </React.Fragment>
        )
    }
} export default Tablas