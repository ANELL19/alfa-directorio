
import React, { Component } from "react"
import NavbarDashboard from './navbarAlfa'
import axios from 'axios'

class HomeAdminAlfa extends Component{
  constructor(props){
    super(props)
    this.state = {
         larazonSocial:'',
        }
    } 
    componentWillMount(){
      const fk_paquetes  = localStorage.getItem("fk_paquetes")
      const API='http://localhost:4000/graphql'   

      axios({
        url:API,
        method:'post',
        data:{
            query:`
            query{
                getPaquetes(data:"${[fk_paquetes]}"){
                   empresas
               } 
            }
            `
        }   
         }).then(response=>{
            console.log(response)
            localStorage.setItem("paquetesdeAdmonGral",response.data.data.getPaquetes.empresas)
         })
         .catch(err=>{
             console.log('error',err)
         })

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
} export default HomeAdminAlfa

