INSERT INTO products
  (products_name, products_price, products_imgurl)
VALUES
  ($1, $2, $3);

SELECT *
FROM products;