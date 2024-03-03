import secrets
import os

class ChaveSecreta:
  def __init__(self):
    self.chave_secreta = None

  def chaveSecreta(self):
    if not os.path.exists('config.txt'):
      self.chave_secreta = self.verificacao()
    else:
      # Lendo a chave secreta de um arquivo de configuração
      with open('config.txt', 'r') as file:
        self.chave_secreta = file.read().strip()
        if not self.chave_secreta:
          self.chave_secreta = self.verificacao()
          
    return self.chave_secreta
    
  def verificacao(self):
    # Gerar uma chave secreta de 256 bits (32 bytes)
    chave_secreta = secrets.token_hex(32)
    with open('config.txt', 'w') as file:
      file.write(chave_secreta)
    return chave_secreta
