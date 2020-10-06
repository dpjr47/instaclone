import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const SignIn = () => {
    const history = useHistory()
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email"})
            return
        }
        fetch("signup",{
            method:'post',
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html: data.message})
                history.push('./sigin')
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
                    placeholder='name'
                    value={name}
                    onChange = {(e)=>setName(e.target.value)}

                />
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
                    onClick={()=> PostData()}
                >
                    Siginup
                </button>
                <p>
                Already have a account? <Link to='/sigin'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn