import React from 'react'
import Logo from '../assets/logo.svg'
import { SlArrowLeftCircle } from "react-icons/sl";
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = ({title}) => {

  function handleClick() {
    window.history.back()
  }

  return (
    <div className={styles.container}>
      <SlArrowLeftCircle onClick={handleClick} size={25} />
      <div className={styles.conteudo}>
        <p className={styles.title}>{title}</p>
        <Link to='/conta'><img src={Logo} alt="Stockpro" width={100}/></Link>
      </div>
    </div>
  )
}

export default Header
