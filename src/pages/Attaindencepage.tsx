import axios from 'axios'
import React, { useState } from 'react'

const Attaindencepage = () => {

    const[field,setfield]=useState("")


const markattaindence=async()=>{
    if(!field){
        return alert("Fill the email")
    }
    try{
        const res= await axios.patch("http://localhost:3000/apis/status",{email:field})
        if(res.data.success){
            return alert("You are marked present")
        }
        return alert("Failed to mark attaindence")
    }catch(err){
        return alert("attaindence api failed")
    }
}
   


  return (
    <div className='page-wrapper'>

<header className='brand-header'>
<div className='brand-title'>Run Club</div>
</header>
<main className='parentdiv'>

<div className='heading'>
        <h1>Mark Attaindence</h1>
    </div>
    <div className='form-body'>
      <input type="text" placeholder='Email' className='fields'  value={field} onChange={(e)=>setfield(()=>e.target.value)} />
      <div className='buttondiv'>
    <button  className='btn-primary-orange' onClick={markattaindence} >Mark Present</button>
    </div>
      </div>
      </main>
    </div>
  )
}

export default Attaindencepage
