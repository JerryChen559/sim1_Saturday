require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");

const {
  getInventory,
  // //dont need  //getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("./controllers/Ctrl");

const port = 4000;

const app = express();
app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    // console.log(dbInstance);
    app.set("db", dbInstance);
    // Table create success. Comment out after creating the table.
    // dbInstance.products
    //   .create_products_table()
    //   .then(response => {
    //     console.log("Table created!");
    //   })
    //   .catch(e => console.log(e));
  })
  .catch(err => console.log(err));

app.get("/api/inventory", getInventory);
//dont need
// app.get("/api/product/:id", getProduct);
app.post("/api/product", addProduct);
app.put("/api/product/:id", updateProduct);
app.delete("/api/product/:id", deleteProduct);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
