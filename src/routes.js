
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
import navbar from './components/administradorAlfa/navbar'
// import ModalPrueba from './components/administradorAlfa/registrarCliente'

import RegistrarEmpresa from './components/empresas/signupEmpresa'
import LoginEmpresa from './components/empresas/loginEmpresa'


import loginAdministrador  from './components/administrador/loginadministrador'
import registrarAdministrador from './components/administrador/registraAdminsitrador'

import Dashboard from './components/paneldeConection/dashboard'



import sidenavbar from './components/administradorAlfa/sidenavbar'
class App extends Component{

render(){
  const PrivateRouteAdminAlfa = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props) => checkTokenAdministradorAlfa() === true ? <Component {...props}/> : <Redirect to="/"/>}/>
      )
  // const PrivateRoute = ({component:Component,...rest})=>(
  //   <Route {...rest  } render={(props) => checkTokenEmpresas() === true ? <Component {...props}/> : <Redirect to="/loginEmpresa"/>}/>
  //     )

  return(
    <Router>
    <Switch>
      <main>

      {/* <PrivateRouteAdminAlfa exact path= "/dasboardAdmin" component= {dasboardAdmin}/> */}

        <Route  exact path = "/" component={loginAdmin}/>
        <Route exact path = "/dashboardAlfa" component={dashboardAlfa}/>
        <Route exact path = "/tablaClientes" component={tablaClientes}/>
        <Route  exact path = "/sidenavbar" component={sidenavbar}/>
        <Route exact path = "/TablaEventos" component={eventosEvenbrite}/>
        
        
         <Route exact path = "/loginEmpresa" component={LoginEmpresa}/>
      
         <Route  exact path = "/RegistrarEmpresa" component={RegistrarEmpresa}/>

         
         <Route  exact path = "/navbar" component={navbar}/>

         <Route exact path = "/loginAdministrador" component={loginAdministrador}/>
         <Route exact path = "/registrarAdministrador" component={registrarAdministrador}/>

         <Route  exact path = "/Dashboard" component={Dashboard}/>


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