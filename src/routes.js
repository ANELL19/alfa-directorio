import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';
import index from './component/PageNotFound/depuracionbd'

import checkTokenAdmin from '../src/component/resolvers/checkTokenAdmin'
import checkToken  from '../src/component/resolvers/checkToken'
import checkTokenAlfa from '../src/component/resolvers/checkTokenVentasAlfa'
import checkTokenClient from '../src/component/resolvers/checkTokenclient'

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
import navbarAdmin from './component/administradores/NavbarAdmin'
import Navbar from './component/panelVentasAlfa/navbar'
import loginAlfa from './component/panelVentasAlfa/loginAlfa'
import dahboardAlfa from './component/panelVentasAlfa/dahboardAlfa'
import signupAdminAlfa from './component/panelVentasAlfa/signupPanelAlfa'
import signupAdminG from './component/panelVentasAlfa/signupAdminG'
import company from '../src/component/adminGeneral/empresas'
import modalAlfa from './component/panelVentasAlfa/modalAlfa'
class App extends Component{

render(){
  const PrivateRouteAdmin = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props) => checkTokenAdmin() === true ? <Component {...props}/> : <Redirect to="/loginAdmin"/>}/>
      )

  const PrivateRoute = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props)=> checkToken() === true ? <Component {...props}/> : <Redirect to="/loginAdminG"/>} />
      )

  const PrivateRouteAlfa = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props)=> checkTokenAlfa() === true ? <Component {...props}/> : <Redirect to="/Alfa"/>}/>
  )  
  // const PrivateRouteClient = ({component:Component,...rest})=>(
  //   <Route {...rest  } render={(props)=> checkTokenClient() === true ? <Component {...props}/> : <Redirect to="/loginClient"/>}/>
  // )  
  return(

    <Router>
    <Switch>
      <main>

        <Route  exact path = "/index" component={index}/>

        <Route exact path = "/loginAlfa" component={loginAlfa}/>
        <PrivateRouteAlfa exact path = "/dahboardAlfa" component={dahboardAlfa}/>
        <PrivateRouteAlfa exact path = "/navbar" component={Navbar}/> 
        <PrivateRouteAlfa exact path = "/signupAdminG" component={signupAdminG}/>
        <PrivateRouteAlfa exact path = "/signupAdminAlfa" component={signupAdminAlfa}/> 
        <PrivateRouteAlfa exact path = "/modal" component={modalAlfa}/> 
       
        
        <Route  exact path= "/" component= {LoginAdminG}/> 
        <PrivateRoute exact path = "/dashbordAdminGral" component={dashboardAdminGral}/>
        <PrivateRoute exact path = "/navbarAdminGral" component={navbarAdminGral}/>
        <PrivateRoute exact path = "/companyAdminGral" component={company}/>
        <PrivateRoute exact path= "/signupadmin" component= {signupAdmin}/>
        

        <Route exact path= "/loginAdmin" component= {LoginAdmin}/>
        <PrivateRouteAdmin exact path= "/dasboardAdmin" component= {dasboardAdmin}/>
        <PrivateRouteAdmin exact path= "/navbarAdmin " component={navbarAdmin }/>
        <PrivateRouteAdmin exact path = "/registrarClientes" component ={RegistrarClientes}/>         
        <PrivateRouteAdmin exact path= "/tablasAdmin" component={TablasAdmin}/> 
        
        
     

        <Route exact path = "/LoginClientes" component ={LoginClientes}/> 
        {/* <PrivateRouteClient/> */}
        </main>
  
       </Switch>          
       </Router>
  )
}
}
export default App