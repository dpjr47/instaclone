import React,{useEffect,createContext, useReducer, useContext} from 'react';
import './App.css';
import NavBar from './components/Navbar';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Sigin'
import Signup from './components/screens/Signup'
import Profile from './components/screens/profile'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducer/userReducer'

export const UserContext = createContext()

const Routing =  () =>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/sigin')
    }
  },[])
  return(
    <Switch>
          <Route exact path='/'>
      <Home />
    </Route>

    <Route path='/sigin'>
      <Signin />
    </Route>

    <Route path='/signup'>
      <Signup />
    </Route>

    <Route path='/Profile'>
      <Profile />
    </Route>

    <Route path='/Create'>
      <CreatePost />
    </Route>
    
    </Switch>
    
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing  />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
