import React from 'react'
import './Prompt.css'

const PromptCliente = ({setModalComponent, setValue}) => {

  function handleTeste() {
    setValue(2)
    setModalComponent(null)
  }

  return (
    <div onClick={handleTeste} className='container'>
      <p>Lista de clientes</p>
    </div>
  )
}

export default PromptCliente
