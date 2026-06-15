import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../Tokenhandelling'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const[loading,setloading]=useState(true)
    const{setaccess,getaccess}=useContext(Authcontext)
    const[events,setevents]=useState([])
    const navigate=useNavigate()
    const token=getaccess()


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


const activetoken=getaccess()
useEffect(()=>{
if(activetoken){
    getevents(activetoken)
}
},[activetoken])



const getevents=async(activetoken)=>{
    try{
        const res=await axios.get("http://localhost:3000/apis/getevents",{headers:{Authorization:`Bearer ${activetoken}`}})
        if(res.data.success){
             return setevents(res.data.res)
        }
        return alert("no event got from the backend")
    }catch(err){
        return alert("get event api failed")
    }
}


const navigateformfilling=()=>{
  return  navigate("/form")
}



  return (
    <div>
     {loading ? <h1>Loading......</h1> : token}


<div>
    {events && events.length > 0 ? events.map((i,key)=>(
<div key={key}>
    {i.title} <br />
    {i.description} <br />
    {i.eventdata}
    <button onClick={navigateformfilling}>Register Slot</button>
</div>
    )) : <p>No Event</p>}
</div>


    </div>
  )
}

export default Home
