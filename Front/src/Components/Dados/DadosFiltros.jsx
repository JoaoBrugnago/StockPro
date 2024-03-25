import React from 'react'
import styles from './DadosFiltros.module.css'
import { MdOutlineExpand } from "react-icons/md";
//import PromptCliente from '../Prompt/PromptCliente';

const DadosFiltros = ({filtros, setModalComponent}) => {
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

  async function handlePrompt(item) {
    try {
      const modalModule = await import(`../Prompt/${item.prompt}`);
      const ModalComponent = modalModule.default;
      setModalComponent(<ModalComponent />);
      //setModalComponent(<PromptCliente setModalComponent={setModalComponent} />);
    } catch (error) {
      console.error('Erro ao carregar o modal:', error);
    }
  }

  return (
    <div className={styles.container}>
      {filtros.map((item) => <div key={item.name}>
        <label htmlFor={item.name}>{item.label}</label>
        <div className={styles.conteudo}>
          <input 
            name={item.name} 
            id={item.name} 
            type={item.type}
            value={tempFiltros[item.name]}
            onChange={({target}) => handleChange(target, item.name)} />
            {item.possuiPrompt ? <MdOutlineExpand onClick={() => handlePrompt(item)} className={styles.iconPrompt} /> : null}
          </div>
      </div>)}
      <button onClick={handleFiltros}>Filtrar</button>
    </div>
  )
}

export default DadosFiltros
