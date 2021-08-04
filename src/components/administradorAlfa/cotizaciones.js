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
        inputFields: [{          
          productos: '',
          precio: '',         
        }] ,    
        razonSocial:"" ,
            nombre:"", 
            apellidos:"", 
            correo1:"" ,
            correo2:"", 
            telefono1:"" ,
            telefono2:"",            
            Servicio:"",
            precio:"", 
            descuento:" " ,
            totalDescuento:"",
            iva:"",           
            totalFloat:"",
            promocion:"", 
            vendedor:"",
            fecha:"" ,   
            fk_adminAlfa:"",
            form :true,
            pdfview:false,
            botonPdfExport:false,
            rfc:"",
            Datos:[],    
            id_productoServicio:" ",
            arrayProductoServicio:[],    
            tablaProductoServicio:[],
            array:[], 
            unidad:""  
            
      }
      this.cancelar = this.cancelar.bind(this)
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
                                    
           } 
        }
        `
    } 
     }).then(response=>{
     console.log( 'este es el response de tablaProductos',response.data.data.getTablaProductoServicio) 
     this.setState({array:response.data.data.getTablaProductoServicio})
     console.log("estado",this.state.array)
     })
     .catch(err=>{
         console.log('error',err)
     })   
     
     localStorage.removeItem("id")
     localStorage.removeItem("tipo")
     localStorage.removeItem("concepto")
     localStorage.removeItem("precio") 
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
  console.log("inputFields",this.state.inputFields);
  let array1=[];
  this.state.inputFields.map(rows =>{
    array1.push(rows)
    // console.log("esto es rows",array1)
  })
//  let var = this.state.inputFields.filter(firstName)
//   console.log("esto es rows",var)
//   let filter= this.state.inputFields.filter(firstName)
//   console.log("esto es filter",filter)

};

renderTabla(){
  this.setState({renderTabla:true}); 
}

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
              insertCotizaciones(data:"${[rfc,rs,nombre,apellidos,correo1,correo2,tel1,tel2,servicio,precio,iva,total,promocion,vendedor,id_adminAlfa]}"){
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

evaluar  = (values) =>{
  console.log("values",values)
}
cerrarCotizacion() {
  this.setState({form:true})
  this.setState({pdfview:false})
}


pdfView (){
  let array=[];
  let array1=[];
  // console.log("inputFields",this.state.inputFields);
  // this.state.inputFields.map(rows=>{
  //   array.push(rows)
  //   array1.push(array)
  //   console.log("que es rows", rows)
  //   console.log("que es", array)
  //   console.log("que es array1", array1)

  // })

//   array.push(this.state.inputFields)
//   console.log("que es", array[0])

// array.map(rows=>{
    
//     array1.push(array)
//     console.log("que es rows", rows)
//     // console.log("que es", array)
//     console.log("que es array1", array1)

//   })

  // const result = this.state.inputFields.filter(array1);
  // console.log("esto es resultados",result)

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
     console.log( 'este es el response',response)
   if(response.data.data.getClienteRFC[0]){               
    this.setState({ Datos:response.data.data.getClienteRFC[0]})
    console.log("esto es Data",this.state.Datos)
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

consultarProductoServicio(){
 let producto=this.state.id_productoServicio

  axios({
    url:API,
    method:'post',
    data:{
        query:`
        query{
          getProductoServicio(data:"${[this.state.id_productoServicio]}"){
            id_productoServicio
            tipo
            concepto
            precio                                    
           } 
        }
        `
    } 
     }).then(response=>{    
     if(response.data.data.getProductoServicio[0]){
      console.log( 'este es el response',response.data.data.getProductoServicio) 
      this.setState({arrayProductoServicio:response.data.data.getProductoServicio})
     console.log("id",this.state.arrayProductoServicio[0].id_productoServicio) 
     console.log("tipo",this.state.arrayProductoServicio[0].tipo) 
     console.log("concepto",this.state.arrayProductoServicio[0].concepto) 
     console.log("precio",this.state.arrayProductoServicio[0].precio) 
     localStorage.setItem("id",this.state.arrayProductoServicio[0].id_productoServicio)
     localStorage.setItem("tipo",this.state.arrayProductoServicio[0].tipo)
     localStorage.setItem("concepto",this.state.arrayProductoServicio[0].concepto)
     localStorage.setItem("precio",this.state.arrayProductoServicio[0].precio) 
  //    DialogUtility.alert({
  //     title:'Aviso!' ,
  //     content: "El concepto del producto no fue encontrado",
  // });         

     } else{
      DialogUtility.alert({
        title:'Aviso!' ,
        content: "El concepto del producto no fue encontrado",
    });         

       
     }
    })
     .catch(err=>{
         console.log('error',err)
     })       
     
} 

handleAddFields = () => {
  const values = [...this.state.inputFields];
  let valor1=[];
  let valor2=[];
  // values.push({ firstName: '', lastName: '' , precio:''});
  values.push({ productos: '', precio: '' });
  values.map(rows=>{
    // console.log("esto es rows",rows) 
    valor2.push(rows)
    // console.log("esto es val2",valor2)
    this.setState({Datos:valor2})
  } );
  // console.log("esto es estado",this.state.Datos)
  // console.log("esto es values",valor1)
  this.setState({inputFields:values})  
};

 handleRemoveFields = index => {
  const values = [...this.state.inputFields];
  values.splice(index, 1);
  this.setState({inputFields:values});
};

      

    render() {

      let searchRFC;
      let form;
      let consultarIdProducto;
      let data;
      let tabla;
      const columns = ["id_productoServicio", "tipo", "concepto", "precio"];

      data= this.state.array.map((rows,i)=>{
        console.log("rows",rows)
        return([rows.id_productoServicio,rows.tipo,rows.concepto,rows.precio])
      })

       let Datos= this.state.arrayProductoServicio.map((rows,i)=>{

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


      
        var f = new Date();     
       let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
   
        let tasaIva = 16;
        let total
        let IVA
        let totalFloat;
         let calDescuentoAplicado;
         let Subtotal
      if(this.state.descuento>0){
        calDescuentoAplicado=((this.state.precio * this.state.descuento)/100).toFixed(2)
        //  console.log("taza del descuento",calDescuentoAplicado)  
      }else{
        calDescuentoAplicado=0
      }

      Subtotal=(this.state.precio-calDescuentoAplicado).toFixed(2)      
      IVA=((Subtotal*tasaIva)/100).toFixed(2)

      
      total= (parseInt(this.state.precio) + parseFloat(tasaIva)).toFixed(2)        
        totalFloat=total
        console.log("esto es totalFloat",totalFloat)
      total= (parseFloat(Subtotal) + parseFloat(IVA)).toFixed(2)  
      console.log("esto es totaol",total)
      console.log("subtotal",Subtotal)
      console.log("IVA",IVA)

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
// console.log("esto es vendedor", vendedor)

 let id_productoServicio= localStorage.getItem("id");
 let tipo= localStorage.getItem("tipo");
 let concepto= localStorage.getItem("concepto");
 let precio= localStorage.getItem("precio")

if (this.state.form == true) {
  // console.log("esto es data de Datos:",this.state.Datos.empresa)
    
  form = 
  <div style={{marginTop:"2%"}}>
  <center>    
  <MDBCard narrow style={{width:"80%",heigth:"60%"}}>                          
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
                      // style={{texttransform:uppercase}}                                      			
                          id="razonSocial"
                          type="text"
                          name="razonSocial"			
                          onChange={this.onChangeInput}
                          // value={this.state.pass} 
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
                          // value={this.state.pass}
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
                          // value={this.state.pass}
                          defaultValue={this.state.Datos.apellido}
                          required
                          className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginEmailEx"><strong>Correo:</strong></label><input 
                      id="correo1"
                      type="email"
                     
                      // id="correo1"
                      // type="email"
                      name="correo1"
                      onChange={this.onChangeInput}
                      // value={this.state.pass}
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
                    // value={this.state.pass}
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
           {/* consultarIdProducto =  */}
<div>
{/* <Form onSubmit={this.onSubmitBtn}> */}
<MDBCol md="3" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>id_producto o servicio:</strong>
                </label>
                <input                            
                id="id_productoServicio"
                // type="t"
                name="id_productoServicio"
                onChange={this.onChangeInput}
                // defaultValue={this.state.idProductoServicio} 
                value={this.state.id_productoServicio}
                required
                // className="form-control"
                />
           </MDBCol>
           <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto"  onClick={e=> this.consultarProductoServicio() } >
           buscar id
                    </MDBBtn>
                    <MDBCol md="6" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>tipo</strong>
                </label>
                <input                            
                id="tipo"
                // type="t"
                name="tipo"
                onChange={this.onChangeInput}
                defaultValue={tipo}
                className="form-control"/>
           </MDBCol>
           <MDBCol md="6" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>concepto</strong>
                </label>
                <input                            
                id="concepto"
                // type="t"
                name="concepto"
                onChange={this.onChangeInput}
                defaultValue={concepto} 
                className="form-control"/>
           </MDBCol>
           <MDBCol md="6" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>unidad</strong>
                </label>
                <input                            
                id="unidad"
                // type="t"
                name="unidad"
                onChange={this.onChangeInput}
                value={this.state.unidad}                 
                required
                className="form-control"/>
           </MDBCol>
           <MDBCol md="6" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>precio</strong>
                </label>
                <input                            
                id="precioBase"
                // type="t"
                name="precioBase"
                onChange={this.onChangeInput}
                defaultValue={precio}
                className="form-control"/>
           </MDBCol>
                    {/* </Form> */}
</div>
           


            <MDBCol md="3" className="mb-3">   
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Producto :</strong>
                </label>
                <input 
                id="Servicio"
                type="text"
                name="Servicio"
                onChange={this.onChangeInput}
                value={this.state.pass}
                required
                className="form-control"/>
           </MDBCol>

            <MDBCol md="3" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx"><strong>Precio Producto:</strong></label>
                <input 
                required		 
                id="precio"
                type="number"
                name="precio"
                onChange={this.onChangeInput}
                value={this.state.pass}	                  
                className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Precio Normal: &nbsp;</strong>
                </label>
                <label>$ {this.state.precio}</label>
                </MDBCol>
                <MDBCol md="3" className="mb-3">    
                <label htmlFor="defaultFormLoginPasswordEx"><strong>Descuento:</strong></label>
                <input 
                required		 
                id="descuento"
                type="number"
                name="precio"
                onChange={this.onChangeInput}
                value={this.state.pass}	                  
                className="form-control"/>
           </MDBCol>
           <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>descuento aplicado: &nbsp;</strong>
                </label>
                <label>$ {calDescuentoAplicado}</label>
            </MDBCol> 
           <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong> Subtotal: &nbsp;</strong>
                </label>
                <label>$ {Subtotal}</label>
                </MDBCol>

                <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Tasa iva:</strong>
                </label>
                < label>{tasaIva}%</ label>
                </MDBCol>

               
                <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Iva: &nbsp;</strong> 
                </label>
                <label>$ {IVA}</label>
                </MDBCol>
              </MDBRow>
              <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong> Total: &nbsp;</strong>
                </label>
                <label>$ {total}</label>
                </MDBCol>

              <MDBRow>
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

                  </MDBRow>
                  </Form>
                  <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                  <Forma
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                          <Grid container alignItems="flex-start" spacing={2} >
                              <Grid item xs={4}>
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
                                  <MenuItem value={rows.id_productoServicio}><strong>{rows.id_productoServicio}</strong> {rows.concepto}</MenuItem>
                                )
                              })}
                              
                                </Field>
                                </Grid>
                            <Grid item style={{ marginTop: 16 ,marginLeft:150 }}>
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
                </div>
                  <MDBRow style={{marginTop:"10%"}}> 
                      <MDBCol md="3" className="mb-3"/>
                      
                      <MDBCol md="3" className="mb-3">      
                              <MDBBtn   color="info"  onClick = {e=> this.pdfView()}> Generar Cotización</MDBBtn>
                      </MDBCol>
                      <MDBCol md="3" className="mb-3"> 
                              <MDBBtn  color="secondary"   onClick={e=>this.cancelar} type="submit">Cancelar</MDBBtn>
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
                            <MDBBtn size="md"color = "success" onClick={() => { this.pdfExportComponent.save(); }}>
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
                       <td style={{padding:"5px"}} colspan="2" align="center">$&nbsp;{this.state.precio}</td>
                       </tr>  
                       <tr>
                    <td ROWSPAN="2" colspan="2"></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Precio Normal</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{this.state.precio}</td>         
                  </tr>
                  <tr>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Descuento de {this.state.descuento}%:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{calDescuentoAplicado}</td>
                  </tr>
                  <tr>
                  <td ROWSPAN="2" colspan="2" ></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">subtotal:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{Subtotal}</td>
                  </tr>
                  <tr>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA 16%:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{IVA}</td>
                  </tr>
                  <tr>
                  <td ROWSPAN="2" colspan="2" ></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">Total:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{total}</td>
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
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} colspan="3" >{this.state.Servicio}</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{this.state.precio}</td>         
 </tr>
 <tr>
   <td ROWSPAN="2" colspan="2"></td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Precio Normal</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{this.state.precio}</td>         
 </tr>
 <tr>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Descuento de {this.state.descuento}%:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{calDescuentoAplicado}</td>
 </tr>

 <tr>
 <td ROWSPAN="2" colspan="2" ></td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">subtotal:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{Subtotal}</td>
 </tr>
 <tr>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA 16%:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{IVA}</td>
 </tr>
 <tr>
 <td ROWSPAN="2" colspan="2" ></td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">Total:</td>
   <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{total}</td>
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



        {tabla}
      

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
                       <td style={{padding:"5px"}} colspan="2" align="center">$&nbsp;{this.state.precio}</td>
                       </tr>  
                       <tr>
                    {/* <td ROWSPAN="2" colspan="1"></td> */}
                    <td ROWSPAN="2" colspan="2"></td>
                    {/* <td></td> */}
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Precio Normal</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{this.state.precio}</td>         
                  </tr>
                  <tr>
                  
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Descuento de {this.state.descuento}%:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{calDescuentoAplicado}</td>
                  </tr>
                  <tr>
                  <td ROWSPAN="2" colspan="2"></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">subtotal:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{Subtotal}</td>
                  </tr>
                  <tr>
                 
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA 16%:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{IVA}</td>
                  </tr>
                  <tr>
                  <td ROWSPAN="2" colspan="2"></td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">Total:</td>
                    <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{total}</td>
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
              {/* {tablaProductosYServicios} */}

        </React.Fragment>
         
      );
    }
  }
  export default Cotizaciones
