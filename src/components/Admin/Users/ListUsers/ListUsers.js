import React, { useState, useEffect } from 'react'
import { User } from '../../../../api'
import { useAuth } from '../../../../hooks'
import { Loader } from 'semantic-ui-react'
import { size, map } from 'lodash'
import { UserItem } from '../UserItem'

const userController = new User();

export const ListUsers = ( props) => {
  const { usersActive, reload, onReload } = props;
  const { accessToken } = useAuth();

  const [users, setUsers] = useState(null);

  useEffect(()=>{
    (async ()=> {
      try{
        setUsers(null)
        const response = await userController.getUsers( accessToken, usersActive)
        
        setUsers( response )
 
      } catch(error){
        console.error(error  );
      }
    })()
  },[ usersActive, reload  ])

  if(!users ) return <Loader active inline='centered' />
  if(size(users) === 0 ) return 'No hay ningun usuario!!!'

  return map( users, (user) => <UserItem key={user._id} user= {user} onReload= {onReload}/>)
}
