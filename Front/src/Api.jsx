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
