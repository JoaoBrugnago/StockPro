export const API_URL = window.location.origin;

export function USER_VALIDATE(body) {
  return {
    url: API_URL + '/api/validarUsuario',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE(token) {
  return {
    url: API_URL + '/api/validarToken',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function VENDAS_DATA(body) {
  return {
    url: API_URL + '/api/dadosVendas',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}