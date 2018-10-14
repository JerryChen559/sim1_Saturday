CREATE TABLE products
(
  id SERIAL PRIMARY KEY,
  products_name VARCHAR(40) NOT NULL,
  products_price FLOAT NOT NULL,
  products_imgurl TEXT
);