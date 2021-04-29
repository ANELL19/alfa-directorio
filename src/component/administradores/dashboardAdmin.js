import React, { Component } from "react"
import NavbarAdmin from './NavbarAdmin'
import TablasAdmin from './tablasAdmin'
import {  MDBView} from 'mdbreact';

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