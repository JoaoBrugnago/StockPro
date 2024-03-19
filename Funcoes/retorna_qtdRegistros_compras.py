import pyodbc

from .conexao_banco_dados import BancoDeDados

class RegistrosCompras:
  def __init__(self):
    pass

  def retorna_qtdregistros_compras(self, dataInicial, dataFinal, valor):
    conn = None
    try:
      conn = BancoDeDados().get_connection()
      cursor = conn.cursor()
      query = """
          SELECT COUNT(DISTINCT cmpcode) AS qtdCompras
          FROM compras
          WHERE (cmpdate >= ? AND cmpdate <= ?)
          AND (cmpvalunitario >= (? - 100) OR ? = 0 OR ? IS NULL)
          AND (cmpvalunitario <= (? + 100) OR ? = 0 OR ? IS NULL)
      """
      cursor.execute(query, (dataInicial, dataFinal, valor, valor, valor, valor, valor, valor))
      row = cursor.fetchone()
      qtdRegistros = row[0] if row else 0

    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
      qtdRegistros = 0
    finally:
      if (conn):
        BancoDeDados().put_connection(conn)

    return qtdRegistros