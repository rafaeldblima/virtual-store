-- Populando categorias iniciais

insert into category (name, created_at, updated_at)
values ('Eletrônico', now(), now()),
       ('Livro', now(), now()),
       ('Música', now(), now()),
       ('Outros', now(), now());
