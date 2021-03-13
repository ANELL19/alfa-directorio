import React, { Component } from "react"
import NavbarAdmin from './NavbarAdmin'
import TablasAdmin from './tablasAdmin'
import {  CarouselItem,
  CarouselCaption} from 'reactstrap';
 
  import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol , MDBContainer,MDBRow, MDBView} from 'mdbreact';

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
              
              <MDBView >  
                <NavbarAdmin data={rs}/>   
                <TablasAdmin/> 
                </MDBView> 
                 
                           
            </React.Fragment>
        )
    }
} export default dashboardAdmin