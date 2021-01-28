import React from "react"
import { MDBContainer, MDBAlert,MDBCol } from 'mdbreact';

const PageNotFound = () => (
//Fragment
  
	<MDBContainer style={{marginTop:300,marginBottom:100}}>
      
      <MDBAlert color="primary"  >
      “No se encontraron resultados.La página solicitada no pudo encontrarse.""
      </MDBAlert>	
      
      </MDBContainer>

  
)
export default PageNotFound