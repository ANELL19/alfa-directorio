import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBRow, MDBCol, MDBBtn,MDBAlert, MDBCard,MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBInput} from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Form} from 'reactstrap';
import Navbar from './navbar'
import { PDFExport } from '@progress/kendo-react-pdf';
import { Container, Paper } from '@material-ui/core';
import {  Row, Col } from 'reactstrap';
// import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Table } from 'reactstrap';
import imagen3 from './images/liz.png'
import imagen from './images/encabezado.JPG'
import imagen2 from './images/Captura1.JPG'
import titulo1 from  './images/titulo1.png'
import titulo3 from  './images/titulo3.png'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Cotizaciones extends Component{
    pdfExportComponent

    constructor(props){
        super(props)
        this.state ={           
            razonSocial:"" ,
            nombre:"", 
            apellidos:"", 
            correo1:"" ,
            correo2:"", 
            telefono1:"" ,
            telefono2:"",
            telefono3:"", 
            telefono4:"" , 
            telefono5:"",
            Servicio:"",
            precio:"",  
            iva:"",           
            totalFloat:"",
            promocion:"", 
            vendedor:"",
            fecha:"" ,   
            fk_adminAlfa:"",
            form :true,
            pdfview:false,
            botonPdfExport:false
        }
        this.regresar = this.regresar.bind(this) 
    }

    regresar(){
        this.props.history.push("/dahboardAlfa")
    } 
   

    onChangeInput =(e)=>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    onSubmitBtn = (e)=>{      
        this.setState({botonPdfExport:true})  
        const API='http://localhost:4000/graphql' 
        var id_adminAlfa = localStorage.getItem("id")  

        let rs = this.state.razonSocial;
        let nombre  = this.state.nombre.toUpperCase();
        let apellidos = this.state.apellidos.toUpperCase();
        let correo1 =  this.state.correo1;
        let correo2 = this.state.correo2;
        let tel1 = this.state.telefono1;
        let tel2 = this.state.telefono2;
        let tel3 = this.state.telefono3;
        let tel4 = this.state.telefono4;
        let tel5 = this.state.telefono5;
        let servicio  = this.state.Servicio.toUpperCase();
        let precio = this.state.precio;              
        let promocion = this.state.promocion.toUpperCase();
        let iva = ((precio * 16)/100).toFixed(2)
        let total = suma
        let vendedor = localStorage.getItem("nombre").toUpperCase() + " "  + localStorage.getItem("apellido").toUpperCase()       
        var suma = (parseInt(precio) + parseFloat(iva))
        
            axios({
                url:API,
                method:'post',
                data:{
                    query:`
                    mutation{
                        insertCotizaciones(data:"${[rs,nombre,apellidos,correo1,correo2,tel1,tel2,tel3,tel4,tel5,servicio,precio,iva,total,promocion,vendedor,id_adminAlfa]}"){
                        
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

    pdfView ( ){
        let rs = this.state.razonSocial.toUpperCase();
        let nombre  = this.state.nombre.toUpperCase();
        let apellidos = this.state.apellidos.toUpperCase();
        let correo1 =  this.state.correo1;
        let tel1 = this.state.telefono1;
        let servicio  = this.state.Servicio.toUpperCase();
        let precio = this.state.precio;
        let promocion = this.state.promocion.toUpperCase();
        if(rs && nombre && apellidos && correo1 && tel1 && servicio && precio && promocion){
            this.setState({form:false})
            this.setState({pdfview:true})
    
        }else {
            DialogUtility.alert({
                title:'AVISO !' ,
                content: "Estimado usuario, por favor complete todos los campos obigatorios",
            });          
        }
      
    }
    cerrarCotizacion() {
        window.location.reload()
    }
     render(){
        // var dat= new Date(); //Obtienes la fecha
        // var dat2 = Date.parse(dat);
 
        var date= new Date()
        var fecha = date.toLocaleString('es')        
        console.log("fecha",fecha)   

let iva = 16;
let total
let tasaIva
let totalFloat;
if(this.state.precio){
    console.log("estado de precio",this.state.precio)
 tasaIva=((this.state.precio*iva)/100).toFixed(2)
 console.log("calculando IVA",tasaIva)
total= (parseInt(this.state.precio) + parseFloat(tasaIva))

    totalFloat = parseFloat(total.toFixed(2))


}
    let form;

   if (this.state.form == true) {
    form =            <div style={{marginTop:"2%", marginLeft:"20%"}}>
    <MDBCol md="10">
    <MDBCard narrow style={{width:"80%",heigth:"60%"}}>                          
          <MDBAlert color="primary"  className="h5 text-center mb-4" > <strong>Datos del cliente</strong> </MDBAlert>
                      <MDBCardBody>
                      <Form onSubmit={this.onSubmitBtn}>  

                     

<MDBRow >

<MDBCol md="3" className="mb-3"> 
                       <label htmlFor="defaultFormLoginPasswordEx" ><strong> Razón social:</strong> </label>
                  <input                                         			
                      id="razonSocial"
                      type="text"
                      name="razonSocial"			
                      onChange={this.onChangeInput}
                      value={this.state.pass} 
                      required
                      className="form-control"/>                                    
                  </MDBCol>


              <MDBCol md="3" className="mb-3"> 
                  <label htmlFor="nombre" ><strong> Nombre (s):</strong> </label>
                      <input                                     
                          id="nombre"
                          type="text"
                          name="nombres"
                          onChange={this.onChangeInput}
                          value={this.state.pass}
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
                          value={this.state.pass}
                          required
                          className="form-control"/>
                          </MDBCol>

                          <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginEmailEx" >
                  <strong>Correo:</strong>
                  </label>
                  <input   
                      
                      id="correo1"
                      type="email"
                      name="correo1"
                      onChange={this.onChangeInput}
                      value={this.state.pass}
                      required
                      className="form-control" />
                      </MDBCol>

                      <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginEmailEx" >
                  <strong>Correo alterno:</strong>
                  </label>
                  <input   
                      icon="envelope"
                      id="correo2"
                      type="email"
                      name="correo2"
                      onChange={this.onChangeInput}
                      value={this.state.pass}
                     
                      className="form-control" />
                      </MDBCol>

                      <MDBCol md="3" className="mb-3">    
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong>Telefono:</strong>
                  </label>
                  <input 
                           
                  id="telefono1"
                  type="number"
                  name="telefono1"
                  onChange={this.onChangeInput}
                  value={this.state.pass}	
                  required
                  className="form-control"
                  />
                  </MDBCol>

                  <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong>  Servicio:</strong>
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
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong>Precio:</strong>
                  </label>
                  <input 
                  required		 
                  id="precio"
                  type="number"
                  name="precio"
                  onChange={this.onChangeInput}
                  value={this.state.pass}	
                  
                  className="form-control"
                  />
                  </MDBCol>

                  <MDBCol md="3" className="mb-4 mt-4">    
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong>Tasa:</strong>
                  </label>
                  < label>{iva}%</ label>
                  </MDBCol>

                  <MDBCol md="3" className="mb-4 mt-4">    
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong> Total: &nbsp;</strong>
                  </label>
                  <label>$ {total}</label>
                  </MDBCol>
                  <MDBCol md="3" className="mb-4 mt-4">    
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong>Iva: &nbsp;</strong> 
                  </label>
                  <label>$ {tasaIva}</label>
                  </MDBCol>
</MDBRow>

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
                      value={this.state.pass}
                      validate 
                     
                      className="form-control"/>
                      </MDBCol>

                      <MDBCol md="3" className="mb-3 mt-4">   
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong> Vendedor : &nbsp;</strong>
                  </label>
                  <label>{localStorage.getItem("nombre").toUpperCase() + " "  + localStorage.getItem("apellido").toUpperCase()}</label>
                      </MDBCol>

                      

</MDBRow>
</Form>
              
    <MDBRow style={{marginTop:"10%"}}> 
          <MDBCol md="3" className="mb-3"/>
          
          <MDBCol md="3" className="mb-3">      
                  <MDBBtn   color="info"  onClick = {e=> this.pdfView()}> Generar Cotización</MDBBtn>
          </MDBCol>
          <MDBCol md="3" className="mb-3"> 
                  <MDBBtn  color="secondary"   onClick={this.regresar} type="submit">Cancelar</MDBBtn>
          </MDBCol>
   
  </MDBRow>
    </MDBCardBody>
              </MDBCard>
              </MDBCol>
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
    
     <div style={{marginLeft:"5%", marginRight:"5%",marginBottom:"2%"}}>
            <Row  xs="2">               
                <Col>
                     <p><strong>Razón social:</strong>&nbsp;{this.state.razonSocial} </p>                     
                     <p ><strong>Nombre(s):</strong>&nbsp;{this.state.nombre}&nbsp;{this.state.apellidos}</p>                    
                     <p><strong>Correo:</strong>&nbsp;{this.state.correo1}</p>                     
                     <p><strong>Télefono:</strong>&nbsp;{this.state.telefono1}</p>                     
                     <p><strong>fecha:</strong>&nbsp;{"fecha"}</p>   
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
                       <td style={{padding:"5px"}} colspan="2" align="center">$ {this.state.precio}</td>
                       </tr>  
                       <tr>
                       <td style={{padding:"5px"}} ROWSPAN="2"></td>
                       <td style={{padding:"5px"}} align="center">IVA:</td>
                       <td style={{padding:"5px"}} align="center">$ {tasaIva}</td>                       
                       </tr>

                       <tr>         
                       <td style={{padding:"5px"}} align="center">TOTAL</td>
                       <td style={{padding:"5px"}} align="center">$ {total}</td>          
                       </tr>
                   </tbody>
            </Table>        
             

   <p style={{color:"red"}} htmlFor="defaultFormLoginPasswordEx"><strong>Promoción &nbsp;{this.state.promocion}</strong></p>
    
              
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
               {/* {this.state.nombre.toUpperCase()}&nbsp;{this.state.apellidos.toUpperCase()} */}
               {localStorage.getItem("nombre").toUpperCase() + " "  + localStorage.getItem("apellido").toUpperCase()}
               <br></br>
               {/* {this.state.correo1} */}
               {localStorage.getItem("correo")}
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
              

            {/* <MDBRow style = {{marginLeft:"10%"}}>
            <MDBBtn size="md" disabled = {this.state.botonPdfExport} color = "primary" onClick = {e=> this.onSubmitBtn()}> Enviar cotización </MDBBtn>
            {boton}
            <MDBBtn size="md" color = "secondary" onClick = {e=> this.cerrarCotizacion()}> Cerrar </MDBBtn>
            </MDBRow> */}
            <div style={{ position: "absolute", left: "-2000px", top: 0 }}>

                
            <PDFExport
                paperSize="letter"
                margin="0.5cm"
                forcePageBreak=".page-break"
                fileName={`${"Cotización"} PDF ${new Date().getFullYear()}`}
                ref={(component) => this.pdfExportComponent = component}
                >
       
       <Container  style={{width:550,height:2000}}> 

<Paper >            
            <img src={imagen } alt="titulo1" style={{width:500,height:55}}/>  
                    
                <p style={{fontFamily:'arial', fontSize:'10px', marginTop:-9}}>               
                  Razón Social:&nbsp;{this.state.razonSocial} 
                  <br></br>
                  Nombre:&nbsp;{this.state.nombre}&nbsp;{this.state.apellidos}
                  <br></br>
                  correo:&nbsp;{this.state.correo1}
                  <br></br>
                  teléfono:&nbsp;{this.state.telefono1}
                  <br></br>
                  Buen día, me permito presentar nuestra propuesta referente a los producto (s) y servicio (s) de su interés. 
                 </p>
                       
            

<div style= {{marginLeft:10, marginRight:10, marginTop:-10}}>    
<MDBTable bordered  >
      <MDBTableHead color="light-blue accent-1"  align="center" >
        <tr>
          <th style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}}  colspan="3" >PRODUCTO O SERVICIO</th>
          <th style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} >PRECIO MAS IVA</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} colspan="3" >  {this.state.Servicio}</td>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">{this.state.precio}</td>         
        </tr>
        <tr>
          <td ROWSPAN="2" colspan="2"></td>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA:</td>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">${tasaIva}</td>         
        </tr>
        <tr>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">TOTAL:</td>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">${total}</td>
        </tr>
      </MDBTableBody>
    </MDBTable>     
    </div>

<p style={{color:"red",fontFamily:'arial', fontSize:'10px',marginTop:-10}} >Promoción &nbsp; {this.state.promocion}</p>
      {/* < p style={{color:"red" , fontFamily:'arial', fontSize:'10px'}}><strong></strong></p> */}
           
<div style= {{marginLeft:10, marginRight:10, marginTop:-10}}>
<MDBTable bordered>
      <MDBTableHead color="light-blue accent-1"  align="center">
        <tr>
          <th style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center" colspan="3">PÓLIZA DE SOPORTE TECNICO REMOTO BASICAS ** LA POLIZA ES POR SISTEMA **</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">SERVICIO</td>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">PRECIO ESPECIAL</td>
          <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">PRECIO NORMAL</td>         
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
          <td  style={{padding:"3px" ,fontFamily:'arial', fontSize:'10px'}}colspan="2" align="center"></td>
          <td style={{padding:"3px" ,fontFamily:'arial', fontSize:'10px',color:"red"}} align="center">PRECIO MAS IVA</td>                
        </tr>
      </MDBTableBody>
    </MDBTable>
    </div> 
    
             
<div style={{fontFamily:'arial', fontSize:'10px',marginTop:-10}}>
        Nota: El costo no incluye Interfaz, Formatos, Carga de Catálogos o alguna implementación adicional a la mencionada en su cotización.
        <br></br>
                 <strong > No se aceptan devoluciones</strong> 
                 <br></br>
              <fort style={{color:"#3371FF", fontFamily:'arial', fontSize:'10px'}}> <strong>Condiciones Comerciales y Formas de Pago</strong></fort>
 {/* <div style={{fontFamily:'arial', fontSize:'9px',marginTop:-15}}> */}
        <ul >
            <li>Todos los costos anteriormente presentados son más IVA.</li>
            <li>Precios representados en M.N.</li>
            <li>Pago por anticipado</li>
            <li>Pago por depósito bancario o transferencia electrónica.</li>	
        </ul>
       
            <p align="left" marginLeft="20%" style={{fontFamily:'arial', fontSize:'10px',marginTop:-10}}>
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
     
    <p style={{fontFamily:'arial', fontSize:'10px',marginTop:-10}}>Sin más por el momento y agradeciéndole por su amable atención,
       Quedo a sus órdenes para cualquier duda al respecto.</p>
            {/* </div > */}
           <div  className="text-center mb-4" style={{fontFamily:'arial', fontSize:'10px',marginTop:-10}}>
        {/* <fort className="text-center mb-4" >  */}           
                <strong >{localStorage.getItem("nombre").toUpperCase() + " " + localStorage.getItem("apellido").toUpperCase()}</strong>                
                <br></br>
                <p>{localStorage.getItem("correo")}</p>   
                <strong style={{color:"#3371FF"}}> ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.</strong>
                <br></br>
                <u style={{color:"#3371FF"}}>www.ads.com.mx </u> 
         </div >  
         <p className="text-center mb-4" style={{fontFamily:'arial', fontSize:'10px', marginTop:-10}}>Av. Chapultepec N° 473, Piso 3 Col. Juárez, Del. Cuauhtémoc C.P. 06600 Ciudad de México Información, soporte y ventas: Conmutador con 6 líneas   1209 0740 -  5553 2049</p> 
          <br></br>
{/* <div class="contenedor" >
<img src={titulo3}   style={{width:530,height:100 , marginTop:-25}} />
<div class="encima"><p style={{fontFamily:'arial', fontSize:'10px', marginTop:-25}}> Av. Chapultepec N° 473, Piso 3 Col. Juárez, Del. Cuauhtémoc C.P. 06600 Ciudad de México Información, soporte y ventas: Conmutador con 6 líneas   1209 0740 -  5553 2049</p></div>
</div>    */}

</div>    

   </Paper>

            </Container> 
                </PDFExport>
            </div>
        </div>




        }
         return(
        <React.Fragment>
        <Navbar/>
        {form} 
        {pdf}


        {/* //***********************************************************  */}

         </React.Fragment>
        )
    }
}
export default Cotizaciones