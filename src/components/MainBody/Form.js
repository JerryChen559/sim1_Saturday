import React, { Component } from "react";
import axios from "axios";
import Display from "./Display";

export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      name: "",
      price: 0,
      img: "",
      editID: 0,
      editedname: "",
      editedprice: 0,
      editedimg: "",
      // pass in product as an object in version 2!
      // product: {
      //   name: "",
      //   price: 0,
      //   img: ""
      // },
      editMode: false
    };

    this.getInventory = this.getInventory.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.editButton = this.editButton.bind(this);
    this.editProduct = this.editProduct.bind(this);

    this.cancelPost = this.cancelPost.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    this.getInventory();
  }

  getInventory() {
    axios
      .get("http://localhost:4000/api/inventory")
      .then(response => {
        console.log(response.data);
        this.setState({ inventory: response.data });
      })
      .catch(error => console.log(error));
  }

  addProduct() {
    const { name, price, img } = this.state;
    axios
      .post("http://localhost:4000/api/product", { name, price, img })
      .then(response => {
        this.setState({ inventory: response.data });
      })
      .then(this.cancelPost())
      .catch(error => console.log(error));
  }

  editButton(id, name, price, img) {
    this.setState({
      editID: id,
      editedname: name,
      editedprice: price,
      editedimg: img
    });
  }

  editProduct(id) {
    const { editedname, editedprice, editedimg } = this.state;
    axios
      .put(`http://localhost:4000/api/product/${id}`, {
        editedname,
        editedprice,
        editedimg
      })
      .then(response => {
        this.setState({ inventory: response.data });
      })

      .catch(error => console.log(error));
  }

  deleteProduct(id) {
    axios
      .delete(`http://localhost:4000/api/product/${id}`)
      .then(response => {
        this.setState({ inventory: response.data });
      })
      .catch(error => console.log(error));
  }

  handleInput(key, val) {
    this.setState({ [key]: val });
  }

  cancelPost() {
    this.setState({
      name: "",
      price: 0,
      img: ""
    });
  }
  cancelEdit() {
    this.setState({
      editedname: "",
      editedprice: 0,
      editedimg: ""
    });
  }

  render() {
    console.log(this.state);

    let list = this.state.inventory.map((e, i) => {
      return (
        <div key={i}>
          <div>{e.products_name}</div>
          <div>{e.products_price}</div>
          <img src={e.products_imgurl} />
          <button onClick={() => this.deleteProduct(e.id)}>Delete</button>
          <button
            onClick={() =>
              this.editButton(
                e.id,
                e.products_name,
                e.products_price,
                e.products_imgurl
              )
            }
          >
            Edit
          </button>
        </div>
      );
    });

    return (
      <div>
        <div>
          <div>Add Form</div>
          <input
            type="text"
            placeholder="enter product name"
            value={this.state.name}
            onChange={e => this.handleInput("name", e.target.value)}
          />
          <input
            type="number"
            placeholder="enter price"
            value={this.state.price}
            onChange={e => this.handleInput("price", e.target.value)}
          />
          <input
            type="text"
            placeholder="enter image url"
            value={this.state.img}
            onChange={e => this.handleInput("img", e.target.value)}
          />
          <button onClick={this.addProduct}>Add</button>
          <button className="cancelBtn" onClick={this.cancelPost}>
            Cancel
          </button>
        </div>

        <div>
          <div>Edit Form</div>
          <input
            type="text"
            placeholder="enter product name"
            value={this.state.editedname}
            onChange={e => this.handleInput("editedname", e.target.value)}
          />
          <input
            type="number"
            placeholder="enter price"
            value={this.state.editedprice}
            onChange={e => this.handleInput("editedprice", e.target.value)}
          />
          <input
            type="text"
            placeholder="enter image url"
            value={this.state.editedimg}
            onChange={e => this.handleInput("editedimg", e.target.value)}
          />
          <button onClick={() => this.editProduct(this.state.editID)}>
            Submit Edit
          </button>
          <button className="cancelBtn" onClick={this.cancelEdit}>
            Cancel
          </button>
        </div>

        <Display />
        {list}
      </div>
    );
  }
}

export default Form;
