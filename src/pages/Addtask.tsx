import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../Tokenhandelling'
import { useNavigate } from 'react-router-dom'

const Addtask = () => {
    const[field,setfield]=useState({title:"",description:"",eventdate:""})
    const {setaccess,getaccess}=useContext(Authcontext)
    const token=getaccess()
    const[loading,setloading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        const refreshfilter=async()=>{
            try{
            const res=await axios.post("http://localhost:3000/apis/refresh",{},{withCredentials:true})
            if(res.data.success){
               return  setaccess(res.data.access)
              
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
    



const authcheck=async(activetoken:string)=>{
   
    try{
    const authres=await axios.post("http://localhost:3000/apis/auth",{},{headers:{Authorization:`Bearer ${activetoken}`}})
    if(authres.data.success){
      
     return   alert("Welcome Admin")
    }else{
       
         alert("No authorization")
         return   navigate("/home")
    }
}catch(err){
    console.log(err)
     alert("No authorization");
    return   navigate("/home")
}
}

const activetoken=getaccess()
console.log("active",activetoken)
useEffect(()=>{
    console.log("running")
if(activetoken){
authcheck(activetoken)
}
},[activetoken])




    const addtask=async()=>{
        try{
            const res=await axios.post("http://localhost:3000/apis/task",field,{headers:{Authorization:`Bearer ${token}`}})
            if(res.data.success){
                 alert("Task added")
                 setfield({title:"",description:"",eventdate:""})
                return
            }else{
                return alert("add task api failed")
            }
        }catch(err){
          return  alert("Add task failed")
        }
    }


    const handlefield=(e)=>{
        setfield({
            ...field,[e.target.name]:e.target.value
        })
        }
  return (
    <div className='parentdiv'>

    <div className='heading'>
        <h1>Add Event</h1>
    </div>
    
    <div>
    <input type="text" placeholder='Title' name='title' value={field.title} onChange={handlefield} className='fields'/>
    <textarea  placeholder='Description' name='description' value={field.description} onChange={handlefield} className='fields' />
   <input type="date"  name='eventdate' value={field.eventdate} onChange={handlefield} className='fields'/>
    <div className='buttondiv'>
    <button onClick={addtask}>Add task</button>
    </div>
    </div>
    
        </div>
  )
}

export default Addtask
