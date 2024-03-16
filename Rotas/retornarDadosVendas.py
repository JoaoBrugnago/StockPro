from flask import Blueprint, request
from markupsafe import escape
from Funcoes.retorna_dados_vendas import DadosVendas

retornarDadosVendas = Blueprint('retornarDadosVendas', __name__)
dadosVendas = DadosVendas()

@retornarDadosVendas.route('/api/dadosVendas', methods=['POST'])
def retornarDadosVendas_route():
    temErro  = False

    if (temErro == False):
        if (not request.is_json):
            temErro = True

    if (temErro == False):
        dados = request.json
        registrosTotaisLidos = int(dados.get('registrosTotaisLidos'))
        pagina = int(dados.get('pagina'))
        dataInicial = dados.get('dataInicial')
        dataFinal = dados.get('dataFinal')
        cliente = str(dados.get('cliente'))
        valor = float(dados.get('valor'))
        #Lógica para retorno
        inicioLeitura = (pagina - 1) * registrosTotaisLidos
        fimLeitura = inicioLeitura + registrosTotaisLidos

    if (temErro == False):
        rotulos = ['', 'Venda', 'Data', 'Cliente', 'Valor']

        try:
            registros = []
            dadosBrutos = dadosVendas.retorna_dados_vendas(dataInicial, dataFinal, cliente, valor, inicioLeitura, fimLeitura)

            for linha in dadosBrutos:
                valores_linha = [
                    '',
                    str(linha[0]),   # vndcode
                    str(linha[3]),   # vnddate
                    str(linha[2]),   # valor_total
                    str(linha[4]),   # cltcode
                ]
                registros.append(valores_linha)

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
