import React, { useContext, useEffect } from 'react'
import LandingPage from '../components/LandingPage'
import UserPanel from '../components/UserPanel'
import { AuthContext } from '../components/Auth'

const Home =() => {
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
		document.title = 'A la carta QR - home'
	}, [])

   if(currentUser) {
    return <UserPanel/>
   }

    return <div>
        <LandingPage/>
    </div> 
    
}
export default Home