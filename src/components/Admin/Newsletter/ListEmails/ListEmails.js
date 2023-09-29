import React, { useState, useEffect } from 'react'
import {Newsletter} from '../../../../api/newsletter'
import {useAuth} from '../../../../hooks'


const newsletterController =  new Newsletter();

export const ListEmails = () => {
  const [emails, setEmails] = useState(null);

  const {accessToken} = useAuth();
  
  useEffect(() => {
    ( async () =>{
      try{
        const response = await newsletterController.getEmails( accessToken);
        setEmails(response.payload.docs);

      } catch( error ) {
        console.error( error )
      }
    })()
  }, [])
  

  return (
    <div>Desde ListEmails</div>
  )
}
