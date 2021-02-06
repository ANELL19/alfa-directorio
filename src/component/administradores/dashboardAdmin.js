import React, { Component } from "react"
 import NavbarAdmin from './NavbarAdmin'
 import TablasAdmin from './tablasAdmin'

class dashboardAdmin extends Component{
  constructor(props){
    super(props)
    this.state = {
         larazonSocial:'',
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
                <TablasAdmin/>               
            </React.Fragment>
        )
    }
} export default dashboardAdmin