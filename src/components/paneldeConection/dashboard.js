import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";


    class Dashboard extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
         
          };
        }
        
    render() {    
       let carrusel;
      carrusel= 
    <MDBContainer>
      <MDBCarousel
      activeItem={1}
      length={3}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner style= {{ marginTop:"10%"}}>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://scontent.fmex11-1.fna.fbcdn.net/v/t1.6435-9/123338672_3372873506095914_6169331247528270566_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=e3f864&_nc_eui2=AeFsUIN_W2ElqVtL5UnQrSpjT1NiOwxXzxtPU2I7DFfPG283yTT8FcvGTFK50Y6trDa9sDcZAE6boXxh0ZhgG2Q0&_nc_ohc=275fgbYDEeQAX_tGPjk&_nc_ht=scontent.fmex11-1.fna&oh=f4e7f9596dfeb019e001802f5166eb28&oe=60D58F7E"
              alt="First slide"
             
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Alfa Diseño de Sistemas</h3>
            <p>First text</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
              alt="Second slide"
            />
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Alfa Diseño de Sistemas</h3>
            <p>Second text</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg"
              alt="Third slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Alfa Diseño de Sistemas</h3>
            <p>Third text</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  
      return (
        <React.Fragment>
         
        <div  id="apppages3" >  
        <MDBView>         
          <center>   
            <MDBContainer>  
              <MDBDropdown >
                <MDBDropdownToggle caret color="secondary" style= {{ marginTop:"5%"}}>
                  Que desea realizar
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem href="/loginEmpresa">Registar Empresa</MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem href="/loginAdministrador">Registar Administrador</MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem href="/">Iniciar sesión</MDBDropdownItem>                                
                </MDBDropdownMenu>
              </MDBDropdown>  
            </MDBContainer> 
            {carrusel}   
            </center>  
          </MDBView> 
        </div>
        </React.Fragment>
      );
    }
  }
  export default Dashboard