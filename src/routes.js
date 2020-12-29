import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';
import Login from './component/login/login'
import Home from './component/home/home'
import Signup from './component/signup/signup';
import Registrar from './component/registraEmpresa/registrarEmpresa'
import Prueba from './component/signup/prueba'
//import Error from './component/error404/NotFound'
import Table from './component/table/table'

import LoginAdmin from './component/LoginAdmin/LoginAdmin'
import RegistrarAdmin from './component/RegistrarAdmin/RegistrarAdmin'
import home_admin from './component/home-admin/home-admin'


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
       {/* <Route exact path = "/" component={Home}/>  */}
        <Route exact path = "/" component ={Login}/>             
        <Route exact path ="/signup" component ={Signup}/> 
        <Route exact path = "/prueba" component ={Prueba}/> 
        <Route exact path = "/home" component ={Home}/> 
        <Route exact path = "/registrar" component ={Registrar}/>
        <Route exact path = "/table" component ={Table}/>   
        <Route exact path= "/loginadmin" component= {LoginAdmin}/>
        <Route exact path= "/registraradmin" component= {RegistrarAdmin}/>
        <PrivateRoute exact path= "/home_admin" component= {home_admin}/>
       

        {/* <PrivateRoute exact path ="/profile" component ={Profile}/> 
        */}
        

      
       </main>
       </Switch>          
       </Router>
  )
}
}
export default App