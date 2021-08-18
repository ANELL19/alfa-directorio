import React , { useState } from 'react'
import XLSX from 'xlsx'
import {MDBCol} from "mdbreact";
import axios from 'axios';
import { DialogUtility } from '@syncfusion/ej2-popups';
import Alert from '@material-ui/lab/Alert';
import {MDBRow, MDBContainer, MDBBtn,MDBCard, MDBCardImage, MDBAlert } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Avatar, Image } from 'antd';
import BackupIcon from '@material-ui/icons/Backup';
import './registrarCliente.css'
import {API} from  '../Graphql/Graphql'
import {Card} from 'antd'
//modal
  const ModalPrueba = (props) => {
	const {
	  buttonLabel,
	  className
	} = props;
	
	// const [modal, setModal] = useState(false);
  
	// const toggle = () => setModal(modal);

	// const handleToggle = () => setModal(!modal);
	let titulo = <trong><h4>Registrar Masivo de Cliente</h4></trong>
	let extra = <p style={{color:"red"}}>Por favor seleccione su base de datos, Puede cargar archivos ("xlsx","csv")</p>
	return (
	<div>

		<div style={{marginTop:"1%",marginRight:"9%",marginLeft:"1%"}}>
          <Card title = {titulo}>
            <MDBRow>
              <MDBCol size="4">
                <MDBCard style={{ width: "22rem",heigth:"25rem"}}>
                  <MDBCardImage
                    className="img-fluid"
                    src="https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    waves
                  />
                </MDBCard>
              </MDBCol>
              <MDBCol size="7" style={{ marginLeft:"8%" }}>
				  <div>     
					  <Card title={extra}>           
                      <MDBCol>
					  <SheetJSApp /> 
                     </MDBCol> 
					 </Card>                      
                  </div>                  
               
              </MDBCol>
            </MDBRow>
          </Card>
        </div>		
	  </div>	
	);
  }
class SheetJSApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		data: [],
		message:[],
		modal: false,
		spinner:false,
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
		this.onSubmitBtn = this.onSubmitBtn.bind(this)
	};

	onSubmitBtn = async (e)=>{
         e.preventDefault();  
		// const API='http://localhost:4000/graphql' 
		// const fk_empresa= localStorage.getItem("fk_empresa") 
		// console.log("fk_empresa",fk_empresa)
		 console.log(" datos ",this.state.data)
		 let increment = 0;
		 let message  = [];
		 for(var i = 1; i< this.state.data.length; i++ ){
			 if(i == this.state.data.length-1){
				 increment = 1
			 }

			 var estado = this.state.data[i]
			 	console.log("esto es estado",estado)	
			const query = `
			mutation{
				 insertClientes(data:["${estado}"]){
					message
				}
			}			
			`
			await axios({
				url:API,
				method:'post',
				data:{
					query,
					variables: {
						data:`${estado}`
					}
				}
				
			}).then(datos=>{
				message.push(datos.data.data.insertClientes.message);
				console.log("mensaje" , message)
			}).catch(err=>{
				console.log("err" , err.response)
			})
			if(increment == 1 && message[0] == "registro exitoso") {
				DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					content: "Registro exitoso,  espere un momento por favor ...",
					title: 'Aviso!',
					position: "fixed"
				});
				// setTimeout(()=>{
				// 	window.location.reload()
				// },3000)		
			}else if(message[0] == undefined){
				DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					content: "Estimado usuario, hay un problema con el registro de su base de datos, por favor reviselo nuevamente.",
					title: 'Aviso!',
					position: "fixed"
				});
			}
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
		return (			
				<React.Fragment>					
			 	<DragDropFile handleFile={this.handleFile}>	
				{/* <div className="row"> */}
					<div >
					<DataInput handleFile={this.handleFile} />
                    <MDBCol className="text-center mt-2 pt-2">
                    <MDBBtn className="boton" disabled={!this.state.data.length}  color="info" type="submit" onClick={this.onSubmitBtn} >Cargar </MDBBtn>					
					</MDBCol> 
					<center>
						Si aún no tiene el formato legible para su BD descárgela <a href="https://drive.google.com/file/d/1NSKcw--1sLMcu6zPrrCvBJe1JDk2M8va/view?usp=sharing" target="_blank" >aquí.</a>
						</center>		
				    </div> 
				{/* </div> */}
			</DragDropFile>	
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
					{/* <div  class="file-upload-button"  style={{marginTop:"10%"}}>
				     	 <input  class="file-upload-button"  type="file"  id="file" accept={SheetJSFT} onChange={this.handleChange}/>	
					 </div>  */}
					 
					<div class="custom-input-file col-md-12 col-sm-6 col-xs-6">
				
					<input type="file"  class="input-file" id="file" accept={SheetJSFT} onChange={this.handleChange}/>
					
					{/* <Avatar size={70} style={{ backgroundColor: '#69c0ff' }} > */}
					<BackupIcon style={{ fontSize: 50 }}/>
					{/* </Avatar>  */}
					{/* </input> */}

					<br></br>Subir Archivo...
					{/* <button className="boton" disabled={!this.state.data.length}  color="info" type="submit" onClick={this.onSubmitBtn} >Cargar </button>	 */}
					</div>
						
					</form>
					
					
				
								
			);
		};
	}

	const SheetJSFT = [
		"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
	].map(function (x) { return "." + x; }).join(",");


	export default ModalPrueba






