import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'

import './App.css';
import Login from './component/login/login'
import Home from './component/home/home'
import Signup from './component/signup/signup';
//import Error from './component/error404/NotFound'


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
         <PrivateRoute exact path = "/home" component ={Home}/>  
        <Route exact path ="/signup" component ={Signup}/> 
        

        {/* <PrivateRoute exact path ="/profile" component ={Profile}/> 
        */}
        

      
       </main>
       </Switch>          
       </Router>
  )
}
}
export default App