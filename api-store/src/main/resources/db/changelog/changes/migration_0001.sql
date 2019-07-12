-- Criando os modelos base no banco

create table category (
  id bigserial not null,
  name varchar(20) not null,
  created_at timestamp without time zone,
  updated_at timestamp without time zone,
  primary key (id)
);

create table product (
  id bigserial not null,
  category_id bigint not null references category (id),
  code varchar(20) not null,
  name varchar(50) not null,
  description varchar(255) not null,
  stock_quantity numeric not null,
  price numeric not null,
  created_at timestamp without time zone,
  updated_at timestamp without time zone,
  primary key (id)
);