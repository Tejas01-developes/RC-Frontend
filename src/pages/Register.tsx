import  { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
const[field,setfield]=useState({name:"",email:"",password:""})
const navigate=useNavigate()



const register=async()=>{
  if(!field.name || !field.email || !field.password){
    return alert("Fill all the fields")
  }
  try{
const res=await axios.post("http://localhost:3000/apis/register",field)
if(res.data.success){
alert("Registration successfully done")
return navigate("/")
}
alert("Registration failed")
  }catch(err){
    console.log(err)
    alert("Registration api failed")
  }
}

const loginnavigate=()=>{
return navigate("/")
}

const handlefield=(e)=>{
setfield({
    ...field,[e.target.name]:e.target.value
})
}

  return (
    <div className='parentdiv'>

<div className='heading'>
    <h1>Register Member</h1>
</div>

<div>
<input type="text" placeholder='Name' name='name' value={field.name} onChange={handlefield} className='fields'/>
<input type="text" placeholder='Email' name='email' value={field.email} onChange={handlefield} className='fields' />
<input type="password" placeholder='Password' name='password' value={field.password} onChange={handlefield} className='fields' />
</div>
<div className='buttondiv'>
<button onClick={register}>Register</button>
<button onClick={loginnavigate}>Login button</button>

</div>

    </div>
  )
}

export default Register
