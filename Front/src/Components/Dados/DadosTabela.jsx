import React from 'react'
import styles from './DadosTabela.module.css'

const DadosTabela = ({data, pagina, setPagina, qtdRegistrosTabela, qtdRegistrosUsuario, prompt}) => {
  const {rotulos, registros} = data
  const qtdPagina = Math.ceil(qtdRegistrosTabela / qtdRegistrosUsuario);
  const [inputPage, setInputPage] = React.useState('');

  function handleFirstPage() {
    if (pagina > 1) {
      setPagina(1)
    }
  }

  function handlePrevPage() {
    if (pagina > 1) {
      setPagina(pagina => pagina - 1)
    }
  }

  function handleNextPage() {
    if (pagina < qtdPagina) {
      setPagina(pagina => pagina + 1)
    }
  }

  function handleLastPage() {
    if (pagina < qtdPagina) {
      setPagina(qtdPagina)
    }
  }

  function handleInputChange({target}) {
    setInputPage(target.value)
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handlePageConfirmation();
    }
  }

  function handlePageConfirmation() {
    const newPage = parseInt(inputPage, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= qtdPagina) {
      setPagina(newPage);
    }
    setInputPage('')
  }

  function handlePrompt(registro) {
    const cliente = Number(registro[0])
    prompt[1](cliente)
    prompt[0](null)
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {rotulos.map((rotulo, index) => <th key={index}>{rotulo}</th>)}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {registros.map((registro, index) => <tr key={index} className={styles.hoverLinha} onClick={prompt ? () => handlePrompt(registro) : null}>
            {registro.map((item, index) => <th key={index}>
              {item}
            </th>)}
          </tr>)}
        </tbody>
      </table>
      <div className={styles.navegacao}>
        <button onClick={handleFirstPage} disabled={pagina === 1}>P</button>
        <button onClick={handlePrevPage} disabled={pagina === 1}>A</button>
        {' '}
        <input 
          type='number'
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onBlur={() => setInputPage('')}
          placeholder={`${pagina}`}
          min={1}
          max={qtdPagina}
        />
        {` de ${qtdPagina} `}
        <button onClick={handleNextPage} disabled={pagina === qtdPagina}>P</button>
        <button onClick={handleLastPage} disabled={pagina === qtdPagina}>U</button>
      </div>
    </div>
  )
}

export default DadosTabela
