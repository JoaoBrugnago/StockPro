import React, { useContext } from 'react'
import styles from './Vendas.module.css'
import { userContext } from '../../UserContext'
import useFetch from '../../Hooks/useFetch'
import DadosTabela from '../Dados/DadosTabela'
import { VENDAS_DATA } from '../../Api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import RetornaDataInicioAno from '../Utils/RetornaDataInicioAno'
import RetornaDataDeHoje from '../Utils/RetornaDataDeHoje'
import DadosFiltros from '../Dados/DadosFiltros'

const Vendas = () => {
  const {login, userLogout} = useContext(userContext)
  const {data, error, loading, request} = useFetch()
  const [pagina, setPagina] = React.useState(1)
  const [qtdRegistros, setQtdRegistros] = React.useState(2)
  //const [registrosTotais, setRegistrosTotais] = React.useState(0)

  const [dataInicial, setDataInicial] = React.useState(RetornaDataInicioAno())
  const [dataFinal, setDataFinal] = React.useState(RetornaDataDeHoje())
  const [cliente, setCliente] = React.useState('1')
  const [valor, setValor] = React.useState(1000)

  const filtros = [
    {name: 'dataInicial', label: 'Data inicial', type: 'date', value: dataInicial, setValue: setDataInicial},
    {name: 'dataFinal', label: 'Data final', type: 'date', value: dataFinal, setValue: setDataFinal},
    {name: 'cliente', label: 'Cliente', type: 'text', value: cliente, setValue: setCliente},
    {name: 'valor', label: 'Valor', type: 'Number', value: valor, setValue: setValor},
  ]

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  React.useEffect(() => {
    async function fetchData() {
      const {url, options} = VENDAS_DATA({qtdRegistros, pagina, dataInicial, dataFinal, cliente, valor})
      await request(url, options)
    }
    fetchData()
    console.log('fez o fetch')
  }, [pagina, qtdRegistros, request, dataInicial, dataFinal, cliente, valor])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
  return (
    <>
      <DadosFiltros filtros={filtros}/>
      <DadosTabela data={data} pagina={pagina} setPagina={setPagina} qtdRegistros={qtdRegistros} />
    </>
  )
  else return null
}

export default Vendas
