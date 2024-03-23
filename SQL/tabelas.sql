-- Tabela Unidade de Medida
create table unidade_medida (
		undcode int ,
		undname varchar(5),
		unddesc varchar(50),
		primary key (undcode),
		);

-- Tabela Produtos
create table produtos (
		prdcode int ,
		prdname varchar(50),
		undcode int,
		primary key (prdcode),
		foreign key (undcode) references unidade_medida(undcode)
		);

-- Tabela Compras
create table compras (
		cmpcode int,
		prdcode int,
		undcode int,
		cmpdate date,
		cmpqtdproduto float,
		cmpvalunitario float,
		primary key (cmpcode, prdcode),
		foreign key (undcode) references unidade_medida(undcode),
		foreign key (prdcode) references produtos(prdcode),
		);

-- Tabela Receitas
create table receitas(
		rctcode int,
		prdcode int,
		rctqtdproduto float,
		primary key (rctcode, prdcode),
		foreign key (prdcode) references produtos(prdcode)
		);

-- Tabela Cliente
CREATE TABLE clientes (
    cltcode INT PRIMARY KEY,
    cltname VARCHAR(100),
    cltemail VARCHAR(100),
    cltphone VARCHAR(20),
    cltaddress VARCHAR(255),
    cltcity VARCHAR(100),
    cltstate VARCHAR(50),
    cltcountry VARCHAR(50),
    cltzipcode VARCHAR(20),
    cltneighborhood VARCHAR(100)
);

-- Tabela Vendas
CREATE TABLE vendas(
    vndcode INT,
    rctcode INT,
    vndvalunitario FLOAT,
    vnddate DATE,
		vndqtdreceita INT,
    cltcode INT,
    PRIMARY KEY (vndcode, rctcode),
    FOREIGN KEY (cltcode) REFERENCES clientes(cltcode)
);


# POPULAR TABELAS PARA TESTES:
-- Inserir unidades de medida
INSERT INTO unidade_medida (undcode, undname, unddesc) VALUES
(1, 'kg', 'Quilograma'),
(2, 'g', 'Grama'),
(3, 'L', 'Litro'),
(4, 'm', 'Metro'),
(5, 'pc', 'Peça');

-- Inserir produtos
INSERT INTO produtos (prdcode, prdname, undcode) VALUES
(1, 'Arroz', 1), -- Quilograma
(2, 'Feijão', 1), -- Quilograma
(3, 'Leite', 3), -- Litro
(4, 'Óleo de Soja', 1), -- Quilograma
(5, 'Açúcar', 1), -- Quilograma
(6, 'Café', 1), -- Quilograma
(7, 'Pão Francês', 5), -- Peça
(8, 'Carne Bovina', 1), -- Quilograma
(9, 'Frango', 1), -- Quilograma
(10, 'Banana', 1), -- Quilograma
(11, 'Tomate', 1), -- Quilograma
(12, 'Cebola', 1), -- Quilograma
(13, 'Alface', 1), -- Quilograma
(14, 'Ovos', 5), -- Peça
(15, 'Batata', 1), -- Quilograma
(16, 'Macarrão', 1), -- Quilograma
(17, 'Sal', 1), -- Quilograma
(18, 'Margarina', 1), -- Quilograma
(19, 'Cenoura', 1), -- Quilograma
(20, 'Sabão em Pó', 1); -- Quilograma

