
import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'
import './App.css';
import checkTokenAdministradorAlfa  from '../src/components/resolvers/checkTokenAdministradorAlfa'
import checkTokenEmpresas from '../src/components/resolvers/checkTokenEmpresas'

// import signupAdminAlfa from './components/administradorAlfa/signupAdmin'
import loginAdmin from './components/administradorAlfa/login'
import dashboardAlfa from './components/administradorAlfa/dashboard'
import tablaClientes from './components/administradorAlfa/tablaClientes'
import eventosEvenbrite from './components/administradorAlfa/eventosEvenbrite'
import tablaCotizaciones from './components/administradorAlfa/TablaCotizaciones'

// import ModalPrueba from './components/administradorAlfa/registrarCliente'

import RegistrarEmpresa from './components/empresas/signupEmpresa'
import LoginEmpresa from './components/empresas/loginEmpresa'


import loginAdministrador  from './components/administrador/loginadministrador'
import registrarAdministrador from './components/administrador/registraAdminsitrador'

import Dashboard from './components/paneldeConection/dashboard'



import sidenavbar from './components/administradorAlfa/sidenavbar'


import index from './components/depuracionBasa/index'
import Agregar from './components/paneldeConection/botonAgregar'


import cliente from './components/administradorAlfa/signupClientes'


class App extends Component{

render(){
  const PrivateRouteAdminAlfa = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props) => checkTokenAdministradorAlfa() === true ? <Component {...props}/> : <Redirect to="/"/>}/>
      )
  const PrivateRoute = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props) => checkTokenEmpresas() === true ? <Component {...props}/> : <Redirect to="/loginEmpresa"/>}/>
      )

  return(
    <Router>
    <Switch>
      <main>

      {/* <PrivateRouteAdminAlfa exact path= "/dasboardAdmin" component= {dasboardAdmin}/> */}
      <Route  exact path = "/boton" component={Agregar}/>
      


        <Route  exact path = "/" component={loginAdmin}/>
        <PrivateRouteAdminAlfa exact path = "/dashboardAlfa" component={dashboardAlfa}/>
        <PrivateRouteAdminAlfa exact path = "/tablaClientes" component={tablaClientes}/>
        <PrivateRouteAdminAlfa  exact path = "/sidenavbar" component={sidenavbar}/>
        <PrivateRouteAdminAlfa exact path = "/TablaEventos" component={eventosEvenbrite}/>
        <PrivateRouteAdminAlfa exact path = "/TablaCotizaciones" component={tablaCotizaciones}/>
        
        <Route  exact path = "/Dashboard" component={Dashboard}/>
        
         <Route exact path = "/loginEmpresa" component={LoginEmpresa}/>
      
         <Route  exact path = "/RegistrarEmpresa" component={RegistrarEmpresa}/>

         

         <Route exact path = "/loginAdministrador" component={loginAdministrador}/>
         <Route exact path = "/registrarAdministrador" component={registrarAdministrador}/>

         <Route exact path = "/index" component={index}/>

         <Route exact path = "/cliente" component={cliente}/>
         {/* <PrivateRoute  exact path = "/Dashboard" component={Dashboard}/> */}

         


         {/* <Route  exact path = "/" component={loginAdmin}/>
         <Route exact path= "/signup" component= {signupAdminAlfa}/>
         <Route exact path= "/dashboard" component= {dashboard}/>
         <Route exact path= "/tablaClientes" component= {tablaClientes}/> */}
         
      </main>  
       </Switch>          
       </Router>
  )
}
}
export default App