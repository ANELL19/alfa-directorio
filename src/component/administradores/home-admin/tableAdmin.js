import React,{Component} from 'react'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {MDBContainer,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact'
import { Button} from 'reactstrap';
import axios from 'axios'



class Table extends Component{
  constructor(props){
    super(props)
    this.state={
      tablas:[],      
      modal1:false,

     
      }
      this.toggle =this.toggle.bind(this)      
  }

  toggle(parametro){
    this.setState({modal:parametro})
  }

  abrirModal=()=>{
    this.setState({modal:this.state.modal})   
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
          root: {              
          fontFamily : 'arial' ,
          fontSize: '14px',                     
        },          
      },
      MUIDataTableHeadCell: {
        root: {         
          fontSize: '16px',
        }
      },         
    }
    })
    
  componentWillMount(){
  
    const API='http://localhost:4000/graphql'   
      axios({
            url:API,
            method:'post',
            data:{
              query:`
                query{   
                  getTablaClientes(data:"${[""]}"){
                    id_cliente
                    nombre_cliente
                    apellidos_cliente
                    curp
                    rfc
                    nombreEmpresa
                    telefono
                    correo
                    num_factura  
                    fk_administrador  
                    } 
                }
                `
            }           
             })
           .then(datos => {
              this.setState({tablas:datos.data.data.getTablaClientes})
                console.log("que hay en la tabla" , datos)
            })
            .catch(err=>{
               console.log('error' ,err.response)
            })
    }
    modal(datosCliente){
     
      this.setState({modal1:true})
    }

    toggle = nr =>()=>{
      let modalNumber= 'modal' + nr
      console.log("modal",modalNumber)
      this.setState({
        [modalNumber]:!this.state[modalNumber]
      });
    }
          
    render(){
    let modal;
    const columns = ["id", "Nombre", "Apellidos", "CURP","RFC","Nombre Empresa","Teléfono","Correo","Información", "fk_admin"];
    const data = this.state.tablas.map((rows)=>{
      
          let botones = <MDBBtn size="sm" onClick={(e)=>this.modal(rows)}> datos cliente </MDBBtn>
          // console.log("rows", rows.nombreEmpresa)
          // console.log("botones", botones)

          modal=<div>
          <MDBModal size="lg"  isOpen={this.state.modal1} >
            <MDBModalHeader>Chat</MDBModalHeader>
            <font   size="1" face="arial">
            <MDBModalBody>
            {rows.nombre_cliente}
            
            </MDBModalBody> 
            </font>
            <MDBModalFooter>
              <MDBBtn color="secondary" size="sm" onClick={(e)=>this.setState({modal1:false})}>Cerrrar</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        
        </div>
          
         return([rows.id_cliente, rows.nombre_cliente, rows.apellidos_cliente, rows.curp, rows.rfc, rows.nombreEmpresa, rows.telefono, rows.correo,botones])
        
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
        return(
            <React.Fragment>
              <div  style={{width:1200,marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}} >
               {/* <MuiThemeProvider theme= {this.getMuiTheme()}> */}
                <MUIDataTable  
                  title={"tabla clientes"} 
                  data={data} 
                  columns={columns} 
                  options={options} 
                />
                {/* </MuiThemeProvider> */}
              </div>
              {/* <MDBBtn size="sm"  >datos</MDBBtn> 
              <Button color="danger" onClick={this.toggle}>click aqui</Button>*/}
        {modal}
            </React.Fragment>
        )
    }
} export default Table