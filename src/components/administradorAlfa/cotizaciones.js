import React, {Component} from 'react';
import FPolizas from './generarPolizas'
import PolizasYServicios from './generarPolizayYServicio'
import { MDBRow, MDBCol } from "mdbreact";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText,MDBIcon} from 'mdbreact';

class Cotizaciones extends Component {
    constructor(props){
        super(props)
        this.state={
          cardInicio:true,
          BotonPoliza:false,
          BotonServicio:false,
          BotonServicioandPoliza:false
        }
    }

    card(){
      this.setState({cardInicio:true})
      this.setState({BotonPoliza:false})
      this.setState({BotonServicio:false})
      this.setState({BotonServicioandPoliza:false})
    }

    checkbox1(){
      this.setState({cardInicio:false})
      this.setState({BotonPoliza:true})
      this.setState({BotonServicio:false})
      this.setState({BotonServicioandPoliza:false})
    }
    checkbox2(){
      this.setState({cardInicio:false})
      this.setState({BotonPoliza:false})
      this.setState({BotonServicio:true})      
      this.setState({BotonServicioandPoliza:false})      
    }
    checkbox3(){
      this.setState({cardInicio:false})
      this.setState({BotonPoliza:false})
      this.setState({BotonServicio:false})      
      this.setState({BotonServicioandPoliza:true})
      
    }

    render(){
      let card;
      let cotizacionesPoliza;
      let cotizacionesServicio ;
      let cotizacionServicioandPoliza;
      if(this.state.cardInicio === true){
        card=<div>
            <MDBRow  style={{marginLeft:120, marginRight:20, marginTop:20,}} >
         <MDBCol md="4" className="mb-3 " >          
      <MDBCard style={{ width: "18rem" }}>
        <MDBCardImage className="img-fluid"  onClick={e=>this.checkbox1()} src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          waves />
        <MDBCardBody>
          <MDBCardTitle>Polizas</MDBCardTitle>
          <MDBCardText></MDBCardText>
          <MDBBtn onClick={e=>this.checkbox1()}><MDBIcon icon="pencil-alt" /> Realizar</MDBBtn>
        </MDBCardBody>
      </MDBCard>      
    </MDBCol>

    <MDBCol  md="4" className="mb-3 " >
      <MDBCard style={{ width: "18rem" }}>
        <MDBCardImage className="img-fluid" src="https://images.pexels.com/photos/7379/startup-photos.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          waves />
        <MDBCardBody>
          <MDBCardTitle>Servicios</MDBCardTitle>
          <MDBCardText></MDBCardText>
          <MDBBtn  onClick={e=>this.checkbox2()}><MDBIcon icon="pencil-alt" /> Realizar</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>

    <MDBCol   md="4" className="mb-3 ">
      <MDBCard style={{ width: "18rem" }}> 
        <MDBCardImage className="img-fluid" src="https://images.pexels.com/photos/669609/pexels-photo-669609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          waves />
        <MDBCardBody>
          <MDBCardTitle>Polizas y Servicios</MDBCardTitle>
          <MDBCardText></MDBCardText>
          <MDBBtn  onClick={e=>this.checkbox3()}><MDBIcon icon="pencil-alt" /> Realizar</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </MDBRow>

        </div>
      }

       if(this.state.BotonPoliza === true){
       
        cotizacionesPoliza = 
        <div><FPolizas/></div>
       }

       if(this.state.BotonServicio === true){      
        cotizacionesServicio = 
        <div><fServicios/></div>
       }

       if(this.state.BotonServicioandPoliza === true){      
        cotizacionServicioandPoliza = 
        <div><PolizasYServicios/></div>
       }
        return(
      <React.Fragment> 
        {/* <div>     
      <div>
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="defaultUnchecked" onClick={e=>this.checkbox1()} />
        <label class="custom-control-label" for="defaultUnchecked">Generar Polizas</label>
      </div>
    </div>       
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="defaultIndeterminate" onClick={e=>this.checkbox2()}/>
        <label class="custom-control-label" for="defaultIndeterminate">Generar Servicios</label>
      </div>
    </div>
    <div>
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="defaultUncheckedDisabled" onClick={e=>this.checkbox3()}/>
        <label class="custom-control-label" for="defaultUncheckedDisabled">Generar Polizas y Servicios</label>
      </div>
    </div> */}
    {card}
    {cotizacionesPoliza}
    {cotizacionesServicio}
    {cotizacionServicioandPoliza}

      </React.Fragment>
        )
    }
}export default Cotizaciones

