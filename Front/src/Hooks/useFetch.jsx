import React from 'react'

const useFetch = () => {
  const [data, setDada] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setLoading(true)
      setError(null)
      response = await fetch(url, options)
      json = await response.json()
      if (response.ok === false) throw new Error('Falha na requisição: ' + json.message);
    } catch (e) {
      response = null
      json = null
      setError('Falha na requisição: ' + e.message)
    } finally {
      setLoading(false)
      setDada(json)
    }
    return {
      response,
      json,
    }
  }, []);

  return {
    data, 
    error, 
    loading, 
    request,
  }
}

export default useFetch
