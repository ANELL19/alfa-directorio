import React, { Component } from "react"
import navbarDashboard from './NavbarDashboard'
// import tablasAdmin from './tablasAdmin'

class dashboardAlfa extends Component{
  constructor(props){
    super(props)
    this.state = {
        
        }
    } 

      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
    render(){ 
      //  const rs = localStorage.getItem("razonSocial");     
        return(
            <React.Fragment>
            <navbarDashboard/>
            
        </React.Fragment>

        )
    }
} export default dashboardAlfa

