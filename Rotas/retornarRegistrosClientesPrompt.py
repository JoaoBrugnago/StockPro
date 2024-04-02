from flask import Blueprint, request
from markupsafe import escape
#from Funcoes.retorna_qtdRegistros_compras import RegistrosCompras

retornarRegistrosClientesPrompt = Blueprint('retornarRegistrosClientesPrompt', __name__)
#registroscompras = RegistrosCompras()

@retornarRegistrosClientesPrompt.route('/api/registrosTotaisClientesPrompt', methods=['POST'])
def retornarRegistrosClientesPrompt_route():
    registrosTotaisTabela = 0
    temErro  = False

    if (temErro == False):
        if (not request.is_json):
            temErro = True

    if (temErro == False):
        dados = request.json
        cliente = str(dados.get('cliente'))

    if (temErro == False):
        try:
            #registrosTotaisTabela = registroscompras.retorna_qtdregistros_compras(dataInicial, dataFinal, valor)
            registrosTotaisTabela = 3

        except Exception as e:
            temErro = True
            print(f"Erro ao retornar registros de vendas: {e}")
        
    if (temErro == True):
        registrosTotaisTabela = 0

    return {
        'registrosTotaisTabela': registrosTotaisTabela,
    }
