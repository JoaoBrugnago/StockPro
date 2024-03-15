from flask import Blueprint, request
from markupsafe import escape
from Funcoes.retorna_qtdRegistros_compras import RegistrosCompras

retornarRegistrosCompras = Blueprint('retornarRegistrosCompras', __name__)
registroscompras = RegistrosCompras()

@retornarRegistrosCompras.route('/api/registrosTotaisCompras', methods=['POST'])
def retornarRegistrosCompras_route():
    registrosTotaisTabela = 0
    temErro  = False

    if (temErro == False):
        if (not request.is_json):
            temErro = True

    if (temErro == False):
        dados = request.json
        dataInicial = dados.get('dataInicial')
        dataFinal = dados.get('dataFinal')
        valor = float(dados.get('valor'))

    if (temErro == False):
        try:
            registrosTotaisTabela = registroscompras.retorna_qtdregistros_compras(dataInicial, dataFinal, valor)

        except Exception as e:
            temErro = True
            print(f"Erro ao retornar registros de vendas: {e}")
        
    if (temErro == True):
        registrosTotaisTabela = 0

    return {
        'registrosTotaisTabela': registrosTotaisTabela,
    }
