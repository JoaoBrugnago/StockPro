import React from 'react'
import styles from './Input.module.css'
import Error from '../Helper/Error'

const Input = ({label, type, name, value, onChange, error, onBlur}) => {
  return (
    <div className={styles.container}>
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
       placeholder='Preencha...'
      />
      {error && <Error error={error} />}
    </div>
  )
}

export default Input
