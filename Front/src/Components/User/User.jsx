import React, { useContext } from 'react'
import styles from './User.module.css'
import Button from '../Form/Button'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { userContext } from '../../UserContext'

const User = () => {
  const {login, userLogout} = useContext(userContext)

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  return (
    <section className={`${styles.section} animeLeft`}>
        <img src={Logo} alt="Stockpro" />
        <div className={styles.links}>
          <Link to='/vendas'><Button minWidth='10rem'>Vendas</Button></Link>
          <Link to='/compras'><Button minWidth='10rem'>Compras</Button></Link>
          <Link to='/receitas'><Button minWidth='10rem'>Receitas</Button></Link>
        </div>
    </section>
  )
}

export default User
