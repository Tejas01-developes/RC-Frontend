import React, { useState } from 'react'

const Form = () => {
    const[field,setfield]=useState({name:"",email:"",Phoneno:""})



    const handlefield=(e)=>{
        setfield({
            ...field,[e.target.name]:e.target.value
        })
        }
  return (
    <div>

    <div>
        <h1>Event form</h1>
    </div>
    
    <div>
    <input type="text" placeholder='Name' name='name' value={field.name} onChange={handlefield}/>
    <input type="text" placeholder='Email' name='email' value={field.email} onChange={handlefield} />
    <input type="text" placeholder='Phone.No' name='Phoneno' value={field.Phoneno} onChange={handlefield} />
    <div>
    <button>Register Slot</button>
    </div>
    </div>
    
        </div>
  )
}

export default Form
