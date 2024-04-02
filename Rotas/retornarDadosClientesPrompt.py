from flask import Blueprint, request
from markupsafe import escape
#from Funcoes.retorna_dados_compras import DadosCompras

retornarDadosClientesPrompt = Blueprint('retornarDadosClientesPrompt', __name__)
#dadosCompras = DadosCompras()

@retornarDadosClientesPrompt.route('/api/dadosClientesPrompt', methods=['POST'])
def retornarDadosClientesPrompt_route():
    temErro  = False

    if (temErro == False):
        if (not request.is_json):
            temErro = True

    if (temErro == False):
        dados = request.json
        registrosTotaisLidos = int(dados.get('registrosTotaisLidos'))
        pagina = int(dados.get('pagina'))
        cliente = str(dados.get('cliente'))
        #Lógica para retorno
        inicioLeitura = (pagina - 1) * registrosTotaisLidos
        fimLeitura = inicioLeitura + registrosTotaisLidos

    if (temErro == False):
        rotulos = ['Sequencia', 'Cliente']

        try:
            #registros = []
            #dadosBrutos = dadosCompras.retorna_dados_compras(dataInicial, dataFinal, valor, inicioLeitura, fimLeitura)

            '''
            for linha in dadosBrutos:
                valores_linha = [
                    str(linha[0]),
                ]
                registros.append(valores_linha)
            '''

            registros = [
                ['1', 'João'],
                ['2', 'Maria'],
                ['3', 'Davi'],
            ]

        except Exception as e:
            temErro = True
            print(f"Erro ao retornar dados de vendas: {e}")
        
    if (temErro == True):
        rotulos = []
        registros = []

    return {
        'rotulos': rotulos,
        'registros': registros,
    }