-- Inserir compras
INSERT INTO compras (cmpcode, prdcode, undcode, cmpdate, cmpqtdproduto, cmpvalunitario) VALUES
(1, 1, 1, '2024-03-01', 2, 5.99),  -- Compra 1: 2kg de Arroz
(1, 2, 1, '2024-03-01', 3, 8.50),  -- Compra 1: 3kg de Feijão
(1, 5, 1, '2024-03-01', 1, 3.75),  -- Compra 1: 1kg de Açúcar
(2, 3, 3, '2024-03-03', 2, 4.25),  -- Compra 2: 2 Litros de Leite
(2, 7, 5, '2024-03-03', 5, 1.50),  -- Compra 2: 5 Pães Francês
(3, 4, 1, '2024-03-05', 1, 9.99),  -- Compra 3: 1kg de Óleo de Soja
(3, 8, 1, '2024-03-05', 2, 25.00), -- Compra 3: 2kg de Carne Bovina
(3, 9, 1, '2024-03-05', 1, 15.00), -- Compra 3: 1kg de Frango
(4, 10, 1, '2024-03-08', 2, 4.00), -- Compra 4: 2kg de Banana
(4, 11, 1, '2024-03-08', 1, 3.50), -- Compra 4: 1kg de Tomate
(5, 12, 1, '2024-03-10', 1, 2.50),   -- Compra 5: 1kg de Cebola
(5, 13, 1, '2024-03-10', 1, 2.00),   -- Compra 5: 1kg de Alface
(6, 14, 5, '2024-03-12', 12, 8.99),  -- Compra 6: 12 Ovos
(7, 15, 1, '2024-03-15', 2, 5.00),   -- Compra 7: 2kg de Batata
(7, 16, 1, '2024-03-15', 3, 3.75),   -- Compra 7: 3kg de Macarrão
(8, 17, 1, '2024-03-18', 1, 1.50),   -- Compra 8: 1kg de Sal
(8, 18, 1, '2024-03-18', 2, 4.50),   -- Compra 8: 2kg de Margarina
(8, 19, 1, '2024-03-18', 1, 2.00),   -- Compra 8: 1kg de Cenoura
(8, 20, 1, '2024-03-18', 1, 6.99),   -- Compra 8: 1kg de Sabão em Pó
(9, 1, 1, '2024-03-20', 3, 7.50),    -- Compra 9: 3kg de Arroz
(9, 2, 1, '2024-03-20', 2, 6.00),    -- Compra 9: 2kg de Feijão
(10, 3, 3, '2024-03-22', 4, 8.99),   -- Compra 10: 4 Litros de Leite
(10, 4, 1, '2024-03-22', 1, 10.49),  -- Compra 10: 1kg de Óleo de Soja
(10, 7, 5, '2024-03-22', 4, 1.20),   -- Compra 10: 4 Pães Francês
(11, 8, 1, '2024-03-25', 3, 30.00),  -- Compra 11: 3kg de Carne Bovina
(11, 9, 1, '2024-03-25', 1, 18.00),  -- Compra 11: 1kg de Frango
(12, 10, 1, '2024-03-28', 2, 3.50),  -- Compra 12: 2kg de Banana
(12, 11, 1, '2024-03-28', 2, 3.00),  -- Compra 12: 2kg de Tomate
(12, 12, 1, '2024-03-28', 1, 2.00),  -- Compra 12: 1kg de Cebola
(12, 13, 1, '2024-03-28', 1, 2.50);  -- Compra 12: 1kg de Alface

-- Inserir receitas
INSERT INTO receitas (rctcode, prdcode, rctqtdproduto) VALUES
(1, 1, 0.5),    -- Receita 1: 0.5 kg de Arroz
(1, 2, 0.3),    -- Receita 1: 0.3 kg de Feijão
(2, 3, 1),      -- Receita 2: 1 Litro de Leite
(2, 5, 0.2),    -- Receita 2: 0.2 kg de Açúcar
(3, 7, 1),      -- Receita 3: 1 Pão Francês
(3, 14, 6),     -- Receita 3: 6 Ovos
(4, 15, 2),     -- Receita 4: 2 kg de Batata
(4, 17, 0.1),   -- Receita 4: 0.1 kg de Sal
(4, 19, 0.3),   -- Receita 4: 0.3 kg de Cenoura
(5, 16, 0.5),   -- Receita 5: 0.5 kg de Macarrão
(5, 18, 0.1),   -- Receita 5: 0.1 kg de Margarina
(5, 19, 0.2),   -- Receita 5: 0.2 kg de Cenoura
(5, 20, 0.2);   -- Receita 5: 0.2 kg de Sabão em Pó

