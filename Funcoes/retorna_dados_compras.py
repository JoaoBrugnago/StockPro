import pyodbc

from .conexao_banco_dados import BancoDeDados

class DadosCompras:
  def __init__(self):
    pass

  def retorna_dados_compras(self, dataInicial, dataFinal, valor, inicioLeitura, fimLeitura):
    registros = []
    conn = None
    try:
      conn = BancoDeDados().get_connection()
      cursor = conn.cursor()
      query = """
        SELECT cmpcode, cmpdate, SUM(cmpqtdproduto) AS total_produtos, SUM(cmpvalunitario * cmpqtdproduto) AS valor_total
        FROM compras
        WHERE (cmpdate >= ? AND cmpdate <= ?)
        GROUP BY cmpcode, cmpdate
        HAVING (SUM(cmpvalunitario * cmpqtdproduto) >= (? - 100) OR ? = 0 OR ? IS NULL)
        AND (SUM(cmpvalunitario * cmpqtdproduto) <= (? + 100) OR ? = 0 OR ? IS NULL)
        ORDER BY cmpcode DESC
        OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
      """
      cursor.execute(query, (dataInicial, dataFinal, valor, valor, valor, valor, valor, valor, inicioLeitura, fimLeitura))
      registros = cursor.fetchall()
    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
    finally:
      if (conn):
        BancoDeDados().put_connection(conn)

    return registros
  