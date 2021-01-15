import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';
import Signup from './component/signup/signup';
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
        <Route exact path ="/signup" component ={Signup}/> 
        <Route exact path = "/loginClientes" component ={LoginClientes}/> 
        <PrivateRoute exact path = "/registrarClientes" component ={RegistrarClientes}/>  
        <PrivateRoute exact path = "/clientes" component ={panelRegisterClientes}/> 
        <Route exact path= "/" component= {LoginAdmin}/>
        <PrivateRoute exact path= "/registraradmin" component= {RegistrarAdmin}/>
        <PrivateRoute exact path= "/homeadmin" component= {homeadmin}/>
        
    </main>
       </Switch>          
       </Router>
  )
}
}
export default App