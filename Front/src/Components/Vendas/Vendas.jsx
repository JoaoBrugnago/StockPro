import React, { useContext } from 'react'
import styles from './Vendas.module.css'
import { userContext } from '../../UserContext'

const Vendas = () => {
  const {login, userLogout} = useContext(userContext)

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  return (
    <div>
      Vendas
    </div>
  )
}

export default Vendas
