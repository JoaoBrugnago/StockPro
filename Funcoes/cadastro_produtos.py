import pyodbc

from .conexao_banco_dados import BancoDeDados

bancoDeDados = BancoDeDados()

class CadastroProdutos:
    def __init__(self, codigoProduto, nomeProduto, unidadeMedida):
        self.codigoProduto  = codigoProduto
        self.nomeProduto    = nomeProduto
        self.unidadeMedida  = unidadeMedida
        self.conn_str       = bancoDeDados.conn_str

    def cadastrarProduto(self):
        conn    = pyodbc.connect(self.conn_str)
        cursor  = conn.cursor()

        # Inserir informações na tabela de produtos
        inserirProduto = '''
        INSERT INTO produtos (prdcode, prdnome, undcode)
        VALUES (?, ?, ?)
        '''
        
        cursor.execute(inserirProduto, self.codigoProduto, self.nomeProduto.strip(), self.unidadeMedida)
        conn.commit()
        conn.close()
        
        return f'Produto {self.nomeProduto.strip()} cadastrado com sucesso'
