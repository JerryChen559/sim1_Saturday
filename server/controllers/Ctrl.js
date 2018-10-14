// GET all inventory
const getInventory = (req, res) => {
  const dbInstance = req.app.get("db").products;

  dbInstance
    .get_inventory()
    // .then(console.log("get request worked!"))
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

// POST a product
const addProduct = (req, res) => {
  const { name, price, img } = req.body;
  const dbInstance = req.app.get("db").products;

  dbInstance
    .add_product([name, price, img])
    .then(response => {
      console.log("add:", response);
      res.status(200).send(response);
    })
    .catch(e => res.status(500).send(e));
};

// PUT request. Update a product
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { editedname, editedprice, editedimg } = req.body;
  const dbInstance = req.app.get("db").products;
  console.log(id, editedname, editedprice, editedimg);
  dbInstance
    .update_product([id, editedname, editedprice, editedimg])
    .then(response => {
      console.log(`"newArr:" ${response}`);
      res.status(200).send(response);
    })
    .catch(e => res.status(500).send(e));
};

// DELETE a product by id
const deleteProduct = (req, res) => {
  const { id } = req.params;
  const dbInstance = req.app.get("db").products;

  dbInstance
    .delete_product(id)
    .then(console.log(id))
    .then(response => {
      // console.log(`"newArr:" ${response}`);
      res.status(200).send(response);
    })
    .catch(e => res.status(500).send(e));
};

module.exports = {
  getInventory,
  //dont need // getProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
