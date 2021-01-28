import React, { Component } from "react"
import NavbarDashboard from './NavbarDashboard'
import tablasAdmin from './tablasAdmin'

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
             <NavbarDashboard data={rs}/>
             {/* <TablasAdmin/> */}
             <tablasAdmin/>
             
        </React.Fragment>

        )
    }
} export default dashboardAdmin