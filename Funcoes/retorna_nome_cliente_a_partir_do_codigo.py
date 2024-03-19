import pyodbc

from .conexao_banco_dados import BancoDeDados

class RetornaNomeCliente:
  def __init__(self):
    pass

  def retornaNomeCliente(self, codigoCliente):
    nomeCliente = ''
    conn = None
    try:
      conn = BancoDeDados().get_connection()
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
        BancoDeDados().put_connection(conn)