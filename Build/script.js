const button1 = document.querySelector('.b1')
const button2 = document.querySelector('.b2')
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
  event.preventDefault()
  fetch(`${url}/api/cadastro`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({usuario: 'joao', senha:'1234'}),
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
    return json
  })
}

button1.addEventListener('click', handleClickb1)
button2.addEventListener('click', handleClickb2)