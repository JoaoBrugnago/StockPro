import React from 'react'
import styles from './Button.module.css'

const Button = ({children, minWidth}) => {
  return (
    <button style={{minWidth: minWidth}} className={styles.button}>
      {children}
    </button>
  )
}

export default Button
