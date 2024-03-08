from flask import Blueprint, request
from markupsafe import escape
from datetime import datetime
from Funcoes.retorna_dados_vendas import DadosVendas

retornarDadosVendas = Blueprint('retornarDadosVendas', __name__)
dadosVendas = DadosVendas()

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
        dataInicial = dados.get('dataInicial')
        dataFinal = dados.get('dataFinal')
        cliente = str(dados.get('cliente'))
        valor = float(dados.get('valor'))
        #Lógica para retorno
        inicioLeitura = (pagina - 1) * qtdRegistros
        fimLeitura = inicioLeitura + qtdRegistros

    if (temErro == False):
        rotulos = ['', 'Venda', 'Data', 'Cliente', 'Valor']

        try:
            registros = []
            dadosBrutos = dadosVendas.retorna_dados_vendas(dataInicial, dataFinal, cliente, valor, inicioLeitura, fimLeitura)

            for linha in dadosBrutos:
                valores_linha = [
                    '',
                    str(linha[0]),
                    str(linha[3]),
                    str(linha[4]),
                    str(linha[2]),
                ]
                registros.append(valores_linha)

        except Exception as e:
            temErro = True
            print(f"Erro ao retornar dados de vendas: {e}")
        
    if (temErro == True):
        valido = False
        rotulos = []
        registros = []

    return {
        'valido': valido,
        'rotulos': rotulos,
        'registros': registros,
        'numero': 174 # Apenas para teste de setas no front
    }
