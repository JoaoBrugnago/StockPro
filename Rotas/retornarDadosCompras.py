from flask import Blueprint, request
from markupsafe import escape
from Funcoes.retorna_dados_compras import DadosCompras

retornarDadosCompras = Blueprint('retornarDadosCompras', __name__)
dadosCompras = DadosCompras()

@retornarDadosCompras.route('/api/dadosCompras', methods=['POST'])
def retornarDadosCompras_route():
    temErro  = False

    if (temErro == False):
        if (not request.is_json):
            temErro = True

    if (temErro == False):
        dados = request.json
        qtdRegistrosUsuario = int(dados.get('qtdRegistrosUsuario'))
        pagina = int(dados.get('pagina'))
        dataInicial = dados.get('dataInicial')
        dataFinal = dados.get('dataFinal')
        valor = float(dados.get('valor'))
        #Lógica para retorno
        inicioLeitura = (pagina - 1) * qtdRegistrosUsuario
        fimLeitura = inicioLeitura + qtdRegistrosUsuario

    if (temErro == False):
        rotulos = ['', 'Compra', 'Data', 'Valor']

        try:
            registros = []
            dadosBrutos = dadosCompras.retorna_dados_compras(dataInicial, dataFinal, valor, inicioLeitura, fimLeitura)

            for linha in dadosBrutos:
                valores_linha = [
                    '',
                    str(linha[0]),   # cmpcode
                    str(linha[1]),   # cmpdate
                    str(round(linha[3], 2)),   # valor_total
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