-- Inserir clientes
INSERT INTO clientes (cltcode, cltname, cltemail, cltphone, cltaddress, cltcity, cltstate, cltcountry, cltzipcode, cltneighborhood) VALUES
(1, 'João da Silva', 'joao.silva@example.com', '(11) 1234-5678', 'Rua A, 123', 'São Paulo', 'SP', 'Brasil', '12345-678', 'Centro'),
(2, 'Maria Santos', 'maria.santos@example.com', '(21) 9876-5432', 'Avenida B, 456', 'Rio de Janeiro', 'RJ', 'Brasil', '98765-432', 'Copacabana'),
(3, 'José Oliveira', 'jose.oliveira@example.com', '(31) 4567-8901', 'Travessa C, 789', 'Belo Horizonte', 'MG', 'Brasil', '54321-876', 'Barro Preto'),
(4, 'Ana Pereira', 'ana.pereira@example.com', '(41) 2345-6789', 'Alameda D, 987', 'Curitiba', 'PR', 'Brasil', '23456-789', 'Batel'),
(5, 'Luiza Costa', 'luiza.costa@example.com', '(51) 6789-0123', 'Rua E, 321', 'Porto Alegre', 'RS', 'Brasil', '87654-321', 'Moinhos de Vento');

-- Inserir vendas com receitas existentes
INSERT INTO vendas (vndcode, rctcode, vndvalunitario, vnddate, vndqtdreceita, cltcode) VALUES
(1, 1, 15.99, '2024-03-01', 1, 1),   -- Venda 1: Receita 1 vendida por R$15.99 em 01/03/2024 para cliente 1
(2, 2, 25.50, '2024-03-03', 1, 2),   -- Venda 2: Receita 2 vendida por R$25.50 em 03/03/2024 para cliente 2
(3, 3, 10.00, '2024-03-05', 1, 3),   -- Venda 3: Receita 3 vendida por R$10.00 em 05/03/2024 para cliente 3
(4, 4, 30.00, '2024-03-08', 1, 4),   -- Venda 4: Receita 4 vendida por R$30.00 em 08/03/2024 para cliente 4
(5, 5, 8.99, '2024-03-10', 1, 5),    -- Venda 5: Receita 5 vendida por R$8.99 em 10/03/2024 para cliente 5
(6, 1, 12.00, '2024-03-12', 1, 1),   -- Venda 6: Receita 1 vendida por R$12.00 em 12/03/2024 para cliente 1
(7, 2, 5.75, '2024-03-15', 1, 2),    -- Venda 7: Receita 2 vendida por R$5.75 em 15/03/2024 para cliente 2
(8, 3, 20.49, '2024-03-18', 1, 3),   -- Venda 8: Receita 3 vendida por R$20.49 em 18/03/2024 para cliente 3
(9, 4, 18.75, '2024-03-20', 1, 4),   -- Venda 9: Receita 4 vendida por R$18.75 em 20/03/2024 para cliente 4
(10, 5, 15.00, '2024-03-22', 1, 5),  -- Venda 10: Receita 5 vendida por R$15.00 em 22/03/2024 para cliente 5
(11, 1, 15.99, '2024-03-01', 1, 1),  -- Venda 11: Receita 1 vendida por R$15.99 em 01/03/2024 para cliente 1
(12, 2, 25.50, '2024-03-03', 1, 2),  -- Venda 12: Receita 2 vendida por R$25.50 em 03/03/2024 para cliente 2
(13, 3, 10.00, '2024-03-05', 1, 3),  -- Venda 13: Receita 3 vendida por R$10.00 em 05/03/2024 para cliente 3
(14, 4, 30.00, '2024-03-08', 1, 4),  -- Venda 14: Receita 4 vendida por R$30.00 em 08/03/2024 para cliente 4
(15, 5, 8.99, '2024-03-10', 1, 5),   -- Venda 15: Receita 5 vendida por R$8.99 em 10/03/2024 para cliente 5
(16, 1, 12.00, '2024-03-12', 1, 1),  -- Venda 16: Receita 1 vendida por R$12.00 em 12/03/2024 para cliente 1
(17, 2, 5.75, '2024-03-15', 1, 2),   -- Venda 17: Receita 2 vendida por R$5.75 em 15/03/2024 para cliente 2
(18, 3, 20.49, '2024-03-18', 1, 3),  -- Venda 18: Receita 3 vendida por R$20.49 em 18/03/2024 para cliente 3
(19, 4, 18.75, '2024-03-20', 1, 4),  -- Venda 19: Receita 4 vendida por R$18.75 em 20/03/2024 para cliente 4
(20, 5, 15.00, '2024-03-22', 1, 5);  -- Venda 20: Receita 5 vendida por R$15.00 em 22/03/2024 para cliente 5
