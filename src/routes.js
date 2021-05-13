// import React,{Component} from 'react';
// import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

// import './App.css';
// import index from './component/PageNotFound/depuracionbd'

// import checkTokenAdmin from '../src/component/resolvers/checkTokenAdmin'
// import checkToken  from '../src/component/resolvers/checkToken'
// import checkTokenAlfa from '../src/component/resolvers/checkTokenVentasAlfa'
// import checkTokenClient from '../src/component/resolvers/checkTokenclient'
// import checkTokenSigPanelAlfa from '../src/component/resolvers/checkTokenSigPanelAlfa'

// import LoginAdminG from './component/adminGeneral/loginadminG'
// import dashboardAdminGral from './component/adminGeneral/dahboardAdminG'
// import navbarAdminGral from '../src/component/adminGeneral/navbarDashboard'
// import signupAdmin from './component/adminGeneral/signupAdmin'


// import LoginAdmin from './component/administradores/loginAdmin'
// import TablasAdmin from './component/administradores/tablasAdmin'
// import dasboardAdmin from './component/administradores/dashboardAdmin'
// import LoginClientes from './component/clientes/LoginClientes'
// import RegistrarClientes from './component/administradores/registrarClientes'
// import navbarAdmin from './component/administradores/NavbarAdmin'
// import Navbar from './component/panelVentasAlfa/navbar'

// import loginAlfa from './component/panelVentasAlfa/loginAlfa'
// import dahboardAlfa from './component/panelVentasAlfa/dahboardAlfa'
// import signupAdminAlfa from './component/panelVentasAlfa/signupPanelAlfa'
// import signupAdminG from './component/panelVentasAlfa/signupAdminG'
// import company from '../src/component/adminGeneral/empresas'
// import cotizaciones from './component/panelVentasAlfa/cotizaciones'


// import EnlaceDashboard from './component/enlace/Dashboard'

// import Modal from './component/panelVentasAlfa/modal'

// class App extends Component{

// render(){
//   const PrivateRouteAdmin = ({component:Component,...rest})=>(
//     <Route {...rest  } render={(props) => checkTokenAdmin() === true ? <Component {...props}/> : <Redirect to="/loginAdmin"/>}/>
//       )

//   const PrivateRoute = ({component:Component,...rest})=>(
//     <Route {...rest  } render={(props)=> checkToken() === true ? <Component {...props}/> : <Redirect to="/loginAdminG"/>} />
//       )

//   const PrivateRouteAlfa = ({component:Component,...rest})=>(
//     <Route {...rest  } render={(props)=> checkTokenAlfa() === true ? <Component {...props}/> : <Redirect to="/Alfa"/>}/>
//   )  
//   // const PrivateRouteClient = ({component:Component,...rest})=>(
//   //   <Route {...rest  } render={(props)=> checkTokenClient() === true ? <Component {...props}/> : <Redirect to="/loginClient"/>}/>
//   // ) 

//   // const PrivateRoutePanelAlfa = ({component:Component,...rest})=>(
//   //   <Route {...rest  } render={(props)=> checkTokenSigPanelAlfa() === true ? <Component {...props}/> : <Redirect to= "/signupAdminAlfa" />}/>
//   // )  
 

//   return(

//     <Router>
//     <Switch>
//       <main>

//         <Route  exact path = "/index" component={index}/>

//         <Route exact path = "/loginAlfa" component={loginAlfa}/>
//         <PrivateRouteAlfa exact path = "/dahboardAlfa" component={dahboardAlfa}/>
//         <PrivateRouteAlfa exact path = "/navbar" component={Navbar}/> 
//         <PrivateRouteAlfa exact path = "/signupAdminG" component={signupAdminG}/>
      
//         <PrivateRouteAlfa exact path = "/signupAdminAlfa" component={signupAdminAlfa}/> 
//         <PrivateRouteAlfa exact path= "/cotizaciones" component={cotizaciones}/>
//         <PrivateRouteAlfa exact path= "/modal" component={Modal}/>
        
        
//         <Route  exact path= "/" component= {LoginAdminG}/> 
//         <PrivateRoute exact path = "/dashbordAdminGral" component={dashboardAdminGral}/>
//         <PrivateRoute exact path = "/navbarAdminGral" component={navbarAdminGral}/>
//         <PrivateRoute exact path = "/companyAdminGral" component={company}/>
//         <PrivateRoute exact path= "/signupadmin" component= {signupAdmin}/>
        

//         <Route exact path= "/loginAdmin" component= {LoginAdmin}/>
//         <PrivateRouteAdmin exact path= "/dasboardAdmin" component= {dasboardAdmin}/>
//         <PrivateRouteAdmin exact path= "/navbarAdmin " component={navbarAdmin }/>
//         <PrivateRouteAdmin exact path = "/registrarClientes" component ={RegistrarClientes}/>         
//         <PrivateRouteAdmin exact path= "/tablasAdmin" component={TablasAdmin}/> 

//         <Route exact path="/enlace" component={EnlaceDashboard}/>
      

       
        
        
     

//         <Route exact path = "/LoginClientes" component ={LoginClientes}/> 
//         {/* <PrivateRouteClient/> */}
//         </main>
  
//        </Switch>          
//        </Router>
//   )
// }
// }
// export default App

import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'
import './App.css';
import checkTokenAdministradorAlfa  from '../src/component/resolvers/checkTokenAdministradorAlfa'

import signupAdminAlfa from './components/administradorAlfa/signupAdmin'
import loginAdmin from './components/administradorAlfa/login'
import dashboard from './components/administradorAlfa/dashboard'
import tablaClientes from './components/administradorAlfa/tablaClientes'

class App extends Component{

render(){
  const PrivateRouteAdminAlfa = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props) => checkTokenAdministradorAlfa() === true ? <Component {...props}/> : <Redirect to="/"/>}/>
      )

  return(
    <Router>
    <Switch>
      <main>

      {/* <PrivateRouteAdminAlfa exact path= "/dasboardAdmin" component= {dasboardAdmin}/> */}

        <Route  exact path = "/" component={loginAdmin}/>
         <PrivateRouteAdminAlfa exact path= "/signup" component= {signupAdminAlfa}/>
         <PrivateRouteAdminAlfa exact path= "/dashboard" component= {dashboard}/>
         <PrivateRouteAdminAlfa exact path= "/tablaClientes" component= {tablaClientes}/>
        


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