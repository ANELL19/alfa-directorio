import { extend } from '@syncfusion/ej2-react-grids'
import { render } from '@testing-library/react'
import React, {Component} from 'react'

class Modal extends Component{
  render(){
    return(
      <React.Fragment>
			<Alert style={{marginTop:60}} color="primary"><strong>Registrar empleados</strong></Alert>	
				{/* <Navbar/> */}
				<MDBContainer style = {{marginTop:20}}>
				<MDBRow><MDBCol>
				<div style={{ margin: 'auto', maxWidth: 600 }}>
					<Form
					onSubmit={this.onSubmit}
					
					validate={this.validate}
					render={({ handleSubmit, submitting,values }) => (
						<form onSubmit={handleSubmit}>
						<Paper style={{ padding: 16 }}>
							<Grid container alignItems="flex-start" spacing={2}>
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="Nombre"
								component={TextField}
								type="text"
								label="Nombre"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="ApellidoP"
								component={TextField}
								type="text"
								label="Apellido Paterno"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="ApellidoM"
								component={TextField}
								type="text"
								label="Apelllido Materno"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								
								fullWidth
								required
								name="curp"
								component={TextField}
								type="text"
								label="CURP"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="rfc"
								component={TextField}
								type="text"
								label="RFC"
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
								name="Correo"
								fullWidth
								required
								component={TextField}
								type="email"
								label="Correo"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								name="puesto"
								component={Select}
								label="Puesto"
								formControlProps={{ fullWidth: true }}
								placeholder
								>
								{this.state.puestos.map(row=>{
									return(<MenuItem value={row.nombre}>{row.nombre}</MenuItem>)
								})}
								</Field>
								</Grid>
			
			
							<Grid item xs={6}>
								<Field
								name="area"
								fullWidth
								required
								component={TextField}
								type="text"
								label="Departamento"
								component={Select}
								formControlProps={{ fullWidth: true }}
								
								>
								{this.state.deptos.map(rows=>{
									return(	<MenuItem value={rows.nombre}>{rows.nombre}</MenuItem>)
								})}
								</Field>
							</Grid>
							<Grid item xs={12}>
								<Field
								fullWidth
								name="CentroTrabajo"
								component={Select}
								label="Centro de Trabajo"
								formControlProps={{ fullWidth: true }}
								>
								{this.state.sucursal.map(row=>{
									return(<MenuItem value={row.nombreSucursal}>{row.nombreSucursal}</MenuItem>)
								})}
								</Field>
								<Alert color="primary" style={{marginTop:30}}>Datos del Trabajador</Alert>
								</Grid>
							
							<Grid item xs={6}>

								<Field
								required
								fullWidth
								name="fechaN"
								component={Select}
								label="Rango de Edad"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="15 a 19">15 a 19</MenuItem>
								<MenuItem value="20 a 24">20 a 24</MenuItem>
								<MenuItem value="25 a 29">25 a 29</MenuItem>
								<MenuItem value="30 a 34">30 a 34</MenuItem>
								<MenuItem value="35 a 39">35 a 39</MenuItem>
								<MenuItem value="40 a 44">40 a 44</MenuItem>
								<MenuItem value="45 a 49">45 a 49</MenuItem>
								<MenuItem value="50 a 54">50 a 54</MenuItem>
								<MenuItem value="55 a 59">55 a 59</MenuItem>
								<MenuItem value="60 a 64">60 a 64</MenuItem>
								<MenuItem value="65 a 69">65 a 69</MenuItem>
								<MenuItem value="70 o más">70 o más</MenuItem>
								</Field>
								</Grid>
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="Estado_Civil"
								component={Select}
								label="Estado Civil"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Casado">Casado</MenuItem>
								<MenuItem value="Soltero">Soltero</MenuItem>
								<MenuItem value="Unión libre">Unión libre</MenuItem>
								<MenuItem value="Divorciado">Divorciado</MenuItem>
								<MenuItem value="Viudo">Viudo</MenuItem>
								</Field>
								</Grid>

							<Grid item xs={6}>
								<Field
								fullWidth
								name="tipoPuesto"
								component={Select}
								label="Seleccione el Tipo de Puesto"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="Operativo">Operativo</MenuItem>
								<MenuItem value="Profesional o Técnico">Profesional o Técnico</MenuItem>
								<MenuItem value="Supervisor">Supervisor</MenuItem>
								<MenuItem value="Gerencial">Gerencial</MenuItem>
								<MenuItem value="Directivo">Directivo</MenuItem>

								</Field>
							</Grid>
			
						
							<Grid item xs={6}>
								<Field
								fullWidth
								name="estudios"
								component={Select}
								label="Nivel de Estudios"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Sin formacion">Sin formación</MenuItem>
								<MenuItem value="Primaria">Primaria</MenuItem>
								<MenuItem value="Secundaria">Secundaria</MenuItem>
								<MenuItem value="Preparatoria o Bachillerato">Preparatoria o Bachillerato</MenuItem>
								<MenuItem value="Licenciatura">Licenciatura</MenuItem>
								<MenuItem value="Maestria">Maestría</MenuItem>
								<MenuItem value="Doctorado">Doctorado</MenuItem>
			
								</Field>
								</Grid>
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="personal"
								component={Select}
								label="Tipo de Personal"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="Sindicalizado">Sindicalizado</MenuItem>
								<MenuItem value="Ninguno">Ninguno</MenuItem>
								<MenuItem value="Confianza">Confianza</MenuItem>
								</Field>
								</Grid>
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="Jornada"
								component={Select}
								label="Tipo de jornada de trabajo:"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="Fijo nocturno (entre las 20:00 y 6:00 hrs)">Fijo nocturno (entre las 20:00 y 6:00 hrs)</MenuItem>
								<MenuItem value="Fijo diurno (entre las 6:00 y 20:00 hrs)">Fijo diurno (entre las 6:00 y 20:00 hrs</MenuItem>
								<MenuItem value="Fijo mixto (combinación de nocturno y diurno)">Fijo mixto (combinación de nocturno y diurno)</MenuItem>
				
								
								</Field>
								</Grid>
			
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="contratacion"
								component={Select}
								label="Tipo de Contratación"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Por obra o proyecto">Por obra o proyecto</MenuItem>
								<MenuItem value="por tiempo determinado (temporal)">Por tiempo determinado (temporal)</MenuItem>
								<MenuItem value="Tiempo indeterminado">Tiempo indeterminado</MenuItem>
								<MenuItem value="Honorarios">Honorarios</MenuItem>
								</Field>
								</Grid>
			
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="Tiempo_puestoActual"
								component={Select}
								label="Tiempo en el puesto Actual"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Menos de 6 meses">Menos de 6 meses</MenuItem>
								<MenuItem value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</MenuItem>
								<MenuItem value="Entre 1 a 4 años">Entre 1 a 4 años</MenuItem>
								<MenuItem value="Entre 5 a 9 años">Entre 5 a 9 años</MenuItem>
								<MenuItem value="Entre 10 a 14 años">Entre 10 a 14 años</MenuItem>
								<MenuItem value="Entre 15 a 19 años">Entre 15 a 19 años</MenuItem>
								<MenuItem value="Entre 20 a 24 años">Entre 20 a 24 años</MenuItem>
								<MenuItem value="25 años o más">25 años o más</MenuItem>
								</Field>
								</Grid>
			
								<Grid item xs={12}>
								<Field
								fullWidth
								name="experiencia_Laboral"
								component={Select}
								label="Tiempo experiencia laboral"
								formControlProps={{ fullWidth: true }}
								
								>
			
								<MenuItem value="Menos de 6 meses">Menos de 6 meses</MenuItem>
								<MenuItem value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</MenuItem>
								<MenuItem value="Entre 1 a 4 años">Entre 1 a 4 años</MenuItem>
								<MenuItem value="Entre 5 a 9 años">Entre 5 a 9 años</MenuItem>
								<MenuItem value="Entre 10 a 14 años">Entre 10 a 14 años</MenuItem>
								<MenuItem value="Entre 15 a 19 años">Entre 15 a 19 años</MenuItem>
								<MenuItem value="Entre 20 a 24 años">Entre 20 a 24 años</MenuItem>
								<MenuItem value="25 años o más">25 años o más</MenuItem>
								</Field>
								</Grid>
			
			
			
								<Grid  item xs={12}>
								<FormControl component="fieldset">
								<RadioGroup row>
									<MDBRow>
									<MDBCol>
									<FormLabel component="legend" className="text-center mt-3 ml-3">Realiza rotación de turnos:</FormLabel>
									</MDBCol> 
									<FormControlLabel 
									label="Si"
									control={
										<Field
										required
										name="rotacion"
										component={Radio}
										type="radio"
										value="si"
										/>
									}
									/>
									<FormControlLabel
									label="No"
									control={
										<Field
										required
										name="rotacion"
										component={Radio}
										type="radio"
										value="no"
										/>
									}
									/>
									</MDBRow>
			
								</RadioGroup>
								</FormControl>
							</Grid>
			
			
							<Grid  item xs={12}>
								<FormControl component="fieldset">
								<RadioGroup row>
									<MDBRow>
									<MDBCol>
									<FormLabel component="legend" className="text-center mt-3 ml-3">SEXO</FormLabel>
									</MDBCol> 
									<FormControlLabel 
									label="Hombre"
									control={
										<Field
										required
										name="stooge"
										component={Radio}
										type="radio"
										value="Masculino"
										/>
									}
									/>
									<FormControlLabel
									label="Mujer"
									control={
										<Field
										required
										name="stooge"
										component={Radio}
										type="radio"
										value="Femenino"
										/>
									}
									/>
									</MDBRow>
			
								</RadioGroup>
								</FormControl>
							</Grid>
			
							<Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
								<MDBBtn
								size="md" 
								color="secondary"
								type="submit"
								disabled={submitting}
								onClick={(e) =>this.evaluar(values)}
								className="text-white"
								>
								Registrar Empleado
								</MDBBtn>
							</Grid>
							</Grid>
						</Paper>
						
						</form>
					)}
					/>
				</div>		
				</MDBCol>
									
						<MDBCol  md="3" className="black-text text-center text-md-left mt-xl-5 mb-5"><strong>¿Desea cargar por csv o xls?</strong> <ModalPrueba/></MDBCol> 
					
						</MDBRow>
						</MDBContainer>
				</React.Fragment>

    )

  }
}export default Modal