import pyodbc

from .conexao_banco_dados import BancoDeDados
bancoDeDados = BancoDeDados()

class RegistrosVendas:
  def __init__(self):
    self.conn_str = bancoDeDados.conn_str

  def retorna_qtdregistros_vendas(self, dataInicial, dataFinal, cliente, valor):
    '''
    print('Entrei no qtd registro')
    conn = pyodbc.connect(self.conn_str)
    cursor = conn.cursor()
    try:
      query = 
          SELECT COUNT(*) AS qtdRegistros
          FROM (
            SELECT *, ROW_NUMBER() OVER (ORDER BY vndcode) AS RowNum
            FROM vendas
            WHERE (vnddate >= ? AND vnddate <= ?)
            AND (cltcode = ? OR ? = 0 OR ? IS NULL)
            AND (vndvalunitario >= (? - 100) OR ? = 0 OR ? IS NULL)
            AND (vndvalunitario <= (? + 100) OR ? = 0 OR ? IS NULL)
          ) AS RowConstrainedResult
      
      cursor.execute(query, (dataInicial, dataFinal, cliente, cliente, cliente, valor, valor, valor, valor, valor, valor))
      row = cursor.fetchone()
      qtdRegistros = row[0] if row else 0

    except Exception as e:
      print(f"Erro ao executar consulta SQL: {e}")
      qtdRegistros = 0
    finally:
      cursor.close()
      conn.close()
    '''
    qtdRegistros = 174

    return qtdRegistros