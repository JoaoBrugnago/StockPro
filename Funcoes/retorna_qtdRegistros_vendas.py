import pyodbc
from Funcoes.conexao_banco_dados import BancoDeDados

class RegistrosVendas:
  def __init__(self):
    pass

  def retorna_qtdregistros_vendas(self, dataInicial, dataFinal, cliente, valor):
    conn = None
    try:
      conn = BancoDeDados().get_connection()
      cursor = conn.cursor()
      query = """
        SELECT COUNT(DISTINCT vndcode) AS qtdVendas
        FROM vendas
        WHERE (vnddate >= ? AND vnddate <= ?)
        AND (cltcode = ? OR ? = 0 OR ? IS NULL)
        AND (vndvalunitario >= (? - 100) OR ? = 0 OR ? IS NULL)
        AND (vndvalunitario <= (? + 100) OR ? = 0 OR ? IS NULL)
      """
      cursor.execute(query, (dataInicial, dataFinal, cliente, cliente, cliente, valor, valor, valor, valor, valor, valor))
      row = cursor.fetchone()
      qtdRegistros = row[0] if row else 0

    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
      qtdRegistros = 0
    finally:
      if (conn):
        BancoDeDados().put_connection(conn)

    return qtdRegistros