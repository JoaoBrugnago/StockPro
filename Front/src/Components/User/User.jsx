import React from 'react'
import styles from './User.module.css'
import Button from '../Form/Button'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import useFetch from '../../Hooks/useFetch'
import { TOKEN_VALIDATE } from '../../Api'

const User = () => {
  const { request, loading, error } = useFetch();

  React.useEffect( async() => {
    const token = window.localStorage.getItem('token')
    const {url, options} = TOKEN_VALIDATE(token)
    const {json} = await request(url, options)
    console.log(json)
  }, [])

  return (
    <section className={styles.section}>
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
