import React from 'react'
import './Prompt.css'
import useFetch from '../../Hooks/useFetch'
import { CLIENTES_DATA_PROMPT, REGISTROS_TOTAIS_CLIENTES_PROMPT } from '../../Api'
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
import Header from '../Header'
import DadosFiltros from '../Dados/DadosFiltros'
import DadosTabela from '../Dados/DadosTabela'

const PromptCliente = ({setModalComponent, setValue}) => {
  const [pagina, setPagina] = React.useState(1)
  const [registrosTotaisTabela, setRegistrosTotaisTabela] = React.useState(0)

  const [cliente, setCliente] = React.useState('')
  const [registrosTotaisLidos, setRegistrosTotaisLidos] = React.useState(10)

  // Hook de fetch para dados individuais
  const { data: dadosIndividuais, error: errorDadosIndividuais, loading: loadingDadosIndividuais, request: requestDadosIndividuais } = useFetch();

  // Hook de fetch para dados totais
  const { data: dadosTotais, error: errorDadosTotais, loading: loadingDadosTotais, request: requestDadosTotais } = useFetch();

  const filtros = [
    {name: 'cliente', label: 'Cliente', type: 'text', value: cliente, setValue: setCliente, possuiPrompt: false, prompt: ''},
    {name: 'registrosTotaisLidos', label: 'Qtd registros', type: 'Number', value: registrosTotaisLidos, setValue: setRegistrosTotaisLidos, possuiPrompt: false, prompt: ''}
  ]

  React.useEffect(() => {
    async function fetchRegistros() {
      const {url, options} = REGISTROS_TOTAIS_CLIENTES_PROMPT({cliente})
      const {json} = await requestDadosIndividuais(url, options)
      setRegistrosTotaisTabela(json.registrosTotaisTabela);
    }
    fetchRegistros()
  }, [requestDadosIndividuais, cliente])

  React.useEffect(() => {
    async function fetchData() {
      const {url, options} = CLIENTES_DATA_PROMPT({registrosTotaisLidos, pagina, cliente})
      await requestDadosTotais(url, options)
    }
    fetchData()
  }, [requestDadosTotais, requestDadosTotais, pagina, registrosTotaisLidos, cliente])

  if (errorDadosTotais || errorDadosIndividuais) return <Error error={errorDadosTotais || errorDadosIndividuais} />
  if (loadingDadosTotais || loadingDadosIndividuais) return <Loading />
  if (dadosTotais)
  return (
    <div className='container'>
      <Header title='Clientes' prompt={[setModalComponent]} />
      <DadosFiltros filtros={filtros} setModalComponent={setModalComponent}/>
      <DadosTabela data={dadosTotais} pagina={pagina} setPagina={setPagina} qtdRegistrosTabela={registrosTotaisTabela} qtdRegistrosUsuario={registrosTotaisLidos} prompt={[setModalComponent, setValue]} />
    </div>
  )
  else return null
}

export default PromptCliente
