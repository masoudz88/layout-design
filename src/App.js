import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import LayoutDesign from "./layoutDesign";
import StyleEditor from "./styleEditor";
import "./App.css";
import Dropdown from "./components/dropDown";

function App() {
  return (
    <Provider store={store}>
      <div className= "styling-app">
          <LayoutDesign/>
          <StyleEditor/>
          <Dropdown className= "dropdown"/>
      </div>
    </Provider>
  );
}

export default App;


