import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';

 import Signup from './component/signup/signup';
// import Registrar from './component/registraEmpresa/registrarEmpresa'
// import Prueba from './component/signup/prueba'
// //import Error from './component/error404/NotFound'
// import Table from './component/table/table'


import LoginAdmin from './component/administradores/LoginAdmin/LoginAdmin'
import RegistrarAdmin from './component/administradores/RegistrarAdmin/RegistrarAdmin'
import homeadmin from './component/administradores/home-admin/home-admin'

import LoginClientes from './component/clientes/LoginClientes/LoginClientes'
import RegistrarClientes from './component/clientes/RegistrarClientes/registrarClientes'
import panelRegisterClientes from './component/clientes/panelRegisterClientes/panelRegisterClientes'

import checkToken  from '../src/component/resolvers/checkToken'

class App extends Component{

render(){
  const PrivateRoute = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props)=> checkToken() === true ? <Component {...props}/> : <Redirect to="/"/>} />
  )
  return(

    <Router>
    <Switch>
    <main>

       {/* <Route exact path = "/" component={Home}/>  
        <Route exact path = "/loginClientes" component ={LoginClientes}/>              */}
        <Route exact path ="/signup" component ={Signup}/> 
        {/* <Route exact path = "/prueba" component ={Prueba}/> 
        <Route exact path = "/registrarClientes" component ={RegistrarClientes}/> 
        <Route exact path = "/registrar" component ={Registrar}/>
        <PrivateRoute exact path = "/table" component ={Table}/>    */}
 
        <Route exact path = "/loginClientes" component ={LoginClientes}/> 
        <PrivateRoute exact path = "/registrarClientes" component ={RegistrarClientes}/>  
        <Route exact path = "/clientes" component ={panelRegisterClientes}/> 
        <Route exact path= "/" component= {LoginAdmin}/>
        <PrivateRoute exact path= "/registraradmin" component= {RegistrarAdmin}/>
        <PrivateRoute exact path= "/homeadmin" component= {homeadmin}/>
       

        {/* <PrivateRoute exact path ="/profile" component ={Profile}/> 
        */}
        

      
       </main>
       </Switch>          
       </Router>
  )
}
}
export default App