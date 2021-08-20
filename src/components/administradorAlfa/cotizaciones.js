import React, { Component } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { MDBRow, MDBCol, MDBBtn,MDBAlert, MDBCard, MDBCardBody } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Container} from '@material-ui/core';
import { Row,Col } from 'reactstrap';
import { Table } from 'reactstrap';
import imagen from '../imagen/encabezado.JPG'
import titulo1 from  '../imagen/titulo1.png'
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon} from 'mdbreact';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {API} from '../Graphql/Graphql'
import MUIDataTable from "mui-datatables";
import {Form} from 'reactstrap';
import { Paper } from '@material-ui/core';
import {Card, Modal} from 'antd'

class Cotizaciones extends Component {
  pdfExportComponent
    constructor(props) {
      super(props);
      this.state = {
        inputFields: [] ,    
            rfc:"", 
            razonSocial:"" ,
            nombre:"", 
            apellidos:"", 
            correo1:"" ,
            correo2:"", 
            telefono1:"" ,
            telefono2:"",              
            promocion:"", 
            vendedor:"",            
            form :true,
            pdfview:false,
            botonPdfExport:false,           
            datos:[], 
            Datos:[],    
            id_productoServicio:" ",
            arrayProductoServicio:[],    
            tablaProductoServicio:[],
            array:[], 
            arrayFilter:[],
            subtotal:[],
            arrayInputFields:[],
            cantidadMasiva:[],
            descuentoMasivo:[],
            busqueda:'',
            tablaBusqueda:[],
            inputs: [],
            multArray:[],
            idGlobal:[],
            descuentos:[],
            subtotalGlobal:'',
            ivaGlobal:'',
            totalGlobal:'',
            isModalVisible:false,
            isModalVisible2:false,
            camposObligatorios:[],
            enviarEmail:false,
            rowsProductoServicio:[]
      }
      
      this.onChange = this.onChange.bind(this)
      this.cerrarCotizacion = this.cerrarCotizacion.bind(this)
    }

