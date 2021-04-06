import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBRow, MDBCol, MDBBtn,MDBAlert, MDBCard,MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText} from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Form} from 'reactstrap';
import Navbar from './navbar'
import { PDFExport } from '@progress/kendo-react-pdf';
import { Paper } from '@material-ui/core';
// import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Table } from 'reactstrap';
import imagen3 from './images/liz.png'
import imagen from './images/encabezado.JPG'
import imagen2 from './images/Captura1.JPG'

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
     componentWillMount(){
     
    //     localStorage.removeItem("razonSocial")
    //     localStorage.removeItem("nombre")
    //     localStorage.removeItem("apellidos")
    //     localStorage.removeItem("correo1")
    //     localStorage.removeItem("correo2")
    //     localStorage.removeItem("telefono1")
    //     localStorage.removeItem("telefono2")
    //     localStorage.removeItem("telefono3")
    //     localStorage.removeItem("telefono4")
    //     localStorage.removeItem("telefono5")
    //     localStorage.removeItem("Servicio")
    //     localStorage.removeItem("precio")
    //     localStorage.removeItem("iva")
    //    localStorage.removeItem("total")
    //    localStorage.removeItem("promoacion")
    //    localStorage.removeItem("vendedor")
    //    localStorage.removeItem("fecha")
    //    localStorage.removeItem("fk_adminalfa") 

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
        let total = this.state.totalFloat;        
        let promocion = this.state.promocion.toUpperCase();
        let iva = ((precio * 16)/100).toFixed(2)
        let vendedor = localStorage.getItem("nombre").toUpperCase() + " "  + localStorage.getItem("apellido").toUpperCase()

        // console.log(
        //     "es total", total
        //  rs,nombre,apellidos,total,promocion,iva,vendedor
            
        // )
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
                        localStorage.setItem("rs",response.data.data. insertCotizaciones.rs)                    
                        localStorage.setItem("nombre",response.data.data. insertCotizaciones.nombre)   
                        localStorage.setItem("apellidos",response.data.data.insertCotizaciones.apellidos) 
                        localStorage.setItem("correo1",response.data.data.insertCotizaciones.correo1)                                
                        localStorage.setItem("correo2",response.data.data.insertCotizaciones.correo2)
                        localStorage.setItem("tel",response.data.data.insertCotizaciones.telefono1)
                        localStorage.setItem("servicio",response.data.data.insertCotizaciones.servicio)
                        localStorage.setItem("precio",response.data.data.insertCotizaciones.precio)
                        localStorage.setItem("iva",response.data.data.insertCotizaciones.iva)
                        localStorage.setItem("total",response.data.data.insertCotizaciones.total)
                        localStorage.setItem("promocion",response.data.data.insertCotizaciones.promocion)
                        localStorage.setItem("vendedor",response.data.data.insertCotizaciones.vendedor)
                        localStorage.setItem("id_adminAlfa",response.data.data.insertCotizaciones.id_adminAlfa)

                    
                        DialogUtility.alert({
                            title:'Bienvenido' ,
                            content: "inicio de sesión exitoso!",
                        });                   
                        this.props.history.push("/dahboardAlfa")
                    }
                    else if(response.data.data.insertCotizaciones.message=="usuario y contraseña incorrecto"){                   
                        DialogUtility.alert({
                            title: 'usuario y contraseña incorrectos'                       
                        });                    
                    }else {
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
        var dat= new Date(); //Obtienes la fecha
        var dat2 = Date.parse(dat);

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

                      <MDBCol md="3" className="mb-3">   
                  

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
         
            
            <PDFExport
                scale={0.6}
                paperSize="A4"
                margin="2cm"
                ref={(component) => this.pdfExportComponent = component}
            >
                {/* <div style={{width:200, height:400}}> */}
                    <Paper   style={{width:1200,height:1200, marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}}>
                    {/* <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src={imagen} waves />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            Some quick eof the card&apos;s content.
          </MDBCardText>
          
        </MDBCardBody>
      </MDBCard>
    </MDBCol> */}
    <img src={imagen} alt="imagen" style={{height:150, width: 200}}/>

                       <label htmlFor="defaultFormLoginPasswordEx" ><strong> Razón social:</strong> </label>
                  <label>{this.state.razonSocial} </label>                                 
                 

                  <br></br> 
            
                  <label htmlFor="nombre" ><strong>Nombre (s):</strong></label>
                  <label> {this.state.nombre} </label> 
              
                  <br></br> 
                  <label htmlFor="defaultFormLoginPasswordEx"><strong>Apellidos:</strong></label>
                  <label>{this.state.apellidos}</label> 

                  <br></br> 
                  <label htmlFor="defaultFormLoginEmailEx"><strong>Correo:</strong></label>
                  <label>{this.state.correo1}</label> 

                  <br></br>
                  <label htmlFor="defaultFormLoginEmailEx"><strong>Correo alterno:</strong></label>
                  <label>{this.state.correo2}</label>
                  

                  <br></br>
                  <label htmlFor="defaultFormLoginPasswordEx"><strong>Telefono:</strong></label>
                  <label>{this.state.tel1}</label>
                 
                  <br></br>
                   
                  <label htmlFor="defaultFormLoginPasswordEx"><strong>Tasa:</strong></label>
                  < label>{iva}%</ label>

                  <br></br>
                  <label htmlFor="defaultFormLoginPasswordEx"><strong> Total: &nbsp;</strong>
                  </label>
                  <label>$ {total}</label>
                  <br></br>
                    
                  <label htmlFor="defaultFormLoginPasswordEx" >
                  <strong>Iva: &nbsp;</strong> 
                  </label>
                  <label>$ {tasaIva}</label>
                  </Paper>
                  {/* </div> */}
                  


{/* 



                    
<MDBRow >

<MDBCol md="3" className="mb-3"> 
                       <label htmlFor="defaultFormLoginPasswordEx" ><strong> Razón social:</strong> </label>
                  <label> {rs} </label>                                 
                  </MDBCol>


              <MDBCol md="3" className="mb-3"> 
                  <label htmlFor="nombre" ><strong> Nombre (s):</strong> </label>
                  <label> {nombre} </label> 
              </MDBCol>

                  <MDBCol md="3" className="mb-3"> 
                  <label htmlFor="defaultFormLoginPasswordEx" > <strong>Apellidos: </strong></label>
                  <label>  {apellidos} </label> 

                          <MDBCol md="3" className="mb-3">   
                  <label htmlFor="defaultFormLoginEmailEx" >
                  <strong>Correo:</strong>
                  </label>
                  <label>  {correo1}</label> 

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
                  type="text"
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

                      <MDBCol md="3" className="mb-3">   
                  

                      </MDBCol>

</MDBRow> */}



                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci.
                </p>
                <p>
                    Ut orci ligula, varius ac consequat in, rhoncus in dolor. Mauris pulvinar molestie accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean velit ligula, pharetra quis aliquam sed, scelerisque sed sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam dui mi, vulputate vitae pulvinar ac, condimentum sed eros.
                </p>
                <p>
                    Aliquam at nisl quis est adipiscing bibendum. Nam malesuada eros facilisis arcu vulputate at aliquam nunc tempor. In commodo scelerisque enim, eget sodales lorem condimentum rutrum. Phasellus sem metus, ultricies at commodo in, tristique non est. Morbi vel mauris eget mauris commodo elementum. Nam eget libero lacus, ut sollicitudin ante. Nam odio quam, suscipit a fringilla eget, dignissim nec arcu. Donec tristique arcu ut sapien elementum pellentesque.
                </p>
                <p>
                    Maecenas vitae eros vel enim molestie cursus. Proin ut lacinia ipsum. Nam at elit arcu, at porttitor ipsum. Praesent id viverra lorem. Nam lacinia elementum fermentum. Nulla facilisi. Nulla bibendum erat sed sem interdum suscipit. Vestibulum eget molestie leo. Aliquam erat volutpat. Ut sed nulla libero. Suspendisse id euismod quam. Aliquam interdum turpis vitae purus consectetur in pulvinar libero accumsan. In id augue dui, ac volutpat ante. Suspendisse purus est, ullamcorper id bibendum sed, placerat id leo.
                </p>
            </PDFExport>
            <MDBRow>
            <MDBBtn size="md" disabled = {this.state.botonPdfExport} color = "primary" onClick = {e=> this.onSubmitBtn()}> Enviar cotización </MDBBtn>
            {boton}
            <MDBBtn size="md" color = "secondary" onClick = {e=> this.cerrarCotizacion()}> Cerrar </MDBBtn>
            </MDBRow>
        </div>
        }
         return(
        <React.Fragment>
        <Navbar/>
        {form} 
        {pdf}
        <image src="imagen"></image>

{/* ************************************************************************************** */}



             {/* <div style={{width:200, height:400}}> */}
                 <Paper   style={{width:1200,height:1200, marginLeft:"6%",marginTop:"2%",marginBottom:"2%"}}>
                 {/* <MDBCol>
   <MDBCard style={{ width: "22rem" }}>
     <MDBCardImage className="img-fluid" src={imagen} alt="imagen" waves />
     <MDBCardBody>
       <MDBCardTitle>Card title</MDBCardTitle>
       <MDBCardText>
         Some quick eof the card&apos;s content.
       </MDBCardText>
       
     </MDBCardBody>
   </MDBCard>
 </MDBCol> */}
      <img src={imagen3} alt="imagen"    style={{width:1210,height:150}}/>
      <br></br>
      <br></br>
      <br></br>
     
     
                    <label htmlFor="defaultFormLoginPasswordEx" ><strong> Razón social:</strong> </label>
               <label>{this.state.razonSocial} </label>                                 
              

               <br></br> 
         
               <label htmlFor="nombre" ><strong>Nombre (s):</strong></label>
               <label> {this.state.nombre}{this.state.apellidos} </label> 
           
               {/* <br></br> 
               <label htmlFor="defaultFormLoginPasswordEx"><strong>Apellidos:</strong></label>
               <label>{this.state.apellidos}</label>  */}

               <br></br> 
               <label htmlFor="defaultFormLoginEmailEx"><strong>Correo:</strong></label>
               <label>{this.state.correo1}</label> 

               {/* <br></br>
               <label htmlFor="defaultFormLoginEmailEx"><strong>Correo alterno:</strong></label>
               <label>{this.state.correo2}</label> */}
               

               <br></br>
               <label htmlFor="defaultFormLoginPasswordEx"><strong>Telefono:</strong></label>
               <label>{this.state.tel1}</label>
               <br></br>
              
{/* <fort style={{color:"#3371FF"}} ><strong></strong> </fort> */}
              
                   <fort  face="Verdana"> Buen día, me permito presentar  nuestra propuesta referente a los producto (s) y servicio (s) de su interés.</fort>

              
               <br></br>



               <Table bordered>
      <thead>
        <tr>
          <th bgcolor="DeepSkyBlue" colspan="2">PRODUCTO O SERVICIO</th>          
          <th bgcolor="DeepSkyBlue" colspan="2">PRECIO MAS IVA</th>
        </tr>
      </thead>
      <tbody>
       
          <th colspan="2">{this.state.Servicio}</th>
          <th colspan="2">{this.state.precio}</th>
        
        <tr>
          <th ROWSPAN="2"></th>
          <td>IVA:</td>
          <td>{tasaIva}</td>
          
        </tr>
        <tr>         
          <td>TOTAL</td>
          <td>{total}</td>          
        </tr>
      </tbody>
    </Table>


    <label style={{color:"red"}} htmlFor="defaultFormLoginPasswordEx"><strong>Promoción &nbsp;</strong></label>
               < label style={{color:"red"}}><strong>{this.state.promocion}</strong></ label>
               <br></br>
    {/* <label htmlFor="defaultFormLoginPasswordEx"><strong>Servicio</strong></label>
               < label>{this.state.Servicio}</ label>
               <br></br>
                
               <label htmlFor="defaultFormLoginPasswordEx"><strong>Tasa:</strong></label>
               < label>{iva}%</ label>

               <br></br>
               <label htmlFor="defaultFormLoginPasswordEx"><strong> Total: &nbsp;</strong>
               </label>
               <label>$ {total}</label>
               <br></br>
                 
               <label htmlFor="defaultFormLoginPasswordEx" >
               <strong>Iva: &nbsp;</strong> 
               </label>
               <label>$ {tasaIva}</label> */}

<p>
               {/* <p style = "font-family:courier,arial,helvética;"> */}
              <strong> Nota:</strong> El costo no incluye Interfaz, Formatos, Carga de Catálogos o alguna implementación adicional a la mencionada en su cotización.
<br></br>
<br></br>

<strong> No se aceptan devoluciones</strong>
<br></br>
<br></br>
<fort style={{color:"#3371FF"}}> <strong>Condiciones Comerciales y Formas de Pago</strong></fort>

<ul face="Verdana">

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

<p>Sin más por el momento y agradeciéndole por su amable atención, Quedo a sus órdenes para cualquier duda al respecto. Cordialmente.</p>

 {/* <label htmlFor="defaultFormLoginPasswordEx"><strong>Servicio</strong></label> */}
 <fort  > 
                < p className="text-center mb-4" > <strong>{localStorage.getItem("nombre").toUpperCase() + " "  + localStorage.getItem("apellido").toUpperCase()}</strong></p>
              
                <p  style={{color:"#3371FF"}} className="text-center mb-4"><strong> ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.</strong></p>
              <p className="text-center mb-4" style={{color:"#3371FF"}}> <u >www.ads.com.mx </u> </p>
                <p className="text-center mb-4" style={{color:"#3371FF"}}>{localStorage.getItem("correo")}</p>
                </fort  > 
</p>


               </Paper>
               {/* </div> */}
               


{/* 



                 
<MDBRow >

<MDBCol md="3" className="mb-3"> 
                    <label htmlFor="defaultFormLoginPasswordEx" ><strong> Razón social:</strong> </label>
               <label> {rs} </label>                                 
               </MDBCol>


           <MDBCol md="3" className="mb-3"> 
               <label htmlFor="nombre" ><strong> Nombre (s):</strong> </label>
               <label> {nombre} </label> 
           </MDBCol>

               <MDBCol md="3" className="mb-3"> 
               <label htmlFor="defaultFormLoginPasswordEx" > <strong>Apellidos: </strong></label>
               <label>  {apellidos} </label> 

                       <MDBCol md="3" className="mb-3">   
               <label htmlFor="defaultFormLoginEmailEx" >
               <strong>Correo:</strong>
               </label>
               <label>  {correo1}</label> 

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
               type="text"
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

                   <MDBCol md="3" className="mb-3">   
               

                   </MDBCol>

</MDBRow> */}



          






       
        </React.Fragment>
        )
    }
}
export default Cotizaciones