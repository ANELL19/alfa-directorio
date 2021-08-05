import React, { Component } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { MDBRow, MDBCol, MDBBtn,MDBAlert, MDBCard,MDBCardBody,MDBContainer} from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
// import Navbar from './navbar'
import { PDFExport } from '@progress/kendo-react-pdf';
import { Container} from '@material-ui/core';
import { Row,Col } from 'reactstrap';
// import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Table } from 'reactstrap';
import imagen from '../imagen/encabezado.JPG'
import titulo1 from  '../imagen/titulo1.png'
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon} from 'mdbreact';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {API} from '../Graphql/Graphql'
import MUIDataTable from "mui-datatables";
import {Alert } from 'reactstrap'
import {Form} from 'reactstrap';
import { Form as Forma, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import {
	Paper,
	Grid,
	Button,
	MenuItem,
  } from '@material-ui/core';

  function onSubmit (values) {
	};

	const validate = values => {
        const errors = {};
        if (!values.Nombre) {
          errors.Nombre = 'Este campo es requerido';
        }
        if (!values.calle) {
          errors.calle = 'Este campo es requerido';
        }
        if (!values.NumExt) {
          errors.NumExt = 'Este campo es requerido';
        }
        if (!values.numInt) {
          errors.numInt = 'Este campo es requerido';
        }
        if (!values.colonia) {
          errors.colonia = 'Este campo es requerido';
        }
        if (!values.cp) {
          errors.cp = 'Este campo es requerido';
        }
        if (!values.city) {
          errors.city = 'Este campo es requerido';
        }
      
        if (!values.estado) {
          errors.estado = 'Required';
        }
        if (!values.RFC) {
            errors.RFC = 'Required';
          }
          if (!values.telefono) {
            errors.telefono = 'Required';
          }

        if (!values.actividades) {
            errors.actividades = 'Required';
          }
       
      
        return errors;
      };
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
            Servicio:"",
            promocion:"", 
            vendedor:"",
            fecha:"" ,
            servicio:"", 
            // precio:"",
            fk_adminAlfa:"",
            form :true,
            pdfview:false,
            botonPdfExport:false,           
            Datos:[],    
            id_productoServicio:" ",
            arrayProductoServicio:[],    
            tablaProductoServicio:[],
            array:[], 
            unidad:"",
            arrayFilter:[],
            id:'',
            tipo:'',
            concepto:'',
            precioProducto:'',  
            cantidad:'',
            descuentoProducto:'',
            subtotal:'',
            arrayInputFields:[],
            cantidadMasiva:[],
            descuentoMasivo:[],
            busqueda:'',
            tablaBusqueda:[]
      }
      this.cancelar = this.cancelar.bind(this)
    }

    componentDidMount(){
      this.setState({tablaBusqueda:this.state.tablaProductoServicio})
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

    cancelar(){
       setTimeout(() => {
    window.location.reload();
  }); 
  }

  onChangeInput =(e)=>{
    const {id,value} = e.target;
    this.setState({
        [id]:value
    })
} 
filtrarElementos  = () => {
  var search = this.state.array.filter((item)=>{
    if(item.concecutivo.toString().includes(this.state.busqueda)){
      return item
    }
  })
  this.setState({tablaBusqueda: search})
}
onChangeInput1 =(e)=>{
  let array = []
  const {id,value} = e.target;
  array.push(id,value)
  this.setState({
    cantidad:value
 })
  this.setState({
     cantidadMasiva:array
  })

} 
onChangeInput2 =(e)=>{
  let array = []
  const {id,value} = e.target;
  array.push(id,value)
 this.setState({
  descuentoProducto:value
})
  this.setState({
    descuentoMasivo:array
 })
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
            concecutivo
                                    
           } 
        }
        `
    } 
     }).then(response=>{
     this.setState({array:response.data.data.getTablaProductoServicio})
     })
     .catch(err=>{
       console.log("err",err.response)
     })   
     
     localStorage.removeItem("id")
     localStorage.removeItem("tipo")
     localStorage.removeItem("concepto")
     localStorage.removeItem("precio") 
     localStorage.removeItem("concecutivo") 
}

handleInputChange = async (index, event) => {
  const values = [...this.state.inputFields];
      if (event.target.name === "productos") {
        values[index].productos = event.target.value;
      }      
      else{
        values[index].precio = event.target.value;
      }  
      this.setState({inputFields:values});

}

 handleSubmit = e => {
  e.preventDefault();
  let array1=[];
  this.state.inputFields.map(rows =>{
    array1.push(rows)
  })
  

};
handleAddFields = async (id) => {
  this.setState({busqueda:''})
  const values = [...this.state.inputFields];
  let valor1=[];
  let valor2=[];
  // values.push({ firstName: '', lastName: '' , precio:''});
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
    console.log( this.state.inputFields)
    this.state.inputFields.map(rows=>{
      filter  = this.state.array.filter(function(hero){
        return hero.id_productoServicio == rows.id
      })
      arrayFilter.push(filter[0])
    })

    this.setState({arrayFilter:filter[0]})
    this.setState({arrayInputFields:arrayFilter})
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

// Guardar(){ 
//    let id1 = this.state.id
//   let tipo1 = this.state.tipo
//   let concepto1 = this.state.concepto
//   let precio1 = this.state.precioProducto
//   let cantidad1 = this.state.cantidadMasiva
//   let descuento1 = this.state.descuentoMasivo
//    console.log("capturar datos",id1,tipo1,concepto1,precio1,cantidad1,descuento1)

// }



onSubmitBtn = (e)=>{   
  // e.preventDefault();
   
  this.setState({botonPdfExport:true})  
  var id_adminAlfa = localStorage.getItem("id_admin")  
  let rfc= this.state.Datos.rfc
  let rs = this.state.Datos.empresa.replace(/,/g, "");
  let nombre  = this.state.Datos.nombre;
  let apellidos = this.state.Datos.apellido;
  let correo1 =  this.state.Datos.correo1;
  let correo2 = this.state.Datos.correo2;
  let tel1 = this.state.Datos.telefono1;
  let tel2 = this.state.Datos.telefono2;
  let servicio  = this.state.Servicio.toUpperCase();
  let precio = this.state.precio;              
  let promocion = this.state.promocion.toUpperCase();
  let iva = ((precio * 16)/100).toFixed(2)
  let vendedor = localStorage.getItem("nombre").toUpperCase() + " "  + localStorage.getItem("apellido").toUpperCase()       
  var suma = (parseInt(precio) + parseFloat(iva))
  let total = suma.toFixed(2)
      axios({
          url:API,
          method:'post',
          data:{
              query:`
              mutation{
              insertCotizaciones(data:"${[rfc,rs,nombre,apellidos,correo1,correo2,tel1,tel2,promocion,servicio,promocion,precio,vendedor,id_adminAlfa]}"){
                   message
                  } 
              }
              `
          }   
          }).then(response=>{
          console.log( 'este es el response',response)
              if(response.data.data. insertCotizaciones.message=="registro exitoso"){                    
            
                  DialogUtility.alert({
                      title:'registro exitoso' ,
                      content: "Cotizacion generada!",
                  });  
              }
             else {
                  DialogUtility.alert({
                      title: 'Algo salio mal, por favor vuelva a intentarlo'                       
                  });                
              }
          })
          .catch(err=>{
              console.log('error',err.response)
          })


}


cerrarCotizacion() {
  this.setState({form:true})
  this.setState({pdfview:false})
}


pdfView (){

  let array=[];
  let array1=[];
  console.log("inputFields",this.state.inputFields);
  this.state.inputFields.map(rows=>{
    array.push(rows)
    array1.push(array)
   
  })
  array.push(this.state.inputFields)
 

array.map(rows=>{    
    array1.push(array) 
  })

  let servicio  = this.state.Servicio.toUpperCase();
  let precio = this.state.precio;
  let promocion = this.state.promocion.toUpperCase();
  if(  servicio && precio && promocion){     
      this.setState({form:false})
      this.setState({pdfview:true})
  }else {
      DialogUtility.alert({
          title:'AVISO !' ,
          content: "Estimado usuario, por favor complete todos los campos obligatorios",
      });          
  }
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
    this.setState({ Datos:response.data.data.getClienteRFC[0]})
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



//  handleRemoveFields = index => {
//   const values = [...this.state.inputFields];
//   values.splice(index, 1);
//   this.setState({inputFields:values});
// };      

onChange = async (e) => {
  e.persist();
  await this.setState({busqueda:e.target.value})
  this.filtrarElementos()
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
   
 
      let formas2;
      let forma3;
      let subtotal;
      let iva;
      let total;
      if(this.state.arrayInputFields[0]){
        formas2 = this.state.arrayInputFields.map(rows=>{
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
           console.log("filterDescuento",filterDescuento)
           if(filterDescuento[0]){
             descuentoProducto = filterDescuento[0][1]
           }

         }          
        //  subtotal = precio - (precio * parseInt(descuentoProducto)/100)


        
        //   if(rows.tipo == "SERVICIO"){
        //     iva  = 0
        //   }else if(rows.tipo == "PRODUCTO SERVICIO"){
        //     iva = subtotal * 0.16;
        //   }
        //   let total = subtotal + iva;
        
          // console.log("id",id)
          // console.log("tipo",tipo)
          // console.log("concepto",concepto)
          // console.log("precioUnitario",precioUnitario)
          // console.log("cantidadDatos",cantidadDatos)
          // console.log("Precio Global",precio)
          // console.log("descuento",descuentoProducto)
          
          // console.log("values",subtotal)
          // console.log("values",iva)
          return(
            <div style={{marginTop:"2%"}}>

            <Form onSubmit={this.onSubmitBtn}>                      
              <MDBRow>   
              <MDBCol md="1" className="mb-1"> 
                        <label htmlFor="defaultFormLoginPasswordEx" ><strong>ID</strong> </label>
                        <input  
                        style={{color:"#3352FF"}}                                    			
                          id="id"
                          type="text"
                          name="ID"			
                          onChange={this.onChangeInput}
                          value={id}
                          required
                          className="form-control"
                          disabled
                          />                                    
              </MDBCol>
              <MDBCol md="2" className="mb-2"> 
                        <label htmlFor="defaultFormLoginPasswordEx" ><strong>Tipo</strong> </label>
                        <input   
                        // style={{texttransform:uppercase}}                                      			
                          id="tipo"
                          type="text"
                          name="Tipo"			
                          onChange={this.onChangeInput}
                          // value={this.state.pass} 
                          value={tipo}
                          required
                          className="form-control"
                          disabled
                          />                                    
              </MDBCol>
              <MDBCol md="4" > 
                        <label htmlFor="defaultFormLoginPasswordEx" ><strong>Concepto</strong> </label>
                        <input   
                        // style={{texttransform:uppercase}}                                      			
                          id="concepto"
                          type="text"
                          name="Concepto"			
                          onChange={this.onChangeInput}
                          // value={this.state.pass} 
                          value={concepto}
                          required
                          className="form-control"
                          disabled                          
                          />                                    
              </MDBCol>
              <MDBCol md="1" className="mb-1"> 
                        <label htmlFor="defaultFormLoginPasswordEx" ><strong>PrecioUnitario</strong> </label>
                        <input   
                        // style={{texttransform:uppercase}}                                      			
                          id="precioUnitario"
                          type="number"
                          name="PrecioUnitario"			
                          onChange={this.onChangeInput}
                          value={precioUnitario} 
                          required
                          className="form-control"
                          disabled
                          />                                    
              </MDBCol>
              <MDBCol md="1" className="mb-1"> 
                        <label htmlFor="defaultFormLoginPasswordEx" ><strong>Cantidad</strong> </label>
                        <input                                        			
                          id={id}
                          type="number"
                          name="Cantidad"			
                          onChange={this.onChangeInput1}
                          value={cantidadDatos} 
                          required
                          className="form-control"
                          />                                    
              </MDBCol>
              <MDBCol md="1" className="mb-1"> 
                        <label htmlFor="defaultFormLoginPasswordEx" ><strong>Precio global</strong> </label>
                        <input                                     			
                          id="precioProducto"
                          type="text"
                          name="PrecioProducto"			
                          onChange={this.onChangeInput}
                          value={precio}
                          required
                          className="form-control"
                          disabled
                          />                                    
              </MDBCol>
              <MDBCol md="1" className="mb-1"> 
                        <label htmlFor="defaultFormLoginPasswordEx" ><strong>Descuento %</strong> </label>
                          <input                                      			
                          id={id}
                          type="number"
                          name="DescuentoProducto"			
                          onChange={this.onChangeInput2}
                          value={descuentoProducto} 
                          required
                          className="form-control"
                          />              
              </MDBCol>
            
              </MDBRow>            
              </Form>
            </div>
          )

         }) 

        forma3 =  <Form onSubmit={this.onSubmitBtn}>
        <MDBRow>  
         <MDBCol md="3" className="mb-3"> 
        <label htmlFor="defaultFormLoginPasswordEx" ><strong>Subtotal</strong> </label>
          <input
          id="subtotal"
          type="text"
          name="Subtotal"			
          onChange={this.onChangeInput}
          value={subtotal} 
          required
          className="form-control"
          disabled
          />              
        </MDBCol>
        <MDBCol md="3" className="mb-3"> 
                <label htmlFor="defaultFormLoginPasswordEx" ><strong>Iva</strong> </label>
                  <input                                     			
                  id="iva"
                  type="text"
                  name="Iva"			
                  onChange={this.onChangeInput}
                  value={iva} 
                  required
                  className="form-control"
                  disabled
                  />              
        </MDBCol>
        <MDBCol md="3" className="mb-3"> 
                <label htmlFor="defaultFormLoginPasswordEx" ><strong>Total</strong> </label>
                  <input   
                // style={{texttransform:uppercase}}                                      			
                  id="total"
                  type="text"
                  name="Total"			
                  onChange={this.onChangeInput}
                  value={total} 
                  required
                  className="form-control"
                  disabled
                  />              
        </MDBCol>
        </MDBRow>  
        </Form>
        
       
      }
      // let forms;
      // if(this.state.arrayFilter.id_productoServicio){
      //   let id = this.state.arrayFilter.id_productoServicio
      //   let tipo =  this.state.arrayFilter.tipo
      //   let concepto =  this.state.arrayFilter.concepto
      //   let precioUnitario = this.state.arrayFilter.precio
      //   let precio;
      //   let cantidad;
      //   let subtotal;
      //   let iva;
      //   if(this.state.cantidad){
      //     cantidad = this.state.cantidad
      //     precio =  parseInt(this.state.arrayFilter.precio) *  parseInt(this.state.cantidad)
      //   }else{
      //     cantidad = 1;
      //     precio =  parseInt(this.state.arrayFilter.precio) *  1
      //   }
      //   if(this.state.descuentoProducto){
      //     subtotal = precio - (precio * parseInt(this.state.descuentoProducto)/100)
      //   }else{
      //     subtotal = precio 
      //   }
      //   if(this.state.arrayFilter.tipo == "SERVICIO"){
      //      iva  = 0
      //   }else if(this.state.arrayFilter.tipo == "PRODUCTO SERVICIO"){
      //      iva = subtotal * 0.16;
      //   }
      //   let total = subtotal + iva;

      //   forms  = <div>
      //     <Form onSubmit={this.onSubmitBtn}>                      
      //       <MDBRow>   
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>ID</strong> </label>
      //                 <input                                      			
      //                   id="id"
      //                   type="text"
      //                   name="ID"			
      //                   onChange={this.onChangeInput}
      //                   value={id}
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />                                    
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Tipo</strong> </label>
      //                 <input   
      //                 // style={{texttransform:uppercase}}                                      			
      //                   id="tipo"
      //                   type="text"
      //                   name="Tipo"			
      //                   onChange={this.onChangeInput}
      //                   // value={this.state.pass} 
      //                   value={tipo}
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />                                    
      //       </MDBCol>
      //       <MDBCol md="6" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Concepto</strong> </label>
      //                 <input   
      //                 // style={{texttransform:uppercase}}                                      			
      //                   id="concepto"
      //                   type="text"
      //                   name="Concepto"			
      //                   onChange={this.onChangeInput}
      //                   // value={this.state.pass} 
      //                   value={concepto}
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />                                    
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>PrecioUnitario</strong> </label>
      //                 <input   
      //                 // style={{texttransform:uppercase}}                                      			
      //                   id="precioUnitario"
      //                   type="number"
      //                   name="PrecioUnitario"			
      //                   onChange={this.onChangeInput}
      //                   value={precioUnitario} 
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />                                    
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Cantidad</strong> </label>
      //                 <input                                        			
      //                   id="cantidad"
      //                   type="number"
      //                   name="Cantidad"			
      //                   onChange={this.onChangeInput}
      //                   value={cantidad} 
      //                   required
      //                   className="form-control"
      //                   />                                    
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Precio global</strong> </label>
      //                 <input                                     			
      //                   id="precioProducto"
      //                   type="text"
      //                   name="PrecioProducto"			
      //                   onChange={this.onChangeInput}
      //                   value={precio}
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />                                    
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Descuento %</strong> </label>
      //                   <input                                      			
      //                   id="descuentoProducto"
      //                   type="number"
      //                   name="DescuentoProducto"			
      //                   onChange={this.onChangeInput}
      //                   value={this.state.descuentoProducto} 
      //                   required
      //                   className="form-control"
      //                   />              
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Subtotal</strong> </label>
      //                   <input
      //                   id="subtotal"
      //                   type="text"
      //                   name="Subtotal"			
      //                   onChange={this.onChangeInput}
      //                   value={subtotal} 
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />              
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Iva</strong> </label>
      //                   <input                                     			
      //                   id="iva"
      //                   type="text"
      //                   name="Iva"			
      //                   onChange={this.onChangeInput}
      //                   value={iva} 
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />              
      //       </MDBCol>
      //       <MDBCol md="3" className="mb-3"> 
      //                 <label htmlFor="defaultFormLoginPasswordEx" ><strong>Total</strong> </label>
      //                   <input   
      //                 // style={{texttransform:uppercase}}                                      			
      //                   id="total"
      //                   type="text"
      //                   name="Total"			
      //                   onChange={this.onChangeInput}
      //                   value={total} 
      //                   required
      //                   className="form-control"
      //                   disabled
      //                   />              
      //       </MDBCol>
      //       </MDBRow>
      //       </Form>
      //   </div>
      // }

      let searchRFC;
      let form;
      let consultarIdProducto;
      let data;
      let tabla;

        var f = new Date();     
       let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
      searchRFC= <div>
        <Row>
                     <MDBCol md="3" className="mb-3"></MDBCol>
                      <MDBCol md="3" className="mb-3"></MDBCol>        
                                      
                      <MDBCol>
                        <div className="md-form mr-auto mb-4">
                <input  type="text" id="rfc" value={this.state.rfc} name="rfc"  onChange={this.onChangeInput}   placeholder="RFC de la Empresa"  aria-label="Search"/>
                    <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto" onClick={e=> this.consultarDatos()}  >                        
                      <MDBIcon icon="search" />
                    </MDBBtn>  
                    </div> 
                      <br></br><br></br>        
                </MDBCol>
                </Row>
      </div>
let vendedor = localStorage.getItem("nombre") + " "  + localStorage.getItem("apellido");
if(this.state.busqueda){
  const columns = ["id_productoServicio", "tipo", "concepto", "precio", "concecutivo","Agregar"];
  data= this.state.tablaBusqueda.map((rows,i)=>{
    let boton = <MDBBtn  onClick={(e) => this.handleAddFields(rows.id_productoServicio)} size = "md" color ="danger">Agregar</MDBBtn>

    return([rows.id_productoServicio,rows.tipo,rows.concepto,rows.precio,rows.concecutivo,boton])
  })
  tabla= 
  <div >          
  <MuiThemeProvider  theme={this.getMuiTheme()}>  
    <MUIDataTable  
      title={"catalogo de Productos y Servicios"} 
      data={data}
      columns={columns} 
      options={options}                     
    /> 
        </MuiThemeProvider>  
      </div> 
}


if (this.state.form == true) {  
  
  form = 
  <div style={{marginTop:"2%"}}>
  <center>    
  <MDBCard narrow style={{width:"95%",heigth:"60%"}}>                          
        <MDBAlert color="primary"  className="h5 text-center mb-4" > <strong>Generar Cotización de Servicio </strong> </MDBAlert>
                    <MDBCardBody>
                    <MDBCol md="3" className="mb-3"></MDBCol>
                    <MDBCol md="3" className="mb-3"></MDBCol>                      
                    <MDBCol> {searchRFC} </MDBCol>
        <Form onSubmit={this.onSubmitBtn}>                      
            <MDBRow>   
            <MDBCol md="3" className="mb-3"> 
                      <label htmlFor="defaultFormLoginPasswordEx" ><strong> Razón social:</strong> </label>
                      <input                                    			
                          id="razonSocial"
                          type="text"
                          name="razonSocial"			
                          onChange={this.onChangeInput}
                          defaultValue={this.state.Datos.empresa}
                          required
                          className="form-control"
                          />                                    
            </MDBCol>
            <MDBCol md="3" className="mb-3"> 
                      <label htmlFor="nombre" ><strong> Nombre (s) del cliente:</strong> </label>
                      <input                                     
                          id="nombre"
                          type="text"
                          name="nombres"
                          onChange={this.onChangeInput}
                          defaultValue={this.state.Datos.nombre}
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
                          defaultValue={this.state.Datos.apellido}
                          required
                          className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginEmailEx"><strong>Correo:</strong></label><input 
                      id="correo1"
                      type="email"
                      name="correo1"
                      onChange={this.onChangeInput}
                      defaultValue={this.state.Datos.correo1}
                      required
                      className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-3">   
                <label htmlFor="defaultFormLoginEmailEx"><strong>Correo alterno:</strong></label>
                <input   
                    icon="envelope"
                    id="correo2"
                    type="email"
                    name="correo2"
                    onChange={this.onChangeInput}                    
                    defaultValue={this.state.Datos.correo2}                     
                    className="form-control" />
           </MDBCol>

            <MDBCol md="3" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Telefono:</strong>
                </label>
                <input                            
                id="telefono1"
                // type="t"
                name="telefono1"
                onChange={this.onChangeInput}
                defaultValue={this.state.Datos.telefono1} 
                required
                className="form-control"/>
           </MDBCol>  
              <MDBCol md="3" className="mb-3">   
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Promocion:</strong>
                </label>
                <input
                            
                    id="promocion"
                    type="text"
                    name="promocion"
                    onChange={this.onChangeInput}
                    value={this.state.promocion}
                    validate 
                   
                    className="form-control"/>
                    </MDBCol>

                    <MDBCol md="3" className="mb-3 mt-4">   
                    <label htmlFor="defaultFormLoginPasswordEx" >
                    <strong> Vendedor : &nbsp;</strong>
                    </label>
                    <label>{vendedor}</label>

                    </MDBCol> 
                    {/* ***************LOS BOTONES PARA AGREGAR***************** */}

     

               

                  </MDBRow>
                  </Form>
                  <MDBCol md="3" className="mb-3"> 
                      <label htmlFor="defaultFormLoginPasswordEx" ><strong>Búsqueda</strong> </label>
                      <input                                    			
                          type="text"
                          name = "busqueda"
                          placeholder = "Buscar"
                          required
                          className="textField"
                          value = {this.state.busqueda}
                          onChange ={this.onChange}
                          />                                    
                  </MDBCol>
              
                  {/* {this.state.inputFields.map((inputField,index) => {  

                     
                      return(
                        // <MDBCol md="3" className="mb-3 ">     
                      
                        <div className="form-group">
                    <MDBRow>
                      
                        <MDBCol md="6" className="mb-3 "> 
                        <select onChange={event => this.handleInputChange(index, event)} name="select">
                          {this.state.array.map(rows=>{
                            return(
                              <option value={rows.id_productoServicio}>{rows.id_productoServicio + " - "}{rows.concepto}</option>
                            )
                          })}
                        </select>
                        <MDBBtn
                          color="primary"
                            size="md"
                            type="submit"
                            onClick={(e) =>this.capturar()}
                            className="text-white"
                          >
                            Consultar
                        </MDBBtn>
                        </MDBCol>
                        <button
                          className="btn btn-link"
                          type="button"
                          onClick={(e) => this.handleRemoveFields(index)}
                        >
                          -
                        </button>
                         <button
                          className="btn btn-link"
                          type="button"
                          onClick={(e) => this.handleAddFields()}
                        >
                          +
                        </button> 
                      </MDBRow>
                      </div> 
                    
                      )
                      
                    })}           */}
                    
                    {tabla}
       
 
{/* 
                  <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                  <Forma
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                          <Grid container alignItems="flex-start" spacing={2} >
                              <Grid item xs={6}>
                              <Field
                                required
                                fullWidth
                                name="estado"
                                component={Select}
                                label="Estado"
                                formControlProps={{ fullWidth: true }}
                              >
                              {this.state.array.map(rows=>{
                                return(
                                  <MenuItem value={rows.id_productoServicio}><strong>{rows.id_productoServicio + " - "}</strong>{rows.concepto}</MenuItem>
                                )
                              })}
                                </Field>
                                </Grid>
                            <Grid item style={{ marginTop: 16 ,marginLeft:100 }}>
                              <MDBBtn
                              color="primary"
                               size="md"
                                type="submit"
                                disabled={submitting}
                                onClick={(e) =>this.evaluar(values)}
                                className="text-white"
                              >
                                Aceptar
                              </MDBBtn>
                            </Grid>
                          </Grid>
                      
                      </form>
                    )}
                  /> 
                 
                </div> */}
                 {formas2}
                  {forma3}
                  <MDBRow style={{marginTop:"10%"}}> 
                      <MDBCol md="3" className="mb-3"/>
                      
                      <MDBCol md="3" className="mb-3">      
                              <MDBBtn   color="info"  onClick = {e=> this.pdfView()}> Generar Cotización</MDBBtn>
                      </MDBCol>
                      <MDBCol md="3" className="mb-3"> 
                              <MDBBtn  color="secondary"   onClick={e=>this.cancelar()} type="submit">Cancelar</MDBBtn>
                      </MDBCol>
              
                  </MDBRow>
               </MDBCardBody>
            </MDBCard>
            </center>
          </div>
          }

          let pdf;
        if(this.state.pdfview == true) {
            let boton;

            if(this.state.botonPdfExport == true) {
                boton =    <div className="example-config">
                            <MDBBtn size="md"color = "success" onClick={e=> () => { this.pdfExportComponent.save(); }}>
                                Descargar Cotización
                            </MDBBtn>
                            </div>
            }

        pdf =   <div>
         <MDBRow style = {{marginLeft:"10%"}}>
            <MDBBtn size="md" disabled = {this.state.botonPdfExport} color = "primary" onClick = {e=> this.onSubmitBtn()}> Enviar cotización </MDBBtn>
            {boton}
            <MDBBtn size="md" color = "secondary" onClick = {e=> this.cerrarCotizacion()}> Cerrar </MDBBtn>
            </MDBRow>
         <div>
        <Paper   style={{width:1200,height:1400, marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}}>
            <img src={titulo1} alt="imagen" alt="imagen"   style={{width:1210,height:150}}/>
            <div style={{ marginBottom:"2%"}}>
            <Row  xs="2">               
                <Col>
                     <p><strong>Razón social:</strong>&nbsp;{this.state.Datos.empresa} </p>                     
                     <p ><strong>Nombre(s):</strong>&nbsp;{this.state.Datos.nombre}&nbsp;{this.state.Datos.apellido}</p>                    
                     <p><strong>Correo:</strong>&nbsp;{this.state.Datos.correo1}</p>                     
                     <p><strong>Télefono:</strong>&nbsp;{this.state.Datos.telefono1}</p>                     
                </Col>   
                <Col >
                     <p><strong>Fecha:</strong>&nbsp;{fecha}</p>
                </Col>                                  
            </Row> 
            <p  face="Verdana"> Buen día, me permito presentar  nuestra propuesta referente a los producto (s) y servicio (s) de su interés.</p>
            <Table bordered>
                   <thead>
                       <tr>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRODUCTO O SERVICIO</td>          
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRECIO MAS IVA</td>
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td style={{padding:"5px"}} colspan="2">{this.state.Servicio}</td>
                       <td style={{padding:"5px"}} colspan="2" align="center">$&nbsp;{"this.state.precio"}</td>
                       </tr>  
                       <tr>
                    <td ROWSPAN="2" colspan="2"></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Precio Normal</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"this.state.precio"}</td>         
                  </tr>
                  <tr>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Descuento de {"this.state.descuento"}%:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"calDescuentoAplicado"}</td>
                  </tr>
                  <tr>
                  <td ROWSPAN="2" colspan="2" ></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">subtotal:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"Subtotal"}</td>
                  </tr>
                  <tr>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA 16%:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"IVA"}</td>
                  </tr>
                  <tr>
                  <td ROWSPAN="2" colspan="2" ></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">Total:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"total"}</td>
                  </tr>
                   </tbody>
            </Table>        
             

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
                margin="0.5cm"
                forcePageBreak=".page-break"
                fileName={`${"Cotización"} ${this.state.Datos.empresa} PDF ${new Date().getFullYear()}`}
                ref={(component) => this.pdfExportComponent = component}
                >
       
       <Container  style={{width:550,height:2000}}>   

       <Paper >            
     <img src={imagen } alt="titulo1" style={{width:500,height:55}}/>  
             
         <p style={{fontFamily:'arial', fontSize:'10px', marginTop:-9 }}>               
         <strong> {this.state.Datos.empresa} </strong> 
           <br></br>
          {this.state.Datos.nombre}&nbsp;{this.state.Datos.apellido}
           <br></br>
           {this.state.Datos.correo1}
           <br></br>
           {this.state.Datos.telefono1}
           <br></br>
           Buen día, me permito presentar nuestra propuesta referente a los producto (s) y servicio (s) de su interés. 
          </p>   

<div style= {{ marginTop:-2}}>    
<MDBTable bordered  >
<MDBTableHead color="light-blue accent-1"  align="center" >
 <tr>
   <th style={{padding:"3px"}}  colspan="3" ><p  style={{fontFamily:'arial', fontSize:'7px'}}>PRODUCTO O SERVICIO</p></th>
   <th style={{padding:"3px"}} ><p  style={{fontFamily:'arial', fontSize:'7px'}}>PRECIO MAS IVA</p></th>
 </tr>
</MDBTableHead>
<MDBTableBody>
 <tr>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} colspan="3" >{"this.state.Servicio"}</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"this.state.precio"}</td>         
 </tr>
 <tr>
   <td ROWSPAN="2" colspan="2"></td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Precio Normal</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"this.state.precio"}</td>         
 </tr>
 <tr>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Descuento de {"this.state.descuento"}%:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"calDescuentoAplicado"}</td>
 </tr>

 <tr>
 <td ROWSPAN="2" colspan="2" ></td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">subtotal:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"Subtotal"}</td>
 </tr>
 <tr>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA 16%:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"IVA"}</td>
 </tr>
 <tr>
 <td ROWSPAN="2" colspan="2" ></td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">Total:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{"total"}</td>
 </tr>
</MDBTableBody>
</MDBTable>     
</div>

<p style={{color:"red",fontFamily:'arial', fontSize:'10px',marginTop:-10}} >Promoción {this.state.promocion.toLowerCase()}</p>          
<div style= {{marginTop:-2}}>
<MDBTable bordered>
<MDBTableHead color="light-blue accent-1"  align="center">
 <tr>
   <th style={{padding:"3px"}} align="center" colspan="3"><p  style={{fontFamily:'arial', fontSize:'7px'}}>PÓLIZA DE SOPORTE TECNICO REMOTO BASICAS ** LA POLIZA ES POR SISTEMA **</p></th>
 </tr>
</MDBTableHead>
<MDBTableBody>
 <tr>
   <td style={{padding:"4px"}} align="center"><p style={{fontFamily:'arial', fontSize:'7px'}}>SERVICIO</p></td>
   <td style={{padding:"4px"}} align="center"><p style={{fontFamily:'arial', fontSize:'7px'}}>PRECIO ESPECIAL</p></td>
   <td style={{padding:"4px"}} align="center"><p style={{fontFamily:'arial', fontSize:'7px'}}>PRECIO NORMAL</p></td>         
 </tr>
 <tr>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">Póliza semestral - Por sistema</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$ 2,500.00</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$ 5,000.00</td>
 </tr>
 <tr>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">Póliza semestral - Por sistema</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$ 4,000.00</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$ 8,000.00</td>          
 </tr>
 <tr>
   <td  style={{padding:"3px" }}colspan="2" align="center"></td>
   <td style={{padding:"3px" ,color:"red"}} align="center"><p style={{fontFamily:'arial', fontSize:'7px'}}>PRECIO MAS IVA</p></td>                
 </tr>
</MDBTableBody>
</MDBTable>
</div> 

      
<div style={{marginTop:-12}}>
<p style={{fontFamily:'arial', fontSize:'10px'}}>  Nota: El costo no incluye Interfaz, Formatos, Carga de Catálogos o alguna implementación adicional a la mencionada en su cotización.</p>   
 
          <p style={{fontFamily:'arial', fontSize:'10px'}}>No se aceptan devoluciones</p> 
         
       <fort style={{color:"#3371FF", fontFamily:'arial', fontSize:'10px'}}>Condiciones Comerciales y Formas de Pago</fort>
{/* <div style={{fontFamily:'arial', fontSize:'9px',marginTop:-15}}> */}
{/* <p  style={{ fontFamily:'arial', fontSize:'5px'}}>  */}

<p style={{ fontFamily:'arial',  fontSize:'10px'}}>
 * Todos los costos anteriormente presentados son más IVA.
 <br></br>
 * Precios representados en M.N.
 <br></br>
 * Pago por anticipado.
 <br></br>
 * Pago por depósito bancario o transferencia electrónica.
 </p>   
       <ul>
       <p align="left" marginLeft="20%" style={{fontFamily:'arial', fontSize:'10px',marginTop:-5}}>
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

<p style={{fontFamily:'arial', fontSize:'10px',marginTop:-10}}>Sin más por el momento y agradeciéndole por su amable atención,
Quedo a sus órdenes para cualquier duda al respecto.</p>
     {/* </div > */}
    <div  className="text-center mb-4" style={{fontFamily:'arial', fontSize:'10px',marginTop:-10}}>
   
         <strong >{localStorage.getItem("nombre") + " " + localStorage.getItem("apellido")}</strong> 
         <p>{localStorage.getItem("correo")}</p>   
         <strong style={{color:"#3371FF"}}> ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.</strong>
        <br></br>
         <fort style={{color:"#3371FF", fontSize:'10px', fontFamily:'arial' }}>www.ads.com.mx </fort> 
  </div >  
  <p className="text-center mb-4" style={{fontFamily:'arial', fontSize:'10px', marginTop:-10}}>Av. Chapultepec N° 473, Piso 3 Col. Juárez, Del. Cuauhtémoc C.P. 06600 Ciudad de México Información, soporte y ventas: Conmutador con 6 líneas   1209 0740 -  5553 2049</p> 
   <br></br>


</div>    

</Paper>

     </Container>
                </PDFExport>
            </div>
        </div>
                }
      return (
        <React.Fragment>             
        {form} 
        {pdf}
        {consultarIdProducto}
        
        {/* {formas2} */}
        
        </React.Fragment>
         
      );
    }
  }
  export default Cotizaciones
