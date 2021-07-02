import React,{Component} from 'react'
import MUIDataTable from "mui-datatables";
import {MDBBtn,MDBRow,MDBTableBody,MDBTableHead,MDBTable,MDBIcon} from 'mdbreact'
import {Table} from 'reactstrap';
import {API} from '../Graphql/Graphql'
import axios from 'axios'
import {Row, Col } from 'reactstrap';
import imagen from '../imagen/encabezado.JPG'
import titulo1 from  '../imagen/titulo1.png'
import { Container, Paper } from '@material-ui/core';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Button } from 'antd';


class TablaCotizaciones extends Component{
  pdfExportComponent
  constructor(props){
    super(props)
    this.state = {
          datos:[],
          modal: false,
          detallesCotizaciones:[],
          detallesIdCotizaciones:[],
          modal12: false,
          tablaInicial:true,
          renderPDF:false,
          botonPdfExport:false
        }
            
    } 
    toggle12 = () => {
      this.setState({
        modal12:!this.state.modal12
      })
    }
   

    componentWillMount(){ 
          const fk_adminalfa  = localStorage.getItem("id_admin");
          // console.log(" fk_adminalfa", fk_adminalfa)       
       axios({
            url:API,
            method:'post',
            data:{
                query:`
                query{
                  getCotizacionesTabla(data:"${[fk_adminalfa]}"){
                      id_cotizacion 
                      rfc
                      razonSocial
                      nombre
                      apellidos 
                      correo1
                      correo2
                      telefono1
                      telefono2                      
                      servicio
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
                // console.log("response-DASH",response)              
               let array1 = [];
               array1.push(response.data.data.getCotizacionesTabla)
              //  console.log("PUSH DE ARRAY1",array1)
               this.setState({detallesCotizaciones:array1[0]})
               
             })
             .catch(err=>{
                 console.log('error',err)
             })
    }

 
    datosIndividuales(id){    
   
      console.log("idRecibido", id)

      axios({
        url:API,
        method:'post',
        data:{
            query:`
            query{
              getIdCotizacion(data:"${[id]}"){   
                      id_cotizacion 
                      rfc
                      razonSocial
                      nombre
                      apellidos 
                      correo1
                      correo2
                      telefono1
                      telefono2                      
                      servicio
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
         })
       .then(response=>{
        //  console.log("esto es response",response)
         let array = [];
         array.push(response.data.data.getIdCotizacion)        
         this.setState({detallesIdCotizaciones:array[0]})       
        localStorage.setItem("id_cotizacion",this.state.detallesIdCotizaciones[0].id_cotizacion )     
        localStorage.setItem("rfc",this.state.detallesIdCotizaciones[0].rfc)               
        localStorage.setItem("razonSocial",this.state.detallesIdCotizaciones[0].razonSocial)   
        localStorage.setItem("nombre_cliente",this.state.detallesIdCotizaciones[0].nombre) 
        localStorage.setItem("apellidos_cliente",this.state.detallesIdCotizaciones[0].apellidos)
        localStorage.setItem("correo1",this.state.detallesIdCotizaciones[0].correo1)                                    
        localStorage.setItem("telefono1",this.state.detallesIdCotizaciones[0].telefono1)
        localStorage.setItem("servicio",this.state.detallesIdCotizaciones[0].servicio)
        localStorage.setItem("precio",this.state.detallesIdCotizaciones[0].precio)                                    
        localStorage.setItem("iva",this.state.detallesIdCotizaciones[0].iva)
        localStorage.setItem("total",this.state.detallesIdCotizaciones[0].total)
        localStorage.setItem("promocion",this.state.detallesIdCotizaciones[0].promocion)
        localStorage.setItem("vendedor",this.state.detallesIdCotizaciones[0].vendedor)
        localStorage.setItem("fecha",this.state.detallesIdCotizaciones[0].fecha)
           if(this.state.detallesIdCotizaciones[0]){
             this.setState({tablaInicial:false})
             this.setState({renderPDF:true})
           }
         
        
    })
     .catch(err=>{
              console.log('error',err.response)
      }) 
    }

  
    cerrarCotizacion() {
      this.setState({tablaInicial:true})
      this.setState({renderPDF:false})
  }
    render(){

      let tablaCotizaciones
      let pdf;

      if(this.state.tablaInicial===true){
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

      const columnsCotizaciones = ["Id","RFC","Nombre","Apellidos","Razón Social","Fecha de Cotización","Correo","telefono","Total","Descargar"];
      let boton;
      let dataCotizaciones;
      // if(this.state.detallesCotizaciones[0]){
        dataCotizaciones = this.state.detallesCotizaciones.map(rows=>{
          console.log("esto es rows de dataCotizaciones",rows)
      boton = <Button type="primary" shape="circle" size="large" onClick={e=> this.datosIndividuales(rows.id_cotizacion)}><MDBIcon far icon="file-pdf" /></Button>
      console.log("esto es rows boton",rows.id_cotizacion)
               return([rows.id_cotizacion,rows.rfc,rows.nombre,rows.apellidos,rows.razonSocial,rows.fecha,rows.correo1,rows.telefono1,rows.total,boton])
               
                
              
       } )
    //  }
     tablaCotizaciones=<div>
    <div  style={{width:"95%",marginLeft:"3%",marginTop:"1%",marginBottom:"2%"}} >               
      <MUIDataTable  
        title={"Cotizaciones Realizadas"} 
        data={dataCotizaciones} 
        columns={columnsCotizaciones} 
        options={options} 
      />      
    </div>

</div>
      }

      if(this.state.renderPDF ===true){
        let boton;
      
                      boton =    <div className="example-config">
                                  <MDBBtn size="md"color = "success" onClick={() => { this.pdfExportComponent.save(); }}>
                                      Descargar Cotización
                                  </MDBBtn>
                                  </div>
                
      
              pdf =   <div>
               <MDBRow style = {{marginLeft:"10%"}}>
                  {/* <MDBBtn size="md" disabled = {this.state.botonPdfExport} color = "primary" onClick = {e=> this.onSubmitBtn()}> Enviar cotización </MDBBtn> */}
                  {boton}
                  <MDBBtn size="md" color = "secondary" onClick = {e=> this.cerrarCotizacion()}> Cerrar </MDBBtn>
                  </MDBRow>
               <div>
              <Paper   style={{width:1200,height:1400, marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}}>
                  <img src={titulo1} alt="imagen" alt="imagen"   style={{width:1210,height:150}}/>
                  <div style={{ marginBottom:"2%"}}>
                  <Row  xs="2">               
                      <Col>
                           <p><strong>Razón social:</strong>&nbsp;{localStorage.getItem("razonSocial")} </p>                     
                           <p ><strong>Nombre(s):</strong>&nbsp;{localStorage.getItem("nombre_cliente")}&nbsp;{localStorage.getItem("apellidos_cliente")}</p>                    
                           <p><strong>Correo:</strong>&nbsp;{localStorage.getItem("correo1")}</p>                     
                           <p><strong>Télefono:</strong>&nbsp;{localStorage.getItem("telefono1")}</p>                     
                      </Col>   
                      <Col >
                           <p><strong>Fecha:</strong>&nbsp;{localStorage.getItem("fecha")}</p>
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
                             <td style={{padding:"5px"}} colspan="2">{localStorage.getItem("servicio")}</td>
                             <td style={{padding:"5px"}} colspan="2" align="center">$&nbsp;{localStorage.getItem("precio")}</td>
                             </tr>  
                             <tr>
                             <td style={{padding:"5px"}} ROWSPAN="2"></td>
                             <td style={{padding:"5px"}} align="center">IVA:</td>
                             <td style={{padding:"5px"}} align="center">$&nbsp;{localStorage.getItem("iva")}</td>                       
                             </tr>
      
                             <tr>         
                             <td style={{padding:"5px"}} align="center">TOTAL</td>
                             <td style={{padding:"5px"}} align="center">$&nbsp;{localStorage.getItem("total")}</td>          
                             </tr>
                         </tbody>
                  </Table>        
                   
      
         <p style={{color:"red"}} htmlFor="defaultFormLoginPasswordEx"><strong>Promoción &nbsp;{localStorage.getItem("promocion")}</strong></p>
          
                    
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
                     {localStorage.getItem("nombre_cliente") + " " + localStorage.getItem("apellidos_cliente")}
                       {/* esto es nombre y Apellidos */}
                     <br></br>              
                     {localStorage.getItem("correo1")}
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
                      fileName={`${"Cotización"} ${localStorage.getItem("razonSocial")} PDF ${new Date().getFullYear()}`}
                      ref={(component) => this.pdfExportComponent = component}
                      >
             
             <Container  > 
      
             <Paper >            
                  <img src={imagen } alt="titulo1" style={{width:500,height:55}}/>  
                          
                      <p style={{fontFamily:'arial', fontSize:'10px', marginTop:-9 }}>               
                      {localStorage.getItem("razonSocial")}  
                        <br></br>
                        {localStorage.getItem("nombre_cliente")}&nbsp;{localStorage.getItem("apellidos_cliente")}
                        <br></br>
                        {localStorage.getItem("correo1")}
                        <br></br>
                        {localStorage.getItem("telefono1")}
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
                <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} colspan="3" >{localStorage.getItem("servicio")}</td>
                <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{localStorage.getItem("precio")}</td>         
              </tr>
              <tr>
                <td ROWSPAN="2" colspan="2"></td>
                <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">IVA:</td>
                <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{localStorage.getItem("iva")}</td>         
              </tr>
              <tr>
                <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'9px'}} align="center">Total:</td>
                <td style={{padding:"4px" ,fontFamily:'arial', fontSize:'10px'}} align="center">$&nbsp;{localStorage.getItem("total")}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>     
          </div>
      
      <p style={{color:"red",fontFamily:'arial', fontSize:'10px',marginTop:-10}} >Promoción &nbsp;{localStorage.getItem("promocion").toLowerCase()}</p>          
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
                
                      <strong >{localStorage.getItem("nombre_cliente") + " " + localStorage.getItem("apellidos_cliente")}</strong> 
                      <p>{localStorage.getItem("correo1")}</p>   
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
        return(
            <React.Fragment>            
              {tablaCotizaciones} 
              {pdf}              
        </React.Fragment>
        )
    }
} export default TablaCotizaciones