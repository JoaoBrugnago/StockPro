const button1 = document.querySelector('.b1')
const button2 = document.querySelector('.b2')
const usuario = document.getElementById('name')
const senha = document.getElementById('password')
const url = window.location.origin

async function handleClickb1(event) {
  event.preventDefault()
  fetch(`${url}/home`)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    return json
  })
}

async function handleClickb2(event) {
  if (usuario.value && senha.value) {
    event.preventDefault()
    fetch(`${url}/api/validarUsuario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({usuario: usuario.value, senha: senha.value}),
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      return json
    })
  } else {
    console.log('Preencha usuário e senha')
  }
}

button1.addEventListener('click', handleClickb1)
button2.addEventListener('click', handleClickb2)