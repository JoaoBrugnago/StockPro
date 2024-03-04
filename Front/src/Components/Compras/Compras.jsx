import React, { useContext } from 'react'
import styles from './Compras.module.css'
import { userContext } from '../../UserContext'

const Compras = () => {
  const {login, userLogout} = useContext(userContext)

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  return (
    <div>
      Compras
    </div>
  )
}

export default Compras
