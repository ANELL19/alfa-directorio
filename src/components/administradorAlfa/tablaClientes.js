import React,{Component} from 'react'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
       MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol , MDBContainer,MDBRow} from 'mdbreact'
import { Button,Table, ModalBody,} from 'reactstrap';
import {API} from '../Graphql/Graphql'
import axios from 'axios'
class Tablas extends Component{

  constructor(props){
    super(props)
    this.state={      
      tablas:[],      
      modal1:false,  
      peticionApi:[],
      cards:false,
      tabla:false,
      tableSuccess:false,
      tableWarning:false,      
      tableDanger:false,
      tableSecondary:false

      }
      this.toggle =this.toggle.bind(this)      
  }

  toggle(parametro){
    this.setState({modal:parametro})
  }

  abrirModal=()=>{
    this.setState({modal:this.state.modal})   
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
                  getTablaClientes(data:"${[" "]}"){
                    id_cliente
                    rfc
                    empresa
                    nombre
                    apellido
                    correo1
                    correo2
                    telefono 1 
                    telefono2                  
                     
                    } 
                }
                `
            }           
             })
           .then(datos => {
             console.log("LA DATA",datos)
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

    success(){
      this.setState({cards:true})
      this.setState({tabla:true})
      this.setState({tableSuccess:true})  
    }
     warning(){
      this.setState({cards:true})
      this.setState({tabla:true})
      this.setState({tableWarning:true})
     }

     danger(){
      this.setState({cards:true})
      this.setState({tabla:true})
      this.setState({tableDanger:true}) 
     }

     secondary(){
      this.setState({cards:true})
      this.setState({tabla:true})
      this.setState({tableSecondary:true})    
     }

    cerrarSuccess(){
      this.setState({cards:false})
      this.setState({tabla:false})
      this.setState({tableSuccess:false})   
    }
    
    cerrarWarning(){
      this.setState({cards:false})
      this.setState({tabla:false})
      this.setState({tableWarning:false})
    } 
    
    cerrarDanger(){
      this.setState({cards:false})
      this.setState({tabla:false})
      this.setState({tableDanger:false})
    }

    cerrarSecondary(){
      this.setState({cards:false})
      this.setState({tabla:false})
      this.setState({tableSecondary:false})
    }

    render(){    

      console.log("arrayApi" ,this.state.peticionApi)
      let filtrar;
      filtrar = this.state.peticionApi.filter(function(hero){
        return hero[1] == "BAD email"
      })
      console.log("filtrar" , filtrar)
      let card;
      let modal;
      let tabla;


if(this.state.cards==false){
  console.log("cards", this.state.cards)
     card= <div>
        <MDBRow  style={{marginLeft:120, marginRight:20, marginTop:20,}}>
          <MDBCol md="3" className="mb-3">
              <MDBCard style={{ width: "18rem" }}>
                <MDBCardImage className="rounded mx-auto d-block" style={{width:"70%", marginTop:10}} src="https://image.freepik.com/free-vector/green-abstract-geometric-background_23-2148366726.jpg" waves />
                <MDBCardBody>
                <div className="text-center">
                  <MDBCardTitle>Correos validados</MDBCardTitle>                                    
                  <MDBBtn color="success"  href="#" onClick = {e=>this.success()}>Exitosos</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>


              <MDBCol md="3" className="mb-3">
              <MDBCard style={{ width: "18rem" }}>
                <MDBCardImage className="rounded mx-auto d-block" style={{width:"70%", marginTop:10}} src="https://image.freepik.com/free-vector/flat-design-yellow-comics-background_23-2148798165.jpg" waves />
                <MDBCardBody>
                <div className="text-center">
                  <MDBCardTitle>Correos validados</MDBCardTitle>                 
                  <MDBBtn color="warning" href="#"  onClick = {e=>this.warning()}>Desconocidos</MDBBtn>
                 </div>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
           
              <MDBCol >
              <MDBCard  style={{ width: "18rem"  }}>
                <MDBCardImage className="rounded mx-auto d-block" style={{width:"70%", marginTop:10}} src="https://image.freepik.com/free-vector/flat-design-red-comic-style-background_23-2148797742.jpg" waves />
                <MDBCardBody>
                <div className="text-center">
                  <MDBCardTitle>Correos validados</MDBCardTitle>                  
                  <MDBBtn color="danger"  href="#" onClick={e=>this.danger()}>Erróneos</MDBBtn>
                </div>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
              
              <MDBCol  md="3" className="mb-3">
              <MDBCard style={{ width: "18rem" }}>
                <MDBCardImage className="rounded mx-auto d-block" style={{width:"70%", marginTop:10}} src="https://image.freepik.com/free-vector/purple-3d-modern-background-design_53876-87399.jpg" waves />
                <MDBCardBody>
                <div className="text-center">
                  <MDBCardTitle>Correos validados</MDBCardTitle>                  
                  <MDBBtn color="secondary"  href="#" onClick={e=>this.secondary()}>Inválidos</MDBBtn>
                </div>
                </MDBCardBody>
              </MDBCard> 
              </MDBCol>             
              </MDBRow>  
     </div>
     }

//*********************

  console.log("estado" ,this.state.datos)
    
    const columns = ["id", "Nombre", "Apellidos", "CURP","RFC","Nombre Empresa","Teléfono","Correo","Información"];
     const data = this.state.tablas.map((rows,i)=>{
        //   console.log("esta es rows",rows)   
        // if(this.state.tablas){
        //   modal=<MDBContainer>
        //   <MDBModal  color="info" size="lg"  isOpen={this.state.modal1} >
        //     <MDBModalHeader>Información cliente</MDBModalHeader>
        //     <font   size="1" face="arial">
        //       <ModalBody>
        //         <Table small responsive>
        //     <thead>
        //       <tr>
        //     <td >id</td>
        //     <td >Nombre</td>
        //     <td >Apellido</td>
        //     <td >xxxx</td>
        //     <td >ccc</td>
        //     <td >Direccion</td>
        //     <td >CP</td>
        //     </tr>
        //       </thead>
        //     <tbody>
        //     <tr> 
        //     <td  key={rows.id_cliente}>{rows.id_cliente}</td>
        //     <td >{rows.nombre_cliente}</td>
        //     <td width="5%">{rows.apellidos_cliente}</td>
        //     <td width="5%">{rows.nombreEmpresa}</td>
        //     <td width="5%">{}</td>
        //     <td width="5%">{}</td>
        //     <td width="5%">{}</td>
        //     </tr>
        //     </tbody>           
        //     </Table>
        //     </ModalBody>             
        //     </font>
        //     <MDBModalFooter>
        //       <MDBBtn color="secondary" size="sm" onClick={(e)=>this.setState({modal1:false})}>Cerrrar</MDBBtn>
        //     </MDBModalFooter>
        //   </MDBModal>
        //   </MDBContainer>
        // }       
        let botones = <MDBBtn color ="info" size="sm" onClick={(e)=>this.modal()}> datos cliente </MDBBtn>
          
         return([rows.id_cliente,rows.nombre_cliente, rows.apellidos_cliente, rows.curp, rows.rfc, rows.nombreEmpresa, rows.telefono, rows.correo,botones])
        
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
      if(this.state.tabla == false) {
        tabla =  <div  style={{width:"90%",marginLeft:"5%",marginTop:"2%",marginBottom:"2%"}} >               
        <MUIDataTable  
          title={"tabla clientes"} 
          data={data} 
          columns={columns} 
          options={options} 
        />                
      </div>
      }

      let tableSuccess;
      if(this.state.tableSuccess == true){
        const columns = ["success", "success", "success", "success","success"];

        tableSuccess =  <div  style={{width:"90%",marginLeft:"5%",marginTop:"2%",marginBottom:"2%"}} > 
        <div align="right"><MDBBtn color="red" onClick = {e=>this.cerrarSuccess()}>Cerrar tabla</MDBBtn></div>             
        <MUIDataTable  
          title={"tabla clientes"} 
          data={data} 
          columns={columns} 
          options={options} 
        />         
      </div>
      }


      let tableWarning;
      if(this.state.tableWarning == true){
        const columns = ["Warning", "Warning", "Warning", "Warning","Warning"];

        tableWarning =  <div  style={{width:"90%",marginLeft:"5%",marginTop:"2%",marginBottom:"2%"}} >  
         <div align="right"><MDBBtn color="red" onClick = {e=>this.cerrarWarning()}>Cerrar tabla</MDBBtn></div>             
        <MUIDataTable  
          title={"tabla clientes"} 
          data={data} 
          columns={columns} 
          options={options} 
        />        
      </div>
      }

      
      let tableDanger;
      if(this.state.tableDanger == true){
        const columns = ["Danger", "Danger", "Danger", "Danger","Danger"];

        tableDanger =  <div  style={{width:"90%",marginLeft:"5%",marginTop:"2%",marginBottom:"2%"}} >
          <div align="right"><MDBBtn color="red" onClick = {e=>this.cerrarDanger()}>Cerrar tabla</MDBBtn></div>                   
        <MUIDataTable  
          title={"tabla clientes"} 
          data={data} 
          columns={columns} 
          options={options} 
        />    
      </div>
      }

      let tableSecondary;
      if(this.state.tableSecondary == true){
       
        const columns = ["Secondary", "Secondary", "Secondary", "Secondary","Secondary"];
        
        tableSecondary =  <div  style={{width:"90%",marginLeft:"5%",marginTop:"2%",marginBottom:"2%"}} >    
         <div  align="right"><MDBBtn color="red"  onClick = {e=>this.cerrarSecondary()}>Cerrar tabla</MDBBtn>       </div>      
        <MUIDataTable  
          title={"tabla clientes"} 
          data={data} 
          columns={columns} 
          options={options} 
        />     
      </div>
      }
        return(
            <React.Fragment>
                         
              {card}
              {tabla}           
              {modal}
              {tableSuccess}
              {tableWarning}
              {tableDanger}
              {tableSecondary}
              
            </React.Fragment>
        )
    }
} export default Tablas