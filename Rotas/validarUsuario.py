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
    temErro  = False
    mensagem = 'OK'
    valido = True

    if (temErro == False):
        if (not request.is_json):
            temErro = True
            mensagem = 'O body da requisição deve ser JSON'

    if (temErro == False):
        dados = request.json
        usuario = dados.get('usuario')
        senha = dados.get('senha')

    if (temErro == False):
        if (usuario == None or senha == None):
            temErro = True
            mensagem = 'Dados inválidos no body da requisição'
    
    if (temErro == False):
        if (usuario != usuarioPadrao and senha != senhaPadrao):
            temErro = True
            mensagem = 'Usuário e senha incorretos'

    if (temErro == False):
        if (usuario != usuarioPadrao or senha != senhaPadrao):
            temErro = True
            mensagem = 'Usuário ou senha incorretos'
    
    if (temErro == True):
        valido = False

    return {
        'valido': valido,
        'mensagem': mensagem,
    }
