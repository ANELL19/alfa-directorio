import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBBtn, MDBCard, MDBCardBody,MDBCol, MDBCardHeader,MDBRow } from 'mdbreact';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import  axios from 'axios'
import {API} from '../utils/http'
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from '../dashboardAdminAlfa/Navbar'

class Comprar extends Component {
    constructor(props){
        super(props)
        this.state= {
            nombre: "",
            apellidos: "",
            rfc: "",
            razonS: "",
            telefono: "",
            correo: "",
            contraseña: "",
            rfcSelect:"",
            open:false,
            success:false,
            isPasswordShown: false

        }
        this.avanzar= this.avanzar.bind(this)
    }

    componentWillMount(){
     this.validate();
    }
    togglePasswordVisiblity = () => {
      const { isPasswordShown } = this.state;
      this.setState({ isPasswordShown: !isPasswordShown });
    };

    validate = async () =>{
      await this.setState({nombre:localStorage.getItem("nombre")})
      await this.setState({apellidos:localStorage.getItem("apellidos")})
      await this.setState({rfc:localStorage.getItem("rfc")})
      await this.setState({razonS:localStorage.getItem("razonS")})
      await this.setState({telefono:localStorage.getItem("telefono")})
      await this.setState({correo:localStorage.getItem("correo")})
      localStorage.removeItem("nombre")
      localStorage.removeItem("apellidos")
      localStorage.removeItem("rfc")
      localStorage.removeItem("razonS")
      localStorage.removeItem("telefono")
      localStorage.removeItem("correo")
      localStorage.removeItem("contraseña")
      localStorage.removeItem("rfcSelect")

    }
      submitHandler = event => {
      event.preventDefault();
      event.target.className += " was-validated";


      var nombre = this.state.nombre ; 
      var apellidos = this.state.apellidos ;
      var rfc = this.state.rfc;
      var razonS = this.state.razonS;
      var telefono = this.state.telefono;
      var correo = this.state.correo;
      var contraseña = this.state.contraseña;
      var rfcSelct = this.state.rfcSelect
      console.log("datos",nombre,apellidos,rfc,razonS,telefono,correo,contraseña,rfcSelct)
      
      if(nombre && apellidos && rfc && razonS && telefono && correo && contraseña && rfcSelct && rfcSelct !="Ya seleccionado"){
        function ValidateEmail(sEmail) {
            var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
          
            if(!sEmail.match(reEmail)) {
              return false;
            }
          
            return true;
          
          }
          if(rfc.length >= 12 && rfc.length < 14){
            if(ValidateEmail(correo)===true){
                if(contraseña.length >= 8){
                    if(nombre.length > 2 && apellidos.length > 2 && razonS.length > 2 && telefono.length >= 8 ){
                        this.setState({success:true});
                    }else{
                        alert("Alguno de los datos ingresados no cumple con los requisitos")
                    }
                }else{
                    alert("Su contraseña debe contener al menos 8 caracteres")
                }
            }else{
                alert("El correo electrónico no cumple los requisitos")
            }
          }else{
              alert("El RFC no es válido ")
          }
         
      }else{
        this.setState({open:true});
      }

      };

       handleClose = () => {
        this.setState({open:false});
      };
    
      handleSuccess = () => {
        this.setState({success:false});
      };

