import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../Tokenhandelling'

const Form = () => {
    const[field,setfield]=useState({name:"",email:"",phone:"",condition:false})
    const {setaccess,getaccess}=useContext(Authcontext)
    const token=getaccess()
    const[loading,setloading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        const refreshfilter=async()=>{
            try{
            const res=await axios.post("http://localhost:3000/apis/refresh",{},{withCredentials:true})
            if(res.data.success){
                return setaccess(res.data.access)
            }else{
                alert(res.data.message)
              return  navigate("/")
            }
            }catch(err){
                alert("refresh filter failed")
                return  navigate("/")
            }finally{
                setloading(false)
            }
        }
        if(!getaccess()){
            refreshfilter()
        }else{
            setloading(false)
        }
    
    },[])

    

    const handleformfilling=async()=>{
if(!field.name || !field.email || !field.phone){
    return alert("fill all the fields")
}
if(field.condition === false){
    return alert("Accept our condition")
}
try{
const res=await axios.post("http://localhost:3000/apis/form",field,{headers:{Authorization:`Bearer ${token}`}})

if(res.data.success){
    alert("You are registered")
    return navigate("/home")
}else{
    return alert("form filling failed")
}
}catch(err){
return alert("Form filling failed")
}
    }



    const handlefield=(e)=>{
        const{name,value,checked,type}=e.target;
        setfield({
            ...field,[name]:type === "checkbox" ? checked:value
        })
        }




  return (
    <div className='page-wrapper'>
        <header className='brand-header'>
<div className='brand-title'>Run Club</div>
</header>
<main className='parentdiv'>
    <div className='heading'>
        <h1>Event form</h1>
    </div>
    
    <div className='form-body'>
    <input type="text" placeholder='Name' name='name' value={field.name} onChange={handlefield} className='fields'/>
    <input type="text" placeholder='Email' name='email' value={field.email} onChange={handlefield} className='fields' />
    <input type="text" placeholder='Phone.No' name='phone' value={field.phone} onChange={handlefield} className='fields' />
    <div className='checkbox-container'>
    <input type="checkbox" name='condition' id='condition' checked={field.condition} onChange={handlefield}  />
    <label htmlFor="condition" className='condition'>I conforms that i am fit to participate in this event and all the responsibilities of this participation is on me</label>
    </div>
    <div className='buttondiv'>
    <button onClick={handleformfilling} className='btn-primary-orange' >Register Slot</button>
    </div>
    </div>
    </main>
        </div>
  )
}

export default Form
