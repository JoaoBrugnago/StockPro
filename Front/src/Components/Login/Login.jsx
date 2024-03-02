import React from 'react'
import styles from './Login.module.css'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import Input from '../Form/Input';
import Button from '../Form/Button';
import { USER_VALIDATE } from '../../Api';

const Login = () => {
  const user = useForm();
  const password = useForm();
  const {request, data, loading, error} = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    if (user.validate() && password.validate()) {
      const {url, options} = USER_VALIDATE({usuario: user.value, senha:password.value})
      const {json} = await request(url, options)
      console.log(json)
      //-- Fazer navigate para a página inicial do app caso o login esteja correto.
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Input 
        label='Usuário'
        type='text'
        name='user'
        {... user}
      />
      <Input 
        label='Senha'
        type='password'
        name='password'
        {... password}
      />
      <Button>Enviar</Button>
    </form>
    {error && <p>{error}</p>}
    </>
  )
}

export default Login
