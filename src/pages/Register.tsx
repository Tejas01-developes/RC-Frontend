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
<input type="text" placeholder='Name' name='name' value={field.name} onChange={handlefield}/>
<input type="text" placeholder='Email' name='email' value={field.email} onChange={handlefield} />
<input type="password" placeholder='Password' name='password' value={field.password} onChange={handlefield} />
<div>
<button onClick={register}>Register</button>

</div>
</div>

    </div>
  )
}

export default Register
