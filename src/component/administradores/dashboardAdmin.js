import React, { Component } from "react"
import NavbarAdmin from './NavbarAdmin'
import TablasAdmin from './tablasAdmin'
import {  CarouselItem,
  CarouselCaption} from 'reactstrap';
  import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol , MDBContainer,MDBRow} from 'mdbreact';

import axios from 'axios'

class dashboardAdmin extends Component{
  constructor(props){
    super(props)
    this.state = {
         larazonSocial:'',

         activeIndex:0,
      animating:false,
        }
    } 

    
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
    render(){  

       const rs = localStorage.getItem("razonSocial");     
        return(
            <React.Fragment>
                <NavbarAdmin data={rs}/> 

              <MDBRow >
              <MDBCard >
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                <MDBCardBody>
                  <MDBCardTitle>Card title</MDBCardTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </MDBCardText>
                  <MDBBtn href="#">MDBBtn</MDBBtn>
                </MDBCardBody>
              </MDBCard>

              <MDBCard>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                <MDBCardBody>
                  <MDBCardTitle>Card title</MDBCardTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </MDBCardText>
                  <MDBBtn href="#">MDBBtn</MDBBtn>
                </MDBCardBody>
              </MDBCard>
           
              <MDBCard>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                <MDBCardBody>
                  <MDBCardTitle>Card title</MDBCardTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </MDBCardText>
                  <MDBBtn href="#">MDBBtn</MDBBtn>
                </MDBCardBody>
              </MDBCard>
              
              <MDBCard>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                <MDBCardBody>
                  <MDBCardTitle>Card title</MDBCardTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </MDBCardText>
                  <MDBBtn href="#">MDBBtn</MDBBtn>
                </MDBCardBody>
              </MDBCard>
              </MDBRow>      
      {/* <MDBCarousel
      activeItem={1}
      length={4}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
      style={{with:10, height:150, marginTop:30}}
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://image.freepik.com/free-vector/green-abstract-geometric-background_23-2148366726.jpg"
              alt="First slide"
              href="https://www.google.com/"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Correos validados</h3>
            <p>Exitosos</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://image.freepik.com/free-vector/flat-design-yellow-comics-background_23-2148798165.jpg"
              alt="Third slide"
              href="https://www.google.com/"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Correos validados</h3>
            <p>Desconocidos</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://image.freepik.com/free-vector/flat-design-red-comic-style-background_23-2148797742.jpg"
              alt="Second slide"
              href="https://www.google.com/"
            />
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Correos validados</h3>
            <p>Erróneos</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
    
        <MDBCarouselItem itemId="4">
          <MDBView>
           
              <img
              className="d-block w-100"
              src="https://image.freepik.com/free-vector/purple-3d-modern-background-design_53876-87399.jpg"
              alt="First slide"
            />
           
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Correos validados</h3>
            <p> Inválidos</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel> */}
   
                <TablasAdmin/>               
            </React.Fragment>
        )
    }
} export default dashboardAdmin