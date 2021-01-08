// import axios from 'axios'
// import React, { Component } from 'react';

// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink,
//     UncontrolledDropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem,
//     NavbarText,
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle, Button,  Carousel,
//     CarouselItem,
//     CarouselControl,
//     CarouselIndicators,
//     CarouselCaption,Table,Modal, ModalHeader, ModalBody, ModalFooter
//    } from 'reactstrap';


// class Dashboard extends Component{

// constructor(props){
//     super(props)
//     this.state = {
//         activeIndex:0,
//         animating:false,
//         elNombre:'',
//         elapellidoP:'',
//         elapellidoM:'',
//         arrayTabla:[],
//         modal:false,


//     }
//     this.regresar = this.regresar.bind(this)
//     this.toggle = this.toggle.bind(this)
// } 
// regresar(){
//     this.props.history.push("/")
//  } 

// toggle(parametro){
//   this.setState({modal:parametro})
// }

// componentWillMount(){
//   const nomb = localStorage.getItem("nombre") 
//   const apellidoP = localStorage.getItem("apellidos")
//   const apellidoM = localStorage.getItem("ape")

//   const API='http://localhost:4000/graphql'   
//       const id =  localStorage.getItem("id")
      
    
    
//        axios({
//           url:API,
//           method:'post',
//           data:{
//               query:`
//               query{   
//                 getAdmins(data:"${[id]}"){
//                   id
                  
//                    } 
//               }
//               `
//           }   
//            })
//          .then(datos => {
//               this.setState({tablas:datos.data.data.getEmpleados})
//               console.log("que hay en administrador" , datos)
//           })
//           .catch(err=>{
//              console.log('error del dashboard' ,err.response)
//           })
    
  
//       this.setState({elNombre:nomb})
//       this.setState({elapellidoP:apellidoP})
//       this.setState({elapellidoM:apellidoM})

       
//     }

  

//  render(){
    
//      const slides = items.map((item) => {
//         return (
//           <CarouselItem
//             onExiting={() => this.setState({animating:true})}
//             onExited={() => this.setState({animating:false})}
//             key={item.src}
//           >
//             <img src={item.src} alt={item.altText} />
//             <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
//           </CarouselItem>
//         );
//       });

//     const nom = this.state.elNombre
//     const apeP = this.state.elapellidoP
//     const apeM = this.state.elapellidoM

//  /// console.log("algo",this.state.elNombre,this.state.elapellidoP,this.state.elapellidoM)
// let modal;
// if(this.state.arrayEmpleados){
// console.log("arrayempledo" , this.state.arrayEmpleados)  
// modal = <div>
  

// <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} style={{width:2000, height:1000}}>
//     <ModalHeader toggle={e=>this.toggle(false)} >Empleados </ModalHeader>
    
//     <ModalBody>

//     <Table small responsive>
// <thead>
//  <tr>
// <td >id</td>
// <td >Nombre</td>
// <td >Apellido P</td>
// <td >apellido M</td>
// <td >Telefono</td>
// <td >Direccion</td>
// <td >CP</td>
// </tr>
// </thead>
// {this.state.arrayEmpleados.map(rows=>{
// return(

// <tbody>
// <tr>
// <th scope="row" ></th>
// <td  key={rows.id}>{rows.id}</td>
// <td >{rows.nombreEmpleado}</td>
// <td width="5%">{rows.apellidoPempleado}</td>
// <td width="5%">{rows.apellidoMempleado}</td>
// <td width="5%">{rows.direccionE}</td>
// <td width="5%">{rows.telefonoE}</td>
// <td width="5%">{rows.cp}</td>
// </tr>
// </tbody>
// )
// })}
// </Table>
// </ModalBody>
//     <ModalFooter>
//     <Button color="secondary" onClick={e=>this.toggle(false)}>Cancel</Button> 
//     </ModalFooter>
// </Modal>
// </div>   
// }