      avanzar(){
        let paquete;
        var rfcSelct = this.state.rfcSelect

        if(rfcSelct == '1rfc1'){
          paquete = 1
        }else if(rfcSelct == '1rfc2'){
          paquete = 2
        }else if(rfcSelct == '1rfc3'){
          paquete = 3
        }else if(rfcSelct == '1rfc4'){
          paquete = 4
        }else if(rfcSelct == '1rfc5'){
          paquete = 21
        }else if(rfcSelct == '1rfc6'){
          paquete = 26
        }else if(rfcSelct == '1rfc7'){
          paquete = 31
        }

        if(rfcSelct == '3rfc1'){
          paquete = 5
        }else if(rfcSelct == '3rfc2'){
          paquete = 6
        }else if(rfcSelct == '3rfc3'){
          paquete = 7
        }else if(rfcSelct == '3rfc4'){
          paquete = 8
        }else if(rfcSelct == '3rfc5'){
          paquete = 22
        }else if(rfcSelct == '3rfc6'){
          paquete = 27
        }else if(rfcSelct == '3rfc7'){
          paquete = 32
        }

        if(rfcSelct == '5rfc1'){
          paquete = 9
        }else if(rfcSelct == '5rfc2'){
          paquete = 10
        }else if(rfcSelct == '5rfc3'){
          paquete = 11
        }else if(rfcSelct == '5rfc4'){
          paquete = 12
        }else if(rfcSelct == '5rfc5'){
          paquete = 23
        }else if(rfcSelct == '5rfc6'){
          paquete = 28
        }else if(rfcSelct == '5rfc7'){
          paquete = 33
        }

        if(rfcSelct == '10rfc1'){
          paquete = 13
        }else if(rfcSelct == '10rfc2'){
          paquete = 14
        }else if(rfcSelct == '10rfc3'){
          paquete = 15
        }else if(rfcSelct == '10rfc4'){
          paquete = 16
        }else if(rfcSelct == '10rfc5'){
          paquete = 24
        }else if(rfcSelct == '10rfc6'){
          paquete = 29
        }else if(rfcSelct == '10rfc7'){
          paquete = 34
        }
        
        if(rfcSelct == '20rfc1'){
          paquete = 17
        }else if(rfcSelct == '20rfc2'){
          paquete = 18
        }else if(rfcSelct == '20rfc3'){
          paquete = 19
        }else if(rfcSelct == '20rfc4'){
          paquete = 20
        }else if(rfcSelct == '20rfc5'){
          paquete = 25
        }else if(rfcSelct == '20rfc6'){
          paquete = 30
        }else if(rfcSelct == '20rfc7'){
          paquete = 35
        }
        
        var nombre = this.state.nombre.toUpperCase(); 
        var apellidos = this.state.apellidos.toUpperCase();
        var rfc = this.state.rfc.toUpperCase();
        var razonS = this.state.razonS.toUpperCase().replace(/,/g, "");
        var telefono = this.state.telefono.toUpperCase();
        var correo = this.state.correo.toUpperCase();
        var contraseña = this.state.contraseña;
        var idAdminAlfa = localStorage.getItem("idAdminAlfa")
        var date= new Date()
        var fecha = date.toLocaleString('es')
        const correoAdminAlfa  = localStorage.getItem("correoAdminAlfa")
    
        axios({
          url:  API,
          method:'post',
          data:{
          query:`
           mutation{
              registroSuperUser(data:"${[nombre,apellidos,rfc,razonS,telefono,correo,contraseña,idAdminAlfa,fecha,paquete,correoAdminAlfa]}"){
            
                message
                
                  }
                }
            `
          }
        })
        .then(datos => {	
          if(datos.data.data.registroSuperUser.message=='duplicado'){
              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                content: "El RFC y/o correo electrónico ya han sido registrados con Anterioridad",
                title: 'Aviso!',
                position: "fixed"
              });
          }else if(datos.data.data.registroSuperUser.message=="Signup exitoso"){
              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                content: "Registro Exitoso!",
                title: 'Aviso!',
                position: "fixed"
              });
              localStorage.removeItem("idRegistro")
              localStorage.removeItem("paquete")
              this.props.history.push("/dashboardAdminAlfa")
            } 
        }).catch(err=>{
            console.log("error" , err)
        })       
      }
    
 
      changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    render(){
      const { isPasswordShown } = this.state;

        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });

        let modal;
        if(this.state.open === true){
           modal =  <div>

            <Dialog
            
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">Aviso!</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    No deje espacios en blanco
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }

        if(this.state.success === true){
            modal =  <div>
 
             <Dialog
             
               open={this.state.success}
               TransitionComponent={Transition}
               keepMounted
               onClose={this.handleSuccess}
               aria-labelledby="alert-dialog-slide-title"
               aria-describedby="alert-dialog-slide-description"
             >
               <DialogTitle id="alert-dialog-slide-title">Notificación del sistema!</DialogTitle>
               <DialogContent>
                 <DialogContentText id="alert-dialog-slide-description">
                    ¿Los datos ingresados son correctos?
                 </DialogContentText>
               </DialogContent>
               <DialogActions>
                 <Button onClick={this.avanzar} color="primary">
                   Aceptar
                 </Button>
                 <Button onClick={this.handleSuccess} color="primary">
                   Modificar
                 </Button>
               </DialogActions>
             </Dialog>
           </div>
         }

          let validacion;
          let selected;
          if(this.state.rfcSelect){
              validacion=<div class="valid-feedback">correcto</div>
              selected = <option selected>Ya seleccionado</option>
          }else{
            selected = <option selected></option>
            validacion=<div class="invalid-feedback">
             !Requerido
            </div>
          }
        
        return(
            <div>
              <Navbar/>
                <div  style={{marginTop:"2%"}}  >
                    <MDBRow >
                       
                        <MDBCol md="10">
                        <MDBCard narrow style={{width:"100%",heigth:"60%"}}  >
                            <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-3 mx-5 mb-4">
                            <h6 className="mt-2"><strong>Datos del cliente</strong></h6>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <form
                            class="needs-validation"
                            onSubmit={this.submitHandler}
                            noValidate
                            >
                            <MDBRow>
                                <MDBCol md="3" className="mb-3">
                                <label
                                    htmlFor="nombre"
                                    class="grey-text"
                                >
                                   Nombre
                                </label>
                                <input
                                    value={this.state.nombre}
                                    name="nombre"
                                    onChange={this.changeHandler}
                                    type="text"
                                    id="nombre"
                                    class="form-control"
                                    placeholder="Nombre"
                                    required
                                />
                                 <div class="invalid-feedback">
                                    !Requerido
                                </div>
                                <div class="valid-feedback">correcto</div>
                                </MDBCol>
                                <MDBCol md="3" class="mb-3">
                                <label
                                    htmlFor="apellidos"
                                    class="grey-text"
                                >
                                    Apellidos
                                </label>
                                <input
                                    value={this.state.apellidos}
                                    name="apellidos"
                                    onChange={this.changeHandler}
                                    type="text"
                                    id="apellidos"
                                    class="form-control"
                                    placeholder="Apellidos"
                                    required
                                />
                                 <div class="invalid-feedback">
                                    !Requerido
                                </div>
                                <div class="valid-feedback">correcto</div>
                                </MDBCol>
                                <MDBCol md="3" class="mb-3">
                                <label
                                    htmlFor="rfc"
                                    class="grey-text"
                                >
                                    RFC
                                </label>
                                <input
                                    value={this.state.rfc}
                                    onChange={this.changeHandler}
                                    type="text"
                                    id="rfc"
                                    class="form-control"
                                    name="rfc"
                                    placeholder="RFC"
                                    required
                                />
                                <div class="invalid-feedback">
                                    !Requerido
                                </div>
                                <div class="valid-feedback">correcto</div>
                                </MDBCol>
                           
                               <MDBCol md="3" class="mb-3">
                                <label
                                    htmlFor="razonS"
                                    class="grey-text"
                                >
                                    Razón social
                                </label>
                                <input
                                    value={this.state.razonS}
                                    onChange={this.changeHandler}
                                    type="razonS"
                                    id="razonS"
                                    class="form-control"
                                    name="razonS"
                                    placeholder="Razón social"
                                    required
                                />
                              
                                </MDBCol>
                                </MDBRow>
                                <MDBRow>
                            
                                <MDBCol md="3" class="mb-3">
                                <label
                                    htmlFor="telefono"
                                    class="grey-text"
                                >
                                    Teléfono
                                </label>
                                <input
                                    value={this.state.telefono}
                                    onChange={this.changeHandler}
                                    type="number"
                                    id="telefono"
                                    class="form-control"
                                    name="telefono"
                                    placeholder="telefono"
                                    required
                                />
                                <div class="invalid-feedback">
                                    !Requerido
                                </div>
                                </MDBCol>
                                <MDBCol md="3" className="mb-3">
                                <label
                                    htmlFor="correo"
                                    class="grey-text"
                                >
                                    Correo
                                </label>
                                <input
                                    value={this.state.correo}
                                    onChange={this.changeHandler}
                                    type="email"
                                    id="correo"
                                    class="form-control"
                                    name="correo"
                                    placeholder="Correo electrónico"
                                    required
                                />
                                 <div class="invalid-feedback">
                                    !Requerido
                                </div>
                                </MDBCol>
                               
                                <MDBCol md="3" className="mb-3">
                                <label
                                    htmlFor="contraseña"
                                    class="grey-text"
                                >
                                    Contraseña
                                </label>
                                <input
                                    value={this.state.contraseña}
                                    onChange={this.changeHandler}
                                    type={isPasswordShown ? "text" : "password"}
                                    id="contraseña"
                                    class="form-control"
                                    name="contraseña"
                                    placeholder="Contraseña"
                                    required
                                />
                               
                                <div class="invalid-feedback">
                                   !Requerido
                                </div>
                                <div class="valid-feedback">verificado</div>
                                  
                                </MDBCol> 
                                <MDBCol  md="3" style={{marginTop:"3%"}}>
                                <i
                                  className="fa fa-eye password-icon"
                                  onClick={this.togglePasswordVisiblity}
                                /> 
                                  </MDBCol>  
                                                   
                            </MDBRow> 
                            <MDBCardHeader className="view view-cascade gradient-card-header  d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                            <a href="#" className="black-text mx-3">Seleccione su paquete</a>
                            </MDBCardHeader>  
                            <div class="form-row align-items-right">
                                    <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">1 RFC</label>
                                    <select value={this.state.rfcSelect} required onChange={this.changeHandler}  class="custom-select mr-sm-1" name="rfcSelect">
                                        {selected}
                                        <option value="1rfc1">de 1 a 15 empleados</option>
                                        <option value="1rfc2">de 16 a 50 empleados</option>
                                        <option value="1rfc3">de 51 a 100 empleados</option>
                                        <option value="1rfc4">de 101 a 200 empleados</option>
                                        <option value="1rfc5">de 201 a 300 empleados</option>
                                        <option value="1rfc6">de 301 a 400 empleados</option>
                                        <option value="1rfc7">de 401 a 500 empleados</option>

                                    </select>
                                    {validacion}
                                    </div>
                                    <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">3 RFC</label>
                                    <select  value={this.state.rfcSelect} required onChange={this.changeHandler} class="custom-select mr-sm-1" name="rfcSelect">
                                    {selected}
                                        <option value="3rfc1">de 1 a 15 empleados</option>
                                        <option value="3rfc2">de 16 a 50 empleados</option>
                                        <option value="3rfc3">de 51 a 100 empleados</option>
                                        <option value="3rfc4">de 101 a 200 empleados</option>
                                        <option value="3rfc5">de 201 a 300 empleados</option>
                                        <option value="3rfc6">de 301 a 400 empleados</option>
                                        <option value="3rfc7">de 401 a 500 empleados</option>

                                    </select>
                                    {validacion}
                                    </div>
                                    <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">5 RFC</label>
                                    <select value={this.state.rfcSelect} required onChange={this.changeHandler} class="custom-select mr-sm-1" name="rfcSelect">
                                    {selected}
                                        <option value="5rfc1">de 1 a 15 empleados</option>
                                        <option value="5rfc2">de 16 a 50 empleados</option>
                                        <option value="5rfc3">de 51 a 100 empleados</option>
                                        <option value="5rfc4">de 101 a 200 empleados</option>
                                        <option value="5rfc5">de 201 a 300 empleados</option>
                                        <option value="5rfc6">de 301 a 400 empleados</option>
                                        <option value="5rfc7">de 401 a 500 empleados</option>

                                    </select>
                                    {validacion}
                                    </div>
                                    <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">10 RFC</label>
                                    <select value={this.state.rfcSelect} required onChange={this.changeHandler} class="custom-select mr-sm-1" name="rfcSelect">
                                    {selected}
                                        <option value="10rfc1">de 1 a 15 empleados</option>
                                        <option value="10rfc2">de 16 a 50 empleados</option>
                                        <option value="10rfc3">de 51 a 100 empleados</option>
                                        <option value="10rfc4">de 101 a 200 empleados</option>
                                        <option value="10rfc5">de 201 a 300 empleados</option>
                                        <option value="10rfc6">de 301 a 400 empleados</option>
                                        <option value="10rfc7">de 401 a 500 empleados</option>

                                    </select>
                                    {validacion}
                                    </div>
                                    <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">20 RFC</label>
                                    <select value={this.state.rfcSelect} required onChange={this.changeHandler} class="custom-select mr-sm-1" name="rfcSelect">
                                    {selected}
                                        <option value="20rfc1">de 1 a 15 empleados</option>
                                        <option value="20rfc2">de 16 a 50 empleados</option>
                                        <option value="20rfc3">de 51 a 100 empleados</option>
                                        <option value="20rfc4">de 101 a 200 empleados</option>
                                        <option value="10rfc5">de 201 a 300 empleados</option>
                                        <option value="10rfc6">de 301 a 400 empleados</option>
                                        <option value="10rfc7">de 401 a 500 empleados</option>

                                    </select>
                                  
                                    {validacion}
                                 </div>   
                                 <div style={{marginTop:"2%",marginLeft:"10%"}} >
                                   <MDBBtn color="success" type="submit" size="md" >
                                            Registrar
                                  </MDBBtn>
                                  </div>          
                                </div>
                               
                            </form>
                           
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>
                        </MDBRow>
                        {modal}
                    </div>
               
            </div>
        )
    }
}

export default Comprar