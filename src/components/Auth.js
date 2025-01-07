import React, {useEffect, useState, createContext} from "react";
import { supabase } from "../supabase/cliente"

export const AuthContext =createContext()

export const AuthProvider =({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(() =>{
        supabase.auth.onAuthStateChange((event, session) => {
            setCurrentUser(session)
            setPending(false)
         
        })
    },[] 
    )

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}