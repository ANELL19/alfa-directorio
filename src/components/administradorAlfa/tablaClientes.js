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

  

    render(){    

      // console.log("arrayApi" ,this.state.peticionApi)
      // let filtrar;
      // filtrar = this.state.peticionApi.filter(function(hero){
      //   return hero[1] == "BAD email"
      // })
      // console.log("filtrar" , filtrar)
     
    


  console.log("estado" ,this.state.tablas)
    
    const columns = ["id_cliente", "RFC","Empresa", "nombre","Apellidos", "correo1","correo2","Teléfono1","Teléfono2","Editar","Eliminar"," "];
     const data = this.state.tablas.map((rows,i)=>{
      let botonesEditar = <Button type="primary" shape="circle" > <MDBIcon icon="pencil-alt" /></Button>
  
      let eliminar = <Button type="danger" shape="circle" > <MDBIcon far icon="trash-alt" /></Button>
            
        // let botones = <MDBBtn color ="info" size="sm" onClick={(e)=>this.modal()}> datos cliente </MDBBtn>
          
        //  return([rows.id_cliente,rows.nombre_cliente, rows.apellidos_cliente, rows.curp, rows.rfc, rows.nombreEmpresa, rows.telefono, rows.correo,botones])
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
     <div  style={{width:"100%",marginTop:"2%",marginBottom:"2%"}} >               
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