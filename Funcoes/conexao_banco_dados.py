class BancoDeDados:
  def __init__(self):
    self.server   = 'stockpro.c1y8i0u2y35l.us-east-1.rds.amazonaws.com'
    self.database = 'stockpro'
    self.username = 'admin'
    self.password = 'dLdGdmt7YGbRQbxd2FNq'
    self.driver   = '{SQL Server}'
    self.conn_str = f'DRIVER={self.driver};SERVER={self.server};DATABASE={self.database};UID={self.username};PWD={self.password}'