UPDATE products
SET products_name = $2, products_price = $3, products_imgurl = $4
WHERE id = $1;

SELECT *
FROM products;