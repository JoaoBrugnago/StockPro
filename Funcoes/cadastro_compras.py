import pyodbc
from datetime import datetime

from .conexao_banco_dados import BancoDeDados
from .retorna_proximo_numero_produto import ProximoProduto
from .retorna_proximo_numero_compra import ProximaCompra
from .cadastro_produtos import CadastroProdutos

bancoDeDados    = BancoDeDados()
proximoProduto  = ProximoProduto()
proximaCompra   = ProximaCompra()
cadastroProduto = CadastroProdutos()

class CadastroCompras:
  def __init__(self, nomeProduto, unidadeMedida, quantidade, precoUnitario):
    self.nomeProduto    = nomeProduto
    self.unidadeMedida  = unidadeMedida
    self.quantidade     = quantidade
    self.precoUnitario  = precoUnitario
    self.data           = datetime.today().strftime("%d/%m/%Y")
    self.conn_str       = bancoDeDados.conn_str

  def validacoes(self):
    conn    = pyodbc.connect(self.conn_str)
    cursor  = conn.cursor()

    # Verificar se o produto já existe na tabela de "produtos"
    select_produto_query = 'SELECT prdcode FROM produtos WHERE prdnome = ? '
    cursor.execute(select_produto_query, self.nomeProduto.strip())
    resultado = cursor.fetchone()

    if resultado:
        PrdCode = int(resultado[0])
    else:
        # Se não possuir, cadastrar novo produto
        PrdCode   = proximoProduto.proximoValor()
        produto   = cadastroProduto(PrdCode, self.nomeProduto.strip(), self.unidadeMedida)
        resultado = produto.cadastrarProduto()

    conn.close()
    return PrdCode

  def cadastroCompras(self):
    PrdCode = self.validacoes()
    CmpCode = proximaCompra.proximoValor()

    conn = pyodbc.connect(self.conn_str)
    cursor = conn.cursor()

    # Instrução SQL para inserir informações de compra
    inserirCompra = '''
    INSERT INTO compras (cmpcode, prdcode, prdnome, undcode, cmpdatcadastro, cmpqtdprodutos, cmpvalunitario)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    '''
    
    cursor.execute(inserirCompra, CmpCode, PrdCode, self.nomeProduto, self.unidadeMedida, self.data, self.quantidade, self.precoUnitario)
    conn.commit()
    conn.close()

    return 'Compra cadastrada com sucesso'
