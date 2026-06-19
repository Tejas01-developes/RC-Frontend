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

const newaccountnavigate=()=>{
    return navigate("/register")
}




    const handlefield=(e)=>{
        setfield({
            ...field,[e.target.name]:e.target.value
        })
        }
  return (
 <div className='page-wrapper'>

<header className='brand-header'>
<div className='brand-title'>Run Club</div>
</header>
<main className='parentdiv'>
    <div className='heading'>
        <h1>Login Member</h1>
    </div>
    
    <div className='form-body'>
    <input type="text" placeholder='Email' name='email' value={field.email} onChange={handlefield} className='fields' />
    <input type="password" placeholder='Password' name='password' value={field.password} onChange={handlefield} className='fields' />
    <div className='buttondiv'>
    <button onClick={loginuser} >Login</button>
    <button onClick={newaccountnavigate}>New Account</button>
    </div>
    </div>
    </main>
        </div>
  )
}

export default Login
