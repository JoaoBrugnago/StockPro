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

const Vendas = () => {
  //-- Variável para validação de login
  const {login, userLogout} = useContext(userContext)

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
    {name: 'dataInicial', label: 'Data inicial', type: 'date', value: dataInicial, setValue: setDataInicial},
    {name: 'dataFinal', label: 'Data final', type: 'date', value: dataFinal, setValue: setDataFinal},
    {name: 'cliente', label: 'Cliente', type: 'text', value: cliente, setValue: setCliente},
    {name: 'valor', label: 'Valor', type: 'Number', value: valor, setValue: setValor},
    {name: 'registrosTotaisLidos', label: 'Qtd registros', type: 'Number', value: registrosTotaisLidos, setValue: setRegistrosTotaisLidos},
  ]

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  React.useEffect(() => {
    async function fetchRegistros() {
      const {url, options} = REGISTROS_TOTAIS_VENDAS({dataInicial, dataFinal, cliente, valor})
      const {json} = await requestDadosIndividuais(url, options)
      setRegistrosTotaisTabela(json.registrosTotaisTabela);
      console.log('retorno do back: ' + json.messages)
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

  if (errorDadosTotais || errorDadosIndividuais) return <Error error={errorDadosTotais || errorDadosIndividuais} />
  if (loadingDadosTotais || loadingDadosIndividuais) return <Loading />
  if (dadosTotais)
  return (
    <>
      <DadosFiltros filtros={filtros}/>
      <DadosTabela dadosTotais={dadosTotais} pagina={pagina} setPagina={setPagina} registrosTotaisTabela={registrosTotaisTabela} registrosTotaisLidos={registrosTotaisLidos} />
    </>
  )
  else return null
}

export default Vendas
