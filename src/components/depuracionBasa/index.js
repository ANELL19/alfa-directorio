import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import MUIDataTable from "mui-datatables";
import React, { Component } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button'; 
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
//import ReactExport from "react-export-excel";

// import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
// import ExportToExcel from "./ExportToExcel"
import {MDBContainer,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
        filesDepurado:[],
        spinner:false,
        modal12: false,
        exportexcel1:false
   }
           }
       getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
              root: {              
              fontFamily : 'arial' ,
              fontSize: '14px',  
             
              textAlign:"center"

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
        
    abrirModal=()=>{
      this.setState({modal:this.state.modal})
    }
    // _exporter;
    // export = () => {
    //     this._exporter.save();
    // }
    showFile = async (e) => {
    e.preventDefault()
    this.setState({spinner:true})
    let json1=[]
    const reader = new FileReader()
    reader.onload = async (e) => { 
    const text = (e.target.result) 
    ///   var reemplazar=text.replace('ó', 'o')
      // var reem=reemplazar.replace("á", "a")
//  var reemplazarAcentos=function(cadena)
// {
// 	var chars={
// 		"á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
// 		"à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u", "ñ":"n",
// 		"Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",
// 		"À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U", "Ñ":"N"}
// 	var expr=/[áàéèíìóòúùñ]/ig;
// 	var res=cadena.replace(expr,function(e){return chars[e]});
// 	return res;
// }
 
//console.log("reemplazar",reem)
    var splitText=text.split('*')
    let spelit= text.split("\n").join("")
    let filter= spelit.split("\-").join("")
    let busqueda =filter.split("Created")
    let arrayFilter=[]

      busqueda.map(rows=>{
        arrayFilter.push(rows.split('*'))
      })
    
      let filtro  = []
        arrayFilter.map(rows=>{
       // filtro.push([rows[1],,rows[3],rows[5],rows[6],rows[7],rows[8],rows[9]])
        filtro.push([rows[1],rows[2],rows[3],rows[4],rows[5],rows[6],rows[7],rows[8],rows[9]])
        console.log("esto es filtro",filtro)
      //  if( rows[1]&&  rows[3] && rows[4] && rows[5]&& rows[6] && rows[7] && rows[8] && rows[9]){

      //  }
      })
        await filtro.map(rows=> {
      if(rows[1] &&   rows[8] ){
              var splitTxt = rows[0].split(':') //department
        //    var splitTxt1 = rows[1].split(':') //operador
              var splitTxt2 = rows[2].split(':') //visitor
        //    var splitTxt3 = rows[3].split(':') //duration
              var splitTxt4 = rows[4].split(':') //rating
              var splitTxt5 = rows[5].split(':')
              var splitTxt6 = rows[6].split(':')
              var splitTxt7 = rows[7].split(':') //empresa
              var splitTxt8 = rows[8].split('&nbsp;')  
          
            

        var list={
          'datos':[]
        }
          list.datos.push({
                "Department":splitTxt[1],
            // "Operator":splitTxt1[1],  
                "Visitor":splitTxt2[1],
            // "Duration":splitTxt3[1],
               "Rating":splitTxt4[1],
                "Chat_ID":splitTxt5[1],
                "Empresa":splitTxt6[1],
                "Telefono":splitTxt7[1],
                "Poliza":splitTxt8    
          })
      const json = JSON.stringify(list);
      var obj = JSON.parse(json);
      json1.push(obj.datos)
           }
      this.setState({filesDepurado:json1})
      this.render(json1)
      })
      this.setState({ spinner:false})
      };
      reader.readAsText(e.target.files[0])
        }      
      modal(dataChat){
        console.log("dataChat" , dataChat)
        this.setState({modal12:true})
      }
      toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      
       
      }
   
render() {
 
  let modal;
  const columns = [ "Departamento","Empresa","Contacto","Correo ","Telefono","Rating","Chat_ID",{name:"Chat", options:{filter: false, sort:false,download:false}}]; 
  const  data=this.state.filesDepurado.map((rows,i)=>{
    let boton = <div><MDBBtn size="sm"  onClick={(e)=>this.modal(rows[0].Poliza)}>Chat</MDBBtn></div> 
        modal= <MDBContainer>
        <MDBModal size="lg" isOpen={this.state.modal12} >
          <MDBModalHeader >Chat</MDBModalHeader>
          <font   size="1" face="arial">
          <MDBModalBody>
            {rows[0].Poliza}
          </MDBModalBody> 
          </font>
          <MDBModalFooter>
            <MDBBtn color="secondary" size="sm" onClick={(e) => this.setState({modal12:false})}>Cerrrar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
   //    console.log("esto contien rows",rows)
        let caracter_menor=rows[0].Visitor.indexOf('<')
        let nombre_visitor=rows[0].Visitor
        let substring_nombre=rows[0].Visitor.substring(caracter_menor,nombre_visitor)

        let menor= rows[0].Visitor.indexOf('<')
        let mayor = rows[0].Visitor.indexOf('>')
        let substring_correo=rows[0].Visitor.substring(menor,mayor)

        let substrig=substring_correo.substring(1).replace("ú", "u")
        let id_chat=rows[0].Chat_ID.slice(0,12)

       
       // console.log("que es chat_id",id_chat)

       let caracteres_especiales=rows[0].Department.replace("ó", "o")
       
        // let Empresas=rows[0].Empresa.replace("ó", "o")
        // let empresas2=Empresas.replace("é", "e")
        // let empresas3=empresas2.replace("á", "a")
        // let empresa4=empresas3.replace("ñ", "n")
      //  let Telefono=rows[0].Telefono.slice(0 ,20).replaceAll("\\D+","")   
     //  console.log("esto es caracteres especiales ",caracteres_especiales)
      // if (rows[0].Telefono =20) 
     // console.log("esto es numero de telefono")
    //  else()
 return([caracteres_especiales,rows[0].Empresa,substring_nombre,substrig,rows[0].Telefono,rows[0].Rating,id_chat,boton])  

})

 let contador=[]
 contador=this.state.filesDepurado.length

//  for (i=0;i<contador;i++){ 
//   console.log("contador",contador[i])
// }
 
  
//let contador=this.state.filesDepurado.lenght

    let spinner;
    if(this.state.spinner==true){
      spinner=<div class="spinner-border spinner-border-sm" role="status">
      <span class="sr-only">Loading...</span>
    </div>
      } 
     const options={ 
      
      filterType:"drowpdawn",
      responsive: "stacked",
      rowHover:"true",
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
     
   return (
      <React.Fragment>   
             <Button
          style={{margin:30}}
          variant="outlined"
          color="primary"
          component="label"
          accept =".txt"
          startIcon={<CloudUploadIcon/>}
        >
           Cargar.txt 
           &nbsp;
           <input
            type="file"
            accept =".txt"
            style={{ display: "none" }}
            onChange={(e) => this.showFile(e)} 
          />
         {spinner} {contador}
        </Button>     
        <div style={{width:1300,margin:40}} > 
          <MuiThemeProvider  theme={this.getMuiTheme()}>        
            <MUIDataTable             
              title={"lista"}
              data={data}
              columns={columns} 
              options={options}>
            </MUIDataTable>      
          </MuiThemeProvider>      
        </div>            
      {modal}
 
     
       {/* <div>  
                                        <ReactHTMLTableToExcel  
                                       columns={columns}
                                                className="btn btn-info"  
                                                //table="emp"  
                                                columns={columns}
                                               
                                               sheet="Sheet"  
                                                buttonText="Export excel" />  
                                </div> */}         


      </React.Fragment>  
    )  
  }
}
export default Index