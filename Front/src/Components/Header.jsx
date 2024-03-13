import React from 'react'
import Logo from '../assets/logo.svg'
import { SlArrowLeftCircle } from "react-icons/sl";
import styles from './Header.module.css'

const Header = () => {

  function handleClick() {
    window.history.back()
  }

  return (
    <div className={styles.container}>
      <SlArrowLeftCircle onClick={handleClick} size={25} />
      <img src={Logo} alt="Stockpro" width={100}/>
    </div>
  )
}

export default Header
