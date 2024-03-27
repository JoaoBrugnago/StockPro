import React, { useContext } from 'react'
import styles from './Vendas.module.css'
import { userContext } from '../../UserContext'
import useFetch from '../../Hooks/useFetch'
import DadosTabela from '../Dados/DadosTabela'
import { REGISTROS_TOTAIS_VENDAS, VENDAS_DATA } from '../../Api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import RetornaDataInicioAno from '../Utils/RetornaDataInicioAno'
import RetornaDataDeHoje from '../Utils/RetornaDataDeHoje'
import DadosFiltros from '../Dados/DadosFiltros'
import Header from '../Header'
import Head from '../Helper/Head'
import toggleModal from '../Utils/ToggleModal'

const Vendas = () => {
  //-- Variável para validação de login
  const {login, userLogout} = useContext(userContext)

  //-- Variável para controle de modal
  const [modalComponent, setModalComponent] = React.useState(null);

  // Hook de fetch para dados individuais
  const { data: dadosIndividuais, error: errorDadosIndividuais, loading: loadingDadosIndividuais, request: requestDadosIndividuais } = useFetch();

  // Hook de fetch para dados totais
  const { data: dadosTotais, error: errorDadosTotais, loading: loadingDadosTotais, request: requestDadosTotais } = useFetch();

  //-- Variáveis para navegação da grid
  const [pagina, setPagina] = React.useState(1)
  const [registrosTotaisTabela, setRegistrosTotaisTabela] = React.useState(0)

  //-- Variáveis a serem usadas nos filtros
  const [registrosTotaisLidos, setRegistrosTotaisLidos] = React.useState(10)
  const [dataInicial, setDataInicial] = React.useState(RetornaDataInicioAno())
  const [dataFinal, setDataFinal] = React.useState(RetornaDataDeHoje())
  const [cliente, setCliente] = React.useState(0)
  const [valor, setValor] = React.useState(0)

  //-- Variáveis para filtros da grid
  const filtros = [
    {name: 'dataInicial', label: 'Data inicial', type: 'date', value: dataInicial, setValue: setDataInicial, possuiPrompt: false, prompt: ''},
    {name: 'dataFinal', label: 'Data final', type: 'date', value: dataFinal, setValue: setDataFinal, possuiPrompt: false, prompt: ''},
    {name: 'cliente', label: 'Cliente', type: 'number', value: cliente, setValue: setCliente, possuiPrompt: true, prompt: 'PromptCliente'},
    {name: 'valor', label: 'Valor', type: 'Number', value: valor, setValue: setValor, possuiPrompt: false, prompt: ''},
    {name: 'registrosTotaisLidos', label: 'Qtd registros', type: 'Number', value: registrosTotaisLidos, setValue: setRegistrosTotaisLidos, possuiPrompt: false, prompt: ''},
  ]

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  React.useEffect(() => {
    async function fetchRegistros() {
      const {url, options} = REGISTROS_TOTAIS_VENDAS({dataInicial, dataFinal, cliente, valor})
      const {json} = await requestDadosIndividuais(url, options)
      setRegistrosTotaisTabela(json.registrosTotaisTabela);
    }
    fetchRegistros()
  }, [dataInicial, dataFinal, cliente, valor])

  React.useEffect(() => {
    async function fetchData() {
      const {url, options} = VENDAS_DATA({registrosTotaisLidos, pagina, dataInicial, dataFinal, cliente, valor})
      await requestDadosTotais(url, options)
    }
    fetchData()
  }, [requestDadosTotais, pagina, registrosTotaisLidos, dataInicial, dataFinal, cliente, valor])

  React.useEffect(() => {
    const modal = toggleModal(modalComponent)
    return modal;
  }, [modalComponent]);

  if (errorDadosTotais || errorDadosIndividuais) return <Error error={errorDadosTotais || errorDadosIndividuais} />
  if (loadingDadosTotais || loadingDadosIndividuais) return <Loading />
  if (dadosTotais)
  return (
    <>
      <Header title='Vendas' prompt={false}/>
      <Head title='Vendas' description='Dados de vendas do sistema stockpro'/>
      <DadosFiltros filtros={filtros} setModalComponent={setModalComponent}/>
      <DadosTabela data={dadosTotais} pagina={pagina} setPagina={setPagina} qtdRegistrosTabela={registrosTotaisTabela} qtdRegistrosUsuario={registrosTotaisLidos} prompt={false}/>
    </>
  )
  else return null
}

export default Vendas
