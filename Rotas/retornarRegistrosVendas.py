from flask import Blueprint, request
from markupsafe import escape

retornarRegistrosVendas = Blueprint('retornarRegistrosVendas', __name__)

@retornarRegistrosVendas.route('/api/registrosTotaisVendas', methods=['POST'])
def retornarRegistrosVendas_route():
    registrosTotaisTabela = 0
    temErro  = False

    if (temErro == False):
        if (not request.is_json):
            temErro = True

    if (temErro == False):
        dados = request.json
        dataInicial = dados.get('dataInicial')
        dataFinal = dados.get('dataFinal')
        cliente = str(dados.get('cliente'))
        valor = float(dados.get('valor'))
        #Lógica para retorno

    if (temErro == False):
        registrosTotaisTabela = 174 # Para testes
        '''
        try:
            #chamar logica

        except Exception as e:
            temErro = True
            print(f"Erro ao retornar registros de vendas: {e}")
        '''
        
    if (temErro == True):
        registrosTotaisTabela = 0

    return {
        'registrosTotaisTabela': registrosTotaisTabela,
    }
