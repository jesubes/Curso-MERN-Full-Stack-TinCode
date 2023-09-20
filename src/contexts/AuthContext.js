import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from '../utils'

const userController = new User;
const authController = new Auth;

export const AuthContext = createContext(); // creamos un context



export function AuthProvider( props ){  // componete que recibe los childrens
  const { children } = props;   // hijo del contexto

  const [user, setUser] = useState(null)  // para ver el estado del usuario si esta logeado o no (null para NO)

  const [token, setToken] = useState(null) //se guarda este token para poder utilizarlo en las peticiones HTTP

  const [loading, setLoading] = useState(true)



  useEffect(() => {  //sirve para comprobar si el usuario esta logeado o no
    (async() => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if( !accessToken || !refreshToken ){ //si le falta algun token vulve para logearse de nuevo
        logout();
        setLoading( false );
        return;
      }

      if( hasExpiredToken(accessToken)){ //si se vence el accessToken manda a relogin con con el refreshToken para volver a hacer un nuevo access token
        if( hasExpiredToken(refreshToken)){
          logout();
        } else{
          await reLogin( refreshToken )
        }
      } else {
        await login(accessToken);
      }

      setLoading( false )
    })();
  }, [])


  //relogeo
  const reLogin = async ( refreshToken ) =>{
    try{
      const {accessToken} = await authController.refreshAccessToken( refreshToken )
      authController.setAccessToken(accessToken); //actulalizar el accestoken (devuelve uno nuevo)
      await login(accessToken) // se logea pero con el nuevo access token
  
    } catch( error ){
      console.error( error );
    }
  }


  //login 
  const login = async ( accessToken ) =>{ //se crea una funcion que recibe el TOKEN
    try{
      const response = await userController.getMe(accessToken) // trae todos los datos del usuario de la DB - sugiere sacar 'password' para mostrar
      delete response.payload.password
      setUser( response ) //Va a dejar pasar las peticiones a otras rutas de admin
      setToken(accessToken); //ponemos el token con valor del token entregado
      
    } catch ( error ){
      console.error( error )
    }
  }

  //Deslogear
  const logout = () =>{
    setUser(null);
    setToken(null);
    authController.removeTokens();
  }


  const data = { //objeto de todo lo que queremos exportar en el context para que puedan ver los componentes hijos
    accessToken: token,
    user,
    login,
    logout,

  }
  
  if(loading) return null; // cuando loading sea true no va a mostrar las paginas de admin

  //retornamos AuthContext y le pasamos data para que los hijos puedan obtenes 'data' 
  return <AuthContext.Provider value={ data }>{ children }</AuthContext.Provider>
}