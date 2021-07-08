import React, { Component } from "react"
import { MDBBtn, MDBModalBody} from 'mdbreact';
import { MDBModal,  MDBModalHeader, MDBModalFooter} from 'mdbreact';
import Navbar from './navbar'
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import {API} from '../Graphql'

class dashboardAlfa extends Component{
  constructor(props){
    super(props)
    this.state = {
          datos:[],
          modal: false,
          detallesAdminGral:[],
          detallesCotizaciones:[],
        //   modal12: false

        }
        this.cerrar = this.cerrar.bind(this)
    } 
    
// toggle12 = () => {
//   this.setState({
//     modal12: !this.state.modal12
//   });
// }

    componentWillMount(){
      const id = localStorage.getItem("id");
      // const API='http://localhost:4000/graphql'   

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

           //const API='http://localhost:4000/graphql'   
          const fk_adminalfa  = localStorage.getItem("id");
          console.log(" fk_adminalfa", fk_adminalfa)       
       axios({
            url:API,
            method:'post',
            data:{
                query:`
                query{
                  getCotizacionesTabla(data:"${[id]}"){
                      id_cotizacion 
                      razonSocial
                      nombre
                      apellidos 
                      correo1
                      correo2
                      telefono1
                      telefono2
                      telefono3
                      telefono4 
                      telefono5
                      Servicio
                      precio 
                      iva
                      total
                      promocion 
                      vendedor
                      fecha 
                   } 
                }
                `
            }   
             }).then(response=>{
               //  console.log("response-DASH",response.data.data.getCotizacionesTabla)
              
               let array1 = [];
               array1.push(response.data.data.getCotizacionesTabla)
               console.log("PUSH DE ARRAY1",array1)
               this.setState({detallesCotizaciones:array1})
             })
             .catch(err=>{
                 console.log('error',err)
             })
    }

    consultarAdminG(id){

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
      const columnsAdminGral = [ "Nombre", "Apellidos", "RFC","Razón Social","Teléfono","Correo","Empresas Autorizadas"];

     let dataAdminGral = this.state.detallesAdminGral.map(rows=>{
              return([rows.nombre, rows.apellido, rows.rfc,rows.razonSocial,rows.telefono,rows.correo,rows.empresas])

      } )

      modal =  <div>
      <MDBModal size="lg"  isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Detalles del cliente</MDBModalHeader>
        <MDBModalBody >
        <div style={{maxWidth:900}}>
        <MUIDataTable  
                title={"tabla clientes"} 
                data={dataAdminGral} 
                columns={columnsAdminGral} 
                options={options} 
        />
        </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.cerrar}>Cerrar</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      </div>
          }
          const columnsCotizaciones = ["Nombre", "Apellidos","Razón Social","Producto o Servicio","Fecha de Cotización","Correo","telefono","Total"];

          let dataCotizaciones;

          if(this.state.detallesCotizaciones[0]){
            dataCotizaciones = this.state.detallesCotizaciones[0].map(rows=>{
   
            //  boton = <div><MDBBtn size="md" color="info" onClick={e=> this.consultarAdminG(rows.fk_adminG)}>Detalles</MDBBtn></div>
                   return([rows.nombre,rows.apellidos,rows.razonSocial,rows.Servicio,rows.fecha,rows.correo1,rows.telefono1,rows.total])

                   console.log("esto es dataCotizaciones",rows.Servicio)
     
           } )
         }
         

          let tablaCotizaciones=<div>
              <div  style={{width:"90%",marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}} >               
                <MUIDataTable  
                  title={"tabla Cotizaciones"} 
                  data={dataCotizaciones} 
                  columns={columnsCotizaciones} 
                  options={options} 
                />      
              </div>

          </div>
        return(
            <React.Fragment>
             <Navbar>                
      <MDBBtn onClick={this.toggle12}>Modal</MDBBtn>
      <MDBModal isOpen={this.state.modal12} toggle={this.toggle12}>
        <MDBModalHeader toggle={this.toggle12}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          (...)
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle12}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>   
</Navbar>
             
             <div  style={{width:"90%",marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}} >               
                <MUIDataTable  
                  title={"Lista de ventas o paquetes registrados"} 
                  data={data} 
                  columns={columns} 
                  options={options} 
                />      
              </div>

              {modal}
              {tablaCotizaciones} 
        </React.Fragment>

        )
    }
} export default dashboardAlfa