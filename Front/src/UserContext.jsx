import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TOKEN_VALIDATE } from './Api';

export const userContext = React.createContext()

export const UserStorage = ({children}) => {
  const [login, setLogin] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/')
    },[]);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      if (token) {
        try {
          const {url, options} = TOKEN_VALIDATE(token)
          const response = await fetch(url, options)
          const json = await response.json()
          if (json.valido === true) {
            setLogin(true)
            navigate('/conta')
          } else {
            userLogout()
          }
        } catch (e) {
          userLogout()
        }
      } else {
        setLogin(false)
      }
    }
    autoLogin()
  }, [userLogout])

  return (
    <userContext.Provider value={{login, setLogin, userLogout}}>
      {children}
    </userContext.Provider>
  )
}
