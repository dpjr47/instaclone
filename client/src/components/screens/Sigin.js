import React, {useState,useContext}  from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const Sigin = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email"})
            return
        }
        fetch("signin",{
            method:'post',
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "signedin"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h1>Instagram</h1>
                <input
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange = {(e)=>setEmail(e.target.value)}
                />
                
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange = {(e)=>setPassword(e.target.value)}

                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick = {()=>PostData()}
                >
                    Login
                </button>
                <p>
                Dont have a account? <Link to='/Signup'>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Sigin