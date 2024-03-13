import React from 'react'
import styles from './Button.module.css'

const Button = ({children, minWidth, marginTop}) => {
  return (
    <button style={{minWidth: minWidth, marginTop: marginTop}} className={styles.button}>
      {children}
    </button>
  )
}

export default Button
