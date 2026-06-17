import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../Tokenhandelling'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const[loading,setloading]=useState(true)
    const{setaccess,getaccess}=useContext(Authcontext)
    const[events,setevents]=useState([])
    const[count,setcount]=useState()
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
    getmembercount(activetoken)
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


const getmembercount=async(activetoken:string)=>{
try{
  const res=await axios.get("http://localhost:3000/apis/count",{headers:{Authorization:`Bearer ${activetoken}`}})
  if(res.data.success){
    return setcount(res.data.finalcount.maxcount)
  }
  return alert("members count failed")
}catch(err){
  return alert("count failed")
}
}




  return (
    <div className="parentdiv home-wrapper">
    <div className="heading">
<h1>Upcomming Event</h1>
    </div>


{/* <div>
    {events && events.length > 0 ? events.map((i,key)=>(
<div key={key} >
    {i.title} <br />
    {i.description} <br />
    {i.eventdata}
    <button onClick={navigateformfilling}>Register Slot</button>
</div>
    )) : <p>No Event</p>}
</div> */}

{loading ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Loading events...</p>
      ) : (
        <div className="event-list">
          {events && events.length > 0 ? (
            events.map((i, key) => (
              // Each event gets its own mini glass card
              <div className="event-card" key={key}>
                <div className="event-info">
                  <h2>{i.title}</h2>
                  <p className="event-desc">{i.description}</p>
                  <span className="event-date">📅 {i.eventdata}</span>
                  <h3 className='count'>Registered user :- {count ? count : 0}/50</h3>
                </div>
                
                <div className="buttondiv">
                  <button onClick={navigateformfilling}>Register Slot</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'white', textAlign: 'center' }}>No events scheduled right now. Time to rest!</p>
          )}
        </div>
      )}


    </div>
  )
}

export default Home
