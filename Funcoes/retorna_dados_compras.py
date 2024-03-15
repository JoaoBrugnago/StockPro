import pyodbc

from .conexao_banco_dados import BancoDeDados
bancoDeDados = BancoDeDados()

class DadosCompras:
  def __init__(self):
    self.conn_str = bancoDeDados.conn_str

  def retorna_dados_compras(self, dataInicial, dataFinal, valor, inicioLeitura, fimLeitura):
    registros = []
    conn = pyodbc.connect(self.conn_str)
    cursor = conn.cursor()
    try:
      query = """
          SELECT *
          FROM (
            SELECT *, ROW_NUMBER() OVER (ORDER BY cmpcode) AS RowNum
            FROM compras
            WHERE (cmpdate >= ? AND cmpdate <= ?)
            AND (cmpvalunitario >= (? - 100) OR ? = 0 OR ? IS NULL)
            AND (cmpvalunitario <= (? + 100) OR ? = 0 OR ? IS NULL)
          ) AS RowConstrainedResult
          WHERE RowNum BETWEEN ? AND ?
          ORDER BY cmpcode
      """
      cursor.execute(query, (dataInicial, dataFinal, valor, valor, valor, valor, valor, valor, inicioLeitura, fimLeitura))
      registros = cursor.fetchall()
    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
    finally:
      cursor.close()
      conn.close()

    return registros
  