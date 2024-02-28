from flask import Blueprint
from markupsafe import escape

home = Blueprint('home', __name__)

@home.route('/home', methods=['GET'])
def home_route():
    from Funcoes.retorna_proximo_numero_compra import ProximaCompra
    proxima_compra = ProximaCompra()
    codigo_produto = proxima_compra.proximoValor()
    return {
        'codigo': escape(codigo_produto),
    }
