import React,{useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    if(! state){
      return [
        <li><Link to="/Sigin">Login</Link></li>,
        <li><Link to="/Signup">Signup</Link></li>,
        
        
      ]
    }else{
      return [
        <li><a href='/'><img src='home.png' className="nav-img" alt="home" /></a></li>,
        <li><a href='/Profile'><img src='profile-user.png' className="nav-img" alt="profile" /></a></li>,
        <li><a href='/Create'><img src='createpost.png' className="nav-img" alt="create post" /></a></li>,
        <li>
          <a onClick = {()=>{
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push('/Sigin')
                    }}>
                      <img src='logout.png' className="nav-img" alt="logout" />
                      </a>
        </li>
      ]
    }
  }

    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/Sigin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar