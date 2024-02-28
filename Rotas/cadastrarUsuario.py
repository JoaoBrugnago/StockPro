from flask import Blueprint, request, jsonify
from markupsafe import escape

cadastrarUsuario = Blueprint('cadastro', __name__)

@cadastrarUsuario.route('/api/cadastro', methods=['POST'])
def cadastrarUsuario_route():
    if request.is_json:
        dados = request.json
        usuario = dados.get('usuario')
        senha = dados.get('senha')

    return {
        'usuario': escape(usuario),
        'senha': escape(senha),
    }
