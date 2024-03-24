import React from 'react'
import styles from './DadosFiltros.module.css'

const DadosFiltros = ({filtros}) => {
  const [tempFiltros, setTempFiltros] = React.useState({})

  React.useEffect(() => {
    filtros.forEach((item) => {
      setTempFiltros(tempFiltros => ({...tempFiltros, [item.name]: item.value}))
    })
  }, [filtros])

  function aplicarFiltros() {
    filtros.forEach((item) => {
      item.setValue(tempFiltros[item.name])
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      aplicarFiltros()
    }
  }

  const handleFiltros = () => {
    aplicarFiltros()
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [filtros, tempFiltros]);

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
      {filtros.map((item) => <div key={item.name}>
        <label htmlFor={item.name}>{item.label}</label>
        <input 
          name={item.name} 
          id={item.name} 
          type={item.type}
          value={tempFiltros[item.name]}
          onChange={({target}) => handleChange(target, item.name)} />
      </div>)}
      <button onClick={handleFiltros}>Filtrar</button>
    </div>
  )
}

export default DadosFiltros
