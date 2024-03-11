import pyodbc

from .conexao_banco_dados import BancoDeDados
bancoDeDados = BancoDeDados()

class DadosVendas:
  def __init__(self):
    self.conn_str = bancoDeDados.conn_str

  def retorna_dados_vendas(self, dataInicial, dataFinal, cliente, valor, inicioLeitura, fimLeitura):
    registros = []
    conn = pyodbc.connect(self.conn_str)
    cursor = conn.cursor()
    try:
      query = """
          SELECT *
          FROM (
            SELECT *, ROW_NUMBER() OVER (ORDER BY vndcode) AS RowNum
            FROM vendas
            WHERE (vnddate >= ? AND vnddate <= ?)
            AND (cltcode = ? OR ? = 0 OR ? IS NULL)
            AND (vndvalunitario >= (? - 100) OR ? = 0 OR ? IS NULL)
            AND (vndvalunitario <= (? + 100) OR ? = 0 OR ? IS NULL)
          ) AS RowConstrainedResult
          WHERE RowNum BETWEEN ? AND ?
          ORDER BY vndcode
      """
      cursor.execute(query, (dataInicial, dataFinal, cliente, cliente, cliente, valor, valor, valor, valor, valor, valor, inicioLeitura, fimLeitura))


      registros = cursor.fetchall()
    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
    finally:
      cursor.close()
      conn.close()

    return registros
  