import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBRow, MDBCol, MDBInput, MDBBtn,MDBAlert, MDBCard,MDBCardBody, MDBView} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Form,FormGroup,Label,Col,Input} from 'reactstrap';
import index from "./index.css"
import {API} from '../Graphql/Graphql'
import Navbar from './navbar'



class dashdoardAdminAlfa extends Component{
    constructor(props){
        super(props)
        this.state ={
            
        }
    }
    
    
   

     render(){
         return(
        <React.Fragment>
           
        <Navbar/>

        </React.Fragment>
        )
    }
}
export default dashdoardAdminAlfa