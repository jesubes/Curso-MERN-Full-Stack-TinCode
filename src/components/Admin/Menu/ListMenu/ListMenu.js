import React, {useState, useEffect} from 'react'
import { Menu } from '../../../../api'
import { size, map  } from 'lodash';
import { Loader } from 'semantic-ui-react';
import { MenuItem } from '../MenuItem'


const menuController = new Menu();

export const ListMenu = ( props ) => {
  const { active, reload, onReload } = props;

  const [menus, setMenus] = useState(null)


  useEffect(() => {
    ( async() =>{
      try{
        setMenus(null) // limpiar los datos calientes
        const response = await menuController.getMenu(active) //trea todos los menu activos/inactivos
        setMenus(response.payload)
        console.log(response.payload);

      }catch( error ){
        console.error( error )
      }
    }

    )()
  }, [ active, reload ]);
  
  if( !menus ) return <Loader active inline= 'centered' />
  if( size(menus) === 0 ) return <h3>No hay Ningun Menu...</h3>

  return map( menus, (menu)=> 
    <MenuItem key={menu._id} menu={menu} onReload={onReload}/>
  )
}
