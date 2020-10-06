import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'



const Profile = () =>{
    const [mypics, setPics] = useState([])
    const[data,setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[]);

const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    return(
        <div className='profile_main_div'>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"15px 0px",
                borderBottom:'1px solid grey',
            }}>
                <div>
                    <img style = {{width:'160px', height:'160px', borderRadius:'80px', borderColor:'black'}} alt='image' 
                    src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:'flex',justifyContent:'space-between',width:'107%'}}>
                        <h6>4 post</h6>
                        <h6>12 followers</h6>
                        <h6>41 following</h6>
                    </div>
                </div>
                
            </div>
            <div className='gallery'>
                {
                    mypics.map(item =>{
                        return(
                            <div className='card profile_image'>
                                <button style={{
                                float:"right"
                            }} ><i className="material-icons" 
                            onClick={()=>deletePost(item._id)}
                            >delete</i></button>
                                <div className='card-image'>
                            <img className='item' key={item.__id} alt={item.title} src={item.photo} onClick="popImage(item.photo)" id="profileImg"  />
                            </div>
                            <div>
                            
                            <h6>{item.likes.length} Likes <i className="material-icons" style={{color:"red"}}>favorite</i></h6>
                            </div>
                            </div>
                        )
                        
                    })
                }

                
            </div>
        </div>
    )
}

export default Profile