import React , { useState } from 'react'
import XLSX from 'xlsx'
import {MDBCol} from "mdbreact";
import axios from 'axios';
import { Alert } from 'reactstrap';
import { Button as Boton, Modal, ModalBody} from 'reactstrap';
import {MDBRow,  MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter ,MDBContainer, MDBBtn} from 'mdbreact';
//import '../Home/index.css'
import { DialogUtility } from '@syncfusion/ej2-popups';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router-dom';
// import MiniDrawer from '../adminGeneral/Sidebar'
//import Navbar from '../adminGeneral/navbar'
import {Paper,Grid,	Button,	RadioGroup,	FormLabel,MenuItem,FormControl,	FormControlLabel  } from '@material-ui/core';


  import { Form, Field } from 'react-final-form';

  import { TextField, Radio, Select } from 'final-form-material-ui';


  //modal
  const ModalPrueba = (props) => {
	const {
	  buttonLabel,
	  className
	} = props;
  
	const [modal, setModal] = useState(false);
  
	const toggle = () => setModal(!modal);

	const handleToggle = () => setModal(!modal);
	return (
	<React.Fragment>
	  <div>
		<Boton size="md"  color="success" onClick={toggle}>{buttonLabel}Cargar Empleados</Boton>
		<Modal isOpen={modal} toggle={toggle} className={className} tabindex="-1" >
		  <ModalBody>
		  <SheetJSApp/> 
		  </ModalBody>
		  <MDBBtn color="secondary" onClick={handleToggle}>Cerrar</MDBBtn>
		</Modal>
	  </div>
	<Alert style = {{marginTop:40,width:350}} color ="success">
		Nota : Puede ver los requisitos de su excel desde este enlace<br/>  
		 <a href="https://drive.google.com/open?id=1Ooo_zRxkaHNSjjetliZGTanceA7tRsK1" 
		 target="_blank">Carga de empleados Excel Ejemplo </a></Alert>
	  </React.Fragment>	
	);
  }



class SheetJSApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			sucursalNoExiste:[],
			deptoNoExiste:[],
			puestoNoExiste:[],
			sucursal:[],
			depto:[],
			puesto:[],	
		message:[],
		 modal: false,
			spinner:false,
			empleadoExitoso:[],
			empleadoNoExitoso:[],
			empleadoRegistrado:[],
			empleadoNoRegistrado:[]
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
	};
	

	onSubmitBtn = (e)=>{
        e.preventDefault();  
		const API='http://localhost:4000/graphql'  
		 console.log("datos " , this.state.data)
		 for(var i = 0; i< this.state.data.length; i++ ){
			 var estado = this.state.data[i]
			const query = `
			mutation{
				directorio(data:["${estado}"]){
					message
				}
			}
			
			
			`
			axios({
				url:API,
				method:'post',
				data:{
					query,
					variables: {
						data:`${estado}`
					}
				}
			}).then(datos=>{
				console.log("datos" ,datos)
			}).catch(err=>{
				console.log("err" , err.response)
			})
		 }

    }


	handleFile(file) {
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {

			const bstr = e.target.result;

			const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });

			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];

			const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            this.setState({ data: data });
		};
		if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};

	exportFile() {
		const ws = XLSX.utils.aoa_to_sheet(this.state.data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, "sheetjs.xlsx")

	};
	toggle = () => {
		this.setState({
		  modal: !this.state.modal
		});
	  }
	render() {

		let spinner;



	
		this.state.message.map(rows =>{
			console.log("rows",rows)
			if(rows === 'correo existente'){
			
				this.setState({empleadoNoRegistrado:this.state.empleadoNoExitoso})
				this.setState({empleadoNoExitoso:[]})
				this.toggle()
				this.setState({spinner:false})	
				
			}
			if(rows === 'el puesto no existe'){
				
				this.setState({puesto:this.state.puestoNoExiste})
				this.setState({puestoNoExiste:[]})
				this.toggle()
				this.setState({spinner:false})	
				
			}
			if(rows === 'el departamento no existe'){
				
				this.setState({depto:this.state.deptoNoExiste})
				this.setState({deptoNoExiste:[]})
	
				this.toggle()
				this.setState({spinner:false})	
			}
			if(rows=== 'la sucursal no existe'){
				this.setState({sucursal:this.state.sucursalNoExiste})
				this.setState({sucursalNoExiste:[]})
				this.toggle()
				this.setState({spinner:false})	
				
			}
			
			else if(rows === 'registro exitoso'){	
				this.setState({empleadoRegistrado:this.state.empleadoExitoso})
				this.setState({empleadoExitoso:[]})
				this.toggle()
				this.setState({spinner:false})	
			}
			this.setState({message:[]})

		})

		

			if(this.state.spinner === true){
				spinner = <div className="spinner-border text-info" role="status"><strong className="sr-only">Espere un momento por favor ...</strong>
					</div>
			}

		return (
			
				<React.Fragment>
					{spinner}
			 	<DragDropFile handleFile={this.handleFile}>	
				<div className="row"><div className="col-xs-12">
					<DataInput handleFile={this.handleFile} />
                    <MDBCol className=" text-center mt-2 pt-2 " >
                    <MDBBtn className="boton" disabled={!this.state.data.length}  color="info" type="submit" onClick={this.onSubmitBtn} >Cargar </MDBBtn>
					
					</MDBCol> 		
				</div> </div>
			</DragDropFile>	
				<MDBContainer>
			
				<MDBModal isOpen={this.state.modal} toggle={this.toggle}>
				<MDBModalHeader toggle={this.toggle}>
					Detalles en la carga de Empleados</MDBModalHeader>
						<MDBModalBody>
						<TableContainer component={Paper}>
						<Table  style = {{width:450}} size="small" aria-label="a dense table">
							<TableHead>
							<TableRow>
							<TableCell>Centros de T. no registrados en su catálogo :</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.sucursal.map((row) => {
								return(
								<TableRow >
								<TableCell component="th" scope="row">
									{row}
								</TableCell>
							
								</TableRow>
								)
								
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Departamentos no registrados en su catálogo :  </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.depto.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
									</TableRow>
									)
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Puestos no registrados  en su catálogo : </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.puesto.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
									</TableRow>
									)
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Empleados ya registrados con anterioridad  : </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.empleadoNoRegistrado.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
								
									</TableRow>
									)
									
								
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Empleados cargados Exitosamente  : </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.empleadoRegistrado.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
									</TableRow>
									)
								
									})}
							</TableBody>
						</Table>
						</TableContainer>		
						</MDBModalBody>
						<MDBModalFooter>
						<MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>

						</MDBModalFooter>
					</MDBModal>
					</MDBContainer>
							
			</React.Fragment>
		
		);
	};
};


class DragDropFile extends React.Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);

	};
	suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
	onDrop(evt) {
		evt.stopPropagation(); evt.preventDefault();
		const files = evt.dataTransfer.files;
		if (files && files[0]) this.props.handleFile(files[0]);
	};
	render() {
		return (


			<div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
				{this.props.children}
			</div>

		);
	};
};

class DataInput extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	};
	handleChange(e) {
		const files = e.target.files;
		if (files && files[0]) this.props.handleFile(files[0]);
	};

	render() {
		return (

			<form > 
				<div className="form-group">
				<Alert color="primary">Por favor seleccione su base de datos, Puede cargar archivos ("xlsx","csv")</Alert>   <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                </div>
                </form>
		);
	};
}

const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) { return "." + x; }).join(",");


export default ModalPrueba