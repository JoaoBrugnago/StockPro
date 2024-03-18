import pyodbc

from .conexao_banco_dados import BancoDeDados
bancoDeDados = BancoDeDados()

class RetornaNomeCliente:
  def __init__(self):
    self.conn_str = bancoDeDados.conn_str

  def retornaNomeCliente(self, codigoCliente):
    nomeCliente = ''
    conn = None
    try:
      conn = pyodbc.connect(self.conn_str)
      cursor = conn.cursor()

      query = '''
        SELECT cltname
        FROM clientes
        WHERE cltcode = ?
      '''
      cursor.execute(query, (codigoCliente,))
      resultado = cursor.fetchone()
      if resultado: 
        nomeCliente = resultado[0] 
      else: 
        nomeCliente = ''

      return nomeCliente
    
    except Exception as e:
      print(f'Erro: {e}')

    finally:
      if conn:
        conn.close()