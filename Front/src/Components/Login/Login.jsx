import React from 'react';
import styles from './Login.module.css';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { USER_VALIDATE } from '../../Api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const user = useForm();
  const password = useForm();
  const { request, loading, error } = useFetch();
  const [resposta, setResposta] = React.useState(null)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    if (user.validate() && password.validate()) {
      const { url, options } = USER_VALIDATE({
        usuario: user.value,
        senha: password.value,
      });
      const { json } = await request(url, options);
      
      /*
      if (json.valido === true && json.mensagem === 'OK') {
        navigate('/conta')
      } else {
        setResposta(json.mensagem)
      }
      */
      console.log(json)

    } else {
      setResposta('Dados incompletos')
    }
  }

  return (
    <section className={`${styles.section} animeLeft`}>
      <h1 className='title'>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Input label="Usuário" type="text" name="user" {...user} />
          <Input label="Senha" type="password" name="password" {...password} />
          {loading ? <Button minWidth='3rem' disabled>Enviar</Button> : <Button minWidth='3rem'>Enviar</Button>}
        </form>
        {error && <Error error={error} />}
        {resposta && error === null && <Error error={resposta} />}
      </div>
    </section>
  );
};

export default Login;
