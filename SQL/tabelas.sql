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
    cltcode INT,
    PRIMARY KEY (vndcode, rctcode),
    FOREIGN KEY (cltcode) REFERENCES clientes(cltcode)
);


# TESTES:
# gerar registro para testes
INSERT INTO clientes (cltcode, cltname, cltemail, cltphone, cltaddress, cltcity, cltstate, cltcountry, cltzipcode, cltneighborhood)
VALUES (1, 'João Pedro', 'joao.brugnagoo@gmail.com', '47996933046', 'Caçapava, 144', 'Joinville', 'SC', 'BR', '89222350', 'Bom Retiro');

# gerar registros para testes na tabela de vendas
DECLARE @StartDate DATE = '2024-03-01';
DECLARE @VndCode INT = 1;
DECLARE @RctCode INT = 1;
DECLARE @VndValUnitario FLOAT = 100.00;
DECLARE @CltCode INT = 1; -- Código do cliente

WHILE @RctCode <= 35
BEGIN
    INSERT INTO vendas (vndcode, rctcode, vndvalunitario, vnddate, cltcode)
    VALUES (@VndCode, @RctCode, @VndValUnitario, @StartDate, @CltCode);

    SET @RctCode = @RctCode + 1;
    SET @VndValUnitario = @VndValUnitario + 10.00; -- Incrementa o valor unitário

    -- Incrementa o vndcode apenas quando rctcode for divisor de 5
    IF @RctCode % 5 = 0
    BEGIN
        SET @VndCode = @VndCode + 1;
    END

    SET @StartDate = DATEADD(day, 1, @StartDate); -- Incrementa a data em um dia
END;
