import React from 'react'

const useFetch = () => {
  const [data, setDada] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function request(url, options) {
    setLoading(true)
    let json;
    try {
      const response = await fetch(url, options)
      json = await response.json()
      if (response && response.ok) {
        setError(null)
      } else {
        throw new Error('Falha na requisição: ' + json.message);
      }
    } catch (e) {
      json = null;
      setError(e.message)
    } finally {
      setLoading(false)
      setDada(json)
    }
  }

  return {
    data, error, loading, request
  }
}

export default useFetch