    componentDidMount(){
      this.setState({tablaBusqueda:this.state.tablaProductoServicio});
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
      showModal = () => {
        this.setState({isModalVisible:true})
      };
    
      handleOk = () => {
        this.setState({isModalVisible:false})
      };
    
      handleCancel = () => {
        this.setState({isModalVisible:false})
      };

      showModal2 = () => {
        this.setState({isModalVisible2:true})
      };
      handleOk2 = () => {
        this.setState({isModalVisible2:false})
      };
    
      handleCancel2 = () => {
        this.setState({isModalVisible2:false})
      };
  onChangeInput =(e)=>{
    const {id,value} = e.target;
    this.setState({
        [id]:value
    })
} 

filtrarElementos  = () => {
  var search = this.state.array.filter((item)=>{
    if(item.consecutivo.toString().includes(this.state.busqueda)){
      return item
    }
  })
  this.setState({tablaBusqueda: search})
}

 async componentWillMount(){
   await axios({
    url:API,
    method:'post',
    data:{
        query:`
        query{
          getTablaProductoServicio(data:"${[""]}"){
            id_productoServicio
            tipo
            concepto
            precio
            consecutivo                                    
           } 
        }
        `
    } 
     }).then(response=>{
     this.setState({array:response.data.data.getTablaProductoServicio})
     console.log("estado de array",this.state.array)
     })
     .catch(err=>{
       console.log("err",err.response)
     })
     localStorage.removeItem("id")
     localStorage.removeItem("tipo")
     localStorage.removeItem("concepto")
     localStorage.removeItem("precio") 
     localStorage.removeItem("consecutivo")
}

 handleSubmit = e => {
  let array1=[];
  this.state.inputFields.map(rows =>{
    array1.push(rows)
  })

};
handleAddFields = async (id) => {
  this.setState({busqueda:''})
  const values = [...this.state.inputFields];
  let valor2=[];
  values.push({ id });
  values.map(rows=>{
    valor2.push(rows)
    this.setState({Datos:valor2})
  } );
   await this.setState({inputFields:values}) 
  this.capturar()  
};


capturar(){
  let filter;
  let arrayFilter=[]
  this.setState({arrayFilter:''})
  this.setState({cantidad:''})
  let idProd = this.state.inputFields;
  if(idProd){
    this.state.inputFields.map(rows=>{
      filter  = this.state.array.filter(function(hero){
        return hero.id_productoServicio == rows.id
      })
      arrayFilter.push(filter[0])
    })

    this.setState({arrayFilter:filter[0]})
    this.setState({arrayInputFields:arrayFilter})
    console.log("estado arrayFilter",this.state.arrayFilter)
   
  }else{
    DialogUtility.alert({
      title:'AVISO !' ,
      content: "Seleccione un producto o servicio",
  });        
  }
}

renderTabla(){
  this.setState({renderTabla:true}); 
}


// onSubmitBtn = (e)=>{   
//   // e.preventDefault();   
//   this.setState({botonPdfExport:true})  
//   var id_adminAlfa = localStorage.getItem("id_admin")  
//   let rfc= this.state.Datos.rfc
//   let rs = this.state.razonSocial || this.state.Datos.empresa
//   // .replace(/,/g, "");
//   let nombre  = this.state.nombre || this.state.Datos.nombre;
//   let apellidos = this.state.apellidos || this.state.Datos.apellido;
//   let correo1 =  this.state.correo1 || this.state.Datos.correo1;
//   let correo2 = this.state.correo2 || this.state.Datos.correo2;
//   let tel1 = this.state.telefono1 || this.state.Datos.telefono1;
//   // let tel2 = this.state.telefono2 || this.state.Datos.telefono2;           
//   let promocion = this.state.promocion.toUpperCase();
//   let campos = this.state.camposObligatorios
  
//   // let vendedor = localStorage.getItem("nombre").toUpperCase() + " "  + localStorage.getItem("apellido").toUpperCase()       
 
//   // console.log("estado de los datos", this.state.Datos)
//     // let input =  this.state.arrayInputFields
//     // let inputFields =  this.state.inputFields    
//     // let descuento =  this.state.descuentos
//     // let multArray = this.state.multArray
//     // let idGlobal = this.state.idGlobal
//      // let subtotal = this.state.subtotal
//       let subtotalGlobal =  this.state.subtotalGlobal
//       let ivaGlobal = this.state.ivaGlobal
//       let totalGlobal = this.state.totalGlobal
//       console.log("data enviada campos", campos )
      // axios({
      //     url:API,
      //     method:'post',
      //     data:{
      //         query:`
      //         mutation{
      //         insertCotizaciones(data:"${[rfc,rs,nombre,apellidos,correo1,correo2,tel1,promocion]}"){
      //              message
      //             } 
      //         }
      //         `
      //     }   
      //     }).then(response=>{
      //         if(response.data.data.insertCotizaciones.message=="registro exitoso"){                    
            
      //             DialogUtility.alert({
      //                 title:'registro exitoso' ,
      //                 content: "Cotizacion registrada",
      //             });  
      //         }
      //        else {
      //             DialogUtility.alert({
      //                 title: 'Algo salio mal, por favor vuelva a intentarlo'                       
      //             });                
      //         }
      //     })
      //     .catch(err=>{
      //         console.log('error',err.response)
      //     })

          // axios({
          //   url:API,
          //   method:'post',
          //   data:{
          //       query:`
          //       mutation{
          //       insertTotales(data:"${[subtotalGlobal,ivaGlobal,totalGlobal]}"){
          //            message
          //           } 
          //       }
          //       `
          //   }   
          //   }).then(response=>{
          //     console.log("response",response)                
          //   })
          //   .catch(err=>{
          //       console.log('error',err.response)
          //   }) 
// }

cerrarCotizacion() {
  window.location.reload();
}


pdfView (){
  
  let rfc= this.state.datos.rfc;  
  let rs,nombre,apellido,correo1,correo2,telefono1;
  let promocion = this.state.promocion;

  let subtotalGlobal =  this.state.subtotalGlobal
  let ivaGlobal = this.state.ivaGlobal
  let totalGlobal = this.state.totalGlobal

  if(this.state.razonSocial){
     rs = this.state.razonSocial;
  }else{
     rs = this.state.datos.empresa
  }if(this.state.nombre){
    nombre = this.state.nombre;
  }else{
    nombre = this.state.datos.nombre
  }if(this.state.apellidos){
    apellido = this.state.apellidos;
  }else{
    apellido = this.state.datos.apellido
  }if(this.state.correo1){
    correo1 = this.state.correo1;
  }else{
    correo1 = this.state.datos.correo1
  }if(this.state.correo2){
    correo2 = this.state.correo2;
  }else{
    correo2 = this.state.datos.correo2
  }if(this.state.telefono1){
    telefono1 = this.state.telefono1;
  }else{
    telefono1 = this.state.datos.telefono1
  }
  let array = []
  let texto,texto2,texto3,texto4,texto5,texto6;

  let objeto;
  if(rs === undefined){
    texto = "Razon Social"
    array.push(texto)
  } if(nombre === undefined){
    texto2 = "Nombre"
    array.push(texto2)
  } if(apellido === undefined){
    texto3 = "Apellidos"
    array.push(texto3)
  } if(correo1 === undefined){
    texto4 = "Correo1"
    array.push(texto4)
  } if(correo2 === undefined){
    texto5 = "Correo2"
    array.push(texto5)
  } if(telefono1 === undefined){
    texto6 = "Telefono1"
    array.push(texto6)
  }
  if(this.state.totalGlobal){
    console.log("totalGlobal",this.state.totalGlobal)
  }else{
    objeto = "Además debe tener al menos 1 producto seleccionado y calculado"
    array.push(objeto)
  }
  this.setState({camposObligatorios:array})
  console.log(nombre)
  console.log(apellido)
  console.log(correo1)
  console.log(correo2)
  console.log(telefono1)
  console.log(promocion)
  console.log("estado de los datos", this.state.Datos)
  console.log("arrayInputFields[0]", this.state.arrayInputFields) 
  console.log("inputFields", this.state.inputFields)  
  console.log("subtotal", this.state.subtotal)
  console.log("subtotalGlobal", this.state.subtotalGlobal)
  console.log("ivaGlobal", this.state.ivaGlobal)
  console.log("totalGlobal", this.state.totalGlobal)
  console.log("descuentos", this.state.descuentos)
  console.log("multArray", this.state.multArray)
  console.log("idGlobal", this.state.idGlobal)
  let fk_productoServicio=this.state.idGlobal


  if(rs && nombre && apellido && correo1 && correo2 && telefono1 && promocion && this.state.totalGlobal){     
      this.setState({form:false});
      this.setState({pdfview:true});
  }else {
    this.showModal()         
  }
  let arrayI = this.state.arrayInputFields;
  let arrayinputFields = this.state.inputFields
  console.log("array",arrayinputFields)
  let arrayRows=[]
  arrayI.map(rows=>{
    arrayRows.push(rows.id_productoServicio)
console.log("rows",rows.id_productoServicio,rows.tipo,rows.concepto,rows.precio)
  })
  console.log("rowsProductoServicio",arrayRows)

  //  axios({
  //         url:API,
  //         method:'post',
  //         data:{
  //             query:`
  //             mutation{
  //             insertCotizaciones(data:"${[rfc,rs,nombre,apellido,correo1,correo2,telefono1,promocion,fk_productoServicio]}"){
  //                  message
  //                 } 
  //             }
  //             `
  //         }   
  //         }).then(response=>{
  //             if(response.data.data.insertCotizaciones.message=="registro exitoso"){                    
            
  //                 DialogUtility.alert({
  //                     title:'registro exitoso' ,
  //                     content: "Cotizacion registrada",
  //                 });  
  //             }
  //            else {
  //                 DialogUtility.alert({
  //                     title: 'Algo salio mal, por favor vuelva a intentarlo'                       
  //                 });                
  //             }
  //         })
  //         .catch(err=>{
  //             console.log('error',err.response)
  //         })
          axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation{
                insertTotales(data:"${[subtotalGlobal,ivaGlobal,totalGlobal]}"){
                     message
                    } 
                }
                `
            }   
            }).then(response=>{
              console.log("response",response)                
            })
            .catch(err=>{
                console.log('error',err.response)
            }) 

}

consultarDatos(){
  let rfc=this.state.rfc
  axios({
    url:API,
    method:'post',
    data:{
        query:`
        query{
          getClienteRFC(data:"${[rfc]}"){
            id_cliente
            empresa
            rfc
            nombre
            apellido
            correo1
            correo2
            telefono1
            telefono2   
            message                             
           } 
        }
        `
    }   
     }).then(response=>{
   if(response.data.data.getClienteRFC[0]){               
    this.setState({ datos:response.data.data.getClienteRFC[0]})  

    console.log("dato",this.state.datos)
   } else{
    DialogUtility.alert({            
      title:'AVISO!' ,
      content:'El RFC no fue encontrado'      
  });
   }
     })
     .catch(err=>{
         console.log('error',err)
     })   
} 

onChange = async (e) => {
  e.persist();
  await this.setState({busqueda:e.target.value})
  this.filtrarElementos()
}

calcular(datosTabla){
  let array2 = [];
  let array= [];
  let array3 =[];
  let inputFields = this.state.inputFields;

  let idGlobal = [];
  // let servicio = datosTabla.filter(function(hero){
  //   return hero.data[1] === "SERVICIO"
  // })
  // let producto = datosTabla.filter(function(hero){
  //   return hero.data[1] === "PRODUCTO SERVICIO"
  // })


  datosTabla.map(rows=>{
    array.push(rows.data[3])
    idGlobal.push(rows.data[0]) 
  })

  inputFields.map(row=>{
    console.log("rows de inputField",row)
    if(row.cantidad){
      array2.push(row.cantidad)
    }else{
      array2.push(1)
    }
    if(row.descuento){
      array3.push(row.descuento)
    }else{
      array3.push(0)
    }
  })
  array.push(datosTabla)
  let multArray = []
  for (let i = 0; i < array.length; i++) {
    multArray[i] = parseInt(array[i]) * parseInt(array2[i]);
 }
 let subtotal= []
 if(multArray[0]){
  for (let i = 0; i < multArray.length; i++) {
    subtotal[i] =  multArray[i] - parseInt(multArray[i]) * parseInt(array3[i]) / 100;
  } 
 }

 let arrayDescuentos = []
 if(multArray[0]){
  for (let i = 0; i < multArray.length; i++) {
    arrayDescuentos[i] =  parseInt(multArray[i]) * parseInt(array3[i]) / 100;
  } 
 }
 const nuevoSubtotal = subtotal.filter(function (value) {
  return !Number.isNaN(value);
});

 const descuentos = arrayDescuentos.filter(function (value) {
  return !Number.isNaN(value);
});
const precioTotal = multArray.filter(function (value) {
  return !Number.isNaN(value);
});

var subtotalGlobal = nuevoSubtotal.reduce((x, y) => x + y);

const totalProducto = subtotal.filter(function (value) {

  return !Number.isNaN(value);
});

var ivaGlobal = subtotalGlobal * 0.16
var totalGlobal = subtotalGlobal + ivaGlobal
this.setState({subtotal:totalProducto})
this.setState({subtotalGlobal:subtotalGlobal})
this.setState({ivaGlobal:ivaGlobal})
this.setState({totalGlobal:totalGlobal})
this.setState({descuentos:descuentos})
this.setState({multArray:precioTotal})
this.setState({idGlobal:idGlobal})
}

handleInputChange = async (index, event) => {
  const values = [...this.state.inputFields];
      if (event.target.name === "input") {
        values[index].cantidad = event.target.value;
      }      
       else {
        values[index].descuento = event.target.value;
      }
      this.setState({inputFields:values});
}

enviarEmail(){
  const nombreAdmin = localStorage.getItem("nombre");
  const apellidoAdmin = localStorage.getItem("apellido")
  const correoAdmin = localStorage.getItem("correo")
  axios({
    url:API,
    method:'post',
    data:{
        query:`
        mutation{
          sendEmailCotizacion(data:"${[this.state.datos.rfc + new Date().getFullYear()+".pdf", nombreAdmin + " " + apellidoAdmin,correoAdmin]}"){   
            message                             
           } 
        }
        `
    }   
     }).then(response=>{
      if(response.data.data.sendEmailCotizacion.message === "Correo Enviado") {
        this.showModal2();         
      }
      console.log("reponse",response)
    }).catch(err=>{
      console.log(err.response)
    })
}
ejecutarEnvio(){
  DialogUtility.alert({
    title:'AVISO !' ,
    content: "La opcion de enviar su cotización por email se activará en unos segundos. Nota: Si desea volver a generar la misma cotización con valores diferentes, elimine la cotización anterior y descarguela nuevamente ya que el sistema envía la cotización con el rfc del cliente. ",
  });    

  setTimeout(()=>{
    this.setState({enviarEmail:true})
  },5000)
}
    render() {
      const options={ 
        filterType:"drowpdawn",
        responsive: "stacked",
        responsive:"standard",
        pagination:false,
        search:false,
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
      let datosTabla;
      const options2={ 
        filterType:"drowpdawn",
        responsive: "stacked",
        responsive:"standard",
        pagination:false,
        search:false,
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
      
      } ,
         onTableChange: (action, tableState) => {
          datosTabla=tableState.displayData
        },
        // onFilterChange: (action, filtroTable) => {
        //   filtro=filtroTables
        //   }          
      } 

      let modal;
      if(this.state.camposObligatorios[0]) {
        modal= <Modal title="Aviso!" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>Estimado usuario por favor complete los siguientes campos obligatorios ...</p>
        {this.state.camposObligatorios.map(rows=>{
          return <table>
            <tr>
              <td><strong>{rows}</strong></td>
            </tr>
          </table>
        })}
     
       </Modal>
      }
    
      let modalEmail= <Modal title="Aviso!" visible={this.state.isModalVisible2} onOk={this.handleOk2} onCancel={this.handleCancel2}>
        <p>Su cotización ha sido enviada.</p>    
        <p>Por favor verifique su copia en su bandeja de correo y en caso de no recibir el adjunto inténtelo nuevamente</p>     
       </Modal>
      let tdIdGlobal;
      if(this.state.idGlobal[0]){
         tdIdGlobal =  <td> <center>IdProducto</center> </td>
      }
      let tdTotalProducto;
      if(this.state.multArray[0]){
        tdTotalProducto =<td><center>Precio global</center></td>
      }
      let tdSubtotal;
      if(this.state.multArray[0]){
        tdSubtotal = <td><center>Total</center></td>
      }
      let tdDescuentos;
      this.state.descuentos.map(rows=>{
        if(rows !== 0){
          tdDescuentos = <td><center>Descuento aplicado</center></td>
        }else{
          tdDescuentos = <td><center>Descuento no aplicado</center></td>

        }
      })
     
      let tablaTotal;
      if(this.state.totalGlobal){
        tablaTotal = <table style={{marginLeft:"86%"}}>
        <tr>
          <td><center>Subtotal</center></td>     
        </tr>
        <tr>
          <td>
          <input
            type="text"
            value={this.state.ivaGlobal.toFixed(2)} 
            required
            className="form-control"
            disabled
            />     
          </td>
        </tr>
        <tr>
        <td><center>Iva</center></td>
        </tr>
        <tr>
        <td>
          <input
            type="text"
            value={this.state.subtotalGlobal.toFixed(2)} 
            required
            className="form-control"
            disabled
            />       
          </td>
        </tr>
        <tr>
        <td><center>Totales</center></td>
        </tr>
        <tr>
        <td>
          <input
            type="text"
            value={this.state.totalGlobal.toFixed(2)} 
            required
            className="form-control"
            disabled
            />     
          </td>
        </tr>
      </table>    
      }      
     
      let botonProductoServicio;
      let tablaProductos;
      let dataTablaProductos;
      let input1 = this.state.inputFields.map((inputField,index) => {
        let concepto;
        if(this.state.arrayInputFields[index]){
          concepto = this.state.arrayInputFields[index].concepto
        }
        return(
          <input size="12" style={{marginTop:"3%",marginLeft:"1%"}}
            type="number"
            className="form-control"
            id="input"
            name="input"
            value={inputField.productos}
            placeholder = {"Id"+ " " + inputField.id + " " + concepto}
            onChange={event => this.handleInputChange(index, event)}
          />
        )
      })       
   
      let input2 = this.state.inputFields.map((inputField,index) => {
        let concepto;
        if(this.state.arrayInputFields[index]){
          concepto = this.state.arrayInputFields[index].concepto
        }
        return(
          <input size="12" style={{marginTop:"3%",marginLeft:"1%"}}
            type="number"
            className="form-control"
            id="input2"
            name="input2"
            value={inputField.productos}
            onChange={event => this.handleInputChange(index, event)}
            placeholder = {"Id"+ " " + inputField.id + " " + concepto}
             />       
        )        
      })      

      if(this.state.arrayInputFields[0]){
        // let a = 0;
        let columnsTablaProductos;      
        dataTablaProductos = this.state.arrayInputFields.map(rows=>{
          let id = rows.id_productoServicio
          let tipo = rows.tipo
          let concepto =  rows.concepto
          let precioUnitario = rows.precio
          let precio;          
          let arrayDatos = []; 
          let filter;
          let cantidadDatos;
          let arrayDescuento = [];
          let descuentoProducto;
          let filterDescuento;
          arrayDatos.push(this.state.cantidadMasiva)
          arrayDescuento.push(this.state.descuentoMasivo)
          if(this.state.cantidadMasiva[0]){
             filter = arrayDatos.filter(function(hero){
              return hero[0] == id
            })
            if(filter[0]){
              cantidadDatos = filter[0][1]
              precio =  parseInt(rows.precio) *  parseInt(cantidadDatos)              
            }
          }
          if(this.state.descuentoMasivo[0]){
            filterDescuento = arrayDescuento.filter(function(hero){
             return hero[0] == id
           })
           if(filterDescuento[0]){
             descuentoProducto = filterDescuento[0][1]
           }
         }         
        
      columnsTablaProductos = ["id", "Tipo", "Concepto", "PrecioUnitario"];           
          return([id,tipo,concepto,precioUnitario])
         }) 

         tablaProductos= <div style={{marginTop:"2%"}} >    
         <div style={{width:"95%"}}>
         <MuiThemeProvider  theme={this.getMuiTheme()}>  
          <MUIDataTable  
            title={"Productos y servicios seleccionados"} 
            data={dataTablaProductos}
            columns={columnsTablaProductos} 
            options={options2}                     
          /> 
              </MuiThemeProvider> 
          </div>   
          <Card  style={{marginTop:"2%",width:"95%"}}>
          <table>
            <tr>
              {tdIdGlobal}
              <td><center> Cantidad</center></td>
              {tdTotalProducto}
              <td><center>% Descuento</center></td>
               {tdDescuentos}
              <td></td>
              {tdSubtotal} 
            </tr>
            <tr>        
            {this.state.idGlobal.map(rows=>{
                if(rows){
                  return(
                    <tr>
                    <td>
                       <input size="5"  style={{marginTop:"3%",marginLeft:"1%",color:"#339CFF"}}
                        type="text"
                        className="form-control"
                        value={rows}
                        disabled
                      /> 
                    </td>
                    </tr>
                  )
                }               
              })}     
              <td>{input1}</td>            
              {this.state.multArray.map(rows=>{
                if(rows){
                  return(
                    <tr>
                    <td>
                       <input size="12" style={{marginTop:"3%",marginLeft:"1%"}}
                        type="text"
                        className="form-control"
                        value={rows}
                        disabled
                      /> 
                    </td>
                    </tr>
                  )
                }               
              })}
             <td>{input2}</td>
             {this.state.descuentos.map(rows=>{
                if(rows !== 0 ){
                  return(
                    <tr>
                    <td>
                       <input size="12" style={{marginTop:"3%",marginLeft:"1%",color:"#F45602"}}
                        type="text"
                        className="form-control"
                        value={rows}
                        disabled
                      /> 
                    </td>
                    </tr>
                  )
                }   
                if(rows === 0 ){
                  return(
                    <tr>
                    <td>
                       <input size="12" style={{marginTop:"3%",marginLeft:"1%",color:"#F45602"}}
                        type="text"
                        className="form-control"
                        value = "No aplica"
                        disabled
                      /> 
                    </td>
                    </tr>
                  )
                }                 
              })} 
             <td></td>
             {this.state.subtotal.map(rows=>{
                if(rows){
                  return(
                    <tr>
                    <td>
                       <input size="12" style={{marginTop:"3%",marginLeft:"1%"}}
                        type="text"
                        className="form-control"
                        value={rows}
                        disabled
                      /> 
                    </td>
                    </tr>
                  )
                }               
              })}  
            </tr>
          </table>
          {tablaTotal}
          </Card>
          </div> 
        botonProductoServicio = <MDBBtn onClick = {e=>this.calcular(datosTabla)}  size="md" color="danger">Calcular</MDBBtn>
      }

      let searchRFC;
      let form;
      let consultarIdProducto;
      let data;
      let tabla;

        var f = new Date();     
       let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
      searchRFC= 
               <Row>
                     <MDBCol md="3" className="mb-3"></MDBCol>
                      <MDBCol md="3" className="mb-3"></MDBCol>        
                      <MDBCol>
                     <div className="md-form mr-auto">
                     <input  type="text" id="rfc" value={this.state.rfc} name="rfc"  onChange={this.onChangeInput}   placeholder="RFC de la Empresa"  aria-label="Search"/>
                    <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto" onClick={e=> this.consultarDatos()}  >                        
                      <MDBIcon icon="search" />
                    </MDBBtn>  
                    </div> 
                </MDBCol>
                </Row>
let vendedor = localStorage.getItem("nombre") + " "  + localStorage.getItem("apellido");
if(this.state.busqueda){
  const columns = ["id_productoServicio", "tipo", "concepto", "precio", "consecutivo","Agregar"];
  data= this.state.tablaBusqueda.map((rows,i)=>{
    let boton = <MDBBtn  onClick={(e) => this.handleAddFields(rows.id_productoServicio)} size = "md" color ="danger">Agregar</MDBBtn>

    return([rows.id_productoServicio,rows.tipo,rows.concepto,rows.precio,rows.consecutivo,boton])
  })
  tabla= 
  <div style={{width:"95%"}}>          
  <MuiThemeProvider  theme={this.getMuiTheme()}>  
    <MUIDataTable  
      title={"Catálogo de productos y servicios"} 
      data={data}
      columns={columns} 
      options={options}                     
    /> 
        </MuiThemeProvider>  

      </div>      
}


if (this.state.form == true) {  
  let titulo =  <h5><strong>Generar cotización </strong></h5>
  form = 
  <div >
  <center>    
  <Card title = {titulo} style={{width:"95%"}} extra = {<div><h6><strong> Vendedor</strong></h6> <label>{vendedor}</label></div>}>                                          
      {searchRFC}
      <div style= {{width: "90%"}}>
        <Form onSubmit={this.onSubmitBtn}>                      
            <MDBRow>   
            <MDBCol md="3" className="mb-3"> 
                      <label htmlFor="defaultFormLoginPasswordEx" ><strong> Razón social:</strong> </label>
                      <input  
                          size="12"                                  			
                          id="razonSocial"
                          type="text"
                          name="razonSocial"			
                          onChange={this.onChangeInput}
                          value={this.state.razonSocial || this.state.datos.empresa}
                          required
                          className="form-control"
                          />                                    
            </MDBCol>
            <MDBCol md="3" className="mb-3"> 
                      <label htmlFor="nombre" ><strong> Nombre (s) del cliente:</strong> </label>
                      <input    
                          size="12"                                 
                          id="nombre"
                          type="text"
                          name="nombres"
                          onChange={this.onChangeInput}
                          value={this.state.nombre || this.state.datos.nombre}
                          required
                          className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-3"> 
                     <label htmlFor="defaultFormLoginPasswordEx" > <strong>Apellidos: </strong></label>
                     <input                                              
                          id="apellidos"
                          type="text"
                          name="apellidos"
                          onChange={this.onChangeInput}
                          value={this.state.apellidos || this.state.datos.apellido}
                          required
                          className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginEmailEx"><strong>Correo:</strong></label>
                  <input 
                      id="correo1"
                      size="12"
                      type="email"
                      name="correo1"
                      onChange={this.onChangeInput}
                      value={this.state.correo1 || this.state.datos.correo1}
                      required
                      className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-3">   
                <label htmlFor="defaultFormLoginEmailEx"><strong>Correo alterno:</strong></label>
                <input   
                    icon="envelope"
                    size="12"
                    id="correo2"
                    type="email"
                    name="correo2"
                    onChange={this.onChangeInput}                    
                    value={this.state.correo2 || this.state.datos.correo2}                     
                    className="form-control" />
           </MDBCol>

            <MDBCol md="3" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Telefono:</strong>
                </label>
                <input                            
                id="telefono1"
                size="12"
                type="text"
                name="telefono1"
                onChange={this.onChangeInput}
                value={this.state.telefono1 || this.state.datos.telefono1} 
                required
                className="form-control"/>
           </MDBCol>  
              <MDBCol md="3" className="mb-3">   
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Promocion:</strong>
                </label>
                <input
                    id="promocion"
                    size="12"
                    type="text"
                    name="promocion"
                    onChange={this.onChangeInput}
                    value={this.state.promocion}
                    validate 
                   
                    className="form-control"/>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">   
                    <div className="md-form mr-auto mb-6">   
                        <MDBIcon icon="search"  size="2x"/>                           
                        <input
                        type="text"
                        size="20"
                        name = "busqueda"
                        placeholder = "Buscar clave del producto"
                        required
                        className="textField"
                        value = {this.state.busqueda}
                        onChange ={this.onChange}
                        />
                      </div> 
                    </MDBCol>
                  </MDBRow>
                  </Form>
                  </div>
                 {tabla}
                 {tablaProductos} {botonProductoServicio}
                     
                  <center><MDBBtn   color="info"  onClick = {e=> this.pdfView()}> Generar Cotización</MDBBtn></center>
            </Card>
            </center>
          </div>
          }
        let botonEnvio;  
        if(this.state.enviarEmail === true) {
          botonEnvio = <MDBBtn size = "md" color = "success" outline onClick = {e=>this.enviarEmail()}>Enviar por correo</MDBBtn>
        }  
          let pdf;
        if(this.state.pdfview === true) {
            let boton;
            // if(this.state.botonPdfExport == true) {
                boton =    <div className="example-config">
                            <MDBBtn size="md"color = "success" onClick={() => { this.pdfExportComponent.save(); this.ejecutarEnvio()}}>
                                Descargar Cotización
                            </MDBBtn>
                            {botonEnvio}
                            </div>
            // }

        pdf =   <div>
         <MDBRow style = {{marginLeft:"10%"}}>
            {/* <MDBBtn size="md" disabled = {this.state.botonPdfExport} color = "primary" onClick = {e=> this.onSubmitBtn()}> Registrar cotización </MDBBtn> */}
            {boton}
            <MDBBtn size="md" color = "secondary" onClick = {e=> this.cerrarCotizacion()}> Cerrar </MDBBtn>
          </MDBRow>
         <div>
        <Paper   style={{padding:"1%", width:1000,height:1100, marginLeft:"7%",marginTop:"2%",marginBottom:"2%"}}>
            <img src={titulo1} alt="imagen" style={{width:1000,height:150}}/>
            <div style={{ marginBottom:"2%", width:"95%"}}>
            <Row  xs="3">               
                <Col>
                     <p><strong>Razón social:</strong>&nbsp;{this.state.razonSocial || this.state.datos.empresa} </p>                     
                     <p ><strong>Nombre(s):</strong>&nbsp;{this.state.nombre || this.state.datos.nombre}&nbsp;{this.state.apellidos || this.state.datos.apellido}</p>                    
                     <p><strong>Correo:</strong>&nbsp;{this.state.correo1 || this.state.datos.correo1}</p>                     
                     <p><strong>Télefono:</strong>&nbsp;{this.state.telefono1 || this.state.datos.telefono1}</p>                     
                </Col>   
                <Col >
                     <p><strong>Fecha de emisión: </strong>&nbsp;{fecha}</p>
                </Col>                                  
            </Row> 
            <p  face="Verdana"><strong> Buen día, me permito presentar  nuestra propuesta referente a los producto (s) y servicio (s) de su interés.</strong></p>
            <center>
            <Table style={{width:980}} bordered>
                   <thead>
                       <tr>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue"  align="center">Producto o servicio</td>          
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue"  align="center">Precio Unitario</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue"  align="center">Tipo</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue"  align="center">Cantidad</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue"  align="center">Desc. %</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue"  align="center">Desc. $</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue"  align="center">Total P/prod.</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                       <td>
                       {this.state.arrayInputFields.map(rows=>{
                         return(
                            <tr style={{padding:"5px"}} align="center">{rows.concepto}</tr>
                         )
                       })} 
                       </td> 
                       <td>
                        {this.state.arrayInputFields.map(rows=>{
                         return(
                            <tr style={{padding:"5px"}} align="center">${rows.precio}</tr>
                         )
                       })}
                       </td>
                       <td>
                        {this.state.arrayInputFields.map(rows=>{
                         return(
                            <tr style={{padding:"5px"}} align="center">{rows.tipo}</tr>
                         )
                       })} 
                       </td> 
                       <td>
                      {this.state.inputFields.map(param =>{
                        let cantidad;
                        if(param.cantidad){
                          cantidad = param.cantidad
                        }else{
                          cantidad = 1;
                        }
                        
                        return(
                          <tr style={{padding:"5px"}} align="center">{cantidad} Unidad(es)</tr>
                        )
                       })}
                       </td> 
                       <td>
                       {this.state.inputFields.map(param =>{
                        let descuento;
                        if(param.descuento){
                          descuento = param.descuento
                        }else{
                          descuento = 0;
                        }
                        
                        return(
                          <tr style={{padding:"5px"}} align="center">{descuento} %</tr>
                        )
                      })}
                      </td>
                      <td>
                      {this.state.descuentos.map(rows=>{
                        return(
                          <tr style={{padding:"5px"}} align="center">${rows} </tr>
                        )
                      })}
                      </td>
                      <td>
                      {this.state.subtotal.map(row=>{
                      return(
                        <tr style={{padding:"5px"}} align="center">${row}</tr>
                      )
                      })}
                      </td>
                  </tr>
                  <tr>
              
                  </tr>
                  <tr>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} bgcolor="#D6DBDF"><strong>SUBTOTAL</strong></td>
                    <td  style={{padding:"5px"}} align="left"  bgcolor="#D6DBDF">${this.state.subtotalGlobal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center" ></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} bgcolor="#D6DBDF"><strong>IVA</strong></td>
                    <td  style={{padding:"5px"}} align="left"  bgcolor="#D6DBDF">${this.state.ivaGlobal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} align="center"></td>
                    <td  style={{padding:"5px"}} bgcolor="#D6DBDF"><strong>TOTAL</strong></td>
                    <td  style={{padding:"5px"}} align="left"  bgcolor="#D6DBDF">${this.state.totalGlobal.toFixed(2)}</td>
                  </tr>
                   </tbody>
            </Table>      
          </center>


   <p style={{color:"red"}} htmlFor="defaultFormLoginPasswordEx"><strong>Promoción &nbsp;{this.state.promocion.toLowerCase()}</strong></p>

   
        <p><strong> Nota:</strong> El costo no incluye Interfaz, Formatos, Carga de Catálogos o alguna implementación adicional a la mencionada en su cotización.</p>
        <p><strong> No se aceptan devoluciones</strong></p>           
        <p style={{color:"#3371FF"}}><strong>Condiciones Comerciales y Formas de Pago</strong></p>

           <ul >
               <li>Todos los costos anteriormente presentados son más IVA.</li>
               <li>Precios representados en M.N.</li>
               <li>Pago por anticipado</li>
               <li>Pago por depósito bancario o transferencia electrónica.</li>	
           </ul>
           <fort  > 
               <p align="left" marginLeft="20%">
                   - Cuenta: 50020978434 
               <br></br>
               - Clabe: 036180500209784346
               <br></br>
               - Banco: Inbursa
               <br></br>
               - Beneficiario: ALFA DISEÑO DE SISTEMAS, S.A. de C.V.
               <br></br>
               - RFC: ADS020524CH1
               </p>
           </fort>

       <p>Sin más por el momento y agradeciéndole por su amable atención,
            Quedo a sus órdenes para cualquier duda al respecto. </p>

         <fort> 
              
             <p className="text-center mb-4" >               
               {localStorage.getItem("nombre") + " "  + localStorage.getItem("apellido")}
                 {/* esto es nombre y Apellidos */}
               <br></br>              
               {localStorage.getItem("correo")}
               {/* Esto es el correo */}
               <br></br>
               <br></br>
               <strong> ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.</strong>
               <br></br>
             <u  style={{color:"#3371FF"}}>www.ads.com.mx </u>
             </p>
              <p  className="text-center mb-4">Av. Chapultepec N° 473, Piso 3 Col. Juárez, Del. Cuauhtémoc C.P. 06600 Ciudad de México <br></br> Información, soporte y ventas:
                 Conmutador con 6 líneas   1209 0740 -  5553 2049</p>             
       </fort  > 
       </div>
              </Paper>
              </div>            
            <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                
            <PDFExport
                paperSize="letter"
                margin="1cm"
                forcePageBreak=".page-break"
                fileName={this.state.datos.rfc + new Date().getFullYear()+".pdf"}
                ref={(component) => this.pdfExportComponent = component}
                >
       <div>   
     <img src={imagen } alt="titulo1" style={{width:550,height:55}}/> 
               <table style = {{marginLeft:"2%",marginTop:"1%"}} > 
                 <td>
                     <tr style={{fontFamily:'Verdana', fontSize:'9px'}}>{this.state.razonSocial || this.state.datos.empresa}</tr>                    
                     <tr style={{fontFamily:'Verdana', fontSize:'9px'}}>{this.state.nombre || this.state.datos.nombre}&nbsp;{this.state.apellidos || this.state.datos.apellido}</tr>                    
                     <tr style={{fontFamily:'Verdana', fontSize:'9px'}}>{this.state.correo1 || this.state.datos.correo1}</tr>                  
                     <tr style={{fontFamily:'Verdana', fontSize:'9px'}}>{this.state.telefono1 || this.state.datos.telefono1}</tr>                     
                     <tr style={{fontFamily:'Verdana', fontSize:'9px'}}>{fecha}</tr>
                 </td>    
               </table>             
            <p  style={{fontFamily:'Verdana', fontSize:'9px',marginTop:"1%",marginLeft:"2%"}}><strong> Buen día, me permito presentar  nuestra propuesta referente a los producto (s) y servicio (s) de su interés.</strong></p>
            <center>
            <MDBTable component={Paper}  small  style={{width:560}} bordered>
                   <thead>
                       <tr>
                       <td width="27%" style={{padding:"5px",fontFamily:'Verdana', fontSize:'9px'}} bgcolor="DeepSkyBlue"  align="center">Producto o servicio</td>          
                       <td width="9%" style={{padding:"5px",fontFamily:'Verdana', fontSize:'9px'}} bgcolor="DeepSkyBlue"  align="center">Precio U.</td>
                       <td width="18%" style={{padding:"5px",fontFamily:'Verdana', fontSize:'9px'}} bgcolor="DeepSkyBlue"  align="center">Tipo</td>
                       <td width="13%" style={{padding:"5px",fontFamily:'Verdana', fontSize:'9px'}} bgcolor="DeepSkyBlue"  align="center">Cantidad</td>
                       <td width="9%" style={{padding:"5px",fontFamily:'Verdana', fontSize:'9px'}} bgcolor="DeepSkyBlue"  align="center">Desc. %</td>
                       <td width="9%" style={{padding:"5px",fontFamily:'Verdana', fontSize:'9px'}} bgcolor="DeepSkyBlue"  align="center">Desc. $</td>
                       <td width="15%" style={{padding:"5px",fontFamily:'Verdana', fontSize:'9px'}} bgcolor="DeepSkyBlue"  align="center">Total P/prod.</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                       <td>
                       {this.state.arrayInputFields.map(rows=>{
                         return(
                            <tr style={{fontFamily:'Verdana', fontSize:'9px'}} align="center">{rows.concepto}</tr>
                         )
                       })} 
                       </td> 
                       <td>
                        {this.state.arrayInputFields.map(rows=>{
                         return(
                            <tr style={{fontFamily:'Verdana', fontSize:'9px'}} align="center">$ {rows.precio}</tr>
                         )
                       })}
                       </td>
                       <td>
                        {this.state.arrayInputFields.map(rows=>{
                         return(
                            <tr style={{fontFamily:'Verdana', fontSize:'7px'}} align="center">{rows.tipo}</tr>
                         )
                       })} 
                       </td> 
                       <td>
                      {this.state.inputFields.map(param =>{
                        let cantidad;
                        if(param.cantidad){
                          cantidad = param.cantidad
                        }else{
                          cantidad = 1;
                        }
                        
                        return(
                          <tr style={{fontFamily:'Verdana', fontSize:'9px'}} align="center">{cantidad} Unidad(es)</tr>
                        )
                       })}
                       </td> 
                       <td>
                       {this.state.inputFields.map(param =>{
                        let descuento;
                        if(param.descuento){
                          descuento = param.descuento
                        }else{
                          descuento = 0;
                        }
                        
                        return(
                          <tr style={{fontFamily:'Verdana', fontSize:'9px'}} align="center">{descuento} %</tr>
                        )
                      })}
                      </td>
                      <td>
                      {this.state.descuentos.map(rows=>{
                        return(
                          <tr style={{fontFamily:'Verdana', fontSize:'9px'}} align="center">$ {rows} </tr>
                        )
                      })}
                      </td>
                      <td>
                      {this.state.subtotal.map(row=>{
                      return(
                        <tr style={{fontFamily:'Verdana', fontSize:'9px'}} align="center">$ {row}</tr>
                      )
                      })}
                      </td>
                  </tr>
                  <tr>
              
                  </tr>
                  <tr>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td  style={{fontFamily:'Verdana', fontSize:'9px'}} bgcolor="#D6DBDF"><strong>SUBTOTAL</strong></td>
                    <td  style={{fontFamily:'Verdana', fontSize:'9px'}} align="left"  bgcolor="#D6DBDF">$ {this.state.subtotalGlobal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td  align="center"></td>
                    <td  align="center"></td>
                    <td  align="center"></td>
                    <td  align="center" ></td>
                    <td  align="center"></td>
                    <td  style={{fontFamily:'Verdana', fontSize:'9px'}} bgcolor="#D6DBDF"><strong>IVA</strong></td>
                    <td  style={{fontFamily:'Verdana', fontSize:'9px'}} align="left"  bgcolor="#D6DBDF">$ {this.state.ivaGlobal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td align="center"></td>
                    <td  style={{fontFamily:'Verdana', fontSize:'9px'}} bgcolor="#D6DBDF"><strong>TOTAL</strong></td>
                    <td  style={{fontFamily:'Verdana', fontSize:'9px'}} align="left"  bgcolor="#D6DBDF">$ {this.state.totalGlobal.toFixed(2)}</td>
                  </tr>
                   </tbody>
            </MDBTable>      
          </center>


      
<div style={{marginTop:12}}>
<p style={{fontFamily:'arial', fontSize:'9px'}}>  Nota: El costo no incluye Interfaz, Formatos, Carga de Catálogos o alguna implementación adicional a la mencionada en su cotización.</p>   
 
          <p style={{fontFamily:'arial', fontSize:'9px'}}>No se aceptan devoluciones</p> 
         
       <fort style={{color:"#3371FF", fontFamily:'arial', fontSize:'10px'}}>Condiciones Comerciales y Formas de Pago</fort>
{/* <div style={{fontFamily:'arial', fontSize:'9px',marginTop:-15}}> */}
{/* <p  style={{ fontFamily:'arial', fontSize:'5px'}}>  */}

<p style={{ fontFamily:'arial',  fontSize:'9px'}}>
 * Todos los costos anteriormente presentados son más IVA.
 <br></br>
 * Precios representados en M.N.
 <br></br>
 * Pago por anticipado.
 <br></br>
 * Pago por depósito bancario o transferencia electrónica.
 </p>   
       <ul>
       <p align="left" marginLeft="20%" style={{fontFamily:'arial', fontSize:'9px',marginTop:-5}}>
         - Cuenta: 50020978434 
     <br></br>
     - Clabe: 036180500209784346
     <br></br>
     - Banco: Inbursa
     <br></br>
     - Beneficiario: ALFA DISEÑO DE SISTEMAS, S.A. de C.V.
     <br></br>
     - RFC: ADS020524CH1
     </p>
       </ul>  

<p style={{fontFamily:'arial', fontSize:'9px',marginTop:-10}}>Sin más por el momento y agradeciéndole por su amable atención,
Quedo a sus órdenes para cualquier duda al respecto.</p>
     {/* </div > */}
    <div  className="text-center mb-4" style={{fontFamily:'arial', fontSize:'9px',marginTop:-10}}>
   
         <strong >{localStorage.getItem("nombre") + " " + localStorage.getItem("apellido")}</strong> 
         <p>{localStorage.getItem("correo")}</p>   
         <strong style={{color:"#3371FF"}}> ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.</strong>
        <br></br>
         <fort style={{color:"#3371FF", fontSize:'9px', fontFamily:'arial' }}>www.ads.com.mx </fort> 
  </div >  
  <p className="text-center mb-4" style={{fontFamily:'arial', fontSize:'9px', marginTop:-10}}>Av. Chapultepec N° 473, Piso 3 Col. Juárez, Del. Cuauhtémoc C.P. 06600 Ciudad de México Información, soporte y ventas: Conmutador con 6 líneas   1209 0740 -  5553 2049</p> 
   <br></br>


</div>    


</div>
                </PDFExport>
            </div>
        </div>
                }
      return (
        <React.Fragment>             
        {form} 
        {pdf}
        {consultarIdProducto}
        {modal}
        {modalEmail}
        </React.Fragment>
         
      );
    }
  }
  export default Cotizaciones

