import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';
import LoginAdminG from './component/adminGeneral/loginadminG'
import dashboardAdminGral from './component/adminGeneral/dahboardAdminG'
import navbarAdminGral from '../src/component/adminGeneral/navbarDashboard'
import signupAdmin from './component/adminGeneral/signupAdmin'
import validation from '../src/component/adminGeneral/validation'



import LoginAdmin from './component/administradores/loginAdmin'
import TablasAdmin from './component/administradores/tablasAdmin'
import dasboardAdmin from './component/administradores/dashboardAdmin'
import LoginClientes from './component/clientes/LoginClientes'
import RegistrarClientes from './component/administradores/registrarClientes'
import checkToken  from '../src/component/resolvers/checkToken'
import checkTokenVentasAlfa from '../src/component/resolvers/checkTokenVentasAlfa'
import navbar from './component/panelVentasAlfa/NavbarDashboard'
import loginAlfa from './component/panelVentasAlfa/loginAlfa'
import dahboardAlfa from './component/panelVentasAlfa/dahboardAlfa'
import signupAdminAlfa from './component/panelVentasAlfa/signupPanelAlfa'
import signupAdminG from './component/panelVentasAlfa/signupAdminG'
import company from '../src/component/adminGeneral/empresas'
 import PageNotFound from './component/PageNotFound/PageNotFound';


class App extends Component{

render(){
  const PrivateRoute = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props)=> checkToken() === true ? <Component {...props}/> : <Redirect to="/"/>} />
      )
  // conts PrivateRoutePanelAlfa = ({component:Component,...rest})=>(
  //   <Route {...rest  } render={(props)=> checkTokenVentasAlfa() === true ? <Component {...props}/> : <Redirect to="/"/>} />
  // )  
  return(

    <Router>
    <Switch>
    <main>
        
        <Route exact path = "/loginClientes" component ={LoginClientes}/> 
        <PrivateRoute exact path = "/registrarClientes" component ={RegistrarClientes}/>         
        <Route exact path= "/loginAdmin" component= {LoginAdmin}/>
        <PrivateRoute exact path= "/signupadmin" component= {signupAdmin}/>
        <PrivateRoute exact path= "/dasboardAdmin" component= {dasboardAdmin}/>
        <Route exact path= "/" component= {LoginAdminG}/>
        <PrivateRoute exact path= "/tablasAdmin" component={TablasAdmin}/> 
        
        <PrivateRoute exact path = "/dashbordAdminGral" component={dashboardAdminGral}/>
        <PrivateRoute exact path = "/navbarAdminGral" component={navbarAdminGral}/>
        <PrivateRoute exact path = "/companyAdminGral" component={company}/>

        <Route exact path = "/loginAlfa" component={loginAlfa}/>
        <Route exact path = "/dahboardAlfa" component={dahboardAlfa}/>
         <PrivateRoute exact path = "/navbar" component={navbar}/> 
        <PrivateRoute exact path = "/signupAdminG" component={signupAdminG}/>
        <PrivateRoute exact path = "/signupAdminAlfa" component={signupAdminAlfa}/>
   
        <Route component={PageNotFound}/> 




        
    </main>
       </Switch>          
       </Router>
  )
}
}
export default App