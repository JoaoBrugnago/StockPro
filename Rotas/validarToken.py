from flask import Blueprint, request, jsonify
import jwt
from datetime import datetime
from Seguranca.retornaChaveSecreta import ChaveSecreta

chave = ChaveSecreta()
chave_secreta = chave.chaveSecreta()

validarToken = Blueprint('validarToken', __name__)

@validarToken.route('/api/validarToken', methods=['POST'])
def validarToken_route():
  authorization_header = request.headers.get('Authorization')
  token = authorization_header.split()[1]  # Formato 'Bearer token_jwt'

  if not token:
    return jsonify({'valido': False, 'mensagem': 'Token não fornecido'})

  try:
    # Decodificar o token JWT
    payload = jwt.decode(token, chave_secreta, algorithms=['HS256'])
    
    # Verificar se o token expirou
    expiracao = datetime.fromtimestamp(payload['exp'])
    agora = datetime.now()
    if expiracao < agora:
        return jsonify({'valido': False, 'mensagem': 'Token expirado'})
    
    # Se o token não expirou, está válido
    return jsonify({'valido': True, 'mensagem': 'Token válido'})
  
  except jwt.ExpiredSignatureError:
    return jsonify({'valido': False, 'mensagem': 'Token expirado'})
  except jwt.InvalidTokenError:
    return jsonify({'valido': False, 'mensagem': 'Token inválido'})
