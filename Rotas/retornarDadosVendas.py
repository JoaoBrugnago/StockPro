from flask import Blueprint, request
from markupsafe import escape

retornarDadosVendas = Blueprint('retornarDadosVendas', __name__)

@retornarDadosVendas.route('/api/dadosVendas', methods=['POST'])
def retornarDadosVendas_route():
    temErro  = False
    valido = True
    if (temErro == False):
        if (not request.is_json):
            temErro = True
    if (temErro == False):
        dados = request.json
        qtdRegistros = int(dados.get('qtdRegistros'))
        pagina = int(dados.get('pagina'))
        inicioLeitura = (pagina - 1) * qtdRegistros
        fimLeitura = inicioLeitura + qtdRegistros
    if (temErro == False):
        rotulos = ['', 'Venda', 'Data', 'Cliente', 'Valor']
        # Fazer a leitura da tabela -- prever filtros do usuário que ainda faltam ser adicionados. Para teste no front, vou setar manualmente:
        if (pagina == 1):
            registros = [
                     ['', '1', '01/03/2024', 'Joao', '120.20'],
                     ['', '2', '02/03/2024', 'Davi', '121.20'],
                     ['', '3', '03/03/2024', 'Joao', '122.20'],
                     ['', '4', '04/03/2024', 'Davi', '123.20'],
                     ['', '5', '05/03/2024', 'Joao', '124.20'],
                     ['', '6', '06/03/2024', 'Davi', '125.20'],
                     ['', '7', '07/03/2024', 'Joao', '126.20'],
                     ['', '8', '08/03/2024', 'Davi', '127.20'],
                     ['', '9', '09/03/2024', 'Joao', '128.20'],
                     ['', '10', '10/03/2024', 'Davi', '129.20'],
                    ]
        elif (pagina == 2):
            registros = [
                     ['', '11', '11/03/2024', 'Joao', '130.20'],
                     ['', '12', '12/03/2024', 'Davi', '131.20'],
                     ['', '13', '13/03/2024', 'Joao', '132.20'],
                     ['', '14', '14/03/2024', 'Davi', '133.20'],
                     ['', '15', '15/03/2024', 'Joao', '134.20'],
                     ['', '6', '06/03/2024', 'Davi', '125.20'],
                     ['', '7', '07/03/2024', 'Joao', '126.20'],
                     ['', '8', '08/03/2024', 'Davi', '127.20'],
                     ['', '9', '09/03/2024', 'Joao', '128.20'],
                     ['', '10', '10/03/2024', 'Davi', '129.20'],
                    ]
        else:
            registros = [
                     ['', '11', '11/03/2024', 'Joao', '130.20'],
                     ['', '12', '12/03/2024', 'Davi', '131.20'],
                     ['', '13', '13/03/2024', 'Joao', '132.20'],
                     ['', '14', '14/03/2024', 'Davi', '133.20'],
                     ['', '15', '15/03/2024', 'Joao', '134.20'],
                    ]
    if (temErro == True):
        valido = False
        rotulos = []
        registros = []

    return {
        'valido': valido,
        'rotulos': rotulos,
        'registros': registros,
        'numero': 25 # Apenas para teste de setas no front
    }