// // let modal;
// // if(this.state.arrayEmpleados){
// // console.log("arrayempledo" , this.state.arrayEmpleados)  
// // modal = <div>
// // <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} style={{width:2000, height:1000}}>
// //     <ModalHeader toggle={e=>this.toggle(false)} >Empleados </ModalHeader>
    
// //     <ModalBody>

// //     <Table small responsive>
// // <thead>
// //  <tr>
// // <td >id</td>
// // <td >Nombre</td>
// // <td >Apellido P</td>
// // <td >apellido M</td>
// // <td >Telefono</td>
// // <td >Direccion</td>
// // <td >CP</td>
// // </tr>
// // </thead>
// // {this.state.arrayEmpleados.map(rows=>{
// // return(

// // <tbody>
// // <tr>
// // <th scope="row" ></th>
// // <td  key={rows.id}>{rows.id}</td>
// // <td >{rows.nombreEmpleado}</td>
// // <td width="5%">{rows.apellidoPempleado}</td>
// // <td width="5%">{rows.apellidoMempleado}</td>
// // <td width="5%">{rows.direccionE}</td>
// // <td width="5%">{rows.telefonoE}</td>
// // <td width="5%">{rows.cp}</td>
// // </tr>
// // </tbody>
// // )
// // })}
// // </Table>
// // </ModalBody>
// //     <ModalFooter>
// //     <Button color="secondary" onClick={e=>this.toggle(false)}>Cancel</Button> 
// //     </ModalFooter>
// // </Modal>
// // </div>   
// // }

// return(
//     <React.Fragment>
   
//    <Navbar style={{backgroundColor: '#ffccff'}} light expand="md">
   
// <NavbarBrand  > <strong>Bienvenido &nbsp;&nbsp;</strong> {nom}&nbsp;&nbsp;{apeP}&nbsp;&nbsp;{apeM}&nbsp;</NavbarBrand>
//           <Collapse navbar>
//             <Nav className="mr-auto" navbar>

//             <NavItem>
//                  <NavLink href="/Cliente">Cliente</NavLink>
//                </NavItem>


//                <NavItem>
//                  <NavLink href="/Empleado">Empleados</NavLink>
//                </NavItem>


//                <NavItem>
//                  <NavLink href="/Producto">Productos</NavLink>
//                </NavItem>


//                <NavItem>
//                  <NavLink href="/Empresa">Empresa</NavLink>
//                </NavItem>

//               <UncontrolledDropdown nav inNavbar style={{marginLeft:600}}>
//                 <DropdownToggle nav caret>
//                   menú
//                 </DropdownToggle>
//                 <DropdownMenu right>
//                   <DropdownItem  color="danger" onClick={this.regresar}>
                    
//                     cerrar sesión
//                   </DropdownItem>
//                   <DropdownItem>
//                     Option 2
//                   </DropdownItem>
//                   <DropdownItem divider />
//                   <DropdownItem>
//                     Reset
//                   </DropdownItem>
//                 </DropdownMenu>
//               </UncontrolledDropdown>
             

              
//               <NavItem>
//                 {/* <NavLink href="https://github.com/reactstrap/reactstrap">
//                                  </NavLink> */}
//                 {/* <Button color="danger"style={{marginLeft:300}} onClick={this.regresar} >Cerrar Sesión</Button> */}

//               </NavItem>

              
//             </Nav>
            
//           </Collapse>
//         </Navbar>
//         <Button color="danger" onClick={this.toggle}>click aqui</Button>
//         {modal}
                 

// {/* 
        
//         <Table  bordered size="sm">
         
//              <th scope="row" ></th>
//              <td width="5%">id</td>
//               <td width="5%">Nombre</td>
//               <td width="5%">Apellido P</td>
//               <td width="5%">apellido M</td>
//               <td width="5%">Telefono</td>
//               <td width="5%">Direccion</td>
//               <td width="5%">CP</td>
           
//         {this.state.arrayEmpleados.map(rows=>{
//         return(
          
