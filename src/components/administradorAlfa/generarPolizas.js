import React, { Component } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { MDBRow, MDBCol, MDBBtn,MDBAlert, MDBCard,MDBCardBody} from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Form} from 'reactstrap';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Container, Paper } from '@material-ui/core';
import { Row,Col } from 'reactstrap';
import { Table } from 'reactstrap';
import imagen from '../imagen/encabezado.JPG'
import titulo1 from  '../imagen/titulo1.png'
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon} from 'mdbreact';
import {API} from '../Graphql/Graphql'


class Polizas extends Component {
  pdfExportComponent
    constructor(props) {
      super(props);
      this.state = {
        // inputFields: [{          
        //   productos: '',
        //   precio: '',         
        // }] ,    
        razonSocial:"" ,
            nombre:"", 
            apellidos:"", 
            correo1:"" ,
            correo2:"", 
            telefono1:"" ,
            telefono2:"",
            // telefono3:"", 
            // telefono4:"" , 
            // telefono5:"",
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
            Datos:[]
            // renderTabla= true
      }
      this.cancelar = this.cancelar.bind(this)
    }

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
  // this.state.inputFields.map(rows =>{
  //   array1.push(rows)
  //   console.log("esto es rows",array1)
  // })
//  let var = this.state.inputFields.filter(firstName)
//   console.log("esto es rows",var)
  // let filter= this.state.inputFields.filter(firstName)
  // console.log("esto es filter",filter)

};

// renderTabla(){
//   this.setState({renderTabla:true}); 
// }

