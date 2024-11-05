create table comanda (
  id_comanda serial primary key,
  num_mesa int,
  quantidade int,
	valor FLOAT
);

CREATE TABLE cardapio (
    valor FLOAT,
    cod_item SERIAL PRIMARY KEY,
    tipo VARCHAR(50),
    nome VARCHAR(50),
    descricao VARCHAR(100)
);


create table possui (
  id_comanda int,
  cod_item int,
  primary key (id_comanda, cod_item),
  constraint fk_comanda foreign key (id_comanda)references comanda(id_comanda),
  constraint fk_cardapio foreign key (cod_item) references cardapio(cod_item)
);

create table users (
    id_usuario serial primary key,
    nome varchar(50),
    email varchar(50),
    senha varchar(255)  
);
	


INSERT INTO comanda (num_mesa, quantidade) VALUES
(1, 5),
(2, 3),
(3, 4);


INSERT INTO cardapio (valor, tipo, descricao) VALUES
(29.90, 'Prato Principal', 'Frango Grelhado com Legumes'),
(19.90, 'Entradas', 'Salada Caesar'),
(9.90, 'Bebidas', 'Refrigerante'),
(14.90, 'Sobremesa', 'Pudim de Leite');


INSERT INTO possui (id_comanda, cod_item) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4);

INSERT INTO users (nome, email, senha) VALUES
('João Silva', 'joao@email.com', 'senha123'),
('Maria Oliveira', 'maria@email.com', 'senha456'),
('Pedro Santos', 'pedro@email.com', 'senha789');