//           <tbody>
//             <tr>
//              <th scope="row" ></th>
//               <td  key={rows.id}>{rows.id}</td>
//               <td >{rows.nombreEmpleado}</td>
//               <td width="5%">{rows.apellidoPempleado}</td>
//               <td width="5%">{rows.apellidoMempleado}</td>
//               <td width="5%">{rows.direccionE}</td>
//               <td width="5%">{rows.telefonoE}</td>
//               <td width="5%">{rows.cp}</td>
//             </tr>
            
//           </tbody>
        
   
//         )
//         })}
//         </Table> */}
      
// {/*         
// <Table >
//           <tbody>
//             <tr>
//              <th scope="row" ></th>
//              <td width="12%">id</td>
//               <td width="14%">Nombre</td>
//               <td width="14%">Apellido P</td>
//               <td width="14%">apellido M</td>
//               <td width="12%">C.P.</td>
//               <td width="14%">Telefono</td>
//               <td width="18%">Correo</td>
//             </tr>
            
//           </tbody>
//         </Table>       <h3>clientes </h3>   
//         <Table bordered size="sm">
       
//         {this.state.arrayClientes.map(rows=>{
//           console.log("que es row",rows)
//         return(
//           <tbody>
//             <tr> 
//              <th scope="row" ></th>
//               <td width="12%" key={rows.id}>{rows.id}</td>
//               <td width="14%">{rows.nombre_cliente}</td>
//               <td width="14%">{rows.apellidoP_cliente}</td>
//               <td width="14%">{rows.apellidoM_cliente}</td>
//               <td width="12%">{rows.cp_cliente}</td>
//               <td width="14%">{rows.telefono_cliente}</td>
//               <td width="18%">{rows.correo_cliente}</td>
              
//             </tr>
            
//           </tbody>
     
//      )
//     })}
//   </Table> */}

//  <Table>
//           <tbody>
//             <tr>
//             <td >id</td>
//               <td >razon_social</td>
// //               <td > direccion</td>
// //               <td >telefonoEmpresa</td>
// //               <td >correoEmpresas</td>
                 

// //             </tr>
            
// //           </tbody>
// //         </Table> 
// //         <Table bordered size="sm">                
// //         {this.state.arrayTrabajo.map(rows=>{
// //         return(
     
// //           <tbody>
// //             <tr>
// //             <td width="12%" key={rows.id}>{rows.id}</td>
// //               <td width="14%">{rows.razon_social}</td>
// //               <td width="14%">{rows.direccion}</td>
// //               <td width="14%">{rows.telefonoEmpresa}</td>
// //               <td width="12%">{rows.correoEmpresas}</td>
 
// //             </tr>
            
// //           </tbody>



// // )
// // })} 
// //               </Table> 
    



// // </React.Fragment>
// // )

// // }
// // }

// // export default Dashboard

// //----------------------- generar contraseña ----------------------

 
// for(var i=1; i<data; i++){
     
//     var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     var lower = "abcdefghijklmnopqrstuvwxyz"
//     var digit = "0123456789"
//     var all = upper + lower + digit
    
//     function rand (max) {
//     return Math.floor(Math.random() * max)
//     }
    
//     function random (set) {
//     return set[rand(set.length - 1)]
//     }
    
    
//     function generate (length, set) {
//     var result = []
//     while (length--) result.push(random(set))
//     return result
    
//     }
    
//     function shuffle (arr) {
//     var result = []
    
//     while (arr.length) {
//     result = result.concat(arr.splice(rand[arr.length - 1]))
//     console.log(result)
//     }
    
    
//     return result
//     }
    
//     function password (length) {
//     var result = [] 
    
//     result = result.concat(generate(1, upper)) 
//     result = result.concat(generate(1, lower)) 
//     result = result.concat(generate(1, digit)) 
//     result = result.concat(generate(length - 3, all)) 
    
//     return shuffle(result).join("") 
    
//     }
    
//     // console.log(password(6))
//      let data= password(10)
    
//      let  dataPass=[]
//     dataPass.push(data)
//     console.log(dataPass)
    
//      }
//      datapass.map()



     ///__________