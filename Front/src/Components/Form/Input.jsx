import React from 'react'
import styles from './Input.module.css'

const Input = ({label, type, name, value, onChange, error, onBlur}) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
       className={styles.input}
       id={name}
       type={type} 
       name={name} 
       value={value}
       onChange={onChange}
       onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Input
