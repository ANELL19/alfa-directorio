
import React, { Component } from "react"
import NavbarDashboard from './navbarDashboard'
import MUIDataTable from "mui-datatables";
import { MDBBtn } from 'mdbreact';
import axios from 'axios'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {API} from '../Graphql'


class HomeAdmin extends Component{
  constructor(props){
    super(props)
    this.state = {
         larazonSocial:'',        
         arrayApi:[],
         arrayfilter:[]
         
        }
    } 

    getMuiTheme = () => createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
            root: {              
            fontFamily : 'arial' ,
            fontSize: '14px',  
           
            // textAlign:"center"

          },          
        },
        MUIDataTableHeadCell: {
          root: {         
            fontSize: '16px',
            textAlign:"center"
          }
        },
        paperResponsiveScrollFullHeightFullWidth: {
          position: 'absolute',
        },
        responsiveBase: {
          overflow: 'auto',
          '@media print': {
            height: 'auto !important',
          },
        },  
        
      }
      })
     async componentWillMount(){
      const fk_paquetes  = localStorage.getItem("fk_paquetes");
      // const API='http://localhost:4000/graphql';       
    

     await axios({
        url:API,
        method:'post',
        data:{
            query:`
            query{
                getPaquetes(data:"${[fk_paquetes]}"){
                   empresas
               } 
            }
            `
        }   
         }).then(response=>{
            // console.log("response-DASH",response)
            localStorage.setItem("paquetesdeAdmonGral",response.data.data.getPaquetes.empresas)
         })
         .catch(err=>{
             console.log('error',err)
         })

 // ************ API *********
        // axios.get(`https://www.eventbriteapi.com/v3/users/me/?token=LE7TWGVIP64TOSQ7VWHV`)
         //axios.get(`https://www.eventbriteapi.com/v3/categories/?token=LE7TWGVIP64TOSQ7VWHV`)
         //axios.get(`https://www.eventbriteapi.com/v3/events/147172170925/?token=LE7TWGVIP64TOSQ7VWHV`) encontre el id_organizations
 // *********************

       
        //   axios.get(`https://www.eventbriteapi.com/v3/organizations/524103565401/events/?token=LE7TWGVIP64TOSQ7VWHV`)
        // .then(res => {        
        //   this.setState({arrayApi:res.data.events})
        //  console.log("rows",this.state.arrayApi)            
        // }).catch(err=>{
        //   console.log(err)
        // })
         
      
        axios.get(`https://www.eventbriteapi.com/v3/organizations/524103565401/events/?token=LE7TWGVIP64TOSQ7VWHV`)
       
     .then(response=>{      
       this.setState({arrayApi:response.data.events})    
      }).catch(error=>{
        console.log("error",error)
      })
        }

    render(){ 
      let cards; 
      let carousel;
      let buton;
      console.log("estado" , this.state.arrayApi)      
       const columns = ["IMAGEN","NOMBRE DEL EVENTO", "CUPO DE PARTICIPANTES", "FECHA INICIAl","FECHA FINAL","DESCRIPCIÓN","REGISTRARSE"];
        let data =  this.state.arrayApi.map(rows=>{         
          cards =  
          <td > <img src = {rows.logo.url}  style={{height:100, width: 200}}/></td>           

            buton=<div>
               <MDBBtn color="info"  href={rows.url} >Registrarse</MDBBtn>
             
            </div>
        return( [ cards,rows.name.text, rows.capacity,rows.start.local,rows.end.local,rows.description.text, buton])
      })
      
      
      const options={ 
        filterType:"drowpdawn",
        responsive: "stacked",
        responsive:"standard",
        print:false,
        download:false,
        filter:false,
        caseSensitive:false,
        selectableRows:"none",
        viewColumns:false,      
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
       const rs = localStorage.getItem("razonSocial");     
        return(
        <React.Fragment>
             <NavbarDashboard data={rs}/>
           <div  style={{width:"90%",marginLeft:"5%",marginTop:"2%",marginBottom:"2%"}}>          
             <MuiThemeProvider  theme={this.getMuiTheme()}>  
                <MUIDataTable  
                  title={"Tabla de Eventos "} 
                    data={data}
                  columns={columns} 
                  options={options} 
                    
                /> 
            </MuiThemeProvider>  
           </div> 
        </React.Fragment>
        )
    }
} export default HomeAdmin