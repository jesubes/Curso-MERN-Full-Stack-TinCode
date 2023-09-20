import { ENV } from "../utils";


export class Auth {
  baseApi = ENV.BASE_API;


  //registro del usuario
  async register(data){
    try{
      const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        })
      }

      const response = await fetch( url, params)
      const result = await response.json();

      if( response.status !== 200 ) throw result;

      return result; 
      
    } catch(error){
      throw error;
    }
  }


  //login logica p/ backend
  async login( data ){ //  propiedad que llega con un email y contraseña
    try{
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( data ) //transformo en JSON para que lo pueda recibir SERVER - los mismo parametros que POSTMAN 
      }

      const response = await fetch( url, params );
      const result = await response.json();

      if( response.status !== 200 ) throw result ;

      return result;

    } catch( error ){
      throw error;
    }
  }


  //refrescar el access Token 
  async refreshAccessToken( refreshToken ){
    try{
      const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ 
          token: refreshToken,
        })
      }

      const response = await fetch( url, params );
      const result = await response.json();

      if( response.status !== 200 ) throw result;

      return result;
      
    } catch( error ){ 
      throw error;
    }
  }


  //guardar el token en local storage
  setAccessToken( token ){
    localStorage.setItem(ENV.JWT.ACCESS, token) //key: ENV.JWT.ACCESS(access) , VALOR: token
  }

  //obtener el token del localstorage
  getAccessToken(){
    return localStorage.getItem(ENV.JWT.ACCESS);
  }


  //Guardar el refresh token en localstorage
  setRefreshToken( token  ){
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }


  //Obtener el token del localstorage
  getRefreshToken(){
    return localStorage.getItem(ENV.JWT.ACCESS)
  }

  //ELIMIAR EL TOKEN Y EL REFRESH TOKEN DEL LOCALSTORAGE
  removeTokens(){
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH)
  }
}