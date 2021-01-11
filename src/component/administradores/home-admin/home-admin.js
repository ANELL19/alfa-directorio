
import React, { Component } from "react"
import NavbarDashboard from './NavbarDashboard'

class HomeAdmin extends Component{
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
             <NavbarDashboard data={rs}/>
        </React.Fragment>

        )
    }
} export default HomeAdmin


