import React, { Component } from "react";
//import {BrowserRouter} from 'react-router-dom'
import Header from "./components/Header/Header";
import MainBody from "./components/MainBody/Mainbody";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainBody />
        {/*npm i react-router-dom {route} */}
      </div>
    );
  }
}

export default App;
