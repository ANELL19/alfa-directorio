import React, {Component} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import { CardBody, Label,Form,Row,Alert} from 'reactstrap';



class RegistrarEmpleados extends Component{
	constructor(props){
		super(props)
		this.state ={
			nombre_cliente:"",
			empresa:"",               
			telefono1:"",          
			telefono2:"",
			correo:"",
			nota: "",


		}
	}
	onChangeInput =(e)=>{
		console.log("eventoonChange" , e)
		const {id,value} = e.target;
		this.setState({
			[id]:value
		})
	}   
	onSubmitBtn = (e)=>{
		e.preventDefault();  
		const API='http://localhost:4000/graphql'   
		axios({
			url:API,
			method:'post',
			data:{
				query:`
				mutation{
					directorio(data:"${[this.state.nombre_cliente,this.state.empresa,this.state.telefono1,this.state.telefono2,this.state.correo]}"){             
				 
					message
					 } 
				}
				`
			}   
			 })
		   .then(response=>{
				  console.log( 'este es el response',response)
			  //  if(response.data.data.signup.message==="registro exitoso"){

				this.props.history.push("/registrar")
	   
			   // }else{
			   //   console.log(response.data.data.signup.message)
		   //  }


			})
		 .catch(err=>{
				  console.log('error',err.response)
			  })  
	}
render(){
	return(
		<React.Fragment>
			     <Paper elevation={3}  style={{height:600, width:350, marginLeft:100, marginRight:30, marginTop:10}}>
				 <Alert  color="primary" >
        <h5 className="h5 text-center mb-4">registrar usuario</h5>
		</Alert>  

  <MDBRow>
      <MDBCol style={{marginLeft:25,marginTop:20, marginRight:25}}>
	<Form  onSubmit={this.onSubmitBtn} >
	  
		<div className="grey-text">
		  <MDBInput
		    label="nombre"
			icon="user" 
			id="nombre_cliente"
			type="text"
			name="nombre_cliente"
			placeholder="Nombre"
			onChange={this.onChangeInput} 
            value={this.state.pass}
            required
			/>
		  <MDBInput
			label="Empresa"
			icon="city"
			id="empresa"
			type="text"
			name="empresa"
			placeholder="Empresa"
			onChange={this.onChangeInput} 
            value={this.state.pass}
            required
		/>
		<MDBInput
			label="Correo"
			icon="envelope"
			id="correo"
			type="email"
			name="correo"                   
			placeholder="Correo"
			onChange={this.onChangeInput} 
            value={this.state.pass} 
            required
		/>
		 <MDBInput
			label="Telefono1"
			icon="phone" 
			id="telefono1"
			type="text"
			name="telefono1"
			placeholder="Telefono1"
			onChange={this.onChangeInput} 
            value={this.state.pass}
            required
		/>
		 <MDBInput
			label="Telefono2"
			icon="phone"
			id="telefono2"
			type="text"
			name="telefono2"
			placeholder="Telefono2"
			onChange={this.onChangeInput} 
			value={this.state.pass} 
		/>
		<TextField
			id="nota"
			type="text"
			name="nombre"
			label="Nota"                    
			placeholder="notas"                    
			fullWidth
			margin="normal"
			InputLabelProps={{
				shrink: true,
			}}
			variant="outlined"
			/>
         
        </div>
        <div className="text-center">
          <MDBBtn color="primary"  type="submit">Register</MDBBtn>
        </div>
      </Form>
    </MDBCol>
  </MDBRow>

</Paper>
</React.Fragment>

	)
}
} export default RegistrarEmpleados