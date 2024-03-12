from flask import Blueprint, request
from markupsafe import escape
from Funcoes.retorna_qtdRegistros_vendas import RegistrosVendas

retornarRegistrosVendas = Blueprint('retornarRegistrosVendas', __name__)
registrosvendas = RegistrosVendas()

@retornarRegistrosVendas.route('/api/registrosTotaisVendas', methods=['POST'])
def retornarRegistrosVendas_route():
    messages = 'Entrou na api de registros > '
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
        messages += 'Pegou os dados > '

    if (temErro == False):
        messages += 'Vai entrar no try > '
        print('Print teste')
        try:
            messages += 'Entrou no try '
            registrosTotaisTabela = registrosvendas.retorna_qtdregistros_vendas(dataInicial, dataFinal, cliente, valor)
            messages += 'Qtd registros: ' + str(registrosTotaisTabela) + '> '

        except Exception as e:
            messages += 'Entrou no except > '
            temErro = True
            print(f"Erro ao retornar registros de vendas: {e}")
        
    if (temErro == True):
        messages += 'TEM ERRO > '
        registrosTotaisTabela = 0

    return {
        'registrosTotaisTabela': registrosTotaisTabela,
        'messages': messages,
    }
