import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';
import LoginAdminG from './component/adminGeneral/loginadminG/loginadminG'
import signupAdminG from './component/adminGeneral/signupAdminG/signupAdminG'
import Signup from './component/signup/signup';
import LoginAdmin from './component/administradores/LoginAdmin/LoginAdmin'
import signupadmin from './component/administradores/signupAmin/signupAmin'
import homeadmin from './component/administradores/home-admin/home-admin'
import LoginClientes from './component/clientes/LoginClientes/LoginClientes'
import RegistrarClientes from './component/clientes/RegistrarClientes/registrarClientes'
import panelRegisterClientes from './component/clientes/panelRegisterClientes/panelRegisterClientes'
import checkToken  from '../src/component/resolvers/checkToken'
import dashboardAdminGral from '../src/component/adminGeneral/dahboard'
import navbarAdminGral from '../src/component/adminGeneral/navbarDashboard'
import company from '../src/component/adminGeneral/empresas'

import validation from '../src/component/adminGeneral/validation'


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
        <Route exact path= "/loginAdmin" component= {LoginAdmin}/>
        <PrivateRoute exact path= "/signupadmin" component= {signupadmin}/>
        <PrivateRoute exact path= "/homeadmin" component= {homeadmin}/>
        <Route exact path= "/" component= {LoginAdminG}/>
        <PrivateRoute exact path = "/signupAdminG" component={signupAdminG}/>
        <PrivateRoute exact path = "/dashbordAdminGral" component={dashboardAdminGral}/>
        <PrivateRoute exact path = "/navbarAdminGral" component={navbarAdminGral}/>
        <PrivateRoute exact path = "/companyAdminGral" component={company}/>




        
    </main>
       </Switch>          
       </Router>
  )
}
}
export default App