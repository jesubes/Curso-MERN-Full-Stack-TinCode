import { ENV } from '../utils'

export class User {
  baseApi = ENV.BASE_API;

  //Trae un usuario
  async getMe( accessToken ){
    try{
      const url = `${this.baseApi}/${ ENV.API_ROUTES.USER_ME }`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`

        }
      }

      const response = await fetch(url, params)
      const result = await response.json();

      if( response.status !== 200 ) throw result;
 
      return result;
    } catch ( error ) {
      throw error;
    }
  }


  //creacion de usuarios
  async createUser( accessToken, data){
    try{
      const formData = new FormData(); // para hacer la carga de archivo con el multipar de postman 

      Object.keys( data ).forEach( (key) => { //con esto logro saco cada propiedad del objeto por separado 
        formData.append( key, data[key]);
      })

      if( data.fileAvatar ){
        formData.append('avatar', data.fileAvatar )
      }

      const url = `${ this.baseApi }/${ ENV.API_ROUTES.USER }`
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ accessToken }`
        },
        body: formData,
      }

      const response = await fetch( url, params )
      const result = await response.json()
      
      if( response.status !== 200 ) throw result; 

      return result; 
      
    } catch (error){
      throw error;
    }
  }



  //Trae todos los usuario - activos - inactivos
  async getUsers( accessToken, active= undefined ){
    try{
      const url = `${ this.baseApi }/${ ENV.API_ROUTES.USERS}?active=${ active }` 
      const params = {
        headers: {
          Authorization: `Bearer ${ accessToken }`,
        }
      }

      const response = await fetch( url, params);
      const result = await response.json()

      if(response.status !== 200 ) throw result;

      return result;
      
    } catch(error){
      throw error;
    }
  }


  //Actualizar un usuario
  async updateUser( accessToken, idUser, userData ){
    try{
      const data = userData;
      if( !data.password ) delete data.password

      const formData = new FormData(); // para hacer la carga de archivo con el multipar de postman 

      Object.keys( data ).forEach( (key) => { //con esto logro saco cada propiedad del objeto por separado 
        formData.append( key, data[key]);
      })

      if( data.fileAvatar ){
        formData.append('avatar', data.fileAvatar )
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
      const params = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if(response.status !== 200 ) throw result;

      return result  

    } catch ( error ){
      throw error;
    }
  }

  

  //eliminar usuario
  async deleteUser( accessToken, idUser ){
    try{
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${idUser}`
      const params = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${ accessToken }`
        }
      }

      const response = await fetch( url, params )
      const result = await response.json();

      if( response.status !== 200 ) throw result;

      return result;

    } catch ( error ){
      throw error;
    }
  }

  

}