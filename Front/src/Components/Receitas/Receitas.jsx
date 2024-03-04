import React, { useContext } from 'react'
import styles from './Receitas.module.css'
import { userContext } from '../../UserContext'

const Receitas = () => {
  const {login, userLogout} = useContext(userContext)

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  return (
    <div>
      Receitas
    </div>
  )
}

export default Receitas
