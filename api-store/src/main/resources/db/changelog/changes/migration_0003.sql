-- populando produtos inciais, para demonstração da api.

INSERT INTO product ("category_id", "code", "name", "description", "stock_quantity", "price", "created_at", "updated_at") VALUES
(2, 'BD00001', 'Java para iniciantes', 'Livro para ensinar programadores iniciantes, a linguagem Java.', 5, 30.00, now(), now()),
(2, 'BD00001', 'Python para iniciantes', 'Livro para ensinar programadores iniciantes, a linguagem Python.', 5, 30.00, now(), now()),
(2, 'BD00001', 'Go para iniciantes', 'Livro para ensinar programadores iniciantes, a linguagem Go.', 5, 30.00, now(), now()),
(2, 'BD00001', 'Ruby para iniciantes', 'Livro para ensinar programadores iniciantes, a linguagem Ruby.', 5, 30.00, now(), now()),
(2, 'BD00001', 'C# para iniciantes', 'Livro para ensinar programadores iniciantes, a linguagem C#.', 5, 30.00, now(), now());