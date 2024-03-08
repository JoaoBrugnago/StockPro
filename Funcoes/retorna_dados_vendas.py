import pyodbc

from .conexao_banco_dados import BancoDeDados
bancoDeDados = BancoDeDados()

class DadosVendas:
  def __init__(self):
    self.conn_str = bancoDeDados.conn_str

  def retorna_dados_vendas(self, dataInicial, dataFinal, cliente, valor, inicioLeitura, fimLeitura):
    print('inicio: ' + str(inicioLeitura))
    print('fim: ' + str(fimLeitura))
    registros = []
    conn = pyodbc.connect(self.conn_str)
    cursor = conn.cursor()
    try:
      query = """
          SELECT *
          FROM vendas
          WHERE vndcode > ? 
          AND vndcode <= ?
          ORDER BY vndcode
      """
      cursor.execute(query, (inicioLeitura, fimLeitura))

      registros = cursor.fetchall()
    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
    finally:
      cursor.close()
      conn.close()

    return registros