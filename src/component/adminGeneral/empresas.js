
import React, { Component } from "react"
import NavbarDashboard from './navbarDashboard'
import MUIDataTable from "mui-datatables";
import {MDBContainer,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact'
import { Button, Table,Modal, ModalHeader, ModalBody, ModalFooter
   } from 'reactstrap';

import axios from 'axios'


class Empresas extends Component{
  constructor(props){
    super(props)
    this.state = {
        tablas:[],
        modal1:false,
        // modal:false,
         
        }
        this.toggle = this.toggle.bind(this)
    } 
    toggle(parametro){
      this.setState({modal:parametro})
    }
    abrirModal = ()=>{
      this.setState({modal:this.state.modal})
    }

    componentWillMount(){
      let dataTabla=[]
      console.log("dataTabla",dataTabla)
        const idAdminGral = localStorage.getItem("idadminGral")
        
        console.log("id" ,idAdminGral )
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
           .then(datos => {
            dataTabla.push(datos.data.data.getTablaAdmin)
              this.setState({tablas:dataTabla})
              console.log("datos",datos)
              // localStorage.setItem("id_admin",datos.data.data.getTablaAdmin.id_admin)                    
              // localStorage.setItem("nombre",datos.data.data.getTablaAdmin.nombre)
              // localStorage.setItem("razonSocial",datos.data.data.getTablaAdmin.razonSocial)
              // localStorage.setItem("telefono",datos.data.data.getTablaAdmin.telefono)
              // localStorage.setItem("correo",datos.data.data.getTablaAdmin.correo)
              //   console.log("que hay en la tabla" , datos)
              //  console.log("algo",this.state.tablas)
            })
            .catch(err=>{
               console.log('error' ,err.response)
            })
    }

    modal(datosE){
     
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
      let data;
        const columns = ["id", "Nombre", "Apellidos","RFC","Nombre Empresa","Teléfono","Correo","Detalles"];
       
        if(this.state.dataTabla){

          data = this.state.dataTabla.map(rows=>{

           // let boton = <MDBBtn size="sm" onClick={(e)=>this.modal(rows.id_admin)}> datos cliente </MDBBtn>
            // modal=<MDBContainer>
            // <MDBModal size="lg"  isOpen={this.state.modal1} >
            //   <MDBModalHeader>Información cliente</MDBModalHeader>
            //   <font   size="1" face="arial">
            //   <MDBModalBody>
            //   {rows.id_admin}     
  
              
            //    </MDBModalBody>  
            //   </font>
            //   <MDBModalFooter>
            //     <MDBBtn color="secondary" size="sm" onClick={(e)=>this.setState({modal1:false})}>Cerrrar</MDBBtn>
            //   </MDBModalFooter>
            // </MDBModal>
            // </MDBContainer>
             
                 console.log("esta es rows",rows)
                   return([rows.id_admin,rows.nombre, rows.apellidos, rows.rfc, rows.razonSocial, rows.telefono, rows.correo])

           
          })
        }
        // const data = this.state.tablas.map(rows=>{
     
        //   let boton = <MDBBtn size="sm" onClick={(e)=>this.modal(rows.id_admin)}> datos cliente </MDBBtn>
        //   modal=<MDBContainer>
        //   <MDBModal size="lg"  isOpen={this.state.modal1} >
        //     <MDBModalHeader>Información cliente</MDBModalHeader>
        //     <font   size="1" face="arial">
        //     <MDBModalBody>
        //     {rows.id_admin}     

            
        //      </MDBModalBody>  
        //     </font>
        //     <MDBModalFooter>
        //       <MDBBtn color="secondary" size="sm" onClick={(e)=>this.setState({modal1:false})}>Cerrrar</MDBBtn>
        //     </MDBModalFooter>
        //   </MDBModal>
        //   </MDBContainer>
           
        //        console.log("esta es rows",rows)
        //          return([rows.id_admin,rows.nombre, rows.apellidos, rows.rfc, rows.razonSocial, rows.telefono, rows.correo,boton])
                
        //         })
                  
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


