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

-- Tabela Vendas
create table vendas(
		vndcode int,
		rctcode int,
		vndvalunitario float,
		vnddate date,
		primary key (vndcode, rctcode)
		);
