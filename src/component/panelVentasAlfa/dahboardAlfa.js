import React, { Component } from "react"
import { MDBBtn} from 'mdbreact';
import { MDBModal,  MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Navbar from './navbar'
import MUIDataTable from "mui-datatables";
import axios from 'axios'

class dashboardAlfa extends Component{
  constructor(props){
    super(props)
    this.state = {
          datos:[],
          modal: false,
          detallesAdminGral:[]
        }
        this.cerrar = this.cerrar.bind(this)
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
    cerrar(){
      this.setState({
        modal:false
      });
    }
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
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

      
      //  const rs = localStorage.getItem("razonSocial");     
        return(
            <React.Fragment>
             <Navbar/>
             
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

              {modal}

              {/* <MDBBtn color="primary" href="/cotizaciones">cotizacion</MDBBtn> */}

            
        </React.Fragment>

        )
    }
} export default dashboardAlfa

