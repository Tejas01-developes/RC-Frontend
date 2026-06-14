import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../Tokenhandelling'

const Login = () => {
    const[field,setfield]=useState({email:"",password:""})
    const navigate=useNavigate()
    const{setaccess}=useContext(Authcontext)

const loginuser=async()=>{
    if(!field.email || !field.password){
        return alert("Fill all the fields")
      }
try{
    const res=await axios.post("http://localhost:3000/apis/login",field,{withCredentials:true})
    if(res.data.success){
        alert(res.data.message)
        setaccess(res.data.access)
         navigate("/home")
         return
    }else{
    alert(res.data.message)
    }
}catch(err){
    alert("login apis failed")
}
}





    const handlefield=(e)=>{
        setfield({
            ...field,[e.target.name]:e.target.value
        })
        }
  return (
    <div>

    <div>
        <h1>Login Member</h1>
    </div>
    
    <div>
    <input type="text" placeholder='Email' name='email' value={field.email} onChange={handlefield} />
    <input type="password" placeholder='Password' name='password' value={field.password} onChange={handlefield} />
    <div>
    <button onClick={loginuser}>Login</button>
    </div>
    </div>
    
        </div>
  )
}

export default Login
