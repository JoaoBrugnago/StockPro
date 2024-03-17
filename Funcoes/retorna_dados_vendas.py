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
        SELECT vndcode, vnddate, cltcode, SUM(vndvalunitario * vndqtdreceita) AS valor_total
        FROM vendas
        WHERE (vnddate >= ? AND vnddate <= ?)
        AND (cltcode = ? OR ? = 0 OR ? IS NULL)
        GROUP BY vndcode, vnddate, cltcode
        HAVING (SUM(vndvalunitario * vndqtdreceita) >= (? - 100) OR ? = 0 OR ? IS NULL)
        AND (SUM(vndvalunitario * vndqtdreceita) <= (? + 100) OR ? = 0 OR ? IS NULL)
        ORDER BY vndcode DESC
        OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
      """
      cursor.execute(query, (dataInicial, dataFinal, cliente, cliente, cliente, valor, valor, valor, valor, valor, valor, inicioLeitura, fimLeitura))
      registros = cursor.fetchall()
    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
    finally:
      cursor.close()
      conn.close()

    return registros
  