import React from 'react'
import styles from './PromptCliente.module.css'

const PromptCliente = ({setModalComponent}) => {

  function handleTeste() {
    setModalComponent(null)
  }

  return (
    <div onClick={handleTeste} className={styles.container}>
      <p>Lista de clientes</p>
    </div>
  )
}

export default PromptCliente
