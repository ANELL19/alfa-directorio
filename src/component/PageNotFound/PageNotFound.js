import React,{Component} from "react"
import { MDBContainer, MDBAlert,MDBCol } from 'mdbreact';


class PageNotFound  extends Component{
      render(){
            return(
                <MDBContainer style={{marginTop:300,marginBottom:100}}>
                  
                  <MDBAlert color="primary"  >
                  “No se encontraron resultados.La página solicitada no pudo encontrarse.""
                  </MDBAlert>	
                  
                  </MDBContainer>
            )
      }
} export default PageNotFound 

