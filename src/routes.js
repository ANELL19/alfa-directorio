import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';
import LoginAdminG from './component/adminGeneral/loginadminG'
import dashboardAdminGral from './component/adminGeneral/dahboardAdminG'
import navbarAdminGral from '../src/component/adminGeneral/navbarDashboard'
import signupAdmin from './component/adminGeneral/signupAdmin'
import validation from '../src/component/adminGeneral/validation'
import checkTokenAdmin from '../src/component/resolvers/checkTokenAdmin'


import LoginAdmin from './component/administradores/loginAdmin'
import TablasAdmin from './component/administradores/tablasAdmin'
import dasboardAdmin from './component/administradores/dashboardAdmin'
import LoginClientes from './component/clientes/LoginClientes'
import RegistrarClientes from './component/administradores/registrarClientes'
import checkToken  from '../src/component/resolvers/checkToken'
import checkTokenAlfa from '../src/component/resolvers/checkTokenVentasAlfa'
import navbarAdmin from './component/administradores/NavbarAdmin'
import navbarAlfa from './component/panelVentasAlfa/NavbarDashboard'
import loginAlfa from './component/panelVentasAlfa/loginAlfa'
import dahboardAlfa from './component/panelVentasAlfa/dahboardAlfa'
import signupAdminAlfa from './component/panelVentasAlfa/signupPanelAlfa'
import signupAdminG from './component/panelVentasAlfa/signupAdminG'
import company from '../src/component/adminGeneral/empresas'
 import PageNotFound from './component/PageNotFound/PageNotFound';
import modalLoginAdmin from './component/adminGeneral/modal'

class App extends Component{

render(){
  const PrivateRouteAdmin = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props) => checkTokenAdmin() === true ? <Component {...props}/> : <Redirect to="/loginAdmin"/>}/>
      )

  const PrivateRoute = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props)=> checkToken() === true ? <Component {...props}/> : <Redirect to="/"/>} />
      )

  // const PrivateRouteAlfa = ({component:Component,...rest})=>(
  //   <Route {...rest  } render={(props)=> (checkTokenAlfa() === true ? <Component {...props}/> : <Redirect to="/Alfa"/>)}/>
  // )  
  return(

    <Router>
    <Switch>
    <main>
        <PrivateRouteAdmin exact path= "/navbarAdmin " component={navbarAdmin }/>
        <PrivateRouteAdmin exact path = "/registrarClientes" component ={RegistrarClientes}/>         
        <Route exact path= "/loginAdmin" component= {LoginAdmin}/>
        <PrivateRouteAdmin exact path= "/dasboardAdmin" component= {dasboardAdmin}/>
        <PrivateRouteAdmin exact path= "/tablasAdmin" component={TablasAdmin}/> 
        
        <PrivateRoute exact path = "/dashbordAdminGral" component={dashboardAdminGral}/>
        <PrivateRoute exact path = "/navbarAdminGral" component={navbarAdminGral}/>
        <PrivateRoute exact path = "/companyAdminGral" component={company}/>
        <PrivateRoute exact path = "/modalLoginAdmin" component={modalLoginAdmin}/>
        <PrivateRoute exact path= "/signupadmin" component= {signupAdmin}/>
        <Route exact path= "/" component= {LoginAdminG}/>

        
        <Route exact path = "/loginAlfa" component={loginAlfa}/>
        <Route exact path = "/dahboardAlfa" component={dahboardAlfa}/>
         <PrivateRoute exact path = "/navbarAlfa" component={navbarAlfa}/> 
        <PrivateRoute exact path = "/signupAdminG" component={signupAdminG}/>
        <Route exact path = "/signupAdminAlfa" component={signupAdminAlfa}/>
        <Route component={PageNotFound}/> 

        <Route exact path = "/loginClientes" component ={LoginClientes}/> 

        
    </main>
       </Switch>          
       </Router>
  )
}
}
export default App