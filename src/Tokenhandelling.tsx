import {createContext, useRef } from "react";

export const Authcontext=createContext(null);

export const Authprovider=({children})=>{
const tokencontainer=useRef(null)



const setaccess=(token:string)=>{
    tokencontainer.current=token
}

const getaccess=()=>{
    return tokencontainer.current
}

const clearaccess=()=>{
    tokencontainer.current=""
}

return(
    <Authcontext.Provider value={{getaccess,setaccess,clearaccess}}>{children}</Authcontext.Provider>
    
    )

}