onSubmitBtn = (e)=>{   
  e.preventDefault();
   
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
  console.log("suma",suma)
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

handleAddFields = () => {
  const values = [...this.state.inputFields];
  let valor1=[];
  let valor2=[];
  // values.push({ firstName: '', lastName: '' , precio:''});
  values.push({ productos: '', precio: '' });
  values.map(rows=>{
    console.log("esto es rows",rows) 
    valor2.push(rows)
    console.log("esto es val2",valor2)
    this.setState({Datos:valor2})
  } );
  console.log("esto es estado",this.state.Datos)
  console.log("esto es values",valor1)
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
      total= (parseFloat(Subtotal) + parseFloat(IVA)).toFixed(2)  
      console.log("esto es totaol",total)
      console.log("subtotal",Subtotal)
      console.log("IVA",IVA)
     let tablaDescuento =
      <div>
      <tr>
      <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center"> Descuento de {this.state.descuento}%:</td>
      <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{calDescuentoAplicado}</td>
      </tr>
      </div>
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
console.log("esto es vendedor", vendedor)
if (this.state.form == true) {
  // console.log("esto es data de Datos:",this.state.Datos.empresa)
    
  form = 
  <div style={{marginTop:"2%"}}>
  <center>    
  <MDBCard narrow style={{width:"80%",heigth:"60%"}}>                          
        <MDBAlert color="primary"  className="h5 text-center mb-4" > <strong>Generar Cotización de Polizas </strong> </MDBAlert>
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
{/* ***************LOS BOTONES PARA AGREGAR***************** */}

{/* {this.state.inputFields.map((inputField,index) => {  
  return(
    // <MDBCol md="3" className="mb-3 ">     
  
    <div className="form-group">
<MDBRow>
      <MDBCol md="12" className="mb-3 "> 
    <label htmlFor="Productos">Producto</label>
    <input
      type="text"
      className="form-control"
      id="productos"
      name="productos"
      value={inputField.productos}
      onChange={event => this.handleInputChange(index, event)}
    />   
     </MDBCol>
     <MDBCol md="12" className="mb-3 "> 
     <label htmlFor="Productos">Precio</label>
    <input
      type="text"
      className="form-control"
      id="productos"
      name="productos"
      value={inputField.productos}
      onChange={event => this.handleInputChange(index, event)}
    />  
    </MDBCol>     
    <button
      className="btn btn-link"
      type="button"
      onClick={() => this.handleRemoveFields(index)}
    >
      -
    </button>
    <button
      className="btn btn-link"
      type="button"
      onClick={() => this.handleAddFields()}
    >
      +
    </button>
    </MDBRow>
  </div> 
 
  )
  
})}        */}
{/* </MDBRow> */}


{/* </MDBCol> */}
{/* </Row> */}

{/* </MDBContainer> */}
{/* ******************************** */}


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
                <strong>Precio : &nbsp;</strong>
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
           {/* <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong> Subtotal: &nbsp;</strong>
                </label>
                <label>$ {Subtotal}</label>
                </MDBCol> */}
{/* 
                <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Tasa iva:</strong>
                </label>
                < label>{tasaIva}%</ label>
                </MDBCol> */}

{/*                
                <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong>Iva: &nbsp;</strong> 
                </label>
                <label>$ {IVA}</label>
                </MDBCol>*/}
              </MDBRow> 
              <MDBCol md="3" className="mb-4 mt-4">    
                <label htmlFor="defaultFormLoginPasswordEx" >
                <strong> Total: &nbsp;</strong>
                </label>
                <label>$ {Subtotal}</label>
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
                    {/* <label>{"vendedor desconocido" || vendedor}</label> */}
                    {/* <label>{ vendedor||"vendedor desconocido" }</label> */}
                    {/* <label>"lizbeth cuevas"
                    </label> */}

                    </MDBCol>                 

                  </MDBRow>
                  </Form>
            
                  <MDBRow style={{marginTop:"10%"}}> 
                      <MDBCol md="3" className="mb-3"/>
                      
                      <MDBCol md="3" className="mb-3">      
                              <MDBBtn   color="info"  onClick = {e=> this.pdfView()}> Generar Cotización</MDBBtn>
                      </MDBCol>
                      <MDBCol md="3" className="mb-3"> 
                              <MDBBtn  color="secondary"   onClick={this.cancelar} type="submit">Cancelar</MDBBtn>
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
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">POLIZAS BASICAS DE SOPORTE TECNICO REMOTO ** LA POLIZA ES POR SISTEMA ** </td>          
                       {/* <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRECIO MAS IVA</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRECIO MAS IVA</td> */}
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">SERVICIO </td>          
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRECIO NORMAL</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">DESCUENTO</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">MESES ADICIONALES</td>
                       </tr>
                   <tr>
                       <td style={{padding:"5px"}} colspan="2">{this.state.Servicio}</td>
                       <td style={{padding:"5px"}} colspan="2" align="center">$&nbsp;{this.state.precio}</td>
                       </tr>  
                       <tr>
                       <td style={{padding:"5px"}} ROWSPAN="2"></td>
                       <td style={{padding:"5px"}} align="center">IVA:</td>
                       <td style={{padding:"5px"}} align="center">$&nbsp;{tasaIva}</td>                       
                       </tr>

                       <tr>         
                       <td style={{padding:"5px"}} align="center">TOTAL</td>
                       <td style={{padding:"5px"}} align="center">$&nbsp;{total}</td>          
                       </tr>
                   </tbody>
            </Table>        
             

   <p style={{color:"red"}} htmlFor="defaultFormLoginPasswordEx"><strong>Promoción &nbsp;{this.state.promocion.toLowerCase()}</strong></p>
    
              
              <Table bordered>
                   <thead>
                       <tr>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="3" align="center"><strong>PÓLIZA DE SOPORTE TECNICO REMOTO BASICAS ** LA POLIZA ES POR SISTEMA **</strong></td>          
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td style={{padding:"5px"}} align="center">SERVICIO</td>
                       <td style={{padding:"5px"}} align="center">PRECIO ESPECIAL</td>
                       <td style={{padding:"5px"}} align="center">PRECIO NORMAL</td>
                       </tr>    
                       <tr>
                       <td style={{padding:"5px"}} align="center"> Póliza semestral - por sistema </td>
                       <td style={{padding:"5px"}} align="center"> $ 2,500.00 </td>
                       <td style={{padding:"5px"}} align="center"> $ 5,000.00 </td>  
                       </tr>

                       <tr>
                       <td style={{padding:"5px"}} align="center"> Póliza semestral - por sistema</td>
                       <td style={{padding:"5px"}} align="center"> $ 4,000.00 </td>
                       <td style={{padding:"5px"}} align="center"> $ 8,000.00 </td>
                       
                       
                       </tr>
                       <tr>  
                       <td style={{padding:"5px"}} colspan="2" align="center"></td>       
                       <td style={{color:"red", padding:"5px" }} align="center"><strong>PRECIO MAS IVA</strong></td>           
                       </tr>
                   </tbody>
            </Table>
   
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
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA:</td>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{tasaIva}</td>         
        </tr>
        <tr>
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

{/* ************************************* */}

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
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">POLIZAS BASICAS DE SOPORTE TECNICO REMOTO ** LA POLIZA ES POR SISTEMA ** </td>          
                       {/* <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRECIO MAS IVA</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRECIO MAS IVA</td> */}
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">SERVICIO </td>          
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">PRECIO NORMAL</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">DESCUENTO</td>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="2" align="center">MESES ADICIONALES</td>
                       </tr>
                   <tr>
                       <td style={{padding:"5px"}} colspan="2">{this.state.Servicio}</td>
                       <td style={{padding:"5px"}} colspan="2" align="center">$&nbsp;{this.state.precio}</td>
                       </tr>  
                       <tr>
                       <td style={{padding:"5px"}} ROWSPAN="2"></td>
                       <td style={{padding:"5px"}} align="center">IVA:</td>
                       <td style={{padding:"5px"}} align="center">$&nbsp;{tasaIva}</td>                       
                       </tr>

                       <tr>         
                       <td style={{padding:"5px"}} align="center">TOTAL</td>
                       <td style={{padding:"5px"}} align="center">$&nbsp;{total}</td>          
                       </tr>
                   </tbody>
            </Table>        
             

   <p style={{color:"red"}} htmlFor="defaultFormLoginPasswordEx"><strong>Promoción &nbsp;{this.state.promocion.toLowerCase()}</strong></p>
    
              
              <Table bordered>
                   <thead>
                       <tr>
                       <td style={{padding:"5px"}} bgcolor="DeepSkyBlue" colspan="3" align="center"><strong>PÓLIZA DE SOPORTE TECNICO REMOTO BASICAS ** LA POLIZA ES POR SISTEMA **</strong></td>          
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td style={{padding:"5px"}} align="center">SERVICIO</td>
                       <td style={{padding:"5px"}} align="center">PRECIO ESPECIAL</td>
                       <td style={{padding:"5px"}} align="center">PRECIO NORMAL</td>
                       </tr>    
                       <tr>
                       <td style={{padding:"5px"}} align="center"> Póliza semestral - por sistema </td>
                       <td style={{padding:"5px"}} align="center"> $ 2,500.00 </td>
                       <td style={{padding:"5px"}} align="center"> $ 5,000.00 </td>  
                       </tr>

                       <tr>
                       <td style={{padding:"5px"}} align="center"> Póliza semestral - por sistema</td>
                       <td style={{padding:"5px"}} align="center"> $ 4,000.00 </td>
                       <td style={{padding:"5px"}} align="center"> $ 8,000.00 </td>
                       
                       
                       </tr>
                       <tr>  
                       <td style={{padding:"5px"}} colspan="2" align="center"></td>       
                       <td style={{color:"red", padding:"5px" }} align="center"><strong>PRECIO MAS IVA</strong></td>           
                       </tr>
                   </tbody>
            </Table>
   
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


        </React.Fragment>
      );
    }
  }
  export default Polizas
