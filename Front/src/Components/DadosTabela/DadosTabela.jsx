import React from 'react'
import Input from '../Form/Input'
import useForm from '../../Hooks/useForm';

const DadosTabela = ({data, pagina, setPagina, qtdRegistros}) => {
  const {rotulos, registros, numero} = data
  const qtdPagina = Math.ceil(numero / qtdRegistros);
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            {rotulos.map((rotulo, index) => <th key={index}>{rotulo}</th>)}
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, index) => <tr key={index}>
            {registro.map((item, index) => <th key={index}>
              {item}
            </th>)}
          </tr>)}
        </tbody>
      </table>
      <div>
        <button onClick={handleFirstPage} disabled={pagina === 1}>P</button>
        <button onClick={handlePrevPage} disabled={pagina === 1}>A</button>
        <input 
          type='number'
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={`${pagina}`}
          min={1}
          max={qtdPagina}
        />
        {`de ${qtdPagina}`}
        <button onClick={handleNextPage} disabled={pagina === qtdPagina}>P</button>
        <button onClick={handleLastPage} disabled={pagina === qtdPagina}>U</button>
      </div>
    </div>
  )
}

export default DadosTabela
