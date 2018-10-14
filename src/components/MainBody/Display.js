import React, { Component } from "react";

export class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      name: "",
      price: 0,
      img: ""
    };
  }

  render() {
    return (
      <div>
        <h3>Display</h3>
        <div>Items, items, items</div>
      </div>
    );
  }
}

export default Display;
