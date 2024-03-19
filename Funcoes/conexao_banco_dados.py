import pyodbc

class BancoDeDados:
  def __init__(self):
    self.server   = 'database-1.c1icyqmici3x.us-east-2.rds.amazonaws.com'
    self.database = 'stockpro'
    self.username = 'admin'
    self.password = 'ZRj2gOiQLNUpPDQhriGK'
    self.driver   = '{SQL Server}'
    self.conn_str = f'DRIVER={self.driver};SERVER={self.server};DATABASE={self.database};UID={self.username};PWD={self.password}'

  def get_connection(self):
    # Função para obter uma conexão do pool
    return pyodbc.connect(self.conn_str, pooling = True)

  def put_connection(self, conn):
    # Função para retornar uma conexão ao pool
    conn.close()