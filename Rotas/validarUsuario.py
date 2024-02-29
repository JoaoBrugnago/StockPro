from flask import Blueprint, request, jsonify
from markupsafe import escape

# Usuário padrão para entrar no sistema, só existirá um.
usuarioPadrao = 'Suzana'
senhaPadrao = 'Suso@res021196!'

validarUsuario = Blueprint('validarUsuario', __name__)

@validarUsuario.route('/api/validarUsuario', methods=['POST'])
def validarUsuario_route():
    usuario = None
    senha = None

    if not request.is_json:
        return {
            'resposta': False,
            'mensagem': 'A solicitação deve ser JSON',
        }
    
    if request.is_json:
        dados = request.json
        usuario = dados.get('usuario')
        senha = dados.get('senha')

    if (usuario == usuarioPadrao and senha == senhaPadrao):
        return {
            'resposta': True,
            'mensagem': 'OK',
        }
    else:
        return {
            'resposta': False,
            'mensagem': 'Usuário e/ou senha inválidos',
        }
