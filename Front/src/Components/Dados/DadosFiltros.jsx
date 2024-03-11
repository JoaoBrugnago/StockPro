import React from 'react'
import styles from './DadosFiltros.module.css'
import Head from '../Helper/Head'

const DadosFiltros = ({filtros}) => {
  const [tempFiltros, setTempFiltros] = React.useState({})

  React.useEffect(() => {
    filtros.forEach((item) => {
      setTempFiltros(tempFiltros => ({...tempFiltros, [item.name]: item.value}))
    })
  }, [filtros])

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      filtros.forEach((item) => {
        item.setValue(tempFiltros[item.name])
      })
    }
  }

  function handleChange(target, name) {
    const {value} = target
    setTempFiltros(tempFiltros => {
      const estadosAtuais = {...tempFiltros};
      estadosAtuais[name] = value;
      return estadosAtuais;
    })
  }

  return (
    <div className={styles.container}>
      <Head title='Dados' description='Dados de vendas do sistema stockpro'/>
      {filtros.map((item) => <div key={item.name}>
        <label htmlFor={item.name}>{item.label}</label>
        <input 
          name={item.name} 
          id={item.name} 
          type={item.type}
          value={tempFiltros[item.name]}
          onChange={({target}) => handleChange(target, item.name)}
          onKeyPress={handleKeyPress} />
      </div>)}
    </div>
  )
}

export default DadosFiltros
