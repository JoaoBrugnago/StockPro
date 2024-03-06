import React, { useContext } from 'react'
import styles from './Vendas.module.css'
import { userContext } from '../../UserContext'
import useFetch from '../../Hooks/useFetch'
import DadosTabela from '../DadosTabela/DadosTabela'
import { VENDAS_DATA } from '../../Api'
import Error from '../Helper/Error'
import Loading from '../Helper/Error'

const Vendas = () => {
  const {login, userLogout} = useContext(userContext)
  const {data, error, loading, request} = useFetch()
  const [pagina, setPagina] = React.useState(1)
  const [qtdRegistros, setQtdRegistros] = React.useState(10)
  //const [registrosTotais, setRegistrosTotais] = React.useState(0)

  React.useEffect(() => {
    if (login === false) userLogout()
  }, [login, userLogout])

  React.useEffect(() => {
    async function fetchData() {
      const {url, options} = VENDAS_DATA({qtdRegistros, pagina})
      await request(url, options)
      console.log('Fez o fetch')
    }
    fetchData()
  }, [pagina, qtdRegistros, request])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
  return (
    <>
      <DadosTabela data={data} pagina={pagina} setPagina={setPagina} qtdRegistros={qtdRegistros} />
    </>
  )
  else return null
}

export default Vendas
