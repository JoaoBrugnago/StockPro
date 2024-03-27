import React, { useContext } from 'react'
import styles from './Compras.module.css'
import { userContext } from '../../UserContext'
import Header from '../Header'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import RetornaDataInicioAno from '../Utils/RetornaDataInicioAno'
import RetornaDataDeHoje from '../Utils/RetornaDataDeHoje'
import DadosFiltros from '../Dados/DadosFiltros'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import DadosTabela from '../Dados/DadosTabela'
import { COMPRAS_DATA, REGISTROS_TOTAIS_COMPRAS } from '../../Api'

const Compras = () => {
  const {login, userLogout} = useContext(userContext)

  // Hook para dados de quantidade de registros
  const {data: dataQtdRegistros, error: errorQtdRegistros, loading: loadingQtdRegistros, request: requestQtdRegistros} = useFetch()
  // Variáveis para paginação
  const [pagina, setPagina] = React.useState(1)
  const [qtdRegistrosLidos, setQtdRegistrosLidos] = React.useState(0)

  // Hook para dados da tabela
  const {data: dataValoresTabela, error: errorValoresTabela, loading: loadingValoresTabela, request: requestValoresTabela} = useFetch()
  // Variaveis para filtros da tabela
  const [qtdRegistrosUsuario, setQtdRegistrosUsuario] = React.useState(10)
  const [dataInicial, setDataInicial] = React.useState(RetornaDataInicioAno())
  const [dataFinal, setDataFinal] = React.useState(RetornaDataDeHoje())
  const [valor, setValor] = React.useState(0)

  const filtros = [
    {name: 'dataInicial', label: 'Data inicial', type: 'date', value: dataInicial, setValue: setDataInicial},
    {name: 'dataFinal', label: 'Data final', type: 'date', value: dataFinal, setValue: setDataFinal},
    {name: 'valor', label: 'Valor', type: 'Number', value: valor, setValue: setValor},
    {name: 'registrosTotaisLidos', label: 'Qtd registros', type: 'Number', value: qtdRegistrosUsuario, setValue: setQtdRegistrosUsuario},
  ]

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  React.useEffect(() => {
    async function fetchRegistros() {
      const {url, options} = REGISTROS_TOTAIS_COMPRAS({dataInicial, dataFinal, valor})
      const {json} = await requestQtdRegistros(url, options)
      setQtdRegistrosLidos(json.registrosTotaisTabela)
    }
    fetchRegistros()
  }, [dataInicial, dataFinal, valor])

  React.useEffect(() => {
    async function fetchData() {
      const {url, options} = COMPRAS_DATA({qtdRegistrosUsuario, pagina, dataInicial, dataFinal, valor})
      await requestValoresTabela(url, options)
    }
    fetchData()
  }, [pagina, qtdRegistrosUsuario, dataInicial, dataFinal, valor])

  if (errorValoresTabela || errorQtdRegistros) return <Error error={errorValoresTabela || errorQtdRegistros} />
  if (loadingValoresTabela || loadingQtdRegistros) return <Loading />
  if (dataValoresTabela || dataQtdRegistros)
    return (
      <>
        <Header title='Compras' prompt={false}/>
        <Head title='Compras' description='Dados de compras do sistema stockpro'/>
        <DadosFiltros filtros={filtros} />
        <DadosTabela data={dataValoresTabela} pagina={pagina} setPagina={setPagina} qtdRegistrosTabela={qtdRegistrosLidos} qtdRegistrosUsuario={qtdRegistrosUsuario} prompt={false}/>
      </>
    )
  else return null
}

export default Compras
