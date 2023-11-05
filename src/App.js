import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import LayoutDesign from './layoutDesign';
import StyleEditor from './styleEditor';
import './App.css';
import Dropdown from './components/dropDown';

function App() {
  return (
    <Provider store={store}>
      <div style={{display: "flex", flexDirection: "row"}}>
          <LayoutDesign />
          <StyleEditor/>
          <Dropdown style={{ position: "absolute", top: 20, right: 10 }}/>
      </div>
    </Provider>
  );
}

export default App;


