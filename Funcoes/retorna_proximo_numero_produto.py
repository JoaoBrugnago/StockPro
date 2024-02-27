import pyodbc
from .conexao_banco_dados import BancoDeDados
bancoDeDados = BancoDeDados()

class ProximoProduto:
  def __init__(self):
    self.conn_str = bancoDeDados.conn_str

  def proximoValor(self):
    conn = None
    try:
      conn = pyodbc.connect(self.conn_str)
      cursor = conn.cursor()

      select_ultimo_prdcode = 'SELECT TOP 1 prdcode FROM produtos ORDER BY prdcode DESC'
      cursor.execute(select_ultimo_prdcode)
      resultado = cursor.fetchone()

      PrdCode = int(resultado[0]) + 1 if resultado else 1
      conn.close()
      
      return PrdCode
    
    except Exception as e:
      print(f'Erro: {e}')

    finally:
      if conn:
        conn.close()
